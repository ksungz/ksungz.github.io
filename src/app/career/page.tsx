import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Career",
  description: "김성재의 경력기술서 — 13년 UI/Frontend 개발 경력",
};

const careers = [
  {
    company: "11번가 (SK플래닛)",
    team: "UI개발팀",
    period: "2020.12 ~ 현재",
    role: "UI 개발자",
    description:
      "국내 주요 이커머스 서비스인 11번가에서 트래픽이 집중되는 모바일웹 상품상세페이지(PDP)를 포함한 핵심 서비스 UI를 전담 개발하고 있습니다. SCSS→Dart Sass 전환(2,384개 파일), React 기반 PDP 마이그레이션 등 레거시 개선 작업을 주도했으며, AI 기반 개발 도구 체계를 구축해 팀 내 전파하는 등 개발 생산성 향상에 기여하고 있습니다.",
    projects: [
      { period: "2024.06 ~ 현재", title: "모바일웹 상품상세(PDP) 전체 UI 개발" },
      { period: "2025.11 ~ 2026.04", title: "체험단 서비스 전체 신규 구축" },
      { period: "2026.01 ~ 2026.04", title: "React 기반 PDP 컴포넌트 개발" },
      { period: "2025.06 ~ 2025.07", title: "Dart Sass 마이그레이션" },
      { period: "2025.10 ~ 현재", title: "AI 기반 개발 도구 체계 구축 및 팀 전파" },
      { period: "2021.09 ~ 현재", title: "서버/인프라 관리 및 환경 업데이트" },
      { period: "2021.11 ~ 2022.12", title: "반응형 웹 전환 추진 및 기반 구축" },
    ],
  },
  {
    company: "스마일게이트 알피지",
    team: "웹팀",
    period: "2019.10 ~ 2020.12",
    role: "UI 개발자",
    description:
      "로스트아크 게임 이벤트 페이지 구축 및 운영, 공식사이트 콘텐츠 업데이트와 API 연동을 담당했습니다. 매주 정기배포를 직접 담당하며 서비스 안정성을 유지했습니다.",
    projects: [
      { period: "2019.10 ~ 2020.12", title: "로스트아크 이벤트 페이지 운영/구축 — 출석체크·룰렛·투표 등, API 연동, 매주 정기배포" },
      { period: "2019.10 ~ 2020.12", title: "공식사이트 운영 — 콘텐츠 업데이트, CSS/이미지 정기배포, 게임정보 API 연동" },
    ],
  },
  {
    company: "하이브랩",
    team: "FE개발팀",
    period: "2012.07 ~ 2019.06",
    role: "UI 개발자 → 팀장",
    description:
      "네이버, G마켓(eBay), 블리자드, PUBG, 스마일게이트 등 국내외 대형 클라이언트 UI 프로젝트를 전담 수행했습니다. 재직 후반 약 3년간 팀장으로서 팀원 업무 분배, 공수 산정, 클라이언트 커뮤니케이션을 총괄했으며, i-award 3개 부문 수상(대상·최우수상·우수상)에 기여했습니다.",
    projects: [
      { period: "2016.10 ~ 2017.01", title: "네이버 웨일 브라우저 공식사이트 — i-award 최우수상" },
      { period: "2017.02 ~ 2017.03", title: "배틀그라운드 공식사이트 구축 — i-award 대상" },
      { period: "2018.04 ~ 2018.12", title: "PUBG 배틀그라운드 E-sports 사이트 — UI개발 총괄" },
      { period: "2017.12 ~ 2018.05", title: "블리자드 오버워치 E-sports 사이트 — UI개발 총괄" },
      { period: "2016.02 ~ 2016.12", title: "로스트아크 1차 CBT 사이트 구축 (PC/Mobile) — PL 담당" },
      { period: "2014.03 ~ 2014.09", title: "G마켓 모바일 운영 · G9 모바일 신규 구축 (eBay)" },
      { period: "2012.08 ~ 2014.02", title: "네이버 지식쇼핑 UI 개발 · 운영 전담" },
    ],
  },
];

const sideProjects = [
  { title: "유튜브 댓글 AI 분석기", stack: "Next.js · Gemini · YouTube API", description: "YouTube 영상 댓글을 AI로 분석·요약" },
  { title: "AI 숏츠 오케스트레이션", stack: "Next.js 15 · Supabase · Inngest", description: "AI 기반 숏츠 영상 제작 파이프라인" },
  { title: "텔레그램 Claude 봇", stack: "Node.js · Telegraf · Claude CLI", description: "텔레그램으로 Claude CLI를 제어하는 자동화 봇" },
];

export default function CareerPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">

      {/* Heading */}
      <div className="mb-12">
        <p className="font-mono text-xs text-[var(--color-muted)] mb-2">경력기술서</p>
        <h1 className="text-2xl font-bold tracking-tight">김성재</h1>
        <p className="mt-2 text-sm text-[var(--color-muted)]">
          시니어 UI 개발자 · 프론트엔드 개발 / AI 기반 개발 체계 구축 · 약 13년
        </p>
      </div>

      {/* 소개 */}
      <section className="mb-12">
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-[var(--color-muted)]">About</h2>
        <div className="space-y-3 text-sm text-[var(--color-muted)] leading-relaxed">
          <p>HTML/CSS 기반 UI 개발을 중심으로 13년간 커머스·게임·플랫폼 도메인에서 실무를 수행해온 시니어 UI 개발자입니다. 복잡한 UI를 구조적으로 정리하고, 규모가 큰 레거시를 단계적으로 개선하는 데 강점이 있습니다.</p>
          <p>현재는 11번가에서 SCSS/HTML 마크업 산출물을 React 기반 저장소로 이관하며, 레거시 CSS 축소와 컴포넌트 단위 재구성 작업을 맡고 있습니다. Cursor와 Claude를 중심으로 Jira·Confluence·Bitbucket Cloud MCP를 연동해 반복 업무를 AI 기반으로 효율화하고, 팀 내 커스텀 스킬과 룰을 직접 설계해 실무에 적용하고 있습니다.</p>
        </div>
      </section>

      {/* 경력 */}
      <section className="mb-12">
        <h2 className="mb-6 text-xs font-semibold uppercase tracking-widest text-[var(--color-muted)]">Experience</h2>
        <div className="space-y-10">
          {careers.map((career) => (
            <div key={career.company} className="border-l border-[var(--color-border)] pl-5">
              <div className="flex flex-col gap-0.5 mb-3">
                <span className="font-mono text-xs text-[var(--color-muted)]">{career.period}</span>
                <h3 className="text-sm font-semibold">{career.company} · {career.team}</h3>
                <span className="text-xs text-[var(--color-muted)]">{career.role}</span>
              </div>
              <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-4">{career.description}</p>
              <ul className="space-y-1.5">
                {career.projects.map((proj) => (
                  <li key={proj.title} className="flex gap-3 text-xs">
                    <span className="font-mono text-[var(--color-muted)] shrink-0 w-28">{proj.period}</span>
                    <span className="text-[var(--color-foreground)]">{proj.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 사이드 프로젝트 */}
      <section>
        <h2 className="mb-6 text-xs font-semibold uppercase tracking-widest text-[var(--color-muted)]">Side Projects</h2>
        <div className="space-y-3">
          {sideProjects.map((proj) => (
            <div key={proj.title} className="rounded-lg border border-[var(--color-border)] p-4">
              <h3 className="text-sm font-semibold">{proj.title}</h3>
              <p className="font-mono text-xs text-[var(--color-muted)] mt-0.5">{proj.stack}</p>
              <p className="text-sm text-[var(--color-muted)] mt-1">{proj.description}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
