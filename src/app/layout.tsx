import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_KR } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSansKR = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ksungz-github-io.vercel.app"),
  title: { default: "김성재 · AI Workflow & Product Engineering", template: "%s · 김성재" },
  description: "13년간 서비스 UI를 개발·운영한 경험을 바탕으로 문제와 적용 범위를 정하고, AI 코딩 에이전트로 구현한 결과를 실행과 테스트로 검증하며 역할을 확장하고 있습니다.",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "김성재 · AI Workflow & Product Engineering",
    title: "김성재 · AI Workflow & Product Engineering",
    description:
      "13년간 서비스 UI를 개발·운영한 경험을 바탕으로 AI Agent와 자동화를 업무와 제품 개발에 적용하고 검증합니다.",
  },
  twitter: {
    card: "summary_large_image",
    title: "김성재 · AI Workflow & Product Engineering",
    description:
      "서비스 UI 개발·운영 경험을 바탕으로 AI Agent와 자동화를 업무와 제품 개발에 적용하고 검증합니다.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ko"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} ${notoSansKR.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="flex min-h-full flex-col bg-[var(--color-background)] text-[var(--color-foreground)]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
