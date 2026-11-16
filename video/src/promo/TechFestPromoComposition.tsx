import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { DarkGlassStreaksBg } from "./DarkGlassStreaksBg";
import { Scene1Hook } from "./Scene1Hook";
import { Scene2Showcase } from "./Scene2Showcase";
import { Scene3CTA } from "./Scene3CTA";

export type TechFestPromoProps = {
  hookEyebrow: string;
  hookLine1: string;
  hookLine2: string;
  hookSubcopy: string;
  showcaseHeader: string;
  ctaUrl: string;
  eventDate: string;
  eventVenue: string;
};

/**
 * 15-second (900 frames @ 60fps, 1080x1920) vertical promo video for Jos TechFest 2026.
 *  - Scene 1 (Frames 0–180 | 0–3s): Kinetic Hook
 *  - Scene 2 (Frames 180–660 | 3–11s): 3D Perspective Showcase of all 4 Sessions & 15 Speakers
 *  - Scene 3 (Frames 660–900 | 11–15s): Centered Brand Lockup + Shimmer CTA
 */
export const TechFestPromoComposition: React.FC<TechFestPromoProps> = ({
  hookEyebrow = "JOS TECHFEST 2026 · 1 FULL DAY",
  hookLine1 = "AI for",
  hookLine2 = "every sector.",
  hookSubcopy = "4 signature sessions. 15 industry speakers. 3 stage anchors. One unforgettable day at Sarau Event Center, Jos.",
  showcaseHeader = "One Day. Four Power Tracks.",
  ctaUrl = "register.techfest.com.ng",
  eventDate = "26 Nov 2026 · 08:30 WAT",
  eventVenue = "Sarau Event Center, Jos",
}) => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#09090B" }}>
      {/* Procedural Dark-Glass 3D Light-Streak Background (25% opacity) */}
      <DarkGlassStreaksBg />

      {/* Scene 1: Frames 0–180 (0–3s) */}
      <Sequence from={0} durationInFrames={180}>
        <Scene1Hook
          eyebrow={hookEyebrow}
          line1={hookLine1}
          line2={hookLine2}
          subcopy={hookSubcopy}
        />
      </Sequence>

      {/* Scene 2: Frames 180–660 (3–11s) */}
      <Sequence from={180} durationInFrames={480}>
        <Scene2Showcase headline={showcaseHeader} />
      </Sequence>

      {/* Scene 3: Frames 660–900 (11–15s) */}
      <Sequence from={660} durationInFrames={240}>
        <Scene3CTA
          line1={hookLine1}
          line2={hookLine2}
          ctaUrl={ctaUrl}
          eventDate={eventDate}
          eventVenue={eventVenue}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
