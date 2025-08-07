"use client";

import { useEffect, useRef, useState } from "react";

export function MainStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeLineIndex, setActiveLineIndex] = useState(0); // 현재 활성화된 라인 인덱스
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // 섹션이 뷰포트에 있는지 확인
      const inView = rect.top < windowHeight && rect.bottom > 0;
      setIsInView(inView);

      if (!inView) {
        setActiveLineIndex(0); // 뷰포트 밖이면 첫 번째 라인으로 리셋
        return;
      }

      // 섹션 내에서의 스크롤 진행도 계산
      const sectionHeight = rect.height;
      const scrollableHeight = sectionHeight - windowHeight;

      // 섹션 상단이 뷰포트 상단에서 얼마나 위에 있는지 계산
      const scrolledAmount = -rect.top;

      // 진행률 계산 (0 ~ 1)
      let progress = scrolledAmount / scrollableHeight;
      progress = Math.max(0, Math.min(1, progress));

      // 4개 라인 중 어떤 라인을 강조할지 결정
      const totalLines = 4;
      let currentIndex = Math.floor(progress * totalLines);

      // 마지막에 도달했을 때 마지막 라인에 고정
      if (progress === 1) {
        currentIndex = totalLines - 1;
      }

      // 처음 섹션에 진입했을 때는 첫 번째 라인 유지
      if (scrolledAmount <= 0) {
        currentIndex = 0;
      }

      setActiveLineIndex(currentIndex);
    };

    // 초기 로드 시 체크
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // 각 라인의 스타일 계산
  const getLineStyle = (lineIndex: number) => {
    // 현재 활성화된 라인인지 확인
    const isActive = lineIndex === activeLineIndex && isInView;

    // 이미 지나간 라인인지 확인
    const isPassed = lineIndex < activeLineIndex && isInView;

    if (isActive) {
      // 활성화된 라인 스타일
      return {
        opacity: 1,
        transform: `scale(1.1) translateY(-3px)`,
        color: `rgb(0, 0, 0)`,
        transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        transformOrigin: "center",
      };
    } else if (isPassed) {
      // 이미 지나간 라인 스타일
      return {
        opacity: 0.4,
        transform: `scale(0.9)`,
        color: `rgb(156, 163, 175)`, // gray-400
        transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        transformOrigin: "center",
      };
    } else {
      // 아직 활성화되지 않은 라인 스타일
      return {
        opacity: 0.3,
        transform: `scale(0.9)`,
        color: `rgb(156, 163, 175)`, // gray-400
        transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        transformOrigin: "center",
      };
    }
  };

  const lines = [
    "어디서부터 시작해야 할지 막막했어요.",
    "웨딩홀부터 계약해야 하는지,",
    "웨딩플래너부터 만나야 하는지,",
    "웨딩박람회부터 가야 하는지...",
  ];

  return (
    <section
      ref={sectionRef}
      id="main-story"
      className="relative bg-white"
      style={{ height: "300vh" }} // 충분한 스크롤 공간 확보
    >
      <div className="sticky top-0 h-screen flex items-center justify-center bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="max-w-4xl mx-auto space-y-4">
              {lines.map((line, index) => (
                <p
                  key={index}
                  className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight"
                  style={getLineStyle(index)}
                >
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
