import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPostBySlug, getPublishedPosts, tagColor } from "@/lib/devlog";

export async function generateStaticParams() {
  return getPublishedPosts().map((p) => ({ slug: p.slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function DevlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post || post.status !== "published") notFound();

  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <div
      style={{
        maxWidth: "880px",
        margin: "0 auto",
        padding: "72px 40px 80px",
      }}
    >
      {/* ── Breadcrumbs ────────────────────────────────────────────────── */}
      <nav
        className="flex items-center gap-2 text-xs"
        style={{ color: "rgba(240,236,228,0.28)", marginBottom: "40px" }}
      >
        <Link
          href="/devlog"
          className="transition-colors duration-200 hover:text-[#f0ece4]"
          style={{ color: "rgba(240,236,228,0.28)" }}
        >
          Devlog
        </Link>
        <span style={{ color: "rgba(240,236,228,0.15)" }}>›</span>
        <span
          style={{
            color: "rgba(240,236,228,0.45)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            maxWidth: "320px",
          }}
        >
          {post.title}
        </span>
      </nav>

      {/* ── Article header ─────────────────────────────────────────────── */}
      <header style={{ marginBottom: "40px" }}>
        {/* Tags */}
        <div className="flex flex-wrap gap-2" style={{ marginBottom: "20px" }}>
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-semibold tracking-[0.1em] uppercase px-2.5 py-1 rounded-full"
              style={{
                color: tagColor(tag),
                background: `${tagColor(tag)}15`,
                border: `1px solid ${tagColor(tag)}28`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1
          className="font-display"
          style={{
            fontSize: "clamp(1.875rem, 4vw, 2.75rem)",
            fontWeight: 700,
            color: "#f0ece4",
            letterSpacing: "0.01em",
            lineHeight: 1.2,
            marginBottom: "20px",
          }}
        >
          {post.title}
        </h1>

        {/* Meta row */}
        <div
          className="flex items-center gap-4"
          style={{ color: "rgba(240,236,228,0.3)", fontSize: "0.875rem" }}
        >
          <span>{date}</span>
          {post.updatedAt && post.updatedAt !== post.publishedAt && (
            <>
              <span style={{ color: "rgba(240,236,228,0.12)" }}>·</span>
              <span>
                Updated{" "}
                {new Date(post.updatedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </>
          )}
        </div>
      </header>

      {/* Divider */}
      <div
        style={{
          height: "1px",
          background: "rgba(240,236,228,0.07)",
          marginBottom: "48px",
        }}
      />

      {/* ── Hero image ─────────────────────────────────────────────────── */}
      {post.heroImage && (
        <div
          style={{
            width: "100%",
            height: "400px",
            borderRadius: "16px",
            overflow: "hidden",
            marginBottom: "48px",
            border: "1px solid rgba(240,236,228,0.07)",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundImage: `url(${post.heroImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </div>
      )}

      {/* ── Article body ───────────────────────────────────────────────── */}
      <div className="devlog-prose">
        <MDXRemote source={post.content} />
      </div>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <div
        style={{
          marginTop: "72px",
          paddingTop: "40px",
          borderTop: "1px solid rgba(240,236,228,0.07)",
        }}
      >
        <Link
          href="/devlog"
          className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200 hover:text-[#f0ece4]"
          style={{ color: "rgba(240,236,228,0.35)" }}
        >
          ← Back to Devlog
        </Link>
      </div>

      {/* ── Prose styles ───────────────────────────────────────────────── */}
      <style>{`
        .devlog-prose {
          color: rgba(240,236,228,0.72);
          font-size: 1.0625rem;
          line-height: 1.875;
          font-family: 'Outfit', sans-serif;
        }
        .devlog-prose p {
          margin-bottom: 1.5rem;
        }
        .devlog-prose h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #f0ece4;
          letter-spacing: 0.01em;
          margin-top: 3rem;
          margin-bottom: 1rem;
          padding-bottom: 0.6rem;
          border-bottom: 1px solid rgba(240,236,228,0.07);
        }
        .devlog-prose h3 {
          font-size: 1.125rem;
          font-weight: 600;
          color: rgba(240,236,228,0.88);
          margin-top: 2rem;
          margin-bottom: 0.75rem;
        }
        .devlog-prose h4 {
          font-size: 0.9375rem;
          font-weight: 600;
          color: rgba(240,236,228,0.7);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
        }
        .devlog-prose strong {
          color: rgba(240,236,228,0.9);
          font-weight: 600;
        }
        .devlog-prose em {
          color: rgba(240,236,228,0.65);
          font-style: italic;
        }
        .devlog-prose blockquote {
          margin: 2rem 0;
          padding: 1.25rem 1.5rem;
          border-left: 3px solid rgba(192,80,74,0.5);
          background: rgba(192,80,74,0.06);
          border-radius: 0 12px 12px 0;
          color: rgba(240,236,228,0.6);
          font-style: italic;
        }
        .devlog-prose blockquote p {
          margin-bottom: 0;
        }
        .devlog-prose ul {
          margin-bottom: 1.5rem;
          padding-left: 0;
          list-style: none;
        }
        .devlog-prose ul li {
          padding-left: 1.25rem;
          position: relative;
          margin-bottom: 0.5rem;
        }
        .devlog-prose ul li::before {
          content: '—';
          position: absolute;
          left: 0;
          color: rgba(192,80,74,0.6);
          font-size: 0.875rem;
        }
        .devlog-prose ol {
          margin-bottom: 1.5rem;
          padding-left: 1.5rem;
          counter-reset: list-counter;
          list-style: none;
        }
        .devlog-prose ol li {
          counter-increment: list-counter;
          position: relative;
          padding-left: 0.5rem;
          margin-bottom: 0.5rem;
        }
        .devlog-prose ol li::before {
          content: counter(list-counter) '.';
          position: absolute;
          left: -1.5rem;
          color: rgba(192,80,74,0.6);
          font-weight: 600;
          font-size: 0.875rem;
        }
        .devlog-prose a {
          color: #c0504a;
          text-decoration: none;
          border-bottom: 1px solid rgba(192,80,74,0.3);
          transition: border-color 200ms;
        }
        .devlog-prose a:hover {
          border-bottom-color: rgba(192,80,74,0.7);
        }
        .devlog-prose code {
          font-family: var(--font-geist-mono), monospace;
          font-size: 0.875em;
          background: rgba(240,236,228,0.07);
          border: 1px solid rgba(240,236,228,0.1);
          padding: 0.15em 0.4em;
          border-radius: 5px;
          color: rgba(240,236,228,0.8);
        }
        .devlog-prose pre {
          background: rgba(240,236,228,0.04);
          border: 1px solid rgba(240,236,228,0.08);
          border-radius: 12px;
          padding: 1.25rem 1.5rem;
          overflow-x: auto;
          margin-bottom: 1.5rem;
        }
        .devlog-prose pre code {
          background: none;
          border: none;
          padding: 0;
          font-size: 0.875rem;
          color: rgba(240,236,228,0.7);
        }
        .devlog-prose hr {
          border: none;
          border-top: 1px solid rgba(240,236,228,0.07);
          margin: 2.5rem 0;
        }
        .devlog-prose img {
          width: 100%;
          border-radius: 12px;
          border: 1px solid rgba(240,236,228,0.07);
          margin: 1.5rem 0;
        }
      `}</style>
    </div>
  );
}
