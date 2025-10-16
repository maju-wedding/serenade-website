"use client";

import { FilterDropdown } from "./FilterDropdown";

interface FilterOption {
  value: string;
  label: string;
}

interface StudioFiltersProps {
  selectedSido: string;
  setSelectedSido: (value: string) => void;
  selectedGuguns: string[];
  setSelectedGuguns: (value: string[]) => void;
  selectedPriceRanges: string[];
  setSelectedPriceRanges: (value: string[]) => void;
  selectedShootingStyles: string[];
  setSelectedShootingStyles: (value: string[]) => void;
  selectedShootingTypes: string[];
  setSelectedShootingTypes: (value: string[]) => void;
  selectedSceneTypes: string[];
  setSelectedSceneTypes: (value: string[]) => void;
  onReset: () => void;
}

export function StudioFilters({
  selectedSido,
  setSelectedSido,
  selectedGuguns,
  selectedPriceRanges,
  setSelectedPriceRanges,
  selectedShootingStyles,
  setSelectedShootingStyles,
  selectedShootingTypes,
  setSelectedShootingTypes,
  selectedSceneTypes,
  setSelectedSceneTypes,
  onReset,
}: StudioFiltersProps) {
  const sidos: FilterOption[] = [
    { value: "", label: "전체 지역" },
    { value: "서울", label: "서울" },
    { value: "경기", label: "경기" },
    { value: "인천", label: "인천" },
    // { value: "부산", label: "부산" },
    // { value: "대구", label: "대구" },
    // { value: "대전", label: "대전" },
    // { value: "광주", label: "광주" },
    // { value: "울산", label: "울산" },
    // { value: "세종", label: "세종" },
    // { value: "강원", label: "강원" },
    // { value: "충북", label: "충북" },
    // { value: "충남", label: "충남" },
    // { value: "전북", label: "전북" },
    // { value: "전남", label: "전남" },
    // { value: "경북", label: "경북" },
    // { value: "경남", label: "경남" },
    // { value: "제주", label: "제주" },
  ];

  const shootingStyles: FilterOption[] = [
    { value: "일반", label: "일반" },
    { value: "인물중심", label: "인물중심" },
    { value: "인물+배경", label: "인물+배경" },
    { value: "프라이빗", label: "프라이빗" },
  ];

  const shootingTypes: FilterOption[] = [
    { value: "웨딩", label: "웨딩" },
    { value: "본식", label: "본식" },
    { value: "세미", label: "세미" },
    { value: "토탈", label: "토탈" },
    { value: "스냅", label: "스냅" },
    { value: "가봉", label: "가봉" },
  ];

  const sceneTypes: FilterOption[] = [
    { value: "흑백", label: "흑백" },
    { value: "옥상", label: "옥상" },
    { value: "가든", label: "가든" },
    { value: "야간", label: "야간" },
    { value: "캐쥬얼", label: "캐쥬얼" },
    { value: "로드", label: "로드" },
    { value: "한복", label: "한복" },
    { value: "반려동물", label: "반려동물" },
    { value: "수영장", label: "수영장" },
  ];

  const priceRanges: FilterOption[] = [
    { value: "~100", label: "100만원 이하" },
    { value: "100~200", label: "100-200만원" },
    { value: "200~300", label: "200-300만원" },
    { value: "300~500", label: "300-500만원" },
    { value: "500~700", label: "500-700만원" },
    { value: "700~1000", label: "700-1000만원" },
    { value: "1000~", label: "1000만원 이상" },
  ];

  const hasActiveFilters =
    selectedSido ||
    selectedGuguns.length > 0 ||
    selectedPriceRanges.length > 0 ||
    selectedShootingStyles.length > 0 ||
    selectedShootingTypes.length > 0 ||
    selectedSceneTypes.length > 0;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">필터</h3>
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="text-sm text-orange-600 hover:text-orange-700 font-medium"
          >
            필터 초기화
          </button>
        )}
      </div>

      {/* 필터 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 지역 선택 */}
        <FilterDropdown
          label="지역"
          options={sidos.filter((s) => s.value !== "")}
          selectedValues={selectedSido ? [selectedSido] : []}
          onChange={(values) => setSelectedSido(values[0] || "")}
          multiple={false}
          theme="studio"
        />

        {/* 가격대 */}
        <FilterDropdown
          label="가격대"
          options={priceRanges}
          selectedValues={selectedPriceRanges}
          onChange={setSelectedPriceRanges}
          theme="studio"
        />

        {/* 촬영 스타일 */}
        <FilterDropdown
          label="촬영 스타일"
          options={shootingStyles}
          selectedValues={selectedShootingStyles}
          onChange={setSelectedShootingStyles}
          theme="studio"
        />

        {/* 촬영 유형 */}
        <FilterDropdown
          label="촬영 유형"
          options={shootingTypes}
          selectedValues={selectedShootingTypes}
          onChange={setSelectedShootingTypes}
          theme="studio"
        />

        {/* 장면 유형 */}
        <FilterDropdown
          label="장면 유형"
          options={sceneTypes}
          selectedValues={selectedSceneTypes}
          onChange={setSelectedSceneTypes}
          theme="studio"
        />
      </div>
    </div>
  );
}
