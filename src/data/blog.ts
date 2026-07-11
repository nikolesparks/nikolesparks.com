// Shared blog helpers so the listing and post pages compute things the same way.

/** ~225 wpm, rounded up to whole minutes, minimum 1. */
export function readTime(body: string): string {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 225));
  return `${minutes} min read`;
}
