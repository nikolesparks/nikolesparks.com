# Relocation & local-SEO checklist

For when the practice moves (e.g. closer to Long Beach). Local SEO is fragile
during a move — done wrong, it resets rankings and loses review history. Follow
this in order.

## The golden rule

**Edit existing listings in place. Never delete and recreate.**
Moving the address on an existing Google Business Profile (and TherapyDen,
Psychology Today, etc.) preserves reviews, listing age, and ranking history.
Creating a new listing and abandoning the old one splits signals, loses history,
and creates duplicate-listing problems that are hard to undo.

## Before the move

- [ ] Confirm the new office is real and operational — you can receive mail there
      and/or do a video walkthrough. Do **not** change any address before this.
- [ ] Decide: relocate one office, or consolidate to a single location? Each
      *active* office = one Google Business Profile. Mark closed/moved ones
      correctly rather than leaving duplicates.
- [ ] Note the county change. Newport Beach & Fullerton are **Orange County**;
      Long Beach is **Los Angeles County**. This shifts the local market —
      different competitors and different search terms
      ("therapist Long Beach", "Long Beach couples counseling"). Plan to
      re-target content for the new city (see "Website updates" below).

## Update NAP (Name / Address / Phone) everywhere — identically

Inconsistent address data across the web after a move is the top cause of lost
local rankings. Update all of these to the exact same new address:

- [ ] **Google Business Profile** (edit address → triggers re-verification;
      postcard/video at the new location). Expect old-city rankings to fade and
      new-city rankings to climb over a few weeks — this is normal.
- [ ] **Bing Places**
- [ ] **TherapyDen** profile
- [ ] **Psychology Today** profile (if listed)
- [ ] **Ahrefs / Search Console** — no address field, but re-crawl after the site
      is updated so the new location is picked up.
- [ ] Any other directory/citation that has picked you up (search your practice
      name + old address to find stragglers).

## Website updates (hand these to Claude / the developer)

The address is baked into the site's structured data and copy. Update, in one
pass, and redeploy:

- [ ] `src/data/schema.ts` — the office nodes: `newportOfficeNode` /
      `fullertonOfficeNode` (whichever is moving) — `streetAddress`,
      `addressLocality`, `addressRegion`, `postalCode`, `hasMap` link, and the
      `areaServed` entries. Also `practiceNode.address` (its primary address)
      and `practiceNode.areaServed`.
- [ ] Page titles & meta descriptions that name the city — e.g.
      `src/pages/services/premarital-counseling.astro`, `couples-therapy.astro`,
      the homepage, and any page whose title reads "… Newport Beach & Fullerton".
- [ ] `public/llms.txt` — the location lines and the summary.
- [ ] Body copy that names the city/area (search the repo for "Newport Beach",
      "Fullerton", "Orange County").
- [ ] Rebuild; the sitemap and JSON-LD regenerate automatically.

## After the move

- [ ] Re-verify Google Business Profile at the new address.
- [ ] Confirm the new address renders in the site's JSON-LD (validate with
      Google's Rich Results Test).
- [ ] Watch Search Console for the old-city → new-city ranking shift, and add
      new-city keywords to the target list.
- [ ] Hunt down and fix any lingering old-address citations.

## Licensing note

Moving within California does not affect your BBS license status or your
ability to offer telehealth across the state. This is purely a local-SEO and
citation exercise, not a licensing one.

## Branding note (AMFT → LMFT)

Use a **stable practice brand name** rather than one containing your current
credential, so the name never has to change (and never triggers a Google
Business Profile re-verification) when you become licensed or if the practice
grows. The credential and required supervision disclosure live in the site
content and the GBP description — where BBS wants them and where they are
trivial to update from AMFT to LMFT — not in the business name itself. Keep the
login/ownership of every listing somewhere safe so future edits are easy.
