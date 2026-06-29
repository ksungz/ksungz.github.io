import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learning Space — 통합 학습 앱",
  description: "FE, AX, LLM 트랙을 하나의 공간에서 학습합니다.",
};

export default function LearningLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="learning-root">{children}</div>;
}
