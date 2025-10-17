"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { studioService } from "@/services/api";
import Link from "next/link";
import { Header } from "../../components/Header";
import { AIReviewSection } from "@/components/AIReviewSection";
import { BlogReviewSection } from "@/components/BlogReviewSection";
import { KakaoMap } from "../../components/KakaoMap";
import { SideNavigation } from "../../components/SideNavigation";

interface AdditionalCost {
  id: number;
  cost_name: string;
  cost_type: string;
  price: number;
  price_text?: string;
  description?: string;
}

interface StudioPackage {
  id: number;
  name: string;
  description?: string;
  shooting_schedule?: string;
  shooting_duration?: number;
  shooting_styles?: string;
  studio_types?: string;
  price: number;
  costume_description?: string;
  additional_costs?: AdditionalCost[];
}

interface StudioAmenitiesInfo {
  has_parking?: boolean;
  has_hair_makeup_onsite?: boolean;
  has_pet_photography?: boolean;
  has_photographer_selection?: boolean;
}

interface AIReview {
  id?: number;
  review_type?: string;
  title?: string;
  content: string;
  rating?: number;
  created_at?: string;
}

interface ScoreComparison {
  score_type: string;
  hall_score?: number | null;
  studio_score?: number | null;
  average: number;
  difference: number;
}

interface AIScoreSummary {
  overall_score: number;
  overall_average?: number;
  score_comparisons?: ScoreComparison[];
  // Legacy fields for backward compatibility
  atmosphere_score?: number;
  service_score?: number;
  price_score?: number;
  location_score?: number;
  facility_score?: number;
  summary_text?: string;
  pros?: string[];
  cons?: string[];
}

interface BlogPost {
  id?: number;
  title: string;
  url?: string;
  link_url?: string;
  thumbnail_url?: string;
  excerpt?: string;
  description?: string;
  author?: string;
  published_date?: string;
}

interface StudioDetail {
  id: number;
  name: string;
  sido: string;
  gugun: string;
  dong?: string;
  address: string;
  hashtags: string[];
  image_urls?: string[];
  subway_line?: string;
  subway_name?: string;
  way_text?: string;
  park_limit?: number;
  park_free_hours?: number;
  price?: number;
  business_hours?: string;
  holiday?: string;
  shooting_styles?: string;
  studio_type?: string;
  scene_types?: string;
  studio_amenities_info?: StudioAmenitiesInfo;
  is_new_studio: boolean;
  is_renovated_studio: boolean;
  opening_date?: string | null;
  renovation_date?: string | null;
  packages?: StudioPackage[];
  ai_reviews?: AIReview[];
  ai_score_summary?: AIScoreSummary;
  blogs?: BlogPost[];
}

export function StudioDetailClient() {
  // Use different hooks based on environment
  const params = useParams();
  
  // Extract ID from URL directly for static sites
  const getIdFromUrl = () => {
    if (typeof window !== 'undefined') {
      // First check sessionStorage for original path (from 404 redirect)
      const originalPath = sessionStorage.getItem('originalPath');
      if (originalPath) {
        sessionStorage.removeItem('originalPath'); // Clean up
        const match = originalPath.match(/\/studio-detail\/([^\/]+)/);
        if (match) return match[1];
      }
      
      // Fallback to current URL
      const path = window.location.pathname;
      const match = path.match(/\/studio-detail\/([^\/]+)/);
      return match ? match[1] : null;
    }
    return null;
  };
  
  // In development, use Next.js params, in production extract from URL
  const id = (params?.id as string) || getIdFromUrl();
  const [studio, setStudio] = useState<StudioDetail | null>(null);
  const [packages, setPackages] = useState<StudioPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadStudioDetail(id);
    }
  }, [id]);

  const loadStudioDetail = async (studioId: string) => {
    try {
      setLoading(true);
      setError(null);

      // 스튜디오 상세 정보 가져오기
      const studioResponse = await studioService.getDetail(studioId);

      // Debug: Check if blogs data exists
      console.log("Studio Detail Response:", studioResponse);
      console.log("Blogs data:", (studioResponse as any).blogs);

      setStudio(studioResponse as any);

      // 스튜디오 응답에 packages가 포함되어 있는지 먼저 확인
      if (
        studioResponse &&
        (studioResponse as any).packages &&
        Array.isArray((studioResponse as any).packages)
      ) {
        setPackages((studioResponse as any).packages);
      } else {
        // 별도 패키지 API 호출
        try {
          const packagesResponse = await studioService.getPackages(studioId);
          if (Array.isArray(packagesResponse)) {
            setPackages(packagesResponse);
          } else if (
            packagesResponse &&
            typeof packagesResponse === "object" &&
            "packages" in packagesResponse
          ) {
            setPackages((packagesResponse as any).packages || []);
          } else {
            setPackages([]);
          }
        } catch (error) {
          console.error("Failed to fetch packages:", error);
          setPackages([]);
        }
      }
    } catch (err) {
      setError("스튜디오 정보를 불러오는데 실패했습니다.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        <p className="ml-4 text-gray-600">스튜디오 정보를 불러오는 중...</p>
      </div>
    );
  }

  if (error || !studio) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-red-600 mb-4">
          {error || "스튜디오를 찾을 수 없습니다."}
        </p>
        <Link
          href="/studios"
          className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          목록으로 돌아가기
        </Link>
      </div>
    );
  }

  // 나머지 컴포넌트 로직은 그대로 유지...
  // 사이드바 섹션 정의
  const navSections = [
    {
      id: "basic-info",
      label: "기본 정보",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  if (studio.shooting_styles || studio.studio_type || studio.scene_types) {
    navSections.push({
      id: "studio-info",
      label: "스튜디오 정보",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    });
  }

  if (studio.ai_reviews && studio.ai_reviews.length > 0) {
    navSections.push({
      id: "ai-reviews",
      label: "AI 리뷰",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    });
  }

  if (packages && packages.length > 0) {
    navSections.push({
      id: "packages",
      label: "촬영 패키지",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    });
  }

  if (studio.image_urls && studio.image_urls.length > 1) {
    navSections.push({
      id: "gallery",
      label: "스튜디오 화보",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    });
  }

  if (studio.blogs && studio.blogs.length > 0) {
    navSections.push({
      id: "blog-reviews",
      label: "블로그 리뷰",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    });
  }

  if (studio.address) {
    navSections.push({
      id: "location",
      label: "오시는 길",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    });
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <SideNavigation sections={navSections} />

      {/* 메인 콘텐츠 - Header 높이만큼 여백 추가 */}
      <div className="pt-20">
        {/* 뒤로가기 버튼 */}
        <div className="bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-4">
            <Link
              href="/studios"
              className="inline-flex items-center text-gray-600 hover:text-orange-600 transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              목록으로 돌아가기
            </Link>
          </div>
        </div>

        {/* 메인 콘텐츠 - 여기에 나머지 studio detail UI 복사 */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-8">
          <div id="basic-info" className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 기본 정보 표시 */}
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              <div className="h-[400px] sm:h-[500px] relative group">
                {studio.image_urls && studio.image_urls.length > 0 ? (
                  <img
                    src={studio.image_urls[0]}
                    alt={studio.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">이미지가 없습니다</span>
                  </div>
                )}

                {/* 배지 */}
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
            </div>

            {/* 오른쪽: 기본 정보 */}
            <div className="bg-gradient-to-br from-white to-orange-50/30 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4 sm:p-6 border border-orange-100/50">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                {studio.name}
              </h1>
              <p className="text-base sm:text-lg text-gray-600 mb-4">
                {studio.sido} {studio.gugun}
              </p>
              {/* 상세 정보 */}
              <div className="space-y-4 mb-6">
                {studio.address && (
                  <div className="flex items-start">
                    <span className="text-gray-500 w-24 flex-shrink-0">
                      주소
                    </span>
                    <span className="text-gray-900">{studio.address}</span>
                  </div>
                )}

                {(studio.subway_line || studio.subway_name) && (
                  <div className="flex items-start">
                    <span className="text-gray-500 w-24 flex-shrink-0">
                      지하철
                    </span>
                    <span className="text-gray-900">
                      {studio.subway_line && `${studio.subway_line} `}
                      {studio.subway_name}
                    </span>
                  </div>
                )}

                {studio.way_text && (
                  <div className="flex items-start">
                    <span className="text-gray-500 w-24 flex-shrink-0">
                      오시는 길
                    </span>
                    <span className="text-gray-900">{studio.way_text}</span>
                  </div>
                )}

                {studio.park_limit !== undefined && studio.park_limit > 0 && (
                  <div className="flex items-start">
                    <span className="text-gray-500 w-24 flex-shrink-0">
                      주차
                    </span>
                    <span className="text-gray-900">
                      {studio.park_limit}대 가능
                      {studio.park_free_hours &&
                        studio.park_free_hours > 0 &&
                        ` (${studio.park_free_hours}시간 무료)`}
                    </span>
                  </div>
                )}

                {studio.business_hours && (
                  <div className="flex items-start">
                    <span className="text-gray-500 w-24 flex-shrink-0">
                      영업시간
                    </span>
                    <span className="text-gray-900">
                      {studio.business_hours}
                    </span>
                  </div>
                )}

                {studio.holiday && (
                  <div className="flex items-start">
                    <span className="text-gray-500 w-24 flex-shrink-0">
                      휴무일
                    </span>
                    <span className="text-gray-900">{studio.holiday}</span>
                  </div>
                )}
              </div>

              {/* 가격 정보 */}
              {studio.price && (
                <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg mb-6 border border-orange-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <span className="text-base sm:text-lg font-medium text-gray-900">
                      기본 가격
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl sm:text-2xl font-bold text-[#FB6541]">
                        {studio.price.toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-600">원</span>
                    </div>
                  </div>
                </div>
              )}

              {/* 해시태그 */}
              {studio.hashtags && studio.hashtags.length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex flex-wrap gap-2">
                    {studio.hashtags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-xs sm:text-sm bg-orange-50 text-orange-700 rounded-full hover:bg-orange-100 transition-colors cursor-pointer border border-orange-200"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* AI 리뷰 섹션 */}
          <div id="ai-reviews" className="mt-8 scroll-mt-24">
            <AIReviewSection
              aiReviews={studio.ai_reviews}
              aiScoreSummary={studio.ai_score_summary}
            />
          </div>

          {/* 블로그 리뷰 섹션 */}
          <div id="blog-reviews" className="mt-8 scroll-mt-24">
            <BlogReviewSection blogs={studio.blogs} />
          </div>

          {/* 카카오맵 섹션 */}
          {studio.address && (
            <div id="location" className="mt-8 scroll-mt-24">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
                오시는 길
              </h2>
              <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4 sm:p-6">
                <div className="mb-4">
                  <div className="flex items-start gap-2 mb-2">
                    <svg
                      className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <div>
                      <p className="font-medium text-gray-900">{studio.name}</p>
                      <p className="text-sm text-gray-600">{studio.address}</p>
                    </div>
                  </div>
                </div>
                
                <KakaoMap
                  address={studio.address}
                  name={studio.name}
                  className="w-full h-[400px] sm:h-[450px]"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}