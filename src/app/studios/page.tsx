import { Header } from "../components/Header";
import { Studios } from "../components/Studios";
import { Footer } from "../components/Footer";

export default function StudiosPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-20">
        <Studios />
      </main>
      <Footer />
    </div>
  );
}