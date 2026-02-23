"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Games", href: "/#games" },
  { label: "Devlog", href: "/devlog" },
  { label: "Wiki", href: "/wiki" },
  { label: "Community", href: "/#community" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled ? "bg-[#07070f]/90 backdrop-blur-xl" : ""
      }`}
    >
      {/* Main nav row */}
      <div className="flex items-center justify-between px-8 py-5">
        <div className="font-display text-3xl tracking-[0.15em] text-[#c8a84b]">
          PLACEHOLDER STUDIO
        </div>

        <ul className="hidden md:flex gap-12 list-none">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="text-white/60 text-base font-medium tracking-[0.14em] uppercase hover:text-white transition-colors duration-200"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <button className="bg-[#c0504a] text-white px-7 py-3 text-base font-bold tracking-[0.1em] uppercase rounded-full hover:opacity-85 transition-opacity duration-200">
          Join Discord
        </button>
      </div>

      {/* Divider line — always visible */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </nav>
  );
}