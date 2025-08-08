"use client";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-black text-white">
      {/* Main footer content with background image */}
      <div
        className="relative w-full h-[400px] sm:h-[450px] md:h-[510px] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url(/images/footer.png)",
        }}
      >
        {/* Content overlay */}
        <div className="relative z-10 container mx-auto px-6 sm:px-8 lg:px-10 h-full flex flex-col justify-center md:flex-row items-center md:justify-between max-w-7xl py-12 md:py-0">
          <div className="text-center md:text-left mb-8 md:mb-0">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-normal">
              결혼 준비의 시작,
              <br />
              세레나데와 함께하세요.
            </h2>
          </div>
          {/* QRCODE */}
          <div className="flex-shrink-0">
            <Image
              src="/images/qrcode.png"
              alt="QR Code"
              className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36"
              width={148}
              height={148}
            />
          </div>
        </div>
      </div>

      {/* Contact information section */}
      <div className="bg-[#161616] py-12 sm:py-14 md:py-16">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="grid grid-cols-2 text-white/40">
            {/* Left side - Contact info */}
            <div className="space-y-8 sm:space-y-10 md:space-y-12">
              <div>
                <h3 className="text-base sm:text-lg font-bold mb-6 sm:mb-10 md:mb-14">
                  약관
                </h3>
                <div className="space-y-3 sm:space-y-4 text-sm sm:text-md font-bold">
                  <p className="cursor-pointer hover:text-white transition-colors">
                    이용약관
                  </p>
                  <p className="cursor-pointer hover:text-white transition-colors">
                    개인정보 처리방침
                  </p>
                  <p className="cursor-pointer hover:text-white transition-colors">
                    커뮤니티 가이드라인
                  </p>
                </div>
              </div>

              <div>
                <div className="space-y-3 sm:space-y-4 text-sm sm:text-md font-bold">
                  <p>상호명 | 세레나데</p>
                  <p>사업자 번호 | 642-22-02522</p>
                  <p className="break-all sm:break-normal">
                    문의 메일 |{" "}
                    <a
                      href="mailto:serenadeonly@gmail.com"
                      className="hover:text-white transition-colors inline-block"
                    >
                      serenadeonly@gmail.com
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Right side - Instagram */}
            <div className="flex justify-center md:justify-end">
              <a
                href="https://www.instagram.com/serenade_wedding_official/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="세레나데 인스타그램"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9">
                  <Image
                    src="/images/instagram.svg"
                    alt="Instagram"
                    width={40}
                    height={40}
                    className="w-full h-full"
                  />
                </div>
              </a>
            </div>
          </div>

          {/* Mobile copyright section */}
          <div className="mt-12 pt-8 border-t border-white/10 text-center md:hidden">
            <p className="text-xs text-white/30">
              © 2025 SERENADE. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
