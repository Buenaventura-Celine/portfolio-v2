import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Celine Joie Buenaventura — Software Engineer";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          background: "#fafafa",
          padding: "80px 96px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Accent bar on the left */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "8px",
            height: "100%",
            background: "#2b9fe0",
          }}
        />

        {/* Accent dot decoration */}
        <div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            background: "#2b9fe0",
            marginBottom: "32px",
            display: "flex",
          }}
        />

        {/* Name */}
        <div
          style={{
            fontSize: "72px",
            fontWeight: 700,
            color: "#1a1a1a",
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            marginBottom: "20px",
          }}
        >
          Celine Joie Buenaventura
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "30px",
            fontWeight: 400,
            color: "#4c4c46",
            letterSpacing: "-0.01em",
          }}
        >
          Software Engineer · San Pedro, Laguna 🇵🇭
        </div>

        {/* Bottom accent line */}
        <div
          style={{
            position: "absolute",
            bottom: "56px",
            left: "96px",
            right: "96px",
            height: "2px",
            background: "#e5e5e2",
            display: "flex",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
