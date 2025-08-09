"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

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
        isScrolled
          ? "bg-white border-b-1 border-b-gray-900/10"
          : "bg-transparent"
      }`}
    >
      <div className="w-full">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="flex items-center justify-between py-4 sm:py-2">
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
            <div
              className={`flex items-center duration-300 ${
                isScrolled
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              }`}
            >
              <a
                href="https://apps.apple.com/kr/app/%EC%84%B8%EB%A0%88%EB%82%98%EB%8D%B0-%EA%B4%91%EA%B3%A0-%EC%97%86%EB%8A%94-%EC%A7%84%EC%A7%9C-%EC%9B%A8%EB%94%A9-%EC%95%B1/id6747605861"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black text-white px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2 rounded-full text-sm sm:text-base font-medium flex items-center space-x-1.5 sm:space-x-2 hover:bg-[#FB6541] transition-colors duration-300"
              >
                <span className="inline">앱 다운로드</span>
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
