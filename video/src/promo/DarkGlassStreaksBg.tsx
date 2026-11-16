import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const SPRING_SNAPPY = {
  mass: 0.8,
  stiffness: 220,
  damping: 22,
};

export const SPRING_KINETIC = {
  mass: 1.0,
  stiffness: 180,
  damping: 16,
};

export const SPRING_CARD_3D = {
  mass: 1.15,
  stiffness: 150,
  damping: 20,
};

export const SPRING_CAMERA = {
  mass: 2.0,
  stiffness: 60,
  damping: 40,
};

/**
 * Procedural dark-glass 3D light-streak shader background layered at 25% opacity
 * beneath UI cards. Uses multi-stage spring physics so zero motion is linear.
 */
export const DarkGlassStreaksBg: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const driftA = spring({
    frame,
    fps,
    config: { mass: 3.5, stiffness: 18, damping: 28 },
    durationInFrames: 900,
  });

  const driftB = spring({
    frame: Math.max(0, frame - 60),
    fps,
    config: { mass: 3.0, stiffness: 22, damping: 26 },
    durationInFrames: 840,
  });

  const streak1Y = interpolate(driftA, [0, 1], [-180, 220]);
  const streak1Rotate = interpolate(driftA, [0, 1], [-28, -19]);
  const streak2Y = interpolate(driftB, [0, 1], [240, -160]);
  const streak2Rotate = interpolate(driftB, [0, 1], [24, 15]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#09090B",
        overflow: "hidden",
      }}
    >
      {/* Deep Obsidian + Dark Emerald Base Canvas */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at 50% 15%, rgba(16, 185, 129, 0.22) 0%, rgba(9, 9, 11, 0.98) 68%)",
        }}
      />

      {/* 3D Light-Streak Layer at 25% Opacity */}
      <AbsoluteFill style={{ opacity: 0.25 }}>
        {/* Emerald 3D Light Streak */}
        <div
          style={{
            position: "absolute",
            top: 260 + streak1Y,
            left: -240,
            width: 1560,
            height: 360,
            borderRadius: 999,
            background:
              "linear-gradient(90deg, transparent 0%, rgba(16, 185, 129, 0.85) 35%, rgba(59, 130, 246, 0.75) 70%, transparent 100%)",
            filter: "blur(72px)",
            transform: `perspective(1200px) rotateZ(${streak1Rotate}deg) rotateX(24deg)`,
          }}
        />

        {/* Cobalt + Indigo 3D Light Streak */}
        <div
          style={{
            position: "absolute",
            top: 880 + streak2Y,
            left: -200,
            width: 1500,
            height: 320,
            borderRadius: 999,
            background:
              "linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.85) 30%, rgba(99, 102, 241, 0.8) 65%, transparent 100%)",
            filter: "blur(68px)",
            transform: `perspective(1200px) rotateZ(${streak2Rotate}deg) rotateX(-18deg)`,
          }}
        />

        {/* Subtle Amber Policy Glow Bottom-Right */}
        <div
          style={{
            position: "absolute",
            bottom: 180,
            right: -120,
            width: 760,
            height: 420,
            borderRadius: 999,
            background:
              "radial-gradient(circle, rgba(245, 158, 11, 0.55) 0%, transparent 72%)",
            filter: "blur(80px)",
          }}
        />

        {/* Architectural Dark-Glass Grid */}
        <AbsoluteFill
          style={{
            backgroundImage:
              "linear-gradient(rgba(250, 250, 250, 0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(250, 250, 250, 0.07) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

