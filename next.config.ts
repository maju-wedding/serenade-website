/** @type {import("next").NextConfig} */
const nextConfig = {
  output: "export", // 정적 사이트 생성
  trailingSlash: true, // SEO용 슬래시
  images: {
    unoptimized: true, // 정적 export용
  },
  assetPrefix:
    process.env.DEPLOY_ENV === "production"
      ? "https://serenade-wedding.com"
      : process.env.DEPLOY_ENV === "development"
        ? "https://dev.serenade-wedding.com"
        : "",
};

module.exports = nextConfig;
