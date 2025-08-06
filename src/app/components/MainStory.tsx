"use client";

import { useEffect, useRef, useState } from "react";

export function MainStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = rect.height;

      // 섹션이 화면에 들어오기 시작할 때부터 애니메이션 시작
      const startPoint = windowHeight; // 섹션 상단이 뷰포트 하단에 도달
      const endPoint = -sectionHeight * 0.5; // 섹션이 뷰포트를 50% 지나갈 때까지

      let progress = 0;
      if (rect.top <= startPoint && rect.bottom >= endPoint) {
        progress = (startPoint - rect.top) / (startPoint - endPoint);
        progress = Math.max(0, Math.min(1, progress));
      } else if (rect.top > startPoint) {
        progress = 0;
      } else if (rect.bottom < endPoint) {
        progress = 1;
      }

      setScrollProgress(progress);
    };

    // 초기 로드 시에도 체크
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // Calculate scale, opacity, and color for each line based on scroll progress
  const getLineStyle = (lineIndex: number, baseColor: string) => {
    const totalLines = 4;

    // 각 라인이 강조되는 구간을 겹치도록 설정하여 더 긴 강조 시간 확보
    const overlapFactor = 0.3; // 30% 겹침
    const lineWidth = (1 + overlapFactor) / totalLines; // 각 라인의 구간 너비

    const lineStartProgress = Math.max(
      0,
      lineIndex / totalLines - overlapFactor / 2,
    );
    const lineEndProgress = Math.min(1, lineStartProgress + lineWidth);

    // 현재 라인의 진행률 계산
    let lineProgress = 0;
    if (
      scrollProgress >= lineStartProgress &&
      scrollProgress <= lineEndProgress
    ) {
      lineProgress =
        (scrollProgress - lineStartProgress) /
        (lineEndProgress - lineStartProgress);
    } else if (scrollProgress > lineEndProgress) {
      lineProgress = 1;
    }

    // 첫 번째 라인은 스크롤 시작부터 바로 강조되도록 특별 처리
    if (lineIndex === 0 && scrollProgress < 0.1) {
      lineProgress = scrollProgress * 10; // 0~0.1 구간을 0~1로 매핑
    }

    // Scale 계산: 더 극적인 변화를 위해 범위 확대
    let scale = 0.9;
    if (lineProgress <= 0.6) {
      // 60%까지는 점진적으로 커짐
      scale = 0.9 + (lineProgress / 0.6) * 0.25; // 0.9 → 1.15
    } else {
      // 60% 이후부터는 천천히 줄어들어 1.05에서 안정
      scale = 1.15 - ((lineProgress - 0.6) / 0.4) * 0.1; // 1.15 → 1.05
    }

    // Opacity 계산: 더 뚜렷한 대비
    let opacity = 0.35;
    if (lineProgress <= 0.4) {
      opacity = 0.35 + (lineProgress / 0.4) * 0.65; // 0.35 → 1.0
    } else if (lineProgress <= 0.8) {
      opacity = 1.0; // 40%~80% 구간에서 최대 투명도 유지
    } else {
      opacity = 1.0 - ((lineProgress - 0.8) / 0.2) * 0.25; // 1.0 → 0.75
    }

    // Color transition
    const getColorValue = (baseColor: string, intensity: number) => {
      const colorMap: { [key: string]: [number, number, number] } = {
        "rgb(107, 114, 128)": [107, 114, 128], // gray-500
        "rgb(156, 163, 175)": [156, 163, 175], // gray-400
        "rgb(75, 85, 99)": [75, 85, 99], // gray-600
        "rgb(31, 41, 55)": [31, 41, 55], // gray-800
      };

      const [r, g, b] = colorMap[baseColor] || [107, 114, 128];

      // 강조될 때는 검은색으로
      const targetR = 0,
        targetG = 0,
        targetB = 0;

      const newR = Math.round(r + (targetR - r) * intensity);
      const newG = Math.round(g + (targetG - g) * intensity);
      const newB = Math.round(b + (targetB - b) * intensity);

      return `rgb(${newR}, ${newG}, ${newB})`;
    };

    // 강조 강도 계산: 더 긴 구간에서 강조
    let emphasisIntensity = 0;
    if (lineProgress >= 0.2 && lineProgress <= 0.8) {
      // 20%~80% 구간에서 강조 (전체의 60% 구간)
      const emphasisProgress = (lineProgress - 0.2) / 0.6;
      emphasisIntensity = Math.sin(emphasisProgress * Math.PI) * 0.9; // 강도도 증가
    }

    return {
      transform: `scale(${scale})`,
      opacity: opacity,
      color: getColorValue(baseColor, emphasisIntensity),
      transition:
        "transform 0.2s ease-out, opacity 0.2s ease-out, color 0.2s ease-out",
      transformOrigin: "center",
    };
  };

  return (
    <section
      ref={sectionRef}
      id="main-story"
      className="relative bg-white"
      style={{ height: "200vh" }} // 더 긴 스크롤 공간으로 각 라인의 강조 시간 확보
    >
      {/* Sticky container that stays fixed during scroll */}
      <div className="sticky top-0 h-screen flex items-center justify-center bg-white">
        <div className="container mx-auto px-6">
          {/* Main story section */}
          <div className="text-center">
            <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
              <p
                className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight"
                style={getLineStyle(0, "rgb(75, 85, 99)")}
              >
                어디서부터 시작해야 할지 막막했어요.
              </p>
              <p
                className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight"
                style={getLineStyle(1, "rgb(75, 85, 99)")}
              >
                웨딩홀부터 계약해야 하는지,
              </p>
              <p
                className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight"
                style={getLineStyle(2, "rgb(107, 114, 128)")}
              >
                웨딩플래너부터 만나야 하는지,
              </p>
              <p
                className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight"
                style={getLineStyle(3, "rgb(156, 163, 175)")}
              >
                웨딩박람회부터 가야 하는지...
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
