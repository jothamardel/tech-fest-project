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
import { SpeakerSpotlightProps } from "./SpeakerSpotlight16x9";

/**
 * 8-Second (480 frames @ 60fps) 9:16 Vertical (1080x1920) Social Media Spotlight Video
 * for Instagram Reels, TikTok, WhatsApp Status, and Vertical LED Totems.
 * Safe Zones: 145px top/bottom, 80px left/right.
 */
export const SpeakerSpotlight9x16: React.FC<SpeakerSpotlightProps> = ({
  speaker,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const nameWords = speaker.name.split(" ");

  const cameraSpring = spring({
    frame,
    fps,
    config: SPRING_CAMERA,
    durationInFrames: 480,
  });
  const cameraScale = interpolate(cameraSpring, [0, 1], [0.985, 1.02]);

  const headerSpring = spring({
    frame: Math.max(0, frame - 4),
    fps,
    config: SPRING_SNAPPY,
  });

  const portraitSpring = spring({
    frame: Math.max(0, frame - 10),
    fps,
    config: SPRING_CARD_3D,
  });
  const portraitRotateX = interpolate(portraitSpring, [0, 1], [14, 0]);
  const portraitRotateY = interpolate(portraitSpring, [0, 1], [-12, 0]);
  const portraitScale = interpolate(portraitSpring, [0, 1], [0.85, 1]);

  const cardSpring = spring({
    frame: Math.max(0, frame - 42),
    fps,
    config: SPRING_CARD_3D,
  });

  const ctaSpring = spring({
    frame: Math.max(0, frame - 58),
    fps,
    config: SPRING_SNAPPY,
  });

  const shimmerSpring = spring({
    frame: Math.max(0, frame - 135),
    fps,
    config: { mass: 1.4, stiffness: 85, damping: 24 },
  });
  const shimmerX = interpolate(shimmerSpring, [0, 1], [-420, 980]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#09090B",
        overflow: "hidden",
        fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
        color: "#FAFAFA",
      }}
    >
      {/* Ambient Track Aura + Dark Glass Grid */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 30%, ${speaker.glowRgba} 0%, rgba(9, 9, 11, 0.97) 68%)`,
        }}
      />
      <AbsoluteFill
        style={{
          opacity: 0.24,
          backgroundImage:
            "linear-gradient(rgba(250, 250, 250, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(250, 250, 250, 0.06) 1px, transparent 1px)",
          backgroundSize: "68px 68px",
        }}
      />

      {/* Safe Zone Content (145px top/bottom, 80px left/right) */}
      <AbsoluteFill
        style={{
          paddingTop: 145,
          paddingBottom: 145,
          paddingLeft: 80,
          paddingRight: 80,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          transform: `scale(${cameraScale})`,
        }}
      >
        {/* 1. Top Header Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            opacity: interpolate(headerSpring, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(headerSpring, [0, 1], [-24, 0])}px)`,
          }}
        >
          <Img
            src={staticFile("logo.png")}
            style={{
              height: 56,
              width: "auto",
              objectFit: "contain",
              filter: "brightness(0) invert(1)",
            }}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 24px",
              borderRadius: 999,
              backgroundColor: speaker.badgeBgRgba,
              border: `1.5px solid ${speaker.borderRgba}`,
            }}
          >
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: 999,
                backgroundColor: speaker.secondaryColor,
              }}
            />
            <span
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: "#FAFAFA",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              {speaker.badgeLabel}
            </span>
          </div>
        </div>

        {/* 2. Hero Portrait Card in 3D Perspective */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: 670,
            borderRadius: 40,
            padding: 10,
            backgroundColor: "rgba(255, 255, 255, 0.06)",
            border: `2px solid ${speaker.borderRgba}`,
            boxShadow:
              "0 30px 80px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.22)",
            opacity: interpolate(portraitSpring, [0, 0.5, 1], [0, 1, 1]),
            transform: `perspective(1500px) rotateX(${portraitRotateX}deg) rotateY(${portraitRotateY}deg) scale(${portraitScale})`,
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              borderRadius: 30,
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
                transform: `scale(${interpolate(cameraSpring, [0, 1], [1.06, 1.0])})`,
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(9, 9, 11, 0.94) 0%, rgba(9, 9, 11, 0.18) 42%, transparent 100%)",
              }}
            />

            {/* Floating Bottom Bar inside Portrait */}
            <div
              style={{
                position: "absolute",
                bottom: 22,
                left: 24,
                right: 24,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 24px",
                borderRadius: 22,
                backgroundColor: "rgba(9, 9, 11, 0.82)",
                border: `1px solid ${speaker.borderRgba}`,
              }}
            >
              <span
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  color: speaker.secondaryColor,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                {speaker.role}
              </span>

              {/* Animated EQ Bars */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  gap: 6,
                  height: 24,
                }}
              >
                {[0, 1, 2, 3, 4].map((barIdx) => {
                  const wave = Math.sin((frame + barIdx * 14) * 0.18);
                  const barHeight = interpolate(wave, [-1, 1], [7, 24]);
                  return (
                    <div
                      key={barIdx}
                      style={{
                        width: 5,
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

        {/* 3. Kinetic Speaker Name + Session Talk Card */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          {/* Speaker Name */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              columnGap: 18,
              rowGap: 4,
            }}
          >
            {nameWords.map((word, idx) => {
              const wordSpring = spring({
                frame: Math.max(0, frame - (20 + idx * 5)),
                fps,
                config: SPRING_KINETIC,
              });
              const isLastWord = idx === nameWords.length - 1;
              return (
                <span
                  key={`${word}-${idx}`}
                  style={{
                    display: "inline-block",
                    fontSize: 74,
                    fontWeight: 900,
                    lineHeight: 1.03,
                    letterSpacing: "-0.035em",
                    color: isLastWord ? speaker.secondaryColor : "#FAFAFA",
                    opacity: interpolate(wordSpring, [0, 0.6, 1], [0, 1, 1]),
                    transform: `translateY(${interpolate(
                      wordSpring,
                      [0, 1],
                      [44, 0]
                    )}px)`,
                  }}
                >
                  {word}
                </span>
              );
            })}
          </div>

          {/* Session & Talk Card */}
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              gap: 14,
              padding: "26px 32px",
              borderRadius: 28,
              backgroundColor: "rgba(255, 255, 255, 0.045)",
              border: `1.5px solid ${speaker.borderRgba}`,
              opacity: interpolate(cardSpring, [0, 1], [0, 1]),
              transform: `translateY(${interpolate(cardSpring, [0, 1], [32, 0])}px)`,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: shimmerX,
                width: 200,
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)",
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
                  fontSize: 22,
                  fontWeight: 800,
                  color: speaker.secondaryColor,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
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
                fontSize: 32,
                fontWeight: 800,
                lineHeight: 1.25,
                color: "#FAFAFA",
              }}
            >
              “{speaker.talkTitle}”
            </p>
          </div>
        </div>

        {/* 4. Bottom CTA Pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "22px 32px",
            borderRadius: 999,
            background:
              "linear-gradient(135deg, rgba(16, 185, 129, 0.22) 0%, rgba(59, 130, 246, 0.22) 100%)",
            border: "1.5px solid rgba(52, 211, 153, 0.5)",
            opacity: interpolate(ctaSpring, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(ctaSpring, [0, 1], [24, 0])}px)`,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <span
              style={{
                fontSize: 20,
                fontWeight: 800,
                color: "#34D399",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              AI FOR EVERY SECTOR · 26 NOV 2026
            </span>
            <span
              style={{
                fontSize: 26,
                fontWeight: 900,
                color: "#FAFAFA",
              }}
            >
              register.techfest.com.ng
            </span>
          </div>
          <span
            style={{
              padding: "10px 22px",
              borderRadius: 999,
              backgroundColor: "#10B981",
              color: "#052E16",
              fontSize: 22,
              fontWeight: 900,
            }}
          >
            JOS 2026
          </span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

