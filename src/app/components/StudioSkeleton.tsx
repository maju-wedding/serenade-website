export function StudioSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 animate-pulse">
      {/* 이미지 영역 */}
      <div className="relative h-64 bg-gray-200" />

      {/* 콘텐츠 */}
      <div className="p-5">
        {/* 제목과 위치 */}
        <div className="mb-4">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>

        {/* 패키지 정보 영역 */}
        <div className="mb-4">
          <div className="h-3 bg-gray-200 rounded w-16 mb-2" />
          <div className="space-y-2">
            <div className="h-8 bg-gray-100 rounded" />
            <div className="h-8 bg-gray-100 rounded" />
            <div className="h-8 bg-gray-100 rounded" />
          </div>
        </div>

        {/* 주소 */}
        <div className="pb-4 mb-4 border-b border-gray-100">
          <div className="h-3 bg-gray-200 rounded w-full mb-1" />
          <div className="h-3 bg-gray-200 rounded w-2/3" />
        </div>

        {/* 해시태그 영역 */}
        <div className="min-h-[28px] flex gap-1.5">
          <div className="h-6 bg-gray-200 rounded-full w-16" />
          <div className="h-6 bg-gray-200 rounded-full w-20" />
          <div className="h-6 bg-gray-200 rounded-full w-14" />
        </div>
      </div>
    </div>
  );
}