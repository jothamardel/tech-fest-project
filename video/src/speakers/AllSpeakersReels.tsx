import React from "react";
import { Series } from "remotion";
import { PHOTO_SPEAKERS_AND_ANCHORS } from "./speakerData";
import { SpeakerSpotlight16x9 } from "./SpeakerSpotlight16x9";
import { SpeakerSpotlight9x16 } from "./SpeakerSpotlight9x16";

export const AllSpeakersLEDReel16x9: React.FC = () => {
  return (
    <Series>
      {PHOTO_SPEAKERS_AND_ANCHORS.map((speaker) => (
        <Series.Sequence key={speaker.id} durationInFrames={480}>
          <SpeakerSpotlight16x9 speaker={speaker} />
        </Series.Sequence>
      ))}
    </Series>
  );
};

export const AllSpeakersSocialReel9x16: React.FC = () => {
  return (
    <Series>
      {PHOTO_SPEAKERS_AND_ANCHORS.map((speaker) => (
        <Series.Sequence key={speaker.id} durationInFrames={480}>
          <SpeakerSpotlight9x16 speaker={speaker} />
        </Series.Sequence>
      ))}
    </Series>
  );
};

