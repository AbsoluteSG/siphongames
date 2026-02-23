const FOOTER_LINKS = ["Twitter", "Discord", "Steam", "Press Kit", "Contact"];

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.08] px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="font-display text-xl tracking-[0.15em] text-[#c8a84b]">
        PLACEHOLDER STUDIO
      </div>
      <div className="flex gap-8 flex-wrap justify-center">
        {FOOTER_LINKS.map((link) => (
          <a
            key={link}
            href="#"
            className="text-white/40 text-xs tracking-wider hover:text-white/80 transition-colors duration-200"
          >
            {link}
          </a>
        ))}
      </div>
      <p className="text-white/30 text-xs tracking-wide">
        © 2026 Placeholder Studio
      </p>
    </footer>
  );
}