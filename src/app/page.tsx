import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jos TechFest 2026 — AI x Industry: Automating the Future of Work",
  description:
    "Join Africa's most energetic tech event. Two days of keynotes, workshops, networking, and hands-on sessions in Jos, Plateau State — 26 November 2026.",
};

import Hero from "./components/landing/hero";
import BentoGrid from "./components/landing/bento-grid";
import Gallery from "./components/landing/gallery";
import KeynoteSpeakers from "./components/landing/keySpeakers";
import Host from "./components/landing/host";
import Agenda from "./components/landing/agenda-review";
import Partners from "./components/landing/partners";
import Venue from "./components/landing/venue";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-slate-950 overflow-hidden">
      {/* Hero */}
      <Hero />

      {/* Bento Grid Highlights */}
      <BentoGrid />

      {/* Photo Gallery Strip */}
      <Gallery />

      {/* Keynote Speakers */}
      <KeynoteSpeakers />

      {/* Anchors / Hosts */}
      <Host />

      {/* Event Agenda */}
      <Agenda />

      {/* Sponsors & Partners */}
      <Partners />

      {/* Venue & Logistics */}
      <Venue />
    </div>
  );
}