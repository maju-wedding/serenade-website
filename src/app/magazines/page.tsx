"use client";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { IntegratedMagazineSections } from "@/app/components/Magazines";

export default function MagazinesPage() {
  return (
    <div>
      <Header />
      <main className="pt-20">
        <IntegratedMagazineSections />
      </main>
      <Footer />
    </div>
  );
}
