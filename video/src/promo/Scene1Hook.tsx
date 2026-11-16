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
  SPRING_KINETIC,
  SPRING_SNAPPY,
} from "./DarkGlassStreaksBg";

export type Scene1HookProps = {
  eyebrow?: string;
  line1?: string;
  line2?: string;
  subcopy?: string;
};

const PREVIEW_PORTRAITS = [
  { name: "Christie D.", src: "images/Chriatie.jpg", accent: "#3B82F6" },
  { name: "Dr. Adamu U.", src: "images/jtf-36.jpg", accent: "#3B82F6" },
  { name: "Prof. Goselle", src: "images/Gosale.jpg", accent: "#3B82F6" },
  { name: "Nnamdi Ibe", src: "images/nnamdi.jpg", accent: "#10B981" },
  { name: "Moses Amama", src: "images/Mo.jpg", accent: "#10B981" },
  { name: "David Enyi", src: "images/dav.jpg", accent: "#6366F1" },
];

export const Scene1Hook: React.FC<Scene1HookProps> = ({
  eyebrow = "JOS TECHFEST 2026 · 1 FULL DAY",
  line1 = "AI for",
  line2 = "every sector.",
  subcopy = "4 signature sessions. 15 industry speakers. 3 stage anchors. One unforgettable day at Sarau Event Center, Jos.",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const wordsLine1 = line1.split(" ");
  const wordsLine2 = line2.split(" ");

  // Natural spring camera push-in (scale: 1 -> 1.04)
  const cameraSpring = spring({
    frame,
    fps,
    config: SPRING_CAMERA,
    durationInFrames: 180,
  });
  const cameraScale = interpolate(cameraSpring, [0, 1], [1, 1.04]);

  // Exit transition spring (frames 155 -> 180)
  const exitProgress = spring({
    frame: Math.max(0, frame - 154),
    fps,
    config: SPRING_SNAPPY,
  });
  const sceneOpacity = interpolate(exitProgress, [0, 1], [1, 0]);
  const sceneTranslateY = interpolate(exitProgress, [0, 1], [0, -48]);

  // Top badge spring
  const badgeSpring = spring({
    frame: Math.max(0, frame - 4),
    fps,
    config: SPRING_SNAPPY,
  });

  // Subtitle + bottom card spring
  const subSpring = spring({
    frame: Math.max(0, frame - 36),
    fps,
    config: SPRING_KINETIC,
  });

  const cardSpring = spring({
    frame: Math.max(0, frame - 48),
    fps,
    config: SPRING_SNAPPY,
  });

  return (
    <AbsoluteFill
      style={{
        paddingTop: 155,
        paddingBottom: 155,
        paddingLeft: 80,
        paddingRight: 80,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        opacity: sceneOpacity,
        transform: `translateY(${sceneTranslateY}px) scale(${cameraScale})`,
        fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Safe Top Row: Logo + Live Pill */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          opacity: interpolate(badgeSpring, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(badgeSpring, [0, 1], [28, 0])}px)`,
        }}
      >
        <Img
          src={staticFile("logo.png")}
          style={{
            height: 62,
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
            backgroundColor: "rgba(16, 185, 129, 0.14)",
            border: "1px solid rgba(52, 211, 153, 0.45)",
            boxShadow: "0 12px 32px rgba(0, 0, 0, 0.45)",
          }}
        >
          <span
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              backgroundColor: "#10B981",
              boxShadow: "0 0 16px #10B981",
            }}
          />
          <span
            style={{
              fontSize: 26,
              fontWeight: 800,
              color: "#FAFAFA",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            26 NOV 2026 · JOS
          </span>
        </div>
      </div>

      {/* Center Kinetic Word-by-Word Typography Reveal */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 32,
        }}
      >
        <div
          style={{
            alignSelf: "flex-start",
            padding: "12px 26px",
            borderRadius: 999,
            backgroundColor: "rgba(59, 130, 246, 0.14)",
            border: "1px solid rgba(59, 130, 246, 0.45)",
            fontSize: 28,
            fontWeight: 700,
            color: "#60A5FA",
            letterSpacing: "0.04em",
            opacity: interpolate(badgeSpring, [0, 1], [0, 1]),
          }}
        >
          {eyebrow}
        </div>

        {/* Line 1 */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            columnGap: 24,
            rowGap: 8,
          }}
        >
          {wordsLine1.map((word, index) => {
            const wordSpring = spring({
              frame: Math.max(0, frame - (8 + index * 5)),
              fps,
              config: SPRING_KINETIC,
            });
            const wordY = interpolate(wordSpring, [0, 1], [72, 0]);
            const wordOpacity = interpolate(wordSpring, [0, 0.6, 1], [0, 1, 1]);
            const wordScale = interpolate(wordSpring, [0, 1], [0.88, 1]);

            return (
              <span
                key={`${word}-${index}`}
                style={{
                  display: "inline-block",
                  fontSize: 96,
                  fontWeight: 900,
                  lineHeight: 1.02,
                  letterSpacing: "-0.04em",
                  color: "#FAFAFA",
                  opacity: wordOpacity,
                  transform: `translateY(${wordY}px) scale(${wordScale})`,
                }}
              >
                {word}
              </span>
            );
          })}
        </div>

        {/* Line 2 */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            columnGap: 24,
            rowGap: 8,
          }}
        >
          {wordsLine2.map((word, index) => {
            const wordSpring = spring({
              frame: Math.max(0, frame - (20 + index * 5)),
              fps,
              config: SPRING_KINETIC,
            });
            const wordY = interpolate(wordSpring, [0, 1], [72, 0]);
            const wordOpacity = interpolate(wordSpring, [0, 0.6, 1], [0, 1, 1]);
            const wordScale = interpolate(wordSpring, [0, 1], [0.88, 1]);

            return (
              <span
                key={`${word}-${index}`}
                style={{
                  display: "inline-block",
                  fontSize: 96,
                  fontWeight: 900,
                  lineHeight: 1.02,
                  letterSpacing: "-0.04em",
                  background:
                    "linear-gradient(135deg, #34D399 0%, #60A5FA 55%, #818CF8 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  opacity: wordOpacity,
                  transform: `translateY(${wordY}px) scale(${wordScale})`,
                }}
              >
                {word}
              </span>
            );
          })}
        </div>

        {/* Supporting Hook Copy */}
        <p
          style={{
            margin: 0,
            fontSize: 42,
            fontWeight: 600,
            lineHeight: 1.32,
            color: "#D4D4D8",
            letterSpacing: "-0.015em",
            opacity: interpolate(subSpring, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(subSpring, [0, 1], [36, 0])}px)`,
          }}
        >
          {subcopy}
        </p>
      </div>

      {/* Bottom Glassmorphic Speaker Preview Strip */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 24,
          padding: "32px 36px",
          borderRadius: 32,
          backgroundColor: "rgba(255, 255, 255, 0.04)",
          border: "1px solid rgba(255, 255, 255, 0.14)",
          boxShadow: "0 24px 64px rgba(0, 0, 0, 0.55)",
          opacity: interpolate(cardSpring, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(cardSpring, [0, 1], [48, 0])}px)`,
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
              fontSize: 26,
              fontWeight: 800,
              color: "#FAFAFA",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            HEADLINING VOICES · 500+ BUILDERS
          </span>
          <span
            style={{
              padding: "6px 18px",
              borderRadius: 999,
              backgroundColor: "rgba(16, 185, 129, 0.18)",
              border: "1px solid rgba(52, 211, 153, 0.45)",
              fontSize: 24,
              fontWeight: 800,
              color: "#34D399",
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
          {PREVIEW_PORTRAITS.map((sp, idx) => {
            const avatarSpring = spring({
              frame: Math.max(0, frame - (54 + idx * 4)),
              fps,
              config: SPRING_SNAPPY,
            });
            return (
              <div
                key={sp.name}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 10,
                  transform: `scale(${interpolate(avatarSpring, [0, 1], [0.7, 1])})`,
                  opacity: interpolate(avatarSpring, [0, 1], [0, 1]),
                }}
              >
                <div
                  style={{
                    width: 112,
                    height: 112,
                    borderRadius: 24,
                    overflow: "hidden",
                    border: `2px solid ${sp.accent}`,
                  }}
                >
                  <Img
                    src={staticFile(sp.src)}
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
                    fontSize: 19,
                    fontWeight: 700,
                    color: "#E4E4E7",
                    textAlign: "center",
                  }}
                >
                  {sp.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

