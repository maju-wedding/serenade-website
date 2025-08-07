"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-2.5">
            {/* Logo */}
            <div className="flex items-center">
              <button
                onClick={scrollToTop}
                className="transition-all duration-300 hover:opacity-80 cursor-pointer"
                aria-label="홈으로 이동"
              >
                <Image
                  src="/images/logo.svg"
                  alt="세레나데"
                  width={153}
                  height={24}
                  className={`h-5 sm:h-6 w-auto transition-all duration-300 ${
                    isScrolled ? "filter-none" : "brightness-0 invert"
                  }`}
                  priority
                />
              </button>
            </div>

            {/* Desktop: App Download Button */}
            <div className="hidden md:flex items-center">
              <a
                href="https://apps.apple.com/kr/app/%EC%84%B8%EB%A0%88%EB%82%98%EB%8D%B0-%EA%B4%91%EA%B3%A0-%EC%97%86%EB%8A%94-%EC%A7%84%EC%A7%9C-%EC%9B%A8%EB%94%A9-%EC%95%B1/id6747605861"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black text-white px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2 rounded-full text-sm sm:text-base font-medium flex items-center space-x-1.5 sm:space-x-2 hover:bg-[#FB6541] transition-colors duration-300"
              >
                {/* iOS App Store Icon */}
                <svg
                  className="w-4 sm:w-5 h-4 sm:h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <span className="hidden md:inline">앱 다운로드</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 개발 환경 브레이크포인트 표시 */}
      {process.env.NODE_ENV === "development" && (
        <div className="fixed bottom-4 right-4 bg-black text-white p-2 rounded z-50 text-xs">
          <div className="sm:hidden">XS</div>
          <div className="hidden sm:block md:hidden">SM</div>
          <div className="hidden md:block lg:hidden">MD</div>
          <div className="hidden lg:block xl:hidden">LG</div>
          <div className="hidden xl:block 2xl:hidden">XL</div>
          <div className="hidden 2xl:block">2XL</div>
        </div>
      )}
    </header>
  );
}
