import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { VIDEO_ANCHORS, VIDEO_SESSIONS } from "../data";
import {
  SPRING_CARD_3D,
  SPRING_SNAPPY,
} from "./DarkGlassStreaksBg";

/**
 * Scene 2 (Frames 180–660 | Duration: 480 frames | 3s–11s)
 * Showcases all 4 signature sessions + 15 speakers + 3 anchors on 3D perspective
 * glassmorphism cards with spring-driven micro-interactions:
 *  - Live progress bar fill
 *  - Toggle switch snap
 *  - Notification badge pop
 * Safe zone: 145px top/bottom padding, 80px left/right padding.
 */
export const Scene2Showcase: React.FC = () => {
  const frame = useCurrentFrame(); // 0..479 inside Sequence
  const { fps } = useVideoConfig();

  const headerSpring = spring({
    frame,
    fps,
    config: SPRING_SNAPPY,
  });

  // Exit transition (last 24 frames: 456..480)
  const exitSpring = spring({
    frame: Math.max(0, frame - 454),
    fps,
    config: SPRING_SNAPPY,
  });
  const sceneOpacity = interpolate(exitSpring, [0, 1], [1, 0]);
  const sceneScale = interpolate(exitSpring, [0, 1], [1, 0.95]);

  // Anchors bar entrance
  const anchorsSpring = spring({
    frame: Math.max(0, frame - 78),
    fps,
    config: SPRING_CARD_3D,
  });

  return (
    <AbsoluteFill
      style={{
        paddingTop: 145,
        paddingBottom: 145,
        paddingLeft: 80,
        paddingRight: 80,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        opacity: sceneOpacity,
        transform: `scale(${sceneScale})`,
        fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Top Safe Header */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          opacity: interpolate(headerSpring, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(headerSpring, [0, 1], [28, 0])}px)`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              padding: "8px 22px",
              borderRadius: 999,
              backgroundColor: "rgba(16, 185, 129, 0.15)",
              border: "1px solid rgba(52, 211, 153, 0.45)",
              fontSize: 23,
              fontWeight: 800,
              color: "#34D399",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            4 SIGNATURE SESSIONS · 15 SPEAKERS
          </span>
          <span
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: "#A1A1AA",
            }}
          >
            26 NOV 2026 · JOS
          </span>
        </div>

        <h2
          style={{
            margin: 0,
            fontSize: 64,
            fontWeight: 900,
            letterSpacing: "-0.035em",
            lineHeight: 1.06,
            color: "#FAFAFA",
          }}
        >
          One Day. Four Power Tracks.
        </h2>
      </div>

      {/* 4 Animated 3D Perspective Glassmorphism Session Cards */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        {VIDEO_SESSIONS.map((session, idx) => {
          const cardDelay = 12 + idx * 16;
          const cardSpring = spring({
            frame: Math.max(0, frame - cardDelay),
            fps,
            config: SPRING_CARD_3D,
          });

          // Micro-interaction spring (progress bar, toggle switch snap, badge pop)
          const microSpring = spring({
            frame: Math.max(0, frame - (cardDelay + 24)),
            fps,
            config: SPRING_SNAPPY,
          });

          const translateX = interpolate(
            cardSpring,
            [0, 1],
            [idx % 2 === 0 ? -90 : 90, 0]
          );
          const translateY = interpolate(cardSpring, [0, 1], [44, 0]);
          const rotateX = interpolate(cardSpring, [0, 1], [14, 0]);
          const rotateY = interpolate(
            cardSpring,
            [0, 1],
            [idx % 2 === 0 ? -10 : 10, 0]
          );
          const cardOpacity = interpolate(cardSpring, [0, 0.5, 1], [0, 1, 1]);

          return (
            <div
              key={session.number}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 14,
                padding: "22px 28px",
                borderRadius: 28,
                backgroundColor: "rgba(255, 255, 255, 0.045)",
                border: `1px solid ${session.accentBorder}`,
                boxShadow:
                  "0 20px 50px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.14)",
                opacity: cardOpacity,
                transform: `perspective(1400px) translateX(${translateX}px) translateY(${translateY}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
              }}
            >
              {/* Card Top Row: Track Title + Micro-Interaction Widget */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <span
                    style={{
                      padding: "6px 16px",
                      borderRadius: 999,
                      backgroundColor: session.accentBg,
                      border: `1px solid ${session.accentBorder}`,
                      color: session.accentColor,
                      fontSize: 22,
                      fontWeight: 800,
                      letterSpacing: "0.05em",
                    }}
                  >
                    0{idx + 1}
                  </span>
                  <span
                    style={{
                      fontSize: 32,
                      fontWeight: 900,
                      color: "#FAFAFA",
                      letterSpacing: "-0.025em",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {session.title}
                  </span>
                </div>

                {/* Micro-Interaction per card */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
                  <span
                    style={{
                      fontSize: 20,
                      fontWeight: 700,
                      color: "#D4D4D8",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {session.time}
                  </span>

                  {idx === 0 && (
                    /* Micro-interaction 1: Live Progress Bar */
                    <div
                      style={{
                        width: 96,
                        height: 12,
                        borderRadius: 999,
                        backgroundColor: "rgba(255, 255, 255, 0.12)",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: `${interpolate(microSpring, [0, 1], [12, 100])}%`,
                          height: "100%",
                          borderRadius: 999,
                          backgroundColor: session.accentColor,
                        }}
                      />
                    </div>
                  )}

                  {idx === 1 && (
                    /* Micro-interaction 2: Toggle Switch Snap */
                    <div
                      style={{
                        width: 58,
                        height: 30,
                        borderRadius: 999,
                        padding: 3,
                        backgroundColor:
                          microSpring > 0.4
                            ? "rgba(16, 185, 129, 0.35)"
                            : "rgba(255, 255, 255, 0.12)",
                        border: `1px solid ${session.accentColor}`,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          width: 22,
                          height: 22,
                          borderRadius: 999,
                          backgroundColor: session.accentColor,
                          transform: `translateX(${interpolate(
                            microSpring,
                            [0, 1],
                            [0, 28]
                          )}px)`,
                        }}
                      />
                    </div>
                  )}

                  {(idx === 2 || idx === 3) && (
                    /* Micro-interaction 3: Notification Badge Pop */
                    <div
                      style={{
                        padding: "4px 14px",
                        borderRadius: 999,
                        backgroundColor: session.accentBg,
                        border: `1px solid ${session.accentColor}`,
                        color: session.accentColor,
                        fontSize: 18,
                        fontWeight: 800,
                        whiteSpace: "nowrap",
                        transform: `scale(${interpolate(
                          microSpring,
                          [0, 1],
                          [0.5, 1]
                        )})`,
                      }}
                    >
                      {session.speakers.length} SPEAKERS
                    </div>
                  )}
                </div>
              </div>

              {/* Speakers Chips Row with Confirmed Photos & Monograms */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 10,
                }}
              >
                {session.speakers.map((sp) => (
                  <div
                    key={sp.name}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "6px 16px 6px 8px",
                      borderRadius: 999,
                      backgroundColor: "rgba(9, 9, 11, 0.78)",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                    }}
                  >
                    {sp.image ? (
                      <div
                        style={{
                          width: 38,
                          height: 38,
                          borderRadius: 999,
                          overflow: "hidden",
                          border: `2px solid ${session.accentColor}`,
                          flexShrink: 0,
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
                          width: 38,
                          height: 38,
                          borderRadius: 999,
                          backgroundColor: session.accentBg,
                          border: `2px solid ${session.accentColor}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 17,
                          fontWeight: 800,
                          color: "#FAFAFA",
                          flexShrink: 0,
                        }}
                      >
                        {sp.initials}
                      </div>
                    )}
                    <span
                      style={{
                        fontSize: 22,
                        fontWeight: 700,
                        color: "#FAFAFA",
                      }}
                    >
                      {sp.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Safe-Zone Bar: Event Anchors (Samuel Adebayo, Judith Nyior, Anna) */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "18px 26px",
          borderRadius: 24,
          backgroundColor: "rgba(99, 102, 241, 0.12)",
          border: "1px solid rgba(129, 140, 248, 0.4)",
          opacity: interpolate(anchorsSpring, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(anchorsSpring, [0, 1], [32, 0])}px)`,
        }}
      >
        <span
          style={{
            fontSize: 22,
            fontWeight: 800,
            color: "#A5B4FC",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          HOSTS & ANCHORS
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {VIDEO_ANCHORS.map((anchor) => (
            <div
              key={anchor.name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              {anchor.image ? (
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 999,
                    overflow: "hidden",
                    border: "2px solid #818CF8",
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
                    width: 40,
                    height: 40,
                    borderRadius: 999,
                    backgroundColor: "rgba(99, 102, 241, 0.3)",
                    border: "2px solid #818CF8",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 18,
                    fontWeight: 800,
                    color: "#FAFAFA",
                  }}
                >
                  {anchor.initials}
                </div>
              )}
              <span
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: "#FAFAFA",
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

