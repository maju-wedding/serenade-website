"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export function BrandStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const getAnimationStyle = () => {
    return {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(30px)",
      transition: `all 0.8s cubic-bezier(0.4, 0, 0.2, 1)`,
    };
  };

  return (
    <section ref={sectionRef} id="brand-story" className="bg-white">
      <div className="w-full">
        {/* Brand Story with black background */}
        <div className="bg-[#161616] relative  lg:h-[560px] py-12 sm:py-16 lg:py-0">
          {/* Container */}
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
            {/* Flex container - 모바일: 세로, 데스크톱: 가로 */}
            <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between h-full gap-8 lg:gap-12">
              {/* 모바일에서 보이는 상단 이미지 (데스크톱에서는 숨김) */}
              <div className="lg:hidden w-full max-w-md mx-auto">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src="/images/brandstory1.png"
                    alt="Couple Image"
                    className="w-full h-full object-cover grayscale"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>

              {/* 데스크톱 왼쪽 이미지 (모바일에서는 숨김) */}
              <div className="hidden lg:block sm:flex-shrink-0">
                <div className="relative w-52 lg:w-64 xl:w-76 h-96 xl:h-105 -translate-y-50">
                  <Image
                    src="/images/brandstory1.png"
                    alt="Couple Image"
                    className="w-full h-full object-cover grayscale"
                    width={304}
                    height={420}
                  />
                </div>
              </div>

              {/* 중앙 텍스트 콘텐츠 */}
              <div className="flex flex-col justify-center text-center md:text-left">
                <h3
                  className="text-white text-lg sm:text-xl md:text-2xl font-normal mb-6 sm:mb-8 lg:mb-10 font-poppins"
                  style={{
                    fontFamily: "var(--font-poppins), Poppins, sans-serif",
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(20px)",
                    transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  Brand Story
                </h3>
                <div
                  className="text-white/70 font-normal"
                  style={getAnimationStyle()}
                >
                  <span className="text-sm sm:text-base md:text-lg">
                    세레나데는, 저희 부부의 수많은 고민과 시행착오에서
                    시작됐습니다.
                    <br />
                    정보는 넘쳤지만, 진짜 필요한 건 찾기어려웠고 점점 지쳐갔죠.
                    <br />
                    그래서 생각했어요. "조금 더 나은 방식으로 결혼을 준비할 순
                    없을까?"
                    <br />
                    그 질문에서 출발해, 경험을 바탕으로 꼭 필요한 기능만을 담아
                    <br />
                    결혼 준비의 복잡함은 줄이고 설렘은 더하는 서비스, 세레나데를
                    만들었습니다.
                  </span>
                </div>
              </div>

              {/* 오른쪽/하단 이미지 */}
              <div className="w-full lg:w-auto lg:flex-shrink-0 max-w-md mx-auto lg:mx-0">
                <div className="relative aspect-[3/4] sm:aspect-[4/3] lg:aspect-auto lg:w-64 xl:w-75 lg:h-96 xl:h-110 translate-y-30 overflow-hidden">
                  <Image
                    src="/images/brandstory2.png"
                    alt="Workshop Image"
                    className="w-full h-full object-cover grayscale"
                    fill
                    sizes="(max-width: 768px) 100vw, 30vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
