import { Suspense } from "react";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { MagazineDetailClient } from "./client";

export async function generateStaticParams(): Promise<{ id: string }[]> {
  return [];
}

export default function MagazineDetailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white">
        <Header />
        <main className="pt-20">
          <div className="min-h-[60vh] flex items-center justify-center">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#FB6541]"></div>
              <p className="mt-4 text-gray-600">매거진을 불러오는 중...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    }>
      <MagazineDetailClient />
    </Suspense>
  );
}