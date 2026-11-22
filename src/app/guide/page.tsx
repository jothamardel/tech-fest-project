"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  TECHFEST_SESSIONS,
  TECHFEST_ANCHORS,
  getPersonInitials,
  type SessionTrackId,
} from "@/data/sessions";
import {
  SESSION_MODERATOR_BRIEFINGS,
  MODERATOR_STAGE_FLOW_TIP,
  type SessionModeratorBriefing,
} from "@/data/panelQuestions";
import {
  BookOpen,
  Mic,
  Copy,
  Check,
  Printer,
  Clock,
  Sparkles,
  Users,
  Lightbulb,
  Type,
  ChevronRight,
  MessageSquare,
  Share2,
  UserCheck,
  RotateCcw,
} from "lucide-react";

const ACCENT_STYLES = {
  blue: {
    badge: "border-blue-500/35 bg-blue-500/15 text-blue-300",
    pillActive:
      "bg-blue-600 text-white border-blue-400 shadow-lg shadow-blue-950/50",
    cardBorder: "border-blue-500/30",
    quoteBorder: "border-l-blue-400 bg-blue-500/[0.07]",
    numberBadge: "bg-blue-500/20 text-blue-300 border-blue-400/40",
    accentText: "text-blue-400",
    chipActive: "border-blue-400/60 bg-blue-500/20 text-blue-200",
  },
  emerald: {
    badge: "border-emerald-500/35 bg-emerald-500/15 text-emerald-300",
    pillActive:
      "bg-emerald-600 text-white border-emerald-400 shadow-lg shadow-emerald-950/50",
    cardBorder: "border-emerald-500/30",
    quoteBorder: "border-l-emerald-400 bg-emerald-500/[0.07]",
    numberBadge: "bg-emerald-500/20 text-emerald-300 border-emerald-400/40",
    accentText: "text-emerald-400",
    chipActive: "border-emerald-400/60 bg-emerald-500/20 text-emerald-200",
  },
  indigo: {
    badge: "border-indigo-500/35 bg-indigo-500/15 text-indigo-300",
    pillActive:
      "bg-indigo-600 text-white border-indigo-400 shadow-lg shadow-indigo-950/50",
    cardBorder: "border-indigo-500/30",
    quoteBorder: "border-l-indigo-400 bg-indigo-500/[0.07]",
    numberBadge: "bg-indigo-500/20 text-indigo-300 border-indigo-400/40",
    accentText: "text-indigo-400",
    chipActive: "border-indigo-400/60 bg-indigo-500/20 text-indigo-200",
  },
  amber: {
    badge: "border-amber-500/35 bg-amber-500/15 text-amber-300",
    pillActive:
      "bg-amber-600 text-white border-amber-400 shadow-lg shadow-amber-950/50",
    cardBorder: "border-amber-500/30",
    quoteBorder: "border-l-amber-400 bg-amber-500/[0.07]",
    numberBadge: "bg-amber-500/20 text-amber-300 border-amber-400/40",
    accentText: "text-amber-400",
    chipActive: "border-amber-400/60 bg-amber-500/20 text-amber-200",
  },
};

const NOTES_STORAGE_KEY = "jtf2026_moderator_guest_notes_v1";
const ASSIGNMENTS_STORAGE_KEY = "jtf2026_question_speaker_assignments_v1";

function buildDefaultAssignments(): Record<string, string[]> {
  const map: Record<string, string[]> = {};
  SESSION_MODERATOR_BRIEFINGS.forEach((b) => {
    b.questions.forEach((q) => {
      map[q.id] = q.defaultSpeakerNames;
    });
  });
  return map;
}

export default function ModeratorGuestStudyGuidePage() {
  const [selectedTrack, setSelectedTrack] = useState<SessionTrackId | "all">("all");
  const [stageLargeText, setStageLargeText] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [assignments, setAssignments] = useState<Record<string, string[]>>(
    buildDefaultAssignments
  );
  const [openNoteKey, setOpenNoteKey] = useState<string | null>(null);
  const [assigningQuestionId, setAssigningQuestionId] = useState<string | null>(
    null
  );

  useEffect(() => {
    try {
      const savedNotes = localStorage.getItem(NOTES_STORAGE_KEY);
      if (savedNotes) setNotes(JSON.parse(savedNotes));

      const savedAssign = localStorage.getItem(ASSIGNMENTS_STORAGE_KEY);
      if (savedAssign) {
        setAssignments((prev) => ({ ...prev, ...JSON.parse(savedAssign) }));
      }
    } catch {
      // ignore
    }
  }, []);

  const handleNoteChange = useCallback((key: string, value: string) => {
    setNotes((prev) => {
      const next = { ...prev, [key]: value };
      try {
        localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const toggleSpeakerAssignment = useCallback(
    (questionId: string, speakerName: string) => {
      setAssignments((prev) => {
        const current = prev[questionId] || [];
        const exists = current.includes(speakerName);
        const nextList = exists
          ? current.filter((n) => n !== speakerName)
          : [...current, speakerName];
        const next = { ...prev, [questionId]: nextList };
        try {
          localStorage.setItem(ASSIGNMENTS_STORAGE_KEY, JSON.stringify(next));
        } catch {
          // ignore
        }
        return next;
      });
    },
    []
  );

  const resetAssignments = useCallback(() => {
    const defaults = buildDefaultAssignments();
    setAssignments(defaults);
    try {
      localStorage.removeItem(ASSIGNMENTS_STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  const formatSessionText = useCallback(
    (briefing: SessionModeratorBriefing) => {
      const sessionData = TECHFEST_SESSIONS.find(
        (s) => s.id === briefing.sessionId
      );
      const speakerNames =
        sessionData?.speakers.map((s) => s.name).join(", ") || "";
      return [
        `*JOS TECHFEST 2026 — SESSION ${briefing.number}: ${briefing.title.toUpperCase()}*`,
        `Time: ${briefing.timeSlot}`,
        `Panelists: ${speakerNames}`,
        "",
        `*MODERATOR INTRO (30 Seconds):*`,
        `"${briefing.moderatorIntro}"`,
        "",
        `*PANEL QUESTIONS:*`,
        ...briefing.questions.map((q) => {
          const assigned = assignments[q.id] || q.defaultSpeakerNames;
          const targetLabel = q.isAllPanelists
            ? "All Panelists (60–90s each)"
            : assigned.join(", ");
          return `${q.number}. *${q.title}* [${targetLabel}]\n${q.prompt}`;
        }),
      ].join("\n\n");
    },
    [assignments]
  );

  const copySessionScript = useCallback(
    (briefing: SessionModeratorBriefing) => {
      const text = formatSessionText(briefing);
      navigator.clipboard.writeText(text).then(() => {
        setCopiedId(briefing.sessionId);
        setTimeout(() => setCopiedId(null), 2200);
      });
    },
    [formatSessionText]
  );

  const shareViaWhatsApp = useCallback(
    (briefing: SessionModeratorBriefing) => {
      const text = formatSessionText(briefing);
      const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
      window.open(url, "_blank", "noopener,noreferrer");
    },
    [formatSessionText]
  );

  const visibleBriefings =
    selectedTrack === "all"
      ? SESSION_MODERATOR_BRIEFINGS
      : SESSION_MODERATOR_BRIEFINGS.filter(
          (b) => b.sessionId === selectedTrack
        );

  return (
    <main className="min-h-screen bg-slate-950 text-white pt-28 pb-24 px-4 sm:px-6">
      <div className="mx-auto max-w-5xl">
        {/* ── HERO BRIEFING HEADER ─────────────────────────────── */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-10 mb-8 shadow-2xl relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, rgba(16,185,129,0.16) 0%, transparent 65%)",
            }}
          />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-2.5 mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/15 px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-widest text-emerald-300">
                  <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                  Unlisted Pre-Event Briefing · Moderators &amp; Panelists
                </span>
                <span className="rounded-full border border-white/15 bg-white/[0.05] px-3 py-1 text-[11px] font-bold text-slate-300">
                  26 November 2026 · Sarau Event Center, Jos
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
                Panel Discussion Scripts &amp; Study Guide
              </h1>
              <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
                Official preparation guide for our Stage Moderators, Anchors, and Guest Panelists. Each session features a{" "}
                <strong className="text-white">30-second Moderator Intro</strong> tied to the opening welcome speech, followed by{" "}
                <strong className="text-white">4 high-impact panel questions</strong> with target panelist assignments.
              </p>
            </div>

            {/* Utility Controls: Stage Large Print, Reset Assignments & Print/PDF */}
            <div className="flex flex-wrap items-center gap-2 flex-shrink-0">
              <button
                type="button"
                onClick={() => setStageLargeText((v) => !v)}
                className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                  stageLargeText
                    ? "border-emerald-400 bg-emerald-500 text-slate-950 shadow-lg"
                    : "border-white/15 bg-white/[0.05] text-slate-200 hover:text-white"
                }`}
              >
                <Type className="h-3.5 w-3.5" aria-hidden="true" />
                {stageLargeText ? "Stage Cue Size: ON" : "Stage Cue Size"}
              </button>

              <button
                type="button"
                onClick={resetAssignments}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.05] hover:bg-white/[0.1] px-3.5 py-2 text-xs font-bold text-slate-300 hover:text-white transition-all cursor-pointer"
                title="Reset speaker assignments to default"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                Reset Assignments
              </button>

              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.05] hover:bg-white/[0.1] px-4 py-2 text-xs font-bold text-white transition-all cursor-pointer"
              >
                <Printer className="h-3.5 w-3.5" aria-hidden="true" />
                Print / Save PDF
              </button>
            </div>
          </div>

          {/* Stage Anchors Strip */}
          <div className="relative z-10 mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
              <Mic className="h-4 w-4 text-emerald-400" aria-hidden="true" />
              <span>Stage Anchors &amp; Hosts:</span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {TECHFEST_ANCHORS.map((anchor) => (
                <div
                  key={anchor.id}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/50 pr-3.5 pl-1.5 py-1"
                >
                  <div className="relative h-6 w-6 overflow-hidden rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold text-white">
                    {anchor.image ? (
                      <Image
                        src={anchor.image}
                        alt={anchor.name}
                        fill
                        sizes="24px"
                        className="object-cover object-top"
                      />
                    ) : (
                      <span>{getPersonInitials(anchor.name)}</span>
                    )}
                  </div>
                  <span className="text-xs font-bold text-white">
                    {anchor.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── MODERATOR TIP FOR STAGE FLOW CALLOUT ─────────────── */}
        <div className="rounded-3xl border border-amber-500/35 bg-amber-500/[0.08] p-5 sm:p-6 mb-8 shadow-xl">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl border border-amber-400/40 bg-amber-500/20 text-amber-300">
              <Lightbulb className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-black uppercase tracking-wider text-amber-300">
                Moderator Tip for Stage Flow
              </h2>
              <p
                className={`mt-1.5 text-slate-200 leading-relaxed ${
                  stageLargeText ? "text-base sm:text-lg" : "text-xs sm:text-sm"
                }`}
              >
                {MODERATOR_STAGE_FLOW_TIP}
              </p>
            </div>
          </div>
        </div>

        {/* ── TRACK FILTER BAR (<search> landmark) ─────────────── */}
        <search
          aria-label="Filter briefing by session track"
          className="mb-8 flex flex-wrap items-center gap-2"
        >
          <button
            type="button"
            onClick={() => setSelectedTrack("all")}
            className={`rounded-full border px-4 py-2 text-xs font-extrabold transition-all cursor-pointer ${
              selectedTrack === "all"
                ? "bg-emerald-500 text-slate-950 border-emerald-400 shadow-lg"
                : "border-white/15 bg-white/[0.03] text-slate-300 hover:text-white"
            }`}
          >
            All 4 Sessions (16 Questions)
          </button>
          {SESSION_MODERATOR_BRIEFINGS.map((b) => {
            const style = ACCENT_STYLES[b.accent];
            const isSelected = selectedTrack === b.sessionId;
            return (
              <button
                key={b.sessionId}
                type="button"
                onClick={() => setSelectedTrack(b.sessionId)}
                className={`rounded-full border px-4 py-2 text-xs font-extrabold transition-all cursor-pointer ${
                  isSelected
                    ? style.pillActive
                    : "border-white/15 bg-white/[0.03] text-slate-300 hover:text-white"
                }`}
              >
                {b.number}. {b.title}
              </button>
            );
          })}
        </search>

        {/* ── SESSION BRIEFING CARDS ───────────────────────────── */}
        <div className="space-y-10">
          {visibleBriefings.map((briefing) => {
            const style = ACCENT_STYLES[briefing.accent];
            const sessionObj = TECHFEST_SESSIONS.find(
              (s) => s.id === briefing.sessionId
            );
            const speakers = sessionObj?.speakers || [];

            return (
              <motion.section
                key={briefing.sessionId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                aria-labelledby={`heading-${briefing.sessionId}`}
                className={`rounded-3xl border ${style.cardBorder} bg-slate-900/75 p-6 sm:p-8 shadow-2xl`}
              >
                {/* Session Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5 mb-2">
                      <span
                        className={`rounded-full border px-3 py-0.5 text-xs font-extrabold uppercase tracking-wider ${style.badge}`}
                      >
                        Session {briefing.number}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400">
                        <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                        {briefing.timeSlot}
                      </span>
                    </div>
                    <h2
                      id={`heading-${briefing.sessionId}`}
                      className="text-2xl sm:text-4xl font-black tracking-tight text-white"
                    >
                      {briefing.number}. {briefing.title}
                    </h2>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => copySessionScript(briefing)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.05] hover:bg-white/[0.1] px-4 py-2 text-xs font-bold text-white transition-all cursor-pointer"
                    >
                      {copiedId === briefing.sessionId ? (
                        <>
                          <Check
                            className="h-3.5 w-3.5 text-emerald-400"
                            aria-hidden="true"
                          />
                          Copied Script!
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                          Copy Script
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => shareViaWhatsApp(briefing)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/15 hover:bg-emerald-500/25 px-4 py-2 text-xs font-bold text-emerald-300 transition-all cursor-pointer"
                    >
                      <Share2 className="h-3.5 w-3.5" aria-hidden="true" />
                      WhatsApp Share
                    </button>
                  </div>
                </div>

                {/* Confirmed Panelists Strip for This Track */}
                <div className="mt-5 mb-6">
                  <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-3">
                    <Users className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Confirmed Session Panelists ({speakers.length})</span>
                  </div>
                  <ul
                    role="list"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
                  >
                    {speakers.map((sp) => (
                      <li
                        key={sp.id}
                        className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/40 p-3"
                      >
                        <div className="relative h-11 w-11 flex-shrink-0 overflow-hidden rounded-xl bg-slate-800 flex items-center justify-center text-xs font-black text-white border border-white/15">
                          {sp.image ? (
                            <Image
                              src={sp.image}
                              alt={sp.name}
                              fill
                              sizes="44px"
                              className="object-cover object-top"
                            />
                          ) : (
                            <span>{getPersonInitials(sp.name)}</span>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs sm:text-sm font-bold text-white truncate">
                            {sp.name}
                          </p>
                          <p className="text-[11px] text-slate-400 truncate">
                            {sp.talkTitle}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Moderator Intro (30 seconds) */}
                <div
                  className={`rounded-2xl border-l-4 ${style.quoteBorder} border border-white/10 p-5 sm:p-6 mb-6`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span
                      className={`text-xs font-black uppercase tracking-widest ${style.accentText}`}
                    >
                      Moderator Intro (30 Seconds)
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400">
                      Ties back to Opening Welcome Speech
                    </span>
                  </div>
                  <blockquote
                    className={`italic text-slate-100 font-medium leading-relaxed ${
                      stageLargeText
                        ? "text-lg sm:text-2xl"
                        : "text-sm sm:text-base"
                    }`}
                  >
                    “{briefing.moderatorIntro}”
                  </blockquote>
                </div>

                {/* 4 High-Impact Panel Questions */}
                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">
                    Panel Questions (4)
                  </h3>
                  <ol role="list" className="space-y-4">
                    {briefing.questions.map((q) => {
                      const noteKey = q.id;
                      const hasNote = Boolean(notes[noteKey]?.trim());
                      const isNoteOpen = openNoteKey === noteKey || hasNote;
                      const assignedSpeakers =
                        assignments[q.id] || q.defaultSpeakerNames;
                      const isAssignOpen = assigningQuestionId === q.id;

                      return (
                        <li
                          key={q.id}
                          className="rounded-2xl border border-white/10 bg-black/45 p-5 transition-colors hover:border-white/20"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                            <div className="flex items-center gap-2.5">
                              <span
                                className={`flex h-7 w-7 items-center justify-center rounded-lg border text-xs font-black ${style.numberBadge}`}
                              >
                                {q.number}
                              </span>
                              <h4
                                className={`font-black text-white ${
                                  stageLargeText
                                    ? "text-lg sm:text-2xl"
                                    : "text-base sm:text-lg"
                                }`}
                              >
                                {q.title}
                              </h4>
                            </div>

                            <div className="flex flex-wrap items-center gap-2">
                              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-0.5 text-[11px] font-semibold text-slate-300">
                                {q.suggestedTiming}
                              </span>

                              {!q.isAllPanelists && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    setAssigningQuestionId(
                                      isAssignOpen ? null : q.id
                                    )
                                  }
                                  className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] hover:bg-white/[0.1] px-2.5 py-0.5 text-[11px] font-semibold text-blue-300 cursor-pointer"
                                >
                                  <UserCheck
                                    className="h-3 w-3"
                                    aria-hidden="true"
                                  />
                                  Assign Panelist
                                </button>
                              )}

                              <button
                                type="button"
                                onClick={() =>
                                  setOpenNoteKey(
                                    openNoteKey === noteKey ? null : noteKey
                                  )
                                }
                                className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] hover:bg-white/[0.1] px-2.5 py-0.5 text-[11px] font-semibold text-emerald-300 cursor-pointer"
                              >
                                <MessageSquare
                                  className="h-3 w-3"
                                  aria-hidden="true"
                                />
                                {hasNote ? "Edit Note" : "+ Prep Note"}
                              </button>
                            </div>
                          </div>

                          <p
                            className={`text-slate-200 leading-relaxed ${
                              stageLargeText
                                ? "text-base sm:text-xl font-medium"
                                : "text-sm sm:text-base"
                            }`}
                          >
                            {q.prompt}
                          </p>

                          {/* Assigned Speakers Chips */}
                          <div className="mt-3.5 flex flex-wrap items-center gap-2">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                              {q.isAllPanelists
                                ? "Directed To:"
                                : "Suggested Panelists:"}
                            </span>
                            {q.isAllPanelists ? (
                              <span
                                className={`rounded-full border px-3 py-0.5 text-xs font-bold ${style.chipActive}`}
                              >
                                All {speakers.length} Panelists (60–90s Opening Stance)
                              </span>
                            ) : assignedSpeakers.length > 0 ? (
                              assignedSpeakers.map((spName) => (
                                <span
                                  key={spName}
                                  className={`rounded-full border px-3 py-0.5 text-xs font-bold ${style.chipActive}`}
                                >
                                  {spName}
                                </span>
                              ))
                            ) : (
                              <span className="text-xs italic text-slate-500">
                                Open to any panelist
                              </span>
                            )}
                          </div>

                          {/* Interactive Panelist Reassignment Picker */}
                          {isAssignOpen && !q.isAllPanelists && (
                            <div className="mt-3 pt-3 border-t border-white/10 flex flex-wrap items-center gap-2">
                              <span className="text-[11px] font-bold text-slate-400">
                                Toggle panelists for Question {q.number}:
                              </span>
                              {speakers.map((sp) => {
                                const active = assignedSpeakers.includes(
                                  sp.name
                                );
                                return (
                                  <button
                                    key={sp.id}
                                    type="button"
                                    onClick={() =>
                                      toggleSpeakerAssignment(q.id, sp.name)
                                    }
                                    className={`rounded-full border px-3 py-1 text-xs font-bold transition-all cursor-pointer ${
                                      active
                                        ? style.pillActive
                                        : "border-white/15 bg-black/50 text-slate-400 hover:text-white"
                                    }`}
                                  >
                                    {active ? "✓ " : "+ "}
                                    {sp.name}
                                  </button>
                                );
                              })}
                            </div>
                          )}

                          {/* Personal Prep Notes Drawer */}
                          {isNoteOpen && (
                            <div className="mt-3.5 pt-3 border-t border-white/10">
                              <label className="block text-[11px] font-bold uppercase tracking-wider text-emerald-400 mb-1.5">
                                Personal Talking Points / Moderator Cue (Saved on this device)
                              </label>
                              <textarea
                                rows={2}
                                value={notes[noteKey] || ""}
                                onChange={(e) =>
                                  handleNoteChange(noteKey, e.target.value)
                                }
                                placeholder="Jot down your key examples, local case studies, or follow-up angle for this question..."
                                className="w-full rounded-xl border border-white/15 bg-slate-950/90 px-3.5 py-2 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none"
                              />
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ol>
                </div>
              </motion.section>
            );
          })}
        </div>

        {/* ── FOOTER NAVIGATION ────────────────────────────────── */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.02] px-6 py-4 text-xs">
          <Link
            href="/speakers"
            className="inline-flex items-center gap-1.5 font-bold text-slate-300 hover:text-emerald-400 transition-colors"
          >
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            View Public Speakers &amp; Sessions Directory
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1 font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            Jos TechFest 2026 Home
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </main>
  );
}
