"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";

/* ── Framer Motion variants ──────────────────────────────────── */
const fadeDown = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] } },
});

const fadeUp = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] } },
});

export default function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-headline"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950"
    >
      {/* ── Ambient radial glows (Cruip-style) ─────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* Blue glow — top-centre */}
        <div
          className="absolute left-1/2 top-0 -translate-x-1/2 h-[600px] w-[900px] rounded-full opacity-30"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.35) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        {/* Emerald glow — bottom-right */}
        <div
          className="absolute -bottom-20 right-0 h-[400px] w-[600px] opacity-20"
          style={{
            background:
              "radial-gradient(ellipse at 80% 100%, rgba(16,185,129,0.4) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        {/* Indigo glow — left */}
        <div
          className="absolute -left-20 top-1/2 -translate-y-1/2 h-[400px] w-[500px] opacity-15"
          style={{
            background:
              "radial-gradient(ellipse at 0% 50%, rgba(99,102,241,0.4) 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
        />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(148,163,184,1) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* ── Hero content ───────────────────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 sm:px-8 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeDown(0)}
          className="mb-6 flex justify-center"
        >
          {/* Pill badge */}
          <div className="pill-badge" role="doc-subtitle">
            <span className="relative flex h-2 w-2 flex-shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span>TechFest 2026</span>
            <span className="text-slate-600" aria-hidden="true">·</span>
            <span>26 Nov 2026</span>
            <span className="text-slate-600" aria-hidden="true">·</span>
            <span>Sarau Event Center, Jos</span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          id="hero-headline"
          initial="hidden"
          animate="visible"
          variants={fadeDown(0.15)}
          className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-[1.08]"
        >
          Build the Future.{" "}
          <span
            className="text-transparent"
            style={{
              backgroundImage: "linear-gradient(135deg, #60a5fa 0%, #818cf8 50%, #34d399 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
          >
            Shape the Industry.
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeDown(0.3)}
          className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
        >
          Africa&apos;s most energetic tech event returns — two powerful days of keynotes,
          hands-on workshops, and open-floor networking designed to accelerate the next
          generation of African builders.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp(0.45)}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* Primary CTA */}
          <a
            href="https://smartinvites.xyz/forms/68e930bf881d91001bd67f19/6903335d256533001abab3b9/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Register for TechFest 2026"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-blue-600 hover:bg-blue-500 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-900/40 transition-all duration-200 hover:shadow-blue-700/40"
          >
            Register Now
            <svg
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 16 16"
              aria-hidden="true"
            >
              <path
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8h10M9 4l4 4-4 4"
              />
            </svg>
            {/* Shimmer effect */}
            <span
              aria-hidden="true"
              className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full"
            />
          </a>

          {/* Secondary CTA */}
          <Link
            href="#schedule"
            aria-label="View the TechFest 2026 schedule"
            className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/60 backdrop-blur px-7 py-3.5 text-base font-medium text-slate-300 hover:border-slate-600 hover:text-white transition-all duration-200"
          >
            View Schedule
            <svg
              className="w-4 h-4 text-slate-500"
              fill="none"
              viewBox="0 0 16 16"
              aria-hidden="true"
            >
              <path
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 3v10M3 8l5 5 5-5"
              />
            </svg>
          </Link>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp(0.6)}
          className="mt-14 flex flex-wrap items-center justify-center gap-8 text-sm text-slate-500"
        >
          {[
            { value: "500+", label: "Builders" },
            { value: "6+", label: "Keynote Speakers" },
            { value: "2", label: "Action-Packed Days" },
            { value: "Jos", label: "Plateau State" },
          ].map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <span className="text-2xl font-bold text-white">{value}</span>
              <span>{label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade into next section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-32"
        style={{
          background: "linear-gradient(to bottom, transparent, rgba(2,6,23,1))",
        }}
      />
    </section>
  );
}
