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

      // Calculate scroll progress (0 to 1)
      const startPoint = windowHeight * 0.9; // Animation starts when section is 90% visible (much later)
      const endPoint = -sectionHeight * 0.3; // Animation ends when section is 30% past viewport (much earlier)

      let progress = 0;
      if (rect.top <= startPoint && rect.bottom >= endPoint) {
        progress = (startPoint - rect.top) / (startPoint - endPoint);
        progress = Math.max(0, Math.min(1, progress));
      }

      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial calculation

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate scale, opacity, and color for each line based on scroll progress
  const getLineStyle = (lineIndex: number, baseColor: string) => {
    const totalLines = 4;
    const lineProgress = Math.max(
      0,
      Math.min(1, scrollProgress * totalLines - lineIndex),
    );

    // Scale from 0.8 to 1.2 and back to 1.0
    let scale = 0.8;
    if (lineProgress > 0 && lineProgress <= 0.5) {
      scale = 0.8 + lineProgress * 2 * 0.4; // 0.8 to 1.2
    } else if (lineProgress > 0.5 && lineProgress <= 1.0) {
      scale = 1.2 - (lineProgress - 0.5) * 2 * 0.2; // 1.2 to 1.0
    }

    // Opacity from 0.3 to 1.0 and back to 0.7
    let opacity = 0.3;
    if (lineProgress > 0 && lineProgress <= 0.5) {
      opacity = 0.3 + lineProgress * 2 * 0.7; // 0.3 to 1.0
    } else if (lineProgress > 0.5 && lineProgress <= 1.0) {
      opacity = 1.0 - (lineProgress - 0.5) * 2 * 0.3; // 1.0 to 0.7
    }

    // Color transition: base color to black when emphasized (scale > 1.0)
    const isEmphasized = scale > 1.0;
    const colorIntensity = isEmphasized ? Math.min(1, (scale - 1.0) / 0.2) : 0;

    // Get RGB values for interpolation
    const getColorValue = (baseColor: string, intensity: number) => {
      const colorMap: { [key: string]: [number, number, number] } = {
        "rgb(107, 114, 128)": [107, 114, 128], // gray-500
        "rgb(156, 163, 175)": [156, 163, 175], // gray-400
        "rgb(75, 85, 99)": [75, 85, 99], // gray-600
        "rgb(31, 41, 55)": [31, 41, 55], // gray-800
      };

      const [r, g, b] = colorMap[baseColor] || [107, 114, 128];
      const targetR = 0,
        targetG = 0,
        targetB = 0; // black

      const newR = Math.round(r + (targetR - r) * intensity);
      const newG = Math.round(g + (targetG - g) * intensity);
      const newB = Math.round(b + (targetB - b) * intensity);

      return `rgb(${newR}, ${newG}, ${newB})`;
    };

    return {
      transform: `scale(${scale})`,
      opacity: opacity,
      color: getColorValue(baseColor, colorIntensity),
      transition:
        "transform 0.1s ease-out, opacity 0.1s ease-out, color 0.1s ease-out",
    };
  };

  return (
    <section
      ref={sectionRef}
      id="main-story"
      className="relative bg-white"
      style={{ height: "150vh" }} // 3x viewport height for scroll space
    >
      {/* Sticky container that stays fixed during scroll */}
      <div className="sticky top-0 h-screen flex items-center justify-center bg-white">
        <div className="container mx-auto px-6">
          {/* Main story section */}
          <div className="text-center">
            <div className="max-w-4xl mx-auto space-y-8 text-lg">
              <p
                className="text-2xl md:text-3xl lg:text-4xl font-bold"
                style={getLineStyle(0, "rgb(75, 85, 99)")}
              >
                어디서부터 시작해야 할지 막막했어요.
              </p>
              <p
                className="text-2xl md:text-3xl lg:text-4xl font-bold"
                style={getLineStyle(1, "rgb(75, 85, 99)")}
              >
                웨딩홀부터 계약해야 하는지,
              </p>
              <p
                className="text-2xl md:text-3xl lg:text-4xl font-bold"
                style={getLineStyle(2, "rgb(107, 114, 128)")}
              >
                웨딩플래너부터 만나야 하는지,
              </p>
              <p
                className="text-2xl md:text-3xl lg:text-4xl font-bold"
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
