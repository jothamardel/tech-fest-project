"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  GraduationCap,
  Briefcase,
  Sparkles,
  Landmark,
  Clock,
  MapPin,
  ArrowUpRight,
  UserCheck,
} from "lucide-react";
import {
  TECHFEST_SESSIONS,
  getPersonInitials,
  type EventSession,
  type SessionSpeaker,
  type SessionTrackId,
} from "@/data/sessions";

type TrackFilter = "all" | SessionTrackId;

interface AccentTheme {
  badge: string;
  outerShellHover: string;
  ambientGlow: string;
  activeFilterPill: string;
  topicChip: string;
  avatarRing: string;
  textAccent: string;
  iconOrb: string;
  monogramBg: string;
}

const TRACK_ACCENT_THEMES: Record<EventSession["accent"], AccentTheme> = {
  blue: {
    badge: "border-blue-500/30 bg-blue-500/10 text-blue-300",
    outerShellHover: "hover:border-blue-500/40",
    ambientGlow:
      "radial-gradient(ellipse at 18% 0%, rgba(59,130,246,0.16) 0%, transparent 65%)",
    activeFilterPill:
      "border-blue-400/50 bg-blue-600 text-white shadow-lg shadow-blue-950/60",
    topicChip: "border-blue-500/20 bg-blue-500/10 text-blue-200",
    avatarRing: "border-blue-500/60",
    textAccent: "text-blue-400",
    iconOrb: "bg-blue-500/15 text-blue-300 border-blue-500/30",
    monogramBg:
      "radial-gradient(circle at 50% 35%, rgba(59,130,246,0.28) 0%, rgba(15,23,42,0.98) 72%)",
  },
  emerald: {
    badge: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
    outerShellHover: "hover:border-emerald-500/40",
    ambientGlow:
      "radial-gradient(ellipse at 50% 0%, rgba(16,185,129,0.16) 0%, transparent 65%)",
    activeFilterPill:
      "border-emerald-400/50 bg-emerald-600 text-white shadow-lg shadow-emerald-950/60",
    topicChip: "border-emerald-500/20 bg-emerald-500/10 text-emerald-200",
    avatarRing: "border-emerald-500/60",
    textAccent: "text-emerald-400",
    iconOrb: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    monogramBg:
      "radial-gradient(circle at 50% 35%, rgba(16,185,129,0.28) 0%, rgba(15,23,42,0.98) 72%)",
  },
  indigo: {
    badge: "border-indigo-500/30 bg-indigo-500/10 text-indigo-300",
    outerShellHover: "hover:border-indigo-500/40",
    ambientGlow:
      "radial-gradient(ellipse at 82% 0%, rgba(99,102,241,0.18) 0%, transparent 65%)",
    activeFilterPill:
      "border-indigo-400/50 bg-indigo-600 text-white shadow-lg shadow-indigo-950/60",
    topicChip: "border-indigo-500/20 bg-indigo-500/10 text-indigo-200",
    avatarRing: "border-indigo-500/60",
    textAccent: "text-indigo-400",
    iconOrb: "bg-indigo-500/15 text-indigo-300 border-indigo-500/30",
    monogramBg:
      "radial-gradient(circle at 50% 35%, rgba(99,102,241,0.3) 0%, rgba(15,23,42,0.98) 72%)",
  },
  amber: {
    badge: "border-amber-500/30 bg-amber-500/10 text-amber-300",
    outerShellHover: "hover:border-amber-500/40",
    ambientGlow:
      "radial-gradient(ellipse at 50% 0%, rgba(245,158,11,0.15) 0%, transparent 65%)",
    activeFilterPill:
      "border-amber-400/50 bg-amber-600 text-white shadow-lg shadow-amber-950/60",
    topicChip: "border-amber-500/20 bg-amber-500/10 text-amber-200",
    avatarRing: "border-amber-500/60",
    textAccent: "text-amber-400",
    iconOrb: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    monogramBg:
      "radial-gradient(circle at 50% 35%, rgba(245,158,11,0.26) 0%, rgba(15,23,42,0.98) 72%)",
  },
};

function TrackIcon({ trackId }: { trackId: SessionTrackId }) {
  if (trackId === "ai-education") {
    return <GraduationCap className="h-4 w-4" aria-hidden="true" />;
  }
  if (trackId === "ai-business") {
    return <Briefcase className="h-4 w-4" aria-hidden="true" />;
  }
  if (trackId === "ai-creatives") {
    return <Sparkles className="h-4 w-4" aria-hidden="true" />;
  }
  return <Landmark className="h-4 w-4" aria-hidden="true" />;
}

function SessionSpeakerCard({
  speaker,
  sessionTitle,
  theme,
}: {
  speaker: SessionSpeaker;
  sessionTitle: string;
  theme: AccentTheme;
}) {
  const initials = getPersonInitials(speaker.name);

  return (
    <li className="group rounded-[1.5rem] border border-white/10 bg-white/[0.02] p-1.5 transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-white/20">
      <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(1.5rem-0.375rem)] bg-slate-950 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
        {/* Speaker Portrait or Sleek Monogram Placeholder */}
        <div className="relative h-64 w-full overflow-hidden bg-slate-900">
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
                    "linear-gradient(to top, rgba(2,6,23,0.98) 0%, rgba(2,6,23,0.28) 55%, transparent 100%)",
                }}
              />
            </>
          ) : (
            <div
              className="flex h-full w-full flex-col items-center justify-center p-6 text-center"
              style={{ background: theme.monogramBg }}
            >
              <div
                className={`flex h-20 w-20 items-center justify-center rounded-full border text-2xl font-black tracking-wider text-white shadow-inner ${theme.iconOrb}`}
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

          {/* Track pill badge */}
          <span
            className={`absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] ${theme.badge}`}
          >
            {sessionTitle}
          </span>
        </div>

        {/* Speaker Name, Role & Session Topic */}
        <div className="flex flex-1 flex-col justify-between p-4">
          <div>
            <h4 className="text-base font-bold text-white leading-snug">
              {speaker.name}
            </h4>
            <p className={`mt-0.5 text-xs font-medium ${theme.textAccent}`}>
              {speaker.role}
            </p>
          </div>
          <p className="mt-3 border-t border-slate-800/80 pt-2.5 text-xs text-slate-400 leading-relaxed">
            <span className="font-semibold text-slate-300">Session Focus: </span>
            {speaker.talkTitle}
          </p>
        </div>
      </div>
    </li>
  );
}

function SessionTrackCard({
  session,
  index,
  shouldReduceMotion,
}: {
  session: EventSession;
  index: number;
  shouldReduceMotion: boolean | null;
}) {
  const theme = TRACK_ACCENT_THEMES[session.accent];

  return (
    <motion.article
      layout={!shouldReduceMotion}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
      transition={{
        duration: 0.55,
        delay: shouldReduceMotion ? 0 : index * 0.08,
        ease: [0.32, 0.72, 0, 1],
      }}
      aria-labelledby={`session-title-${session.id}`}
      className={`@container rounded-[2rem] border border-white/10 bg-white/[0.03] p-1.5 sm:p-2 transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${theme.outerShellHover}`}
    >
      {/* Double-Bezel Inner Core */}
      <div className="relative overflow-hidden rounded-[calc(2rem-0.375rem)] bg-slate-900/90 p-6 sm:p-8 lg:p-10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)]">
        {/* Per-track radial mesh glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: theme.ambientGlow }}
        />

        <div className="relative z-10 grid gap-8 lg:grid-cols-12 lg:items-start">
          {/* Editorial Left Column: Track Story & Metadata (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              <div className="mb-4 flex flex-wrap items-center gap-2.5">
                <span
                  className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${theme.badge}`}
                >
                  <TrackIcon trackId={session.id} />
                  {session.title}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-800 bg-slate-950/80 px-3 py-1 text-xs font-medium text-slate-400">
                  <Clock className="h-3.5 w-3.5 text-slate-500" aria-hidden="true" />
                  {session.time}
                </span>
              </div>

              <h3
                id={`session-title-${session.id}`}
                className="text-3xl sm:text-4xl font-black text-white tracking-tight"
              >
                {session.title}
              </h3>
              <p className={`mt-2 text-sm font-semibold ${theme.textAccent}`}>
                {session.tagline}
              </p>
              <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed">
                {session.description}
              </p>
            </div>

            {/* Focus Topics */}
            <div>
              <h4 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                Key Session Pillars
              </h4>
              <ul
                role="list"
                aria-label={`${session.title} focus areas`}
                className="flex flex-wrap gap-2"
              >
                {session.highlights.map((topic) => (
                  <li
                    key={topic}
                    className={`rounded-full border px-3 py-1 text-xs font-medium ${theme.topicChip}`}
                  >
                    {topic}
                  </li>
                ))}
              </ul>
            </div>

            {/* Avatar Stack + Button-in-Button CTA */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-800/80 pt-5">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2.5">
                  {session.speakers.map((sp) => (
                    <div
                      key={sp.id}
                      className={`relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full ring-2 ring-slate-950 border bg-slate-900 text-[11px] font-bold text-white ${theme.avatarRing}`}
                    >
                      {sp.image ? (
                        <Image
                          src={sp.image}
                          alt={sp.name}
                          fill
                          sizes="36px"
                          className="object-cover object-top"
                        />
                      ) : (
                        <span aria-hidden="true">{getPersonInitials(sp.name)}</span>
                      )}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">
                    {session.speakers.length} Session Speakers
                  </p>
                  <p className="flex items-center gap-1 text-xs text-slate-400">
                    <MapPin className="h-3 w-3 text-slate-500" aria-hidden="true" />
                    {session.stage}
                  </p>
                </div>
              </div>

              <Link
                href={`/speakers?track=${session.id}`}
                className="group inline-flex min-h-11 items-center gap-2.5 rounded-full border border-white/10 bg-slate-950/90 pl-4 pr-1.5 py-1.5 text-xs font-semibold text-slate-200 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-white/25 hover:text-white active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
              >
                <span>Track Lineup</span>
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full border transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${theme.iconOrb}`}
                >
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </Link>
            </div>
          </div>

          {/* Right Column: Session Speakers Portrait Grid (7 cols) */}
          <div className="lg:col-span-7">
            <div className="mb-3.5 flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Session Speakers — {session.title}
              </span>
              <span className="text-xs font-medium text-slate-500">
                {session.day}
              </span>
            </div>

            <ul
              role="list"
              aria-label={`Speakers for ${session.title}`}
              className={`grid grid-cols-1 gap-4 sm:grid-cols-2 ${
                session.speakers.length === 3 ? "xl:grid-cols-3" : "xl:grid-cols-2"
              }`}
            >
              {session.speakers.map((speaker) => (
                <SessionSpeakerCard
                  key={speaker.id}
                  speaker={speaker}
                  sessionTitle={session.title}
                  theme={theme}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function Sessions() {
  const [activeTrack, setActiveTrack] = useState<TrackFilter>("all");
  const shouldReduceMotion = useReducedMotion();

  const visibleSessions =
    activeTrack === "all"
      ? TECHFEST_SESSIONS
      : TECHFEST_SESSIONS.filter((session) => session.id === activeTrack);

  return (
    <section
      id="sessions"
      aria-labelledby="sessions-heading"
      className="relative bg-slate-950 py-28 px-4 sm:px-6 overflow-hidden"
    >
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 12%, rgba(59,130,246,0.09) 0%, rgba(16,185,129,0.04) 42%, transparent 72%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Section Heading */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
          className="mb-12 text-center"
        >
          <span className="inline-block rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-400 mb-4">
            2026 Focus Tracks
          </span>
          <h2
            id="sessions-heading"
            className="text-4xl sm:text-5xl font-black text-white tracking-tight"
          >
            Sessions &amp; Speaker Lineup
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Four high-impact sessions across a single action-packed day —{" "}
            <span className="text-slate-200 font-medium">AI x Education</span>,{" "}
            <span className="text-slate-200 font-medium">AI x Business</span>,{" "}
            <span className="text-slate-200 font-medium">AI x Creatives</span>, and{" "}
            <span className="text-slate-200 font-medium">Startup Ecosystem &amp; Policy</span>.
          </p>
        </motion.div>

        {/* Track Filter Bar wrapped in semantic <search> */}
        <search
          aria-label="Filter sessions by track"
          className="mb-12 flex flex-wrap items-center justify-center gap-2.5"
        >
          <button
            type="button"
            onClick={() => setActiveTrack("all")}
            aria-pressed={activeTrack === "all"}
            className={`cursor-pointer inline-flex min-h-11 items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 ${
              activeTrack === "all"
                ? "border-blue-400/50 bg-blue-600 text-white shadow-lg shadow-blue-950/60"
                : "border-slate-800 bg-slate-900/90 text-slate-300 hover:border-slate-700 hover:text-white"
            }`}
          >
            <span>All Sessions</span>
            <span className="rounded-full bg-slate-950/50 px-2 py-0.5 text-xs text-slate-200">
              {TECHFEST_SESSIONS.length}
            </span>
          </button>

          {TECHFEST_SESSIONS.map((session) => {
            const isSelected = activeTrack === session.id;
            const theme = TRACK_ACCENT_THEMES[session.accent];
            return (
              <button
                key={session.id}
                type="button"
                onClick={() => setActiveTrack(session.id)}
                aria-pressed={isSelected}
                className={`cursor-pointer inline-flex min-h-11 items-center gap-2.5 rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 ${
                  isSelected
                    ? theme.activeFilterPill
                    : "border-slate-800 bg-slate-900/90 text-slate-300 hover:border-slate-700 hover:text-white"
                }`}
              >
                <TrackIcon trackId={session.id} />
                <span>{session.title}</span>
                <span className="rounded-full bg-slate-950/40 px-2 py-0.5 text-xs">
                  {session.speakers.length}
                </span>
              </button>
            );
          })}
        </search>

        {/* Session Cards Stack */}
        <div className="space-y-10">
          <AnimatePresence mode="popLayout">
            {visibleSessions.map((session, index) => (
              <SessionTrackCard
                key={session.id}
                session={session}
                index={index}
                shouldReduceMotion={shouldReduceMotion}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
