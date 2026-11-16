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
  SPRING_CARD_3D,
  SPRING_KINETIC,
  SPRING_SNAPPY,
} from "./DarkGlassStreaksBg";

/**
 * Scene 3 (Frames 660–900 | Duration: 240 frames | 11s–15s)
 * Smooth spring morph into centered Jos TechFest 2026 brand lockup,
 * high-contrast CTA pill button ("Register now at register.techfest.com.ng")
 * with a spring-driven specular shimmer sweep, and clean final hold.
 */
export type Scene3CTAProps = {
  line1?: string;
  line2?: string;
  ctaUrl?: string;
  eventDate?: string;
  eventVenue?: string;
};

export const Scene3CTA: React.FC<Scene3CTAProps> = ({
  line1 = "AI for",
  line2 = "every sector.",
  ctaUrl = "register.techfest.com.ng",
  eventDate = "26 Nov 2026 · 08:30 WAT",
  eventVenue = "Sarau Event Center, Jos",
}) => {
  const frame = useCurrentFrame(); // 0..239 inside Sequence
  const { fps } = useVideoConfig();

  const logoSpring = spring({
    frame,
    fps,
    config: SPRING_KINETIC,
  });

  const headlineSpring = spring({
    frame: Math.max(0, frame - 12),
    fps,
    config: SPRING_KINETIC,
  });

  const logisticsSpring = spring({
    frame: Math.max(0, frame - 24),
    fps,
    config: SPRING_CARD_3D,
  });

  const ctaSpring = spring({
    frame: Math.max(0, frame - 36),
    fps,
    config: SPRING_SNAPPY,
  });

  // Specular shimmer sweep across the CTA button using natural spring curve
  const shimmerSpring = spring({
    frame: Math.max(0, frame - 64),
    fps,
    config: { mass: 1.4, stiffness: 90, damping: 24 },
  });
  const shimmerX = interpolate(shimmerSpring, [0, 1], [-520, 980]);

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
        alignItems: "center",
        textAlign: "center",
        fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Centered Brand Lockup */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
          opacity: interpolate(logoSpring, [0, 1], [0, 1]),
          transform: `scale(${interpolate(logoSpring, [0, 1], [0.84, 1])}) translateY(${interpolate(
            logoSpring,
            [0, 1],
            [36, 0]
          )}px)`,
        }}
      >
        <div
          style={{
            padding: "24px 44px",
            borderRadius: 32,
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.14)",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
          }}
        >
          <Img
            src={staticFile("logo.png")}
            style={{
              height: 82,
              width: "auto",
              objectFit: "contain",
              filter: "brightness(0) invert(1)",
            }}
          />
        </div>

        <div
          style={{
            padding: "12px 28px",
            borderRadius: 999,
            backgroundColor: "rgba(16, 185, 129, 0.16)",
            border: "1px solid rgba(52, 211, 153, 0.45)",
            fontSize: 26,
            fontWeight: 800,
            color: "#34D399",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          #JosTechFest · 26 November 2026
        </div>
      </div>

      {/* Headline + Track Summary */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 28,
          opacity: interpolate(headlineSpring, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(headlineSpring, [0, 1], [44, 0])}px)`,
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: 88,
            fontWeight: 900,
            lineHeight: 1.04,
            letterSpacing: "-0.035em",
            color: "#FAFAFA",
          }}
        >
          {line1}{" "}
          <span
            style={{
              background:
                "linear-gradient(135deg, #34D399 0%, #60A5FA 55%, #818CF8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {line2}
          </span>
        </h1>

        <p
          style={{
            margin: 0,
            fontSize: 38,
            fontWeight: 600,
            color: "#D4D4D8",
            lineHeight: 1.35,
            maxWidth: 860,
          }}
        >
          AI x Education · AI x Business · AI x Creatives · Startup Ecosystem & Policy
        </p>
      </div>

      {/* Event Logistics Glass Card */}
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 20,
          padding: "32px 40px",
          borderRadius: 32,
          backgroundColor: "rgba(255, 255, 255, 0.045)",
          border: "1px solid rgba(255, 255, 255, 0.14)",
          boxShadow: "0 24px 64px rgba(0, 0, 0, 0.5)",
          opacity: interpolate(logisticsSpring, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(logisticsSpring, [0, 1], [44, 0])}px)`,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: 28, fontWeight: 700, color: "#A1A1AA" }}>
            DATE & TIME
          </span>
          <span style={{ fontSize: 32, fontWeight: 800, color: "#FAFAFA" }}>
            {eventDate}
          </span>
        </div>
        <div
          style={{
            height: 1,
            backgroundColor: "rgba(255, 255, 255, 0.12)",
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: 28, fontWeight: 700, color: "#A1A1AA" }}>
            VENUE
          </span>
          <span style={{ fontSize: 32, fontWeight: 800, color: "#34D399" }}>
            {eventVenue}
          </span>
        </div>
      </div>

      {/* High-Contrast CTA Pill Button with Shimmer Sweep */}
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 18,
          opacity: interpolate(ctaSpring, [0, 1], [0, 1]),
          transform: `scale(${interpolate(ctaSpring, [0, 1], [0.88, 1])})`,
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            padding: "36px 40px",
            borderRadius: 999,
            background:
              "linear-gradient(135deg, #10B981 0%, #059669 55%, #2563EB 100%)",
            boxShadow:
              "0 24px 60px rgba(16, 185, 129, 0.45), inset 0 2px 0 rgba(255, 255, 255, 0.35)",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
          }}
        >
          {/* Shimmer sweep */}
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: shimmerX,
              width: 240,
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.35) 50%, transparent 100%)",
              transform: "skewX(-24deg)",
            }}
          />

          <span
            style={{
              fontSize: 26,
              fontWeight: 800,
              color: "#ECFDF5",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Register Now
          </span>
          <span
            style={{
              fontSize: 44,
              fontWeight: 900,
              color: "#FAFAFA",
              letterSpacing: "-0.02em",
            }}
          >
            {ctaUrl}
          </span>
        </div>

        <span
          style={{
            fontSize: 25,
            fontWeight: 600,
            color: "#A1A1AA",
          }}
        >
          26 Nov 2026 · Sarau Event Center, Jos, Plateau State
        </span>
      </div>
    </AbsoluteFill>
  );
};

