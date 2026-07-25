import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Career",
  description: "김성재의 경력 — 커머스·게임·플랫폼 UI 개발에서 AX Engineer로 전환",
};

const careers = [
  {
    company: "11번가",
    team: "UI개발팀",
    period: "2020.12 ~ 현재",
    role: "UI 개발자",
    summary: "모바일웹 상품상세(PDP)를 포함한 핵심 서비스 UI 운영. 기존 HTML/SCSS 구조를 React 환경으로 전환하고, AI 도구를 도입해 반복 작업을 자동화.",
    achievements: [
      {
        title: "Dart Sass 마이그레이션 — 2,384개 파일, 3주 완료",
        action: "AI 코딩 도구(Cursor, Claude)로 패턴별 변환 스크립트를 만들고, 폴더 단위로 나눠 적용. 변환 전후 CSS 산출물 비교로 운영 영향 최소화.",
        impact: "빌드 오류 없이 운영 반영. 이후 다른 저장소에도 동일 방식 적용해 SCSS 환경 통일.",
        link: "/engineering/dart-sass",
      },
      {
        title: "AI PR Review Agent — 8개 저장소 적용",
        action: "사내 제공 AI Agent를 파이프라인에 연결. SCSS/HTML 중심 파일 필터링, 접근성·BEM·SCSS 컨벤션 리뷰 기준 정리.",
        impact: "반복 컨벤션 확인 자동화. 리뷰 단계에서 설계·영향 범위 검토에 집중 가능.",
        link: "/engineering/pr-review-agent",
      },
      {
        title: "React 기반 PDP 컴포넌트 전환 및 CSS 내재화",
        action: "HTML/SCSS 산출물을 React 컴포넌트+CSS Modules로 이관. CDN 의존 CSS를 프로젝트 내부로 단계적 내재화(7편 시리즈). Storybook 기반 확인 환경 구축.",
        impact: "화면 코드와 스타일 변경 맥락을 하나의 저장소에서 관리. 신규 작업자 온보딩 기준 정리.",
        link: "/engineering/react-pdp",
      },
    ],
  },
  {
    company: "스마일게이트 알피지",
    team: "웹팀",
    period: "2019.10 ~ 2020.12",
    role: "UI 개발자",
    summary: "로스트아크 공식 사이트 및 이벤트 페이지 구축·운영. 매주 정기배포를 담당하며 고빈도 운영 경험 축적.",
    achievements: [
      {
        title: "로스트아크 이벤트 페이지 구축·운영",
        action: "출석체크, 룰렛, 투표형 인터랙티브 프로모션 페이지 구축. API 연동 기반 동적 콘텐츠 구현.",
        impact: "매주 정기배포 전담. 게임 서비스 특성에 맞춘 빠른 운영 대응 체계 구축.",
        link: null,
      },
      {
        title: "공식사이트 콘텐츠 업데이트",
        action: "정기 콘텐츠 업데이트, CSS/이미지 배포, 게임정보 API 연동.",
        impact: "서비스 안정성 유지. 고빈도 배포 경험 축적.",
        link: null,
      },
      {
        title: "크로스브라우저 이슈 대응",
        action: "iOS/Android 모바일 환경별 렌더링 차이 대응.",
        impact: "모바일 웹 크로스브라우저 대응 역량 확보.",
        link: null,
      },
    ],
  },
  {
    company: "하이브랩",
    team: "FE개발팀",
    period: "2012.07 ~ 2019.06",
    role: "UI 개발자 → 팀장 (약 3년)",
    summary: "네이버, 블리자드, PUBG, 스마일게이트 등 대형 클라이언트 UI 프로젝트 전담. 팀장으로 업무 분배, 공수 산정, 클라이언트 커뮤니케이션 총괄. i-award 3개 부문 수상.",
    achievements: [
      {
        title: "네이버 웨일 브라우저 공식사이트 — i-award 최우수상",
        action: "브라우저 공식사이트 UI 개발 전담.",
        impact: "i-award 최우수상 수상.",
        link: "/engineering/whale-browser",
      },
      {
        title: "배틀그라운드 공식사이트 구축 — i-award 대상",
        action: "PUBG 공식사이트 구축 참여.",
        impact: "i-award 대상 수상.",
        link: "/engineering/battlegrounds",
      },
      {
        title: "팀장 역할 — 업무 분배·품질 관리·클라이언트 커뮤니케이션",
        action: "여러 프로젝트 동시 진행 시 팀원 경험 차이로 품질이 흔들리는 문제를 해결. 업무 난이도·일정 위험도 분류 후 팀원별 배분, 중간 확인 시점 설정. 반복 이슈는 공통 기준으로 정리.",
        impact: "수정이 마지막에 몰리는 일 감소. 새 팀원도 기준 이해 후 업무 진입 가능. 리더는 기준을 만드는 사람이라는 교훈.",
        link: null,
      },
    ],
  },
];

export default function CareerPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-16">

      {/* Heading */}
      <div className="mb-10 sm:mb-12">
        <p className="font-mono text-xs text-[var(--color-muted)] mb-2">Career</p>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight">김성재</h1>
        <p className="mt-2 text-sm text-[var(--color-muted)]">
          AX Engineer · 커머스·게임·플랫폼 제품 UI 운영
        </p>
      </div>

      {/* 소개 */}
      <section className="mb-10 sm:mb-12">
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-[var(--color-muted)]">About</h2>
        <div className="space-y-3 text-sm text-[var(--color-muted)] leading-relaxed">
          <p>다년간 커머스, 게임, 플랫폼 서비스에서 UI를 개발하고 운영해왔습니다. 웹 표준, 접근성, 마크업 구조화, SCSS 설계, 반응형 UI 구현을 바탕으로 서비스 화면의 구조와 유지보수성을 개선했습니다.</p>
          <p>현재는 모바일웹 상품상세(PDP)를 포함한 핵심 서비스 UI를 담당하면서, AI 도구를 도입해 반복 작업을 줄이고 제품 개발 과정으로 역할을 넓히고 있습니다. SCSS 마이그레이션, PR Review Agent, 커밋·PR·QA 체크리스트 자동화 흐름을 정리했습니다.</p>
          <p>개인적으로는 AX Doctor, News Automation, BabyPick AI, Hermes Agent를 직접 기획·구현·운영하며 AX Engineer로서의 역량을 쌓고 있습니다.</p>
        </div>
      </section>

      {/* 경력 */}
      <section className="mb-10 sm:mb-12">
        <h2 className="mb-4 sm:mb-6 text-xs font-semibold uppercase tracking-widest text-[var(--color-muted)]">Experience</h2>
        <div className="space-y-8 sm:space-y-10">
          {careers.map((career) => (
            <div key={career.company} className="border-l border-[var(--color-border)] pl-4 sm:pl-5">
              <div className="flex flex-col gap-0.5 mb-3">
                <span className="font-mono text-xs text-[var(--color-muted)]">{career.period}</span>
                <h3 className="text-sm font-semibold">{career.company} · {career.team}</h3>
                <span className="text-xs text-[var(--color-muted)]">{career.role}</span>
              </div>
              <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-4 sm:mb-5">{career.summary}</p>

              {/* Top 3 Achievements */}
              <div className="space-y-3 sm:space-y-4">
                {career.achievements.map((ach) => (
                  <div key={ach.title} className="rounded-lg border border-[var(--color-border)] p-4">
                    <div className="flex items-start justify-between gap-3">
                      <h4 className="text-sm font-semibold">{ach.title}</h4>
                      {ach.link && (
                        <Link
                          href={ach.link}
                          className="shrink-0 text-xs text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors min-h-[44px] flex items-center"
                        >
                          자세히 →
                        </Link>
                      )}
                    </div>
                    <div className="mt-3 space-y-2">
                      <div>
                        <span className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-muted)]">Action</span>
                        <p className="text-xs leading-relaxed text-[var(--color-muted)] mt-0.5">{ach.action}</p>
                      </div>
                      <div>
                        <span className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-muted)]">Impact</span>
                        <p className="text-xs leading-relaxed text-[var(--color-muted)] mt-0.5">{ach.impact}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Products 링크 */}
      <section>
        <div className="mb-4 sm:mb-6 flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-muted)]">
            Products
          </h2>
          <Link href="/products" className="text-xs text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors min-h-[44px] flex items-center">
            전체 보기 →
          </Link>
        </div>
        <Link
          href="/products"
          className="group block rounded-lg border border-[var(--color-border)] p-4 sm:p-5 transition-colors hover:border-[var(--color-foreground)]"
        >
          <h3 className="text-sm font-semibold group-hover:text-[var(--color-foreground)]">
            AX Doctor, News Automation, BabyPick AI, Hermes Agent
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-[var(--color-muted)]">
            문제 정의부터 AI 활용, 구현, 배포, 운영까지 직접 만든 제품들을 확인하세요.
          </p>
        </Link>
      </section>

    </div>
  );
}