"use client";

import { useState, useCallback } from "react";
import Link from "next/link";

// ─── Available tags ────────────────────────────────────────────────────────────
const ALL_TAGS = [
  "Devlog", "Update", "News", "Design",
  "Technical", "Art", "Audio", "Combat", "World",
];

// ─── Types ────────────────────────────────────────────────────────────────────
interface FormState {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  heroImage: string;
  tags: string[];
  featured: boolean;
  status: "draft" | "published";
}

type SubmitMode = "draft" | "publish";

// ─── Helpers ─────────────────────────────────────────────────────────────────
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function FieldLabel({
  label,
  required,
  hint,
}: {
  label: string;
  required?: boolean;
  hint?: string;
}) {
  return (
    <div style={{ marginBottom: "8px" }}>
      <label
        className="text-sm font-semibold tracking-[0.06em] uppercase"
        style={{ color: "rgba(240,236,228,0.55)" }}
      >
        {label}
        {required && (
          <span style={{ color: "#c0504a", marginLeft: "4px" }}>*</span>
        )}
      </label>
      {hint && (
        <p
          className="text-xs"
          style={{ color: "rgba(240,236,228,0.25)", marginTop: "2px" }}
        >
          {hint}
        </p>
      )}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "rgba(240,236,228,0.04)",
  border: "1px solid rgba(240,236,228,0.09)",
  borderRadius: "10px",
  padding: "12px 16px",
  color: "#f0ece4",
  fontSize: "0.9375rem",
  fontFamily: "'Outfit', sans-serif",
  outline: "none",
  transition: "border-color 200ms",
};

const inputFocusStyle: React.CSSProperties = {
  borderColor: "rgba(192,80,74,0.45)",
};

function TextField({
  value,
  onChange,
  placeholder,
  error,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        ...inputStyle,
        ...(focused ? inputFocusStyle : {}),
        ...(error ? { borderColor: "rgba(192,80,74,0.6)" } : {}),
      }}
    />
  );
}

function TextArea({
  value,
  onChange,
  rows = 4,
  placeholder,
  monospace,
}: {
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  placeholder?: string;
  monospace?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        ...inputStyle,
        resize: "vertical",
        lineHeight: 1.65,
        fontFamily: monospace
          ? "var(--font-geist-mono), monospace"
          : "'Outfit', sans-serif",
        fontSize: monospace ? "0.875rem" : "0.9375rem",
        ...(focused ? inputFocusStyle : {}),
      }}
    />
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function NewDevlogPost() {
  const [form, setForm] = useState<FormState>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    heroImage: "",
    tags: [],
    featured: false,
    status: "draft",
  });

  const [slugManual, setSlugManual] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState<SubmitMode | null>(null);
  const [loading, setLoading] = useState(false);

  // Auto-slug from title when not manually edited
  const handleTitleChange = useCallback(
    (val: string) => {
      setForm((f) => ({
        ...f,
        title: val,
        slug: slugManual ? f.slug : slugify(val),
      }));
    },
    [slugManual]
  );

  const handleTagToggle = (tag: string) => {
    setForm((f) => ({
      ...f,
      tags: f.tags.includes(tag)
        ? f.tags.filter((t) => t !== tag)
        : [...f.tags, tag],
    }));
  };

  const validate = (): boolean => {
    const e: typeof errors = {};
    if (!form.title.trim()) e.title = "Title is required.";
    if (!form.slug.trim()) e.slug = "Slug is required.";
    if (!form.excerpt.trim()) e.excerpt = "Excerpt is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (mode: SubmitMode) => {
    if (!validate()) return;
    setLoading(true);

    // Simulate async save — replace with real API call when auth is wired up
    setTimeout(() => {
      setLoading(false);
      setSubmitted(mode);
    }, 800);
  };

  // ── Success state ──────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div
        style={{
          maxWidth: "680px",
          margin: "0 auto",
          padding: "80px 40px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "16px",
            background: "rgba(192,80,74,0.12)",
            border: "1px solid rgba(192,80,74,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 24px",
            fontSize: "1.5rem",
          }}
        >
          {submitted === "publish" ? "✦" : "○"}
        </div>

        <h2
          className="font-display text-3xl font-bold"
          style={{ color: "#f0ece4", marginBottom: "12px" }}
        >
          {submitted === "publish" ? "Post Published" : "Draft Saved"}
        </h2>
        <p style={{ color: "rgba(240,236,228,0.4)", marginBottom: "36px" }}>
          {submitted === "publish"
            ? `"${form.title}" is now live at /devlog/${form.slug}`
            : `"${form.title}" has been saved as a draft.`}
        </p>

        <div className="flex gap-4 justify-center">
          {submitted === "publish" && (
            <Link
              href={`/devlog/${form.slug}`}
              style={{
                background: "#c0504a",
                color: "#fff",
                padding: "10px 24px",
                borderRadius: "10px",
                fontWeight: 600,
                fontSize: "0.9rem",
                textDecoration: "none",
              }}
            >
              View Post
            </Link>
          )}
          <Link
            href="/devlog"
            style={{
              background: "rgba(240,236,228,0.06)",
              border: "1px solid rgba(240,236,228,0.1)",
              color: "rgba(240,236,228,0.6)",
              padding: "10px 24px",
              borderRadius: "10px",
              fontWeight: 500,
              fontSize: "0.9rem",
              textDecoration: "none",
            }}
          >
            Back to Devlog
          </Link>
          <button
            onClick={() => {
              setSubmitted(null);
              setForm({
                title: "", slug: "", excerpt: "", content: "",
                heroImage: "", tags: [], featured: false, status: "draft",
              });
              setSlugManual(false);
            }}
            style={{
              background: "rgba(240,236,228,0.04)",
              border: "1px solid rgba(240,236,228,0.08)",
              color: "rgba(240,236,228,0.4)",
              padding: "10px 24px",
              borderRadius: "10px",
              fontWeight: 500,
              fontSize: "0.9rem",
              cursor: "pointer",
            }}
          >
            New Post
          </button>
        </div>
      </div>
    );
  }

  // ── Form ───────────────────────────────────────────────────────────────────
  return (
    <div
      style={{
        maxWidth: "840px",
        margin: "0 auto",
        padding: "72px 40px 80px",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "48px" }}>
        <Link
          href="/devlog"
          className="text-xs font-medium tracking-[0.08em] uppercase transition-colors hover:text-[#f0ece4]"
          style={{ color: "rgba(240,236,228,0.28)", display: "block", marginBottom: "24px" }}
        >
          ← Devlog
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <div
            style={{
              width: "4px",
              height: "22px",
              borderRadius: "9999px",
              background: "#c0504a",
            }}
          />
          <span
            className="text-sm font-semibold tracking-[0.18em] uppercase"
            style={{ color: "#c0504a" }}
          >
            New Post
          </span>
        </div>

        <h1
          className="font-display text-4xl font-bold"
          style={{ color: "#f0ece4" }}
        >
          Create a Post
        </h1>

        {/* Auth placeholder notice */}
        <div
          className="flex items-start gap-3 mt-6 p-4 rounded-xl"
          style={{
            background: "rgba(200,168,75,0.07)",
            border: "1px solid rgba(200,168,75,0.18)",
          }}
        >
          <span style={{ color: "#c8a84b", fontSize: "0.875rem" }}>⚠</span>
          <p className="text-xs" style={{ color: "rgba(240,236,228,0.45)", lineHeight: 1.6 }}>
            This form is in <strong style={{ color: "rgba(240,236,228,0.65)" }}>admin-ready</strong> mode.
            Submission is stubbed — connect a backend and role-based auth to make it live.
          </p>
        </div>
      </div>

      {/* ── Form body ───────────────────────────────────────────────────── */}
      <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>

        {/* Title */}
        <div>
          <FieldLabel label="Title" required />
          <TextField
            value={form.title}
            onChange={handleTitleChange}
            placeholder="Post title…"
            error={!!errors.title}
          />
          {errors.title && (
            <p className="text-xs mt-1.5" style={{ color: "#c0504a" }}>{errors.title}</p>
          )}
        </div>

        {/* Slug */}
        <div>
          <FieldLabel
            label="Slug"
            required
            hint="Auto-generated from title. Edit to override."
          />
          <div className="flex items-center gap-0" style={{ position: "relative" }}>
            <span
              style={{
                position: "absolute",
                left: "16px",
                color: "rgba(240,236,228,0.22)",
                fontSize: "0.875rem",
                pointerEvents: "none",
                fontFamily: "var(--font-geist-mono), monospace",
              }}
            >
              /devlog/
            </span>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => {
                setSlugManual(true);
                setForm((f) => ({ ...f, slug: slugify(e.target.value) }));
              }}
              placeholder="post-slug"
              style={{
                ...inputStyle,
                paddingLeft: "96px",
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: "0.875rem",
                ...(errors.slug ? { borderColor: "rgba(192,80,74,0.6)" } : {}),
              }}
            />
          </div>
          {errors.slug && (
            <p className="text-xs mt-1.5" style={{ color: "#c0504a" }}>{errors.slug}</p>
          )}
        </div>

        {/* Excerpt */}
        <div>
          <FieldLabel
            label="Excerpt"
            required
            hint="Shown on the index page and in SEO previews. 1–2 sentences."
          />
          <TextArea
            value={form.excerpt}
            onChange={(v) => setForm((f) => ({ ...f, excerpt: v }))}
            rows={3}
            placeholder="A short, compelling summary of the post…"
          />
          {errors.excerpt && (
            <p className="text-xs mt-1.5" style={{ color: "#c0504a" }}>{errors.excerpt}</p>
          )}
        </div>

        {/* Content */}
        <div>
          <FieldLabel
            label="Content"
            hint="Markdown / MDX. Headings, blockquotes, lists, and inline code all supported."
          />
          <TextArea
            value={form.content}
            onChange={(v) => setForm((f) => ({ ...f, content: v }))}
            rows={18}
            placeholder={`## Section heading\n\nYour content here…\n\n> A blockquote\n\n- List item one\n- List item two`}
            monospace
          />
        </div>

        {/* Hero image */}
        <div>
          <FieldLabel
            label="Hero Image URL"
            hint="Absolute or relative URL to the cover image. Leave blank to use the gradient placeholder."
          />
          <TextField
            value={form.heroImage}
            onChange={(v) => setForm((f) => ({ ...f, heroImage: v }))}
            placeholder="/images/devlog/my-post-cover.jpg"
          />
        </div>

        {/* ── Tags ──────────────────────────────────────────────────────── */}
        <div>
          <FieldLabel label="Tags" hint="Select all that apply." />
          <div className="flex flex-wrap gap-2">
            {ALL_TAGS.map((tag) => {
              const active = form.tags.includes(tag);
              const c = active ? "#c0504a" : "rgba(240,236,228,0.3)";
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleTagToggle(tag)}
                  style={{
                    padding: "6px 14px",
                    borderRadius: "8px",
                    fontSize: "0.8125rem",
                    fontWeight: 500,
                    cursor: "pointer",
                    transition: "all 200ms",
                    color: active ? "#f0ece4" : "rgba(240,236,228,0.45)",
                    background: active
                      ? "rgba(192,80,74,0.14)"
                      : "rgba(240,236,228,0.04)",
                    border: `1px solid ${active ? "rgba(192,80,74,0.4)" : "rgba(240,236,228,0.08)"}`,
                  }}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Options row ───────────────────────────────────────────────── */}
        <div
          className="grid grid-cols-1 md:grid-cols-2"
          style={{ gap: "24px" }}
        >
          {/* Featured toggle */}
          <div>
            <FieldLabel
              label="Featured"
              hint="Pin this post as the hero on the devlog index."
            />
            <button
              type="button"
              onClick={() => setForm((f) => ({ ...f, featured: !f.featured }))}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                cursor: "pointer",
                background: "none",
                border: "none",
                padding: 0,
              }}
            >
              {/* Toggle pill */}
              <div
                style={{
                  width: "44px",
                  height: "24px",
                  borderRadius: "12px",
                  background: form.featured
                    ? "rgba(192,80,74,0.5)"
                    : "rgba(240,236,228,0.08)",
                  border: `1px solid ${form.featured ? "rgba(192,80,74,0.6)" : "rgba(240,236,228,0.12)"}`,
                  position: "relative",
                  transition: "all 250ms",
                }}
              >
                <div
                  style={{
                    width: "16px",
                    height: "16px",
                    borderRadius: "50%",
                    background: "#f0ece4",
                    position: "absolute",
                    top: "3px",
                    left: form.featured ? "23px" : "3px",
                    transition: "left 250ms",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.4)",
                  }}
                />
              </div>
              <span
                className="text-sm"
                style={{
                  color: form.featured
                    ? "rgba(240,236,228,0.75)"
                    : "rgba(240,236,228,0.3)",
                }}
              >
                {form.featured ? "Featured" : "Not featured"}
              </span>
            </button>
          </div>

          {/* Status */}
          <div>
            <FieldLabel label="Status" />
            <div className="flex gap-2">
              {(["draft", "published"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, status: s }))}
                  style={{
                    flex: 1,
                    padding: "10px",
                    borderRadius: "10px",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    cursor: "pointer",
                    transition: "all 200ms",
                    textTransform: "capitalize",
                    color:
                      form.status === s
                        ? "#f0ece4"
                        : "rgba(240,236,228,0.35)",
                    background:
                      form.status === s
                        ? "rgba(192,80,74,0.14)"
                        : "rgba(240,236,228,0.03)",
                    border:
                      form.status === s
                        ? "1px solid rgba(192,80,74,0.35)"
                        : "1px solid rgba(240,236,228,0.07)",
                  }}
                >
                  {s === "draft" ? "○ Draft" : "✦ Published"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Submit actions ────────────────────────────────────────────── */}
        <div
          style={{
            paddingTop: "24px",
            borderTop: "1px solid rgba(240,236,228,0.07)",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <button
            type="button"
            onClick={() => handleSubmit("publish")}
            disabled={loading}
            style={{
              background: "#c0504a",
              color: "#fff",
              padding: "11px 28px",
              borderRadius: "10px",
              fontWeight: 700,
              fontSize: "0.9rem",
              letterSpacing: "0.04em",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.6 : 1,
              border: "none",
              transition: "opacity 200ms",
            }}
          >
            {loading ? "Saving…" : "Publish Post"}
          </button>

          <button
            type="button"
            onClick={() => handleSubmit("draft")}
            disabled={loading}
            style={{
              background: "rgba(240,236,228,0.05)",
              border: "1px solid rgba(240,236,228,0.1)",
              color: "rgba(240,236,228,0.55)",
              padding: "11px 24px",
              borderRadius: "10px",
              fontWeight: 500,
              fontSize: "0.9rem",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.6 : 1,
              transition: "opacity 200ms",
            }}
          >
            Save as Draft
          </button>

          <Link
            href="/devlog"
            style={{
              marginLeft: "auto",
              fontSize: "0.875rem",
              color: "rgba(240,236,228,0.28)",
              textDecoration: "none",
            }}
          >
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
}
