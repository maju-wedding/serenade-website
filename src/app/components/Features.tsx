"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export function Features() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const progressRef = useRef<number>(0);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

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
      title: "넘쳐나는 정보 속\n핵심만 쏙쏙!",
      subtitle: "AI 리뷰 요약",
      description:
        "긴 글은 AI가 빠르게 요약해줘서\n중요한 내용만 골라볼 수 있어요.",
      appScreen: "/images/service2.png",
      appAlt: "AI 리뷰 분석 서비스",
    },
    {
      title: "놓치기 쉬운\n준비 항목도 꼼꼼하게!",
      subtitle: "체크리스트",
      description:
        "할 일을 하나하나 지우며\n결혼 준비의 진짜 진척을 느껴보세요.",
      appScreen: "/images/service3.png",
      appAlt: "체크리스트 서비스",
    },
    {
      title: "예산 초과 없이\n똑똑하게!",
      subtitle: "예산관리",
      description:
        "지출 내역을 항목별로 입력하고\n남은 예산도 한눈에 확인할 수 있어요.",
      appScreen: "/images/service4.png",
      appAlt: "예산 관리 서비스",
    },
  ];

  const SLIDE_DURATION = 3000;
  const PROGRESS_INTERVAL = 10;

  // 화면 크기 감지
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // 데스크톱용 슬라이드 애니메이션
  useEffect(() => {
    if (isMobile) return; // 모바일에서는 슬라이드 비활성화

    progressRef.current = 0;
    // DOM 직접 조작으로 progress bar 초기화
    if (progressBarRef.current) {
      progressBarRef.current.style.width = "0%";
    }

    const progressTimer = setInterval(() => {
      progressRef.current += (PROGRESS_INTERVAL / SLIDE_DURATION) * 100;

      if (progressRef.current >= 100) {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % features.length);
        progressRef.current = 0;
      } else {
        // DOM 직접 조작으로 progress bar 업데이트 (리렌더링 없음)
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

  // 모바일 버전 - 모든 기능 펼쳐서 보여주기
  const MobileVersion = () => (
    <div className="space-y-16 sm:space-y-20">
      {features.map((feature, index) => (
        <div key={index} className="space-y-6">
          {/* 텍스트 내용 */}
          <div className="text-center space-y-4 px-4">
            <span className="inline-block text-[#FB6541] font-bold text-xl uppercase">
              {feature.subtitle}
            </span>

            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight whitespace-pre-line">
              {feature.title}
            </h2>

            <p className="text-gray-600 text-base sm:text-lg leading-relaxed whitespace-pre-line max-w-lg mx-auto">
              {feature.description}
            </p>
          </div>

          {/* 이미지 */}
          <div className="relative aspect-[9/16] max-w-sm mx-auto">
            <Image
              src={feature.appScreen}
              alt={feature.appAlt}
              className="w-full h-full object-contain"
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          </div>

          {/* 구분선 (마지막 아이템 제외) */}
          {index < features.length - 1 && (
            <div className="mt-12 border-b border-gray-200 w-24 mx-auto"></div>
          )}
        </div>
      ))}
    </div>
  );

  // 데스크톱 버전 - 슬라이드 형태
  const DesktopVersion = () => (
    <div className="flex justify-between items-center min-h-screen">
      {/* Left side - Content */}
      <div className="text-left flex-shrink-0 w-1/2">
        <div className="space-y-6">
          <span className="inline-block text-[#FB6541] font-bold text-2xl uppercase">
            {features[currentSlide].subtitle}
          </span>

          <h2 className="text-5xl font-bold text-gray-900 leading-tight whitespace-pre-line">
            {features[currentSlide].title}
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-line max-w-lg">
            {features[currentSlide].description}
          </p>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center gap-6 mt-16">
          {/* Progress Bar */}
          <div className="relative w-60 h-1 bg-gray-200 rounded-full overflow-hidden">
            <div
              ref={progressBarRef}
              className="absolute top-0 left-0 h-full bg-[#FB6541] rounded-full transition-none"
              style={{ width: "0%" }}
            />
          </div>

          {/* Arrow buttons with Counter */}
          <div className="flex items-center space-x-3">
            <button
              onClick={goToPrevious}
              className="w-12 h-12 flex items-center justify-center cursor-pointer rounded-full border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 group"
              aria-label="Previous slide"
            >
              <svg
                className="w-6 h-6 text-gray-600 group-hover:text-gray-900"
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
              className="w-12 h-12 flex items-center justify-center cursor-pointer rounded-full border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 group"
              aria-label="Next slide"
            >
              <svg
                className="w-6 h-6 text-gray-600 group-hover:text-gray-900"
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

      {/* Right side - Service Image */}
      <div className="flex justify-center flex-shrink-0 w-85">
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

  return (
    <section className="relative bg-white overflow-hidden py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 모바일에서는 펼쳐진 버전, 데스크톱에서는 슬라이드 버전 */}
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
