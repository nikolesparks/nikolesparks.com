import { defineCollection, z } from 'astro:content';

// Fixed category list — keep in sync with the filter pills on /blog/ and the
// Decap CMS select field in public/admin/config.yml.
export const blogCategories = [
  'Anxiety',
  'Relationships',
  'Self-Awareness',
  'Creativity',
  'Life Transitions',
  'Faith & Spirituality',
] as const;

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    // Optional <title> override. Defaults to `${title} | Nikole Sparks Therapy`;
    // set this on posts whose branded title would run past ~60 characters.
    metaTitle: z.string().optional(),
    excerpt: z.string(),
    category: z.enum(blogCategories),
    date: z.date(),
    author: z.string().default('Nikole Sparks, AMFT'),
    // Path under /public, e.g. "/blog/my-post/cover.jpg". Omit to fall back to
    // the per-category default card (see src/data/covers.ts); if neither exists,
    // a labelled placeholder shows, same pattern as Portrait.astro.
    coverImage: z.string().optional(),
    // Alt text for the cover image. Leave unset for a decorative category card
    // (renders empty alt); set it when coverImage is a meaningful photo.
    coverAlt: z.string().optional(),
    // Shown large at the top of /blog/ — set on at most one published post.
    featured: z.boolean().default(false),
    // Hidden from /blog/ and returns 404 when true, so drafts can live in the
    // repo without going live.
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
