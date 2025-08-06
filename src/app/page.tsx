import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { MainStory } from "./components/MainStory";
import { BrandStory } from "./components/BrandStory";
import { Features } from "./components/Features";
import { Footer } from "./components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <MainStory />
        <BrandStory />
        <Features />
      </main>
      <Footer />
    </div>
  );
}
