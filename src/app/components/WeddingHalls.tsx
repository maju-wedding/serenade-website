"use client";

import { useState, useEffect, useCallback } from "react";
import { weddingHallService } from "@/services/api";
import { Pagination } from "./Pagination";
import { WeddingHallFilters } from "./WeddingHallFilters";
import { WeddingHallSkeleton } from "./WeddingHallSkeleton";
import { WeddingHallCard } from "./WeddingHallCard";

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

interface WeddingHall {
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
}

export function WeddingHalls() {
  const [weddingHalls, setWeddingHalls] = useState<WeddingHall[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const itemsPerPage = 12;

  // 필터 상태
  const [selectedSido, setSelectedSido] = useState<string>("");
  const [selectedGuguns, setSelectedGuguns] = useState<string[]>([]);
  const [selectedGuestCounts, setSelectedGuestCounts] = useState<string[]>([]);
  const [selectedWeddingTypes, setSelectedWeddingTypes] = useState<string[]>(
    [],
  );
  const [selectedHallTypes, setSelectedHallTypes] = useState<string[]>([]);
  const [selectedRentalCostRanges, setSelectedRentalCostRanges] = useState<
    string[]
  >([]);
  const [selectedFoodCostRanges, setSelectedFoodCostRanges] = useState<
    string[]
  >([]);
  const [selectedFoodMenus, setSelectedFoodMenus] = useState<string[]>([]);
  const [selectedHallStyles, setSelectedHallStyles] = useState<string[]>([]);

  // 필터가 변경되면 첫 페이지로 이동
  useEffect(() => {
    setCurrentPage(1);
  }, [
    selectedSido,
    selectedGuguns,
    selectedGuestCounts,
    selectedWeddingTypes,
    selectedHallTypes,
    selectedRentalCostRanges,
    selectedFoodCostRanges,
    selectedFoodMenus,
    selectedHallStyles,
  ]);

  const loadWeddingHalls = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const params: any = {
        offset: (currentPage - 1) * itemsPerPage,
        limit: itemsPerPage,
      };

      // 필터 파라미터 추가
      if (selectedSido) {
        params.sidos = [selectedSido];
      }
      if (selectedGuguns.length > 0) {
        params.guguns = selectedGuguns;
      }
      if (selectedGuestCounts.length > 0) {
        params.guest_counts = selectedGuestCounts;
      }
      if (selectedWeddingTypes.length > 0) {
        params.wedding_types = selectedWeddingTypes;
      }
      if (selectedHallTypes.length > 0) {
        params.hall_types = selectedHallTypes;
      }
      if (selectedRentalCostRanges.length > 0) {
        params.rental_cost_ranges = selectedRentalCostRanges;
      }
      if (selectedFoodCostRanges.length > 0) {
        params.food_cost_ranges = selectedFoodCostRanges;
      }
      if (selectedFoodMenus.length > 0) {
        params.food_menus = selectedFoodMenus;
      }
      if (selectedHallStyles.length > 0) {
        params.hall_styles = selectedHallStyles;
      }

      // count API에도 필터 파라미터를 전달합니다
      const countParams = { ...params };
      delete countParams.offset;
      delete countParams.limit;
      
      // 필터가 적용된 총 개수를 가져옵니다
      const countResponse = await weddingHallService.getCount(countParams);
      if (
        countResponse &&
        typeof countResponse === "object" &&
        "count" in countResponse
      ) {
        setTotalCount((countResponse as any).count || 0);
      }

      // 그 다음 리스트를 가져옵니다
      const response = await weddingHallService.getList(params);
      console.log('Wedding Halls List Response:', response);
      
      // 응답의 첫 번째 아이템 확인
      if (Array.isArray(response) && response.length > 0) {
        console.log('First wedding hall item:', response[0]);
        console.log('First item keys:', Object.keys(response[0]));
        
        // halls 필드가 이미 포함되어 있는지 확인
        if (response[0].halls) {
          console.log('Halls already included in list response!');
        }
      }
      
      setWeddingHalls(response as any);
    } catch (err) {
      setError("웨딩홀 정보를 불러오는데 실패했습니다.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [
    currentPage,
    selectedSido,
    selectedGuguns,
    selectedGuestCounts,
    selectedWeddingTypes,
    selectedHallTypes,
    selectedRentalCostRanges,
    selectedFoodCostRanges,
    selectedFoodMenus,
    selectedHallStyles,
  ]);

  // 데이터 로드
  useEffect(() => {
    loadWeddingHalls();
  }, [loadWeddingHalls]);

  const resetFilters = () => {
    setSelectedSido("");
    setSelectedGuguns([]);
    setSelectedGuestCounts([]);
    setSelectedWeddingTypes([]);
    setSelectedHallTypes([]);
    setSelectedRentalCostRanges([]);
    setSelectedFoodCostRanges([]);
    setSelectedFoodMenus([]);
    setSelectedHallStyles([]);
  };

  return (
    <section id="wedding-halls" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            웨딩홀 찾기
          </h2>
          <p className="text-lg text-gray-600">
            나에게 맞는 완벽한 웨딩홀을 찾아보세요
          </p>
        </div>

        {/* 필터 섹션 */}
        <WeddingHallFilters
          selectedSido={selectedSido}
          setSelectedSido={setSelectedSido}
          selectedGuguns={selectedGuguns}
          setSelectedGuguns={setSelectedGuguns}
          selectedGuestCounts={selectedGuestCounts}
          setSelectedGuestCounts={setSelectedGuestCounts}
          selectedWeddingTypes={selectedWeddingTypes}
          setSelectedWeddingTypes={setSelectedWeddingTypes}
          selectedHallTypes={selectedHallTypes}
          setSelectedHallTypes={setSelectedHallTypes}
          selectedRentalCostRanges={selectedRentalCostRanges}
          setSelectedRentalCostRanges={setSelectedRentalCostRanges}
          selectedFoodCostRanges={selectedFoodCostRanges}
          setSelectedFoodCostRanges={setSelectedFoodCostRanges}
          selectedFoodMenus={selectedFoodMenus}
          setSelectedFoodMenus={setSelectedFoodMenus}
          selectedHallStyles={selectedHallStyles}
          setSelectedHallStyles={setSelectedHallStyles}
          onReset={resetFilters}
        />

        {/* 결과 개수 표시 - 로딩 중에도 표시 */}
        {totalCount > 0 && (
          <div className="text-right mb-4">
            <p className="text-sm text-gray-600">
              총{" "}
              <span className="font-semibold text-gray-900">{totalCount}</span>
              개의 웨딩홀
            </p>
          </div>
        )}

        {/* 에러 상태 */}
        {error && !loading && (
          <div className="text-center py-12">
            <p className="text-red-600">{error}</p>
            <button
              onClick={loadWeddingHalls}
              className="mt-4 px-6 py-2 bg-[#FB6541] text-white rounded-lg hover:bg-[#e54e2e] transition-colors"
            >
              다시 시도
            </button>
          </div>
        )}

        {/* 스켈레톤 UI - 로딩 중 */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <WeddingHallSkeleton key={index} />
            ))}
          </div>
        )}

        {/* 웨딩홀 리스트 */}
        {!loading && !error && weddingHalls.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
            {weddingHalls.map((hall) => (
              <WeddingHallCard key={hall.id} hall={hall} />
            ))}
          </div>
        )}

        {/* 데이터가 없을 때 */}
        {!loading && !error && weddingHalls.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">조건에 맞는 웨딩홀이 없습니다.</p>
          </div>
        )}

        {/* 페이지네이션 - 로딩 중에도 표시 (비활성화 상태) */}
        {(weddingHalls.length > 0 || loading) && totalCount > 0 && (
          <div className={loading ? "opacity-50 pointer-events-none" : ""}>
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(totalCount / itemsPerPage)}
              onPageChange={setCurrentPage}
              theme="wedding"
            />
          </div>
        )}
      </div>
    </section>
  );
}
