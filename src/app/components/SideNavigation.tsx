"use client";

import { useEffect, useState } from "react";

interface NavSection {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface SideNavigationProps {
  sections: NavSection[];
  className?: string;
}

export function SideNavigation({ sections, className = "" }: SideNavigationProps) {
  const [activeSection, setActiveSection] = useState<string>("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 사이드바 표시 여부 (스크롤이 200px 이상일 때 표시)
      setIsVisible(window.scrollY > 200);

      // 현재 보이는 섹션 확인
      let currentSection = "";
      
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            currentSection = section.id;
            break;
          }
        }
      }
      
      if (currentSection) {
        setActiveSection(currentSection);
      } else {
        // 스크롤이 맨 위나 맨 아래에 있을 때 처리
        const scrollPosition = window.scrollY + window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        if (window.scrollY < 200) {
          setActiveSection(sections[0]?.id || "");
        } else if (scrollPosition >= documentHeight - 50) {
          setActiveSection(sections[sections.length - 1]?.id || "");
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 100; // Header 높이 고려
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      {/* Desktop 사이드바 */}
      <div
        className={`hidden xl:block fixed right-8 top-1/2 -translate-y-1/2 z-40 transition-all duration-300 ${
          isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10 pointer-events-none"
        } ${className}`}
      >
        <nav className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="p-3">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-2">
              Quick Navigation
            </div>
            <ul className="space-y-1">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg transition-all duration-200 group flex items-center gap-2 ${
                      activeSection === section.id
                        ? "bg-gradient-to-r from-[#FB6541] to-[#FF8066] text-white shadow-md"
                        : "hover:bg-gray-100 text-gray-700 hover:text-[#FB6541]"
                    }`}
                  >
                    {section.icon && (
                      <span className={`flex-shrink-0 ${
                        activeSection === section.id ? "" : "opacity-60 group-hover:opacity-100"
                      }`}>
                        {section.icon}
                      </span>
                    )}
                    <span className="text-sm font-medium">{section.label}</span>
                    {activeSection === section.id && (
                      <span className="ml-auto">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>

      {/* Mobile 플로팅 네비게이션 버튼 */}
      <div
        className={`xl:hidden fixed bottom-6 right-6 z-40 transition-all duration-300 ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div className="relative">
          <input
            type="checkbox"
            id="nav-toggle"
            className="hidden peer"
          />
          <label
            htmlFor="nav-toggle"
            className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-[#FB6541] to-[#FF8066] text-white rounded-full shadow-lg cursor-pointer hover:shadow-xl transition-all duration-200"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          
          {/* Mobile 메뉴 */}
          <div className="absolute bottom-16 right-0 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden transform scale-95 opacity-0 pointer-events-none peer-checked:scale-100 peer-checked:opacity-100 peer-checked:pointer-events-auto transition-all duration-200 min-w-[200px]">
            <div className="p-3">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-2">
                Quick Navigation
              </div>
              <ul className="space-y-1">
                {sections.map((section) => (
                  <li key={section.id}>
                    <label htmlFor="nav-toggle">
                      <button
                        onClick={() => scrollToSection(section.id)}
                        className={`w-full text-left px-3 py-2.5 rounded-lg transition-all duration-200 flex items-center gap-2 ${
                          activeSection === section.id
                            ? "bg-gradient-to-r from-[#FB6541] to-[#FF8066] text-white shadow-md"
                            : "hover:bg-gray-100 text-gray-700 hover:text-[#FB6541]"
                        }`}
                      >
                        {section.icon && (
                          <span className={`flex-shrink-0 ${
                            activeSection === section.id ? "" : "opacity-60"
                          }`}>
                            {section.icon}
                          </span>
                        )}
                        <span className="text-sm font-medium">{section.label}</span>
                      </button>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 맨 위로 버튼 */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-6 left-6 xl:left-auto xl:right-8 xl:bottom-8 w-12 h-12 bg-white text-gray-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-40 flex items-center justify-center border border-gray-200 hover:border-[#FB6541] hover:text-[#FB6541] ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>
    </>
  );
}