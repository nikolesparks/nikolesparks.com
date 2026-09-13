import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { site } from '../data/site';

// RSS feed for the blog, served at /rss.xml. Helps feed readers, content
// distribution, and AI/LLM crawlers discover posts.
export async function GET(context) {
  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );

  return rss({
    title: 'Nikole Sparks Therapy · Field Notes',
    description:
      'Writing on anxiety, relationships, faith, and the ongoing work of understanding yourself, from a depth-oriented therapist in Newport Beach and Fullerton.',
    site: context.site ?? site.url,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.excerpt,
      link: `/blog/${post.slug}/`,
      categories: [post.data.category],
    })),
    customData: '<language>en-us</language>',
  });
}
