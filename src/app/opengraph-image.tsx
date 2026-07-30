import { ImageResponse } from "next/og";

export const alt = "김성재 AI Workflow & Product Engineering 포트폴리오";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "stretch",
          background: "#f7f7f4",
          color: "#171717",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          padding: "72px 80px",
          width: "100%",
        }}
      >
        <div
          style={{
            alignItems: "center",
            display: "flex",
            fontSize: 26,
            fontWeight: 600,
          }}
        >
          김성재 · AI Workflow &amp; Product Engineering
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 54,
              fontWeight: 700,
              lineHeight: 1.22,
              maxWidth: 980,
            }}
          >
            <div style={{ display: "flex" }}>현업의 반복 업무와 맥락 단절을</div>
            <div style={{ display: "flex" }}>AI Agent와 자동화로 개선합니다.</div>
          </div>
          <div
            style={{
              color: "#555555",
              display: "flex",
              fontSize: 28,
            }}
          >
            Service UI · AI Workflow · Product Engineering
          </div>
        </div>
        <div
          style={{
            alignItems: "center",
            borderTop: "2px solid #d4d4d0",
            color: "#555555",
            display: "flex",
            fontSize: 22,
            justifyContent: "space-between",
            paddingTop: 28,
          }}
        >
          <span>13 years of service UI development</span>
          <span>ksungz-github-io.vercel.app</span>
        </div>
      </div>
    ),
    size,
  );
}
