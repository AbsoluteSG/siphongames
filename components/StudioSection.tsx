const STATS = [
  { n: "4", label: "Titles in Development" },
  { n: "3", label: "Years Active" },
  { n: "12k+", label: "Wishlist Followers" },
  { n: "∞", label: "Hours of Lore" },
];

const DEVLOG_POSTS = [
  { title: "Combat System Overhaul", desc: "How we rebuilt melee from scratch to feel weighty and intentional." },
  { title: "World Map Reveal", desc: "A first look at the regions of Iron Veil and their lore." },
  { title: "Soundtrack Dev Notes", desc: "Composing for tension, silence, and the spaces between." },
];

export default function StudioSection() {
  return (
    <section className="px-12 py-28 max-w-[1300px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">

        {/* Left — studio copy + stats */}
        <div>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] text-white leading-none mb-6">
            Small Team,<br />Big Worlds.
          </h2>
          <p className="text-white/45 text-[0.95rem] leading-relaxed mb-4">
            We're an independent studio obsessed with building dense, atmospheric
            worlds and systems that reward curiosity. Every game we ship is
            handcrafted with a focus on depth, art, and player agency.
          </p>
          <p className="text-white/45 text-[0.95rem] leading-relaxed">
            Based everywhere and nowhere — distributed, async, and shipping.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-px bg-white/[0.08] border border-white/[0.08] mt-10">
            {STATS.map((s) => (
              <div key={s.label} className="bg-[#07070f] p-7">
                <div className="font-display text-[2.5rem] text-[#c8a84b] leading-none mb-1">
                  {s.n}
                </div>
                <div className="text-[0.7rem] font-medium tracking-[0.12em] uppercase text-white/45">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — glassmorphism devlog card */}
        <div className="relative bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl p-10 overflow-hidden">
          {/* Glow behind glass */}
          <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(ellipse_at_center,rgba(200,168,75,0.05)_0%,transparent_60%)] pointer-events-none" />

          <div className="relative">
            <h3 className="font-display text-2xl text-white mb-3">Latest from the Forge</h3>
            <p className="text-white/45 text-sm leading-relaxed mb-6">
              Development updates, design notes, and behind-the-scenes content
              from our team — published when there's something worth saying.
            </p>

            <div className="flex flex-col">
              {DEVLOG_POSTS.map((post, i) => (
                <div
                  key={post.title}
                  className={`flex items-start gap-4 py-4 ${
                    i === 0 ? "border-t border-white/[0.08]" : ""
                  } border-b border-white/[0.08]`}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#c8a84b] mt-1.5 flex-shrink-0" />
                  <div>
                    <p className="text-white/90 text-sm font-medium mb-0.5">{post.title}</p>
                    <p className="text-white/40 text-sm leading-relaxed">{post.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="mt-6 border border-white/[0.08] text-white/45 px-6 py-3 text-xs font-medium tracking-[0.12em] uppercase hover:border-white/20 hover:text-white/90 transition-all duration-200">
              Read All Devlogs →
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
