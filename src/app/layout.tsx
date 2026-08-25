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
  description: "커머스·게임·플랫폼 서비스의 UI를 13년간 개발·운영하며 모바일웹·WebView UI와 레거시 구조를 개선해온 Frontend Engineer입니다.",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "김성재 · Frontend Engineer",
    title: "김성재 · Frontend Engineer",
    description:
      "모바일웹·WebView UI 운영과 레거시 UI 전환 경험을 정리한 Frontend Engineer 김성재의 포트폴리오입니다.",
  },
  twitter: {
    card: "summary_large_image",
    title: "김성재 · Frontend Engineer",
    description:
      "모바일웹·WebView UI 운영과 레거시 UI 전환 경험을 정리한 Frontend Engineer 김성재의 포트폴리오입니다.",
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
