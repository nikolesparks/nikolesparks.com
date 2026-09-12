// Search Console monitoring report — zero runtime dependencies.
//
// Pulls the last 28 days of Search Analytics data (queries + pages) for the
// property, compares it against the previous snapshot, and prints a
// human-readable report highlighting what changed: new "striking distance"
// keywords (position ~5-20), notable ranking gains/drops, and click movement.
// Intended to be run on a schedule; a wrapper then messages the site owner only
// when something is worth acting on, and commits the refreshed snapshot.
//
// Auth: a Google service account (no interactive OAuth). It signs a JWT with the
// account's private key using Node's built-in crypto, exchanges it for an access
// token, and calls the Search Console REST API with fetch — so nothing is added
// to the site's dependencies.
//
// Required environment variables:
//   GSC_SA_KEY   The service-account JSON key, either as raw JSON or base64.
//                NEVER commit this — it lives only in the environment's secrets.
//   GSC_SITE_URL (optional) The Search Console property. Defaults to the
//                URL-prefix property 'https://nikolesparks.com/'. For a
//                Domain property use 'sc-domain:nikolesparks.com'.
//
// Usage:
//   node scripts/gsc-report.mjs            # print the report
//   node scripts/gsc-report.mjs --save     # also write scripts/gsc-snapshot.json
//
// The snapshot is committed to the repo so each run can diff against the last;
// that is the only state that persists between scheduled runs.

import { createSign } from 'node:crypto';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SNAPSHOT_PATH = join(__dirname, 'gsc-snapshot.json');

const SITE_URL = process.env.GSC_SITE_URL || 'https://nikolesparks.com/';
const SCOPE = 'https://www.googleapis.com/auth/webmasters.readonly';
const TOKEN_URL = 'https://oauth2.googleapis.com/token';
const SAVE = process.argv.includes('--save');

// ---- credentials -----------------------------------------------------------

function loadServiceAccount() {
  const raw = process.env.GSC_SA_KEY;
  if (!raw) {
    console.error(
      'GSC_SA_KEY is not set. Put the service-account JSON key in that env var\n' +
        '(raw JSON or base64). It must never be committed to the repo.',
    );
    process.exit(1);
  }
  const text = raw.trim().startsWith('{')
    ? raw
    : Buffer.from(raw, 'base64').toString('utf8');
  try {
    const key = JSON.parse(text);
    if (!key.client_email || !key.private_key) throw new Error('missing fields');
    return key;
  } catch (e) {
    console.error('GSC_SA_KEY could not be parsed as a service-account key:', e.message);
    process.exit(1);
  }
}

function base64url(input) {
  return Buffer.from(input).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function getAccessToken(sa) {
  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claims = base64url(
    JSON.stringify({ iss: sa.client_email, scope: SCOPE, aud: TOKEN_URL, iat: now, exp: now + 3600 }),
  );
  const signature = createSign('RSA-SHA256')
    .update(`${header}.${claims}`)
    .sign(sa.private_key, 'base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
  const jwt = `${header}.${claims}.${signature}`;

  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });
  if (!res.ok) {
    console.error('Token request failed:', res.status, await res.text());
    process.exit(1);
  }
  return (await res.json()).access_token;
}

// ---- Search Console query --------------------------------------------------

function dateRange(days) {
  // GSC data lags ~2-3 days; end the window 3 days back so it is complete.
  const end = new Date(Date.now() - 3 * 86400000);
  const start = new Date(end.getTime() - (days - 1) * 86400000);
  const iso = (d) => d.toISOString().slice(0, 10);
  return { startDate: iso(start), endDate: iso(end) };
}

async function query(token, dimension) {
  const { startDate, endDate } = dateRange(28);
  const url = `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE_URL)}/searchAnalytics/query`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ startDate, endDate, dimensions: [dimension], rowLimit: 250 }),
  });
  if (!res.ok) {
    console.error(`Query (${dimension}) failed:`, res.status, await res.text());
    process.exit(1);
  }
  const rows = (await res.json()).rows || [];
  return rows.map((r) => ({
    key: r.keys[0],
    clicks: r.clicks,
    impressions: r.impressions,
    position: Math.round(r.position * 10) / 10,
  }));
}

// ---- reporting -------------------------------------------------------------

function loadSnapshot() {
  if (!existsSync(SNAPSHOT_PATH)) return null;
  try {
    return JSON.parse(readFileSync(SNAPSHOT_PATH, 'utf8'));
  } catch {
    return null;
  }
}

function byKey(rows) {
  return Object.fromEntries(rows.map((r) => [r.key, r]));
}

function report(current, previous) {
  const lines = [];
  const q = current.queries;
  const prevQ = previous ? byKey(previous.queries) : {};

  const striking = q
    .filter((r) => r.position >= 5 && r.position <= 20)
    .sort((a, b) => a.position - b.position);
  lines.push(`Striking-distance keywords (position 5-20): ${striking.length}`);
  striking.slice(0, 15).forEach((r) => {
    const prev = prevQ[r.key];
    const delta = prev ? prev.position - r.position : null; // + = improved
    const tag = delta === null ? 'NEW' : delta > 0 ? `+${delta.toFixed(1)}` : delta < 0 ? delta.toFixed(1) : '—';
    lines.push(`  • pos ${r.position.toFixed(1)}  ${tag.padStart(5)}  "${r.key}"  (${r.impressions} impr, ${r.clicks} clk)`);
  });

  if (previous) {
    const moved = q
      .map((r) => ({ r, prev: prevQ[r.key] }))
      .filter((x) => x.prev)
      .map((x) => ({ key: x.r.key, delta: x.prev.position - x.r.position, pos: x.r.position }))
      .filter((x) => Math.abs(x.delta) >= 3)
      .sort((a, b) => b.delta - a.delta);
    const gains = moved.filter((m) => m.delta > 0);
    const drops = moved.filter((m) => m.delta < 0);
    if (gains.length) {
      lines.push('', 'Biggest gains vs last run:');
      gains.slice(0, 8).forEach((m) => lines.push(`  ↑ +${m.delta.toFixed(1)}  now pos ${m.pos.toFixed(1)}  "${m.key}"`));
    }
    if (drops.length) {
      lines.push('', 'Biggest drops vs last run:');
      drops.slice(0, 8).forEach((m) => lines.push(`  ↓ ${m.delta.toFixed(1)}  now pos ${m.pos.toFixed(1)}  "${m.key}"`));
    }
    const brandNew = q.filter((r) => !prevQ[r.key]);
    if (brandNew.length) {
      lines.push('', `New queries appearing since last run: ${brandNew.length}`);
      brandNew.slice(0, 8).forEach((r) => lines.push(`  + "${r.key}" (pos ${r.position.toFixed(1)}, ${r.impressions} impr)`));
    }
  } else {
    lines.push('', '(No previous snapshot — this run establishes the baseline.)');
  }

  const totalClicks = q.reduce((s, r) => s + r.clicks, 0);
  const totalImpr = q.reduce((s, r) => s + r.impressions, 0);
  lines.unshift(`Window: ${current.range.startDate} → ${current.range.endDate}  |  ${q.length} queries, ${totalClicks} clicks, ${totalImpr} impressions`, '');
  return lines.join('\n');
}

// ---- main ------------------------------------------------------------------

const sa = loadServiceAccount();
const token = await getAccessToken(sa);
const [queries, pages] = await Promise.all([query(token, 'query'), query(token, 'page')]);
const current = { range: dateRange(28), queries, pages, capturedAt: new Date().toISOString() };

console.log(report(current, loadSnapshot()));

if (SAVE) {
  writeFileSync(SNAPSHOT_PATH, JSON.stringify(current, null, 2) + '\n');
  console.log(`\nSnapshot written to ${SNAPSHOT_PATH}`);
}
