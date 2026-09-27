import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Career",
  description: "김성재의 경력: 커머스, 게임, 플랫폼 서비스 UI 개발과 운영, 레거시 UI 전환",
};

const careers = [
  {
    company: "11번가",
    team: "UI개발팀",
    period: "2020.12 ~ 2026.08",
    role: "UI 개발자",
    summary: "모바일웹 상품상세(PDP)와 앱 WebView UI를 개발하고 운영했습니다. 기획, 디자인, 백엔드 담당자와 변경 범위를 조율했고, React 저장소로 스타일을 옮기는 작업에서는 기존 SCSS와 컴포넌트를 연결할 단위를 정했습니다.",
    achievements: [
      {
        title: "모바일웹 상품상세와 앱 WebView UI 개발 및 운영",
        action: "가격, 옵션, 리뷰, 배송, 프로모션 등 여러 영역이 맞물리는 상품상세 UI를 개발하고 운영했습니다. 신규 기능과 상품 유형별 변경이 미치는 범위를 기획, 디자인, 백엔드 담당자와 함께 확인했습니다.",
        impact: "iOS와 Android 기기, 브라우저별 렌더링 차이와 앱 WebView 이슈를 확인해 수정했습니다. 운영 문제가 발생했을 때는 서버 접근 권한을 받아 상태를 확인하고 배포 검증 환경도 함께 점검했습니다.",
        link: "/tech/pdp-ui",
      },
      {
        title: "상품상세 스타일의 React 저장소 이관",
        action: "AI 개발 흐름을 개선하려고 별도 저장소의 운영 SCSS를 React 저장소로 옮겼습니다. 기존 운영 블록 SCSS는 공통 SCSS를 제외하고 약 108개였습니다. React 컴포넌트와 나뉘는 단위가 달라 화면 블록별로 스타일을 묶는 방식을 정했습니다.",
        impact: "대상 스타일을 모두 옮기고 신규 UI 블록 약 18개에 맞춰 연결했습니다. 컴포넌트와 스타일을 한 저장소에서 참고할 수 있게 됐고, 해당 작업은 실제 상품상세 첫 화면(ATF) 개선에 반영됐습니다.",
        link: "/tech/react-pdp",
      },
      {
        title: "Dart Sass 전환과 빌드 병렬화",
        action: "AI 보조 도구를 활용해 약 2,384개 SCSS 파일을 Dart Sass 문법으로 전환하고, 전후 CSS 산출물과 빌드 결과를 직접 확인했습니다.",
        impact: "향후 Sass 업데이트에 대응할 기반을 마련했습니다. 별도의 빌드 개선 작업에서는 직렬 실행을 병렬화해 약 24초였던 빌드 시간을 14초 내외로 줄였습니다.",
        link: "/tech/dart-sass",
      },
    ],
  },
  {
    company: "스마일게이트 알피지",
    team: "웹팀",
    period: "2019.10 ~ 2020.12",
    role: "UI 개발자",
    summary: "로스트아크 공식 사이트와 이벤트 페이지를 개발하고 운영했습니다. 매주 정기 배포를 담당하며 짧은 주기의 변경을 서비스에 반영했습니다.",
    achievements: [
      {
        title: "로스트아크 이벤트 페이지 개발과 운영",
        action: "출석체크, 룰렛, 투표형 프로모션 페이지를 구현하고 게임 정보를 API로 연동했습니다.",
        impact: "매주 정기 배포를 담당하며 일정에 맞춰 콘텐츠를 반영하고 배포 결과를 확인했습니다.",
        link: null,
      },
      {
        title: "공식사이트 콘텐츠 업데이트",
        action: "정기 콘텐츠를 업데이트하고 CSS와 이미지 리소스를 배포했습니다.",
        impact: "이벤트와 공식 사이트의 변경 사항을 짧은 운영 주기에 맞춰 관리했습니다.",
        link: null,
      },
      {
        title: "크로스브라우저 이슈 대응",
        action: "iOS와 Android 모바일 환경에서 발생하는 렌더링 차이를 확인하고 수정했습니다.",
        impact: "여러 모바일 환경에서 같은 콘텐츠와 인터랙션이 제공되도록 점검했습니다.",
        link: null,
      },
    ],
  },
  {
    company: "하이브랩",
    team: "FE개발팀",
    period: "2012.07 ~ 2019.06",
    role: "UI 개발자 → 팀장 (약 3년)",
    summary: "네이버, 블리자드, PUBG, 스마일게이트 등 여러 클라이언트의 UI 프로젝트를 수행했습니다. 약 3년간 팀장으로 업무 분배, 공수 산정, 품질 관리와 고객사 커뮤니케이션을 담당했습니다.",
    achievements: [
      {
        title: "네이버 웨일 브라우저 공식사이트 — i-award 최우수상",
        action: "브라우저 공식사이트 UI 개발 전담.",
        impact: "i-award 최우수상 수상.",
        link: "/tech/whale-browser",
      },
      {
        title: "배틀그라운드 공식사이트 구축 — i-award 대상",
        action: "PUBG 공식사이트 구축 참여.",
        impact: "i-award 대상 수상.",
        link: "/tech/battlegrounds",
      },
      {
        title: "고객사 요구사항 조율과 팀 업무 관리",
        action: "약 3년간 팀장으로 고객사의 요구사항을 확인하고 작업 범위와 일정을 조율했습니다. 공수를 산정하고 팀원에게 업무를 배분하는 일도 맡았습니다.",
        impact: "UI 개발과 함께 팀의 진행 상황과 결과물의 품질을 관리했습니다. 프로젝트에서 요구하는 범위와 일정을 고객사, 팀원과 맞추는 역할을 맡았습니다.",
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
          Frontend Engineer | Service UI | Legacy Modernization
        </p>
      </div>

      {/* 소개 */}
      <section className="mb-10 sm:mb-12">
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-[var(--color-muted)]">About</h2>
        <div className="space-y-3 text-sm text-[var(--color-muted)] leading-relaxed">
          <p>커머스, 게임, 플랫폼 서비스에서 UI를 개발하고 운영해 왔습니다. 11번가에서는 모바일웹 상품상세와 앱 WebView UI를 담당하며 다양한 상품 유형과 기기 환경에 맞춰 화면을 개선했습니다.</p>
          <p>오래 운영된 화면을 바꿀 때는 기존 구조와 다른 화면에 미칠 영향을 먼저 살폈습니다. 기획, 디자인, 백엔드 담당자와 구현할 내용과 검증할 항목을 조율하고 변경한 뒤에는 실제 화면과 배포 결과를 점검했습니다. AI 도구도 반복 작업에 활용하되 결과를 직접 검토해 적용했습니다.</p>
          <p>하이브랩에서는 UI 개발과 함께 약 3년간 팀장 역할을 맡았습니다. 고객사의 요구사항을 조율하고 공수 산정, 업무 배분, 일정과 품질을 관리했습니다.</p>
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
                <h3 className="text-sm font-semibold">{career.company} / {career.team}</h3>
                <span className="text-xs text-[var(--color-muted)]">{career.role}</span>
              </div>
              <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-4 sm:mb-5">{career.summary}</p>

              {/* Top 3 Achievements */}
              <div className="space-y-3 sm:space-y-4">
                {career.achievements.map((ach) => (
                  <div key={ach.title} className="rounded-lg border border-[var(--color-border)] p-4">
                    <div className="flex items-start justify-between gap-3">
                      <h4 className="text-sm font-semibold break-keep">{ach.title}</h4>
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
                        <span className="text-[10px] font-semibold text-[var(--color-muted)]">맡은 일과 판단</span>
                        <p className="text-xs leading-relaxed text-[var(--color-muted)] mt-0.5">{ach.action}</p>
                      </div>
                      <div>
                        <span className="text-[10px] font-semibold text-[var(--color-muted)]">적용과 확인</span>
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

      {/* Projects 링크 */}
      <section>
        <div className="mb-4 sm:mb-6 flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-muted)]">
            Projects
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
            개인 프로젝트와 AI 활용 기록
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-[var(--color-muted)]">
            직접 만든 도구와 서비스에서 구현한 범위, 확인한 결과와 아직 해결하지 못한 한계를 볼 수 있습니다.
          </p>
        </Link>
      </section>

    </div>
  );
}
