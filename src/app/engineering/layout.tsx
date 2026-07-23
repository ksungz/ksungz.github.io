import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Engineering",
  description: "Engineering 블로그 — React, CSS, AI Engineering, Automation, Context Engineering",
};

export default function EngineeringLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}