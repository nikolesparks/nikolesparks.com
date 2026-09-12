// Per-category default cover images for blog posts.
//
// Each category maps to a card in public/blog/covers/ (make them 1200x630 so the
// same image serves as the card cover and the social og:image). A post can still
// set its own `coverImage` in frontmatter to override the category default.
//
// The default resolves at build time and is only used if the file actually
// exists in public/, so this wiring is safe to ship before the cards are made:
// posts fall back to the site's default share image until a card is dropped in,
// then light up automatically on the next build.

import { existsSync } from 'node:fs';

const categorySlugs: Record<string, string> = {
  Anxiety: 'anxiety',
  Relationships: 'relationships',
  'Self-Awareness': 'self-awareness',
  Creativity: 'creativity',
  'Life Transitions': 'life-transitions',
  'Faith & Spirituality': 'faith-spirituality',
};

// Checked in order, so a .webp card wins over a .jpg of the same name.
const extensions = ['webp', 'jpg', 'jpeg', 'png'];

/** Default cover path for a category, or undefined if no card file exists yet. */
export function categoryCover(category: string): string | undefined {
  const slug = categorySlugs[category];
  if (!slug) return undefined;
  for (const ext of extensions) {
    const path = `/blog/covers/${slug}.${ext}`;
    if (existsSync(`public${path}`)) return path;
  }
  return undefined;
}

/** A post's cover: its own coverImage if set, otherwise the category default. */
export function coverFor(post: {
  data: { coverImage?: string; category: string };
}): string | undefined {
  return post.data.coverImage ?? categoryCover(post.data.category);
}
