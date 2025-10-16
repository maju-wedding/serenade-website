"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const navItems = [
    { href: "/", label: "홈" },
    { href: "/wedding-halls", label: "웨딩홀" },
    { href: "/studios", label: "스튜디오" },
    { href: "/magazines", label: "매거진" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || pathname !== "/"
          ? "bg-white border-b-1 border-b-gray-900/10"
          : "bg-transparent"
      }`}
    >
      <div className="w-full">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="flex items-center justify-between py-4 sm:py-2">
            {/* Logo and Navigation */}
            <div className="flex items-center space-x-8">
              <Link
                href="/"
                className="transition-all duration-300 hover:opacity-80 cursor-pointer"
                aria-label="홈으로 이동"
              >
                <Image
                  src="/images/logo.svg"
                  alt="세레나데"
                  width={153}
                  height={24}
                  className={`h-5 sm:h-6 w-auto transition-all duration-300 ${
                    isScrolled || pathname !== "/" ? "filter-none" : "brightness-0 invert"
                  }`}
                  priority
                />
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-6">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`font-medium transition-colors duration-200 ${
                      pathname === item.href
                        ? isScrolled || pathname !== "/" 
                          ? "text-[#FB6541]" 
                          : "text-white"
                        : isScrolled || pathname !== "/"
                        ? "text-gray-700 hover:text-[#FB6541]"
                        : "text-white/90 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Desktop: App Download Button + Mobile Menu Button */}
            <div className="flex items-center space-x-4">
              <div
                className={`hidden sm:flex items-center duration-300 ${
                  isScrolled || pathname !== "/"
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

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`md:hidden p-2 rounded-lg transition-colors ${
                  isScrolled || pathname !== "/"
                    ? "text-gray-700 hover:bg-gray-100"
                    : "text-white hover:bg-white/10"
                }`}
                aria-label="메뉴"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <nav className="flex flex-col space-y-3">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                      pathname === item.href
                        ? "bg-[#FB6541] text-white"
                        : isScrolled || pathname !== "/"
                        ? "text-gray-700 hover:bg-gray-100"
                        : "text-white hover:bg-white/10"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                <a
                  href="https://apps.apple.com/kr/app/%EC%84%B8%EB%A0%88%EB%82%98%EB%8D%B0-%EA%B4%91%EA%B3%A0-%EC%97%86%EB%8A%94-%EC%A7%84%EC%A7%9C-%EC%9B%A8%EB%94%A9-%EC%95%B1/id6747605861"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black text-white px-3 py-2 rounded-lg font-medium text-center hover:bg-[#FB6541] transition-colors"
                >
                  앱 다운로드
                </a>
              </nav>
            </div>
          )}
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
