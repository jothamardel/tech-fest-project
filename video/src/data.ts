export type FrameSession = {
  number: string;
  title: string;
  time: string;
  accentColor: string;
  accentBg: string;
  accentBorder: string;
  speakers: {
    name: string;
    initials: string;
    image: string | null;
  }[];
};

export const VIDEO_SESSIONS: FrameSession[] = [
  {
    number: "01",
    title: "AI x Education",
    time: "09:30 – 11:00 WAT",
    accentColor: "#60a5fa",
    accentBg: "rgba(37, 99, 235, 0.16)",
    accentBorder: "rgba(96, 165, 250, 0.45)",
    speakers: [
      { name: "Engr. Christie Dasaro", initials: "CD", image: "images/Chriatie.jpg" },
      { name: "Dr. Adamu Usman", initials: "AU", image: "images/jtf-36.jpg" },
      { name: "Prof. Goselle Obed Nanjul", initials: "GN", image: "images/Gosale.jpg" },
      { name: "Gupar Hosea", initials: "GH", image: "images/gupar-hosea.jpg" },
    ],
  },
  {
    number: "02",
    title: "AI x Business",
    time: "11:15 – 12:45 WAT",
    accentColor: "#34d399",
    accentBg: "rgba(16, 185, 129, 0.16)",
    accentBorder: "rgba(52, 211, 153, 0.45)",
    speakers: [
      { name: "Mr. Nnamdi Ibe", initials: "NI", image: "images/nnamdi.jpg" },
      { name: "Mr. Ibrahim Jimoh", initials: "IJ", image: "images/ibrahim-jimoh.jpg" },
      { name: "Moses Amama", initials: "MA", image: "images/Mo.jpg" },
      { name: "Jennifer Turay", initials: "JT", image: "images/jennifer-turay.jpg" },
      { name: "Emmanuel Odanye", initials: "EO", image: "images/emmanuel-odanye.jpg" },
    ],
  },
  {
    number: "03",
    title: "AI x Creatives",
    time: "13:45 – 15:15 WAT",
    accentColor: "#818cf8",
    accentBg: "rgba(99, 102, 241, 0.16)",
    accentBorder: "rgba(129, 140, 248, 0.45)",
    speakers: [
      { name: "Mr. Christopher Haruna", initials: "CH", image: "images/christopher-haruna.jpg" },
      { name: "Jethro Da'ar", initials: "JD", image: "images/jethro-daar.jpg" },
      { name: "Timothy Kunat", initials: "TK", image: "images/timothy-kunat.jpg" },
      { name: "David Enyi", initials: "DE", image: "images/dav.jpg" },
    ],
  },
  {
    number: "04",
    title: "Startup Ecosystem & Policy",
    time: "15:30 – 17:00 WAT",
    accentColor: "#fbbf24",
    accentBg: "rgba(245, 158, 11, 0.16)",
    accentBorder: "rgba(251, 191, 36, 0.45)",
    speakers: [
      { name: "Mr. Theodore Longji", initials: "TL", image: "images/theodore-longji.jpg" },
      { name: "Mr. Bashir Sheidu", initials: "BS", image: "images/bashir-sheidu.jpg" },
      { name: "Mr. Stephen Kusu", initials: "SK", image: "images/stephen-kusu.jpg" },
      { name: "Mr. Sheneni Tukura", initials: "ST", image: "images/sheneni-tukura.jpg" },
    ],
  },
];

export const VIDEO_ANCHORS: {
  name: string;
  role: string;
  initials: string;
  image: string | null;
}[] = [
  { name: "Samuel Adebayo", role: "Event Anchor", initials: "SA", image: "images/ancor7.jpg" },
  { name: "Tamimia Esther Nuhu", role: "Event Anchor", initials: "TN", image: "images/tamimia-nuhu.jpg" },
  { name: "Anna Agbolade", role: "Event Anchor", initials: "AA", image: "images/anna-agbolade.jpg" },
  { name: "Salihu Malone", role: "Event Anchor", initials: "SM", image: "images/salihu-malone.jpg" },
];
