"use client";

export function Footer() {
  return (
    <footer className="bg-black text-white">
      {/* Main footer content with background image */}
      <div
        className="relative w-full h-96 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url(/images/footer.png)",
        }}
      >
        {/* Content overlay */}
        <div className="relative z-10 container mx-auto px-6 h-full flex items-center justify-center pl-164">
          <div className="text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              결혼 준비의 시작,
              <br />
              세레나데와 함께하세요.
            </h2>
          </div>
        </div>
      </div>

      {/* Contact information section */}
      <div className="bg-black py-16">
        <div className="container mx-auto px-20">
          <div className="grid md:grid-cols-2 text-gray-500">
            {/* Left side - Contact info */}
            <div className="space-y-12">
              <div>
                <h3 className="text-lg font-bold mb-14">약관</h3>
                <div className="space-y-4 text-md font-bold">
                  <p>이용약관</p>
                  <p>개인정보 처리방침</p>
                  <p>커뮤니티 가이드라인</p>
                  {/*<p>아동 안전 표준 정책</p>*/}
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
            <div className="flex items-baseline justify-center">
              <div className="flex items-center space-x-6 ">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors "
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
