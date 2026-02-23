import Link from "next/link";

const SECTIONS = [
  { id: "overview", label: "Overview", icon: "⌂", slug: "introduction", desc: "Start here — introduction, controls, and core concepts.", count: 3 },
  { id: "world", label: "World", icon: "◎", slug: "lore", desc: "The city, its factions, lore, and deep history.", count: 4 },
  { id: "characters", label: "Characters", icon: "◈", slug: "characters", desc: "Protagonists, allies, antagonists, and every NPC.", count: 4 },
  { id: "combat", label: "Combat", icon: "⚡", slug: "combat-system", desc: "Action loop, stamina, parry windows, and weapon classes.", count: 4 },
  { id: "restaurant", label: "Restaurant", icon: "✦", slug: "menu", desc: "Menus, recipes, customer management, and upgrades.", count: 4 },
  { id: "locations", label: "Locations", icon: "◉", slug: "locations", desc: "Every district, secret area, and landmark.", count: 3 },
  { id: "items", label: "Items", icon: "◆", slug: "weapons", desc: "Weapons, consumables, key items, and collectibles.", count: 4 },
  { id: "quests", label: "Quests", icon: "☑", slug: "main-story", desc: "Main story, side quests, and daily tasks.", count: 3 },
];

const RECENT = [
  { title: "Combat System", category: "Combat", slug: "combat-system", updated: "2 days ago" },
  { title: "The City", category: "World", slug: "the-city", updated: "4 days ago" },
  { title: "Recipes", category: "Restaurant", slug: "recipes", updated: "5 days ago" },
  { title: "Protagonist", category: "Characters", slug: "protagonist", updated: "1 week ago" },
  { title: "Secret Areas", category: "Locations", slug: "secrets", updated: "1 week ago" },
];

export default function WikiHome() {
  return (
    <div>
      {/* Page header */}
      <div className="mb-14" style={{ paddingBottom: "48px", borderBottom: "1px solid rgba(240,236,228,0.07)" }}>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-1 h-6 rounded-full" style={{ background: "#c0504a" }} />
          <span className="text-sm font-semibold tracking-[0.18em] uppercase" style={{ color: "#c0504a" }}>
            Official Wiki
          </span>
        </div>
        <h1 className="font-display text-7xl mb-5" style={{ color: "#f0ece4", letterSpacing: "0.02em", lineHeight: 1 }}>
          No Dogs Allowed
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: "rgba(240,236,228,0.38)", maxWidth: "640px", lineHeight: 1.8 }}>
          The complete official reference for mechanics, lore, characters, and everything in the world of No Dogs Allowed. Select a category below or use the sidebar to navigate.
        </p>
      </div>

      {/* Section grid */}
      <div className="grid grid-cols-2 gap-4 mb-16">
        {SECTIONS.map((s) => (
          <Link
            key={s.id}
            href={`/wiki/${s.slug}`}
            className="group relative rounded-2xl p-7 transition-all duration-250 overflow-hidden"
            style={{ background: "rgba(240,236,228,0.025)", border: "1px solid rgba(240,236,228,0.07)" }}
          >
            {/* Hover gradient */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"
              style={{ background: "linear-gradient(135deg, rgba(192,80,74,0.08) 0%, transparent 60%)" }}
            />

            {/* Top accent line on hover */}
            <div
              className="absolute top-0 left-8 right-8 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: "linear-gradient(to right, transparent, rgba(192,80,74,0.5), transparent)" }}
            />

            <div className="relative z-10">
              <div className="flex items-start justify-between mb-5">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
                  style={{ background: "rgba(240,236,228,0.05)", border: "1px solid rgba(240,236,228,0.08)", color: "rgba(240,236,228,0.4)" }}
                >
                  {s.icon}
                </div>
                <span className="text-xs mt-1" style={{ color: "rgba(240,236,228,0.2)" }}>{s.count} articles</span>
              </div>
              <h3
                className="text-xl font-semibold mb-2.5 transition-colors duration-200 group-hover:text-[#f0ece4]"
                style={{ color: "rgba(240,236,228,0.75)" }}
              >
                {s.label}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(240,236,228,0.28)", lineHeight: 1.7 }}>
                {s.desc}
              </p>
              <div
                className="mt-6 text-sm font-medium transition-colors duration-200 group-hover:text-[#c0504a]"
                style={{ color: "rgba(240,236,228,0.2)" }}
              >
                Browse →
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recently updated */}
      <div>
        <div className="flex items-center gap-5 mb-6">
          <h2 className="text-sm font-semibold tracking-[0.18em] uppercase" style={{ color: "rgba(240,236,228,0.25)" }}>
            Recently Updated
          </h2>
          <div className="flex-1 h-px" style={{ background: "rgba(240,236,228,0.06)" }} />
        </div>
        <div className="flex flex-col gap-2">
          {RECENT.map((entry) => (
            <Link
              key={entry.slug}
              href={`/wiki/${entry.slug}`}
              className="group flex items-center justify-between px-5 py-4 rounded-xl transition-all duration-200"
              style={{ background: "rgba(240,236,228,0.025)", border: "1px solid rgba(240,236,228,0.06)" }}
            >
              <div className="flex items-center gap-4">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "rgba(240,236,228,0.15)" }} />
                <span className="text-base font-medium transition-colors duration-200 group-hover:text-[#f0ece4]" style={{ color: "rgba(240,236,228,0.6)" }}>
                  {entry.title}
                </span>
                <span className="text-sm" style={{ color: "rgba(240,236,228,0.22)" }}>{entry.category}</span>
              </div>
              <span className="text-sm" style={{ color: "rgba(240,236,228,0.2)" }}>{entry.updated}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}