import { defineCollection, z } from 'astro:content';

// Fixed category list — keep in sync with the filter pills on /blog/ and the
// Decap CMS select field in public/admin/config.yml.
export const blogCategories = [
  'Anxiety',
  'Relationships',
  'Self-Awareness',
  'Creativity',
  'Life Transitions',
] as const;

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    category: z.enum(blogCategories),
    date: z.date(),
    author: z.string().default('Nikole Sparks, AMFT'),
    // Path under /public, e.g. "/blog/my-post/cover.jpg". Omit to show a
    // labelled placeholder, same pattern as Portrait.astro elsewhere on the site.
    coverImage: z.string().optional(),
    // Shown large at the top of /blog/ — set on at most one published post.
    featured: z.boolean().default(false),
    // Hidden from /blog/ and returns 404 when true, so drafts can live in the
    // repo without going live.
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
