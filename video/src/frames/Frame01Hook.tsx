import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";

export type Frame01HookProps = {
  eyebrow: string;
  headlineTop: string;
  headlineAccent: string;
  subheadline: string;
  dateBadge: string;
  venueBadge: string;
};

const FEATURED_PORTRAITS = [
  { name: "Engr. Christie Dasaro", track: "AI x Education", src: "images/Chriatie.jpg", color: "#60a5fa" },
  { name: "Dr. Adamu Usman", track: "AI x Education", src: "images/jtf-36.jpg", color: "#60a5fa" },
  { name: "Prof. Goselle Obed Nanjul", track: "AI x Education", src: "images/Gosale.jpg", color: "#60a5fa" },
  { name: "Mr. Nnamdi Ibe", track: "AI x Business", src: "images/nnamdi.jpg", color: "#34d399" },
  { name: "Moses Amama", track: "AI x Business", src: "images/Mo.jpg", color: "#34d399" },
  { name: "David Enyi", track: "AI x Creatives", src: "images/dav.jpg", color: "#818cf8" },
];

export const Frame01Hook: React.FC<Frame01HookProps> = ({
  eyebrow,
  headlineTop,
  headlineAccent,
  subheadline,
  dateBadge,
  venueBadge,
}) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0a1612",
        backgroundImage:
          "radial-gradient(ellipse at 50% 0%, rgba(16, 185, 129, 0.28) 0%, rgba(10, 22, 18, 0.96) 65%)",
        color: "#ffffff",
        fontFamily: "Inter, system-ui, -apple-system, sans-serif",
        paddingTop: 110,
        paddingBottom: 110,
        paddingLeft: 80,
        paddingRight: 80,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Top Safe Header: Logo + Frame Indicator */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Img
          src={staticFile("logo.png")}
          style={{
            height: 64,
            width: "auto",
            objectFit: "contain",
            filter: "brightness(0) invert(1)",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: "14px 28px",
            borderRadius: 999,
            backgroundColor: "rgba(16, 185, 129, 0.16)",
            border: "2px solid rgba(52, 211, 153, 0.45)",
            fontSize: 28,
            fontWeight: 700,
            color: "#6ee7b7",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          <span
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              backgroundColor: "#10b981",
            }}
          />
          {eyebrow}
        </div>
      </div>

      {/* Center Focal Point: 84px+ Headline + Core Hook */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 36,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignSelf: "flex-start",
            padding: "14px 30px",
            borderRadius: 999,
            backgroundColor: "rgba(255, 255, 255, 0.06)",
            border: "1px solid rgba(255, 255, 255, 0.16)",
            fontSize: 32,
            fontWeight: 600,
            color: "#d1fae5",
          }}
        >
          {dateBadge} · {venueBadge}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 92,
            fontWeight: 900,
            lineHeight: 1.04,
            letterSpacing: "-0.03em",
          }}
        >
          <span style={{ color: "#ffffff" }}>{headlineTop}</span>
          <span style={{ color: "#34d399" }}>{headlineAccent}</span>
        </div>

        <p
          style={{
            margin: 0,
            fontSize: 44,
            fontWeight: 500,
            lineHeight: 1.32,
            color: "#a7f3d0",
          }}
        >
          {subheadline}
        </p>
      </div>

      {/* Bottom Visual Anchor: 6 Confirmed Speaker Portraits + Stats */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 28,
          padding: 36,
          borderRadius: 36,
          backgroundColor: "rgba(16, 33, 26, 0.88)",
          border: "2px solid rgba(52, 211, 153, 0.28)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: 30,
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            1 Full Day · 4 Sessions · 15 Speakers
          </span>
          <span
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: "#34d399",
            }}
          >
            08:30 – 17:45 WAT
          </span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: 16,
          }}
        >
          {FEATURED_PORTRAITS.map((item) => (
            <div
              key={item.name}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 24,
                  overflow: "hidden",
                  border: `3px solid ${item.color}`,
                }}
              >
                <Img
                  src={staticFile(item.src)}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "top",
                  }}
                />
              </div>
              <span
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: "#ecfdf5",
                  textAlign: "center",
                  lineHeight: 1.15,
                }}
              >
                {item.name.split(" ").slice(-2).join(" ")}
              </span>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
