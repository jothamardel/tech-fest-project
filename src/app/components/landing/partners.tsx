"use client";

import { motion } from "framer-motion";
import Image from "next/image";

/* ── Sponsor Tiers ────────────────────────────────────────────
   Headline (3) | Ecosystem Partners (6) | Community Hubs (8)
   ─────────────────────────────────────────────────────────── */
const headlineSponsors = [
  { src: "/images/partners.png",    alt: "Headline Sponsor" },
  { src: "/images/koenig.jpeg",     alt: "Koenig" },
  { src: "/images/openai.png",      alt: "OpenAI" },
];

const ecosystemPartners = [
  { src: "/images/partners2.png",       alt: "Ecosystem Partner" },
  { src: "/images/partners3.png",       alt: "Ecosystem Partner" },
  { src: "/images/partners5.png",       alt: "Ecosystem Partner" },
  { src: "/images/axiahub.png",         alt: "Axia Hub" },
  { src: "/images/clockchain.png",      alt: "Clockchain" },
  { src: "/images/partnerslogoi.png",   alt: "Partner" },
  // duplicate set for seamless loop
  { src: "/images/partners2.png",       alt: "Ecosystem Partner" },
  { src: "/images/partners3.png",       alt: "Ecosystem Partner" },
  { src: "/images/partners5.png",       alt: "Ecosystem Partner" },
  { src: "/images/axiahub.png",         alt: "Axia Hub" },
  { src: "/images/clockchain.png",      alt: "Clockchain" },
  { src: "/images/partnerslogoi.png",   alt: "Partner" },
];

const communityHubs = [
  { src: "/images/ahub.png",         alt: "AHub" },
  { src: "/images/boldimg.png",      alt: "Bold" },
  { src: "/images/logo-dark.png",    alt: "Community Hub" },
  { src: "/images/partners11.png",   alt: "Community Hub" },
  { src: "/images/Rimg.jpg",         alt: "Community Hub" },
  { src: "/images/partners8.png",    alt: "Community Hub" },
  { src: "/images/partners11..png",  alt: "Community Hub" },
  { src: "/images/axiahub.png",      alt: "Axia Hub" },
  // duplicate set for seamless loop
  { src: "/images/ahub.png",         alt: "AHub" },
  { src: "/images/boldimg.png",      alt: "Bold" },
  { src: "/images/logo-dark.png",    alt: "Community Hub" },
  { src: "/images/partners11.png",   alt: "Community Hub" },
  { src: "/images/Rimg.jpg",         alt: "Community Hub" },
  { src: "/images/partners8.png",    alt: "Community Hub" },
  { src: "/images/partners11..png",  alt: "Community Hub" },
  { src: "/images/axiahub.png",      alt: "Axia Hub" },
];

/* ── Logo card ────────────────────────────────────────────── */
function LogoCard({
  src,
  alt,
  size = "h-10",
}: {
  src: string;
  alt: string;
  size?: string;
}) {
  return (
    <div className="flex-shrink-0 mx-3 flex h-20 w-36 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 px-5 transition-all duration-300 hover:border-slate-700 hover:bg-slate-800/80 group">
      <Image
        src={src}
        alt={alt}
        width={120}
        height={48}
        className={`${size} w-auto object-contain logo-mono group-hover:filter-none transition-all duration-300`}
      />
    </div>
  );
}

export default function Partners() {
  return (
    <section
      id="sponsors"
      aria-labelledby="sponsors-heading"
      className="relative bg-slate-950 py-24 px-4 sm:px-6 overflow-hidden"
    >
      {/* Top border line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />

      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(99,102,241,0.05) 0%, transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl">

        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <span className="inline-block rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-emerald-400 mb-4">
            Backed By
          </span>
          <h2
            id="sponsors-heading"
            className="text-3xl sm:text-4xl font-black text-white tracking-tight"
          >
            Our Partners &amp; Sponsors
          </h2>
          <p className="mt-3 text-slate-400 max-w-lg mx-auto">
            Proud to be supported by forward-thinking organisations, innovators, and community champions.
          </p>
        </motion.div>

        {/* ── Tier 1: Headline Sponsors (static row) ──────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-slate-600 mb-6">
            Headline Sponsors
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {headlineSponsors.map((s, i) => (
              <div
                key={i}
                className="flex h-24 w-44 items-center justify-center rounded-2xl border border-slate-700/60 bg-slate-900 px-6 transition-all duration-300 hover:border-slate-600 hover:bg-slate-800/80 group"
              >
                <Image
                  src={s.src}
                  alt={s.alt}
                  width={140}
                  height={56}
                  className="h-12 w-auto object-contain logo-mono group-hover:filter-none transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Divider */}
        <div className="mb-10 h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />

        {/* ── Tier 2: Ecosystem Partners (marquee →) ──────────── */}
        <div className="mb-8">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-slate-600 mb-6">
            Ecosystem Partners
          </p>
          <div
            className="overflow-hidden relative"
            aria-label="Ecosystem partner logos"
          >
            {/* Fade edges */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16"
              style={{ background: "linear-gradient(to right, #020617, transparent)" }}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16"
              style={{ background: "linear-gradient(to left, #020617, transparent)" }}
            />

            <div className="flex animate-marquee">
              {ecosystemPartners.map((s, i) => (
                <LogoCard key={i} src={s.src} alt={s.alt} size="h-8" />
              ))}
            </div>
          </div>
        </div>

        {/* ── Tier 3: Community Hubs (marquee ←, slower) ──────── */}
        <div>
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-slate-600 mb-6">
            Community Hubs
          </p>
          <div
            className="overflow-hidden relative"
            aria-label="Community hub logos"
          >
            {/* Fade edges */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16"
              style={{ background: "linear-gradient(to right, #020617, transparent)" }}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16"
              style={{ background: "linear-gradient(to left, #020617, transparent)" }}
            />

            <div className="flex animate-marquee-reverse animate-marquee-slow">
              {communityHubs.map((s, i) => (
                <LogoCard key={i} src={s.src} alt={s.alt} size="h-6" />
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
