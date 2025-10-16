"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { weddingHallService } from "@/services/api";
import { ImageGallery } from "../../components/ImageGallery";
import Link from "next/link";
import { Header } from "../../components/Header";
import { AIReviewSection } from "@/components/AIReviewSection";
import { BlogReviewSection } from "@/components/BlogReviewSection";
import { KakaoMap } from "../../components/KakaoMap";
import { SideNavigation } from "../../components/SideNavigation";

interface VenueAmenitiesInfo {
  has_bride_room?: boolean;
  has_pyebaek_room?: boolean;
  has_banquet_hall?: boolean;
  bride_room_image_urls?: string[];
  pyebaek_room_image_urls?: string[];
  banquet_hall_image_urls?: string[];
}

interface Venue {
  id: number;
  name: string;
  wedding_interval?: number;
  wedding_times?: string;
  wedding_type?: string;
  hall_styles?: string;
  hall_types?: string;
  min_capacity?: number;
  max_capacity?: number;
  min_rental_cost?: number;
  max_rental_cost?: number;
  min_food_cost?: number;
  max_food_cost?: number;
  ceiling_height?: number;
  floor?: string;
  food_menu?: string;
  image_urls?: string[];
  amenities_info?: VenueAmenitiesInfo;
}

interface HallAmenitiesInfo {
  elevator_count?: number;
  atm_count?: number;
  has_family_waiting_room?: boolean;
  has_pyebaek_room?: boolean;
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

interface WeddingHallDetail {
  id: number;
  name: string;
  sido: string;
  gugun: string;
  dong?: string;
  address: string;
  hashtags: string[];
  image_urls?: string[];
  common_image_urls?: string[];
  subway_line?: string;
  subway_name?: string;
  way_text?: string;
  park_limit?: number;
  park_free_hours?: number;
  has_single_hall?: boolean;
  min_rental_cost?: number;
  max_rental_cost?: number;
  min_food_cost?: number;
  max_food_cost?: number;
  min_price?: number;
  max_price?: number;
  is_new_hall: boolean;
  is_renovated_hall: boolean;
  opening_date?: string | null;
  renovation_date?: string | null;
  hall_amenities_info?: HallAmenitiesInfo;
  venues?: Venue[];
  ai_reviews?: AIReview[];
  ai_score_summary?: AIScoreSummary;
  blogs?: BlogPost[];
}

export function WeddingHallDetailClient() {
  const params = useParams();
  const id = params.id as string;
  const [hall, setHall] = useState<WeddingHallDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadWeddingHallDetail(id);
    }
  }, [id]);

  const loadWeddingHallDetail = async (hallId: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await weddingHallService.getDetail(hallId);

      // Process venue images
      const hallData = response as any;

      // Debug: Check if blogs data exists
      console.log("Wedding Hall Detail Response:", hallData);
      console.log("Blogs data:", hallData.blogs);
      if (hallData.image_urls && hallData.venues) {
        hallData.venues = hallData.venues.map((venue: any) => ({
          ...venue,
          image_urls: hallData.image_urls.filter((url: string) =>
            url.includes(`/venue_${venue.id}/`),
          ),
        }));

        // Common images (not specific to any venue)
        hallData.common_image_urls = hallData.image_urls.filter((url: string) =>
          url.includes("/common/"),
        );
      }

      setHall(hallData);
    } catch (err) {
      setError("웨딩홀 정보를 불러오는데 실패했습니다.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#FB6541]"></div>
        <p className="ml-4 text-gray-600">웨딩홀 정보를 불러오는 중...</p>
      </div>
    );
  }

  if (error || !hall) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-red-600 mb-4">
          {error || "웨딩홀을 찾을 수 없습니다."}
        </p>
        <Link
          href="/wedding-halls"
          className="px-6 py-2 bg-[#FB6541] text-white rounded-lg hover:bg-[#e54e2e] transition-colors"
        >
          목록으로 돌아가기
        </Link>
      </div>
    );
  }

  // 사이드바 섹션 정의
  const navSections = [
    {
      id: "basic-info",
      label: "기본 정보",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
  ];

  if (hall.ai_reviews && hall.ai_reviews.length > 0) {
    navSections.push({
      id: "ai-reviews",
      label: "AI 리뷰",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      ),
    });
  }

  if (hall.venues && hall.venues.length > 0) {
    navSections.push({
      id: "venue-info",
      label: "홀 정보",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
    });
  }

  if (hall.common_image_urls && hall.common_image_urls.length > 0) {
    navSections.push({
      id: "common-space",
      label: "공용 공간",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
    });
  }

  if (hall.blogs && hall.blogs.length > 0) {
    navSections.push({
      id: "blog-reviews",
      label: "블로그 리뷰",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
    });
  }

  if (hall.address) {
    navSections.push({
      id: "location",
      label: "오시는 길",
      icon: (
        <svg
          className="w-4 h-4"
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
              href="/wedding-halls"
              className="inline-flex items-center text-gray-600 hover:text-[#FB6541] transition-colors"
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

        {/* 상세 콘텐츠 */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-4 sm:py-6 lg:py-8">
          <div
            id="basic-info"
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* 이미지 갤러리 */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="h-[500px] relative">
                <ImageGallery images={hall.image_urls || []} alt={hall.name} />

                {/* 배지 */}
                {(hall.is_new_hall || hall.is_renovated_hall) && (
                  <div className="absolute top-4 left-4 flex gap-2">
                    {hall.is_new_hall && (
                      <span className="px-3 py-1 text-xs font-medium bg-green-500 text-white rounded-full">
                        NEW
                      </span>
                    )}
                    {hall.is_renovated_hall && (
                      <span className="px-3 py-1 text-xs font-medium bg-blue-500 text-white rounded-full">
                        리뉴얼
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* 기본 정보 */}
            <div className="bg-gradient-to-br from-white to-orange-50/30 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4 sm:p-6 border border-orange-100/50">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {hall.name}
              </h1>
              <p className="text-lg text-gray-600 mb-4">
                {hall.sido} {hall.gugun}
              </p>

              {/* 상세 정보 */}
              <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                {hall.address && (
                  <div className="flex flex-col sm:flex-row sm:items-start">
                    <span className="text-gray-500 w-full sm:w-24 flex-shrink-0 mb-1 sm:mb-0 text-sm sm:text-base font-medium">
                      주소
                    </span>
                    <span className="text-gray-900 text-sm sm:text-base">
                      {hall.address}
                    </span>
                  </div>
                )}

                {(hall.subway_line || hall.subway_name) && (
                  <div className="flex flex-col sm:flex-row sm:items-start">
                    <span className="text-gray-500 w-full sm:w-24 flex-shrink-0 mb-1 sm:mb-0 text-sm sm:text-base font-medium">
                      지하철
                    </span>
                    <span className="text-gray-900 text-sm sm:text-base">
                      {hall.subway_line && `${hall.subway_line} `}
                      {hall.subway_name}
                      {hall.way_text && ` ${hall.way_text}`}
                    </span>
                  </div>
                )}

                {hall.park_limit !== undefined && hall.park_limit > 0 && (
                  <div className="flex items-start">
                    <span className="text-gray-500 w-24 flex-shrink-0">
                      주차
                    </span>
                    <span className="text-gray-900">
                      {hall.park_limit}대 가능
                      {hall.park_free_hours?.toString() != "0" &&
                        hall.park_free_hours &&
                        hall.park_free_hours > 0 &&
                        ` (${hall.park_free_hours}시간 무료)`}
                    </span>
                  </div>
                )}

                {(hall.min_price || hall.max_price) && (
                  <div className="flex items-start bg-gradient-to-r from-orange-50 to-red-50 p-3 rounded-lg border border-orange-200">
                    <span className="text-gray-700 font-medium w-24 flex-shrink-0">
                      예상 총비용
                    </span>
                    <span className="text-orange-600 font-bold text-lg">
                      {hall.min_price === hall.max_price
                        ? `${(hall.min_price! / 10000).toLocaleString()}만원`
                        : `${(hall.min_price! / 10000).toLocaleString()} ~ ${(hall.max_price! / 10000).toLocaleString()}만원`}
                    </span>
                  </div>
                )}

                {(hall.min_rental_cost || hall.max_rental_cost) && (
                  <div className="flex items-start">
                    <span className="text-gray-500 w-24 flex-shrink-0">
                      대관료
                    </span>
                    <span className="text-gray-900">
                      {hall.min_rental_cost === hall.max_rental_cost
                        ? `${(hall.min_rental_cost! / 10000).toLocaleString()}만원`
                        : `${(hall.min_rental_cost! / 10000).toLocaleString()} ~ ${(hall.max_rental_cost! / 10000).toLocaleString()}만원`}
                    </span>
                  </div>
                )}

                {(hall.min_food_cost || hall.max_food_cost) && (
                  <div className="flex items-start">
                    <span className="text-gray-500 w-24 flex-shrink-0">
                      식대 (1인)
                    </span>
                    <span className="text-gray-900">
                      {hall.min_food_cost === hall.max_food_cost
                        ? `${hall.min_food_cost!.toLocaleString()}원`
                        : `${hall.min_food_cost!.toLocaleString()} ~ ${hall.max_food_cost!.toLocaleString()}원`}
                    </span>
                  </div>
                )}
              </div>

              {/* 편의시설 */}
              {hall.hall_amenities_info && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center">
                    <svg
                      className="w-4 h-4 mr-2 text-[#FB6541]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                    편의시설
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* 엘리베이터 */}
                    <div
                      className={`flex items-center gap-3 p-2 rounded-lg transition-all duration-200 ${
                        hall.hall_amenities_info.elevator_count &&
                        hall.hall_amenities_info.elevator_count > 0
                          ? "bg-white border border-gray-200 text-gray-700 hover:border-orange-200 hover:shadow-sm"
                          : "bg-gray-100 text-gray-400 opacity-60"
                      }`}
                    >
                      <div
                        className={`p-2 rounded-lg ${
                          hall.hall_amenities_info.elevator_count &&
                          hall.hall_amenities_info.elevator_count > 0
                            ? "bg-orange-100"
                            : "bg-gray-200"
                        }`}
                      >
                        <svg
                          className={`w-5 h-5 ${
                            hall.hall_amenities_info.elevator_count &&
                            hall.hall_amenities_info.elevator_count > 0
                              ? "text-[#FB6541]"
                              : "text-gray-400"
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                          />
                        </svg>
                      </div>
                      <div className="text-sm">
                        <p className="font-medium">엘리베이터</p>
                        <p className="text-xs opacity-75">
                          {hall.hall_amenities_info.elevator_count
                            ? `${hall.hall_amenities_info.elevator_count}대`
                            : "없음"}
                        </p>
                      </div>
                    </div>

                    {/* ATM */}
                    <div
                      className={`flex items-center gap-3 p-2 rounded-lg transition-all duration-200 ${
                        hall.hall_amenities_info.atm_count &&
                        hall.hall_amenities_info.atm_count > 0
                          ? "bg-white border border-gray-200 text-gray-700 hover:border-orange-200 hover:shadow-sm"
                          : "bg-gray-100 text-gray-400 opacity-60"
                      }`}
                    >
                      <div
                        className={`p-2 rounded-lg ${
                          hall.hall_amenities_info.atm_count &&
                          hall.hall_amenities_info.atm_count > 0
                            ? "bg-orange-100"
                            : "bg-gray-200"
                        }`}
                      >
                        <svg
                          className={`w-5 h-5 ${
                            hall.hall_amenities_info.atm_count &&
                            hall.hall_amenities_info.atm_count > 0
                              ? "text-[#FB6541]"
                              : "text-gray-400"
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                          />
                        </svg>
                      </div>
                      <div className="text-sm">
                        <p className="font-medium">ATM</p>
                        <p className="text-xs opacity-75">
                          {hall.hall_amenities_info.atm_count
                            ? `${hall.hall_amenities_info.atm_count}대`
                            : "없음"}
                        </p>
                      </div>
                    </div>

                    {/* 가족대기실 */}
                    <div
                      className={`flex items-center gap-3 p-2 rounded-lg transition-all duration-200 ${
                        hall.hall_amenities_info.has_family_waiting_room
                          ? "bg-white border border-gray-200 text-gray-700 hover:border-orange-200 hover:shadow-sm"
                          : "bg-gray-100 text-gray-400 opacity-60"
                      }`}
                    >
                      <div
                        className={`p-2 rounded-lg ${
                          hall.hall_amenities_info.has_family_waiting_room
                            ? "bg-orange-100"
                            : "bg-gray-200"
                        }`}
                      >
                        <svg
                          className={`w-5 h-5 ${
                            hall.hall_amenities_info.has_family_waiting_room
                              ? "text-[#FB6541]"
                              : "text-gray-400"
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                      </div>
                      <div className="text-sm">
                        <p className="font-medium">혼주대기실</p>
                        <p className="text-xs opacity-75">
                          {hall.hall_amenities_info.has_family_waiting_room
                            ? "이용 가능"
                            : "없음"}
                        </p>
                      </div>
                    </div>

                    {/* 폐백실 */}
                    <div
                      className={`flex items-center gap-3 p-2 rounded-lg transition-all duration-200 ${
                        hall.hall_amenities_info.has_pyebaek_room
                          ? "bg-white border border-gray-200 text-gray-700 hover:border-orange-200 hover:shadow-sm"
                          : "bg-gray-100 text-gray-400 opacity-60"
                      }`}
                    >
                      <div
                        className={`p-2 rounded-lg ${
                          hall.hall_amenities_info.has_pyebaek_room
                            ? "bg-orange-100"
                            : "bg-gray-200"
                        }`}
                      >
                        <svg
                          className={`w-5 h-5 ${
                            hall.hall_amenities_info.has_pyebaek_room
                              ? "text-[#FB6541]"
                              : "text-gray-400"
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                          />
                        </svg>
                      </div>
                      <div className="text-sm">
                        <p className="font-medium">폐백실</p>
                        <p className="text-xs opacity-75">
                          {hall.hall_amenities_info.has_pyebaek_room
                            ? "이용 가능"
                            : "없음"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 해시태그 */}
              {hall.hashtags && hall.hashtags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-6">
                  {hall.hashtags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-sm bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 rounded-full hover:from-orange-50 hover:to-orange-100 hover:text-orange-700 transition-all duration-200 cursor-pointer border border-gray-200 hover:border-orange-200"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* AI 리뷰 섹션 */}
          <div id="ai-reviews" className="mt-8 scroll-mt-24">
            <AIReviewSection
              aiReviews={hall.ai_reviews}
              aiScoreSummary={hall.ai_score_summary}
            />
          </div>

          {/* 홀별 상세 정보 카드 */}
          {hall.venues && hall.venues.length > 0 && (
            <div id="venue-info" className="mt-8 scroll-mt-24">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                홀 정보
              </h2>
              <div className="space-y-6">
                {hall.venues.map((venue) => (
                  <div
                    key={venue.id}
                    className="bg-white rounded-lg shadow-sm overflow-hidden"
                  >
                    <div className="p-6">
                      {/* 홀 이름 헤더 */}
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-200">
                        {venue.name}
                      </h3>
                      {/* 홀 이미지 갤러리 */}
                      {venue.image_urls && venue.image_urls.length > 0 && (
                        <div className="h-[400px] relative bg-gray-100 rounded-lg overflow-hidden mb-6">
                          <ImageGallery
                            images={venue.image_urls}
                            alt={venue.name}
                          />
                        </div>
                      )}

                      {/* 홀 상세 정보 */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {(venue.min_capacity || venue.max_capacity) && (
                          <div>
                            <span className="text-gray-500 text-sm">
                              수용인원
                            </span>
                            <p className="text-gray-900 font-medium">
                              {venue.min_capacity === venue.max_capacity
                                ? `${venue.min_capacity}명`
                                : `${venue.min_capacity} ~ ${venue.max_capacity}명`}
                            </p>
                          </div>
                        )}
                        {venue.wedding_times && (
                          <div>
                            <span className="text-gray-500 text-sm">
                              예식시간
                            </span>
                            <p className="text-gray-900 font-medium">
                              {venue.wedding_times}
                            </p>
                          </div>
                        )}
                        {venue.wedding_interval && (
                          <div>
                            <span className="text-gray-500 text-sm">
                              예식간격
                            </span>
                            <p className="text-gray-900 font-medium">
                              {venue.wedding_interval}분
                            </p>
                          </div>
                        )}
                        {venue.hall_types && (
                          <div>
                            <span className="text-gray-500 text-sm">
                              홀타입
                            </span>
                            <p className="text-gray-900 font-medium">
                              {venue.hall_types}
                            </p>
                          </div>
                        )}
                        {venue.ceiling_height && (
                          <div>
                            <span className="text-gray-500 text-sm">
                              천장높이
                            </span>
                            <p className="text-gray-900 font-medium">
                              {venue.ceiling_height}m
                            </p>
                          </div>
                        )}
                        {venue.wedding_type && (
                          <div>
                            <span className="text-gray-500 text-sm">
                              예식유형
                            </span>
                            <p className="text-gray-900 font-medium">
                              {venue.wedding_type}
                            </p>
                          </div>
                        )}
                        {venue.hall_styles && (
                          <div>
                            <span className="text-gray-500 text-sm">
                              홀스타일
                            </span>
                            <p className="text-gray-900 font-medium">
                              {venue.hall_styles}
                            </p>
                          </div>
                        )}
                        {venue.floor && (
                          <div>
                            <span className="text-gray-500 text-sm">층수</span>
                            <p className="text-gray-900 font-medium">
                              {venue.floor}
                            </p>
                          </div>
                        )}
                        {(venue.min_rental_cost || venue.max_rental_cost) && (
                          <div>
                            <span className="text-gray-500 text-sm">
                              대관료
                            </span>
                            <p className="text-gray-900 font-medium">
                              {venue.min_rental_cost === venue.max_rental_cost
                                ? `${(venue.min_rental_cost! / 10000).toLocaleString()}만원`
                                : `${(venue.min_rental_cost! / 10000).toLocaleString()} ~ ${(venue.max_rental_cost! / 10000).toLocaleString()}만원`}
                            </p>
                          </div>
                        )}
                        {(venue.min_food_cost || venue.max_food_cost) && (
                          <div>
                            <span className="text-gray-500 text-sm">
                              식대 (1인)
                            </span>
                            <p className="text-gray-900 font-medium">
                              {venue.min_food_cost === venue.max_food_cost
                                ? `${venue.min_food_cost!.toLocaleString()}원`
                                : `${venue.min_food_cost!.toLocaleString()} ~ ${venue.max_food_cost!.toLocaleString()}원`}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* 식사 메뉴 섹션 */}
                      {venue.food_menu && (
                        <div className="mt-6 pt-6 border-t border-gray-100">
                          <h4 className="text-sm font-medium text-gray-700 mb-3">
                            식사 메뉴
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {venue.food_menu.split(",").map((meal, index) => (
                              <div
                                key={index}
                                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-200"
                              >
                                <svg
                                  className="w-4 h-4 text-orange-500 mr-2"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                                <span className="text-sm font-medium text-gray-700">
                                  {meal.trim()}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* 홀별 편의시설 */}
                      {venue.amenities_info && (
                        <div className="mt-6 pt-6 border-t border-gray-100">
                          <h3 className="text-sm font-medium text-gray-700 mb-3">
                            홀 편의시설
                          </h3>
                          <div className="flex flex-wrap gap-3 mb-4">
                            {venue.amenities_info.has_bride_room && (
                              <div className="flex items-center gap-2 text-gray-700">
                                <svg
                                  className="w-5 h-5 text-[#FB6541]"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                                <span className="text-sm">신부대기실</span>
                              </div>
                            )}
                            {venue.amenities_info.has_pyebaek_room && (
                              <div className="flex items-center gap-2 text-gray-700">
                                <svg
                                  className="w-5 h-5 text-[#FB6541]"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                                <span className="text-sm">폐백실</span>
                              </div>
                            )}
                            {venue.amenities_info.has_banquet_hall && (
                              <div className="flex items-center gap-2 text-gray-700">
                                <svg
                                  className="w-5 h-5 text-[#FB6541]"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                                <span className="text-sm">연회장</span>
                              </div>
                            )}
                          </div>

                          {/* 편의시설 이미지 갤러리 */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {venue.amenities_info.bride_room_image_urls &&
                              venue.amenities_info.bride_room_image_urls
                                .length > 0 && (
                                <div>
                                  <p className="text-xs font-medium text-gray-600 mb-2">
                                    신부대기실
                                  </p>
                                  <div className="h-32 bg-gray-100 rounded-lg overflow-hidden">
                                    <ImageGallery
                                      images={
                                        venue.amenities_info
                                          .bride_room_image_urls
                                      }
                                      alt="신부대기실"
                                    />
                                  </div>
                                </div>
                              )}
                            {venue.amenities_info.pyebaek_room_image_urls &&
                              venue.amenities_info.pyebaek_room_image_urls
                                .length > 0 && (
                                <div>
                                  <p className="text-xs font-medium text-gray-600 mb-2">
                                    폐백실
                                  </p>
                                  <div className="h-32 bg-gray-100 rounded-lg overflow-hidden">
                                    <ImageGallery
                                      images={
                                        venue.amenities_info
                                          .pyebaek_room_image_urls
                                      }
                                      alt="폐백실"
                                    />
                                  </div>
                                </div>
                              )}
                            {venue.amenities_info.banquet_hall_image_urls &&
                              venue.amenities_info.banquet_hall_image_urls
                                .length > 0 && (
                                <div>
                                  <p className="text-xs font-medium text-gray-600 mb-2">
                                    연회장
                                  </p>
                                  <div className="h-32 bg-gray-100 rounded-lg overflow-hidden">
                                    <ImageGallery
                                      images={
                                        venue.amenities_info
                                          .banquet_hall_image_urls
                                      }
                                      alt="연회장"
                                    />
                                  </div>
                                </div>
                              )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 공용 공간 이미지 셉션 */}
          {hall.common_image_urls && hall.common_image_urls.length > 0 && (
            <div
              id="common-space"
              className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden mt-8 border border-gray-100 hover:border-orange-200 scroll-mt-24"
            >
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  공용 공간
                </h2>
              </div>
              <div className="h-[400px] relative bg-gray-100">
                <ImageGallery
                  images={hall.common_image_urls}
                  alt={`${hall.name} 공용 공간`}
                />
              </div>
            </div>
          )}

          {/* 블로그 리뷰 섹션 */}
          <div id="blog-reviews" className="mt-8 scroll-mt-24">
            <BlogReviewSection blogs={hall.blogs} />
          </div>

          {/* 카카오맵 섹션 */}
          {hall.address && (
            <div id="location" className="mt-8 scroll-mt-24">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
                오시는 길
              </h2>
              <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4 sm:p-6">
                <div className="mb-4">
                  <div className="flex items-start gap-2 mb-2">
                    <svg
                      className="w-5 h-5 text-[#FB6541] mt-0.5 flex-shrink-0"
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
                      <p className="font-medium text-gray-900">{hall.name}</p>
                      <p className="text-sm text-gray-600">{hall.address}</p>
                    </div>
                  </div>

                  {(hall.subway_line || hall.subway_name) && (
                    <div className="flex items-start gap-2 ml-7 mt-2">
                      <svg
                        className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7H6a2 2 0 00-2 2v9a2 2 0 002 2h2m0-18v18m8-18v9m0 0v9m0-9h2a2 2 0 012 2v7a2 2 0 01-2 2h-2"
                        />
                      </svg>
                      <p className="text-sm text-gray-600">
                        {hall.subway_line && `${hall.subway_line} `}
                        {hall.subway_name}
                        {hall.way_text && ` ${hall.way_text}`}
                      </p>
                    </div>
                  )}
                </div>

                <KakaoMap
                  address={hall.address}
                  name={hall.name}
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

