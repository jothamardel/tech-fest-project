"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Users, Coffee, Layers } from "lucide-react";

/* ── Animation helpers ───────────────────────────────────── */
const cardVariant = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] },
  },
});

/* ── Speaker data ────────────────────────────────────────── */
const speakers = [
  { name: "Mr. David Daser",             role: "Speaker", image: "/images/Daser.jpg" },
  { name: "Oluwafunmilayo Para Mallam",  role: "Speaker", image: "/images/Funmi.jpg" },
  { name: "Prof. Goselle Obed Nanjul",   role: "Speaker", image: "/images/Gosale.jpg" },
  { name: "Engr. Christie Dasaro",       role: "Speaker", image: "/images/Chriatie.jpg" },
  { name: "Ardel Mbiplang",             role: "Speaker", image: "/images/mbi.jpg" },
  { name: "Uduma Glory",                role: "Speaker", image: "/images/speaker.jpg" },
];

/* ── Tags ──────────────────────────────────────────────── */
const sessionTags = ["AI Keynote", "Product", "Web3", "Startup Growth", "Future of Work"];

const workshopTracks = [
  { label: "AI / ML Engineering", color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
  { label: "Web3 & Blockchain",   color: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30" },
  { label: "Product Design",      color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
  { label: "Cloud DevOps",        color: "bg-slate-700 text-slate-300 border-slate-600" },
];

const mixerFeatures = [
  { icon: Users,  label: "Community Roundtables",     sub: "Curated peer circles by domain" },
  { icon: Coffee, label: "Coffee & Tea Meetups",       sub: "Informal breakouts, open agenda" },
  { icon: Layers, label: "Open Builder Lounges",       sub: "Co-working space & demo tables" },
];

/* ── Previous event HD image (Google Drive) ─────────────── */
const PREV_EVENT_IMG =
  "https://lh3.googleusercontent.com/d/1ZMrYAMeAjZdj81gULy_9ShrLuQyO2EVo";

export default function BentoGrid() {
  return (
    <section
      id="highlights"
      aria-labelledby="bento-heading"
      className="relative bg-slate-950 py-24 px-4 sm:px-6 overflow-hidden"
    >
      {/* Subtle section glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 60%, rgba(59,130,246,0.06) 0%, transparent 65%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <span className="inline-block rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-blue-400 mb-4">
            Event Highlights
          </span>
          <h2
            id="bento-heading"
            className="text-4xl sm:text-5xl font-black text-white tracking-tight"
          >
            Everything You Need to Know
          </h2>
          <p className="mt-4 text-slate-400 max-w-xl mx-auto">
            Two days. Six speakers. Dozens of builders. One unmissable event.
          </p>
        </motion.div>

        {/* ── Bento Grid ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 auto-rows-[minmax(220px,auto)]">

          {/* ── Card 1: Keynote Stage (col-span-2 row-span-2) ─────── */}
          <motion.article
            variants={cardVariant(0)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            aria-label="Keynote Stage"
            className="bento-card relative md:col-span-2 md:row-span-2 group"
          >
            {/* Speaker image grid */}
            <div className="absolute inset-0 grid grid-cols-3 gap-0.5">
              {speakers.slice(0, 3).map((s, i) => (
                <div key={i} className="relative overflow-hidden">
                  <Image
                    src={s.image}
                    alt={s.name}
                    fill
                    sizes="(max-width:768px) 33vw, 20vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>

            {/* Gradient overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(2,6,23,0.97) 0%, rgba(2,6,23,0.5) 45%, rgba(2,6,23,0.1) 100%)",
              }}
            />

            {/* Content */}
            <div className="relative z-10 flex h-full flex-col justify-end p-6">
              {/* Tag */}
              <span className="mb-3 inline-block self-start rounded-full border border-blue-500/40 bg-blue-500/15 px-3 py-1 text-xs font-semibold tracking-wide text-blue-300">
                🎤 Keynote Stage
              </span>

              <h3 className="text-2xl font-bold text-white leading-tight">
                World-Class Speakers
              </h3>
              <p className="mt-2 text-sm text-slate-400">
                Six visionary leaders sharing ideas to shape the future of technology and industry in Africa.
              </p>

              {/* Speaker avatar row */}
              <div className="mt-4 flex items-center gap-3">
                <div className="flex -space-x-2">
                  {speakers.map((s, i) => (
                    <div
                      key={i}
                      className="relative h-8 w-8 overflow-hidden rounded-full ring-2 ring-slate-950 border border-blue-500/60"
                      title={s.name}
                    >
                      <Image
                        src={s.image}
                        alt={s.name}
                        fill
                        sizes="32px"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
                <span className="text-sm text-slate-400">
                  {speakers.length} confirmed speakers
                </span>
              </div>

              {/* Session tags */}
              <div className="mt-4 flex flex-wrap gap-2">
                {sessionTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-slate-700 bg-slate-800/60 px-2.5 py-0.5 text-xs text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <Link
                href="/speakers"
                className="mt-5 self-start text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center gap-1"
                aria-label="View all speakers"
              >
                View all speakers →
              </Link>
            </div>
          </motion.article>

          {/* ── Card 2: Previous Event Highlight (col-span-2) ─────── */}
          <motion.article
            variants={cardVariant(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            aria-label="Previous Event Highlight"
            className="bento-card relative md:col-span-2 group overflow-hidden"
          >
            {/* Full-bleed image */}
            <img
              src={PREV_EVENT_IMG}
              alt="TechFest previous edition — over 500 builders gathered at Sarau Event Center, Jos"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Gradient overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(2,6,23,1) 0%, rgba(2,6,23,0.4) 50%, transparent 100%)",
              }}
            />

            {/* Content */}
            <div className="relative z-10 flex h-full flex-col justify-end p-6">
              {/* Stats badge */}
              <div className="mb-3 self-start flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/15 px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-semibold text-emerald-400">500+ Builders</span>
              </div>

              <h3 className="text-xl font-bold text-white">Previous Edition Highlights</h3>
              <p className="mt-1 text-sm text-slate-400">
                Relive the energy, connections, and moments that made TechFest unforgettable.
              </p>

              <Link
                href="/galleries"
                className="mt-4 self-start text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors inline-flex items-center gap-1"
                aria-label="View photo archive from previous TechFest editions"
              >
                View photo archive →
              </Link>
            </div>
          </motion.article>

          {/* ── Card 3: Labs & Workshops (col-span-1) ─────────────── */}
          <motion.article
            variants={cardVariant(0.2)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            aria-label="Hands-on Labs and Workshops"
            className="bento-card relative p-6 flex flex-col justify-between"
          >
            {/* Glow accent */}
            <div
              aria-hidden="true"
              className="absolute -top-8 -right-8 h-32 w-32 rounded-full opacity-20"
              style={{
                background: "radial-gradient(circle, rgba(99,102,241,0.6) 0%, transparent 70%)",
              }}
            />

            <div>
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-indigo-500/30 bg-indigo-500/10">
                <span aria-hidden="true" className="text-xl">⚗️</span>
              </div>
              <h3 className="text-lg font-bold text-white">Labs &amp; Workshops</h3>
              <p className="mt-2 text-sm text-slate-400">
                Guided hands-on sessions — bring your laptop and leave with a build.
              </p>
            </div>

            <div className="mt-5 flex flex-col gap-2">
              {workshopTracks.map(({ label, color }) => (
                <span
                  key={label}
                  className={`inline-flex self-start rounded-full border px-3 py-1 text-xs font-medium ${color}`}
                >
                  {label}
                </span>
              ))}
            </div>
          </motion.article>

          {/* ── Card 4: Venue & Logistics (col-span-1) ─────────────── */}
          <motion.article
            variants={cardVariant(0.3)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            aria-label="Venue and Logistics"
            className="bento-card relative p-6 flex flex-col justify-between"
          >
            {/* Glow accent */}
            <div
              aria-hidden="true"
              className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full opacity-15"
              style={{
                background: "radial-gradient(circle, rgba(16,185,129,0.5) 0%, transparent 70%)",
              }}
            />

            <div>
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-blue-500/30 bg-blue-500/10">
                <MapPin className="h-5 w-5 text-blue-400" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold text-white">Venue &amp; Logistics</h3>
              <address className="mt-2 not-italic text-sm text-slate-400 leading-relaxed">
                Sarau Event Center<br />
                Jos, Plateau State<br />
                Nigeria
              </address>
            </div>

            <div className="mt-5 flex flex-col gap-2">
              <a
                href="https://www.google.com/maps?q=9.8965,8.8583"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Sarau Event Center on Google Maps"
                className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
              >
                View on Google Maps →
              </a>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=9.8965,8.8583"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Get driving directions to Sarau Event Center"
                className="text-sm text-slate-500 hover:text-slate-300 transition-colors"
              >
                Get directions
              </a>
            </div>
          </motion.article>

          {/* ── Card 5: Networking & Builder Mixer (col-span-2) ────── */}
          <motion.article
            variants={cardVariant(0.4)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            aria-label="Networking and Builder Mixer"
            className="bento-card relative md:col-span-2 p-6 flex flex-col justify-between overflow-hidden"
          >
            {/* Background grid texture */}
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(148,163,184,1) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />

            {/* Glow */}
            <div
              aria-hidden="true"
              className="absolute -right-10 top-1/2 -translate-y-1/2 h-48 w-48 rounded-full opacity-10"
              style={{
                background: "radial-gradient(circle, rgba(59,130,246,0.8) 0%, transparent 70%)",
              }}
            />

            <div className="relative">
              {/* Founder badge */}
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400 mb-4">
                🤝 For CEOs, CTOs &amp; Founders
              </span>

              <h3 className="text-xl font-bold text-white">
                Networking &amp; Builder Mixer
              </h3>
              <p className="mt-2 text-sm text-slate-400 max-w-md">
                Curated connection experiences designed to spark collabs, partnerships, and friendships that outlast the event.
              </p>
            </div>

            {/* Features */}
            <div className="relative mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {mixerFeatures.map(({ icon: Icon, label, sub }) => (
                <div
                  key={label}
                  className="flex flex-col gap-2 rounded-xl border border-slate-800 bg-slate-900/40 p-4"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <Icon className="h-4 w-4 text-blue-400" aria-hidden="true" />
                  </div>
                  <span className="text-sm font-semibold text-slate-200">{label}</span>
                  <span className="text-xs text-slate-500">{sub}</span>
                </div>
              ))}
            </div>
          </motion.article>

        </div>
      </div>
    </section>
  );
}
