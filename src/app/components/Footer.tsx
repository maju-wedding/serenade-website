"use client";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-black text-white">
      {/* Main footer content with responsive background image */}
      <div className="relative w-full h-[400px] sm:h-[450px] md:h-[510px]">
        {/* Mobile background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat md:hidden"
          style={{
            backgroundImage: "url(/images/footer-mobile.png)",
          }}
        ></div>

        {/* Desktop background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat hidden md:block"
          style={{
            backgroundImage: "url(/images/footer.png)",
          }}
        ></div>

        {/* Content overlay */}
        <div className="relative z-10 container mx-auto px-6 sm:px-8 xl:px-10 h-full flex flex-col justify-center lg:flex-row items-center lg:justify-between max-w-7xl py-12 lg:py-0">
          <div className="text-center lg:text-left mb-8 lg:mb-0">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-normal">
              결혼 준비의 시작,
              <br />
              세레나데와 함께하세요.
            </h2>
          </div>
          {/* Mobile: Button, Desktop: QR Code */}
          <div className="flex-shrink-0">
            {/* Mobile Button */}
            <div className="md:hidden">
              <a
                href="https://apps.apple.com/kr/app/%EC%84%B8%EB%A0%88%EB%82%98%EB%8D%B0-%EA%B4%91%EA%B3%A0-%EC%97%86%EB%8A%94-%EC%A7%84%EC%A7%9C-%EC%9B%A8%EB%94%A9-%EC%95%B1/id6747605861"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-white text-black px-8 py-3 rounded-full font-bold text-md hover:bg-[#e5533a] hover:text-white transition-colors text-center cursor-pointer"
              >
                지금 시작하기
              </a>
            </div>

            {/* Desktop QR Code */}
            <div className="hidden md:block">
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
      </div>

      {/* Contact information section */}
      <div className="bg-[#161616] py-12 sm:py-14 md:py-16">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="grid grid-cols-3 text-white/40">
            {/* Left side - Contact info */}
            <div className="space-y-8 sm:space-y-10 md:space-y-12 col-span-2">
              <div>
                <h3 className="text-base text-md sm:text-lg font-bold mb-6 sm:mb-10 md:mb-14">
                  약관
                </h3>
                <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm md:text-md font-bold">
                  <a
                    href="https://d8erw6l13w214.cloudfront.net/service_policy.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block cursor-pointer hover:text-white transition-colors"
                  >
                    서비스 이용약관
                  </a>
                  <a
                    href="https://d8erw6l13w214.cloudfront.net/privacy_policy.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block cursor-pointer hover:text-white transition-colors"
                  >
                    개인정보 처리방침
                  </a>
                </div>
              </div>

              <div>
                <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm md:text-md font-bold">
                  <p>상호명 | 세레나데</p>
                  <p>사업자 번호 | 642-22-02522</p>
                  <p className="break-all sm:break-normal">
                    문의 메일 |{"  "}
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
            <div className="flex justify-end">
              <a
                href="https://www.instagram.com/serenade_wedding_official/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="세레나데 인스타그램"
              >
                <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8">
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
