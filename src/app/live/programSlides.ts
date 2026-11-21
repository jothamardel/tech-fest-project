import {
  TECHFEST_SESSIONS,
  TECHFEST_ANCHORS,
  getPersonInitials,
} from "@/data/sessions";

export type SlideActId = "act-1-preshow" | "act-2-opening" | "act-3-sessions" | "act-4-closing";

export type SlideTemplateKind =
  | "welcome-loop"
  | "promo-loop"
  | "photo-reel"
  | "sponsors-wall"
  | "opening-bumper"
  | "anchors-trio"
  | "agenda-overview"
  | "session-bumper"
  | "speaker-walkon"
  | "panel-backdrop"
  | "break-hold"
  | "custom-media"
  | "closing-thankyou";

export type SlideThemeAccent = "emerald" | "blue" | "indigo" | "amber";

export interface SlidePanelPerson {
  id: string;
  name: string;
  role: string;
  talkTitle?: string;
  image: string | null;
  initials: string;
}

export interface ProgramSlide {
  id: string;
  cueNumber: string;
  actId: SlideActId;
  actLabel: string;
  kind: SlideTemplateKind;
  timeSlot: string;
  badgeLabel: string;
  title: string;
  subtitle: string;
  talkTitle?: string;
  accent: SlideThemeAccent;
  /** Primary portrait or custom uploaded image/video URL */
  mediaUrl?: string | null;
  /** Type of custom media when kind === "custom-media" */
  mediaType?: "image" | "video" | "embed";
  /** Initials when speaker/anchor has no confirmed photo */
  initials?: string;
  /** Bullet highlights for session bumpers */
  highlights?: string[];
  /** Multiple people for panel backdrops or anchor trio */
  people?: SlidePanelPerson[];
  /** Gallery photo list for photo-reel */
  galleryPhotos?: string[];
  /** Operator cue notes */
  stageNote?: string;
}

export const ACT_META: Record<
  SlideActId,
  { shortLabel: string; fullTitle: string; timeRange: string }
> = {
  "act-1-preshow": {
    shortLabel: "Act I · Pre-Show",
    fullTitle: "Act I — Doors Open, Walk-In Loops & Sponsors",
    timeRange: "08:30 AM – 09:30 AM",
  },
  "act-2-opening": {
    shortLabel: "Act II · Opening",
    fullTitle: "Act II — Opening Ceremony, Anchors & Programme",
    timeRange: "09:30 AM – 10:15 AM",
  },
  "act-3-sessions": {
    shortLabel: "Act III · 4 Sessions",
    fullTitle: "Act III — The 4 Signature Sessions & Speaker Walk-Ons",
    timeRange: "10:15 AM – 04:15 PM",
  },
  "act-4-closing": {
    shortLabel: "Act IV · Closing",
    fullTitle: "Act IV — Open Demos, Mixer & Closing Finale",
    timeRange: "04:15 PM – 05:45 PM",
  },
};

export const ACCENT_PALETTE: Record<
  SlideThemeAccent,
  {
    primary: string;
    secondary: string;
    glowRgba: string;
    borderRgba: string;
    badgeBgRgba: string;
    label: string;
  }
> = {
  blue: {
    primary: "#3B82F6",
    secondary: "#60A5FA",
    glowRgba: "rgba(59, 130, 246, 0.42)",
    borderRgba: "rgba(96, 165, 250, 0.55)",
    badgeBgRgba: "rgba(37, 99, 235, 0.22)",
    label: "Cobalt (AI x Education)",
  },
  emerald: {
    primary: "#10B981",
    secondary: "#34D399",
    glowRgba: "rgba(16, 185, 129, 0.42)",
    borderRgba: "rgba(52, 211, 153, 0.55)",
    badgeBgRgba: "rgba(16, 185, 129, 0.22)",
    label: "Emerald (AI x Business / Main)",
  },
  indigo: {
    primary: "#6366F1",
    secondary: "#818CF8",
    glowRgba: "rgba(99, 102, 241, 0.45)",
    borderRgba: "rgba(129, 140, 248, 0.55)",
    badgeBgRgba: "rgba(99, 102, 241, 0.22)",
    label: "Indigo (AI x Creatives)",
  },
  amber: {
    primary: "#F59E0B",
    secondary: "#FBBF24",
    glowRgba: "rgba(245, 158, 11, 0.40)",
    borderRgba: "rgba(251, 191, 36, 0.55)",
    badgeBgRgba: "rgba(245, 158, 11, 0.22)",
    label: "Amber/Gold (Policy & Host)",
  },
};

export const EVENT_GALLERY_PHOTOS = [
  "/images/jtf-15.jpg",
  "/images/jtf-18.jpg",
  "/images/jtf-21.jpg",
  "/images/jtf-26.jpg",
  "/images/jtf-28.jpg",
  "/images/jtf-30.jpg",
  "/images/jtf-31.jpg",
  "/images/jtf-40.jpg",
  "/images/jtf-43.jpg",
  "/images/jtf-56.jpg",
];

export const SPONSOR_TIERS = {
  headline: [
    { src: "/images/partners.png", name: "Headline Partner" },
    { src: "/images/koenig.jpeg", name: "Koenig" },
    { src: "/images/openai.png", name: "OpenAI" },
  ],
  ecosystem: [
    { src: "/images/partners2.png", name: "Partner" },
    { src: "/images/partners3.png", name: "Partner" },
    { src: "/images/partners5.png", name: "Partner" },
    { src: "/images/axiahub.png", name: "Axia Hub" },
    { src: "/images/clockchain.png", name: "Clockchain" },
    { src: "/images/partnerslogoi.png", name: "Partner" },
  ],
  community: [
    { src: "/images/ahub.png", name: "AHub" },
    { src: "/images/boldimg.png", name: "Bold" },
    { src: "/images/logo-dark.png", name: "Jos Community" },
    { src: "/images/partners8.png", name: "Community Hub" },
    { src: "/images/partners11..png", name: "Ecosystem Hub" },
  ],
};

function buildDefaultProgramSlides(): ProgramSlide[] {
  const slides: ProgramSlide[] = [];
  let cue = 1;
  const nextCue = () => String(cue++).padStart(2, "0");

  // =========================================================================
  // ACT I — PRE-SHOW & DOORS OPEN (08:30 AM – 09:30 AM)
  // =========================================================================
  slides.push({
    id: "preshow-welcome",
    cueNumber: nextCue(),
    actId: "act-1-preshow",
    actLabel: "Act I · Pre-Show",
    kind: "welcome-loop",
    timeSlot: "08:30 AM WAT",
    badgeLabel: "DOORS OPEN · REGISTRATION & CHECK-IN",
    title: "AI for every sector.",
    subtitle:
      "Welcome to Jos TechFest 2026 · Sarau Event Center, Jos · Take your seat and connect with 500+ builders.",
    accent: "emerald",
    stageNote: "Project on LED wall during morning arrival and check-in (08:30 – 09:15 AM).",
  });

  slides.push({
    id: "preshow-promo-loop",
    cueNumber: nextCue(),
    actId: "act-1-preshow",
    actLabel: "Act I · Pre-Show",
    kind: "promo-loop",
    timeSlot: "08:45 AM WAT",
    badgeLabel: "OFFICIAL 2026 MOTION BUMPER",
    title: "AI for every sector.",
    subtitle: "1 Full Day · 4 Signature Sessions · 15 Speakers · 3 Stage Anchors",
    accent: "emerald",
    stageNote: "Auto-loops the 3-scene kinetic event promo on the main LED screen.",
  });

  slides.push({
    id: "preshow-photo-reel",
    cueNumber: nextCue(),
    actId: "act-1-preshow",
    actLabel: "Act I · Pre-Show",
    kind: "photo-reel",
    timeSlot: "09:00 AM WAT",
    badgeLabel: "COMMUNITY MEMORIES · #JOSTECHFEST",
    title: "The Builders of Plateau & Beyond",
    subtitle: "Highlights from the Jos TechFest community movement",
    accent: "blue",
    galleryPhotos: EVENT_GALLERY_PHOTOS,
    stageNote: "Auto-advances through high-res event photos every 5 seconds with Ken-Burns motion.",
  });

  slides.push({
    id: "preshow-sponsors",
    cueNumber: nextCue(),
    actId: "act-1-preshow",
    actLabel: "Act I · Pre-Show",
    kind: "sponsors-wall",
    timeSlot: "09:15 AM WAT",
    badgeLabel: "POWERED BY OUR PARTNERS & SPONSORS",
    title: "Backed by Industry Leaders",
    subtitle: "Thank you to our Headline Sponsors, Ecosystem Partners, and Community Hubs",
    accent: "emerald",
    stageNote: "Keep on screen prior to anchor walk-on and during transition breaks.",
  });

  // =========================================================================
  // ACT II — OPENING CEREMONY & ANCHORS (09:30 AM – 10:15 AM)
  // =========================================================================
  slides.push({
    id: "opening-master-bumper",
    cueNumber: nextCue(),
    actId: "act-2-opening",
    actLabel: "Act II · Opening",
    kind: "opening-bumper",
    timeSlot: "09:30 AM WAT",
    badgeLabel: "LIVE ON MAIN STAGE · OPENING CEREMONY",
    title: "Welcome to Jos TechFest 2026",
    subtitle: "AI for Every Sector — Education · Business · Creatives · Startup Policy",
    accent: "emerald",
    stageNote: "Cue when house lights dim and opening music hits at 09:30 AM.",
  });

  slides.push({
    id: "opening-anchors-trio",
    cueNumber: nextCue(),
    actId: "act-2-opening",
    actLabel: "Act II · Opening",
    kind: "anchors-trio",
    timeSlot: "09:35 AM WAT",
    badgeLabel: "MAIN STAGE HOSTS & ANCHORS",
    title: "Meet Your Stage Anchors",
    subtitle: "Guiding the energy, conversations, and stage flow across all four tracks",
    accent: "amber",
    people: TECHFEST_ANCHORS.map((a) => ({
      id: a.id,
      name: a.name,
      role: a.role,
      image: a.image,
      initials: getPersonInitials(a.name),
    })),
    stageNote: "Project when introducing the three hosts together on stage.",
  });

  TECHFEST_ANCHORS.forEach((anchor) => {
    slides.push({
      id: `anchor-walkon-${anchor.id}`,
      cueNumber: nextCue(),
      actId: "act-2-opening",
      actLabel: "Act II · Opening",
      kind: "speaker-walkon",
      timeSlot: "09:40 AM WAT",
      badgeLabel: "MAIN STAGE ANCHOR · JOS TECHFEST 2026",
      title: anchor.name,
      subtitle: "Official Stage Host & Event Anchor",
      talkTitle: "Guiding the Energy, Conversations & Live Audience Flow Across All Sessions",
      accent: "amber",
      mediaUrl: anchor.image,
      initials: getPersonInitials(anchor.name),
      stageNote: `Individual walk-on bumper for ${anchor.name}.`,
    });
  });

  slides.push({
    id: "opening-agenda-overview",
    cueNumber: nextCue(),
    actId: "act-2-opening",
    actLabel: "Act II · Opening",
    kind: "agenda-overview",
    timeSlot: "10:00 AM WAT",
    badgeLabel: "26 NOVEMBER 2026 · FULL-DAY RUN OF SHOW",
    title: "Today's Programme at a Glance",
    subtitle: "Four focused tracks designed to accelerate AI adoption across every sector",
    accent: "blue",
    stageNote: "Project while anchors walk the audience through today's schedule.",
  });

  // =========================================================================
  // ACT III — THE 4 SIGNATURE SESSIONS (10:15 AM – 04:15 PM)
  // =========================================================================
  TECHFEST_SESSIONS.forEach((session, sIdx) => {
    const sessionNum = String(sIdx + 1).padStart(2, "0");

    // Insert Afternoon Break before Session 03
    if (sIdx === 2) {
      slides.push({
        id: "midday-break-hold",
        cueNumber: nextCue(),
        actId: "act-3-sessions",
        actLabel: "Act III · 4 Sessions",
        kind: "break-hold",
        timeSlot: "01:00 PM – 01:30 PM",
        badgeLabel: "MIDDAY NETWORKING & EXHIBITION BREAK",
        title: "Networking & Refreshment Break",
        subtitle: "Up Next at 1:30 PM: Session 03 — AI x Creatives",
        accent: "emerald",
        stageNote: "Enable the 30-minute stage countdown timer during the midday break.",
      });
    }

    // 1. Session Track Intro Bumper
    slides.push({
      id: `session-bumper-${session.id}`,
      cueNumber: nextCue(),
      actId: "act-3-sessions",
      actLabel: `Session ${sessionNum}`,
      kind: "session-bumper",
      timeSlot: session.time,
      badgeLabel: `SESSION ${sessionNum} · ${session.title.toUpperCase()}`,
      title: session.title,
      subtitle: session.tagline,
      talkTitle: session.description,
      accent: session.accent,
      highlights: session.highlights,
      people: session.speakers.map((sp) => ({
        id: sp.id,
        name: sp.name,
        role: sp.role,
        talkTitle: sp.talkTitle,
        image: sp.image,
        initials: getPersonInitials(sp.name),
      })),
      stageNote: `Cue when anchors announce Session ${sessionNum}: ${session.title}.`,
    });

    // 2. Individual Speaker Walk-On Slides for every speaker in the session
    session.speakers.forEach((speaker) => {
      slides.push({
        id: `speaker-walkon-${speaker.id}`,
        cueNumber: nextCue(),
        actId: "act-3-sessions",
        actLabel: `Session ${sessionNum}`,
        kind: "speaker-walkon",
        timeSlot: session.time,
        badgeLabel: `SESSION ${sessionNum} · ${session.title.toUpperCase()}`,
        title: speaker.name,
        subtitle: speaker.role,
        talkTitle: speaker.talkTitle,
        accent: session.accent,
        mediaUrl: speaker.image,
        initials: getPersonInitials(speaker.name),
        stageNote: `Cue on LED screen as ${speaker.name} is called to the stage.`,
      });
    });

    // 3. Session Panel / All-Speakers Stage Backdrop
    slides.push({
      id: `session-panel-${session.id}`,
      cueNumber: nextCue(),
      actId: "act-3-sessions",
      actLabel: `Session ${sessionNum}`,
      kind: "panel-backdrop",
      timeSlot: session.time,
      badgeLabel: `LIVE PANEL & Q&A · SESSION ${sessionNum}`,
      title: `${session.title} — Panel & Q&A`,
      subtitle: session.tagline,
      accent: session.accent,
      people: session.speakers.map((sp) => ({
        id: sp.id,
        name: sp.name,
        role: sp.role,
        talkTitle: sp.talkTitle,
        image: sp.image,
        initials: getPersonInitials(sp.name),
      })),
      stageNote: `Hold on the LED wall while all ${session.speakers.length} speakers are seated for discussion/Q&A.`,
    });
  });

  // =========================================================================
  // ACT IV — OPEN DEMOS, MIXER & CLOSING (04:15 PM – 05:45 PM)
  // =========================================================================
  slides.push({
    id: "closing-open-demos",
    cueNumber: nextCue(),
    actId: "act-4-closing",
    actLabel: "Act IV · Closing",
    kind: "opening-bumper",
    timeSlot: "04:15 PM WAT",
    badgeLabel: "LIVE SHOWCASE · OPEN DEMOS & FOUNDER MIXER",
    title: "Open Demos & Ecosystem Showcase",
    subtitle: "Live product demos from Plateau builders, founder networking & exhibitions",
    accent: "indigo",
    stageNote: "Project during afternoon product demos and exhibition showcase.",
  });

  slides.push({
    id: "closing-thank-you",
    cueNumber: nextCue(),
    actId: "act-4-closing",
    actLabel: "Act IV · Closing",
    kind: "closing-thankyou",
    timeSlot: "05:15 PM WAT",
    badgeLabel: "COMMUNITY FINALE · GROUP PHOTO & CLOSING",
    title: "Thank You for Building the Future.",
    subtitle: "Jos TechFest 2026 · AI for Every Sector · Share your photos with #JosTechFest",
    accent: "emerald",
    stageNote: "Final LED backdrop for closing remarks and the all-attendee group photo on stage.",
  });

  return slides;
}

export const DEFAULT_PROGRAM_SLIDES: ProgramSlide[] = buildDefaultProgramSlides();

