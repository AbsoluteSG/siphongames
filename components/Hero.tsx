import Image from "next/image";

const FEATURED_GAME = {
  title: "NO DOGS ALLOWED",
  description:
    "A relentless descent into a world consumed by war and shadow. Forge your path through fractured kingdoms, wield ancient power, and decide the fate of a dying civilization.",
  tags: ["Action RPG", "Dark Fantasy", "Open World"],
  image: "/Header.png",
};

export default function Hero() {
  return (
    <section className="relative w-full pt-24 overflow-hidden min-h-[1100px] flex items-center">

      {/* Full background image */}
      <Image
        src={FEATURED_GAME.image}
        alt={FEATURED_GAME.title}
        fill
        style={{ objectFit: "cover", objectPosition: "center" }}
        priority
      />

      {/* Dark overlay so text stays readable */}
      <div className="absolute inset-0 bg-[#07070f]/60" />

      {/* Left fade so text area is extra legible */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#07070f] via-[#07070f]/70 to-transparent" />

      {/* Bottom fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#07070f] to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-[1600px] mx-auto px-8 py-20 w-full">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-px bg-[#c8a84b]" />
            <span className="text-[#c8a84b] text-sm font-semibold tracking-[0.2em] uppercase">
              Featured Title
            </span>
          </div>

          {/* Title */}
          <h1
            className="leading-none text-white mb-6"
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(3rem,5vw,6rem)",
              fontWeight: 900,
              letterSpacing: "0.06em",
            }}
          >
            {FEATURED_GAME.title}
          </h1>

          {/* Description */}
          <p className="text-white/60 text-lg leading-relaxed mb-7">
            {FEATURED_GAME.description}
          </p>

          {/* Tags */}
          <div className="flex gap-2 flex-wrap mb-10">
            {FEATURED_GAME.tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 border border-white/[0.15] text-sm tracking-[0.12em] uppercase text-white/55 bg-black/30 backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="flex gap-4 items-center">
            <button className="bg-[#c0504a] text-white px-10 py-4 text-base font-bold tracking-[0.12em] uppercase rounded-full hover:opacity-85 transition-opacity duration-200">
              Wishlist on Steam
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}