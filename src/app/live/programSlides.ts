import {
  TECHFEST_SESSIONS,
  TECHFEST_ANCHORS,
  getPersonInitials,
} from "@/data/sessions";
import {
  SESSION_MODERATOR_BRIEFINGS,
  type PanelQuestionItem,
} from "@/data/panelQuestions";

export type SlideActId =
  | "act-1-preshow"
  | "act-2-opening"
  | "act-3-sessions"
  | "act-4-closing";

export type SlideTemplateKind =
  | "welcome-loop"
  | "promo-loop"
  | "photo-reel"
  | "sponsors-wall"
  | "icebreaker-games"
  | "opening-bumper"
  | "anchors-trio"
  | "agenda-overview"
  | "session-bumper"
  | "speaker-walkon"
  | "panel-backdrop"
  | "startup-video"
  | "fireside-chat"
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
  /** Type of custom media when kind === "custom-media" or "startup-video" */
  mediaType?: "image" | "video" | "embed";
  /** Initials when speaker/anchor has no confirmed photo */
  initials?: string;
  /** Bullet highlights for session bumpers or game rounds */
  highlights?: string[];
  /** Multiple people for panel backdrops, fireside chat, or anchor trio */
  people?: SlidePanelPerson[];
  /** Gallery photo list for photo-reel */
  galleryPhotos?: string[];
  /** Panel discussion questions for panel-backdrop slides */
  panelQuestions?: PanelQuestionItem[];
  /** Currently projected panel question index on LED screen (null = show all panelists overview) */
  activeQuestionIndex?: number | null;
  /** Operator cue notes */
  stageNote?: string;
}

export const ACT_META: Record<
  SlideActId,
  { shortLabel: string; fullTitle: string; timeRange: string }
> = {
  "act-1-preshow": {
    shortLabel: "Act I · Arrival & Icebreakers",
    fullTitle: "Act I — Arrival, Check-Ins, Red Carpet Photos & Icebreaker Games",
    timeRange: "08:00 AM – 09:20 AM",
  },
  "act-2-opening": {
    shortLabel: "Act II · Keynotes, AI RAG & Data Protection",
    fullTitle:
      "Act II — Opening Speech, DG PICTDA Keynote, AI RAG & Data Protection Presentations",
    timeRange: "09:20 AM – 10:25 AM",
  },
  "act-3-sessions": {
    shortLabel: "Act III · Sessions & Startups",
    fullTitle: "Act III — 4 Sessions, In-Between Startup Videos & Fireside Chat",
    timeRange: "10:25 AM – 04:25 PM",
  },
  "act-4-closing": {
    shortLabel: "Act IV · Demos & Closing",
    fullTitle: "Act IV — Open Demos, Ecosystem Mixer & Closing Finale",
    timeRange: "04:25 PM – 05:45 PM",
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
    label: "Cobalt (AI x Education / Tech)",
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
    label: "Indigo (AI x Creatives / Startups)",
  },
  amber: {
    primary: "#F59E0B",
    secondary: "#FBBF24",
    glowRgba: "rgba(245, 158, 11, 0.40)",
    borderRgba: "rgba(251, 191, 36, 0.55)",
    badgeBgRgba: "rgba(245, 158, 11, 0.22)",
    label: "Amber/Gold (Keynote / Policy / Host)",
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

export const SPONSOR_TIERS: {
  headline: Array<{ src: string; name: string; showLabel?: boolean }>;
  ecosystem: Array<{ src: string; name: string }>;
  community: Array<{ src: string; name: string }>;
} = {
  headline: [
    { src: "/images/agrisync-ai.png", name: "AgriSync AI" },
    { src: "/images/devkings.jpg", name: "Devkings Technologies", showLabel: true },
    { src: "/images/partners.png", name: "Bluehouse Technologies" },
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
    { src: "/images/logo-dark.png", name: "TechSynergy" },
    { src: "/images/partners8.png", name: "GDG DevFest" },
    { src: "/images/Rimg.jpg", name: "Community Hub" },
  ],
};

export const SPOTLIGHT_STARTUPS: SlidePanelPerson[] = [
  {
    id: "spotlight-devkings",
    name: "Devkings Technologies",
    role: "Enterprise Software & AI Engineering",
    talkTitle:
      "Building Scalable Enterprise Software, AI Systems & Digital Infrastructure",
    image: "/images/devkings.jpg",
    initials: "DK",
  },
  {
    id: "spotlight-agrisync-ai",
    name: "AgriSync AI",
    role: "AgriTech & Farm Data Intelligence",
    talkTitle:
      "Your Farm. Your Data. Your Future — Precision AI for Modern Agriculture",
    image: "/images/agrisync-ai.png",
    initials: "AA",
  },
  {
    id: "spotlight-laskad",
    name: "Laskad",
    role: "Digital Product & Venture Innovation",
    talkTitle:
      "Shipping High-Impact Digital Products & Platforms Built for Scale",
    image: null,
    initials: "LK",
  },
  {
    id: "spotlight-bluehouse",
    name: "Bluehouse Technologies",
    role: "Technology Innovation & Talent Ecosystem",
    talkTitle:
      "Engineering Digital Transformation, Software Solutions & Tech Talent Across Africa",
    image: "/images/partners.png",
    initials: "BT",
  },
  {
    id: "spotlight-ajecars",
    name: "Ajecars",
    role: "Automotive Commerce & Smart Mobility",
    talkTitle:
      "Reimagining Vehicle Discovery, Trusted Auto Commerce & Mobility Access",
    image: null,
    initials: "AC",
  },
  {
    id: "spotlight-africa-plus",
    name: "Africa+",
    role: "Pan-African Digital Gateway",
    talkTitle:
      "Gateway to Africa — Connecting Innovation, Digital Commerce & Opportunity",
    image: "/images/partners2.png",
    initials: "A+",
  },
];

function buildDefaultProgramSlides(): ProgramSlide[] {
  const slides: ProgramSlide[] = [];
  let cue = 1;
  const nextCue = () => String(cue++).padStart(2, "0");

  // =========================================================================
  // ACT I — ARRIVAL, CHECK-INS, PHOTOS & ICEBREAKER GAMES (08:00 AM – 09:20 AM)
  // =========================================================================
  slides.push({
    id: "preshow-arrival-checkins",
    cueNumber: nextCue(),
    actId: "act-1-preshow",
    actLabel: "Act I · Arrival",
    kind: "welcome-loop",
    timeSlot: "08:00 AM – 08:45 AM",
    badgeLabel: "ARRIVAL · CHECK-INS · RED CARPET PHOTOS",
    title: "Arrival, Check-Ins & Photos",
    subtitle:
      "Welcome to Jos TechFest 2026 · Complete your badge check-in, visit the photo wall & share with #JosTechFest",
    accent: "emerald",
    stageNote:
      "Project on main LED screen during morning arrival, accreditation check-ins, and red carpet photography.",
  });

  slides.push({
    id: "preshow-promo-loop",
    cueNumber: nextCue(),
    actId: "act-1-preshow",
    actLabel: "Act I · Arrival",
    kind: "promo-loop",
    timeSlot: "08:30 AM WAT",
    badgeLabel: "OFFICIAL 2026 MOTION BUMPER",
    title: "AI for every sector.",
    subtitle: "1 Full Day · 4 Signature Sessions · Keynotes · Startup Showcases",
    accent: "emerald",
    stageNote: "Auto-loops the 3-scene kinetic event promo on the main LED screen.",
  });

  slides.push({
    id: "preshow-photo-reel",
    cueNumber: nextCue(),
    actId: "act-1-preshow",
    actLabel: "Act I · Photos",
    kind: "photo-reel",
    timeSlot: "08:40 AM WAT",
    badgeLabel: "COMMUNITY MEMORIES & PHOTO WALL · #JOSTECHFEST",
    title: "The Builders of Plateau & Beyond",
    subtitle: "Tag your arrival photos with #JosTechFest to feature on the community wall",
    accent: "blue",
    galleryPhotos: EVENT_GALLERY_PHOTOS,
    stageNote:
      "Auto-advances through high-res event photos every 4.5 seconds. You can also upload live arrival photos via 'Add Media'.",
  });

  slides.push({
    id: "preshow-sponsors",
    cueNumber: nextCue(),
    actId: "act-1-preshow",
    actLabel: "Act I · Partners",
    kind: "sponsors-wall",
    timeSlot: "08:50 AM WAT",
    badgeLabel: "POWERED BY OUR PARTNERS & SPONSORS",
    title: "Backed by Industry Leaders",
    subtitle: "Thank you to our Headline Sponsors, Ecosystem Partners, and Community Hubs",
    accent: "emerald",
    stageNote: "Sponsor recognition loop before the icebreaker session begins.",
  });

  slides.push({
    id: "preshow-icebreaker-games",
    cueNumber: nextCue(),
    actId: "act-1-preshow",
    actLabel: "Act I · Icebreakers",
    kind: "icebreaker-games",
    timeSlot: "08:55 AM – 09:20 AM",
    badgeLabel: "INTERACTIVE STAGE · BREAKING THE ICE & GAMES",
    title: "Breaking the Ice & Tech Games",
    subtitle:
      "Get ready for fast-paced AI & Tech Trivia, Speed Networking Challenges, and Instant Swag Giveaways!",
    accent: "indigo",
    highlights: [
      "Round 01 · 60-Second Builder Speed Meet",
      "Round 02 · Live AI & Plateau Tech Trivia",
      "Round 03 · Fastest Post on #JosTechFest",
      "Round 04 · Stage Challenge & Swag Prizes",
    ],
    stageNote:
      "Cue when anchors take the mic at 08:55 AM to energize the hall with icebreakers and games.",
  });

  // =========================================================================
  // ACT II — OPENING CEREMONY, KEYNOTE & AI RAG PRESENTATION (09:20 AM – 10:25 AM)
  // =========================================================================
  slides.push({
    id: "opening-master-bumper",
    cueNumber: nextCue(),
    actId: "act-2-opening",
    actLabel: "Act II · Opening",
    kind: "opening-bumper",
    timeSlot: "09:20 AM WAT",
    badgeLabel: "LIVE ON MAIN STAGE · OFFICIAL OPENING",
    title: "Welcome to Jos TechFest 2026",
    subtitle: "AI for Every Sector — Education · Business · Creatives · Startup Policy",
    accent: "emerald",
    stageNote: "Cue when house lights dim and opening music hits at 09:20 AM.",
  });

  slides.push({
    id: "opening-anchors-trio",
    cueNumber: nextCue(),
    actId: "act-2-opening",
    actLabel: "Act II · Anchors",
    kind: "anchors-trio",
    timeSlot: "09:25 AM WAT",
    badgeLabel: "MAIN STAGE HOSTS & ANCHORS",
    title: "Meet Your Stage Anchors",
    subtitle: "Guiding the energy, conversations, and stage flow across all sessions",
    accent: "amber",
    people: TECHFEST_ANCHORS.map((a) => ({
      id: a.id,
      name: a.name,
      role: a.role,
      image: a.image,
      initials: getPersonInitials(a.name),
    })),
    stageNote: "Project when introducing Samuel Adebayo, Tamimia Esther Nuhu, and Anna Agbolade together on stage.",
  });

  TECHFEST_ANCHORS.forEach((anchor) => {
    slides.push({
      id: `anchor-walkon-${anchor.id}`,
      cueNumber: nextCue(),
      actId: "act-2-opening",
      actLabel: "Act II · Anchor",
      kind: "speaker-walkon",
      timeSlot: "09:28 AM WAT",
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

  // Opening Speech by Mbiplang Ardel (Lead Convener)
  slides.push({
    id: "opening-speech-mbiplang-ardel",
    cueNumber: nextCue(),
    actId: "act-2-opening",
    actLabel: "Act II · Opening Speech",
    kind: "speaker-walkon",
    timeSlot: "09:35 AM – 09:50 AM",
    badgeLabel: "OPENING SPEECH · LEAD CONVENER",
    title: "Mbiplang Ardel",
    subtitle: "Lead Convener · Jos TechFest 2026",
    talkTitle:
      "Opening Speech: Unlocking AI for Every Sector & Building Plateau's Next-Gen Innovation Ecosystem",
    accent: "emerald",
    mediaUrl: "/images/mbi.jpg",
    initials: "MA",
    stageNote:
      "Cue as Lead Convener Mbiplang Ardel is called on stage for the official Opening Speech.",
  });

  // Keynote by DG PICTDA Engr. Dominic Datong
  slides.push({
    id: "keynote-dg-pictda-dominic-datong",
    cueNumber: nextCue(),
    actId: "act-2-opening",
    actLabel: "Act II · Keynote",
    kind: "speaker-walkon",
    timeSlot: "09:50 AM – 10:05 AM",
    badgeLabel: "OFFICIAL KEYNOTE ADDRESS · DG PICTDA",
    title: "Engr. Dominic Datong",
    subtitle: "Director General · PICTDA (Plateau State ICT Development Agency)",
    talkTitle:
      "Keynote Address: Advancing Digital Governance, Public-Private Innovation & AI Readiness Across Plateau State",
    accent: "amber",
    mediaUrl: "/images/dominic-datong.jpg",
    initials: "DD",
    stageNote:
      "Cue for the Official Keynote Address by DG PICTDA Engr. Dominic Datong.",
  });

  // Special Presentation on AI RAG for Businesses by Samuel Yaula Dutse
  slides.push({
    id: "presentation-ai-rag-samuel-dutse",
    cueNumber: nextCue(),
    actId: "act-2-opening",
    actLabel: "Act II · AI RAG Presentation",
    kind: "speaker-walkon",
    timeSlot: "10:05 AM – 10:15 AM",
    badgeLabel: "TECHNICAL PRESENTATION · AI RAG FOR BUSINESSES",
    title: "Samuel Yaula Dutse",
    subtitle: "AI Systems Speaker · Special Presentation",
    talkTitle:
      "AI RAG for Businesses: Deploying Retrieval-Augmented Generation on Private Enterprise Data",
    accent: "blue",
    mediaUrl: "/images/samuel-dutse.jpg",
    initials: "SD",
    stageNote:
      "Cue when Samuel Yaula Dutse is called on stage for 'AI RAG for Businesses'. If he has slides, inject or embed his deck via the 'Add Media' tab.",
  });

  // Up Next Bumper right after Samuel Yaula Dutse's presentation: Ribetnan Dami on Data Protection
  slides.push({
    id: "up-next-data-protection-ribetnan-dami",
    cueNumber: nextCue(),
    actId: "act-2-opening",
    actLabel: "Act II · Up Next: Data Protection",
    kind: "session-bumper",
    timeSlot: "10:15 AM – 10:25 AM",
    badgeLabel: "UP NEXT ON MAIN STAGE · SPECIAL PRESENTATION",
    title: "Data Protection — Ribetnan Dami",
    subtitle:
      "Up Next: Ribetnan Dami presenting on Data Protection, Privacy & AI Governance",
    accent: "indigo",
    highlights: [
      "NDPA & Data Privacy Compliance",
      "Safeguarding Customer & Enterprise Data",
      "AI Training Data & Privacy Risks",
      "Practical Security Hygiene for Startups",
    ],
    people: [
      {
        id: "ribetnan-dami",
        name: "Ribetnan Dami",
        role: "Special Presentation · Data Protection",
        talkTitle:
          "Data Protection in the AI Era: Privacy, Compliance & Safeguarding Enterprise Data",
        image: "/images/ribetnan-dami.jpg",
        initials: "RD",
      },
    ],
    stageNote:
      "Cue immediately as Samuel Yaula Dutse concludes to announce that Ribetnan Dami's presentation on Data Protection is next.",
  });

  // Special Presentation on Data Protection by Ribetnan Dami
  slides.push({
    id: "presentation-data-protection-ribetnan-dami",
    cueNumber: nextCue(),
    actId: "act-2-opening",
    actLabel: "Act II · Data Protection",
    kind: "speaker-walkon",
    timeSlot: "10:15 AM – 10:25 AM",
    badgeLabel: "SPECIAL PRESENTATION · DATA PROTECTION",
    title: "Ribetnan Dami",
    subtitle: "Data Protection Speaker · Special Presentation",
    talkTitle:
      "Data Protection in the AI Era: Privacy, Compliance & Safeguarding Enterprise Data",
    accent: "indigo",
    mediaUrl: "/images/ribetnan-dami.jpg",
    initials: "RD",
    stageNote:
      "Cue when Ribetnan Dami takes the stage to deliver his presentation on Data Protection.",
  });

  slides.push({
    id: "opening-agenda-overview",
    cueNumber: nextCue(),
    actId: "act-2-opening",
    actLabel: "Act II · Run of Show",
    kind: "agenda-overview",
    timeSlot: "10:20 AM WAT",
    badgeLabel: "26 NOVEMBER 2026 · FULL-DAY RUN OF SHOW",
    title: "Today's Programme at a Glance",
    subtitle: "Four signature sessions, startup showcases, and founder fireside chats",
    accent: "blue",
    stageNote: "Project while anchors transition into the 4 signature sessions.",
  });

  // =========================================================================
  // ACT III — 4 SESSIONS, IN-BETWEEN STARTUP VIDEOS & FIRESIDE CHAT
  // =========================================================================
  TECHFEST_SESSIONS.forEach((session, sIdx) => {
    const sessionNum = String(sIdx + 1).padStart(2, "0");

    // In-between Session 01 & Session 02: Startup Spotlight Video Showcase #1
    if (sIdx === 1) {
      slides.push({
        id: "startup-video-slot-1",
        cueNumber: nextCue(),
        actId: "act-3-sessions",
        actLabel: "Startup Spotlight #1",
        kind: "startup-video",
        timeSlot: "11:30 AM – 11:45 AM",
        badgeLabel: "ECOSYSTEM SPOTLIGHT #01 · DEVKINGS · AGRISYNC AI · LASKAD · BLUEHOUSE · AJECARS · AFRICA+",
        title: "Startup Ecosystem Spotlight",
        subtitle:
          "Highlighting Devkings, AgriSync AI, Laskad, Bluehouse, Ajecars & Africa+",
        accent: "emerald",
        mediaUrl: "/videos/landing.mp4",
        mediaType: "video",
        people: SPOTLIGHT_STARTUPS,
        stageNote:
          "Auto-cycles and highlights Devkings, AgriSync AI, Laskad, Bluehouse, Ajecars, and Africa+ alongside the spotlight video player.",
      });
    }

    // In-between Session 02 & Session 03: Midday Break + Startup Video #2 + Startup Fireside Chat
    if (sIdx === 2) {
      slides.push({
        id: "midday-break-hold",
        cueNumber: nextCue(),
        actId: "act-3-sessions",
        actLabel: "Midday Break",
        kind: "break-hold",
        timeSlot: "01:00 PM – 01:15 PM",
        badgeLabel: "MIDDAY NETWORKING & EXHIBITION BREAK",
        title: "Networking & Refreshment Break",
        subtitle: "Up Next: Startup Spotlight Reel & Founders Fireside Chat",
        accent: "emerald",
        stageNote: "Enable the stage countdown timer during the midday break.",
      });

      slides.push({
        id: "startup-video-slot-2",
        cueNumber: nextCue(),
        actId: "act-3-sessions",
        actLabel: "Startup Spotlight #2",
        kind: "startup-video",
        timeSlot: "01:15 PM – 01:25 PM",
        badgeLabel: "ECOSYSTEM SPOTLIGHT #02 · DEVKINGS · AGRISYNC AI · LASKAD · BLUEHOUSE · AJECARS · AFRICA+",
        title: "Featured Startup Product Reel",
        subtitle:
          "Showcasing Devkings, AgriSync AI, Laskad, Bluehouse, Ajecars & Africa+",
        accent: "indigo",
        mediaUrl: "/videos/landing.mp4",
        mediaType: "video",
        people: SPOTLIGHT_STARTUPS,
        stageNote:
          "Second startup spotlight slot highlighting Devkings, AgriSync AI, Laskad, Bluehouse, Ajecars, and Africa+ before the Founders Fireside Chat.",
      });

      // Startup Founders Fireside Chat
      slides.push({
        id: "startup-founders-fireside-chat",
        cueNumber: nextCue(),
        actId: "act-3-sessions",
        actLabel: "Fireside Chat",
        kind: "fireside-chat",
        timeSlot: "01:25 PM – 01:50 PM",
        badgeLabel: "LIVE STAGE · STARTUP FOUNDERS FIRESIDE CHAT",
        title: "Startup Founders Fireside Chat",
        subtitle:
          "Candid conversations with founders on building products, traction, and scaling startups",
        accent: "amber",
        people: [
          {
            id: "fireside-founder-1",
            name: "Featured Founder 01",
            role: "Startup Founder · Edit Name in Sidebar",
            talkTitle: "Building & Scaling from Zero to Market Traction",
            image: null,
            initials: "F1",
          },
          {
            id: "fireside-founder-2",
            name: "Featured Founder 02",
            role: "Startup Founder · Edit Name in Sidebar",
            talkTitle: "Product Innovation & Customer Growth",
            image: null,
            initials: "F2",
          },
          {
            id: "fireside-founder-3",
            name: "Featured Founder 03",
            role: "Startup Founder · Edit Name in Sidebar",
            talkTitle: "Navigating Talent, Funding & Ecosystem Support",
            image: null,
            initials: "F3",
          },
        ],
        stageNote:
          "Use the 'Edit Slide' panel on the right to type the exact names, startup names, and upload photos for the founders joining the Fireside Chat.",
      });
    }

    // In-between Session 03 & Session 04: Startup Spotlight Video Showcase #3
    if (sIdx === 3) {
      slides.push({
        id: "startup-video-slot-3",
        cueNumber: nextCue(),
        actId: "act-3-sessions",
        actLabel: "Startup Spotlight #3",
        kind: "startup-video",
        timeSlot: "03:00 PM – 03:10 PM",
        badgeLabel: "ECOSYSTEM SPOTLIGHT #03 · DEVKINGS · AGRISYNC AI · LASKAD · BLUEHOUSE · AJECARS · AFRICA+",
        title: "Ecosystem Startup Demo Spotlight",
        subtitle:
          "Featuring Devkings, AgriSync AI, Laskad, Bluehouse, Ajecars & Africa+",
        accent: "amber",
        mediaUrl: "/videos/landing.mp4",
        mediaType: "video",
        people: SPOTLIGHT_STARTUPS,
        stageNote:
          "Third startup spotlight slot highlighting Devkings, AgriSync AI, Laskad, Bluehouse, Ajecars, and Africa+ leading into Session 04.",
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

    // 2. Individual Speaker Walk-On Slides
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
    const sessionBriefing = SESSION_MODERATOR_BRIEFINGS.find(
      (b) => b.sessionId === session.id
    );
    slides.push({
      id: `session-panel-${session.id}`,
      cueNumber: nextCue(),
      actId: "act-3-sessions",
      actLabel: `Session ${sessionNum}`,
      kind: "panel-backdrop",
      timeSlot: session.time,
      badgeLabel: `LIVE PANEL & Q&A · SESSION ${sessionNum}`,
      title: `${session.title} — Panel & Q&A`,
      subtitle: sessionBriefing?.moderatorIntro || session.tagline,
      accent: session.accent,
      people: session.speakers.map((sp) => ({
        id: sp.id,
        name: sp.name,
        role: sp.role,
        talkTitle: sp.talkTitle,
        image: sp.image,
        initials: getPersonInitials(sp.name),
      })),
      panelQuestions: sessionBriefing?.questions || [],
      activeQuestionIndex: null,
      stageNote: `Hold on the LED wall during the panel. Use the Q1–Q4 buttons in the right sidebar to project the active panel question on the LED screen!`,
    });
  });

  // =========================================================================
  // ACT IV — OPEN DEMOS, MIXER & CLOSING (04:25 PM – 05:45 PM)
  // =========================================================================
  slides.push({
    id: "closing-open-demos",
    cueNumber: nextCue(),
    actId: "act-4-closing",
    actLabel: "Act IV · Demos",
    kind: "opening-bumper",
    timeSlot: "04:25 PM WAT",
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
    actLabel: "Act IV · Finale",
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
