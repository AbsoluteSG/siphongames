import { getFeaturedPost, getPaginatedPosts, toMeta } from "@/lib/devlog";
import DevlogHero from "@/components/devlog/DevlogHero";
import DevlogCard from "@/components/devlog/DevlogCard";
import DevlogPagination from "@/components/devlog/DevlogPagination";

interface Props {
  searchParams: Promise<{ page?: string }>;
}

export default async function DevlogIndex({ searchParams }: Props) {
  const { page: pageParam } = await searchParams;
  const currentPage = Math.max(1, parseInt(pageParam ?? "1", 10) || 1);

  const featured = getFeaturedPost();
  const { posts, totalPages } = getPaginatedPosts(currentPage);

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "72px 40px 48px",
      }}
    >
      {/* ── Page header ────────────────────────────────────────────────── */}
      <div
        style={{
          paddingBottom: "56px",
          borderBottom: "1px solid rgba(240,236,228,0.07)",
          marginBottom: "56px",
        }}
      >
        <div className="flex items-center gap-3 mb-5">
          <div
            style={{
              width: "4px",
              height: "24px",
              borderRadius: "9999px",
              background: "#c0504a",
            }}
          />
          <span
            className="text-sm font-semibold tracking-[0.18em] uppercase"
            style={{ color: "#c0504a" }}
          >
            Studio Devlog
          </span>
        </div>

        <h1
          className="font-display"
          style={{
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            fontWeight: 700,
            color: "#f0ece4",
            letterSpacing: "0.01em",
            lineHeight: 1,
            marginBottom: "20px",
          }}
        >
          Development Updates
        </h1>

        <p
          style={{
            fontSize: "1.0625rem",
            color: "rgba(240,236,228,0.38)",
            maxWidth: "560px",
            lineHeight: 1.8,
          }}
        >
          Design decisions, technical breakdowns, and honest writing about what
          it takes to build No Dogs Allowed. Updated regularly.
        </p>
      </div>

      {/* ── Featured hero post ─────────────────────────────────────────── */}
      {featured && currentPage === 1 && (
        <div style={{ marginBottom: "80px" }}>
          <DevlogHero post={toMeta(featured)} />
        </div>
      )}

      {/* ── Post grid ──────────────────────────────────────────────────── */}
      {posts.length > 0 ? (
        <>
          {/* Section label */}
          <div
            className="flex items-center gap-5"
            style={{ marginBottom: "32px" }}
          >
            <h2
              className="text-sm font-semibold tracking-[0.18em] uppercase"
              style={{ color: "rgba(240,236,228,0.25)", whiteSpace: "nowrap" }}
            >
              {currentPage === 1 ? "All Posts" : `Page ${currentPage}`}
            </h2>
            <div
              style={{
                flex: 1,
                height: "1px",
                background: "rgba(240,236,228,0.06)",
              }}
            />
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-2"
            style={{ gap: "24px", marginBottom: "56px" }}
          >
            {posts.map((post) => (
              <DevlogCard key={post.slug} post={toMeta(post)} />
            ))}
          </div>
        </>
      ) : (
        <div
          className="text-center"
          style={{ padding: "64px 0", color: "rgba(240,236,228,0.25)" }}
        >
          <p className="text-lg">No posts on this page.</p>
        </div>
      )}

      {/* ── Pagination ─────────────────────────────────────────────────── */}
      <DevlogPagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
