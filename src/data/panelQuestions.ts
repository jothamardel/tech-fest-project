import type { SessionTrackId } from "./sessions";

export interface PanelQuestionItem {
  id: string;
  number: number;
  title: string;
  prompt: string;
  suggestedTiming: string;
  isAllPanelists?: boolean;
  defaultSpeakerNames: string[];
}

export interface SessionModeratorBriefing {
  sessionId: SessionTrackId;
  number: string;
  title: string;
  timeSlot: string;
  accent: "blue" | "emerald" | "indigo" | "amber";
  moderatorIntro: string;
  questions: PanelQuestionItem[];
}

export const MODERATOR_STAGE_FLOW_TIP =
  "Start each panel by asking Question 1 to the entire panel (giving each panelist 60–90 seconds for a punchy opening stance), then direct Questions 2–4 to specific panelists based on their background so the conversation feels dynamic rather than sequential.";

export const SESSION_MODERATOR_BRIEFINGS: SessionModeratorBriefing[] = [
  {
    sessionId: "ai-education",
    number: "01",
    title: "AI x Education",
    timeSlot: "10:25 AM – 11:30 AM WAT",
    accent: "blue",
    moderatorIntro:
      "In our opening remarks, we asked a critical question for every student and lecturer in this room: when AI can generate an essay or solve an equation in seconds, how should we actually teach and learn? With Nigerian universities actively rolling out institutional AI governance policies and the Federal Government pushing for digital accountability, education is at a crossroads. Let’s unpack how we move students from using AI for shortcuts to using it for deeper mastery.",
    questions: [
      {
        id: "ai-education-q1",
        number: 1,
        title: "Redefining Assessment",
        prompt:
          "If traditional take-home assignments and essays can be completed instantly by generative AI, how must Nigerian universities and secondary schools redesign exams to measure true comprehension rather than memorization?",
        suggestedTiming: "All Panelists · 60–90s each",
        isAllPanelists: true,
        defaultSpeakerNames: [
          "Engr. Christie Dasaro",
          "Dr. Adamu Usman",
          "Prof. Goselle Obed Nanjul",
        ],
      },
      {
        id: "ai-education-q2",
        number: 2,
        title: "Lecturers as Facilitators",
        prompt:
          "Many educators worry about AI eroding academic integrity, while others see it as a personal teaching assistant. What does a realistic, AI-enabled classroom look like in Plateau State today—especially given real-world constraints like bandwidth and power?",
        suggestedTiming: "Targeted Discussion · 3–4 mins",
        defaultSpeakerNames: ["Dr. Adamu Usman", "Prof. Goselle Obed Nanjul"],
      },
      {
        id: "ai-education-q3",
        number: 3,
        title: "Curriculum vs. Industry Speed",
        prompt:
          "Tech evolves every quarter, while university curricula take years to review. What core foundational skills should students double down on right now so they remain employable in an AI-driven market?",
        suggestedTiming: "Targeted Discussion · 3–4 mins",
        defaultSpeakerNames: [
          "Engr. Christie Dasaro",
          "Prof. Goselle Obed Nanjul",
        ],
      },
      {
        id: "ai-education-q4",
        number: 4,
        title: "Bridging the Access Gap",
        prompt:
          "How do we ensure AI becomes an equalizer for students in public and rural institutions rather than widening the divide between those who can afford paid AI tools and those who cannot?",
        suggestedTiming: "Closing Takeaway · 3–4 mins",
        defaultSpeakerNames: ["Engr. Christie Dasaro", "Dr. Adamu Usman"],
      },
    ],
  },
  {
    sessionId: "ai-business",
    number: "02",
    title: "AI x Business",
    timeSlot: "11:45 AM – 01:00 PM WAT",
    accent: "emerald",
    moderatorIntro:
      "Earlier, we talked about the heavy lifting slowing local businesses down—repetitive customer inquiries, manual follow-ups, and operational bottlenecks. Across Nigeria in 2026, businesses are moving past the hype and deploying AI directly into customer service, logistics, and finance. In this session, we’re focusing on ROI: how SMEs and enterprises can use AI to cut costs, serve customers faster, and scale without bloating overhead.",
    questions: [
      {
        id: "ai-business-q1",
        number: 1,
        title: "Low-Hanging Fruit for SMEs",
        prompt:
          "For a local business owner in Jos with a lean team and a tight budget, what is the single highest-ROI workflow they should automate first—and what mistakes do businesses make when they try to automate too much too soon?",
        suggestedTiming: "All Panelists · 60–90s each",
        isAllPanelists: true,
        defaultSpeakerNames: [
          "Mr. Nnamdi Ibe",
          "Mr. Ibrahim Jimoh",
          "Moses Amama",
          "Jennifer Turay",
        ],
      },
      {
        id: "ai-business-q2",
        number: 2,
        title: "Trust & The Human Touch",
        prompt:
          "Nigerian customers value personal relationships and trust, especially when money or orders are involved. Where do you draw the line between AI automation (like WhatsApp bots) and human intervention?",
        suggestedTiming: "Targeted Discussion · 3–4 mins",
        defaultSpeakerNames: ["Jennifer Turay", "Moses Amama"],
      },
      {
        id: "ai-business-q3",
        number: 3,
        title: "The Data Readiness Problem",
        prompt:
          "AI is only as smart as the business data behind it, yet many local businesses still run on scattered spreadsheets, paper receipts, or informal voice notes. How does a business clean up its operations enough to actually benefit from AI?",
        suggestedTiming: "Targeted Discussion · 3–4 mins",
        defaultSpeakerNames: ["Mr. Ibrahim Jimoh", "Mr. Nnamdi Ibe"],
      },
      {
        id: "ai-business-q4",
        number: 4,
        title: "Build vs. Buy",
        prompt:
          "With affordable APIs and off-the-shelf SaaS tools everywhere, when should a growing Nigerian company simply subscribe to existing AI tools versus investing in custom-built internal systems?",
        suggestedTiming: "Closing Takeaway · 3–4 mins",
        defaultSpeakerNames: ["Mr. Nnamdi Ibe", "Moses Amama"],
      },
    ],
  },
  {
    sessionId: "ai-creatives",
    number: "03",
    title: "AI x Creatives",
    timeSlot: "01:50 PM – 03:00 PM WAT",
    accent: "indigo",
    moderatorIntro:
      "We mentioned earlier that AI is transforming our creative and entertainment landscape—and while the tools are incredible, they demand a serious conversation about ownership. From music production and filmmaking to graphic design and storytelling, AI is lowering production barriers while raising tough questions about originality. Let’s explore how Northern Nigerian creatives can own this wave rather than get swept away by it.",
    questions: [
      {
        id: "ai-creatives-q1",
        number: 1,
        title: "Tool vs. Replacement",
        prompt:
          "Walk us through your actual creative workflow right now—where does AI genuinely speed up ideation or production, and where does it still fail to capture human emotion and cultural nuance?",
        suggestedTiming: "All Panelists · 60–90s each",
        isAllPanelists: true,
        defaultSpeakerNames: [
          "Mr. Christopher Haruna",
          "Jethro Da'ar",
          "Timothy Kunat",
          "David Enyi",
        ],
      },
      {
        id: "ai-creatives-q2",
        number: 2,
        title: "Cultural Authenticity & Local Data",
        prompt:
          "Global AI models often default to Western aesthetics, accents, and tropes. How can Nigerian filmmakers, musicians, and visual artists train, prompt, or fine-tune these tools to tell authentic Plateau and Northern Nigerian stories?",
        suggestedTiming: "Targeted Discussion · 3–4 mins",
        defaultSpeakerNames: ["Jethro Da'ar", "Mr. Christopher Haruna"],
      },
      {
        id: "ai-creatives-q3",
        number: 3,
        title: "Copyright, Style, and Ethics",
        prompt:
          "When AI models are trained on existing music, art, and photography without explicit consent, how should creatives protect their intellectual property—and how do we separate genuine artistry from low-effort \"AI slop\"?",
        suggestedTiming: "Targeted Discussion · 3–4 mins",
        defaultSpeakerNames: ["Mr. Christopher Haruna", "Timothy Kunat"],
      },
      {
        id: "ai-creatives-q4",
        number: 4,
        title: "New Revenue Models",
        prompt:
          "With generative tools allowing a solo creator to do the work of a small studio, what new commercial opportunities—like localized animation, gaming assets, or branded content—are opening up for creatives who adapt early?",
        suggestedTiming: "Closing Takeaway · 3–4 mins",
        defaultSpeakerNames: ["David Enyi", "Timothy Kunat"],
      },
    ],
  },
  {
    sessionId: "startup-ecosystem-policy",
    number: "04",
    title: "Startup Ecosystem and Policy",
    timeSlot: "03:10 PM – 04:25 PM WAT",
    accent: "amber",
    moderatorIntro:
      "To close the gap between curiosity and real economic value for Plateau State and Nigeria, founders and policymakers have to build in sync. With Nigeria’s National AI Strategy phasing in, multilingual models like N-ATLAS emerging, and state-level agencies like PICTDA championing innovation, the pieces are on the table. This panel asks: what will it take to turn Jos into a powerhouse for homegrown AI startups?",
    questions: [
      {
        id: "startup-ecosystem-policy-q1",
        number: 1,
        title: "From Wrappers to Deep Local Value",
        prompt:
          "Investors are increasingly skeptical of startups that are just thin wrappers around foreign APIs. What defensible, locally grounded AI problems—in agriculture, healthcare, fintech, or civic tech—give Nigerian founders an unfair advantage?",
        suggestedTiming: "All Panelists · 60–90s each",
        isAllPanelists: true,
        defaultSpeakerNames: [
          "Mr. Theodore Longji",
          "Mr. Bashir Sheidu",
          "Mr. Stephen Kusu",
          "Mr. Sheneni Tukura",
        ],
      },
      {
        id: "startup-ecosystem-policy-q2",
        number: 2,
        title: "Regulation Without Stifling Innovation",
        prompt:
          "As Nigeria moves from voluntary AI frameworks toward formal legislation and data protection enforcement under the NDPA, how can policymakers protect citizens from AI-driven fraud and data misuse without creating compliance hurdles that crush early-stage startups?",
        suggestedTiming: "Targeted Discussion · 3–4 mins",
        defaultSpeakerNames: ["Mr. Bashir Sheidu", "Mr. Sheneni Tukura"],
      },
      {
        id: "startup-ecosystem-policy-q3",
        number: 3,
        title: "Compute, Connectivity, and Talent",
        prompt:
          "Compute costs and infrastructure remain major bottlenecks for African AI builders. Beyond hackathons and training bootcamps, what concrete infrastructure or public-private partnerships (between agencies like PICTDA, hubs, and telcos) are needed right now?",
        suggestedTiming: "Targeted Discussion · 3–4 mins",
        defaultSpeakerNames: ["Mr. Theodore Longji", "Mr. Stephen Kusu"],
      },
      {
        id: "startup-ecosystem-policy-q4",
        number: 4,
        title: "The \"Jos Advantage\"",
        prompt:
          "Founders in Jos benefit from lower burn rates and a tight-knit tech community compared to Lagos or Abuja. How do we convert that cost and community advantage into scalable startups that attract national and global venture capital?",
        suggestedTiming: "Closing Takeaway · 3–4 mins",
        defaultSpeakerNames: ["Mr. Stephen Kusu", "Mr. Theodore Longji"],
      },
    ],
  },
];
