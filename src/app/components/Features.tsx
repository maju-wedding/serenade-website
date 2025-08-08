"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export function Features() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const progressRef = useRef<number>(0);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const features = [
    {
      title: "결혼 준비, 어디서부터\n시작할지 막막하다면?",
      subtitle: "웨딩 가이드",
      description:
        "순서대로 짚어주는 웨딩 가이드로\n혼자서도 차근차근 준비할 수 있어요.",
      appScreen: "/images/service1.png",
      appAlt: "웨딩 가이드 서비스",
    },
    {
      title: "숨겨진 가격은\n이제 그만!",
      subtitle: "웨딩홀 가격 공개",
      description: "이제 웨딩홀 비용,\n직접 비교하고 똑똑하게 선택해보세요.",
      appScreen: "/images/service2.png",
      appAlt: "가격 공개",
    },
    {
      title: "넘쳐나는 정보 속\n핵심만 쏙쏙!",
      subtitle: "AI 리뷰 요약",
      description:
        "긴 글은 AI가 빠르게 요약해줘서\n중요한 내용만 골라볼 수 있어요.",
      appScreen: "/images/service3.png",
      appAlt: "AI 리뷰 분석 서비스",
    },
    {
      title: "놓치기 쉬운\n준비 항목도 꼼꼼하게!",
      subtitle: "체크리스트",
      description:
        "할 일을 하나하나 지우며\n결혼 준비의 진짜 진척을 느껴보세요.",
      appScreen: "/images/service5.png",
      appAlt: "체크리스트 서비스",
    },
    {
      title: "예산 초과 없이\n똑똑하게!",
      subtitle: "예산관리",
      description:
        "지출 내역을 항목별로 입력하고\n남은 예산도 한눈에 확인할 수 있어요.",
      appScreen: "/images/service5.png",
      appAlt: "예산 관리 서비스",
    },
  ];

  const SLIDE_DURATION = 3000;
  const PROGRESS_INTERVAL = 10;

  // 화면 크기 감지
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // IntersectionObserver로 스크롤 감지
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      },
    );

    const currentSection = sectionRef.current;
    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);

  // 데스크톱용 슬라이드 애니메이션
  useEffect(() => {
    if (isMobile) return;

    progressRef.current = 0;
    if (progressBarRef.current) {
      progressBarRef.current.style.width = "0%";
    }

    const progressTimer = setInterval(() => {
      progressRef.current += (PROGRESS_INTERVAL / SLIDE_DURATION) * 100;

      if (progressRef.current >= 100) {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % features.length);
        progressRef.current = 0;
      } else {
        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${progressRef.current}%`;
        }
      }
    }, PROGRESS_INTERVAL);

    return () => {
      clearInterval(progressTimer);
    };
  }, [currentSlide, features.length, isMobile]);

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev === 0 ? features.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % features.length);
  };

  // 모바일 버전
  const MobileVersion = () => {
    const [visibleItems, setVisibleItems] = useState<boolean[]>(
      new Array(features.length).fill(false),
    );
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
      const observers: IntersectionObserver[] = [];

      itemRefs.current.forEach((ref, index) => {
        if (ref) {
          const observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  setTimeout(() => {
                    setVisibleItems((prev) => {
                      const newState = [...prev];
                      newState[index] = true;
                      return newState;
                    });
                  }, 100);
                  observer.unobserve(entry.target);
                }
              });
            },
            {
              threshold: 0.1,
            },
          );

          observer.observe(ref);
          observers.push(observer);
        }
      });

      return () => {
        observers.forEach((observer) => observer.disconnect());
      };
    }, []);

    return (
      <div className="space-y-30 sm:space-y-40 my-20">
        {features.map((feature, index) => (
          <div
            key={index}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            className="space-y-12"
          >
            <div className="text-center space-y-4 px-4">
              <span
                className="inline-block text-[#FB6541] font-bold text-xl uppercase"
                style={{
                  opacity: visibleItems[index] ? 1 : 0,
                  transform: visibleItems[index]
                    ? "translateY(0)"
                    : "translateY(30px)",
                  transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                {feature.subtitle}
              </span>

              <h2
                className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight whitespace-pre-line"
                style={{
                  opacity: visibleItems[index] ? 1 : 0,
                  transform: visibleItems[index]
                    ? "translateY(0)"
                    : "translateY(30px)",
                  transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.1s",
                }}
              >
                {feature.title}
              </h2>

              <p
                className="text-gray-600 text-base sm:text-lg leading-relaxed whitespace-pre-line max-w-lg mx-auto"
                style={{
                  opacity: visibleItems[index] ? 1 : 0,
                  transform: visibleItems[index]
                    ? "translateY(0)"
                    : "translateY(30px)",
                  transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.2s",
                }}
              >
                {feature.description}
              </p>
            </div>

            <div
              className="relative aspect-[9/16] max-w-sm mx-auto"
              style={{
                opacity: visibleItems[index] ? 1 : 0,
                transform: visibleItems[index]
                  ? "translateY(0)"
                  : "translateY(30px)",
                transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.3s",
              }}
            >
              <Image
                src={feature.appScreen}
                alt={feature.appAlt}
                className="w-full h-full object-contain"
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
          </div>
        ))}
      </div>
    );
  };

  // 데스크톱 버전
  const DesktopVersion = () => {
    const [hasInitialAnimated, setHasInitialAnimated] = useState(false);
    const desktopRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      // 초기 스크롤 애니메이션용 Observer
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !hasInitialAnimated) {
              setTimeout(() => {
                setHasInitialAnimated(true);
              }, 100);
            }
          });
        },
        {
          threshold: 0.2,
        },
      );

      const currentDesktop = desktopRef.current;
      if (currentDesktop) {
        observer.observe(currentDesktop);
      }

      return () => {
        if (currentDesktop) {
          observer.unobserve(currentDesktop);
        }
      };
    }, [hasInitialAnimated]);

    // 초기 로드 애니메이션 스타일 (처음 한 번만)
    const getInitialAnimationStyle = (delay: string = "0s") => ({
      opacity: hasInitialAnimated ? 1 : 0,
      transform: hasInitialAnimated ? "translateY(0)" : "translateY(30px)",
      transition: `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${delay}`,
    });

    return (
      <div
        ref={desktopRef}
        className="flex justify-between items-center min-h-screen"
      >
        <div className="text-left flex-shrink-0 w-1/2">
          <div className="space-y-6">
            {/* 슬라이드 변경 시 페이드 전환만 적용 */}
            <div className="relative h-8">
              {features.map((feature, index) => (
                <span
                  key={`subtitle-${index}`}
                  className={`absolute inset-0 text-[#FB6541] font-bold text-2xl uppercase transition-opacity duration-500 ${
                    currentSlide === index ? "opacity-100" : "opacity-0"
                  }`}
                  style={
                    currentSlide === index
                      ? getInitialAnimationStyle("0s")
                      : { opacity: 0 }
                  }
                >
                  {feature.subtitle}
                </span>
              ))}
            </div>

            <div className="relative min-h-[140px]">
              {features.map((feature, index) => (
                <h2
                  key={`title-${index}`}
                  className={`absolute inset-0 text-5xl font-bold text-gray-900 leading-tight whitespace-pre-line transition-opacity duration-500 ${
                    currentSlide === index ? "opacity-100" : "opacity-0"
                  }`}
                  style={
                    currentSlide === index
                      ? getInitialAnimationStyle("0s")
                      : { opacity: 0 }
                  }
                >
                  {feature.title}
                </h2>
              ))}
            </div>

            <div className="relative min-h-[80px]">
              {features.map((feature, index) => (
                <p
                  key={`desc-${index}`}
                  className={`absolute inset-0 text-gray-600 text-lg leading-relaxed whitespace-pre-line max-w-lg transition-opacity duration-500 ${
                    currentSlide === index ? "opacity-100" : "opacity-0"
                  }`}
                  style={
                    currentSlide === index
                      ? getInitialAnimationStyle("0s")
                      : { opacity: 0 }
                  }
                >
                  {feature.description}
                </p>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-6 mt-16">
            <div className="relative w-60 h-1 bg-gray-200 rounded-full overflow-hidden">
              <div
                ref={progressBarRef}
                className="absolute top-0 left-0 h-full bg-[#FB6541] rounded-full transition-none"
                style={{ width: "0%" }}
              />
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={goToPrevious}
                className="w-12 h-12 flex items-center justify-center cursor-pointer rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Previous slide"
              >
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <div className="text-xl text-[#A2A2A2] min-w-[50px] text-center">
                <span className="text-gray-900 font-bold">
                  {currentSlide + 1}
                </span>
                <span className="mx-1">/</span>
                <span>{features.length}</span>
              </div>

              <button
                onClick={goToNext}
                className="w-12 h-12 flex items-center justify-center cursor-pointer rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Next slide"
              >
                <svg
                  className="w-6 h-6 text-gray-600"
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
              </button>
            </div>
          </div>
        </div>

        <div
          className="flex justify-center flex-shrink-0 w-85"
          style={getInitialAnimationStyle("0s")}
        >
          <div className="relative w-full max-w-none">
            <div className="relative aspect-[9/20] max-h-[800px] mx-auto">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    currentSlide === index ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <Image
                    src={feature.appScreen}
                    alt={feature.appAlt}
                    className="w-full h-full object-contain"
                    fill
                    sizes="40vw"
                    priority={index === 0}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-white overflow-hidden py-12 sm:py-16 lg:py-20"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="block lg:hidden">
          <MobileVersion />
        </div>
        <div className="hidden lg:block">
          <DesktopVersion />
        </div>
      </div>
    </section>
  );
}
