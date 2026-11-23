export type SessionTrackId =
  | "ai-education"
  | "ai-business"
  | "ai-creatives"
  | "startup-ecosystem-policy";

export interface SessionSpeaker {
  id: string;
  name: string;
  role: string;
  talkTitle: string;
  image: string | null;
  sessionId: SessionTrackId;
  sessionLabel: string;
}

export interface EventAnchor {
  id: string;
  name: string;
  role: string;
  image: string | null;
}

export interface EventSession {
  id: SessionTrackId;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  day: string;
  time: string;
  stage: string;
  accent: "blue" | "emerald" | "indigo" | "amber";
  highlights: string[];
  speakers: SessionSpeaker[];
}

export function getPersonInitials(name: string): string {
  const cleaned = name
    .replace(/^(Mr\.|Mrs\.|Ms\.|Dr\.|Prof\.|Engr\.)\s+/i, "")
    .trim();
  const parts = cleaned.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "TF";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export const TECHFEST_SESSIONS: EventSession[] = [
  {
    id: "ai-education",
    title: "AI x Education",
    shortTitle: "Education",
    tagline: "Reimagining Learning, Research & Academic Excellence",
    description:
      "Exploring how generative AI, adaptive tutoring systems, and intelligent research workflows are transforming classrooms, universities, and talent pipelines across Africa.",
    day: "26 Nov 2026",
    time: "10:15 AM – 11:30 AM",
    stage: "Main Auditorium · Session 01",
    accent: "blue",
    highlights: [
      "Personalized AI Learning & EdTech",
      "Academic Research Acceleration",
      "Future-Ready Curriculum Design",
      "Digital Literacy & Campus Innovation",
    ],
    speakers: [
      {
        id: "christie-dasaro",
        name: "Engr. Christie Dasaro",
        role: "Speaker · AI x Education",
        talkTitle: "Engineering Intelligent Learning Systems & STEM Pathways",
        image: "/images/Chriatie.jpg",
        sessionId: "ai-education",
        sessionLabel: "AI x Education",
      },
      {
        id: "adamu-usman",
        name: "Dr. Adamu Usman",
        role: "Speaker · AI x Education",
        talkTitle: "Adaptive Classrooms & Next-Gen Academic Research",
        image: "/images/jtf-36.jpg",
        sessionId: "ai-education",
        sessionLabel: "AI x Education",
      },
      {
        id: "goselle-obed-nanjul",
        name: "Prof. Goselle Obed Nanjul",
        role: "Speaker · AI x Education",
        talkTitle: "AI-Driven Research & Institutional Transformation",
        image: "/images/Gosale.jpg",
        sessionId: "ai-education",
        sessionLabel: "AI x Education",
      },
    ],
  },
  {
    id: "ai-business",
    title: "AI x Business",
    shortTitle: "Business",
    tagline: "Scaling Enterprises, Autonomous Workflows & Market Leadership",
    description:
      "Actionable playbooks for founders, executives, and operators using AI agents, predictive analytics, and intelligent automation to build resilient, high-growth African enterprises.",
    day: "26 Nov 2026",
    time: "11:45 AM – 1:00 PM",
    stage: "Main Auditorium · Session 02",
    accent: "emerald",
    highlights: [
      "Autonomous Enterprise Workflows",
      "Startup Velocity & AI Business Models",
      "FinTech, Operations & Customer Intelligence",
      "ROI, Governance & Responsible Deployment",
    ],
    speakers: [
      {
        id: "nnamdi-ibe",
        name: "Mr. Nnamdi Ibe",
        role: "Speaker · AI x Business",
        talkTitle: "AI-First Product Strategy for African Markets",
        image: "/images/nnamdi.jpg",
        sessionId: "ai-business",
        sessionLabel: "AI x Business",
      },
      {
        id: "ibrahim-jimoh",
        name: "Mr. Ibrahim Jimoh",
        role: "Speaker · AI x Business",
        talkTitle: "Scaling Operations & Enterprise Intelligence with AI",
        image: "/images/ibrahim-jimoh.jpg",
        sessionId: "ai-business",
        sessionLabel: "AI x Business",
      },
      {
        id: "moses-amama",
        name: "Moses Amama",
        role: "Speaker · AI x Business",
        talkTitle: "Autonomous Workflows & High-Leverage Business Growth",
        image: "/images/Mo.jpg",
        sessionId: "ai-business",
        sessionLabel: "AI x Business",
      },
      {
        id: "jennifer-turay",
        name: "Jennifer Turay",
        role: "Speaker · AI x Business",
        talkTitle: "Customer Intelligence & Market Expansion in the AI Era",
        image: "/images/jennifer-turay.jpg",
        sessionId: "ai-business",
        sessionLabel: "AI x Business",
      },
    ],
  },
  {
    id: "ai-creatives",
    title: "AI x Creatives",
    shortTitle: "Creatives",
    tagline: "Generative Media, Design Systems & The New Creative Economy",
    description:
      "Where human imagination meets machine craft — discover how designers, filmmakers, storytellers, and brand builders are co-creating with generative visual, audio, and motion tools.",
    day: "26 Nov 2026",
    time: "1:30 PM – 2:45 PM",
    stage: "Main Auditorium · Session 03",
    accent: "indigo",
    highlights: [
      "Generative Visuals, Motion & Film",
      "AI-Augmented Product & Brand Design",
      "Storytelling, Sound & Interactive Media",
      "Monetization & IP in the Creative Economy",
    ],
    speakers: [
      {
        id: "christopher-haruna",
        name: "Mr. Christopher Haruna",
        role: "Speaker · AI x Creatives",
        talkTitle: "Creative Direction & Generative Production Workflows",
        image: "/images/christopher-haruna.jpg",
        sessionId: "ai-creatives",
        sessionLabel: "AI x Creatives",
      },
      {
        id: "jethro-daar",
        name: "Jethro Da'ar",
        role: "Speaker · AI x Creatives",
        talkTitle: "Visual Craft, Brand Worlds & AI Storytelling",
        image: "/images/jethro-daar.jpg",
        sessionId: "ai-creatives",
        sessionLabel: "AI x Creatives",
      },
      {
        id: "timothy-kunat",
        name: "Timothy Kunat",
        role: "Speaker · AI x Creatives",
        talkTitle: "Next-Gen Media & Interactive Creative Systems",
        image: "/images/timothy-kunat.jpg",
        sessionId: "ai-creatives",
        sessionLabel: "AI x Creatives",
      },
      {
        id: "david-enyi",
        name: "David Enyi",
        role: "Speaker · AI x Creatives",
        talkTitle: "Designing Expressive Digital Experiences with AI",
        image: "/images/dav.jpg",
        sessionId: "ai-creatives",
        sessionLabel: "AI x Creatives",
      },
    ],
  },
  {
    id: "startup-ecosystem-policy",
    title: "Startup Ecosystem & Policy",
    shortTitle: "Ecosystem & Policy",
    tagline: "Regulation, Venture Capital, Digital Infrastructure & Innovation Policy",
    description:
      "Unpacking the policy frameworks, public-private partnerships, funding pathways, and founder ecosystems needed to accelerate sustainable technology growth across Plateau State and Nigeria.",
    day: "26 Nov 2026",
    time: "3:00 PM – 4:15 PM",
    stage: "Main Auditorium · Session 04",
    accent: "amber",
    highlights: [
      "Startup Act & Regulatory Frameworks",
      "Ecosystem Funding & Venture Readiness",
      "Public-Private Digital Infrastructure",
      "Talent Retention & Regional Innovation Hubs",
    ],
    speakers: [
      {
        id: "theodore-longji",
        name: "Mr. Theodore Longji",
        role: "Speaker · Startup Ecosystem & Policy",
        talkTitle: "Building Sustainable Regional Startup Ecosystems",
        image: "/images/theodore-longji.jpg",
        sessionId: "startup-ecosystem-policy",
        sessionLabel: "Startup Ecosystem & Policy",
      },
      {
        id: "bashir-sheidu",
        name: "Mr. Bashir Sheidu",
        role: "Speaker · Startup Ecosystem & Policy",
        talkTitle: "Policy Enablement & Digital Economy Growth",
        image: "/images/bashir-sheidu.jpg",
        sessionId: "startup-ecosystem-policy",
        sessionLabel: "Startup Ecosystem & Policy",
      },
      {
        id: "stephen-kusu",
        name: "Mr. Stephen Kusu",
        role: "Speaker · Startup Ecosystem & Policy",
        talkTitle: "Founder Support Systems & Venture Pathways",
        image: "/images/stephen-kusu.jpg",
        sessionId: "startup-ecosystem-policy",
        sessionLabel: "Startup Ecosystem & Policy",
      },
      {
        id: "sheneni-tukura",
        name: "Mr. Sheneni Tukura",
        role: "Speaker · Startup Ecosystem & Policy",
        talkTitle: "Institutional Collaboration & Tech Governance",
        image: "/images/sheneni-tukura.jpg",
        sessionId: "startup-ecosystem-policy",
        sessionLabel: "Startup Ecosystem & Policy",
      },
    ],
  },
];

export const SPECIAL_STAGE_SPEAKERS: SessionSpeaker[] = [
  {
    id: "mbiplang-ardel",
    name: "Mbiplang Ardel",
    role: "Lead Convener · Opening Speech",
    talkTitle:
      "Opening Speech: Unlocking AI for Every Sector & Building Plateau's Innovation Ecosystem",
    image: "/images/mbi.jpg",
    sessionId: "ai-business",
    sessionLabel: "Opening Speech",
  },
  {
    id: "dominic-datong",
    name: "Engr. Dominic Datong",
    role: "DG, PICTDA · Official Keynote Address",
    talkTitle:
      "Keynote Address: Advancing Digital Governance, Public-Private Innovation & AI Readiness",
    image: "/images/dominic-datong.jpg",
    sessionId: "startup-ecosystem-policy",
    sessionLabel: "Keynote Address",
  },
  {
    id: "samuel-yaula-dutse",
    name: "Samuel Yaula Dutse",
    role: "Special Presentation · AI RAG for Businesses",
    talkTitle:
      "AI RAG for Businesses: Deploying Retrieval-Augmented Generation on Private Enterprise Data",
    image: "/images/samuel-dutse.jpg",
    sessionId: "ai-business",
    sessionLabel: "AI RAG for Businesses",
  },
];

export const ALL_SESSION_SPEAKERS: SessionSpeaker[] = [
  ...SPECIAL_STAGE_SPEAKERS,
  ...TECHFEST_SESSIONS.flatMap((session) => session.speakers),
];

export const CONFIRMED_IMAGE_SPEAKERS: Array<
  SessionSpeaker & { image: string }
> = ALL_SESSION_SPEAKERS.filter(
  (speaker): speaker is SessionSpeaker & { image: string } =>
    speaker.image !== null
);

export const TECHFEST_ANCHORS: EventAnchor[] = [
  {
    id: "samuel-adebayo",
    name: "Samuel Adebayo",
    role: "Event Anchor",
    image: "/images/ancor7.jpg",
  },
  {
    id: "judith-nyior",
    name: "Judith Nyior",
    role: "Event Anchor",
    image: "/images/ancor6.jpg",
  },
  {
    id: "anna",
    name: "Anna Agbolade",
    role: "Event Anchor",
    image: "/images/anna-agbolade.jpg",
  },
];
