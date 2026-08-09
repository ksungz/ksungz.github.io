import { ImageResponse } from "next/og";

export const alt = "김성재 Frontend Engineer 포트폴리오";
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
          김성재 · Frontend Engineer
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
            <div style={{ display: "flex" }}>서비스의 UI를 안정적으로 운영하고</div>
            <div style={{ display: "flex" }}>개발과 검증 과정을 개선합니다.</div>
          </div>
          <div
            style={{
              color: "#555555",
              display: "flex",
              fontSize: 28,
            }}
          >
            Service UI · Legacy Modernization · AI-assisted Development
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
