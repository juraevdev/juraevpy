import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 72,
          background: "#f6f2e9",
          color: "#1d1c1a",
          fontFamily: "serif",
          textAlign: "center",
        }}
      >
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 6, textTransform: "uppercase" }}>
          {site.name}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontSize: 92,
            lineHeight: 1.05,
            letterSpacing: -2,
          }}
        >
          <span>Backend systems,</span>
          <span style={{ display: "flex", gap: 22 }}>
            made to <span style={{ color: "#1f2d4d", fontStyle: "italic" }}>measure.</span>
          </span>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 20,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#57534c",
            fontFamily: "sans-serif",
          }}
        >
          {site.role} · {site.city}
        </div>
      </div>
    ),
    size,
  );
}
