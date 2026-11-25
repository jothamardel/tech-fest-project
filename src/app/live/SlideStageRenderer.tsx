"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { TECHFEST_SESSIONS } from "@/data/sessions";
import {
  ACCENT_PALETTE,
  EVENT_GALLERY_PHOTOS,
  SPONSOR_TIERS,
  type ProgramSlide,
} from "./programSlides";

export interface StageBroadcastState {
  logoHold: boolean;
  blackout: boolean;
  showLowerThird: boolean;
  lowerThirdTitle: string;
  lowerThirdMessage: string;
  showTimer: boolean;
  timerRemainingSec: number;
  timerRunning: boolean;
}

function formatTimerMMSS(totalSec: number): string {
  const clamped = Math.max(0, Math.floor(totalSec));
  const mins = String(Math.floor(clamped / 60)).padStart(2, "0");
  const secs = String(clamped % 60).padStart(2, "0");
  return `${mins}:${secs}`;
}

export const SlideStageRenderer: React.FC<{
  slide: ProgramSlide;
  aspect: "16:9" | "9:16";
  replayKey: number;
  broadcast: StageBroadcastState;
}> = ({ slide, aspect, replayKey, broadcast }) => {
  const theme = ACCENT_PALETTE[slide.accent] || ACCENT_PALETTE.emerald;
  const [photoIdx, setPhotoIdx] = useState(0);
  const [promoScene, setPromoScene] = useState<0 | 1 | 2>(0);
  const [clockTime, setClockTime] = useState("08:30 WAT");

  // Live clock for Welcome Walk-in Slide
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setClockTime(
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) + " WAT"
      );
    };
    updateClock();
    const id = setInterval(updateClock, 10000);
    return () => clearInterval(id);
  }, []);

  // Auto-advance photo reel every 4.5s
  useEffect(() => {
    if (slide.kind !== "photo-reel") return;
    const photos = slide.galleryPhotos || EVENT_GALLERY_PHOTOS;
    const id = setInterval(() => {
      setPhotoIdx((prev) => (prev + 1) % photos.length);
    }, 4500);
    return () => clearInterval(id);
  }, [slide.kind, slide.galleryPhotos]);

  // Auto-advance 3-scene promo loop
  useEffect(() => {
    if (slide.kind !== "promo-loop") return;
    setPromoScene(0);
    const id = setInterval(() => {
      setPromoScene((prev) => ((prev + 1) % 3) as 0 | 1 | 2);
    }, 3800);
    return () => clearInterval(id);
  }, [slide.kind, replayKey]);

  // 1. EMERGENCY BLACKOUT SCREEN (Key: B)
  if (broadcast.blackout) {
    return <div className="relative h-full w-full bg-black" />;
  }

  // 2. EMERGENCY LOGO HOLD SCREEN (Key: L)
  if (broadcast.logoHold) {
    return (
      <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-[#09090B] text-white p-10">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(16,185,129,0.28) 0%, rgba(9,9,11,0.98) 68%)",
          }}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 160, damping: 20 }}
          className="relative z-10 flex flex-col items-center gap-6 text-center"
        >
          <div className="rounded-3xl border border-white/15 bg-white/[0.05] px-10 py-6 shadow-2xl">
            <Image
              src="/logo.png"
              alt="Jos TechFest 2026"
              width={220}
              height={72}
              className="h-16 sm:h-20 w-auto object-contain brightness-0 invert"
            />
          </div>
          <span className="rounded-full border border-emerald-400/40 bg-emerald-500/15 px-5 py-1.5 text-xs sm:text-sm font-extrabold uppercase tracking-[0.2em] text-emerald-300">
            JOS TECHFEST 2026 · 26 NOVEMBER 2026
          </span>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white">
            AI for{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              every sector.
            </span>
          </h2>
          <p className="text-sm sm:text-base font-semibold text-slate-400">
            Sarau Event Center, Jos · #JosTechFest · register.techfest.com.ng
          </p>
        </motion.div>
      </div>
    );
  }

  const titleWords = slide.title.split(" ");
  const photos = slide.galleryPhotos || EVENT_GALLERY_PHOTOS;

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#09090B] text-white select-none">
      {/* ============================================================
          PROCEDURAL 3D VOLUMETRIC STAGE SHADER BACKGROUND
          ============================================================ */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 transition-all duration-700"
          style={{
            background: `radial-gradient(ellipse at 32% 45%, ${theme.glowRgba} 0%, rgba(9,9,11,0.97) 68%)`,
          }}
        />
        <motion.div
          animate={{ x: [-70, 70, -70], rotate: [-20, -13, -20] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-28 left-0 h-72 w-[135%] rounded-full opacity-30 blur-3xl"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${theme.primary} 38%, ${theme.secondary} 72%, transparent 100%)`,
          }}
        />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(rgba(250,250,250,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(250,250,250,0.06) 1px, transparent 1px)",
            backgroundSize: "52px 52px",
          }}
        />
        <div className="absolute bottom-5 right-5 text-[6.5vw] font-black tracking-tighter text-white/[0.025] whitespace-nowrap">
          AI FOR EVERY SECTOR
        </div>
      </div>

      {/* ============================================================
          MAIN SLIDE CONTENT LAYER
          ============================================================ */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${slide.id}-${aspect}-${replayKey}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className={`relative z-10 flex h-full w-full flex-col justify-between ${
            aspect === "16:9" ? "p-6 sm:p-10 md:p-12" : "px-6 py-10 sm:px-8 sm:py-12"
          }`}
        >
          {/* ── TOP STAGE HEADER BAR ─────────────────────────────── */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <Image
                src="/logo.png"
                alt="Jos TechFest"
                width={130}
                height={40}
                className="h-7 sm:h-9 w-auto object-contain brightness-0 invert"
              />
              <span className="hidden sm:inline-block h-4 w-px bg-white/20" />
              <span className="hidden sm:inline-block text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.15em] text-emerald-400">
                AI FOR EVERY SECTOR · 26 NOV 2026
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              {/* Stage Countdown Timer Overlay (when active) */}
              {broadcast.showTimer && (
                <div
                  className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-xs sm:text-sm font-black tracking-wider shadow-lg ${
                    broadcast.timerRemainingSec <= 60
                      ? "border-red-400 bg-red-500/25 text-red-200 animate-pulse"
                      : "border-amber-400/60 bg-amber-500/20 text-amber-300"
                  }`}
                >
                  <span className="h-2 w-2 rounded-full bg-current" />
                  STAGE TIMER · {formatTimerMMSS(broadcast.timerRemainingSec)}
                </div>
              )}

              {/* Slide Track / Cue Badge */}
              <div
                className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-white shadow-lg"
                style={{
                  backgroundColor: theme.badgeBgRgba,
                  border: `1.5px solid ${theme.borderRgba}`,
                }}
              >
                <span
                  className="h-2 w-2 rounded-full animate-pulse"
                  style={{ backgroundColor: theme.secondary }}
                />
                {slide.badgeLabel}
              </div>
            </div>
          </div>

          {/* ── BODY VARIANT 1: SPEAKER / ANCHOR WALK-ON (Photo or Monogram) ── */}
          {slide.kind === "speaker-walkon" && (
            <div
              className={`flex flex-1 items-center gap-6 sm:gap-10 my-3 ${
                aspect === "16:9" ? "flex-row" : "flex-col justify-center"
              }`}
            >
              {/* 3D Portrait / Monogram Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85, rotateY: 18 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ type: "spring", mass: 1.1, stiffness: 150, damping: 20 }}
                className={`relative flex-shrink-0 rounded-3xl p-2 bg-white/[0.06] shadow-2xl overflow-hidden ${
                  aspect === "16:9"
                    ? "w-44 h-56 sm:w-64 sm:h-80 md:w-80 md:h-[390px]"
                    : "w-full h-64 sm:h-72"
                }`}
                style={{ border: `2px solid ${theme.borderRgba}` }}
              >
                <div className="relative h-full w-full overflow-hidden rounded-2xl bg-[#10211A]">
                  {slide.mediaUrl ? (
                    <img
                      src={slide.mediaUrl}
                      alt={slide.title}
                      className="h-full w-full object-cover object-top"
                    />
                  ) : (
                    <div
                      className="flex h-full w-full flex-col items-center justify-center p-6 text-center"
                      style={{
                        background: `radial-gradient(circle at 50% 42%, ${theme.glowRgba} 0%, #0A1411 75%)`,
                      }}
                    >
                      <div
                        className="flex h-28 w-28 sm:h-36 sm:w-36 items-center justify-center rounded-full text-4xl sm:text-5xl font-black text-white shadow-inner"
                        style={{
                          backgroundColor: theme.badgeBgRgba,
                          border: `3px solid ${theme.borderRgba}`,
                        }}
                      >
                        {slide.initials || "TF"}
                      </div>
                    </div>
                  )}

                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(9,9,11,0.92) 0%, rgba(9,9,11,0.15) 45%, transparent 100%)",
                    }}
                  />

                  {/* Live Stage Equalizer Bar */}
                  <div
                    className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-xl bg-black/80 px-3 py-2 backdrop-blur-md"
                    style={{ border: `1px solid ${theme.borderRgba}` }}
                  >
                    <span
                      className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider"
                      style={{ color: theme.secondary }}
                    >
                      ON STAGE · CUE #{slide.cueNumber}
                    </span>
                    <div className="flex items-end gap-1 h-4">
                      {[0.45, 0.95, 0.6, 1, 0.5].map((h, i) => (
                        <motion.span
                          key={i}
                          animate={{ height: ["25%", `${h * 100}%`, "35%"] }}
                          transition={{
                            duration: 0.7 + i * 0.1,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className="w-1 rounded-full"
                          style={{ backgroundColor: theme.secondary }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Speaker Name & Talk Card */}
              <div className="flex flex-1 flex-col justify-center gap-3 sm:gap-4">
                <span
                  className="inline-flex self-start rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1 text-xs sm:text-sm font-bold"
                  style={{ color: theme.secondary }}
                >
                  {slide.subtitle}
                </span>

                <div className="flex flex-wrap gap-x-3 gap-y-1">
                  {titleWords.map((word, idx) => {
                    const isLast = idx === titleWords.length - 1;
                    return (
                      <motion.span
                        key={`${word}-${idx}`}
                        initial={{ opacity: 0, y: 32, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 180,
                          damping: 16,
                          delay: 0.12 + idx * 0.07,
                        }}
                        className={`font-black tracking-tight leading-[1.04] ${
                          aspect === "16:9"
                            ? "text-3xl sm:text-5xl md:text-6xl"
                            : "text-2xl sm:text-4xl"
                        }`}
                        style={{ color: isLast ? theme.secondary : "#FAFAFA" }}
                      >
                        {word}
                      </motion.span>
                    );
                  })}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 150, damping: 20, delay: 0.35 }}
                  className="rounded-2xl bg-white/[0.045] p-4 sm:p-6 shadow-xl"
                  style={{ border: `1.5px solid ${theme.borderRgba}` }}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span
                      className="rounded-full px-3 py-0.5 text-[10px] sm:text-xs font-extrabold uppercase tracking-wider"
                      style={{
                        backgroundColor: theme.badgeBgRgba,
                        color: theme.secondary,
                        border: `1px solid ${theme.borderRgba}`,
                      }}
                    >
                      {slide.actLabel}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-slate-300">
                      {slide.timeSlot}
                    </span>
                  </div>
                  <p className="text-base sm:text-xl md:text-2xl font-extrabold text-white leading-snug">
                    “{slide.talkTitle || slide.subtitle}”
                  </p>
                </motion.div>
              </div>
            </div>
          )}

          {/* ── BODY VARIANT 2: SESSION TRACK BUMPER ─────────────── */}
          {slide.kind === "session-bumper" && (
            <div className="flex flex-1 flex-col justify-center gap-5 my-2">
              <div className="flex flex-col gap-2">
                <span
                  className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.2em]"
                  style={{ color: theme.secondary }}
                >
                  {slide.timeSlot} · MAIN AUDITORIUM
                </span>
                <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-[1.03]">
                  {slide.title}
                </h2>
                <p className="text-base sm:text-2xl font-semibold text-slate-300 max-w-4xl">
                  {slide.subtitle}
                </p>
              </div>

              {/* Highlights + Speakers Preview Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                {slide.highlights && (
                  <div
                    className="md:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5 rounded-2xl bg-white/[0.04] p-4"
                    style={{ border: `1px solid ${theme.borderRgba}` }}
                  >
                    {slide.highlights.map((h) => (
                      <div
                        key={h}
                        className="flex items-center gap-2 rounded-xl bg-black/50 px-3 py-2 text-xs sm:text-sm font-bold text-slate-200"
                      >
                        <span
                          className="h-2 w-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: theme.secondary }}
                        />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                )}

                {slide.people && (
                  <div
                    className="md:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3"
                  >
                    {slide.people.map((person, idx) => (
                      <motion.div
                        key={person.id}
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 + idx * 0.08 }}
                        className="flex flex-col items-center rounded-2xl bg-white/[0.045] p-3 text-center"
                        style={{ border: `1.5px solid ${theme.borderRgba}` }}
                      >
                        <div
                          className="relative h-16 w-16 sm:h-20 sm:w-20 overflow-hidden rounded-2xl mb-2 flex items-center justify-center bg-slate-900"
                          style={{ border: `2px solid ${theme.secondary}` }}
                        >
                          {person.image ? (
                            <img
                              src={person.image}
                              alt={person.name}
                              className="h-full w-full object-cover object-top"
                            />
                          ) : (
                            <span className="text-xl font-black text-white">
                              {person.initials}
                            </span>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm font-extrabold text-white leading-tight">
                          {person.name}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── BODY VARIANT 3: PANEL DISCUSSION / FIRESIDE CHAT / ANCHORS TRIO ── */}
          {(slide.kind === "panel-backdrop" ||
            slide.kind === "anchors-trio" ||
            slide.kind === "fireside-chat") && (
            <div className="flex flex-1 flex-col justify-center gap-4 my-2">
              <div className="text-center">
                <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
                  {slide.title}
                </h2>
                {typeof slide.activeQuestionIndex !== "number" && (
                  <p className="mt-1.5 text-xs sm:text-base text-slate-300 font-medium max-w-3xl mx-auto line-clamp-2">
                    {slide.subtitle}
                  </p>
                )}
              </div>

              {/* Active Projected Panel Question Banner on LED Wall */}
              {slide.panelQuestions &&
                typeof slide.activeQuestionIndex === "number" &&
                slide.panelQuestions[slide.activeQuestionIndex] && (
                  <motion.div
                    key={slide.panelQuestions[slide.activeQuestionIndex].id}
                    initial={{ opacity: 0, y: 18, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ type: "spring", stiffness: 180, damping: 18 }}
                    className="mx-auto w-full max-w-5xl rounded-3xl bg-white/[0.06] p-5 sm:p-7 shadow-2xl"
                    style={{ border: `2px solid ${theme.borderRgba}` }}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                      <span
                        className="rounded-full px-3.5 py-1 text-xs font-black uppercase tracking-wider"
                        style={{
                          backgroundColor: theme.badgeBgRgba,
                          color: theme.secondary,
                          border: `1px solid ${theme.borderRgba}`,
                        }}
                      >
                        QUESTION 0
                        {slide.panelQuestions[slide.activeQuestionIndex].number} ·{" "}
                        {slide.panelQuestions[slide.activeQuestionIndex].title}
                      </span>
                      <span className="text-xs font-bold text-slate-300">
                        {
                          slide.panelQuestions[slide.activeQuestionIndex]
                            .defaultSpeakerNames.join(" · ")
                        }
                      </span>
                    </div>
                    <p className="text-lg sm:text-2xl md:text-3xl font-extrabold text-white leading-snug">
                      “{slide.panelQuestions[slide.activeQuestionIndex].prompt}”
                    </p>
                  </motion.div>
                )}

              {slide.people && (
                <div
                  className={`grid gap-3.5 ${
                    slide.people.length === 1
                      ? "grid-cols-1 max-w-md mx-auto w-full"
                      : slide.people.length === 2
                      ? "grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto w-full"
                      : slide.people.length === 3
                      ? "grid-cols-1 sm:grid-cols-3"
                      : "grid-cols-2 sm:grid-cols-4"
                  }`}
                >
                  {slide.people.map((person, idx) => (
                    <motion.div
                      key={person.id}
                      initial={{ opacity: 0, scale: 0.9, y: 24 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 160,
                        damping: 18,
                        delay: idx * 0.1,
                      }}
                      className="flex flex-col items-center rounded-3xl bg-white/[0.045] p-4 text-center shadow-2xl"
                      style={{ border: `1.5px solid ${theme.borderRgba}` }}
                    >
                      <div
                        className="relative h-28 w-28 sm:h-36 sm:w-36 overflow-hidden rounded-2xl mb-3 flex items-center justify-center bg-[#10211A]"
                        style={{ border: `2px solid ${theme.secondary}` }}
                      >
                        {person.image ? (
                          <img
                            src={person.image}
                            alt={person.name}
                            className="h-full w-full object-cover object-top"
                          />
                        ) : (
                          <span className="text-3xl sm:text-4xl font-black text-white">
                            {person.initials}
                          </span>
                        )}
                      </div>
                      <h3 className="text-base sm:text-xl font-black text-white">
                        {person.name}
                      </h3>
                      <p
                        className="text-xs font-bold mt-0.5"
                        style={{ color: theme.secondary }}
                      >
                        {person.role}
                      </p>
                      {person.talkTitle && (
                        <p className="mt-1.5 text-[11px] text-slate-300 line-clamp-2">
                          “{person.talkTitle}”
                        </p>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── BODY VARIANT 4: FULL-DAY AGENDA OVERVIEW ─────────── */}
          {slide.kind === "agenda-overview" && (
            <div className="flex flex-1 flex-col justify-center gap-4 my-2">
              <div>
                <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
                  {slide.title}
                </h2>
                <p className="text-sm sm:text-base text-slate-300 mt-1">
                  {slide.subtitle}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                {TECHFEST_SESSIONS.map((s, idx) => {
                  const sTheme = ACCENT_PALETTE[s.accent];
                  return (
                    <motion.div
                      key={s.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex flex-col justify-between rounded-2xl bg-white/[0.045] p-4"
                      style={{ border: `1.5px solid ${sTheme.borderRgba}` }}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span
                            className="rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase"
                            style={{
                              backgroundColor: sTheme.badgeBgRgba,
                              color: sTheme.secondary,
                            }}
                          >
                            SESSION 0{idx + 1}
                          </span>
                          <span className="text-[11px] font-bold text-slate-300">
                            {s.time}
                          </span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-black text-white">
                          {s.title}
                        </h3>
                        <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                          {s.tagline}
                        </p>
                      </div>
                      <div className="mt-3 pt-2.5 border-t border-white/10 flex flex-wrap gap-1">
                        {s.speakers.map((sp) => (
                          <span
                            key={sp.id}
                            className="rounded-full bg-black/60 border border-white/10 px-2 py-0.5 text-[10px] font-semibold text-slate-200"
                          >
                            {sp.name}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── BODY VARIANT 5: PAST HIGHLIGHTS PHOTO REEL ───────── */}
          {slide.kind === "photo-reel" && (
            <div className="flex flex-1 flex-col justify-center gap-4 my-2">
              <div className="relative flex-1 min-h-[280px] overflow-hidden rounded-3xl border border-white/15 bg-black shadow-2xl">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={photos[photoIdx % photos.length]}
                    src={photos[photoIdx % photos.length]}
                    alt={slide.title}
                    initial={{ opacity: 0, scale: 1.08 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.1 }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </AnimatePresence>
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(9,9,11,0.92) 0%, rgba(9,9,11,0.2) 45%, transparent 100%)",
                  }}
                />
                <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between gap-4">
                  <div>
                    <h2 className="text-2xl sm:text-4xl font-black text-white">
                      {slide.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                      {slide.subtitle}
                    </p>
                  </div>
                  <span className="rounded-full bg-black/80 border border-white/15 px-3.5 py-1 text-xs font-bold text-emerald-300">
                    Photo {(photoIdx % photos.length) + 1} / {photos.length}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* ── BODY VARIANT 6: SPONSORS & PARTNERS WALL ─────────── */}
          {slide.kind === "sponsors-wall" && (
            <div className="flex flex-1 flex-col justify-center gap-4 my-2">
              <div className="text-center">
                <h2 className="text-3xl sm:text-5xl font-black text-white">
                  {slide.title}
                </h2>
                <p className="text-xs sm:text-base text-slate-300 mt-1">
                  {slide.subtitle}
                </p>
              </div>

              <div className="flex flex-col gap-3">
                {/* Headline Sponsors */}
                <div className="rounded-2xl border border-emerald-500/30 bg-white/[0.04] p-3.5 text-center">
                  <span className="block text-[10px] font-extrabold uppercase tracking-widest text-emerald-400 mb-2.5">
                    Headline Sponsors
                  </span>
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    {SPONSOR_TIERS.headline.map((s) => (
                      <div
                        key={s.src}
                        className="flex h-14 min-w-[9rem] items-center justify-center gap-2 rounded-xl bg-white px-4 shadow"
                      >
                        <img
                          src={s.src}
                          alt={s.name}
                          className={`${
                            s.showLabel ? "h-9 w-9" : "max-h-9 w-auto"
                          } object-contain`}
                        />
                        {s.showLabel && (
                          <span className="text-left text-[11px] font-black uppercase tracking-tight text-slate-900 leading-tight">
                            Devkings
                            <span className="block text-[9px] font-bold text-amber-600 tracking-wider">
                              Technologies
                            </span>
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ecosystem & Community Partners */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3.5 text-center">
                    <span className="block text-[10px] font-extrabold uppercase tracking-widest text-blue-400 mb-2.5">
                      Ecosystem Partners
                    </span>
                    <div className="flex flex-wrap items-center justify-center gap-2.5">
                      {SPONSOR_TIERS.ecosystem.map((s) => (
                        <div
                          key={s.src}
                          className="flex h-11 w-24 items-center justify-center rounded-lg bg-white/95 px-2.5"
                        >
                          <img
                            src={s.src}
                            alt={s.name}
                            className="max-h-7 w-auto object-contain"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3.5 text-center">
                    <span className="block text-[10px] font-extrabold uppercase tracking-widest text-amber-400 mb-2.5">
                      Community Hubs
                    </span>
                    <div className="flex flex-wrap items-center justify-center gap-2.5">
                      {SPONSOR_TIERS.community.map((s) => (
                        <div
                          key={s.src}
                          className="flex h-11 w-24 items-center justify-center rounded-lg bg-white/95 px-2.5"
                        >
                          <img
                            src={s.src}
                            alt={s.name}
                            className="max-h-7 w-auto object-contain"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── BODY VARIANT 7: CUSTOM INJECTED MEDIA OR STARTUP VIDEO SHOWCASE ── */}
          {(slide.kind === "custom-media" || slide.kind === "startup-video") && (
            <div className="flex flex-1 flex-col justify-center gap-3 my-2">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                    {slide.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300">{slide.subtitle}</p>
                </div>
                <span
                  className="rounded-full px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider"
                  style={{
                    backgroundColor: theme.badgeBgRgba,
                    color: theme.secondary,
                    border: `1px solid ${theme.borderRgba}`,
                  }}
                >
                  {slide.kind === "startup-video" ? "STARTUP SPOTLIGHT VIDEO" : "LIVE MEDIA"}
                </span>
              </div>
              <div
                className="relative flex-1 min-h-[260px] overflow-hidden rounded-3xl bg-black flex items-center justify-center shadow-2xl"
                style={{ border: `2px solid ${theme.borderRgba}` }}
              >
                {(slide.mediaType === "video" || slide.kind === "startup-video") &&
                slide.mediaUrl &&
                slide.mediaType !== "embed" ? (
                  <video
                    key={slide.mediaUrl}
                    src={slide.mediaUrl}
                    controls
                    autoPlay
                    loop
                    playsInline
                    className="h-full w-full object-contain"
                  />
                ) : slide.mediaType === "embed" && slide.mediaUrl ? (
                  <iframe
                    src={slide.mediaUrl}
                    title={slide.title}
                    className="h-full w-full border-0"
                    allow="fullscreen; autoplay"
                  />
                ) : slide.mediaUrl ? (
                  <img
                    src={slide.mediaUrl}
                    alt={slide.title}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <div className="text-center p-8">
                    <h3 className="text-2xl sm:text-4xl font-black text-white">
                      {slide.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-400">
                      Use the &ldquo;Upload Startup MP4 / Video&rdquo; button in the right editor panel to load the startup video file.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── BODY VARIANT 7B: BREAKING THE ICE & INTERACTIVE TECH GAMES ── */}
          {slide.kind === "icebreaker-games" && (
            <div className="flex flex-1 flex-col items-center justify-center text-center gap-6 my-2 px-4">
              <span
                className="rounded-full px-5 py-1.5 text-xs sm:text-sm font-black uppercase tracking-[0.2em]"
                style={{
                  backgroundColor: theme.badgeBgRgba,
                  border: `1.5px solid ${theme.borderRgba}`,
                  color: theme.secondary,
                }}
              >
                AUDIENCE WARM-UP · PRIZES & SWAG GIVEAWAYS
              </span>

              <motion.h2
                initial={{ opacity: 0, scale: 0.9, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 180, damping: 16 }}
                className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-[1.03]"
              >
                {slide.title}
              </motion.h2>

              <p className="text-base sm:text-2xl font-semibold text-slate-300 max-w-3xl">
                {slide.subtitle}
              </p>

              {slide.highlights && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full max-w-4xl pt-2">
                  {slide.highlights.map((round, rIdx) => (
                    <motion.div
                      key={round}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.12 + rIdx * 0.08 }}
                      className="flex items-center gap-3.5 rounded-2xl bg-white/[0.05] px-5 py-4 text-left shadow-xl"
                      style={{ border: `1.5px solid ${theme.borderRgba}` }}
                    >
                      <span
                        className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-sm font-black"
                        style={{
                          backgroundColor: theme.badgeBgRgba,
                          color: theme.secondary,
                        }}
                      >
                        0{rIdx + 1}
                      </span>
                      <span className="text-sm sm:text-lg font-extrabold text-white">
                        {round}
                      </span>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── BODY VARIANT 8: PROMO LOOP / WELCOME / BREAK / OPENING / CLOSING ── */}
          {(slide.kind === "welcome-loop" ||
            slide.kind === "promo-loop" ||
            slide.kind === "opening-bumper" ||
            slide.kind === "break-hold" ||
            slide.kind === "closing-thankyou") && (
            <div className="flex flex-1 flex-col items-center justify-center text-center gap-5 my-2 px-4">
              {slide.kind === "welcome-loop" && (
                <div className="inline-flex items-center gap-3 rounded-full border border-emerald-400/40 bg-emerald-500/15 px-5 py-1.5 text-sm font-black text-emerald-300">
                  <span>LIVE TIME · {clockTime}</span>
                  <span>•</span>
                  <span>SARAU EVENT CENTER, JOS</span>
                </div>
              )}

              {slide.kind === "promo-loop" && (
                <span className="rounded-full border border-blue-400/40 bg-blue-500/15 px-4 py-1 text-xs font-extrabold uppercase tracking-widest text-blue-300">
                  {promoScene === 0
                    ? "SCENE 01 · AI FOR EVERY SECTOR"
                    : promoScene === 1
                    ? "SCENE 02 · 4 SIGNATURE SESSIONS & 15 SPEAKERS"
                    : "SCENE 03 · REGISTER.TECHFEST.COM.NG"}
                </span>
              )}

              <motion.h2
                initial={{ opacity: 0, y: 28, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 170, damping: 18 }}
                className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white max-w-5xl leading-[1.04]"
              >
                {slide.title}
              </motion.h2>

              <p className="text-base sm:text-2xl font-semibold text-slate-300 max-w-3xl leading-relaxed">
                {slide.subtitle}
              </p>

              {/* 4 Track Pills Strip */}
              <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
                {TECHFEST_SESSIONS.map((s, idx) => {
                  const sTheme = ACCENT_PALETTE[s.accent];
                  return (
                    <span
                      key={s.id}
                      className="rounded-full px-4 py-1.5 text-xs sm:text-sm font-extrabold"
                      style={{
                        backgroundColor: sTheme.badgeBgRgba,
                        border: `1.5px solid ${sTheme.borderRgba}`,
                        color: "#FAFAFA",
                      }}
                    >
                      0{idx + 1} · {s.title}
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── BOTTOM STAGE FOOTER / LIVE LOWER-THIRD OVERLAY ────── */}
          {broadcast.showLowerThird ? (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between gap-4 rounded-2xl border border-emerald-400/50 bg-black/85 px-5 py-3 shadow-2xl backdrop-blur-md"
            >
              <div className="flex items-center gap-3">
                <span className="rounded-lg bg-emerald-500 px-2.5 py-1 text-[11px] font-black uppercase tracking-wider text-slate-950">
                  {broadcast.lowerThirdTitle || "LIVE STAGE UPDATE"}
                </span>
                <span className="text-sm sm:text-base font-extrabold text-white">
                  {broadcast.lowerThirdMessage}
                </span>
              </div>
              <span className="hidden sm:inline-block text-xs font-extrabold text-emerald-400">
                #JosTechFest
              </span>
            </motion.div>
          ) : (
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/10 text-xs sm:text-sm">
              <div className="flex items-center gap-2 text-slate-300 font-semibold">
                <span>Sarau Event Center, Jos</span>
                <span className="text-slate-600">•</span>
                <span className="text-emerald-400 font-extrabold">
                  register.techfest.com.ng
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-slate-400 font-mono text-xs">
                  {slide.timeSlot}
                </span>
                <span className="font-extrabold text-white tracking-wider">
                  #JosTechFest
                </span>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

