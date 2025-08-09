"use client";

import { useEffect, useRef, useState } from "react";

export function MainStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [hasSeenLines, setHasSeenLines] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);
  const isTransitioning = useRef(false);
  const lastUpdateTime = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || isTransitioning.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // 섹션이 뷰포트에 있는지 확인
      const inView = rect.top < windowHeight && rect.bottom > 0;
      setIsInView(inView);

      if (!inView) {
        // 섹션을 벗어났을 때 초기화
        if (rect.top > windowHeight) {
          setCurrentLineIndex(0);
          setHasSeenLines([false, false, false, false]);
        }
        return;
      }

      // 스크롤 진행도 계산
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const scrollProgress =
        Math.max(0, -sectionTop) / (sectionHeight - windowHeight);
      const clampedProgress = Math.max(0, Math.min(1, scrollProgress));

      // 목표 인덱스 계산 (각 라인이 충분한 구간을 가지도록)
      let targetIndex = 0;
      if (clampedProgress < 0.2) {
        targetIndex = 0;
      } else if (clampedProgress < 0.4) {
        targetIndex = 1;
      } else if (clampedProgress < 0.65) {
        targetIndex = 2; // 세 번째 라인에 더 긴 구간 할당
      } else {
        targetIndex = 3;
      }

      const now = Date.now();
      const timeSinceLastUpdate = now - lastUpdateTime.current;

      // 현재 인덱스와 목표 인덱스가 다르고, 충분한 시간이 지났을 때
      if (targetIndex !== currentLineIndex && timeSinceLastUpdate > 300) {
        // 스크롤 방향 확인
        if (targetIndex > currentLineIndex) {
          // 아래로 스크롤 - 한 단계씩 진행
          const nextIndex = currentLineIndex + 1;

          if (nextIndex <= targetIndex && nextIndex < 4) {
            isTransitioning.current = true;
            setCurrentLineIndex(nextIndex);
            setHasSeenLines((prev) => {
              const newSeen = [...prev];
              newSeen[nextIndex] = true;
              return newSeen;
            });
            lastUpdateTime.current = now;

            // 목표까지 더 가야 한다면 짧은 지연 후 다시 확인
            if (nextIndex < targetIndex) {
              setTimeout(() => {
                isTransitioning.current = false;
                handleScroll();
              }, 400);
            } else {
              setTimeout(() => {
                isTransitioning.current = false;
              }, 400);
            }
          }
        } else {
          // 위로 스크롤 - 바로 이동
          setCurrentLineIndex(targetIndex);
          lastUpdateTime.current = now;
        }
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [currentLineIndex]);

  const getLineStyle = (index: number) => {
    if (!isInView) {
      return {
        opacity: 0.2,
        transform: "scale(0.9)",
        color: "rgb(209, 213, 219)",
      };
    }

    const isActive = index === currentLineIndex;
    const hasSeen = hasSeenLines[index];

    if (isActive) {
      return {
        opacity: 1,
        transform: "scale(1.05) translateY(-4px)",
        color: "rgb(0, 0, 0)",
        transition: "all 0.5s ease-out",
      };
    } else if (hasSeen) {
      return {
        opacity: 0.5,
        transform: "scale(0.95)",
        color: "rgb(107, 114, 128)",
        transition: "all 0.5s ease-out",
      };
    } else {
      return {
        opacity: 1,
        transform: "scale(0.9)",
        color: "rgb(209, 213, 219)",
        transition: "all 0.5s ease-out",
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
      style={{ height: "300vh" }}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <div className="mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            {lines.map((line, index) => (
              <p
                key={index}
                className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-bold mb-6"
                style={getLineStyle(index)}
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
