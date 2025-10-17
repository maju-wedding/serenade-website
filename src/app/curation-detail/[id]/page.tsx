import { Suspense } from "react";
import { withDynamicParams } from "next-static-utils";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { CurationDetailClient } from "./client";

export const generateStaticParams = withDynamicParams();

export default function CurationDetailPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-20">
        <Suspense fallback={
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#FB6541]"></div>
            <p className="mt-4 text-gray-600">로딩 중...</p>
          </div>
        }>
          <CurationDetailClient />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}