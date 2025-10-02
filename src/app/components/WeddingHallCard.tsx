"use client";

import { useState, useEffect } from "react";
import { weddingHallService } from "@/services/api";
import { ImageGallery } from "./ImageGallery";
import Link from "next/link";

interface Hall {
  id: number;
  name: string;
  capacity?: number;
  min_capacity?: number;
  max_capacity?: number;
  rental_cost?: number;
  min_rental_cost?: number;
  max_rental_cost?: number;
  food_cost?: number;
  min_food_cost?: number;
  max_food_cost?: number;
  hall_type?: string;
  floor?: string;
  size?: string;
  description?: string;
}

interface WeddingHallProps {
  hall: {
    id: number;
    name: string;
    sido: string;
    gugun: string;
    address: string;
    hashtags: string[];
    image_urls: string[];
    min_rental_cost?: number;
    max_rental_cost?: number;
    min_food_cost?: number;
    max_food_cost?: number;
    min_price?: number;
    max_price?: number;
    opening_date?: string | null;
    renovation_date?: string | null;
    is_new_hall: boolean;
    is_renovated_hall: boolean;
    halls?: Hall[];
  };
}

export function WeddingHallCard({ hall }: WeddingHallProps) {
  const [halls, setHalls] = useState<Hall[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAllHalls, setShowAllHalls] = useState(false);

  useEffect(() => {
    console.log('WeddingHallCard - hall prop:', hall);
    console.log('WeddingHallCard - hall.halls:', hall.halls);
    
    // hall.halls가 이미 있으면 사용, 없으면 API 호출
    if (hall.halls && hall.halls.length > 0) {
      setHalls(hall.halls);
      setLoading(false);
    } else if (hall.id) {
      loadHalls();
    } else {
      setLoading(false);
    }
  }, [hall.id]);

  const loadHalls = async () => {
    try {
      const response = await weddingHallService.getDetail(hall.id.toString());
      console.log('Wedding Hall Detail Response:', response);
      console.log('Response type:', typeof response);
      console.log('Response keys:', response ? Object.keys(response) : 'null');
      
      // 다양한 응답 구조 처리
      if (response) {
        let hallsData: Hall[] = [];
        
        // 모든 키를 순회하면서 배열 찾기
        for (const key in response) {
          const value = (response as any)[key];
          console.log(`Checking key "${key}":`, value);
          
          // 배열이고 첫 번째 요소가 홀 정보처럼 보이는 경우
          if (Array.isArray(value) && value.length > 0) {
            // 홀 정보인지 확인 (name이나 capacity 등의 필드가 있는지)
            const firstItem = value[0];
            console.log(`First item of array "${key}":`, firstItem);
            console.log(`First item keys:`, firstItem ? Object.keys(firstItem) : 'null');
            
            // 다양한 이름 필드 체크
            if (firstItem && (
              firstItem.name || 
              firstItem.hall_name || 
              firstItem.hallName ||
              firstItem.title ||
              firstItem.홀이름 ||
              firstItem.capacity || 
              firstItem.rental_cost ||
              firstItem.rentalCost ||
              firstItem.대관료
            )) {
              console.log(`Found halls data in key "${key}":`, value);
              hallsData = value;
              break;
            }
          }
        }
        
        // 기존 체크 로직도 유지
        if (hallsData.length === 0) {
          // halls 배열이 직접 있는 경우
          if ((response as any).halls && Array.isArray((response as any).halls)) {
            console.log('Found halls array:', (response as any).halls);
            hallsData = (response as any).halls;
          }
          // hall_list, hall_info 등 다른 키 이름 확인
          else if ((response as any).hall_list && Array.isArray((response as any).hall_list)) {
            console.log('Found hall_list array:', (response as any).hall_list);
            hallsData = (response as any).hall_list;
          }
          else if ((response as any).hall_info && Array.isArray((response as any).hall_info)) {
            console.log('Found hall_info array:', (response as any).hall_info);
            hallsData = (response as any).hall_info;
          }
          // wedding_halls 키 확인
          else if ((response as any).wedding_halls && Array.isArray((response as any).wedding_halls)) {
            console.log('Found wedding_halls array:', (response as any).wedding_halls);
            hallsData = (response as any).wedding_halls;
          }
          // 응답 자체가 배열인 경우
          else if (Array.isArray(response)) {
            console.log('Response is an array:', response);
            hallsData = response;
          }
        }
        
        // 응답이 단일 홀 객체이고 halls 정보가 없는 경우, 빈 배열로 유지
        if (hallsData.length === 0) {
          console.log('No halls array found. Checking if response is a single hall object...');
          // 응답 자체가 홀 정보인 경우 (단일 홀)
          if ((response as any).name && !(response as any).halls) {
            console.log('Response appears to be a single hall, not a list of halls');
          }
        }
        
        console.log('Final hallsData:', hallsData);
        console.log('hallsData length:', hallsData.length);
        setHalls(hallsData);
      }
    } catch (error) {
      console.error('Failed to load halls:', error);
    } finally {
      setLoading(false);
    }
  };

  // 더보기/접기 클릭 처리 (이벤트 전파 방지)
  const handleToggleHalls = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowAllHalls(!showAllHalls);
  };

  const formatPrice = (price?: number) => {
    if (!price) return "문의";
    if (price >= 10000) {
      return `${(price / 10000).toFixed(0)}만원`;
    }
    return `${price.toLocaleString()}원`;
  };

  return (
    <Link
      href={`/wedding-hall-detail?id=${hall.id}`}
      className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 block h-full flex flex-col"
    >
      {/* 이미지 갤러리 */}
      <div className="relative h-64 bg-gray-100">
        <ImageGallery
          images={hall.image_urls || []}
          alt={hall.name}
        />

        {/* 배지 오버레이 */}
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

      {/* 콘텐츠 */}
      <div className="p-5 flex-1 flex flex-col">
        {/* 제목과 위치 */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
            {hall.name}
          </h3>
          <p className="text-sm text-gray-600">
            {hall.sido} {hall.gugun}
          </p>
        </div>

        {/* 홀 정보 - 동적 높이 */}
        <div className="mb-4" style={{ minHeight: loading ? '140px' : (halls.length > 0 ? (showAllHalls ? 'auto' : '140px') : '0') }}>
          {/* 홀 로딩 중 */}
          {loading && (
            <>
              <p className="text-xs font-semibold text-gray-700 mb-2">홀 정보</p>
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-12 bg-gray-100 rounded animate-pulse" />
                ))}
              </div>
            </>
          )}

          {/* 홀 정보 표시 */}
          {!loading && halls.length > 0 && (
            <>
              <p className="text-xs font-semibold text-gray-700 mb-2">홀 정보</p>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {(showAllHalls ? halls : halls.slice(0, 3)).map((hallInfo) => (
                  <div
                    key={hallInfo.id}
                    className="flex flex-col p-2 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-700 font-medium line-clamp-1 flex-1">
                        {hallInfo.name}
                      </span>
                      {hallInfo.hall_type && (
                        <span className="text-xs text-gray-500 ml-2">
                          {hallInfo.hall_type}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      {(hallInfo.min_capacity || hallInfo.max_capacity || hallInfo.capacity) && (
                        <span className="text-gray-600">
                          {hallInfo.capacity 
                            ? `${hallInfo.capacity}명`
                            : hallInfo.min_capacity === hallInfo.max_capacity
                              ? `${hallInfo.min_capacity}명`
                              : `${hallInfo.min_capacity || '?'}~${hallInfo.max_capacity || '?'}명`}
                        </span>
                      )}
                      {(hallInfo.rental_cost || hallInfo.min_rental_cost || hallInfo.max_rental_cost) && (
                        <span className="font-semibold text-[#FB6541]">
                          대관 {formatPrice(hallInfo.rental_cost || hallInfo.min_rental_cost)}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
                {halls.length > 3 && (
                  <button
                    onClick={handleToggleHalls}
                    className="w-full text-xs text-gray-500 text-center hover:text-[#FB6541] py-1 transition-colors"
                  >
                    {showAllHalls ? '접기' : `+${halls.length - 3}개 더보기`}
                  </button>
                )}
              </div>
            </>
          )}

          {/* 홀 정보가 없을 때 */}
          {!loading && halls.length === 0 && (
            <div className="hidden">
              {/* 홀 정보가 없을 때는 아무것도 표시하지 않음 */}
            </div>
          )}
        </div>

        {/* 가격 정보 - 자동으로 하단 영역 채우기 */}
        <div className="flex-1 flex flex-col justify-end">
          <div className="pb-4 mb-4 border-b border-gray-100">
            <div className="space-y-1">
              {(hall.min_price || hall.max_price) ? (
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">예상 비용</span>
                  <span className="text-sm font-medium text-gray-900">
                    {hall.min_price === hall.max_price
                      ? formatPrice(hall.min_price)
                      : `${formatPrice(hall.min_price)} ~ ${formatPrice(hall.max_price)}`}
                  </span>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">예상 비용</span>
                  <span className="text-sm text-gray-400">정보 없음</span>
                </div>
              )}
            </div>
          </div>

          {/* 주소 */}
          <div className="mb-4">
            <p className="text-xs text-gray-500 line-clamp-2 min-h-[32px]">
              {hall.address || "주소 정보 없음"}
            </p>
          </div>

          {/* 해시태그 */}
          <div className="min-h-[28px]">
            {hall.hashtags && hall.hashtags.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {hall.hashtags.slice(0, 3).map((tag, index) => (
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