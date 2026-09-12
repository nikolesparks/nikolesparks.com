# Blog content plan (SEO-prioritized)

A prioritized backlog of posts to write, based on the Search Console data and
the service pages that need supporting content. Priorities reflect: proven
search demand, which service page the post lifts, how winnable the ranking is,
and gaps not already covered by existing posts.

Hand these to a drafting session one at a time. Read the **House rules** at the
bottom first so drafts match the site's voice and technical conventions.

## Already covered (do not duplicate)

Existing posts: before-you-say-i-do, grief-doesnt-need-fixing,
high-functioning-and-still-anxious, insight-isnt-the-finish-line,
the-fight-isnt-about-the-dishes, what-happens-in-a-depth-therapy-session,
when-burnout-looks-like-laziness, why-just-relax-never-works,
is-premarital-counseling-worth-it, your-attachment-style-isnt-your-destiny.
Faith series exists as drafts (see Tier 3).

---

## Tier 1 — highest priority (demand + clear page support + winnable)

### 1. "Do We Need Couples Therapy?" (decision-intent)
- **Supports:** `/services/couples-therapy/`
- **Search intent / keywords:** "do we need couples therapy", "when to start
  couples therapy", "is couples therapy worth it"; local pull from
  "marriage counseling fullerton" (pos ~17) and "relationship issues newport
  beach" (pos ~36).
- **Angle:** Mirror the format that worked for the premarital "worth it" post.
  Honest answer to couples who are not in crisis: the case for going earlier
  than most people do, what it is and is not, and when to wait. Do NOT rehash
  the pursue-withdraw loop (that is the-fight-isnt-about-the-dishes).
- **Internal links:** `/services/couples-therapy/`, the-fight-isnt-about-the-dishes,
  your-attachment-style-isnt-your-destiny.
- **Category:** Relationships.

### 2. "When Anxiety Shows Up Behind the Wheel" (driving anxiety)
- **Supports:** `/services/therapy-for-anxiety/`
- **Search intent / keywords:** "fear of driving", "driving anxiety therapy",
  "scared to drive on the freeway"; direct hit on the real query
  "therapy for fear of driving in fullerton" (pos ~21). Low-competition niche,
  winnable fast.
- **Angle:** What driving anxiety actually is (often not about driving), why
  avoidance grows it, how depth/attachment-informed work approaches it without
  a pure exposure-checklist framing.
- **Internal links:** `/services/therapy-for-anxiety/`, why-just-relax-never-works.
- **Category:** Anxiety.

### 3. "Therapy for Teens: What Parents Actually Need to Know" (parent-facing)
- **Supports:** `/services/individual-therapy/`
- **Search intent / keywords:** "therapy for teens", "teen therapist near me",
  "how to know if my teen needs therapy"; parents are the searchers, an audience
  the current blog does not address, and Nikole sees teens.
- **Angle:** Written to the parent. How teen therapy works (seen without a parent
  in the room, privacy vs. staying in communication), signs it is worth it, what
  depth work looks like for adolescents. Warm, reassuring, non-alarmist.
- **Internal links:** `/services/individual-therapy/`, `/faqs/`.
- **Category:** Life Transitions (or Self-Awareness).

---

## Tier 2 — strong topical support

### 4. "Imposter Syndrome Isn't Humility" (creatives)
- **Supports:** `/services/therapy-for-creatives/` (that page targets imposter
  syndrome and creative burnout).
- **Keywords:** "imposter syndrome therapy", "imposter syndrome creatives".
  Pairs with the ranking burnout post (pos ~7).
- **Angle:** Reframe imposter feelings as a protective pattern, not a character
  flaw; where it comes from; why reassurance does not fix it.
- **Internal links:** `/services/therapy-for-creatives/`, when-burnout-looks-like-laziness.
- **Category:** Creativity.

### 5. "How Do You Know Therapy Is Working?" (process / AEO)
- **Supports:** `/services/individual-therapy/`
- **Keywords:** "how to know if therapy is working", "how long does therapy take",
  "is my therapy working". Strong informational / AI-answer intent.
- **Angle:** Honest markers of progress in depth work (not symptom-checklist),
  why it is not linear, when to reassess. Pairs with insight-isnt-the-finish-line
  and what-happens-in-a-depth-therapy-session.
- **Internal links:** `/services/individual-therapy/`, insight-isnt-the-finish-line,
  what-happens-in-a-depth-therapy-session.
- **Category:** Self-Awareness.

### 6. "Anxiety You Can Feel in Your Body" (somatic angle)
- **Supports:** `/services/therapy-for-anxiety/`
- **Keywords:** "physical symptoms of anxiety", "anxiety in the body",
  "somatic anxiety". Broadens the anxiety cluster beyond the two existing posts.
- **Angle:** Why anxiety lives in the body, what the physical signals are
  responding to, how listening to them (vs. overriding) is the shift. Do not
  repeat the "just relax doesn't work" thesis.
- **Internal links:** `/services/therapy-for-anxiety/`, high-functioning-and-still-anxious.
- **Category:** Anxiety.

---

## Tier 3 — finish what exists (faith series)

Three **drafts already written** sit unpublished and would give the
faith-integrated and religious-trauma service pages their only supporting
content:
- `when-you-still-believe-and-something-still-hurts`
- `what-faith-integrated-therapy-actually-involves`
- `the-question-nobody-asks-out-loud`

**This is cleanup, not new drafting.** Before publishing: remove any inline AMFT
disclosure line (now handled site-wide), remove the stray inline consultation
line in "when-you-still-believe", confirm dates, optional light warmth pass, and
ensure links to `/services/faith-integrated-therapy/` and
`/services/religious-trauma-therapy/`. High value because those pages currently
have no blog support.

---

## House rules for drafting (read before writing any post)

- **Voice:** warm, plainspoken, confident, first person ("I work with…"), with
  concrete vignettes and varied sentence rhythm. Match the existing posts in
  `src/content/blog/`. No hype, no clinical jargon dumps.
- **No em dashes or en dashes.** Use commas, periods, or restructure. This is a
  hard rule; check the draft before saving.
- **Length:** ~750–900 words.
- **Structure:** short intro that opens inside the reader's experience, then 4–6
  `##` H2 sections, ending with a "how I work" close that links the relevant
  service page and names Newport Beach / Fullerton / online in California.
- **Internal links:** every post links at least one service page and one or two
  related posts (see each brief).
- **Frontmatter:** `title`, `excerpt` (this becomes the meta description, keep it
  under ~155 characters and make it compelling), `category` (must match the enum
  in `src/content/config.ts`), `date`. Add an optional `metaTitle` (no brand
  suffix) when `"<title> | Nikole Sparks Therapy"` would exceed ~60 characters.
- **Local + honest:** include a natural local mention and, where it fits, an
  honest "when this is not the right fit / not yet" note. It builds trust and
  reads like an experienced clinician.
- **Build check:** `npm run build` must pass and internal links must resolve.
