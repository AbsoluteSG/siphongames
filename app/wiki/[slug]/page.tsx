// app/wiki/[slug]/page.tsx
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import WikiPageTemplate from "@/components/wiki/WikiPageTemplate";
import { WikiSection } from "@/components/wiki/WikiSection";
import { WikiTable } from "@/components/wiki/WikiTable";
import { WikiCallout } from "@/components/wiki/WikiCallout";
import WikiInfobox from "@/components/wiki/WikiInfobox";

// MDX components available inside .mdx files
const components = { WikiSection, WikiTable, WikiCallout, WikiInfobox };

export async function generateStaticParams() {
  const dir = path.join(process.cwd(), "content/wiki");
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => ({ slug: f.replace(".mdx", "") }));
}

export default async function WikiArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), "content/wiki", `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return (
      <div className="py-20 text-center" style={{ color: "rgba(240,236,228,0.3)" }}>
        <p className="font-display text-4xl mb-3" style={{ color: "#f0ece4" }}>Not Found</p>
        <p>No wiki entry exists for <code style={{ color: "#c0504a" }}>{slug}</code>.</p>
      </div>
    );
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data: fm, content } = matter(raw);

  const breadcrumbs = [
    { label: "Wiki", href: "/wiki" },
    ...(fm.category ? [{ label: fm.category, href: `/wiki/${fm.categorySlug ?? ""}` }] : []),
    { label: fm.title },
  ];

  return (
    <WikiPageTemplate
      breadcrumbs={breadcrumbs}
      category={fm.category ?? ""}
      title={fm.title ?? slug}
      summary={fm.summary ?? ""}
      heroImage={fm.heroImage}
      infobox={fm.infobox}
      pagination={{
        prev: fm.prev,
        next: fm.next,
        categoryHref: fm.categoryHref ?? "/wiki",
        categoryLabel: fm.categoryLabel ?? "Back to Wiki",
      }}
    >
      <MDXRemote source={content} components={components} />
    </WikiPageTemplate>
  );
}