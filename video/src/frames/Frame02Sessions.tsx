import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { VIDEO_SESSIONS } from "../data";

export type Frame02SessionsProps = {
  headline: string;
  subheadline: string;
};

export const Frame02Sessions: React.FC<Frame02SessionsProps> = ({
  headline,
  subheadline,
}) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0a1612",
        backgroundImage:
          "radial-gradient(ellipse at 50% 10%, rgba(59, 130, 246, 0.2) 0%, rgba(10, 22, 18, 0.98) 70%)",
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
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              padding: "12px 26px",
              borderRadius: 999,
              backgroundColor: "rgba(16, 185, 129, 0.16)",
              border: "2px solid rgba(52, 211, 153, 0.4)",
              fontSize: 28,
              fontWeight: 700,
              color: "#34d399",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            26 Nov 2026 · Single-Day Tracks
          </span>
          <Img
            src={staticFile("logo.png")}
            style={{
              height: 52,
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
            lineHeight: 1.05,
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
            color: "#a7f3d0",
            lineHeight: 1.25,
          }}
        >
          {subheadline}
        </p>
      </div>

      {/* 4 Signature Sessions Stack */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        {VIDEO_SESSIONS.map((session) => (
          <div
            key={session.number}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 18,
              padding: "28px 34px",
              borderRadius: 32,
              backgroundColor: "rgba(16, 33, 26, 0.92)",
              border: `2px solid ${session.accentBorder}`,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                <span
                  style={{
                    padding: "8px 20px",
                    borderRadius: 999,
                    backgroundColor: session.accentBg,
                    color: session.accentColor,
                    fontSize: 26,
                    fontWeight: 800,
                  }}
                >
                  SESSION {session.number}
                </span>
                <span
                  style={{
                    fontSize: 46,
                    fontWeight: 900,
                    color: "#ffffff",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {session.title}
                </span>
              </div>
              <span
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  color: session.accentColor,
                }}
              >
                {session.time}
              </span>
            </div>

            {/* Speakers Row */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 14,
              }}
            >
              {session.speakers.map((sp) => (
                <div
                  key={sp.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "8px 18px 8px 10px",
                    borderRadius: 999,
                    backgroundColor: "rgba(10, 22, 18, 0.9)",
                    border: "1px solid rgba(255, 255, 255, 0.14)",
                  }}
                >
                  {sp.image ? (
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 999,
                        overflow: "hidden",
                        border: `2px solid ${session.accentColor}`,
                      }}
                    >
                      <Img
                        src={staticFile(sp.image)}
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
                        width: 44,
                        height: 44,
                        borderRadius: 999,
                        backgroundColor: session.accentBg,
                        border: `2px solid ${session.accentColor}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 20,
                        fontWeight: 800,
                        color: "#ffffff",
                      }}
                    >
                      {sp.initials}
                    </div>
                  )}
                  <span
                    style={{
                      fontSize: 25,
                      fontWeight: 600,
                      color: "#ecfdf5",
                    }}
                  >
                    {sp.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
