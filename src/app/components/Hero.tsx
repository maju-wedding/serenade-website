"use client";

import Image from "next/image";

export function Hero() {
  const scrollToNext = () => {
    const nextSection = document.querySelector("#main-story");
    if (nextSection) {
      nextSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center">
      {/* 배경 이미지 */}
      <div className="absolute inset-0">
        {/* 모바일 이미지 */}
        <Image
          src="/images/hero-mobile.png"
          alt="Hero mobile"
          fill
          className="object-cover md:hidden"
          sizes="100vw"
          priority
        />

        {/* 데스크톱 이미지 */}
        <Image
          src="/images/hero.png"
          alt="Hero desktop"
          fill
          className="object-cover hidden md:block"
          sizes="100vw"
          priority
        />
      </div>

      {/* 콘텐츠 영역 */}
      <div className="relative z-10 w-full ">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="flex flex-col items-center">
            {/* 제목 */}
            <div className="mb-14">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white/90 text-center font-medium font-arima mb-2">
                <span className="block">Less Stress More Love</span>
              </h2>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-tight text-white text-center">
                <span className="block mb-2">고민을 줄여줄 진짜 웨딩 앱</span>
              </h1>
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 text-center mt-4">
                <span className="block mb-1">
                  고민은 덜고 사랑에만 집중할 수 있도록
                </span>
                <span className="block">세레나데가 함께할게요</span>
              </h3>
            </div>

            {/* CTA 버튼 */}
            <div className="flex flex-col sm:flex-row items-center">
              {/* iOS 앱 다운로드 버튼 */}
              <a
                href="https://apps.apple.com/kr/app/%EC%84%B8%EB%A0%88%EB%82%98%EB%8D%B0-%EA%B4%91%EA%B3%A0-%EC%97%86%EB%8A%94-%EC%A7%84%EC%A7%9C-%EC%9B%A8%EB%94%A9-%EC%95%B1/id6747605861"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black px-5 sm:px-6 py-3 sm:py-4 rounded-full text-base sm:text-lg font-medium flex items-center justify-center space-x-2 hover:bg-[#FB6541] transition-all duration-300 transform hover:scale-105 w-full sm:w-auto max-w-xs hover:text-white"
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
          </div>
        </div>
      </div>

      {/* 스크롤 인디케이터 */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <button
          onClick={scrollToNext}
          className="text-white/80 hover:text-white transition-colors duration-300 group animate-bounce-slow"
          aria-label="아래로 스크롤"
        >
          {/* 마우스 아이콘 */}
          <div className="relative w-7 h-11 border-2 border-white/60 rounded-full group-hover:border-white transition-colors duration-300">
            <div className="absolute left-1/2 transform -translate-x-1/2 top-2 w-1.5 h-3 bg-white/80 rounded-full animate-scroll-down"></div>
          </div>
        </button>
      </div>

      {/* 커스텀 애니메이션 스타일 */}
      <style jsx>{`
        @keyframes scroll-down {
          0% {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            transform: translateX(-50%) translateY(12px);
            opacity: 0;
          }
        }

        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-scroll-down {
          animation: scroll-down 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
