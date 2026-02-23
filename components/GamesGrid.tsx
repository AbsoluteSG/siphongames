"use client";

import { useEffect, useState } from "react";

const GAMES = [
  { title: "IRON VEIL", genre: "Action RPG", status: "Wishlist Now", accent: "#c0a060" },
  { title: "ECHO RIFT", genre: "Sci-Fi Platformer", status: "In Development", accent: "#60c0c0" },
  { title: "NULLPOINT", genre: "Tactical Shooter", status: "Coming Soon", accent: "#a060c0" },
  { title: "VERDANT", genre: "Survival Sandbox", status: "Prototype", accent: "#60c090" },
];

const CARD_WIDTH = 300;
const GAP = 24;
const STEP = CARD_WIDTH + GAP;
const VISIBLE = 5; // 2 left + center + 2 right
const INTERVAL_MS = 2800;
const TRANSITION_MS = 600;

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

export default function GamesGrid() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setActiveIndex((i) => mod(i + 1, GAMES.length));
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, [paused]);

  // Build the 5 visible slots around the active index
  const slots = [-2, -1, 0, 1, 2].map((offset) => ({
    offset,
    game: GAMES[mod(activeIndex + offset, GAMES.length)],
  }));

  const totalWidth = VISIBLE * STEP - GAP;

  return (
    <section id="games" className="py-24 overflow-hidden">

      {/* Header */}
      <div className="px-8 max-w-[1600px] mx-auto mb-12 flex items-baseline gap-6">
        <h2 className="font-display text-[clamp(3rem,5vw,5rem)] text-white">Our Games</h2>
        <div className="flex-1 h-px bg-white/[0.08]" />
        <span className="text-white/45 text-sm tracking-widest">{GAMES.length} Titles</span>
      </div>

      {/* Carousel */}
      <div
        className="relative flex justify-center items-center py-8"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        style={{
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 18%, black 82%, transparent 100%)",
          maskImage: "linear-gradient(to right, transparent 0%, black 18%, black 82%, transparent 100%)",
        }}
      >
        {/* Fixed-width track so cards are always centered */}
        <div className="relative" style={{ width: `${totalWidth}px`, height: "460px" }}>
          {slots.map(({ offset, game }) => {
            const isActive = offset === 0;
            const dist = Math.abs(offset);
            const opacity = dist === 0 ? 1 : dist === 1 ? 0.5 : 0.2;
            const scale = isActive ? 1 : 0.92;
            const x = (offset + 2) * STEP; // position within track

            return (
              <div
                key={offset}
                onClick={() => setActiveIndex(mod(activeIndex + offset, GAMES.length))}
                className="absolute top-1/2 cursor-pointer overflow-hidden border"
                style={{
                  width: `${CARD_WIDTH}px`,
                  height: "440px",
                  left: `${x}px`,
                  transform: `translateY(-50%) scale(${scale})`,
                  opacity,
                  borderColor: isActive ? `${game.accent}55` : "rgba(255,255,255,0.06)",
                  boxShadow: isActive ? `0 0 40px ${game.accent}22` : "none",
                  transition: `opacity ${TRANSITION_MS}ms ease, transform ${TRANSITION_MS}ms ease, border-color ${TRANSITION_MS}ms ease, box-shadow ${TRANSITION_MS}ms ease`,
                  zIndex: isActive ? 10 : 5 - dist,
                }}
              >
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#1a1428] via-[#0d1520] to-[#060610]">
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
                      backgroundSize: "30px 30px",
                    }}
                  />
                  <div
                    className="absolute bottom-0 left-0 right-0 h-48"
                    style={{
                      opacity: isActive ? 0.35 : 0.15,
                      background: `linear-gradient(to top, ${game.accent}, transparent)`,
                      transition: `opacity ${TRANSITION_MS}ms ease`,
                    }}
                  />
                  {/* Replace with:
                  <Image src={game.image} alt={game.title} fill style={{ objectFit: "cover" }} />
                  */}
                </div>

                {/* Top accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{
                    background: game.accent,
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? "scaleX(1)" : "scaleX(0)",
                    transformOrigin: "left",
                    transition: `opacity ${TRANSITION_MS}ms ease, transform ${TRANSITION_MS}ms ease`,
                  }}
                />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                  <p
                    className="text-[0.65rem] font-semibold tracking-[0.2em] uppercase mb-2"
                    style={{ color: game.accent }}
                  >
                    {game.genre}
                  </p>
                  <h3 className="font-display text-2xl text-white leading-none mb-3">
                    {game.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs font-medium tracking-[0.1em] uppercase text-white/40">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: game.accent }} />
                    {game.status}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-3 mt-6">
        {GAMES.map((game, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className="transition-all duration-500"
            style={{
              width: i === activeIndex ? "28px" : "6px",
              height: "6px",
              borderRadius: "3px",
              background: i === activeIndex ? game.accent : "rgba(255,255,255,0.2)",
            }}
          />
        ))}
      </div>
    </section>
  );
}