"use client";

export function BrandStory() {
  return (
    <section id="brand-story" className=" bg-white">
      <div className="w-full">
        {/* Brand Story with black background */}
        <div className="bg-[#161616] relative h-120 flex justify-center items-center">
          {/* Left side - Image */}
          <div className="absolute h-96 w-76 left-20 top-[-110]">
            <img
              src="/images/brandstory1.png"
              alt="Couple Image"
              className="absolute w-full h-full object-cover grayscale-100"
            />
          </div>

          {/* Content */}
          <div className="p-12 flex flex-col">
            <h3
              className="text-white text-lg md:text-xl font-normal mb-10 text-left font-poppins"
              style={{ fontFamily: "var(--font-poppins), Poppins, sans-serif" }}
            >
              Brand Story
            </h3>

            <div className="text-lg md:text-xl space-y-4 text-white/70 font-normal leading-5">
              <p>
                세레나데는, 저희 부부의 수많은 고민과 시행착오에서 시작됐습니다.
              </p>
              <p>
                정보는 넘쳤지만, 진짜 필요한 건 찾기 어려웠고 점점 지쳐갔죠.
              </p>
              <p>
                그래서 생각했어요. "조금 더 나은 방식으로 결혼을 준비할 순
                없을까?"
              </p>
              <p>그 질문에서 출발해, 경험을 바탕으로 꼭 필요한 기능만을 담아</p>
              <p>
                결혼 준비의 복잡함은 줄이고 설렘은 더하는 서비스, 세레나데를
                만들었습니다.
              </p>
            </div>
          </div>

          {/* Right side - Workshop image */}
          <div className="absolute right-20 bottom-0">
            <div className="w-64 h-80">
              <img
                src="/images/brandstory2.png"
                alt="Workshop Image"
                className="w-full h-full object-cover grayscale-100"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
