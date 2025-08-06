import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "세레나데 - 광고 없는 진짜 웨딩 앱",
  description: "가장 우리다운 결혼 준비",
  keywords: [
    "결혼",
    "웨딩",
    "신혼",
    "예비",
    "예신",
    "부부",
    "준비",
    "예산",
    "체크리스트",
    "AI",
    "추천",
    "스드메",
    "스튜디오",
    "드레스",
    "메이크업",
    "혼주",
    "예물",
  ],
  authors: [{ name: "세레나데" }],
  creator: "세레나데",
  publisher: "세레나데",

  // Open Graph
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://serenade-wedding.com",
    title: "세레나데 - 광고 없는 진짜 웨딩 앱",
    description: "가장 우리다운 결혼 준비",
    siteName: "세레나데",
    images: [
      {
        url: "https://serenade-wedding.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "세레나데 - 광고 없는 진짜 웨딩 앱",
      },
    ],
  },

  // Twitter Cards
  twitter: {
    card: "summary_large_image",
    title: "세레나데 - 광고 없는 진짜 웨딩 앱",
    description: "가장 우리다운 결혼 준비",
    images: ["https://serenade-wedding.com/og-image.jpg"],
  },

  // Favicon and Icons
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    other: [
      {
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },

  // Additional meta tags
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        {/* Additional meta tags for better SEO */}
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <link rel="canonical" href="https://serenade-wedding.com" />
      </head>
      <body className={`font-sans antialiased ${poppins.variable}`}>
        {children}
      </body>
    </html>
  );
}
