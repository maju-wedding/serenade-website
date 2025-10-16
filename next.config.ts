/** @type {import("next").NextConfig} */
const nextConfig = {
  trailingSlash: true, // SEO용 슬래시
  images: {
    unoptimized: true, // CDN 최적화 비활성화
  },
  assetPrefix:
    process.env.DEPLOY_ENV === "production"
      ? "https://serenade-wedding.com"
      : process.env.DEPLOY_ENV === "development"
        ? "https://dev.serenade-wedding.com"
        : "",
};

module.exports = nextConfig;
