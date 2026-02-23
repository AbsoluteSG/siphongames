"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  {
    id: "overview", label: "Overview",
    description: "Your starting point — introduction, controls, and the basics of the game.",
    previewLinks: ["Introduction", "Getting Started", "Patch Notes"],
    icon: (<svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>),
    items: [{ label: "Introduction", slug: "introduction" }, { label: "Getting Started", slug: "getting-started" }, { label: "Patch Notes", slug: "patch-notes" }],
  },
  {
    id: "world", label: "World",
    description: "The setting, its history, and the factions vying for control of the city.",
    previewLinks: ["Lore Overview", "Factions", "Timeline"],
    icon: (<svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064" /></svg>),
    items: [{ label: "Lore Overview", slug: "lore" }, { label: "The City", slug: "the-city" }, { label: "Factions", slug: "factions" }, { label: "Timeline", slug: "timeline" }],
  },
  {
    id: "characters", label: "Characters",
    description: "Every named character — protagonists, allies, and antagonists.",
    previewLinks: ["All Characters", "Protagonist", "NPCs"],
    icon: (<svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>),
    items: [{ label: "All Characters", slug: "characters" }, { label: "Protagonist", slug: "protagonist" }, { label: "NPCs", slug: "npcs" }, { label: "Enemies", slug: "enemies" }],
  },
  {
    id: "combat", label: "Combat",
    description: "The action loop, stamina system, parry mechanics, and weapon classes.",
    previewLinks: ["Combat System", "Stamina", "Status Effects"],
    icon: (<svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>),
    items: [{ label: "Combat System", slug: "combat-system" }, { label: "Mechanics", slug: "mechanics" }, { label: "Stamina", slug: "stamina" }, { label: "Status Effects", slug: "status-effects" }],
  },
  {
    id: "restaurant", label: "Restaurant",
    description: "The restaurant at the heart of the game — menus, recipes, and upgrades.",
    previewLinks: ["Menu Items", "Recipes", "Upgrades"],
    icon: (<svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>),
    items: [{ label: "Menu Items", slug: "menu" }, { label: "Recipes", slug: "recipes" }, { label: "Customers", slug: "customers" }, { label: "Upgrades", slug: "upgrades" }],
  },
  {
    id: "locations", label: "Locations",
    description: "Districts, hidden areas, and every point of interest in the city.",
    previewLinks: ["All Locations", "Districts", "Secret Areas"],
    icon: (<svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>),
    items: [{ label: "All Locations", slug: "locations" }, { label: "Districts", slug: "districts" }, { label: "Secret Areas", slug: "secrets" }],
  },
  {
    id: "items", label: "Items",
    description: "Weapons, consumables, key items, and every collectible in the game.",
    previewLinks: ["Weapons", "Consumables", "Collectibles"],
    icon: (<svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>),
    items: [{ label: "Weapons", slug: "weapons" }, { label: "Consumables", slug: "consumables" }, { label: "Key Items", slug: "key-items" }, { label: "Collectibles", slug: "collectibles" }],
  },
  {
    id: "quests", label: "Quests",
    description: "Walkthroughs for every main, side, and daily quest in the game.",
    previewLinks: ["Main Story", "Side Quests", "Daily Tasks"],
    icon: (<svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>),
    items: [{ label: "Main Story", slug: "main-story" }, { label: "Side Quests", slug: "side-quests" }, { label: "Daily Tasks", slug: "daily-tasks" }],
  },
];

export default function WikiSidebar() {
  const pathname = usePathname();
  const [sidebarHovered, setSidebarHovered] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [previewCat, setPreviewCat] = useState<typeof NAV[0] | null>(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const previewTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showPreview = (cat: typeof NAV[0]) => {
    if (previewTimeout.current) clearTimeout(previewTimeout.current);
    setPreviewCat(cat);
    setPreviewVisible(true);
  };

  const hidePreview = () => {
    previewTimeout.current = setTimeout(() => {
      setPreviewVisible(false);
    }, 120);
  };

  const activeSection = NAV.find((cat) =>
    cat.items.some((item) => pathname === `/wiki/${item.slug}`)
  )?.id ?? null;

  return (
    <>
      <aside
        onMouseEnter={() => setSidebarHovered(true)}
        onMouseLeave={() => { setSidebarHovered(false); hidePreview(); }}
        className="fixed left-0 top-16 bottom-0 z-40 flex flex-col"
        style={{
          width: sidebarHovered ? "240px" : "80px",
          transition: "width 260ms cubic-bezier(0.4,0,0.2,1)",
          background: sidebarHovered ? "rgba(28,28,28,0.98)" : "rgba(28,28,28,0.7)",
          backdropFilter: "blur(24px)",
          borderRight: "1px solid rgba(240,236,228,0.06)",
          overflow: "hidden",
        }}
      >
        <nav className="flex-1 overflow-y-auto overflow-x-hidden py-6" style={{ scrollbarWidth: "none" }}>
          {NAV.map((cat) => {
            const isActive = cat.id === activeSection;
            const isOpen = openSection === cat.id;

            return (
              <div key={cat.id}>
                <button
                  onClick={() => setOpenSection(isOpen ? null : cat.id)}
                  onMouseEnter={() => showPreview(cat)}
                  onMouseLeave={hidePreview}
                  className="w-full flex items-center gap-4 transition-all duration-200 relative"
                  style={{ padding: "12px 20px", minHeight: "52px" }}
                >
                  {/* Active bar */}
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-7 rounded-full" style={{ background: "#c0504a" }} />
                  )}

                  {/* Icon */}
                  <span
                    className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-200"
                    style={{
                      color: isActive ? "#c0504a" : "rgba(240,236,228,0.35)",
                      background: isActive ? "rgba(192,80,74,0.12)" : "transparent",
                      border: isActive ? "1px solid rgba(192,80,74,0.2)" : "1px solid transparent",
                    }}
                  >
                    {cat.icon}
                  </span>

                  {/* Label */}
                  <span
                    className="text-base font-medium whitespace-nowrap flex-1 text-left transition-all duration-200"
                    style={{
                      opacity: sidebarHovered ? 1 : 0,
                      color: isActive ? "#f0ece4" : "rgba(240,236,228,0.5)",
                      transform: sidebarHovered ? "translateX(0)" : "translateX(-6px)",
                    }}
                  >
                    {cat.label}
                  </span>

                  {sidebarHovered && (
                    <span
                      className="flex-shrink-0 text-sm transition-transform duration-200"
                      style={{ color: "rgba(240,236,228,0.18)", transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}
                    >
                      ›
                    </span>
                  )}
                </button>

                {/* Sub-items */}
                {sidebarHovered && (
                  <div
                    className="overflow-hidden transition-all duration-250"
                    style={{ maxHeight: isOpen ? `${cat.items.length * 44}px` : "0px" }}
                  >
                    {cat.items.map((item) => {
                      const isItemActive = pathname === `/wiki/${item.slug}`;
                      return (
                        <Link
                          key={item.slug}
                          href={`/wiki/${item.slug}`}
                          className="flex items-center gap-3 py-2.5 text-sm transition-all duration-150"
                          style={{
                            paddingLeft: "58px",
                            paddingRight: "20px",
                            color: isItemActive ? "#c0504a" : "rgba(240,236,228,0.35)",
                            background: isItemActive ? "rgba(192,80,74,0.08)" : "transparent",
                            fontWeight: isItemActive ? 500 : 400,
                          }}
                        >
                          <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: isItemActive ? "#c0504a" : "rgba(240,236,228,0.18)" }} />
                          {item.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>

      {/* FLOATING PREVIEW PANEL */}
      {previewCat && (
        <div
          onMouseEnter={() => { if (previewTimeout.current) clearTimeout(previewTimeout.current); setPreviewVisible(true); }}
          onMouseLeave={() => setPreviewVisible(false)}
          className="fixed z-50 rounded-2xl overflow-hidden"
          style={{
            left: sidebarHovered ? "256px" : "96px",
            top: "50%",
            transform: `translateY(-50%) translateX(${previewVisible ? "0px" : "-8px"})`,
            width: "260px",
            opacity: previewVisible ? 1 : 0,
            transition: "opacity 200ms ease, transform 200ms ease, left 260ms cubic-bezier(0.4,0,0.2,1)",
            pointerEvents: previewVisible ? "auto" : "none",
            background: "#252525",
            border: "1px solid rgba(240,236,228,0.09)",
            boxShadow: "0 24px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(240,236,228,0.04)",
          }}
        >
          {/* Thumbnail */}
          <div
            className="w-full relative"
            style={{
              height: "120px",
              background: "linear-gradient(135deg, rgba(192,80,74,0.12) 0%, #1c1c1c 100%)",
              borderBottom: "1px solid rgba(240,236,228,0.06)",
            }}
          >
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: "linear-gradient(rgba(240,236,228,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(240,236,228,0.15) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />
            <div className="absolute bottom-3 left-4">
              <span className="font-display text-2xl" style={{ color: "#f0ece4", letterSpacing: "0.04em" }}>
                {previewCat.label}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(240,236,228,0.4)" }}>
              {previewCat.description}
            </p>
            <div className="flex flex-col gap-1">
              {previewCat.previewLinks.map((link) => {
                const item = previewCat.items.find((i) => i.label === link);
                return (
                  <Link
                    key={link}
                    href={item ? `/wiki/${item.slug}` : "#"}
                    className="flex items-center gap-2.5 py-2 text-sm transition-colors duration-150 group"
                    style={{ color: "rgba(240,236,228,0.4)" }}
                  >
                    <span className="w-1 h-1 rounded-full flex-shrink-0 transition-colors duration-150 group-hover:bg-[#c0504a]" style={{ background: "rgba(240,236,228,0.2)" }} />
                    <span className="group-hover:text-[#f0ece4] transition-colors duration-150">{link}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}