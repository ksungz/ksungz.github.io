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
  title: { default: "김성재 · Frontend Engineer", template: "%s · 김성재" },
  description: "13년간 커머스·게임·플랫폼 서비스의 UI를 개발하고 운영하며, 레거시 현대화와 AI를 활용한 개발 과정 개선을 진행해온 Frontend Engineer입니다.",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "김성재 · Frontend Engineer",
    title: "김성재 · Frontend Engineer",
    description:
      "서비스 UI 개발·운영과 레거시 현대화 경험을 바탕으로 AI를 개발과 검증 과정에 활용합니다.",
  },
  twitter: {
    card: "summary_large_image",
    title: "김성재 · Frontend Engineer",
    description:
      "서비스 UI 개발·운영과 레거시 현대화 경험을 바탕으로 AI를 개발과 검증 과정에 활용합니다.",
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
