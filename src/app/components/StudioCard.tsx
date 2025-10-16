"use client";

import { useState, useEffect, useCallback } from "react";
import { studioService } from "@/services/api";
import { ImageGallery } from "./ImageGallery";
import Link from "next/link";

interface StudioPackage {
  id: number;
  name: string;
  price: number;
  description?: string;
}

interface StudioProps {
  studio: {
    id: number;
    name: string;
    sido: string;
    gugun: string;
    address: string;
    hashtags: string[];
    image_urls: string[];
    is_new_studio: boolean;
    is_renovated_studio: boolean;
    packages?: StudioPackage[];
  };
}

export function StudioCard({ studio }: StudioProps) {
  const [packages, setPackages] = useState<StudioPackage[]>(studio.packages || []);
  const [loading, setLoading] = useState(!studio.packages);
  const [showAllPackages, setShowAllPackages] = useState(false);

  const loadPackages = useCallback(async () => {
    try {
      const response = await studioService.getPackages(studio.id.toString());
      if (Array.isArray(response)) {
        setPackages(response as StudioPackage[]);
      }
    } catch (error) {
      console.error('Failed to load packages:', error);
    } finally {
      setLoading(false);
    }
  }, [studio.id]);

  useEffect(() => {
    // 패키지 데이터가 없고 studio.packages가 없는 경우에만 로드
    if (!studio.packages && studio.id) {
      loadPackages();
    }
  }, [studio.id, studio.packages, loadPackages]);

  // 더보기/접기 클릭 처리 (이벤트 전파 방지)
  const handleTogglePackages = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowAllPackages(!showAllPackages);
  };

  return (
    <Link
      href={`/studio-detail/${studio.id}`}
      className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 block h-full flex flex-col"
    >
      {/* 이미지 갤러리 */}
      <div className="relative h-64 bg-gray-100">
        <ImageGallery
          images={studio.image_urls || []}
          alt={studio.name}
        />

        {/* 배지 오버레이 */}
        {(studio.is_new_studio || studio.is_renovated_studio) && (
          <div className="absolute top-4 left-4 flex gap-2">
            {studio.is_new_studio && (
              <span className="px-3 py-1 text-xs font-medium bg-green-500 text-white rounded-full">
                NEW
              </span>
            )}
            {studio.is_renovated_studio && (
              <span className="px-3 py-1 text-xs font-medium bg-blue-500 text-white rounded-full">
                리뉴얼
              </span>
            )}
          </div>
        )}
      </div>

      {/* 콘텐츠 */}
      <div className="p-5 flex-1 flex flex-col">
        {/* 제목과 위치 */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
            {studio.name}
          </h3>
          <p className="text-sm text-gray-600">
            {studio.sido} {studio.gugun}
          </p>
        </div>

        {/* 패키지 정보 - 동적 높이 */}
        <div className="mb-4" style={{ minHeight: packages.length > 0 || loading ? (showAllPackages ? 'auto' : '140px') : '0' }}>
          {!loading && packages.length > 0 && (
            <>
              <p className="text-xs font-semibold text-gray-700 mb-2">패키지</p>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {(showAllPackages ? packages : packages.slice(0, 3)).map((pkg) => (
                  <div
                    key={pkg.id}
                    className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                  >
                    <span className="text-xs text-gray-700 font-medium line-clamp-1 flex-1">
                      {pkg.name}
                    </span>
                    <span className="text-xs font-semibold text-orange-600 whitespace-nowrap ml-2">
                      {pkg.price ? `${(pkg.price / 10000).toFixed(0)}만원` : "가격 문의"}
                    </span>
                  </div>
                ))}
                {packages.length > 3 && (
                  <button
                    onClick={handleTogglePackages}
                    className="w-full text-xs text-gray-500 text-center hover:text-orange-600 py-1 transition-colors"
                  >
                    {showAllPackages ? '접기' : `+${packages.length - 3}개 더보기`}
                  </button>
                )}
              </div>
            </>
          )}

          {/* 패키지 로딩 중 */}
          {loading && (
            <>
              <p className="text-xs font-semibold text-gray-700 mb-2">패키지</p>
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-8 bg-gray-100 rounded animate-pulse" />
                ))}
              </div>
            </>
          )}
        </div>

        {/* 주소 - 자동으로 하단 영역 채우기 */}
        <div className="flex-1 flex flex-col justify-end">
          <div className="pb-4 mb-4 border-b border-gray-100">
            <p className="text-xs text-gray-500 line-clamp-2 min-h-[32px]">
              {studio.address || "주소 정보 없음"}
            </p>
          </div>

          {/* 해시태그 */}
          <div className="min-h-[28px]">
            {studio.hashtags && studio.hashtags.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {studio.hashtags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="px-2.5 py-1 text-xs bg-gray-50 text-gray-600 rounded-full border border-gray-200"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            ) : (
              <div className="flex gap-1.5">
                <span className="px-2.5 py-1 text-xs bg-gray-50 text-gray-400 rounded-full border border-gray-100">
                  태그 없음
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}