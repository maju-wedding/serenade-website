"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { curationService } from "@/services/api";
import Image from "next/image";
import Link from "next/link";

interface CurationContent {
  id: number;
  product_id: number;
  title: string;
  sub_title?: string;
  description?: string;
  instagram_url?: string;
  order: number;
  is_active: boolean;
  product?: {
    id: number;
    name: string;
    image_urls: string[];
    hashtags: string[];
    sido: string;
    gugun: string;
    address: string;
  };
}

interface Curation {
  id: number;
  title: string;
  description?: string;
  template_type?: string;
  thumbnail_url?: string;
  internal_thumbnail_url?: string;
  order?: number;
  is_active?: boolean;
  contents?: CurationContent[];
}

export function CurationDetailClient() {
  const params = useParams();
  const curationId = params.id as string;
  const [curation, setCuration] = useState<Curation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (curationId) {
      loadCuration(curationId);
    }
  }, [curationId]);

  const loadCuration = async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      // 실제 API 호출 시도
      try {
        const [templateData, contentsData] = await Promise.all([
          curationService.getDetail(id),
          curationService.getContents(id).catch(() => [])
        ]);
        
        const curationData = {
          ...(templateData || {}),
          contents: Array.isArray(contentsData) ? (contentsData as any[]).sort((a: any, b: any) => a.order - b.order) : []
        };
        
        setCuration(curationData as any);
        setLoading(false);
        return;
      } catch (apiError) {
        console.error('Failed to fetch curation:', apiError);
        setError('큐레이션 정보를 불러오는데 실패했습니다.');
        setLoading(false);
        return;
      }

      // 실제 API 호출
      const [templateData, contentsData] = await Promise.all([
        curationService.getDetail(id),
        curationService.getContents(id).catch(() => [])
      ]);
      
      const curationData = {
        ...(templateData || {}),
        contents: Array.isArray(contentsData) ? (contentsData as any[]).sort((a: any, b: any) => a.order - b.order) : []
      };
      
      setCuration(curationData as any);
    } catch (err) {
      setError("큐레이션 정보를 불러오는데 실패했습니다.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  if (!curationId) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-600">큐레이션 ID가 필요합니다.</p>
        <Link href="/magazines" className="mt-4 inline-block text-[#FB6541] hover:underline">
          목록으로 돌아가기
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#FB6541]"></div>
        <p className="mt-4 text-gray-600">큐레이션을 불러오는 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={() => loadCuration(curationId)}
          className="px-6 py-2 bg-[#FB6541] text-white rounded-lg hover:bg-[#e54e2e] transition-colors"
        >
          다시 시도
        </button>
      </div>
    );
  }

  if (!curation) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-600">큐레이션을 찾을 수 없습니다.</p>
        <Link href="/magazines" className="mt-4 inline-block text-[#FB6541] hover:underline">
          목록으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <article className="py-12 bg-white">
      {/* 히어로 섹션 */}
      <div className="relative h-[500px] mb-12">
        {curation.thumbnail_url ? (
          <>
            <Image
              src={curation.thumbnail_url}
              alt={curation.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-purple-800" />
        )}
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-6 text-center text-white">
            <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-4">
              큐레이션
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              {curation.title}
            </h1>
            {curation.description && (
              <p className="text-xl text-white/90 mb-6 max-w-3xl mx-auto">
                {curation.description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10">

        {/* 설명 */}
        {curation.description && (
          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-gray-700 text-lg leading-relaxed">
              {curation.description}
            </p>
          </div>
        )}

        {/* 콘텐츠 섹션들 */}
        {curation.contents && curation.contents.length > 0 && (
          <div className="space-y-24">
            {curation.contents.map((content, index) => (
              <section key={content.id} className="relative">
                {/* 웨딩홀 정보 헤더 */}
                <div className="mb-8 text-center">
                  <span className="inline-block px-4 py-1.5 bg-purple-50 text-purple-600 rounded-full text-xs font-semibold mb-3">
                    WEDDING HALL {index + 1}
                  </span>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {content.title}
                  </h2>
                  {content.sub_title && (
                    <p className="text-xl text-gray-600 mb-4">
                      {content.sub_title}
                    </p>
                  )}
                  {content.product && (
                    <div className="flex items-center justify-center gap-3 text-sm text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {content.product.sido} {content.product.gugun}
                      </span>
                      {content.instagram_url && (
                        <a 
                          href={content.instagram_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 hover:text-purple-600 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                          </svg>
                          Instagram
                        </a>
                      )}
                    </div>
                  )}
                </div>

                {/* 설명 */}
                {content.description && (
                  <div className="mb-8 max-w-3xl mx-auto">
                    <p className="text-gray-700 leading-relaxed text-center">
                      {content.description}
                    </p>
                  </div>
                )}

                {/* 해시태그 */}
                {content.product?.hashtags && content.product.hashtags.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {content.product.hashtags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* 이미지 갤러리 */}
                {content.product?.image_urls && content.product.image_urls.length > 0 && (
                  <div className="grid gap-4">
                    {/* 메인 이미지 */}
                    {content.product.image_urls.slice(0, 1).map((url, imgIndex) => (
                      <div key={imgIndex} className="relative h-[600px] rounded-2xl overflow-hidden shadow-xl">
                        <Image
                          src={url}
                          alt={`${content.title} - 메인 이미지`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                    
                    {/* 서브 이미지들 - 2열 그리드 */}
                    {content.product.image_urls.length > 1 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {content.product.image_urls.slice(1, 5).map((url, imgIndex) => (
                          <div key={imgIndex} className="relative h-[300px] rounded-xl overflow-hidden shadow-lg">
                            <Image
                              src={url}
                              alt={`${content.title} - 이미지 ${imgIndex + 2}`}
                              fill
                              className="object-cover hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    {/* 추가 이미지들 - 3열 그리드 */}
                    {content.product.image_urls.length > 5 && (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {content.product.image_urls.slice(5, 11).map((url, imgIndex) => (
                          <div key={imgIndex} className="relative h-[200px] rounded-lg overflow-hidden shadow-md">
                            <Image
                              src={url}
                              alt={`${content.title} - 이미지 ${imgIndex + 6}`}
                              fill
                              className="object-cover hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* 주소 정보 */}
                {content.product?.address && (
                  <div className="mt-8 p-6 bg-gray-50 rounded-xl text-center">
                    <p className="text-sm text-gray-600 mb-2">주소</p>
                    <p className="text-lg font-medium text-gray-900">{content.product.address}</p>
                  </div>
                )}

                {/* 구분선 */}
                {index < curation.contents!.length - 1 && (
                  <hr className="mt-16 border-gray-200" />
                )}
              </section>
            ))}
          </div>
        )}

        {/* 하단 구분선 */}
        <hr className="my-12 border-gray-200" />

        {/* 공유 및 액션 버튼 */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-8">
          <div className="flex items-center gap-4">
            <span className="text-gray-600">공유하기:</span>
            <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </button>
            <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
              </svg>
            </button>
            <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </button>
          </div>
          
          <Link
            href="/magazines"
            className="px-8 py-3 bg-[#FB6541] text-white rounded-lg hover:bg-[#e54e2e] transition-colors"
          >
            목록으로 돌아가기
          </Link>
        </div>
      </div>
    </article>
  );
}



