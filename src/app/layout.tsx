import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: "SERENADE | 가장 우리다운 결혼 준비",
  description: "광고 없는 진짜 웨딩앱. 전통적인 장인정신과 현대적인 감각을 결합한 SERENADE의 특별한 결혼 준비 서비스를 만나보세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin=""
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
      </head>
      <body className={`font-sans antialiased ${poppins.variable}`}>
        {children}
      </body>
    </html>
  );
}
