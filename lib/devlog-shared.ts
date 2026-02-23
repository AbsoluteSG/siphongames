/**
 * Client-safe devlog utilities — no Node.js built-ins (fs, path).
 * Import this from client components. Import lib/devlog.ts from server components only.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export interface DevlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  heroImage?: string;
  tags: string[];
  featured: boolean;
  status: "draft" | "published";
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

/** Frontmatter only — no content body */
export type DevlogMeta = Omit<DevlogPost, "content">;

// ─── Tag colour map ───────────────────────────────────────────────────────────

export const TAG_COLORS: Record<string, string> = {
  Devlog:    "#c8a84b",
  Update:    "#a060c0",
  News:      "#60a0c0",
  Design:    "#5cb885",
  Technical: "#c0504a",
  Art:       "#e08850",
  Audio:     "#8090c0",
  Combat:    "#c0504a",
  World:     "#60a0c0",
};

export function tagColor(tag: string): string {
  return TAG_COLORS[tag] ?? "rgba(240,236,228,0.35)";
}
