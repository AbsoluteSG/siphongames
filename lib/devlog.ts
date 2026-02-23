/**
 * Server-only devlog data layer — uses Node.js fs/path.
 * Import ONLY from Server Components or server-side functions.
 * Client components should import from lib/devlog-shared.ts instead.
 */
import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Re-export shared types & utilities so server-side callers only need one import
export type { DevlogPost, DevlogMeta } from "@/lib/devlog-shared";
export { TAG_COLORS, tagColor } from "@/lib/devlog-shared";
import type { DevlogPost, DevlogMeta } from "@/lib/devlog-shared";

// ─── Constants ────────────────────────────────────────────────────────────────

const CONTENT_DIR = path.join(process.cwd(), "content/devlog");
export const POSTS_PER_PAGE = 6;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function parsePost(filename: string): DevlogPost {
  const slug = filename.replace(/\.mdx$/, "");
  const raw  = fs.readFileSync(path.join(CONTENT_DIR, filename), "utf-8");
  const { data: fm, content } = matter(raw);

  return {
    id:          slug,
    slug,
    title:       fm.title       ?? "",
    excerpt:     fm.excerpt     ?? "",
    content,
    heroImage:   fm.heroImage,
    tags:        fm.tags        ?? [],
    featured:    fm.featured    ?? false,
    status:      fm.status      ?? "draft",
    publishedAt: fm.publishedAt ?? fm.createdAt ?? "",
    createdAt:   fm.createdAt   ?? "",
    updatedAt:   fm.updatedAt   ?? fm.createdAt ?? "",
  };
}

// ─── Public API ───────────────────────────────────────────────────────────────

/** All posts (published + draft), sorted newest first. */
export function getAllPosts(): DevlogPost[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map(parsePost)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

/** Only status === "published" posts, sorted newest first. */
export function getPublishedPosts(): DevlogPost[] {
  return getAllPosts().filter((p) => p.status === "published");
}

/** First post with featured === true that is also published. */
export function getFeaturedPost(): DevlogPost | null {
  return getPublishedPosts().find((p) => p.featured) ?? null;
}

/**
 * Published posts excluding the featured one.
 * Used to populate the card grid beneath the hero.
 */
export function getNonFeaturedPosts(): DevlogPost[] {
  const featured = getFeaturedPost();
  return getPublishedPosts().filter(
    (p) => !featured || p.slug !== featured.slug
  );
}

/** Single post by slug — returns null if not found. */
export function getPostBySlug(slug: string): DevlogPost | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  return parsePost(`${slug}.mdx`);
}

/**
 * Paginated slice of non-featured published posts.
 * Page is 1-indexed.
 */
export function getPaginatedPosts(page = 1): {
  posts: DevlogPost[];
  totalPages: number;
  currentPage: number;
  totalPosts: number;
} {
  const all        = getNonFeaturedPosts();
  const totalPosts = all.length;
  const totalPages = Math.max(1, Math.ceil(totalPosts / POSTS_PER_PAGE));
  const current    = Math.max(1, Math.min(page, totalPages));
  const start      = (current - 1) * POSTS_PER_PAGE;

  return {
    posts:       all.slice(start, start + POSTS_PER_PAGE),
    totalPages,
    currentPage: current,
    totalPosts,
  };
}

/** Strip content — returns only frontmatter fields. */
export function toMeta(post: DevlogPost): DevlogMeta {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { content: _content, ...meta } = post;
  return meta;
}
