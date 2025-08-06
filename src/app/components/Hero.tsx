"use client";

export function Hero() {
  return (
    <section id="home" className="relative h-182 flex items-center">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat "
        style={{
          backgroundImage: `url('/images/hero.png')`,
        }}
      ></div>

      <div className="absolute z-10 left-60">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4 mb-12">
            <h2 className="text-2xl md:text-4xl font-medium">
              가장 우리다운 결혼 준비
            </h2>
            <p className="text-xl md:text-4xl">광고 없는 진짜 웨딩앱</p>
          </div>

          <a
            href="https://apps.apple.com/kr/app/%EC%84%B8%EB%A0%88%EB%82%98%EB%8D%B0-%EA%B4%91%EA%B3%A0-%EC%97%86%EB%8A%94-%EC%A7%84%EC%A7%9C-%EC%9B%A8%EB%94%A9-%EC%95%B1/id6747605861"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black w-fit text-white px-6 py-4 rounded-4xl text-lg font-medium flex items-center space-x-2"
          >
            {/* iOS App Store Icon */}
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            <span>앱 다운로드</span>
          </a>
        </div>
      </div>
    </section>
  );
}
