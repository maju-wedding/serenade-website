"use client";

import { useState, useEffect, useCallback } from "react";
import { studioService } from "@/services/api";
import { Pagination } from "./Pagination";
import { StudioFilters } from "./StudioFilters";
import { StudioSkeleton } from "./StudioSkeleton";
import { StudioCard } from "./StudioCard";

interface StudioPackage {
  id: number;
  name: string;
  price: number;
  description?: string;
}

interface Studio {
  id: number;
  name: string;
  sido: string;
  gugun: string;
  address: string;
  hashtags: string[];
  image_urls: string[];
  opening_date?: string | null;
  renovation_date?: string | null;
  is_new_studio: boolean;
  is_renovated_studio: boolean;
  packages?: StudioPackage[];
}

export function Studios() {
  const [studios, setStudios] = useState<Studio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const itemsPerPage = 12;

  // 필터 상태
  const [selectedSido, setSelectedSido] = useState<string>("");
  const [selectedGuguns, setSelectedGuguns] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [selectedShootingStyles, setSelectedShootingStyles] = useState<
    string[]
  >([]);
  const [selectedShootingTypes, setSelectedShootingTypes] = useState<string[]>(
    [],
  );
  const [selectedSceneTypes, setSelectedSceneTypes] = useState<string[]>([]);

  // 필터가 변경되면 첫 페이지로 이동
  useEffect(() => {
    setCurrentPage(1);
  }, [
    selectedSido,
    selectedGuguns,
    selectedPriceRanges,
    selectedShootingStyles,
    selectedShootingTypes,
    selectedSceneTypes,
  ]);

  const loadStudios = useCallback(async () => {
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
      if (selectedPriceRanges.length > 0) {
        params.price_ranges = selectedPriceRanges;
      }
      if (selectedShootingStyles.length > 0) {
        params.shooting_styles = selectedShootingStyles;
      }
      if (selectedShootingTypes.length > 0) {
        params.shooting_types = selectedShootingTypes;
      }
      if (selectedSceneTypes.length > 0) {
        params.scene_types = selectedSceneTypes;
      }

      // count API에도 필터 파라미터를 전달합니다
      const countParams = { ...params };
      delete countParams.offset;
      delete countParams.limit;

      // 필터가 적용된 총 개수를 가져옵니다
      const countResponse = await studioService.getCount(countParams);
      if (
        countResponse &&
        typeof countResponse === "object" &&
        "count" in countResponse
      ) {
        setTotalCount((countResponse as any).count || 0);
      }

      // 그 다음 리스트를 가져옵니다
      const response = await studioService.getList(params);
      setStudios(response as any);
    } catch (err) {
      setError("스튜디오 정보를 불러오는데 실패했습니다.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [
    currentPage,
    selectedSido,
    selectedGuguns,
    selectedPriceRanges,
    selectedShootingStyles,
    selectedShootingTypes,
    selectedSceneTypes,
  ]);

  // 데이터 로드
  useEffect(() => {
    loadStudios();
  }, [loadStudios]);

  const resetFilters = () => {
    setSelectedSido("");
    setSelectedGuguns([]);
    setSelectedPriceRanges([]);
    setSelectedShootingStyles([]);
    setSelectedShootingTypes([]);
    setSelectedSceneTypes([]);
  };

  return (
    <section id="studios" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            스튜디오 찾기
          </h2>
          <p className="text-lg text-gray-600">
            특별한 순간을 담아줄 스튜디오를 찾아보세요
          </p>
        </div>

        {/* 필터 섹션 */}
        <StudioFilters
          selectedSido={selectedSido}
          setSelectedSido={setSelectedSido}
          selectedGuguns={selectedGuguns}
          setSelectedGuguns={setSelectedGuguns}
          selectedPriceRanges={selectedPriceRanges}
          setSelectedPriceRanges={setSelectedPriceRanges}
          selectedShootingStyles={selectedShootingStyles}
          setSelectedShootingStyles={setSelectedShootingStyles}
          selectedShootingTypes={selectedShootingTypes}
          setSelectedShootingTypes={setSelectedShootingTypes}
          selectedSceneTypes={selectedSceneTypes}
          setSelectedSceneTypes={setSelectedSceneTypes}
          onReset={resetFilters}
        />

        {/* 결과 개수 표시 - 로딩 중에도 표시 */}
        {totalCount > 0 && (
          <div className="text-right mb-4">
            <p className="text-sm text-gray-600">
              총{" "}
              <span className="font-semibold text-gray-900">{totalCount}</span>
              개의 스튜디오
            </p>
          </div>
        )}

        {/* 에러 상태 */}
        {error && !loading && (
          <div className="text-center py-12">
            <p className="text-red-600">{error}</p>
            <button
              onClick={loadStudios}
              className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              다시 시도
            </button>
          </div>
        )}

        {/* 스켈레톤 UI - 로딩 중 */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <StudioSkeleton key={index} />
            ))}
          </div>
        )}

        {/* 스튜디오 리스트 */}
        {!loading && !error && studios.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
            {studios.map((studio) => (
              <StudioCard key={studio.id} studio={studio} />
            ))}
          </div>
        )}

        {/* 데이터가 없을 때 */}
        {!loading && !error && studios.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">조건에 맞는 스튜디오가 없습니다.</p>
          </div>
        )}

        {/* 페이지네이션 - 로딩 중에도 표시 (비활성화 상태) */}
        {(studios.length > 0 || loading) && totalCount > 0 && (
          <div className={loading ? "opacity-50 pointer-events-none" : ""}>
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(totalCount / itemsPerPage)}
              onPageChange={setCurrentPage}
              theme="studio"
            />
          </div>
        )}
      </div>
    </section>
  );
}
