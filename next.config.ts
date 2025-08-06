/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',           // 정적 사이트 생성
  trailingSlash: true,       // SEO용 슬래시
  images: {
    unoptimized: true        // 정적 export용
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? 'https://serenade-wedding.com' : '',
}

module.exports = nextConfig