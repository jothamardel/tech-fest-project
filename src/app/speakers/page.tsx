"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  GraduationCap,
  Briefcase,
  Sparkles,
  Landmark,
  Clock,
  MapPin,
  UserCheck,
} from "lucide-react";
import {
  TECHFEST_SESSIONS,
  ALL_SESSION_SPEAKERS,
  SPECIAL_STAGE_SPEAKERS,
  getPersonInitials,
  type SessionTrackId,
} from "@/data/sessions";

type TrackFilter = "all" | SessionTrackId;

const TRACK_BADGE_STYLES: Record<
  SessionTrackId,
  {
    badge: string;
    activeBtn: string;
    textAccent: string;
    monogramBg: string;
  }
> = {
  "ai-education": {
    badge: "border-blue-500/30 bg-blue-500/10 text-blue-300",
    activeBtn:
      "border-blue-400/50 bg-blue-600 text-white shadow-lg shadow-blue-950/60",
    textAccent: "text-blue-400",
    monogramBg:
      "radial-gradient(circle at 50% 35%, rgba(59,130,246,0.28) 0%, rgba(15,23,42,0.98) 72%)",
  },
  "ai-business": {
    badge: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
    activeBtn:
      "border-emerald-400/50 bg-emerald-600 text-white shadow-lg shadow-emerald-950/60",
    textAccent: "text-emerald-400",
    monogramBg:
      "radial-gradient(circle at 50% 35%, rgba(16,185,129,0.28) 0%, rgba(15,23,42,0.98) 72%)",
  },
  "ai-creatives": {
    badge: "border-indigo-500/30 bg-indigo-500/10 text-indigo-300",
    activeBtn:
      "border-indigo-400/50 bg-indigo-600 text-white shadow-lg shadow-indigo-950/60",
    textAccent: "text-indigo-400",
    monogramBg:
      "radial-gradient(circle at 50% 35%, rgba(99,102,241,0.3) 0%, rgba(15,23,42,0.98) 72%)",
  },
  "startup-ecosystem-policy": {
    badge: "border-amber-500/30 bg-amber-500/10 text-amber-300",
    activeBtn:
      "border-amber-400/50 bg-amber-600 text-white shadow-lg shadow-amber-950/60",
    textAccent: "text-amber-400",
    monogramBg:
      "radial-gradient(circle at 50% 35%, rgba(245,158,11,0.26) 0%, rgba(15,23,42,0.98) 72%)",
  },
};

function TrackIcon({ id }: { id: SessionTrackId }) {
  if (id === "ai-education") {
    return <GraduationCap className="h-4 w-4" aria-hidden="true" />;
  }
  if (id === "ai-business") {
    return <Briefcase className="h-4 w-4" aria-hidden="true" />;
  }
  if (id === "ai-creatives") {
    return <Sparkles className="h-4 w-4" aria-hidden="true" />;
  }
  return <Landmark className="h-4 w-4" aria-hidden="true" />;
}

export default function Speakers() {
  const [selectedTrack, setSelectedTrack] = useState<TrackFilter>("all");
  const shouldReduceMotion = useReducedMotion();

  const displayedSessions =
    selectedTrack === "all"
      ? TECHFEST_SESSIONS
      : TECHFEST_SESSIONS.filter((s) => s.id === selectedTrack);

  return (
    <main className="min-h-screen bg-slate-950 pb-28">
      {/* Hero banner */}
      <div className="relative overflow-hidden pt-32 pb-12 px-4 sm:px-6">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.1) 0%, transparent 58%)",
          }}
        />
        <div className="relative mx-auto max-w-4xl text-center">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-400 mb-4">
              TechFest 2026 Lineup · 26 Nov 2026
            </span>
            <h1 className="text-5xl sm:text-6xl font-black text-white tracking-tight">
              Speakers by Session
            </h1>
            <p className="mt-5 text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">
              Meet the educators, enterprise leaders, creative pioneers, and policy makers
              headlining our four signature tracks:{" "}
              <span className="text-slate-200 font-medium">AI x Education</span>,{" "}
              <span className="text-slate-200 font-medium">AI x Business</span>,{" "}
              <span className="text-slate-200 font-medium">AI x Creatives</span>, and{" "}
              <span className="text-slate-200 font-medium">Startup Ecosystem &amp; Policy</span>.
            </p>
          </motion.div>

          {/* Session Track Filter */}
          <search
            aria-label="Filter speakers by session track"
            className="mt-10 flex flex-wrap items-center justify-center gap-2.5"
          >
            <button
              type="button"
              onClick={() => setSelectedTrack("all")}
              aria-pressed={selectedTrack === "all"}
              className={`cursor-pointer inline-flex min-h-11 items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-200 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 ${
                selectedTrack === "all"
                  ? "border-blue-400/50 bg-blue-600 text-white shadow-lg shadow-blue-950/60"
                  : "border-slate-800 bg-slate-900/90 text-slate-300 hover:border-slate-700 hover:text-white"
              }`}
            >
              <span>All Tracks</span>
              <span className="rounded-full bg-slate-950/50 px-2 py-0.5 text-xs">
                {ALL_SESSION_SPEAKERS.length}
              </span>
            </button>

            {TECHFEST_SESSIONS.map((session) => {
              const isSelected = selectedTrack === session.id;
              const style = TRACK_BADGE_STYLES[session.id];
              return (
                <button
                  key={session.id}
                  type="button"
                  onClick={() => setSelectedTrack(session.id)}
                  aria-pressed={isSelected}
                  className={`cursor-pointer inline-flex min-h-11 items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-200 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 ${
                    isSelected
                      ? style.activeBtn
                      : "border-slate-800 bg-slate-900/90 text-slate-300 hover:border-slate-700 hover:text-white"
                  }`}
                >
                  <TrackIcon id={session.id} />
                  <span>{session.title}</span>
                  <span className="rounded-full bg-slate-950/40 px-2 py-0.5 text-xs">
                    {session.speakers.length}
                  </span>
                </button>
              );
            })}
          </search>
        </div>
      </div>

      {/* Grouped Session Sections */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 space-y-16">
        {selectedTrack === "all" && (
          <section
            aria-labelledby="speakers-keynotes-heading"
            className="space-y-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800/80 pb-6">
              <div>
                <div className="flex flex-wrap items-center gap-2.5 mb-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-300">
                    Keynotes &amp; Special Presentations
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
                    <Clock className="h-3.5 w-3.5 text-slate-500" aria-hidden="true" />
                    09:35 AM – 10:20 AM WAT
                  </span>
                </div>
                <h2
                  id="speakers-keynotes-heading"
                  className="text-3xl sm:text-4xl font-black text-white tracking-tight"
                >
                  Opening Speech, Keynote &amp; Special Presentation
                </h2>
              </div>
            </div>

            <ul
              role="list"
              aria-label="Keynote and special presentation speakers"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {SPECIAL_STAGE_SPEAKERS.map((speaker, index) => {
                const initials = getPersonInitials(speaker.name);
                const style = TRACK_BADGE_STYLES[speaker.sessionId];
                return (
                  <motion.li
                    key={speaker.id}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.55,
                      delay: shouldReduceMotion ? 0 : index * 0.08,
                      ease: [0.32, 0.72, 0, 1],
                    }}
                    className="group rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-1.5 transition-colors duration-500 hover:border-white/20"
                  >
                    <article className="flex h-full flex-col overflow-hidden rounded-[calc(1.75rem-0.375rem)] bg-slate-900 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                      <div className="relative h-72 overflow-hidden bg-slate-950">
                        {speaker.image ? (
                          <>
                            <Image
                              src={speaker.image}
                              alt={`${speaker.name}, ${speaker.role}`}
                              fill
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
                            />
                            <div
                              aria-hidden="true"
                              className="absolute inset-0"
                              style={{
                                background:
                                  "linear-gradient(to top, rgba(15,23,42,1) 0%, rgba(15,23,42,0.15) 55%, transparent 100%)",
                              }}
                            />
                          </>
                        ) : (
                          <div
                            className="flex h-full w-full flex-col items-center justify-center p-6 text-center"
                            style={{ background: style.monogramBg }}
                          >
                            <div
                              className={`flex h-20 w-20 items-center justify-center rounded-full border text-2xl font-black tracking-wider text-white shadow-inner ${style.badge}`}
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
                        <div className="absolute top-3 left-3">
                          <span
                            className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider backdrop-blur-md ${style.badge}`}
                          >
                            {speaker.sessionLabel}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col justify-between p-5">
                        <div>
                          <h3 className="text-base font-bold text-white">
                            {speaker.name}
                          </h3>
                          <p className={`mt-1 text-xs font-medium ${style.textAccent}`}>
                            {speaker.role}
                          </p>
                          <p className="mt-3 text-xs text-slate-400 leading-relaxed">
                            {speaker.talkTitle}
                          </p>
                        </div>
                      </div>
                    </article>
                  </motion.li>
                );
              })}
            </ul>
          </section>
        )}

        {displayedSessions.map((session) => {
          const style = TRACK_BADGE_STYLES[session.id];
          return (
            <section
              key={session.id}
              aria-labelledby={`speakers-track-${session.id}`}
              className="space-y-8"
            >
              {/* Track Header Banner */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800/80 pb-6">
                <div>
                  <div className="flex flex-wrap items-center gap-2.5 mb-3">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider ${style.badge}`}
                    >
                      <TrackIcon id={session.id} />
                      {session.title}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
                      <Clock className="h-3.5 w-3.5 text-slate-500" aria-hidden="true" />
                      {session.time}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                      <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                      {session.stage}
                    </span>
                  </div>
                  <h2
                    id={`speakers-track-${session.id}`}
                    className="text-3xl sm:text-4xl font-black text-white tracking-tight"
                  >
                    {session.title}
                  </h2>
                  <p className="mt-1.5 text-sm sm:text-base text-slate-400 max-w-2xl">
                    {session.description}
                  </p>
                </div>
              </div>

              {/* Speakers Grid for this Session */}
              <ul
                role="list"
                aria-label={`${session.title} speakers`}
                className={`grid grid-cols-1 sm:grid-cols-2 ${
                  session.speakers.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"
                } gap-6`}
              >
                {session.speakers.map((speaker, index) => {
                  const initials = getPersonInitials(speaker.name);
                  return (
                    <motion.li
                      key={speaker.id}
                      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.55,
                        delay: shouldReduceMotion ? 0 : index * 0.08,
                        ease: [0.32, 0.72, 0, 1],
                      }}
                      className="group rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-1.5 transition-colors duration-500 hover:border-white/20"
                    >
                      <article className="flex h-full flex-col overflow-hidden rounded-[calc(1.75rem-0.375rem)] bg-slate-900 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                        {/* Portrait or Sleek Monogram Placeholder */}
                        <div className="relative h-72 overflow-hidden bg-slate-950">
                          {speaker.image ? (
                            <>
                              <Image
                                src={speaker.image}
                                alt={`${speaker.name}, ${speaker.role}`}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
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
                              style={{ background: style.monogramBg }}
                            >
                              <div
                                className={`flex h-20 w-20 items-center justify-center rounded-full border text-2xl font-black tracking-wider text-white shadow-inner ${style.badge}`}
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
                            className={`absolute top-3 left-3 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${style.badge}`}
                          >
                            {session.title}
                          </span>
                        </div>

                        {/* Speaker Info */}
                        <div className="flex flex-1 flex-col justify-between p-5">
                          <div>
                            <h3 className="text-base font-bold text-white">
                              {speaker.name}
                            </h3>
                            <p className={`mt-1 text-xs font-medium ${style.textAccent}`}>
                              {speaker.role}
                            </p>
                            <p className="mt-3 text-xs text-slate-400 leading-relaxed">
                              {speaker.talkTitle}
                            </p>
                          </div>

                          <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap gap-2">
                            <span className="rounded-full border border-slate-700 bg-slate-800/60 px-2.5 py-0.5 text-[11px] text-slate-300">
                              {session.title}
                            </span>
                            <span className="rounded-full border border-slate-800 bg-slate-950/60 px-2.5 py-0.5 text-[11px] text-slate-400">
                              Jos TechFest 2026
                            </span>
                          </div>
                        </div>
                      </article>
                    </motion.li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>
    </main>
  );
}
