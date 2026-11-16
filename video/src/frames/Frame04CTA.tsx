import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";

export type Frame04CTAProps = {
  headline: string;
  subheadline: string;
  ctaUrl: string;
  eventDate: string;
  eventVenue: string;
  hashtag: string;
};

export const Frame04CTA: React.FC<Frame04CTAProps> = ({
  headline,
  subheadline,
  ctaUrl,
  eventDate,
  eventVenue,
  hashtag,
}) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0a1612",
        backgroundImage:
          "radial-gradient(ellipse at 50% 50%, rgba(16, 185, 129, 0.32) 0%, rgba(10, 22, 18, 0.98) 70%)",
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
      {/* Top Bar */}
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
            height: 68,
            width: "auto",
            objectFit: "contain",
            filter: "brightness(0) invert(1)",
          }}
        />
        <span
          style={{
            padding: "14px 30px",
            borderRadius: 999,
            backgroundColor: "rgba(16, 185, 129, 0.2)",
            border: "2px solid #34d399",
            fontSize: 30,
            fontWeight: 800,
            color: "#6ee7b7",
            letterSpacing: "0.06em",
          }}
        >
          {hashtag}
        </span>
      </div>

      {/* Main CTA Message */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 36,
        }}
      >
        <div
          style={{
            alignSelf: "flex-start",
            padding: "14px 30px",
            borderRadius: 999,
            backgroundColor: "rgba(251, 191, 36, 0.16)",
            border: "2px solid rgba(251, 191, 36, 0.5)",
            fontSize: 30,
            fontWeight: 800,
            color: "#fbbf24",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          Seats Filling Fast · 1-Day Pass
        </div>

        <h1
          style={{
            margin: 0,
            fontSize: 90,
            fontWeight: 900,
            lineHeight: 1.04,
            letterSpacing: "-0.03em",
            color: "#ffffff",
          }}
        >
          {headline}
        </h1>

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

        {/* Event Logistics Card */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 22,
            padding: "36px 40px",
            borderRadius: 36,
            backgroundColor: "rgba(16, 33, 26, 0.92)",
            border: "2px solid rgba(52, 211, 153, 0.35)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: 30, color: "#6ee7b7", fontWeight: 600 }}>
              DATE
            </span>
            <span style={{ fontSize: 34, color: "#ffffff", fontWeight: 800 }}>
              {eventDate}
            </span>
          </div>
          <div
            style={{
              height: 2,
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            }}
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: 30, color: "#6ee7b7", fontWeight: 600 }}>
              TIME
            </span>
            <span style={{ fontSize: 34, color: "#ffffff", fontWeight: 800 }}>
              08:30 – 17:45 WAT
            </span>
          </div>
          <div
            style={{
              height: 2,
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            }}
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: 30, color: "#6ee7b7", fontWeight: 600 }}>
              VENUE
            </span>
            <span style={{ fontSize: 34, color: "#ffffff", fontWeight: 800 }}>
              {eventVenue}
            </span>
          </div>
        </div>
      </div>

      {/* High-Contrast CTA Pill */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 18,
        }}
      >
        <div
          style={{
            width: "100%",
            padding: "36px 44px",
            borderRadius: 999,
            backgroundColor: "#10b981",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 20,
            boxShadow: "0 24px 60px rgba(16, 185, 129, 0.45)",
          }}
        >
          <span
            style={{
              fontSize: 48,
              fontWeight: 900,
              color: "#052e16",
              letterSpacing: "-0.01em",
            }}
          >
            {ctaUrl}
          </span>
        </div>
        <span
          style={{
            fontSize: 28,
            fontWeight: 600,
            color: "#a7f3d0",
          }}
        >
          AI x Education · AI x Business · AI x Creatives · Policy
        </span>
      </div>
    </AbsoluteFill>
  );
};
