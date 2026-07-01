import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Career",
  description: "김성재의 경력기술서 — 서비스 UI 개발 · 운영 개선 · 개발 워크플로우",
};

const careers = [
  {
    company: "11번가",
    team: "UI개발팀",
    period: "2020.12 ~ 현재",
    role: "UI 개발자",
    description:
      "국내 주요 이커머스 서비스인 11번가에서 트래픽이 집중되는 모바일웹 상품상세페이지(PDP)를 포함한 핵심 서비스 UI를 개발·운영하고 있습니다. SCSS→Dart Sass 전환(2,384개 파일), React 기반 컴포넌트 이관, Storybook 기반 UI 확인 환경, CDN 의존 CSS 내재화 등 오래 운영된 화면 구조를 안정적으로 개선하는 작업을 진행했습니다. 최근에는 PR 리뷰와 문서화처럼 반복되는 개발 흐름에 AI 보조 도구를 적용해 변경 비용과 협업 비용을 줄이는 방법도 함께 검토하고 있습니다.",
    projects: [
      { period: "2020.12 ~ 현재", title: "모바일웹 상품상세(PDP) 전체 UI 개발", link: "/tech/pdp-ui" },
      { period: "2026.01 ~ 현재", title: "React 기반 PDP 컴포넌트 개발", link: "/tech/react-pdp" },
      { period: "2025.06 ~ 2025.07", title: "Dart Sass 마이그레이션 — 2,384개 파일, 3주 완료", link: "/tech/dart-sass" },
      { period: "2025.11 ~ 2026.04", title: "체험단 서비스 전체 신규 구축", link: "/tech/sample-service" },
      { period: "2021.11 ~ 2022.12", title: "반응형 웹 전환 추진 및 기반 구축", link: "/tech/responsive" },
      { period: "2021.09 ~ 현재", title: "서버/인프라 관리 및 환경 업데이트", link: "/tech/infra" },
      { period: "2025.10 ~ 현재", title: "AI 보조 개발 환경 구축 — PR Review Agent 적용, 스킬·규칙 설계", link: "/tech/ai-tools" },
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
      { period: "2016.10 ~ 2017.01", title: "네이버 웨일 브라우저 공식사이트 — i-award 최우수상", link: "/tech/whale-browser" },
      { period: "2017.02 ~ 2017.03", title: "배틀그라운드 공식사이트 구축 — i-award 대상", link: "/tech/battlegrounds" },
      { period: "2018.04 ~ 2018.12", title: "PUBG 배틀그라운드 E-sports 사이트 — UI개발 총괄" },
      { period: "2017.12 ~ 2018.05", title: "블리자드 오버워치 E-sports 사이트 — UI개발 총괄" },
      { period: "2016.02 ~ 2016.12", title: "로스트아크 1차 CBT 사이트 구축 (PC/Mobile) — PL 담당" },
      { period: "2014.03 ~ 2014.09", title: "G마켓 모바일 운영 · G9 모바일 신규 구축 (eBay)" },
      { period: "2012.08 ~ 2014.02", title: "네이버 지식쇼핑 UI 개발 · 운영 전담" },
    ],
  },
];

const otherProjects = [
  { title: "LIVE 방송 운영 효율화", period: "2026.03", company: "11번가", desc: "방송 콘솔 UI 개선" },
  { title: "판매자정보 캡차 페이지", period: "2025.08~09", company: "11번가", desc: "캡차 인증 페이지 신규 개발, 반응형" },
  { title: "신한카드 긴급발송 서비스", period: "2025.05~06", company: "11번가", desc: "사내 업무협약 프로젝트 — 고객용/직원용 전체 화면 신규 개발, 반응형" },
  { title: "리뷰 작성 화면 전체 개편", period: "2025.03~06", company: "11번가", desc: "UX/UI 전면 변경, 플로팅 애니메이션, 넛징 모션" },
  { title: "패밀리플러스 서비스", period: "2024.10", company: "11번가", desc: "PDP UI, 관리자페이지, 초대 대기화면 신규 개발" },
  { title: "11키티즈 게임", period: "2024", company: "11번가", desc: "CSS/Lottie 애니메이션 기반 게임 UI" },
  { title: "기프티콘 앱 선물함 리뉴얼", period: "2022.08~09", company: "11번가", desc: "1차/2차 마크업" },
  { title: "공통 UI Component 고도화", period: "2022", company: "11번가", desc: "기존 UI 컴포넌트 확장, 디자인 시스템 구축 검토" },
  { title: "iOS/Android 크로스브라우저", period: "2021~현재", company: "11번가", desc: "iOS 15~26, Android 6~16 등 모바일 OS별 이슈 대응" },
  { title: "Live11 전시영역 개편", period: "2021", company: "11번가", desc: "LIVE/VOD 방송화면, 편성표, 채널프로필 UI 개발" },
  { title: "엠코르셋 쇼핑몰 구축", period: "2018.12~2019.06", company: "하이브랩", desc: "반응형 쇼핑몰 신규 구축, 성능 최적화 (이미지 최적화, 코드 압축)" },
  { title: "NHN Ent 기업사이트 개편", period: "2018.06~2018.11", company: "하이브랩", desc: "중국지사 웹개발팀과 협업, 커뮤니케이션 주도" },
  { title: "토스트클라우드 콘솔 개편", period: "2018.04~2018.06", company: "하이브랩", desc: "Bootstrap 기반 UI 컴포넌트 가이드 페이지 제작, 운영 병행" },
  { title: "카카오게임즈 운영", period: "2015.09~2018.12", company: "하이브랩", desc: "홈페이지·게임별 공략·이벤트 UI 전담 운영" },
  { title: "NHN AD 오픈애즈", period: "2016.03~2016.12", company: "하이브랩", desc: "빅데이터 마케팅 서비스 UI 개발 — i-award 전문정보분야 우수상" },
  { title: "킹닷컴 운영", period: "2015.01~2016.07", company: "하이브랩", desc: "캔디크러시사가 등 다수 게임 이벤트·사전예약 UI 개발" },
  { title: "잡코리아 웰던투 반응형 개편", period: "2014.09~2015.01", company: "하이브랩", desc: "PC/태블릿/모바일 단일 코드 3타입 반응형 구현" },
];

const keyDocs = [
  {
    category: "이슈 리포팅 · 장애 분석",
    items: [
      { title: "디자인 시스템 서버 간헐적 에러 분석", desc: "로드밸런서 라운드 로빈 환경에서 배포 누락으로 인한 404/403 에러 원인 진단 및 해결" },
      { title: "통합PDP 스냅샷 제거 대응 검토", desc: "기존 PDP → 통합PDP 전환 시 화면 넘침 이슈 분석 및 해결 방안 도출" },
      { title: "iOS 26 모바일 사파리 대응 검토", desc: "Liquid Glass UI 변경에 따른 PDP 영향도 분석 및 대응 방안 수립" },
      { title: "사내 이미지 레지스트리 변경 대응", desc: "CI/CD 파이프라인 내 Docker 이미지 URL 변경에 따른 전체 저장소 일괄 수정" },
      { title: "마이페이지 스크롤 불가 장애 분석", desc: "운영 장애 원인 분석, 보고, 해결 (2022)" },
      { title: "디자인 툴 SVG 다운로드 이슈 정리", desc: "SVG 내보내기 시 폰트 깨짐·도형 변형 이슈 원인 및 해결 방법 문서화" },
    ],
  },
  {
    category: "회고 · 경험 공유",
    items: [
      { title: "Dart Sass 전환 회고 (with AI)", desc: "AI 코딩 도구 활용, 2,384개 SCSS 파일을 3주 만에 전환한 대규모 마이그레이션 경험 공유", link: "/tech/dart-sass-retro" },
      { title: "AI Agent 작업 플로우 기록", desc: "기획 분석 → Plan 수립 → UI 구현 → 문서화 → PR 생성까지 AI 에이전트 실무 적용 전과정" },
      { title: "AI PR Review Agent 적용 및 운영", desc: "사내 제공 AI Agent를 8개 저장소 파이프라인에 적용 — yml 설정, 파일 필터링 규칙, On-Demand 트리거 구성", link: "/tech/pr-review-agent" },
    ],
  },
  {
    category: "성능 측정 · 기술 부채 해소",
    items: [
      { title: "PDP CLS 개선 기록", desc: "PDP 유형별 Core Web Vitals Before/After 성능 수치 기록 및 개선 사항 추적", link: "/tech/pdp-cls" },
      { title: "CDN CSS 점진적 내재화 (시리즈 7편)", desc: "외부 CDN 의존 CSS를 프로젝트 내부로 이관하는 전체 로드맵을 7편으로 문서화", link: "/tech/cdn-css-series" },
    ],
  },
  {
    category: "개선 제안 · 기술 검토",
    items: [
      { title: "PDP 개발 효율화 제안", desc: "HTML→React 이중 작업을 Storybook 단일 환경으로 통합하는 개선 방안" },
      { title: "PDP Pilot 계획서", desc: "SR 접수→기획 분석→구현→PR까지 AI 기반 PDP 업무 자동화 도구 제안" },
      { title: "SCSS 빌드/배포 프로세스 개선", desc: "컴파일 산출물 gitignore 처리로 머지 충돌 해소 + PR AI 리뷰 도입 환경 조성" },
      { title: "코드 품질 관리 강화 방안", desc: "정적 분석 도구, 린트 도구, 코드 품질 모니터링 플랫폼 비교 검토" },
      { title: "모노레포 구조 검토 및 전환", desc: "10개+ 분산 저장소를 모노레포로 통합하는 방안 검토", link: "/tech/monorepo-review" },
      { title: "반응형 font 대응 검토", desc: "px/em/rem 단위 전환 함수 비교, 뷰포트 기반 유동적 타이포그래피 가이드" },
      { title: "마이페이지 반응형 검토", desc: "모바일/PC UX 일원화를 위한 부분 반응형 적용 방안 기술 검토" },
      { title: "디자인 시스템 요구사항 정리", desc: "UI 컴포넌트 라이브러리화 검토, 디자인 시스템 전환을 위한 요구사항 정리" },
    ],
  },
];

const sideProjects = [
  { title: "개인 서비스 구축·운영", stack: "Next.js · Supabase · Vercel · API Webhook", description: "작은 커머스/콘텐츠 서비스를 직접 만들고 배포하며 기획, 구현, 운영 피드백까지 경험하고 있습니다." },
  { title: "콘텐츠 자동화 파이프라인", stack: "Node.js · Google Apps Script · Gemini · GitHub", description: "키워드 수집, 콘텐츠 초안 생성, 블로그 PR 생성까지 이어지는 자동화 흐름을 운영하고 있습니다." },
  { title: "AI 보조 개발 환경 실험", stack: "Claude Code · Codex · Obsidian RAG", description: "개인 지식 문서와 개발 도구를 연결해 문서 검색, 작업 정리, 코드 변경 보조 흐름을 실험하고 있습니다." },
];

export default function CareerPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">

      {/* Heading */}
      <div className="mb-12">
        <p className="font-mono text-xs text-[var(--color-muted)] mb-2">경력기술서</p>
        <h1 className="text-2xl font-bold tracking-tight">김성재</h1>
        <p className="mt-2 text-sm text-[var(--color-muted)]">
          서비스 UI 개발 · 운영 개선 · 개발 워크플로우
        </p>
      </div>

      {/* 소개 */}
      <section className="mb-12">
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-[var(--color-muted)]">About</h2>
        <div className="space-y-3 text-sm text-[var(--color-muted)] leading-relaxed">
          <p>커머스, 게임, 플랫폼 서비스에서 13년 이상 UI 개발과 운영을 해왔습니다. 오래 운영되는 웹·모바일 서비스에서 화면 구조를 정리하고, 레거시 UI를 개선하며, 여러 사람이 같은 기준으로 작업할 수 있는 개발 환경을 만드는 일에 강점이 있습니다.</p>
          <p>현재는 11번가에서 모바일웹 상품상세(PDP)를 포함한 핵심 서비스 UI를 담당하고 있습니다. HTML/SCSS 기반 화면 구조를 React + TypeScript 기반 컴포넌트 구조로 옮기는 작업에 참여하고 있으며, Dart Sass 전환, Storybook 기반 UI 확인 환경, CDN 의존 CSS 내재화처럼 운영 중인 화면의 유지보수성을 높이는 일을 진행했습니다.</p>
          <p>하이브랩에서는 약 3년간 팀장으로 업무 분배, 공수 산정, 클라이언트 커뮤니케이션, 팀원 온보딩과 품질 관리를 담당했습니다. 최근에는 PR 리뷰, 문서화, QA 체크리스트처럼 반복되는 개발 흐름에 AI 보조 도구를 적용해 리뷰 품질과 개발 속도를 높이는 방법도 함께 검토하고 있습니다.</p>
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
                  <li key={proj.title} className="flex flex-col sm:flex-row sm:gap-3 gap-0.5 text-xs">
                    <span className="font-mono text-[var(--color-muted)] shrink-0 sm:w-28">{proj.period}</span>
                    {"link" in proj && proj.link ? (
                      <Link href={proj.link} className="text-[var(--color-foreground)] underline underline-offset-2 decoration-[var(--color-border)] hover:decoration-[var(--color-foreground)]">{proj.title}</Link>
                    ) : (
                      <span className="text-[var(--color-foreground)]">{proj.title}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 기타 프로젝트 */}
      <section className="mb-12">
        <h2 className="mb-6 text-xs font-semibold uppercase tracking-widest text-[var(--color-muted)]">Other Projects</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-xs border-collapse">
            <thead>
              <tr className="border-b border-[var(--color-border)]">
                <th className="py-2 pr-4 text-left font-semibold text-[var(--color-foreground)] w-40">프로젝트</th>
                <th className="py-2 pr-4 text-left font-mono font-normal text-[var(--color-muted)] w-28">기간</th>
                <th className="py-2 pr-4 text-left font-semibold text-[var(--color-foreground)] w-16">소속</th>
                <th className="py-2 text-left font-semibold text-[var(--color-foreground)]">내용</th>
              </tr>
            </thead>
            <tbody>
              {otherProjects.map((p) => (
                <tr key={p.title + p.period} className="border-b border-[var(--color-border)] last:border-0">
                  <td className="py-2.5 pr-4 font-medium text-[var(--color-foreground)]">{p.title}</td>
                  <td className="py-2.5 pr-4 font-mono text-[var(--color-muted)]">{p.period}</td>
                  <td className="py-2.5 pr-4 text-[var(--color-muted)]">{p.company}</td>
                  <td className="py-2.5 text-[var(--color-muted)] leading-relaxed">{p.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 주요 문서 */}
      <section className="mb-12">
        <h2 className="mb-2 text-xs font-semibold uppercase tracking-widest text-[var(--color-muted)]">Key Documents</h2>
        <p className="mb-6 text-xs text-[var(--color-muted)]">
          문제 해결, 기술 검토, 경험 공유를 목적으로 직접 작성한 핵심 문서입니다. Confluence 위키에 <strong className="text-[var(--color-foreground)]">70여 건</strong>을 작성했으며, 그 중 주요 문서를 정리했습니다.
        </p>
        <div className="space-y-8">
          {keyDocs.map((group) => (
            <div key={group.category}>
              <h3 className="mb-3 text-xs font-semibold text-[var(--color-foreground)] border-l-2 border-[var(--color-foreground)] pl-3">{group.category}</h3>
              <div className="space-y-0">
                {group.items.map((item) => (
                  "link" in item && item.link ? (
                    <Link
                      key={item.title}
                      href={item.link}
                      className="group flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 py-2.5 -mx-2 px-2 rounded-md hover:bg-[var(--color-accent)] transition-all border-b border-[var(--color-border)] last:border-0 text-xs"
                    >
                      <span className="font-medium text-[var(--color-foreground)] w-full sm:w-[192px] sm:shrink-0 flex items-center gap-1.5">
                        {item.title}
                        <ArrowRight className="w-3 h-3 shrink-0 text-[var(--color-muted)] group-hover:text-[var(--color-foreground)] group-hover:translate-x-0.5 transition-all duration-150" />
                      </span>
                      <span className="text-[var(--color-muted)] leading-relaxed flex-1">{item.desc}</span>
                    </Link>
                  ) : (
                    <div key={item.title} className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 py-2.5 border-b border-[var(--color-border)] last:border-0 text-xs">
                      <span className="font-medium text-[var(--color-foreground)] w-full sm:w-[192px] sm:shrink-0">{item.title}</span>
                      <span className="text-[var(--color-muted)] leading-relaxed flex-1">{item.desc}</span>
                    </div>
                  )
                ))}
              </div>
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
