"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  Maximize2,
  Minimize2,
  RotateCcw,
  Monitor,
  Smartphone,
  Sparkles,
  Repeat,
  ChevronLeft,
  ChevronRight,
  Film,
  Download,
  Image as ImageIcon,
  Loader2,
} from "lucide-react";
import {
  downloadSpeakerVideoFile,
  downloadSpeakerPosterPng,
  downloadPromoVideoFile,
} from "./videoExporter";

type SpotlightPerson = {
  id: string;
  name: string;
  role: string;
  badgeLabel: string;
  sessionNumber: string;
  trackTitle: string;
  talkTitle: string;
  timeSlot: string;
  image: string;
  primaryColor: string;
  secondaryColor: string;
  glowRgba: string;
  borderRgba: string;
  badgeBgRgba: string;
};

const SPOTLIGHT_ROSTER: SpotlightPerson[] = [
  {
    id: "christie-dasaro",
    name: "Engr. Christie Dasaro",
    role: "Session Speaker · AI x Education",
    badgeLabel: "SESSION 01 · AI x EDUCATION",
    sessionNumber: "01",
    trackTitle: "AI x Education",
    talkTitle: "Engineering Intelligent Learning Systems & STEM Pathways",
    timeSlot: "09:30 – 11:00 WAT",
    image: "/images/Chriatie.jpg",
    primaryColor: "#3B82F6",
    secondaryColor: "#60A5FA",
    glowRgba: "rgba(59, 130, 246, 0.42)",
    borderRgba: "rgba(96, 165, 250, 0.55)",
    badgeBgRgba: "rgba(37, 99, 235, 0.22)",
  },
  {
    id: "adamu-usman",
    name: "Dr. Adamu Usman",
    role: "Session Speaker · AI x Education",
    badgeLabel: "SESSION 01 · AI x EDUCATION",
    sessionNumber: "01",
    trackTitle: "AI x Education",
    talkTitle: "Adaptive Classrooms & Next-Gen Academic Research",
    timeSlot: "09:30 – 11:00 WAT",
    image: "/images/jtf-36.jpg",
    primaryColor: "#3B82F6",
    secondaryColor: "#60A5FA",
    glowRgba: "rgba(59, 130, 246, 0.42)",
    borderRgba: "rgba(96, 165, 250, 0.55)",
    badgeBgRgba: "rgba(37, 99, 235, 0.22)",
  },
  {
    id: "goselle-obed-nanjul",
    name: "Prof. Goselle Obed Nanjul",
    role: "Session Speaker · AI x Education",
    badgeLabel: "SESSION 01 · AI x EDUCATION",
    sessionNumber: "01",
    trackTitle: "AI x Education",
    talkTitle: "AI-Driven Research & Institutional Transformation",
    timeSlot: "09:30 – 11:00 WAT",
    image: "/images/Gosale.jpg",
    primaryColor: "#3B82F6",
    secondaryColor: "#60A5FA",
    glowRgba: "rgba(59, 130, 246, 0.42)",
    borderRgba: "rgba(96, 165, 250, 0.55)",
    badgeBgRgba: "rgba(37, 99, 235, 0.22)",
  },
  {
    id: "nnamdi-ibe",
    name: "Mr. Nnamdi Ibe",
    role: "Session Speaker · AI x Business",
    badgeLabel: "SESSION 02 · AI x BUSINESS",
    sessionNumber: "02",
    trackTitle: "AI x Business",
    talkTitle: "AI-First Product Strategy for African Markets",
    timeSlot: "11:15 – 12:45 WAT",
    image: "/images/nnamdi.jpg",
    primaryColor: "#10B981",
    secondaryColor: "#34D399",
    glowRgba: "rgba(16, 185, 129, 0.42)",
    borderRgba: "rgba(52, 211, 153, 0.55)",
    badgeBgRgba: "rgba(16, 185, 129, 0.22)",
  },
  {
    id: "moses-amama",
    name: "Moses Amama",
    role: "Session Speaker · AI x Business",
    badgeLabel: "SESSION 02 · AI x BUSINESS",
    sessionNumber: "02",
    trackTitle: "AI x Business",
    talkTitle: "Autonomous Workflows & High-Leverage Business Growth",
    timeSlot: "11:15 – 12:45 WAT",
    image: "/images/Mo.jpg",
    primaryColor: "#10B981",
    secondaryColor: "#34D399",
    glowRgba: "rgba(16, 185, 129, 0.42)",
    borderRgba: "rgba(52, 211, 153, 0.55)",
    badgeBgRgba: "rgba(16, 185, 129, 0.22)",
  },
  {
    id: "david-enyi",
    name: "David Enyi",
    role: "Session Speaker · AI x Creatives",
    badgeLabel: "SESSION 03 · AI x CREATIVES",
    sessionNumber: "03",
    trackTitle: "AI x Creatives",
    talkTitle: "Designing Expressive Digital Experiences with AI",
    timeSlot: "13:45 – 15:15 WAT",
    image: "/images/dav.jpg",
    primaryColor: "#6366F1",
    secondaryColor: "#818CF8",
    glowRgba: "rgba(99, 102, 241, 0.45)",
    borderRgba: "rgba(129, 140, 248, 0.55)",
    badgeBgRgba: "rgba(99, 102, 241, 0.22)",
  },
  {
    id: "samuel-adebayo",
    name: "Samuel Adebayo",
    role: "Official Stage Host & Event Anchor",
    badgeLabel: "MAIN STAGE ANCHOR · JOS TECHFEST",
    sessionNumber: "HOST",
    trackTitle: "Main Stage Anchor",
    talkTitle: "Guiding the Energy, Conversations & Stage Flow Across All Sessions",
    timeSlot: "08:30 – 17:45 WAT",
    image: "/images/ancor7.jpg",
    primaryColor: "#10B981",
    secondaryColor: "#FBBF24",
    glowRgba: "rgba(245, 158, 11, 0.38)",
    borderRgba: "rgba(251, 191, 36, 0.55)",
    badgeBgRgba: "rgba(245, 158, 11, 0.20)",
  },
  {
    id: "judith-nyior",
    name: "Judith Nyior",
    role: "Official Stage Host & Event Anchor",
    badgeLabel: "MAIN STAGE ANCHOR · JOS TECHFEST",
    sessionNumber: "HOST",
    trackTitle: "Main Stage Anchor",
    talkTitle: "Connecting Speakers, Builders & Live Audience Across All Four Tracks",
    timeSlot: "08:30 – 17:45 WAT",
    image: "/images/ancor6.jpg",
    primaryColor: "#10B981",
    secondaryColor: "#FBBF24",
    glowRgba: "rgba(245, 158, 11, 0.38)",
    borderRgba: "rgba(251, 191, 36, 0.55)",
    badgeBgRgba: "rgba(245, 158, 11, 0.20)",
  },
];

const PROMO_SESSIONS = [
  {
    num: "01",
    title: "AI x Education",
    time: "09:30 – 11:00 WAT",
    color: "#60A5FA",
    border: "rgba(96, 165, 250, 0.45)",
    bg: "rgba(37, 99, 235, 0.16)",
    speakers: ["Engr. Christie Dasaro", "Dr. Adamu Usman", "Prof. Goselle Obed Nanjul"],
  },
  {
    num: "02",
    title: "AI x Business",
    time: "11:15 – 12:45 WAT",
    color: "#34D399",
    border: "rgba(52, 211, 153, 0.45)",
    bg: "rgba(16, 185, 129, 0.16)",
    speakers: ["Mr. Nnamdi Ibe", "Mr. Ibrahim Jimoh", "Moses Amama", "Jennifer Turay"],
  },
  {
    num: "03",
    title: "AI x Creatives",
    time: "13:45 – 15:15 WAT",
    color: "#818CF8",
    border: "rgba(129, 140, 248, 0.45)",
    bg: "rgba(99, 102, 241, 0.16)",
    speakers: ["Mr. Christopher Haruna", "Jethro Da'ar", "Timothy Kunat", "David Enyi"],
  },
  {
    num: "04",
    title: "Startup Ecosystem & Policy",
    time: "15:30 – 17:00 WAT",
    color: "#FBBF24",
    border: "rgba(251, 191, 36, 0.45)",
    bg: "rgba(245, 158, 11, 0.16)",
    speakers: ["Mr. Theodore Longji", "Mr. Bashir Sheidu", "Mr. Stephen Kusu", "Mr. Sheneni Tukura"],
  },
];

export default function VideosStagePage() {
  const [mode, setMode] = useState<"speakers" | "promo">("speakers");
  const [aspect, setAspect] = useState<"16:9" | "9:16">("16:9");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [autoCycle, setAutoCycle] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [replayKey, setReplayKey] = useState(0);
  const [promoScene, setPromoScene] = useState<0 | 1 | 2>(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [downloadingLabel, setDownloadingLabel] = useState<string | null>(null);
  const [downloadProgress, setDownloadProgress] = useState<number>(0);

  const stageContainerRef = useRef<HTMLDivElement>(null);
  const currentSpeaker = SPOTLIGHT_ROSTER[selectedIndex];

  const handleDownloadCurrentVideo = useCallback(async () => {
    if (downloadingLabel) return;
    try {
      setDownloadProgress(0);
      if (mode === "promo") {
        setDownloadingLabel("15s Promo Video");
        await downloadPromoVideoFile(SPOTLIGHT_ROSTER, (pct) =>
          setDownloadProgress(pct)
        );
      } else {
        setDownloadingLabel(`${currentSpeaker.name} (${aspect})`);
        await downloadSpeakerVideoFile(currentSpeaker, aspect, (pct) =>
          setDownloadProgress(pct)
        );
      }
    } finally {
      setDownloadingLabel(null);
      setDownloadProgress(0);
    }
  }, [downloadingLabel, mode, currentSpeaker, aspect]);

  const handleDownloadCurrentPoster = useCallback(async () => {
    await downloadSpeakerPosterPng(currentSpeaker, aspect);
  }, [currentSpeaker, aspect]);

  // Auto-cycle speakers every 8 seconds when reel mode is active
  useEffect(() => {
    if (!isPlaying || mode !== "speakers" || !autoCycle) return;
    const timer = setInterval(() => {
      setSelectedIndex((prev) => (prev + 1) % SPOTLIGHT_ROSTER.length);
      setReplayKey((k) => k + 1);
    }, 8000);
    return () => clearInterval(timer);
  }, [isPlaying, mode, autoCycle]);

  // 15-second (0–3s, 3–11s, 11–15s) scene timing for the Main Promo video
  useEffect(() => {
    if (!isPlaying || mode !== "promo") return;
    setPromoScene(0);
    const t1 = setTimeout(() => setPromoScene(1), 3200);
    const t2 = setTimeout(() => setPromoScene(2), 11000);
    const tLoop = setTimeout(() => {
      setReplayKey((k) => k + 1);
    }, 15000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(tLoop);
    };
  }, [isPlaying, mode, replayKey]);

  const toggleFullscreen = useCallback(async () => {
    if (!stageContainerRef.current) return;
    if (!document.fullscreenElement) {
      await stageContainerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      await document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  }, []);

  useEffect(() => {
    const onFsChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  // Keyboard shortcuts for AV stage operator (1-8 selects speaker, Space plays/replays, F fullscreen)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key >= "1" && e.key <= "8") {
        const idx = Number(e.key) - 1;
        if (SPOTLIGHT_ROSTER[idx]) {
          setMode("speakers");
          setSelectedIndex(idx);
          setReplayKey((k) => k + 1);
        }
      } else if (e.key.toLowerCase() === "f") {
        toggleFullscreen();
      } else if (e.key.toLowerCase() === "r") {
        setReplayKey((k) => k + 1);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [toggleFullscreen]);

  const nameWords = currentSpeaker.name.split(" ");

  return (
    <main className="min-h-screen bg-[#09090B] text-white pt-28 pb-24 px-4 sm:px-6">
      <div className="mx-auto max-w-7xl">
        {/* Top Control Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-400 mb-3">
              <Film className="h-3.5 w-3.5" aria-hidden="true" />
              Production Stage & Social Video Studio
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              AI for Every Sector · Motion Studio
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-2xl">
              Live stage LED walk-on animations (`16:9`) and social media reels (`9:16`) for Jos TechFest 2026. Press <kbd className="rounded bg-slate-800 px-1.5 py-0.5 text-xs text-emerald-300">1</kbd>–<kbd className="rounded bg-slate-800 px-1.5 py-0.5 text-xs text-emerald-300">8</kbd> to trigger speakers on stage or <kbd className="rounded bg-slate-800 px-1.5 py-0.5 text-xs text-emerald-300">F</kbd> for Fullscreen LED Wall mode.
            </p>
          </div>

          {/* Mode & Aspect Toggles */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Mode Switcher */}
            <div className="inline-flex rounded-full border border-white/10 bg-white/[0.03] p-1">
              <button
                type="button"
                onClick={() => {
                  setMode("speakers");
                  setReplayKey((k) => k + 1);
                }}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                  mode === "speakers"
                    ? "bg-emerald-500 text-slate-950 shadow-lg"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                Speaker Walk-Ons (8)
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode("promo");
                  setAspect("9:16");
                  setReplayKey((k) => k + 1);
                }}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                  mode === "promo"
                    ? "bg-emerald-500 text-slate-950 shadow-lg"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                <Film className="h-3.5 w-3.5" aria-hidden="true" />
                15s Event Promo
              </button>
            </div>

            {/* Aspect Ratio Switcher */}
            <div className="inline-flex rounded-full border border-white/10 bg-white/[0.03] p-1">
              <button
                type="button"
                onClick={() => {
                  setAspect("16:9");
                  setReplayKey((k) => k + 1);
                }}
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-bold transition-all cursor-pointer ${
                  aspect === "16:9"
                    ? "bg-blue-500 text-white shadow"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                <Monitor className="h-3.5 w-3.5" aria-hidden="true" />
                16:9 LED Screen
              </button>
              <button
                type="button"
                onClick={() => {
                  setAspect("9:16");
                  setReplayKey((k) => k + 1);
                }}
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-bold transition-all cursor-pointer ${
                  aspect === "9:16"
                    ? "bg-blue-500 text-white shadow"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                <Smartphone className="h-3.5 w-3.5" aria-hidden="true" />
                9:16 Social Reel
              </button>
            </div>

            {/* Playback & Fullscreen Controls */}
            <button
              type="button"
              onClick={() => setReplayKey((k) => k + 1)}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.05] hover:bg-white/[0.1] px-4 py-2 text-xs font-bold text-white transition-all cursor-pointer"
              title="Replay Entrance Animation (R)"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              Replay
            </button>

            {mode === "speakers" && (
              <button
                type="button"
                onClick={() => setAutoCycle((v) => !v)}
                className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                  autoCycle
                    ? "border-amber-400/50 bg-amber-500/20 text-amber-300"
                    : "border-white/15 bg-white/[0.05] text-slate-300 hover:text-white"
                }`}
              >
                <Repeat className="h-3.5 w-3.5" aria-hidden="true" />
                {autoCycle ? "Auto-Reel: ON" : "Auto-Reel: OFF"}
              </button>
            )}

            <button
              type="button"
              onClick={handleDownloadCurrentVideo}
              disabled={Boolean(downloadingLabel)}
              className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 hover:bg-blue-500 disabled:opacity-60 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-blue-950/50 transition-all cursor-pointer"
            >
              {downloadingLabel ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                  Exporting {downloadProgress}%
                </>
              ) : (
                <>
                  <Download className="h-3.5 w-3.5" aria-hidden="true" />
                  Download Video ({mode === "promo" ? "9:16" : aspect})
                </>
              )}
            </button>

            {mode === "speakers" && (
              <button
                type="button"
                onClick={handleDownloadCurrentPoster}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.05] hover:bg-white/[0.1] px-3.5 py-2 text-xs font-bold text-white transition-all cursor-pointer"
                title="Download High-Res PNG Poster"
              >
                <ImageIcon className="h-3.5 w-3.5" aria-hidden="true" />
                PNG Poster
              </button>
            )}

            <button
              type="button"
              onClick={toggleFullscreen}
              className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-emerald-950/50 transition-all cursor-pointer"
            >
              {isFullscreen ? (
                <>
                  <Minimize2 className="h-3.5 w-3.5" aria-hidden="true" />
                  Exit LED Fullscreen
                </>
              ) : (
                <>
                  <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
                  Fullscreen LED Mode
                </>
              )}
            </button>
          </div>
        </div>

        {/* ============================================================
            LIVE STAGE / SOCIAL VIEWPORT
            ============================================================ */}
        <div
          ref={stageContainerRef}
          className={`relative mx-auto overflow-hidden rounded-3xl border border-white/15 bg-[#09090B] shadow-2xl shadow-black/80 flex items-center justify-center ${
            isFullscreen
              ? "w-screen h-screen rounded-none border-none"
              : aspect === "16:9"
              ? "w-full aspect-video max-w-6xl"
              : "w-full max-w-[430px] aspect-[9/16]"
          }`}
        >
          {/* Procedural 3D Light-Streak Shader Background */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden"
          >
            <div
              className="absolute inset-0 transition-all duration-700"
              style={{
                background:
                  mode === "speakers"
                    ? `radial-gradient(ellipse at 30% 45%, ${currentSpeaker.glowRgba} 0%, rgba(9,9,11,0.97) 68%)`
                    : "radial-gradient(ellipse at 50% 20%, rgba(16,185,129,0.28) 0%, rgba(9,9,11,0.97) 68%)",
              }}
            />
            <motion.div
              animate={{
                x: [-60, 60, -60],
                rotate: [-20, -14, -20],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-24 left-0 h-64 w-[130%] rounded-full opacity-30 blur-3xl"
              style={{
                background:
                  mode === "speakers"
                    ? `linear-gradient(90deg, transparent 0%, ${currentSpeaker.primaryColor} 40%, ${currentSpeaker.secondaryColor} 75%, transparent 100%)`
                    : "linear-gradient(90deg, transparent 0%, #10B981 35%, #3B82F6 70%, transparent 100%)",
              }}
            />
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(250,250,250,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(250,250,250,0.06) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }}
            />
            {/* Giant Background Watermark */}
            <div className="absolute bottom-6 right-4 text-[7vw] font-black tracking-tighter text-white/[0.025] select-none whitespace-nowrap">
              AI FOR EVERY SECTOR
            </div>
          </div>

          {/* ── MODE A: SPEAKER & ANCHOR WALK-ON SPOTLIGHT ─────────── */}
          {mode === "speakers" && (
            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentSpeaker.id}-${aspect}-${replayKey}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className={`relative z-10 flex h-full w-full flex-col justify-between ${
                  aspect === "16:9"
                    ? "p-6 sm:p-10 md:p-12"
                    : "px-6 py-10 sm:px-8 sm:py-12"
                }`}
              >
                {/* Top Header Bar */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 220, damping: 22 }}
                  className="flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <Image
                      src="/logo.png"
                      alt="Jos TechFest"
                      width={120}
                      height={36}
                      className="h-7 sm:h-9 w-auto object-contain brightness-0 invert"
                    />
                    <span className="hidden sm:inline-block h-5 w-px bg-white/20" />
                    <span className="hidden sm:inline-block text-xs font-extrabold uppercase tracking-[0.14em] text-emerald-400">
                      AI FOR EVERY SECTOR · 26 NOV 2026
                    </span>
                  </div>

                  <div
                    className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-white shadow-lg"
                    style={{
                      backgroundColor: currentSpeaker.badgeBgRgba,
                      border: `1.5px solid ${currentSpeaker.borderRgba}`,
                    }}
                  >
                    <span
                      className="h-2 w-2 rounded-full animate-pulse"
                      style={{ backgroundColor: currentSpeaker.secondaryColor }}
                    />
                    {currentSpeaker.badgeLabel}
                  </div>
                </motion.div>

                {/* Main Content Body (16:9 Split vs 9:16 Vertical Stack) */}
                <div
                  className={`flex flex-1 items-center gap-6 sm:gap-10 my-4 ${
                    aspect === "16:9"
                      ? "flex-row"
                      : "flex-col justify-center"
                  }`}
                >
                  {/* 3D Hero Portrait Frame */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.84, rotateY: 18 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    transition={{
                      type: "spring",
                      mass: 1.1,
                      stiffness: 150,
                      damping: 20,
                      delay: 0.08,
                    }}
                    className={`relative flex-shrink-0 rounded-3xl p-2 bg-white/[0.06] shadow-2xl overflow-hidden ${
                      aspect === "16:9"
                        ? "w-44 h-56 sm:w-64 sm:h-80 md:w-80 md:h-[400px] lg:w-96 lg:h-[440px]"
                        : "w-full h-72 sm:h-80"
                    }`}
                    style={{
                      border: `2px solid ${currentSpeaker.borderRgba}`,
                    }}
                  >
                    <div className="relative h-full w-full overflow-hidden rounded-2xl bg-[#10211A]">
                      <Image
                        src={currentSpeaker.image}
                        alt={currentSpeaker.name}
                        fill
                        sizes="(max-width: 768px) 80vw, 420px"
                        className="object-cover object-top"
                        priority
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(to top, rgba(9,9,11,0.92) 0%, rgba(9,9,11,0.15) 45%, transparent 100%)",
                        }}
                      />

                      {/* Live Stage Equalizer Bar inside Portrait */}
                      <div
                        className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-xl bg-black/80 px-3 py-2 backdrop-blur-md"
                        style={{
                          border: `1px solid ${currentSpeaker.borderRgba}`,
                        }}
                      >
                        <span
                          className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider"
                          style={{ color: currentSpeaker.secondaryColor }}
                        >
                          {currentSpeaker.sessionNumber === "HOST"
                            ? "LIVE ON STAGE · HOST"
                            : `TRACK ${currentSpeaker.sessionNumber} · SPEAKER`}
                        </span>
                        <div className="flex items-end gap-1 h-4">
                          {[0.4, 0.9, 0.6, 1, 0.5].map((h, i) => (
                            <motion.span
                              key={i}
                              animate={{
                                height: ["25%", `${h * 100}%`, "35%"],
                              }}
                              transition={{
                                duration: 0.7 + i * 0.1,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                              className="w-1 rounded-full"
                              style={{
                                backgroundColor: currentSpeaker.secondaryColor,
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Kinetic Speaker Name + Session Talk Card */}
                  <div className="flex flex-1 flex-col justify-center gap-3 sm:gap-5">
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 220,
                        damping: 22,
                        delay: 0.16,
                      }}
                      className="inline-flex self-start rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1 text-xs sm:text-sm font-bold"
                      style={{ color: currentSpeaker.secondaryColor }}
                    >
                      {currentSpeaker.role}
                    </motion.div>

                    {/* Word-by-word kinetic speaker name */}
                    <div className="flex flex-wrap gap-x-3 gap-y-1">
                      {nameWords.map((word, idx) => {
                        const isLast = idx === nameWords.length - 1;
                        return (
                          <motion.span
                            key={`${word}-${idx}`}
                            initial={{ opacity: 0, y: 36, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{
                              type: "spring",
                              mass: 1,
                              stiffness: 180,
                              damping: 16,
                              delay: 0.22 + idx * 0.08,
                            }}
                            className={`font-black tracking-tight leading-[1.04] ${
                              aspect === "16:9"
                                ? "text-3xl sm:text-5xl md:text-6xl lg:text-7xl"
                                : "text-3xl sm:text-4xl"
                            }`}
                            style={{
                              color: isLast
                                ? currentSpeaker.secondaryColor
                                : "#FAFAFA",
                            }}
                          >
                            {word}
                          </motion.span>
                        );
                      })}
                    </div>

                    {/* Session & Talk Title Glass Card */}
                    <motion.div
                      initial={{ opacity: 0, y: 28 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        type: "spring",
                        mass: 1.1,
                        stiffness: 150,
                        damping: 20,
                        delay: 0.45,
                      }}
                      className="relative overflow-hidden rounded-2xl bg-white/[0.045] p-4 sm:p-6 shadow-xl"
                      style={{
                        border: `1.5px solid ${currentSpeaker.borderRgba}`,
                      }}
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span
                          className="rounded-full px-3 py-0.5 text-[11px] sm:text-xs font-extrabold uppercase tracking-wider"
                          style={{
                            backgroundColor: currentSpeaker.badgeBgRgba,
                            color: currentSpeaker.secondaryColor,
                            border: `1px solid ${currentSpeaker.borderRgba}`,
                          }}
                        >
                          {currentSpeaker.trackTitle}
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-slate-300">
                          {currentSpeaker.timeSlot}
                        </span>
                      </div>
                      <p
                        className={`font-extrabold text-white leading-snug ${
                          aspect === "16:9"
                            ? "text-base sm:text-xl md:text-2xl"
                            : "text-sm sm:text-base"
                        }`}
                      >
                        “{currentSpeaker.talkTitle}”
                      </p>
                    </motion.div>

                    {/* Footer CTA & Venue Bar */}
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 22,
                        delay: 0.6,
                      }}
                      className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs sm:text-sm"
                    >
                      <div className="flex items-center gap-2 text-slate-300 font-semibold">
                        <span>Sarau Event Center, Jos</span>
                        <span className="text-slate-600">•</span>
                        <span className="text-emerald-400 font-extrabold">
                          register.techfest.com.ng
                        </span>
                      </div>
                      <span className="font-extrabold text-white tracking-wider">
                        #JosTechFest
                      </span>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          )}

          {/* ── MODE B: 15-SECOND EVENT PROMO ("AI for every sector.") ── */}
          {mode === "promo" && (
            <AnimatePresence mode="wait">
              {promoScene === 0 && (
                <motion.div
                  key={`promo-scene-1-${replayKey}`}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1.02 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.45 }}
                  className="relative z-10 flex h-full w-full flex-col justify-between p-8 sm:p-12"
                >
                  <div className="flex items-center justify-between">
                    <Image
                      src="/logo.png"
                      alt="Jos TechFest"
                      width={120}
                      height={36}
                      className="h-8 w-auto object-contain brightness-0 invert"
                    />
                    <span className="rounded-full border border-emerald-400/40 bg-emerald-500/15 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-emerald-300">
                      26 NOV 2026 · JOS
                    </span>
                  </div>

                  <div className="my-auto flex flex-col gap-4">
                    <span className="self-start rounded-full border border-blue-400/40 bg-blue-500/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-300">
                      JOS TECHFEST 2026 · 1 FULL DAY
                    </span>
                    <motion.h2
                      initial={{ opacity: 0, y: 36 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ type: "spring", stiffness: 180, damping: 16 }}
                      className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.03] text-white"
                    >
                      AI for{" "}
                      <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                        every sector.
                      </span>
                    </motion.h2>
                    <p className="text-sm sm:text-lg text-slate-300 font-medium max-w-lg">
                      4 signature sessions. 15 industry speakers. 3 stage anchors. One unforgettable day at{" "}
                      <span className="text-emerald-400 font-bold">
                        Sarau Event Center, Jos
                      </span>
                      .
                    </p>
                  </div>

                  <div className="grid grid-cols-6 gap-2 rounded-2xl border border-white/15 bg-white/[0.04] p-3">
                    {SPOTLIGHT_ROSTER.slice(0, 6).map((sp) => (
                      <div key={sp.id} className="flex flex-col items-center gap-1">
                        <div
                          className="relative h-12 w-12 overflow-hidden rounded-xl border"
                          style={{ borderColor: sp.secondaryColor }}
                        >
                          <Image
                            src={sp.image}
                            alt={sp.name}
                            fill
                            sizes="48px"
                            className="object-cover object-top"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {promoScene === 1 && (
                <motion.div
                  key={`promo-scene-2-${replayKey}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4 }}
                  className="relative z-10 flex h-full w-full flex-col justify-between p-6 sm:p-10"
                >
                  <div>
                    <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400">
                      4 SIGNATURE SESSIONS · 15 SPEAKERS
                    </span>
                    <h2 className="text-2xl sm:text-4xl font-black text-white mt-1">
                      One Day. Four Power Tracks.
                    </h2>
                  </div>

                  <div className="flex flex-col gap-2.5 my-auto">
                    {PROMO_SESSIONS.map((s, idx) => (
                      <motion.div
                        key={s.num}
                        initial={{ opacity: 0, x: idx % 2 === 0 ? -40 : 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 160,
                          damping: 20,
                          delay: idx * 0.12,
                        }}
                        className="rounded-2xl bg-white/[0.045] p-3 sm:p-4"
                        style={{ border: `1px solid ${s.border}` }}
                      >
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <div className="flex items-center gap-2">
                            <span
                              className="rounded-full px-2 py-0.5 text-[10px] font-extrabold"
                              style={{ backgroundColor: s.bg, color: s.color }}
                            >
                              {s.num}
                            </span>
                            <span className="text-sm sm:text-base font-black text-white">
                              {s.title}
                            </span>
                          </div>
                          <span className="text-[11px] font-bold text-slate-300">
                            {s.time}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {s.speakers.map((spName) => (
                            <span
                              key={spName}
                              className="rounded-full border border-white/10 bg-black/60 px-2.5 py-0.5 text-[11px] font-semibold text-slate-200"
                            >
                              {spName}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-indigo-400/30 bg-indigo-500/10 px-4 py-2 text-xs">
                    <span className="font-extrabold uppercase tracking-wider text-indigo-300">
                      Anchors
                    </span>
                    <span className="font-bold text-white">
                      Samuel Adebayo · Judith Nyior · Anna
                    </span>
                  </div>
                </motion.div>
              )}

              {promoScene === 2 && (
                <motion.div
                  key={`promo-scene-3-${replayKey}`}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 180, damping: 18 }}
                  className="relative z-10 flex h-full w-full flex-col items-center justify-between text-center p-8 sm:p-12"
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="rounded-2xl border border-white/15 bg-white/[0.05] px-6 py-3">
                      <Image
                        src="/logo.png"
                        alt="Jos TechFest"
                        width={140}
                        height={44}
                        className="h-10 w-auto object-contain brightness-0 invert"
                      />
                    </div>
                    <span className="rounded-full border border-emerald-400/40 bg-emerald-500/15 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-emerald-300">
                      #JosTechFest · 26 November 2026
                    </span>
                  </div>

                  <div className="flex flex-col items-center gap-3">
                    <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-tight">
                      AI for{" "}
                      <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                        every sector.
                      </span>
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-300 max-w-md">
                      AI x Education · AI x Business · AI x Creatives · Startup Ecosystem & Policy
                    </p>
                  </div>

                  <a
                    href="https://register.techfest.com.ng"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full max-w-md rounded-full bg-gradient-to-r from-emerald-500 via-emerald-600 to-blue-600 px-8 py-4 text-center shadow-2xl shadow-emerald-900/50"
                  >
                    <span className="block text-[11px] font-extrabold uppercase tracking-widest text-emerald-100">
                      Register Now
                    </span>
                    <span className="block text-lg sm:text-2xl font-black text-white">
                      register.techfest.com.ng
                    </span>
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>

        {/* ============================================================
            SPEAKER STAGE SELECTOR DECK (1–8)
            ============================================================ */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-extrabold uppercase tracking-widest text-slate-400">
              Select Speaker / Anchor Walk-On Video (Keys 1–8)
            </h2>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setMode("speakers");
                  setSelectedIndex(
                    (prev) =>
                      (prev - 1 + SPOTLIGHT_ROSTER.length) %
                      SPOTLIGHT_ROSTER.length
                  );
                  setReplayKey((k) => k + 1);
                }}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/[0.1] text-white cursor-pointer"
                aria-label="Previous speaker"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode("speakers");
                  setSelectedIndex((prev) => (prev + 1) % SPOTLIGHT_ROSTER.length);
                  setReplayKey((k) => k + 1);
                }}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/[0.1] text-white cursor-pointer"
                aria-label="Next speaker"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsPlaying((p) => !p)}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/[0.1] px-3 py-1.5 text-xs font-bold text-white cursor-pointer"
              >
                {isPlaying ? (
                  <>
                    <Pause className="h-3.5 w-3.5" /> Pause
                  </>
                ) : (
                  <>
                    <Play className="h-3.5 w-3.5" /> Play
                  </>
                )}
              </button>
            </div>
          </div>

          <ul
            role="list"
            className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3"
          >
            {SPOTLIGHT_ROSTER.map((person, idx) => {
              const isSelected = mode === "speakers" && selectedIndex === idx;
              return (
                <li
                  key={person.id}
                  className={`group flex flex-col justify-between rounded-2xl p-2.5 transition-all border ${
                    isSelected
                      ? "bg-white/[0.1] border-emerald-400 shadow-lg shadow-emerald-950/40"
                      : "bg-white/[0.03] border-white/10 hover:border-white/25"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setMode("speakers");
                      setSelectedIndex(idx);
                      setReplayKey((k) => k + 1);
                    }}
                    className="w-full text-left cursor-pointer"
                  >
                    <div className="relative aspect-square w-full overflow-hidden rounded-xl mb-2 bg-slate-900">
                      <Image
                        src={person.image}
                        alt={person.name}
                        fill
                        sizes="160px"
                        className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                      />
                      <span className="absolute top-1.5 left-1.5 rounded-md bg-black/80 px-1.5 py-0.5 text-[10px] font-black text-white">
                        #{idx + 1}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-white truncate">
                      {person.name}
                    </p>
                    <p
                      className="text-[10px] font-semibold truncate mt-0.5"
                      style={{ color: person.secondaryColor }}
                    >
                      {person.trackTitle}
                    </p>
                  </button>

                  <button
                    type="button"
                    disabled={Boolean(downloadingLabel)}
                    onClick={async () => {
                      if (downloadingLabel) return;
                      try {
                        setMode("speakers");
                        setSelectedIndex(idx);
                        setDownloadProgress(0);
                        setDownloadingLabel(`${person.name} (${aspect})`);
                        await downloadSpeakerVideoFile(person, aspect, (pct) =>
                          setDownloadProgress(pct)
                        );
                      } finally {
                        setDownloadingLabel(null);
                        setDownloadProgress(0);
                      }
                    }}
                    className="mt-2 inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.05] hover:bg-emerald-500/20 hover:border-emerald-400/50 py-1.5 text-[10px] font-bold text-slate-200 hover:text-emerald-300 transition-colors cursor-pointer disabled:opacity-50"
                  >
                    <Download className="h-3 w-3" aria-hidden="true" />
                    Download ({aspect})
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Back to Speakers Link */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/speakers"
            className="text-xs font-semibold text-slate-400 hover:text-emerald-400 transition-colors"
          >
            ← Back to Full Speakers & Sessions Directory
          </Link>
        </div>
      </div>
    </main>
  );
}

