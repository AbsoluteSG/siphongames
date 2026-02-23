import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Devlog — No Dogs Allowed",
  description:
    "Development updates, design deep-dives, and studio news from the team behind No Dogs Allowed.",
};

export default function DevlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#1c1c1c",
        fontFamily: "'Outfit', sans-serif",
        color: "#f0ece4",
      }}
    >
      <Nav />

      <main style={{ paddingTop: "64px" }}>
        {children}
      </main>

      <div
        style={{
          borderTop: "1px solid rgba(240,236,228,0.06)",
          marginTop: "80px",
        }}
      >
        <Footer />
      </div>
    </div>
  );
}
