"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { magazineService } from "@/services/api";
import Image from "next/image";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";

interface Magazine {
  id: number;
  title: string;
  thumbnail_url: string;
  content_image_urls: string[];
  created_datetime: string;
  updated_datetime: string;
}

export function MagazineDetailClient() {
  const params = useParams();
  const router = useRouter();
  const magazineId = params.id as string;
  
  const [magazine, setMagazine] = useState<Magazine | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (magazineId) {
      loadMagazine(magazineId);
    } else {
      setError("매거진 ID가 없습니다.");
      setLoading(false);
    }
  }, [magazineId]);

  const loadMagazine = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await magazineService.getDetail(id);
      setMagazine(response as any);
    } catch (err) {
      setError("매거진 정보를 불러오는데 실패했습니다.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-20">
        {loading && (
          <div className="min-h-[60vh] flex items-center justify-center">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#FB6541]"></div>
              <p className="mt-4 text-gray-600">매거진을 불러오는 중...</p>
            </div>
          </div>
        )}

        {error && !loading && (
          <div className="min-h-[60vh] flex items-center justify-center">
            <div className="text-center">
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={() => router.push("/magazines")}
                className="px-6 py-2 bg-[#FB6541] text-white rounded-lg hover:bg-[#e54e2e] transition-colors"
              >
                목록으로
              </button>
            </div>
          </div>
        )}

        {magazine && !loading && (
          <div>
            {/* 헤더 이미지 */}
            {magazine.thumbnail_url && (
              <div className="relative h-[400px] bg-gray-200">
                <Image
                  src={magazine.thumbnail_url}
                  alt={magazine.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* 제목 오버레이 */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 whitespace-pre-line">
                      {magazine.title.replace(/\\n/g, '\n')}
                    </h1>
                  </div>
                </div>
              </div>
            )}

            {/* 콘텐츠 */}
            <article className="max-w-4xl mx-auto px-6 py-10">
              {/* 메타 정보 */}
              <div className="flex items-center justify-between pb-8 border-b border-gray-200 mb-8">
                <div className="text-sm text-gray-600">
                  <span>{formatDate(magazine.created_datetime)}</span>
                </div>
              </div>

              {/* 콘텐츠 이미지 */}
              {magazine.content_image_urls && magazine.content_image_urls.length > 0 && (
                <div className="space-y-4 mb-10">
                  {magazine.content_image_urls.map((image, index) => (
                    <div key={index} className="relative w-full">
                      <Image
                        src={image}
                        alt={`${magazine.title} - 콘텐츠 ${index + 1}`}
                        width={800}
                        height={600}
                        className="w-full h-auto rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* 하단 액션 버튼 */}
              <div className="flex justify-between items-center pt-8 border-t border-gray-200">
                <button
                  onClick={() => router.push("/magazines")}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  목록으로
                </button>
                
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m9.032 4.026a9.001 9.001 0 01-7.432 0m9.032-4.026A9.001 9.001 0 0112 3c-4.474 0-8.268 2.943-9.543 7a9.97 9.97 0 011.827 3.026m7.432 4.026a9.97 9.97 0 001.827-3.026" />
                    </svg>
                    공유하기
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-[#FB6541] text-white rounded-lg hover:bg-[#e54e2e] transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    좋아요
                  </button>
                </div>
              </div>
            </article>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}



