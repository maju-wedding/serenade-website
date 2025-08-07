"use client";

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen lg:h-[728px] flex items-center"
    >
      {/* 배경 이미지 */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/hero.png')`,
        }}
      ></div>

      {/* 콘텐츠 영역 */}
      <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            {/* 제목 */}
            <div className="space-y-4 mb-8 sm:mb-10 lg:mb-12">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight text-white">
                <span className="block mb-2">가장 우리다운 결혼 준비</span>
                <span className="block">광고 없는 진짜 웨딩앱</span>
              </h2>
            </div>

            {/* CTA 버튼 */}
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              {/* iOS 앱 다운로드 버튼 */}
              <a
                href="https://apps.apple.com/kr/app/%EC%84%B8%EB%A0%88%EB%82%98%EB%8D%B0-%EA%B4%91%EA%B3%A0-%EC%97%86%EB%8A%94-%EC%A7%84%EC%A7%9C-%EC%9B%A8%EB%94%A9-%EC%95%B1/id6747605861"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black text-white px-5 sm:px-6 py-3 sm:py-4 rounded-full text-base sm:text-lg font-medium flex items-center justify-center space-x-2 hover:bg-[#FB6541] transition-all duration-300 transform hover:scale-105 w-full sm:w-auto max-w-xs"
              >
                {/* iOS App Store Icon */}
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <span>앱 다운로드</span>
              </a>
            </div>

            {/* 앱스토어 배지 이미지 (선택사항) */}
            {/*<div className="mt-8 sm:mt-10 lg:mt-12 flex flex-col sm:flex-row gap-4 items-center">*/}
            {/*  <div className="flex items-center gap-2 text-white/60 text-xs sm:text-sm">*/}
            {/*    <svg*/}
            {/*      className="w-4 h-4"*/}
            {/*      fill="currentColor"*/}
            {/*      viewBox="0 0 20 20"*/}
            {/*    >*/}
            {/*      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />*/}
            {/*    </svg>*/}
            {/*    <span>4.8 평점 | 1,000+ 다운로드</span>*/}
            {/*  </div>*/}
            {/*</div>*/}
          </div>
        </div>
      </div>

      {/* 스크롤 인디케이터 (모바일에서는 숨김) */}
      <div className="hidden sm:block absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-white/60"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
