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

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
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

  // 모바일 버전 컴포넌트
  const MobileVersion = () => (
    <div className="bg-[#161616] relative">
      {/* 상단 이미지 섹션 */}
      <div className="relative h-40 flex justify-end items-start pt-20">
        <div className="relative w-64 h-80">
          <Image
            src="/images/brandstory1.png"
            alt="Couple Image"
            className="w-full h-full object-cover grayscale opacity-30"
            fill
            sizes="192px"
            priority
          />
        </div>
      </div>

      {/* 텍스트 섹션 */}
      <div className="px-6 sm:px-8 py-8 relative z-10 sm:w-fit sm:mx-auto">
        <div className="text-white/90 font-normal" style={getAnimationStyle()}>
          <h3
            className="text-white text-md sm:text-lg font-medium mb-8 font-poppins text-left"
            style={{
              fontFamily: "var(--font-poppins), Poppins, sans-serif",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            Brand Story
          </h3>
          <div className="space-y-1">
            <p className="text-md sm:text-lg leading-[24px] sm:leading-[28px]">
              세레나데는, 저희 부부의 수많은
            </p>
            <p className="text-md sm:text-lg leading-[24px] sm:leading-[28px]">
              고민과 시행착오에서 시작됐습니다.
            </p>
            <p className="text-md sm:text-lg leading-[24px] sm:leading-[28px]">
              정보는 넘쳤지만, 진짜 필요한 건
            </p>
            <p className="text-md sm:text-lg leading-[24px] sm:leading-[28px]">
              찾기 어려웠고 점점 지쳐갔죠.
            </p>
          </div>

          <div className="mt-6 space-y-1">
            <p className="text-md sm:text-lg leading-[24px] sm:leading-[28px]">
              그래서 생각했어요. &ldquo;조금 더 나은
            </p>
            <p className="text-md sm:text-lg leading-[24px] sm:leading-[28px]">
              방식으로 결혼을 준비할 순 없을까?&rdquo;
            </p>
            <p className="text-md sm:text-lg leading-[24px] sm:leading-[28px]">
              그 질문에서 출발해, 경험을
            </p>
            <p className="text-md sm:text-lg leading-[24px] sm:leading-[28px]">
              바탕으로 꼭 필요한 기능만을 담아
            </p>
            <p className="text-md sm:text-lg leading-[24px] sm:leading-[28px]">
              결혼 준비의 복잡함은 줄이고 설렘은
            </p>
            <p className="text-md sm:text-lg leading-[24px] sm:leading-[28px]">
              더하는 서비스, 세레나데를 만들었습니다.
            </p>
          </div>
        </div>
      </div>

      {/* 하단 이미지 섹션 - Features 섹션으로 넘어가는 효과 */}
      <div className="relative h-40">
        <div className="absolute left-6 bottom-0 w-56 h-80 z-10 translate-y-30">
          <Image
            src="/images/brandstory2.png"
            alt="Workshop Image"
            className="object-contain object-left grayscale"
            fill
            sizes="224px"
          />
        </div>
      </div>
    </div>
  );

  // 데스크톱 버전 컴포넌트
  const DesktopVersion = () => (
    <div className="bg-[#161616] relative lg:h-[480px] xl:h-[520px] 2xl:h-[600px]">
      <div className="container mx-auto px-4 h-full">
        <div className="flex items-center justify-center h-full gap-4 lg:gap-8 xl:gap-12 2xl:gap-20">
          {/* 왼쪽 이미지 - 반응형 크기와 위치 */}
          <div className="flex-shrink-0">
            <div
              className="relative w-48 h-72 lg:w-56 lg:h-80 xl:w-64 xl:h-96 2xl:w-76 2xl:h-106
                          -translate-y-35 lg:-translate-y-40 xl:-translate-y-45 2xl:-translate-y-50"
            >
              <Image
                src="/images/brandstory1.png"
                alt="Couple Image"
                className="w-full h-full object-contain grayscale"
                fill
                sizes="(min-width: 1536px) 304px, (min-width: 1280px) 256px, (min-width: 1024px) 224px, 192px"
              />
            </div>
          </div>

          {/* 중앙 텍스트 콘텐츠 - 유연한 너비 */}
          <div className="flex-1 max-w-xl lg:max-w-2xl xl:max-w-3xl px-4">
            <h3
              className="text-white text-base lg:text-lg xl:text-xl font-medium mb-6 lg:mb-8 xl:mb-10 font-poppins"
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
              <p className="text-base xl:text-lg 2xl:text-xl leading-relaxed lg:leading-loose">
                세레나데는, 저희 부부의 수많은 고민과 시행착오에서 시작됐습니다.
                <br />
                정보는 넘쳤지만, 진짜 필요한 건 찾기어려웠고 점점 지쳐갔죠.
                <br />
                그래서 생각했어요. &ldquo;조금 더 나은 방식으로 결혼을 준비할 순
                없을까?&rdquo;
                <br />
                그 질문에서 출발해, 경험을 바탕으로 꼭 필요한 기능만을 담아
                <br />
                결혼 준비의 복잡함은 줄이고 설렘은 더하는 서비스, 세레나데를
                만들었습니다.
              </p>
            </div>
          </div>

          {/* 오른쪽 이미지 - 반응형 크기와 위치 */}
          <div className="flex-shrink-0">
            <div
              className="relative w-48 h-72 lg:w-56 lg:h-80 xl:w-64 xl:h-96 2xl:w-75 2xl:h-110
                          translate-y-25 lg:translate-y-30 xl:translate-y-35 2xl:translate-y-40"
            >
              <Image
                src="/images/brandstory2.png"
                alt="Workshop Image"
                className="w-full h-full object-contain grayscale"
                fill
                sizes="(min-width: 1536px) 300px, (min-width: 1280px) 256px, (min-width: 1024px) 224px, 192px"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section ref={sectionRef} id="brand-story" className="bg-white">
      <div className="w-full">
        {/* 모바일 버전 */}
        <div className="block lg:hidden">
          <MobileVersion />
        </div>

        {/* 데스크톱 버전 */}
        <div className="hidden lg:block">
          <DesktopVersion />
        </div>
      </div>
    </section>
  );
}
