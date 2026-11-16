"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { UserCheck } from "lucide-react";
import {
  ALL_SESSION_SPEAKERS,
  getPersonInitials,
  type SessionTrackId,
} from "@/data/sessions";

const SESSION_BADGE_COLORS: Record<SessionTrackId, string> = {
  "ai-education": "border-blue-500/30 bg-blue-500/10 text-blue-300",
  "ai-business": "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  "ai-creatives": "border-indigo-500/30 bg-indigo-500/10 text-indigo-300",
  "startup-ecosystem-policy":
    "border-amber-500/30 bg-amber-500/10 text-amber-300",
};

const MONOGRAM_GRADIENTS: Record<SessionTrackId, string> = {
  "ai-education":
    "radial-gradient(circle at 50% 35%, rgba(59,130,246,0.28) 0%, rgba(15,23,42,0.98) 72%)",
  "ai-business":
    "radial-gradient(circle at 50% 35%, rgba(16,185,129,0.28) 0%, rgba(15,23,42,0.98) 72%)",
  "ai-creatives":
    "radial-gradient(circle at 50% 35%, rgba(99,102,241,0.3) 0%, rgba(15,23,42,0.98) 72%)",
  "startup-ecosystem-policy":
    "radial-gradient(circle at 50% 35%, rgba(245,158,11,0.26) 0%, rgba(15,23,42,0.98) 72%)",
};

export default function KeynoteSpeakers() {
  return (
    <section
      id="speakers"
      aria-labelledby="speakers-heading"
      className="relative bg-slate-950 py-24 px-4 sm:px-6 overflow-hidden"
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 70% 40%, rgba(59,130,246,0.06) 0%, transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <span className="inline-block rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-blue-400 mb-4">
            Featured Speakers
          </span>
          <h2
            id="speakers-heading"
            className="text-4xl sm:text-5xl font-black text-white tracking-tight"
          >
            Visionary Voices
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
            Leaders across{" "}
            <span className="text-slate-200 font-medium">AI x Education</span>,{" "}
            <span className="text-slate-200 font-medium">AI x Business</span>,{" "}
            <span className="text-slate-200 font-medium">AI x Creatives</span>, and{" "}
            <span className="text-slate-200 font-medium">Startup Ecosystem &amp; Policy</span>.
          </p>
        </motion.div>

        {/* Speaker grid — all 15 confirmed speakers across the 4 sessions */}
        <ul
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          role="list"
          aria-label="Session speakers"
        >
          {ALL_SESSION_SPEAKERS.map((speaker, index) => {
            const initials = getPersonInitials(speaker.name);
            return (
              <motion.li
                key={speaker.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (index % 8) * 0.08 }}
                className="group rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-1.5 transition-all duration-300 hover:border-white/20"
              >
                <article className="relative flex h-full flex-col overflow-hidden rounded-[calc(1.75rem-0.375rem)] bg-slate-900 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                  {/* Image or Monogram Placeholder */}
                  <div className="relative h-72 overflow-hidden bg-slate-950">
                    {speaker.image ? (
                      <>
                        <Image
                          src={speaker.image}
                          alt={`${speaker.name}, ${speaker.role}`}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div
                          aria-hidden="true"
                          className="absolute inset-0"
                          style={{
                            background:
                              "linear-gradient(to top, rgba(15,23,42,1) 0%, rgba(15,23,42,0.2) 60%, transparent 100%)",
                          }}
                        />
                      </>
                    ) : (
                      <div
                        className="flex h-full w-full flex-col items-center justify-center p-6 text-center"
                        style={{
                          background: MONOGRAM_GRADIENTS[speaker.sessionId],
                        }}
                      >
                        <div
                          className={`flex h-20 w-20 items-center justify-center rounded-full border text-2xl font-black tracking-wider text-white shadow-inner ${SESSION_BADGE_COLORS[speaker.sessionId]}`}
                          aria-hidden="true"
                        >
                          {initials}
                        </div>
                        <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-medium text-slate-400">
                          <UserCheck className="h-3.5 w-3.5" aria-hidden="true" />
                          Confirmed Speaker
                        </span>
                      </div>
                    )}
                    <span
                      className={`absolute top-3 left-3 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${SESSION_BADGE_COLORS[speaker.sessionId]}`}
                    >
                      {speaker.sessionLabel}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex flex-1 flex-col justify-between p-5">
                    <div>
                      <h3 className="text-base font-bold text-white">{speaker.name}</h3>
                      <p className="mt-1 text-xs font-medium text-blue-400">{speaker.role}</p>
                      <p className="mt-2 text-xs text-slate-400 line-clamp-2">
                        {speaker.talkTitle}
                      </p>
                    </div>
                    <div>
                      <div className="mt-3 h-px bg-slate-800" />
                      <div className="mt-3 flex flex-wrap gap-2">
                        <span
                          className={`rounded-full border px-2.5 py-0.5 text-xs ${SESSION_BADGE_COLORS[speaker.sessionId]}`}
                        >
                          {speaker.sessionLabel}
                        </span>
                        <span className="rounded-full border border-slate-700 bg-slate-800/60 px-2.5 py-0.5 text-xs text-slate-400">
                          Jos, Nigeria
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              </motion.li>
            );
          })}
        </ul>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 flex justify-center"
        >
          <Link
            href="/speakers"
            aria-label="View all TechFest 2026 speakers by session"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-blue-600 hover:bg-blue-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-900/40 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
          >
            View Speakers by Session Track ({ALL_SESSION_SPEAKERS.length})
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
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
