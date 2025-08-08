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

  // 모바일 버전 컴포넌트
  const MobileVersion = () => (
    <div className="relative bg-[#161616]">
      {/* 배경 이미지로 brandstory1.png 사용 */}
      <div className="absolute z-0 right-0 top-30">
        <div className="relative w-60 h-80">
          <Image
            src="/images/brandstory1.png"
            alt="Couple Image"
            className="w-full h-full object-cover grayscale opacity-30"
            fill
            sizes="100vw"
            priority
          />
        </div>
      </div>

      {/* 텍스트 섹션 - 중앙 정렬 */}
      <div className="relative z-10 flex flex-col justify-center items-center min-h-[70vh] px-6 sm:px-8 lg:px-10 py-16 text-left">
        <div className="text-white/90 font-normal" style={getAnimationStyle()}>
          <h3
            className="text-white text-lg font-medium mb-10 font-poppins text-left"
            style={{
              fontFamily: "var(--font-poppins), Poppins, sans-serif",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            Brand Story
          </h3>
          <p className="text-lg leading-[28px] mb-1">
            세레나데는, 저희 부부의 수많은
          </p>
          <p className="text-lg leading-[28px] mb-1">
            고민과 시행착오에서 시작됐습니다.
          </p>
          <p className="text-lg leading-[28px] mb-1">
            정보는 넘쳤지만, 진짜 필요한 건
          </p>
          <p className="text-lg leading-[28px] mb-1">
            찾기 어려웠고 점점 지쳐갔죠.
          </p>

          <div className="mt-8">
            <p className="text-lg leading-[28px] mb-1">
              그래서 생각했어요. &ldquo;조금 더 나은
            </p>
            <p className="text-lg leading-[28px] mb-1">
              방식으로 결혼을 준비할 순 없을까?&rdquo;
            </p>
            <p className="text-lg leading-[28px] mb-1">
              그 질문에서 출발해, 경험을
            </p>
            <p className="text-lg leading-[28px] mb-1">
              바탕으로 꼭 필요한 기능만을 담아
            </p>
            <p className="text-lg leading-[28px] mb-1">
              결혼 준비의 복잡함은 줄이고 설렘은
            </p>
            <p className="text-lg leading-[28px] mb-1">
              더하는 서비스, 세레나데를 만들었습니다.
            </p>
          </div>
        </div>
      </div>

      {/* 하단 이미지 섹션 - brandstory2.png를 오른쪽 하단에 배치 */}
      <div className="relative w-full">
        <div className="absolute left-6 bottom-0">
          <div className="relative aspect-[9/16] w-72 h-80">
            <Image
              src="/images/brandstory2.png"
              alt="Workshop Image"
              className="object-contain object-left grayscale opacity-30"
              fill
              sizes="70vw"
            />
          </div>
        </div>
      </div>
    </div>
  );

  // 데스크톱 버전 컴포넌트
  const DesktopVersion = () => (
    <div className="bg-[#161616] relative h-[480px]">
      <div className="max-w-8xl mx-auto px-8 h-full">
        <div className="flex items-center justify-center h-full gap-20">
          {/* 왼쪽 이미지 */}
          <div className="flex-shrink-0">
            <div className="relative w-76 h-106 -translate-y-50">
              <Image
                src="/images/brandstory1.png"
                alt="Couple Image"
                className="w-full h-full object-contain grayscale"
                width={304}
                height={420}
              />
            </div>
          </div>

          {/* 중앙 텍스트 콘텐츠 */}
          <div className="flex flex-col justify-center text-left">
            <h3
              className="text-white text-lg font-medium mb-10 font-poppins"
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
              <span className="text-lg leading-8">
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
              </span>
            </div>
          </div>

          {/* 오른쪽 이미지 */}
          <div className="flex-shrink-0">
            <div className="relative w-75 h-110 translate-y-30">
              <Image
                src="/images/brandstory2.png"
                alt="Workshop Image"
                className="w-full h-full object-contain grayscale"
                width={300}
                height={440}
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
        <div className="lg:hidden">
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
