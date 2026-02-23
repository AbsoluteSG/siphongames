import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import GamesGrid from "@/components/GamesGrid";
import NewsSection from "@/components/NewsSection";
import StudioSection from "@/components/StudioSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <GamesGrid />
        <NewsSection />
        <StudioSection />
      </main>
      <Footer />
    </>
  );
}