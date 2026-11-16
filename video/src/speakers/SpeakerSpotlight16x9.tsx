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
import {
  SPRING_CAMERA,
  SPRING_CARD_3D,
  SPRING_KINETIC,
  SPRING_SNAPPY,
} from "../promo/DarkGlassStreaksBg";
import { SpeakerSpotlightItem } from "./speakerData";

export type SpeakerSpotlightProps = {
  speaker: SpeakerSpotlightItem;
};

/**
 * 8-Second (480 frames @ 60fps) 16:9 Widescreen (1920x1080) Stage Walk-On Video
 * for the Main Event LED Wall as speakers/anchors are called onto stage.
 *
 * Timeline:
 * - 0–2s (Frames 0–120): Dramatic stage reveal, volumetric track light beams,
 *   3D portrait entrance, and track badge snap.
 * - 2–6.5s (Frames 120–390): Full speaker name kinetic word-by-word reveal,
 *   session & talk title glass card, live EQ pulse bars, and shimmer sweep.
 * - 6.5–8s (Frames 390–480): Commanding stage hold (loop-friendly end frame)
 *   while the speaker walks to the podium.
 */
export const SpeakerSpotlight16x9: React.FC<SpeakerSpotlightProps> = ({
  speaker,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const nameWords = speaker.name.split(" ");

  // Organic camera push-in across 8 seconds
  const cameraSpring = spring({
    frame,
    fps,
    config: SPRING_CAMERA,
    durationInFrames: 480,
  });
  const cameraScale = interpolate(cameraSpring, [0, 1], [0.98, 1.02]);

  // Background volumetric light beam drift
  const beamSpring = spring({
    frame,
    fps,
    config: { mass: 3.0, stiffness: 24, damping: 26 },
    durationInFrames: 480,
  });
  const beamTranslateX = interpolate(beamSpring, [0, 1], [-180, 180]);
  const beamRotate = interpolate(beamSpring, [0, 1], [-22, -14]);

  // Top bar & badge spring (Frames 0–45)
  const topBarSpring = spring({
    frame: Math.max(0, frame - 4),
    fps,
    config: SPRING_SNAPPY,
  });

  // 3D Hero Portrait Card Entrance (Frames 8–90)
  const portraitSpring = spring({
    frame: Math.max(0, frame - 8),
    fps,
    config: SPRING_CARD_3D,
  });
  const portraitRotateY = interpolate(portraitSpring, [0, 1], [22, 4]);
  const portraitRotateX = interpolate(portraitSpring, [0, 1], [10, 0]);
  const portraitScale = interpolate(portraitSpring, [0, 1], [0.84, 1]);
  const portraitOpacity = interpolate(portraitSpring, [0, 0.5, 1], [0, 1, 1]);

  // Portrait inner image subtle zoom
  const imageZoom = interpolate(cameraSpring, [0, 1], [1.08, 1.0]);

  // Role & Track Pill Entrance
  const roleSpring = spring({
    frame: Math.max(0, frame - 18),
    fps,
    config: SPRING_SNAPPY,
  });

  // Session & Talk Glass Card Entrance
  const talkCardSpring = spring({
    frame: Math.max(0, frame - 46),
    fps,
    config: SPRING_CARD_3D,
  });

  // Bottom Stage Bar Entrance
  const footerSpring = spring({
    frame: Math.max(0, frame - 64),
    fps,
    config: SPRING_SNAPPY,
  });

  // Specular shimmer sweep across the talk card & badge around 2.5s (Frame 150)
  const shimmerSpring = spring({
    frame: Math.max(0, frame - 140),
    fps,
    config: { mass: 1.5, stiffness: 80, damping: 24 },
  });
  const shimmerX = interpolate(shimmerSpring, [0, 1], [-400, 1100]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#09090B",
        overflow: "hidden",
        fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
        color: "#FAFAFA",
      }}
    >
      {/* 1. Ambient Track-Colored Stage Background + 3D Volumetric Beams */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 28% 50%, ${speaker.glowRgba} 0%, rgba(9, 9, 11, 0.96) 65%)`,
        }}
      />

      <AbsoluteFill style={{ opacity: 0.32 }}>
        {/* Primary Diagonal Stage Light Beam */}
        <div
          style={{
            position: "absolute",
            top: -120,
            left: 160 + beamTranslateX,
            width: 1400,
            height: 440,
            borderRadius: 999,
            background: `linear-gradient(90deg, transparent 0%, ${speaker.primaryColor} 40%, ${speaker.secondaryColor} 70%, transparent 100%)`,
            filter: "blur(84px)",
            transform: `perspective(1200px) rotateZ(${beamRotate}deg)`,
          }}
        />
        {/* Secondary Emerald Stage Glow Bottom Right */}
        <div
          style={{
            position: "absolute",
            bottom: -140,
            right: -80,
            width: 900,
            height: 460,
            borderRadius: 999,
            background:
              "radial-gradient(circle, rgba(16, 185, 129, 0.55) 0%, transparent 70%)",
            filter: "blur(90px)",
          }}
        />
        {/* Stage LED Matrix Grid */}
        <AbsoluteFill
          style={{
            backgroundImage:
              "linear-gradient(rgba(250, 250, 250, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(250, 250, 250, 0.05) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </AbsoluteFill>

      {/* Giant Kinetic Watermark Typography in Background */}
      <div
        style={{
          position: "absolute",
          bottom: 90,
          right: -40,
          fontSize: 210,
          fontWeight: 900,
          letterSpacing: "-0.05em",
          color: "rgba(255, 255, 255, 0.025)",
          whiteSpace: "nowrap",
          userSelect: "none",
          transform: `translateX(${interpolate(beamSpring, [0, 1], [60, -60])}px)`,
        }}
      >
        AI FOR EVERY SECTOR
      </div>

      {/* 2. Main Stage Canvas (Safe Zone: 72px vertical, 96px horizontal) */}
      <AbsoluteFill
        style={{
          paddingTop: 68,
          paddingBottom: 68,
          paddingLeft: 96,
          paddingRight: 96,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          transform: `scale(${cameraScale})`,
        }}
      >
        {/* Top LED Header Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            opacity: interpolate(topBarSpring, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(topBarSpring, [0, 1], [-28, 0])}px)`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <Img
              src={staticFile("logo.png")}
              style={{
                height: 54,
                width: "auto",
                objectFit: "contain",
                filter: "brightness(0) invert(1)",
              }}
            />
            <div
              style={{
                width: 2,
                height: 36,
                backgroundColor: "rgba(255, 255, 255, 0.18)",
              }}
            />
            <span
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: "#34D399",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              AI FOR EVERY SECTOR · 26 NOV 2026
            </span>
          </div>

          {/* Live Stage Status Pill */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "12px 26px",
              borderRadius: 999,
              backgroundColor: speaker.badgeBgRgba,
              border: `1.5px solid ${speaker.borderRgba}`,
              boxShadow: `0 12px 36px rgba(0, 0, 0, 0.45)`,
            }}
          >
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: 999,
                backgroundColor: speaker.secondaryColor,
                boxShadow: `0 0 14px ${speaker.secondaryColor}`,
              }}
            />
            <span
              style={{
                fontSize: 21,
                fontWeight: 800,
                color: "#FAFAFA",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              {speaker.badgeLabel}
            </span>
          </div>
        </div>

        {/* Center Main Stage Split: Left 3D Portrait + Right Speaker Info */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 76,
            flex: 1,
            marginTop: 28,
            marginBottom: 28,
          }}
        >
          {/* Left Column: 3D Perspective Speaker Portrait Card */}
          <div
            style={{
              position: "relative",
              width: 540,
              height: 700,
              flexShrink: 0,
              opacity: portraitOpacity,
              transform: `perspective(1600px) rotateY(${portraitRotateY}deg) rotateX(${portraitRotateX}deg) scale(${portraitScale})`,
            }}
          >
            {/* Outer Glow Aura */}
            <div
              style={{
                position: "absolute",
                inset: -16,
                borderRadius: 44,
                background: `radial-gradient(circle at 50% 40%, ${speaker.glowRgba} 0%, transparent 72%)`,
                filter: "blur(24px)",
              }}
            />

            {/* Portrait Glass Frame */}
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                borderRadius: 36,
                padding: 10,
                backgroundColor: "rgba(255, 255, 255, 0.06)",
                border: `2px solid ${speaker.borderRgba}`,
                boxShadow:
                  "0 32px 80px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.25)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  borderRadius: 28,
                  overflow: "hidden",
                  backgroundColor: "#10211A",
                }}
              >
                <Img
                  src={staticFile(speaker.image)}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "top center",
                    transform: `scale(${imageZoom})`,
                  }}
                />

                {/* Bottom Gradient Vignette for Live Stage Badge */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(9, 9, 11, 0.92) 0%, rgba(9, 9, 11, 0.2) 38%, transparent 100%)",
                  }}
                />

                {/* Live Stage Equalizer + Tag at Bottom of Portrait */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 22,
                    left: 24,
                    right: 24,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 20px",
                    borderRadius: 20,
                    backgroundColor: "rgba(9, 9, 11, 0.78)",
                    border: `1px solid ${speaker.borderRgba}`,
                  }}
                >
                  <span
                    style={{
                      fontSize: 18,
                      fontWeight: 800,
                      color: speaker.secondaryColor,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    {speaker.sessionNumber === "HOST"
                      ? "LIVE ON STAGE · HOST"
                      : `TRACK ${speaker.sessionNumber} · SPEAKER`}
                  </span>

                  {/* Animated Stage EQ Bars */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-end",
                      gap: 5,
                      height: 22,
                    }}
                  >
                    {[0, 1, 2, 3, 4].map((barIdx) => {
                      const wave = Math.sin((frame + barIdx * 14) * 0.18);
                      const barHeight = interpolate(wave, [-1, 1], [6, 22]);
                      return (
                        <div
                          key={barIdx}
                          style={{
                            width: 4,
                            height: barHeight,
                            borderRadius: 99,
                            backgroundColor: speaker.secondaryColor,
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Kinetic Speaker Name + Session & Talk Card */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 28,
              flex: 1,
            }}
          >
            {/* Role Pill */}
            <div
              style={{
                alignSelf: "flex-start",
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 24px",
                borderRadius: 999,
                backgroundColor: "rgba(255, 255, 255, 0.06)",
                border: "1px solid rgba(255, 255, 255, 0.16)",
                opacity: interpolate(roleSpring, [0, 1], [0, 1]),
                transform: `translateY(${interpolate(roleSpring, [0, 1], [24, 0])}px)`,
              }}
            >
              <span
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: speaker.secondaryColor,
                  letterSpacing: "0.04em",
                }}
              >
                {speaker.role}
              </span>
            </div>

            {/* Speaker Full Name (Kinetic Word-by-Word Reveal) */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                columnGap: 22,
                rowGap: 6,
              }}
            >
              {nameWords.map((word, idx) => {
                const wordSpring = spring({
                  frame: Math.max(0, frame - (22 + idx * 6)),
                  fps,
                  config: SPRING_KINETIC,
                });
                const wordY = interpolate(wordSpring, [0, 1], [56, 0]);
                const wordScale = interpolate(wordSpring, [0, 1], [0.9, 1]);
                const wordOpacity = interpolate(wordSpring, [0, 0.6, 1], [0, 1, 1]);

                const isLastWord = idx === nameWords.length - 1;

                return (
                  <span
                    key={`${word}-${idx}`}
                    style={{
                      display: "inline-block",
                      fontSize: 88,
                      fontWeight: 900,
                      lineHeight: 1.04,
                      letterSpacing: "-0.035em",
                      color: isLastWord ? speaker.secondaryColor : "#FAFAFA",
                      opacity: wordOpacity,
                      transform: `translateY(${wordY}px) scale(${wordScale})`,
                    }}
                  >
                    {word}
                  </span>
                );
              })}
            </div>

            {/* Session & Talk Title Glassmorphic Card */}
            <div
              style={{
                position: "relative",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                gap: 18,
                padding: "32px 38px",
                borderRadius: 32,
                backgroundColor: "rgba(255, 255, 255, 0.045)",
                border: `1.5px solid ${speaker.borderRgba}`,
                boxShadow:
                  "0 24px 64px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.16)",
                opacity: interpolate(talkCardSpring, [0, 1], [0, 1]),
                transform: `translateY(${interpolate(talkCardSpring, [0, 1], [40, 0])}px)`,
              }}
            >
              {/* Specular Shimmer Sweep */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: shimmerX,
                  width: 220,
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.18) 50%, transparent 100%)",
                  transform: "skewX(-24deg)",
                }}
              />

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{
                    padding: "6px 18px",
                    borderRadius: 999,
                    backgroundColor: speaker.badgeBgRgba,
                    border: `1px solid ${speaker.borderRgba}`,
                    fontSize: 21,
                    fontWeight: 800,
                    color: speaker.secondaryColor,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  {speaker.trackTitle}
                </span>
                <span
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    color: "#D4D4D8",
                  }}
                >
                  {speaker.timeSlot}
                </span>
              </div>

              <p
                style={{
                  margin: 0,
                  fontSize: 38,
                  fontWeight: 800,
                  lineHeight: 1.24,
                  color: "#FAFAFA",
                  letterSpacing: "-0.02em",
                }}
              >
                “{speaker.talkTitle}”
              </p>
            </div>

            {/* Venue & Event Tagline Strip */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: 8,
                opacity: interpolate(footerSpring, [0, 1], [0, 1]),
                transform: `translateY(${interpolate(footerSpring, [0, 1], [24, 0])}px)`,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                <span
                  style={{
                    fontSize: 24,
                    fontWeight: 700,
                    color: "#A1A1AA",
                  }}
                >
                  Sarau Event Center, Jos
                </span>
                <span style={{ color: "#52525B", fontSize: 24 }}>•</span>
                <span
                  style={{
                    fontSize: 24,
                    fontWeight: 800,
                    color: "#34D399",
                  }}
                >
                  register.techfest.com.ng
                </span>
              </div>

              <span
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  color: "#FAFAFA",
                  letterSpacing: "0.06em",
                }}
              >
                #JosTechFest
              </span>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

