import { Suspense } from "react";
import { Header } from "../../components/Header";
import { WeddingHallDetailClient } from "./client";

export const generateStaticParams = () => [];

export default function WeddingHallDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50">
          <Header />
          <div className="pt-20">
            <div className="min-h-[60vh] flex items-center justify-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#FB6541]"></div>
              <p className="ml-4 text-gray-600">웨딩홀 정보를 불러오는 중...</p>
            </div>
          </div>
        </div>
      }
    >
      <WeddingHallDetailClient />
    </Suspense>
  );
}