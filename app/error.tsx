"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      className="min-h-screen flex items-center justify-center px-8"
      style={{ background: "#1c1c1c", fontFamily: "'Outfit', sans-serif" }}
    >
      {/* Subtle background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(240,236,228,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(240,236,228,0.02) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(192,80,74,0.06) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      <div className="relative z-10 text-center max-w-xl">
        {/* Error code */}
        <div className="mb-8">
          <span
            className="font-display"
            style={{
              fontSize: "clamp(6rem,18vw,12rem)",
              color: "rgba(240,236,228,0.04)",
              lineHeight: 1,
              letterSpacing: "0.05em",
              display: "block",
              userSelect: "none",
            }}
          >
            500
          </span>
          <div
            className="relative -mt-10 inline-flex items-center gap-3 px-4 py-1.5 rounded-full"
            style={{ background: "rgba(192,80,74,0.1)", border: "1px solid rgba(192,80,74,0.25)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#c0504a" }} />
            <span className="text-xs font-semibold tracking-[0.18em] uppercase" style={{ color: "#c0504a" }}>
              Internal Server Error
            </span>
          </div>
        </div>

        {/* Message */}
        <h1
          className="font-display mb-4"
          style={{ fontSize: "2.25rem", color: "#f0ece4", letterSpacing: "0.02em" }}
        >
          Something went wrong.
        </h1>
        <p
          className="text-base leading-relaxed mb-10"
          style={{ color: "rgba(240,236,228,0.38)", lineHeight: 1.8 }}
        >
          An unexpected error occurred on the server. This has been logged automatically.
          You can try again or return to the home page.
        </p>

        {/* Error digest for debugging */}
        {error.digest && (
          <div
            className="inline-block mb-10 px-4 py-2 rounded-xl text-xs font-mono"
            style={{
              background: "rgba(240,236,228,0.04)",
              border: "1px solid rgba(240,236,228,0.08)",
              color: "rgba(240,236,228,0.25)",
            }}
          >
            Error ID: {error.digest}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={reset}
            className="px-8 py-3.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-200"
            style={{
              background: "#c0504a",
              color: "#f0ece4",
            }}
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-8 py-3.5 rounded-full text-sm font-medium tracking-wide transition-all duration-200"
            style={{
              color: "rgba(240,236,228,0.45)",
              border: "1px solid rgba(240,236,228,0.1)",
            }}
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}