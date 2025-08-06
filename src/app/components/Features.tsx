"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export function Features() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const features = [
    {
      title: "결혼 준비에 필요한\n모든 가이드.zip",
      subtitle: "웨딩 가이드",
      description:
        "순서대로 짚어주는 웨딩 가이드로\n혼자서도 차근차근 준비할 수 있어요.",
      appScreen: "/images/service1.png",
      appAlt: "웨딩 가이드 서비스",
    },
    {
      title: "넘쳐나는 정보,\n핵심만 빠르게 AI 리뷰 요약",
      subtitle: "AI 리뷰 요약",
      description:
        "수많은 리뷰 속에서 AI가 핵심만 쏙쏙\n골라서 한눈에 볼 수 있게 정리해드려요.",
      appScreen: "/images/service2.png",
      appAlt: "AI 리뷰 분석 서비스",
    },
    // {
    //   title: "내 스타일에 맞는\n웨딩 업체 추천",
    //   subtitle: "맞춤 추천",
    //   description:
    //     "취향과 예산에 딱 맞는 웨딩홀, 스튜디오,\n드레스샵을 AI가 추천해드려요.",
    //   appScreen: "/images/service3.png",
    //   appAlt: "맞춤 추천 서비스",
    // },
    // {
    //   title: "실시간으로 확인하는\n웨딩 준비 체크리스트",
    //   subtitle: "체크리스트",
    //   description: "D-Day까지 놓치는 것 없이\n체계적으로 준비할 수 있어요.",
    //   appScreen: "/images/service4.png",
    //   appAlt: "체크리스트 서비스",
    // },
  ];

  // Auto slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [features.length]);

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev === 0 ? features.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % features.length);
  };

  return (
    <section className="relative bg-white py-30 px-4 md:px-8 lg:px-20 overflow-hidden min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-60 items-center">
          {/* Left side - Content */}
          <div className="space-y-10 order-1">
            <div className="space-y-6">
              <span className="inline-block text-[#FB6541] font-bold text-3xl uppercase ">
                {features[currentSlide].subtitle}
              </span>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight whitespace-pre-line">
                {features[currentSlide].title}
              </h2>

              <p className="text-gray-600 text-base md:text-lg leading-relaxed whitespace-pre-line">
                {features[currentSlide].description}
              </p>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center space-x-8">
              {/* Dots */}
              <div className="flex space-x-2">
                {features.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`transition-all duration-300 ${
                      currentSlide === index
                        ? "w-8 h-2 bg-[#FB6541] rounded-full"
                        : "w-2 h-2 bg-gray-300 rounded-full hover:bg-gray-400"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              {/* Arrow buttons with Counter in between */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={goToPrevious}
                  className="w-10 h-10 rounded-full border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 flex items-center justify-center group"
                  aria-label="Previous slide"
                >
                  <svg
                    className="w-5 h-5 text-gray-600 group-hover:text-gray-900"
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

                {/* Counter between arrows */}
                <div className="text-sm text-gray-500 font-medium min-w-[40px] text-center">
                  <span className="text-gray-900 font-semibold">
                    {currentSlide + 1}
                  </span>
                  <span className="mx-1">/</span>
                  <span>{features.length}</span>
                </div>

                <button
                  onClick={goToNext}
                  className="w-10 h-10 rounded-full border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 flex items-center justify-center group"
                  aria-label="Next slide"
                >
                  <svg
                    className="w-5 h-5 text-gray-600 group-hover:text-gray-900"
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
          <div className="flex justify-center order-2">
            <div className="relative w-full">
              {/* Image Container with Transition */}
              <div className="relative aspect-[3/4] overflow-hidden min-w-140">
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
                      width={400}
                      height={500}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
