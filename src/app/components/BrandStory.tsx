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
            // 한 번 나타나면 observer 해제 (재애니메이션 방지)
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.3, // 섹션의 30%가 보일 때 애니메이션 시작
        rootMargin: "0px 0px -50px 0px", // 살짝 더 스크롤했을 때 시작
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

  // 각 문장에 순차적인 딜레이를 주기 위한 함수
  const getAnimationStyle = (index: number) => {
    return {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(30px)",
      transition: `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.15}s`,
    };
  };

  const textLines = [
    "세레나데는, 저희 부부의 수많은 고민과 시행착오에서 시작됐습니다.",
    "정보는 넘쳤지만, 진짜 필요한 건 찾기 어려웠고 점점 지쳐갔죠.",
    '"조금 더 나은 방식으로 결혼을 준비할 순 없을까?"',
    "그 질문에서 출발해, 경험을 바탕으로 꼭 필요한 기능만을 담아",
    "결혼 준비의 복잡함은 줄이고 설렘은 더하는 서비스, 세레나데를 만들었습니다.",
  ];

  return (
    <section ref={sectionRef} id="brand-story" className="bg-white">
      <div className="w-full">
        {/* Brand Story with black background */}
        <div className="bg-[#161616] relative h-140 flex justify-center items-center">
          {/* Left side - Image */}
          <div className="absolute h-96 w-76 left-40 top-[-110]">
            <Image
              src="/images/brandstory1.png"
              alt="Couple Image"
              className="absolute w-full h-full object-cover grayscale-100"
              width={304}
              height={384}
            />
          </div>

          {/* Content */}
          <div className="p-12 flex flex-col">
            <h3
              className="text-white text-lg md:text-xl font-normal mb-10 text-left font-poppins"
              style={{
                fontFamily: "var(--font-poppins), Poppins, sans-serif",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              Brand Story
            </h3>

            <div className="text-lg md:text-xl space-y-4 text-white/70 font-normal leading-5">
              {textLines.map((line, index) => (
                <p key={index} style={getAnimationStyle(index)}>
                  {line}
                </p>
              ))}
            </div>
          </div>

          {/* Right side - Workshop image */}
          <div className="absolute right-40 bottom-0">
            <div className="w-64 h-80">
              <Image
                src="/images/brandstory2.png"
                alt="Workshop Image"
                className="w-full h-full object-cover grayscale-100"
                width={256}
                height={320}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
