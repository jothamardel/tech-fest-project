import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { VIDEO_ANCHORS, VIDEO_SESSIONS } from "../data";

export type Frame03SpeakersProps = {
  headline: string;
  subheadline: string;
};

export const Frame03Speakers: React.FC<Frame03SpeakersProps> = ({
  headline,
  subheadline,
}) => {
  const confirmedPhotoSpeakers = VIDEO_SESSIONS.flatMap((s) =>
    s.speakers
      .filter((sp) => sp.image !== null)
      .map((sp) => ({
        ...sp,
        track: s.title,
        accentColor: s.accentColor,
      }))
  );

  const monogramSpeakers = VIDEO_SESSIONS.flatMap((s) =>
    s.speakers
      .filter((sp) => sp.image === null)
      .map((sp) => ({
        ...sp,
        track: s.title,
        accentColor: s.accentColor,
        accentBg: s.accentBg,
      }))
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0a1612",
        backgroundImage:
          "radial-gradient(ellipse at 50% 15%, rgba(16, 185, 129, 0.22) 0%, rgba(10, 22, 18, 0.98) 70%)",
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
      {/* Header */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              padding: "10px 24px",
              borderRadius: 999,
              backgroundColor: "rgba(99, 102, 241, 0.2)",
              border: "2px solid rgba(129, 140, 248, 0.45)",
              fontSize: 28,
              fontWeight: 700,
              color: "#a5b4fc",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            Official 2026 Roster
          </span>
          <Img
            src={staticFile("logo.png")}
            style={{
              height: 50,
              width: "auto",
              objectFit: "contain",
              filter: "brightness(0) invert(1)",
            }}
          />
        </div>

        <h1
          style={{
            margin: 0,
            fontSize: 84,
            fontWeight: 900,
            lineHeight: 1.04,
            letterSpacing: "-0.03em",
          }}
        >
          {headline}
        </h1>
        <p
          style={{
            margin: 0,
            fontSize: 44,
            fontWeight: 500,
            color: "#a7f3d0",
          }}
        >
          {subheadline}
        </p>
      </div>

      {/* Featured Photo Cards (6 Speakers) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 20,
        }}
      >
        {confirmedPhotoSpeakers.map((sp) => (
          <div
            key={sp.name}
            style={{
              position: "relative",
              height: 310,
              borderRadius: 28,
              overflow: "hidden",
              border: `3px solid ${sp.accentColor}`,
              backgroundColor: "#10211a",
            }}
          >
            <Img
              src={staticFile(sp.image!)}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "top",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(10, 22, 18, 0.96) 0%, rgba(10, 22, 18, 0.2) 55%, transparent 100%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 16,
                left: 18,
                right: 18,
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              <span
                style={{
                  fontSize: 20,
                  fontWeight: 800,
                  color: sp.accentColor,
                  textTransform: "uppercase",
                }}
              >
                {sp.track}
              </span>
              <span
                style={{
                  fontSize: 26,
                  fontWeight: 800,
                  color: "#ffffff",
                  lineHeight: 1.15,
                }}
              >
                {sp.name}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Remaining Session Speakers (9 Monogram Pills) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 14,
        }}
      >
        {monogramSpeakers.map((sp) => (
          <div
            key={sp.name}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "14px 16px",
              borderRadius: 22,
              backgroundColor: "rgba(16, 33, 26, 0.92)",
              border: "1px solid rgba(255, 255, 255, 0.14)",
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 999,
                backgroundColor: sp.accentBg,
                border: `2px solid ${sp.accentColor}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
                fontWeight: 800,
                color: "#ffffff",
                flexShrink: 0,
              }}
            >
              {sp.initials}
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: "#ffffff",
                  lineHeight: 1.15,
                }}
              >
                {sp.name}
              </span>
              <span
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: sp.accentColor,
                }}
              >
                {sp.track}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Event Anchors Strip (Samuel Adebayo, Judith Nyior, Anna) */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "22px 30px",
          borderRadius: 28,
          backgroundColor: "rgba(99, 102, 241, 0.14)",
          border: "2px solid rgba(129, 140, 248, 0.4)",
        }}
      >
        <span
          style={{
            fontSize: 28,
            fontWeight: 800,
            color: "#c7d2fe",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          Anchors
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {VIDEO_ANCHORS.map((anchor) => (
            <div
              key={anchor.name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              {anchor.image ? (
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 999,
                    overflow: "hidden",
                    border: "2px solid #818cf8",
                  }}
                >
                  <Img
                    src={staticFile(anchor.image)}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "top",
                    }}
                  />
                </div>
              ) : (
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 999,
                    backgroundColor: "rgba(99, 102, 241, 0.3)",
                    border: "2px solid #818cf8",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 22,
                    fontWeight: 800,
                    color: "#ffffff",
                  }}
                >
                  {anchor.initials}
                </div>
              )}
              <span
                style={{
                  fontSize: 26,
                  fontWeight: 700,
                  color: "#ffffff",
                }}
              >
                {anchor.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
