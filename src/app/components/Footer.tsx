"use client";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-black text-white">
      {/* Main footer content with background image */}
      <div
        className="relative w-full h-[510px] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url(/images/footer.png)",
        }}
      >
        {/* Content overlay */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between max-w-7xl">
          <div className="text-left">
            <h2 className="text-4xl font-bold text-white leading-normal">
              결혼 준비의 시작,
              <br />
              세레나데와 함께하세요.
            </h2>
          </div>
          {/* QRCODE */}
          <Image
            src="/images/qrcode.png"
            alt="QR Code"
            className="w-36 h-36"
            width={148}
            height={128}
          />
        </div>
      </div>

      {/* Contact information section */}
      <div className="bg-[#161616] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 text-white/40">
            {/* Left side - Contact info */}
            <div className="space-y-12">
              <div>
                <h3 className="text-lg font-bold mb-14">약관</h3>
                <div className="space-y-4 text-md font-bold">
                  <p>이용약관</p>
                  <p>개인정보 처리방침</p>
                  <p>커뮤니티 가이드라인</p>
                </div>
              </div>

              <div>
                <div className="space-y-4 text-md font-bold">
                  <p>상호명 | 세레나데</p>
                  <p>사업자 번호 | 642-22-02522</p>
                  <p>
                    문의 메일 |{" "}
                    <a
                      href="mailto:serenadeonly@gmail.com"
                      className="hover:text-white transition-colors"
                    >
                      serenadeonly@gmail.com
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Right side - Additional content or empty for balance */}
            <div className="flex justify-end">
              <a
                href="https://www.instagram.com/serenade_wedding_official/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors "
              >
                <Image
                  src="/images/instagram.svg"
                  alt="세레나데"
                  width={39}
                  height={39}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
