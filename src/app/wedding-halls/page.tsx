import { Header } from "../components/Header";
import { WeddingHalls } from "../components/WeddingHalls";
import { Footer } from "../components/Footer";

export default function WeddingHallsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-20">
        <WeddingHalls />
      </main>
      <Footer />
    </div>
  );
}