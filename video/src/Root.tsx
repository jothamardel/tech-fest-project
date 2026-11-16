import React from "react";
import { Composition, Folder, Still } from "remotion";
import { Frame01Hook } from "./frames/Frame01Hook";
import { Frame02Sessions } from "./frames/Frame02Sessions";
import { Frame03Speakers } from "./frames/Frame03Speakers";
import { Frame04CTA } from "./frames/Frame04CTA";
import { TechFestPromoComposition } from "./promo/TechFestPromoComposition";
import {
  AllSpeakersLEDReel16x9,
  AllSpeakersSocialReel9x16,
} from "./speakers/AllSpeakersReels";
import { PHOTO_SPEAKERS_AND_ANCHORS } from "./speakers/speakerData";
import { SpeakerSpotlight16x9 } from "./speakers/SpeakerSpotlight16x9";
import { SpeakerSpotlight9x16 } from "./speakers/SpeakerSpotlight9x16";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Main 15-Second (900 frames @ 60fps, 1080x1920) Promo Composition */}
      <Composition
        id="TechFestPromo2026"
        component={TechFestPromoComposition}
        durationInFrames={900}
        fps={60}
        width={1080}
        height={1920}
      />

      {/* 16:9 Stage LED Walk-On Videos (1920x1080, 480 frames / 8s @ 60fps) */}
      <Folder name="Speakers-LED-16x9">
        <Composition
          id="All-Speakers-LED-Reel"
          component={AllSpeakersLEDReel16x9}
          durationInFrames={480 * PHOTO_SPEAKERS_AND_ANCHORS.length}
          fps={60}
          width={1920}
          height={1080}
        />
        {PHOTO_SPEAKERS_AND_ANCHORS.map((speaker) => (
          <Composition
            key={`led-${speaker.id}`}
            id={`LED-${speaker.slug}`}
            component={SpeakerSpotlight16x9}
            durationInFrames={480}
            fps={60}
            width={1920}
            height={1080}
            defaultProps={{
              speaker,
            }}
          />
        ))}
      </Folder>

      {/* 9:16 Social Media Speaker Videos (1080x1920, 480 frames / 8s @ 60fps) */}
      <Folder name="Speakers-Social-9x16">
        <Composition
          id="All-Speakers-Social-Reel"
          component={AllSpeakersSocialReel9x16}
          durationInFrames={480 * PHOTO_SPEAKERS_AND_ANCHORS.length}
          fps={60}
          width={1080}
          height={1920}
        />
        {PHOTO_SPEAKERS_AND_ANCHORS.map((speaker) => (
          <Composition
            key={`social-${speaker.id}`}
            id={`Social-${speaker.slug}`}
            component={SpeakerSpotlight9x16}
            durationInFrames={480}
            fps={60}
            width={1080}
            height={1920}
            defaultProps={{
              speaker,
            }}
          />
        ))}
      </Folder>

      {/* 4 Locked Static Keyframes (1080x1920, 9:16) */}
      <Folder name="Keyframes-9x16">
        <Still
          id="Frame-01-Hook"
          component={Frame01Hook}
          width={1080}
          height={1920}
          defaultProps={{
            eyebrow: "TechFest 2026",
            headlineTop: "AI for",
            headlineAccent: "every sector.",
            subheadline:
              "One powerful day of AI sessions, industry speakers, and networking in Jos.",
            dateBadge: "26 Nov 2026",
            venueBadge: "Sarau Event Center, Jos",
          }}
        />
        <Still
          id="Frame-02-Core-Sessions"
          component={Frame02Sessions}
          width={1080}
          height={1920}
          defaultProps={{
            headline: "4 Signature Sessions",
            subheadline: "AI x Education · Business · Creatives · Startup Policy",
          }}
        />
        <Still
          id="Frame-03-Core-Speakers"
          component={Frame03Speakers}
          width={1080}
          height={1920}
          defaultProps={{
            headline: "15 Speakers & 3 Anchors",
            subheadline: "Meet the voices shaping Jos TechFest 2026",
          }}
        />
        <Still
          id="Frame-04-CTA"
          component={Frame04CTA}
          width={1080}
          height={1920}
          defaultProps={{
            headline: "Join 500+ Builders in Jos.",
            subheadline:
              "Reserve your pass for a full day of keynotes, breakout sessions, and networking.",
            ctaUrl: "register.techfest.com.ng",
            eventDate: "Thursday, 26 Nov 2026",
            eventVenue: "Sarau Event Center, Jos",
            hashtag: "#JosTechFest",
          }}
        />
      </Folder>
    </>
  );
};
