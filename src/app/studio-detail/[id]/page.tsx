import { Suspense } from "react";
import { withDynamicParams } from "next-static-utils";
import { Header } from "../../components/Header";
import { StudioDetailClient } from "./client";

export const generateStaticParams = withDynamicParams();

export default function StudioDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50">
          <Header />
          <div className="pt-20">
            <div className="min-h-[60vh] flex items-center justify-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#7B61FF]"></div>
              <p className="ml-4 text-gray-600">
                스튜디오 정보를 불러오는 중...
              </p>
            </div>
          </div>
        </div>
      }
    >
      <StudioDetailClient />
    </Suspense>
  );
}