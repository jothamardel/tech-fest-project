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
  Sliders,
  Plus,
  Upload,
  ExternalLink,
  RefreshCw,
  Trash2,
  Layers,
} from "lucide-react";
import {
  downloadSpeakerVideoFile,
  downloadSpeakerPosterPng,
  downloadPromoVideoFile,
  type ExportableSpeaker,
  type PromoEditableConfig,
} from "./videoExporter";

const DEFAULT_SPOTLIGHT_ROSTER: ExportableSpeaker[] = [
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

const DEFAULT_PROMO_CONFIG: PromoEditableConfig = {
  hookEyebrow: "JOS TECHFEST 2026 · 1 FULL DAY",
  hookLine1: "AI for",
  hookLine2: "every sector.",
  hookSubcopy:
    "4 signature sessions. 15 industry speakers. 3 stage anchors. One unforgettable day at Sarau Event Center, Jos.",
  showcaseHeader: "One Day. Four Power Tracks.",
  ctaUrl: "register.techfest.com.ng",
  eventDate: "26 Nov 2026 · 08:30 WAT",
  eventVenue: "Sarau Event Center, Jos",
};

const COLOR_PRESETS = [
  {
    label: "Cobalt (Education)",
    primaryColor: "#3B82F6",
    secondaryColor: "#60A5FA",
    glowRgba: "rgba(59, 130, 246, 0.42)",
    borderRgba: "rgba(96, 165, 250, 0.55)",
    badgeBgRgba: "rgba(37, 99, 235, 0.22)",
  },
  {
    label: "Emerald (Business)",
    primaryColor: "#10B981",
    secondaryColor: "#34D399",
    glowRgba: "rgba(16, 185, 129, 0.42)",
    borderRgba: "rgba(52, 211, 153, 0.55)",
    badgeBgRgba: "rgba(16, 185, 129, 0.22)",
  },
  {
    label: "Indigo (Creatives)",
    primaryColor: "#6366F1",
    secondaryColor: "#818CF8",
    glowRgba: "rgba(99, 102, 241, 0.45)",
    borderRgba: "rgba(129, 140, 248, 0.55)",
    badgeBgRgba: "rgba(99, 102, 241, 0.22)",
  },
  {
    label: "Amber/Gold (Policy & Host)",
    primaryColor: "#F59E0B",
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

const STORAGE_KEY_ROSTER = "jtf2026_studio_roster_v1";
const STORAGE_KEY_PROMO = "jtf2026_studio_promo_v1";

export default function VideosStagePage() {
  const [roster, setRoster] = useState<ExportableSpeaker[]>(DEFAULT_SPOTLIGHT_ROSTER);
  const [promoConfig, setPromoConfig] = useState<PromoEditableConfig>(DEFAULT_PROMO_CONFIG);
  const [mode, setMode] = useState<"speakers" | "promo" | "remotion-bundle">("speakers");
  const [aspect, setAspect] = useState<"16:9" | "9:16">("16:9");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [autoCycle, setAutoCycle] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [replayKey, setReplayKey] = useState(0);
  const [promoScene, setPromoScene] = useState<0 | 1 | 2>(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showEditorPanel, setShowEditorPanel] = useState(true);
  const [downloadingLabel, setDownloadingLabel] = useState<string | null>(null);
  const [downloadProgress, setDownloadProgress] = useState<number>(0);

  const stageContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Hydrate saved edits from localStorage on mount
  useEffect(() => {
    try {
      const savedRoster = localStorage.getItem(STORAGE_KEY_ROSTER);
      if (savedRoster) {
        const parsed = JSON.parse(savedRoster);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setRoster(parsed);
        }
      }
      const savedPromo = localStorage.getItem(STORAGE_KEY_PROMO);
      if (savedPromo) {
        const parsedPromo = JSON.parse(savedPromo);
        if (parsedPromo && typeof parsedPromo === "object") {
          setPromoConfig({ ...DEFAULT_PROMO_CONFIG, ...parsedPromo });
        }
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  // Persist roster & promo edits to localStorage
  const updateRoster = useCallback((next: ExportableSpeaker[]) => {
    setRoster(next);
    try {
      localStorage.setItem(STORAGE_KEY_ROSTER, JSON.stringify(next));
    } catch {
      // ignore quota errors
    }
  }, []);

  const updatePromoConfig = useCallback((next: PromoEditableConfig) => {
    setPromoConfig(next);
    try {
      localStorage.setItem(STORAGE_KEY_PROMO, JSON.stringify(next));
    } catch {
      // ignore
    }
  }, []);

  const handleResetDefaults = useCallback(() => {
    setRoster(DEFAULT_SPOTLIGHT_ROSTER);
    setPromoConfig(DEFAULT_PROMO_CONFIG);
    setSelectedIndex(0);
    setReplayKey((k) => k + 1);
    try {
      localStorage.removeItem(STORAGE_KEY_ROSTER);
      localStorage.removeItem(STORAGE_KEY_PROMO);
    } catch {
      // ignore
    }
  }, []);

  const safeIndex = Math.min(selectedIndex, Math.max(0, roster.length - 1));
  const currentSpeaker = roster[safeIndex] || DEFAULT_SPOTLIGHT_ROSTER[0];

  const updateCurrentSpeaker = useCallback(
    (patch: Partial<ExportableSpeaker>) => {
      const next = roster.map((item, idx) =>
        idx === safeIndex ? { ...item, ...patch } : item
      );
      updateRoster(next);
    },
    [roster, safeIndex, updateRoster]
  );

  const handleAddCustomSpeaker = useCallback(() => {
    const newNum = String(roster.length + 1).padStart(2, "0");
    const newSpeaker: ExportableSpeaker = {
      id: `custom-speaker-${Date.now()}`,
      name: "New Speaker Name",
      role: "Session Speaker · AI x Business",
      badgeLabel: "SESSION 02 · AI x BUSINESS",
      sessionNumber: newNum,
      trackTitle: "AI x Business",
      talkTitle: "Building Intelligent Products & Future-Ready Teams in Africa",
      timeSlot: "11:15 – 12:45 WAT",
      image: "/images/nnamdi.jpg",
      primaryColor: "#10B981",
      secondaryColor: "#34D399",
      glowRgba: "rgba(16, 185, 129, 0.42)",
      borderRgba: "rgba(52, 211, 153, 0.55)",
      badgeBgRgba: "rgba(16, 185, 129, 0.22)",
    };
    const next = [...roster, newSpeaker];
    updateRoster(next);
    setMode("speakers");
    setSelectedIndex(next.length - 1);
    setShowEditorPanel(true);
    setReplayKey((k) => k + 1);
  }, [roster, updateRoster]);

  const handleDeleteCurrentSpeaker = useCallback(() => {
    if (roster.length <= 1) return;
    const next = roster.filter((_, idx) => idx !== safeIndex);
    updateRoster(next);
    setSelectedIndex(Math.max(0, safeIndex - 1));
    setReplayKey((k) => k + 1);
  }, [roster, safeIndex, updateRoster]);

  const handlePhotoUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          updateCurrentSpeaker({ image: reader.result });
          setReplayKey((k) => k + 1);
        }
      };
      reader.readAsDataURL(file);
    },
    [updateCurrentSpeaker]
  );

  // Auto-cycle speakers every 8 seconds when reel mode is active
  useEffect(() => {
    if (!isPlaying || mode !== "speakers" || !autoCycle) return;
    const timer = setInterval(() => {
      setSelectedIndex((prev) => (prev + 1) % roster.length);
      setReplayKey((k) => k + 1);
    }, 8000);
    return () => clearInterval(timer);
  }, [isPlaying, mode, autoCycle, roster.length]);

  // 15-second scene timing for the Main Promo video
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

  const handleDownloadCurrentVideo = useCallback(async () => {
    if (downloadingLabel) return;
    try {
      setDownloadProgress(0);
      if (mode === "promo") {
        setDownloadingLabel("15s Promo Video");
        await downloadPromoVideoFile(
          roster,
          (pct) => setDownloadProgress(pct),
          promoConfig
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
  }, [downloadingLabel, mode, roster, promoConfig, currentSpeaker, aspect]);

  const handleDownloadCurrentPoster = useCallback(async () => {
    await downloadSpeakerPosterPng(currentSpeaker, aspect);
  }, [currentSpeaker, aspect]);

  const nameWords = currentSpeaker.name.split(" ");

  return (
    <main className="min-h-screen bg-[#09090B] text-white pt-28 pb-24 px-4 sm:px-6">
      <div className="mx-auto max-w-7xl">
        {/* Top Control Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-6">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-400 mb-3">
              <Film className="h-3.5 w-3.5" aria-hidden="true" />
              Production Remotion Editor & Video Renderer
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              AI for Every Sector · Motion Studio
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-2xl">
              Edit speaker details, upload custom photos, modify the 15s promo copy, or open the static Remotion Studio bundle in production — and render `.mp4`/`.webm` videos or `.png` posters in one click.
            </p>
          </div>

          {/* Mode & Aspect Toggles */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Mode Switcher */}
            <div className="inline-flex rounded-full border border-white/10 bg-white/[0.03] p-1">
              <button
                type="button"
                onClick={() => {
                  setMode("speakers");
                  setReplayKey((k) => k + 1);
                }}
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-bold transition-all cursor-pointer ${
                  mode === "speakers"
                    ? "bg-emerald-500 text-slate-950 shadow-lg"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                Speakers ({roster.length})
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode("promo");
                  setAspect("9:16");
                  setReplayKey((k) => k + 1);
                }}
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-bold transition-all cursor-pointer ${
                  mode === "promo"
                    ? "bg-emerald-500 text-slate-950 shadow-lg"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                <Film className="h-3.5 w-3.5" aria-hidden="true" />
                15s Promo
              </button>
              <button
                type="button"
                onClick={() => setMode("remotion-bundle")}
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-bold transition-all cursor-pointer ${
                  mode === "remotion-bundle"
                    ? "bg-indigo-500 text-white shadow-lg"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                <Layers className="h-3.5 w-3.5" aria-hidden="true" />
                Remotion Studio Bundle
              </button>
            </div>

            {mode !== "remotion-bundle" && (
              <>
                {/* Aspect Ratio Switcher */}
                <div className="inline-flex rounded-full border border-white/10 bg-white/[0.03] p-1">
                  <button
                    type="button"
                    onClick={() => {
                      setAspect("16:9");
                      setReplayKey((k) => k + 1);
                    }}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-bold transition-all cursor-pointer ${
                      aspect === "16:9"
                        ? "bg-blue-500 text-white shadow"
                        : "text-slate-300 hover:text-white"
                    }`}
                  >
                    <Monitor className="h-3.5 w-3.5" aria-hidden="true" />
                    16:9 LED
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAspect("9:16");
                      setReplayKey((k) => k + 1);
                    }}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-bold transition-all cursor-pointer ${
                      aspect === "9:16"
                        ? "bg-blue-500 text-white shadow"
                        : "text-slate-300 hover:text-white"
                    }`}
                  >
                    <Smartphone className="h-3.5 w-3.5" aria-hidden="true" />
                    9:16 Social
                  </button>
                </div>

                {/* Toggle Props Inspector Panel */}
                <button
                  type="button"
                  onClick={() => setShowEditorPanel((v) => !v)}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-bold transition-all cursor-pointer ${
                    showEditorPanel
                      ? "border-emerald-400/50 bg-emerald-500/15 text-emerald-300"
                      : "border-white/15 bg-white/[0.05] text-slate-300 hover:text-white"
                  }`}
                >
                  <Sliders className="h-3.5 w-3.5" aria-hidden="true" />
                  {showEditorPanel ? "Hide Editor" : "Edit Props"}
                </button>

                {/* Download Video Button */}
                <button
                  type="button"
                  onClick={handleDownloadCurrentVideo}
                  disabled={Boolean(downloadingLabel)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 hover:bg-blue-500 disabled:opacity-60 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-blue-950/50 transition-all cursor-pointer"
                >
                  {downloadingLabel ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                      Rendering {downloadProgress}%
                    </>
                  ) : (
                    <>
                      <Download className="h-3.5 w-3.5" aria-hidden="true" />
                      Render & Download ({mode === "promo" ? "9:16" : aspect})
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
                  className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 px-3.5 py-2 text-xs font-bold text-white shadow-lg shadow-emerald-950/50 transition-all cursor-pointer"
                >
                  {isFullscreen ? (
                    <>
                      <Minimize2 className="h-3.5 w-3.5" aria-hidden="true" />
                      Exit LED
                    </>
                  ) : (
                    <>
                      <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
                      Fullscreen LED
                    </>
                  )}
                </button>
              </>
            )}

            {mode === "remotion-bundle" && (
              <a
                href="/remotion-studio/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-indigo-600 hover:bg-indigo-500 px-4 py-2 text-xs font-bold text-white shadow-lg transition-all"
              >
                Open Full-Tab Remotion Studio Bundle
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            )}
          </div>
        </div>

        {/* ============================================================
            TAB 3: EMBEDDED STATIC REMOTION STUDIO BUNDLE (/remotion-studio/index.html)
            ============================================================ */}
        {mode === "remotion-bundle" ? (
          <div className="rounded-3xl border border-white/15 bg-[#09090B] overflow-hidden shadow-2xl">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 bg-white/[0.03] px-6 py-3">
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-bold text-slate-200">
                  Static Remotion Studio Bundle (`/remotion-studio/index.html`) — Edit Props in Right Sidebar & Preview Timeline
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setMode("speakers")}
                  className="rounded-full border border-emerald-400/40 bg-emerald-500/15 px-3.5 py-1 text-xs font-bold text-emerald-300 hover:bg-emerald-500/25 cursor-pointer"
                >
                  Switch to Browser Video Renderer (.mp4/.webm)
                </button>
                <a
                  href="/remotion-studio/index.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 hover:text-indigo-300"
                >
                  Full Window <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
            <iframe
              src="/remotion-studio/index.html"
              title="Jos TechFest 2026 Remotion Studio Bundle"
              className="w-full h-[78vh] border-0 bg-[#09090B]"
              allow="fullscreen; clipboard-read; clipboard-write"
            />
          </div>
        ) : (
          /* ============================================================
             LIVE STAGE VIEWPORT + INTERACTIVE PROPS EDITOR SIDEBAR
             ============================================================ */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Center / Left Stage Canvas */}
            <div
              className={
                showEditorPanel ? "lg:col-span-8" : "lg:col-span-12"
              }
            >
              <div
                ref={stageContainerRef}
                className={`relative mx-auto overflow-hidden rounded-3xl border border-white/15 bg-[#09090B] shadow-2xl shadow-black/80 flex items-center justify-center ${
                  isFullscreen
                    ? "w-screen h-screen rounded-none border-none"
                    : aspect === "16:9"
                    ? "w-full aspect-video"
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
                  <div className="absolute bottom-6 right-4 text-[7vw] font-black tracking-tighter text-white/[0.025] select-none whitespace-nowrap">
                    AI FOR EVERY SECTOR
                  </div>
                </div>

                {/* MODE A: SPEAKER & ANCHOR WALK-ON SPOTLIGHT */}
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
                          ? "p-5 sm:p-8 md:p-10"
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
                        <div className="flex items-center gap-3">
                          <Image
                            src="/logo.png"
                            alt="Jos TechFest"
                            width={120}
                            height={36}
                            className="h-6 sm:h-8 w-auto object-contain brightness-0 invert"
                          />
                          <span className="hidden sm:inline-block h-4 w-px bg-white/20" />
                          <span className="hidden sm:inline-block text-[11px] font-extrabold uppercase tracking-[0.14em] text-emerald-400">
                            AI FOR EVERY SECTOR · 26 NOV 2026
                          </span>
                        </div>

                        <div
                          className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-white shadow-lg"
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

                      {/* Main Content Body */}
                      <div
                        className={`flex flex-1 items-center gap-5 sm:gap-8 my-3 ${
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
                              ? "w-40 h-52 sm:w-56 sm:h-72 md:w-64 md:h-80"
                              : "w-full h-64 sm:h-72"
                          }`}
                          style={{
                            border: `2px solid ${currentSpeaker.borderRgba}`,
                          }}
                        >
                          <div className="relative h-full w-full overflow-hidden rounded-2xl bg-[#10211A]">
                            {/* Use native img so both /images/... and uploaded data: URLs work seamlessly */}
                            <img
                              src={currentSpeaker.image}
                              alt={currentSpeaker.name}
                              className="h-full w-full object-cover object-top"
                            />
                            <div
                              className="absolute inset-0"
                              style={{
                                background:
                                  "linear-gradient(to top, rgba(9,9,11,0.92) 0%, rgba(9,9,11,0.15) 45%, transparent 100%)",
                              }}
                            />

                            {/* Live Stage Equalizer Bar */}
                            <div
                              className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between rounded-xl bg-black/80 px-2.5 py-1.5 backdrop-blur-md"
                              style={{
                                border: `1px solid ${currentSpeaker.borderRgba}`,
                              }}
                            >
                              <span
                                className="text-[10px] font-extrabold uppercase tracking-wider"
                                style={{ color: currentSpeaker.secondaryColor }}
                              >
                                {currentSpeaker.sessionNumber === "HOST"
                                  ? "LIVE ON STAGE · HOST"
                                  : `TRACK ${currentSpeaker.sessionNumber} · SPEAKER`}
                              </span>
                              <div className="flex items-end gap-1 h-3.5">
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
                        <div className="flex flex-1 flex-col justify-center gap-2.5 sm:gap-4">
                          <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              type: "spring",
                              stiffness: 220,
                              damping: 22,
                              delay: 0.16,
                            }}
                            className="inline-flex self-start rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-xs font-bold"
                            style={{ color: currentSpeaker.secondaryColor }}
                          >
                            {currentSpeaker.role}
                          </motion.div>

                          <div className="flex flex-wrap gap-x-2.5 gap-y-1">
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
                                      ? "text-2xl sm:text-4xl md:text-5xl"
                                      : "text-2xl sm:text-3xl"
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
                            className="relative overflow-hidden rounded-2xl bg-white/[0.045] p-3.5 sm:p-5 shadow-xl"
                            style={{
                              border: `1.5px solid ${currentSpeaker.borderRgba}`,
                            }}
                          >
                            <div className="flex items-center justify-between gap-2 mb-1.5">
                              <span
                                className="rounded-full px-2.5 py-0.5 text-[10px] sm:text-xs font-extrabold uppercase tracking-wider"
                                style={{
                                  backgroundColor: currentSpeaker.badgeBgRgba,
                                  color: currentSpeaker.secondaryColor,
                                  border: `1px solid ${currentSpeaker.borderRgba}`,
                                }}
                              >
                                {currentSpeaker.trackTitle}
                              </span>
                              <span className="text-[11px] sm:text-xs font-bold text-slate-300">
                                {currentSpeaker.timeSlot}
                              </span>
                            </div>
                            <p
                              className={`font-extrabold text-white leading-snug ${
                                aspect === "16:9"
                                  ? "text-sm sm:text-lg md:text-xl"
                                  : "text-sm sm:text-base"
                              }`}
                            >
                              “{currentSpeaker.talkTitle}”
                            </p>
                          </motion.div>

                          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
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
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                )}

                {/* MODE B: 15-SECOND EVENT PROMO */}
                {mode === "promo" && (
                  <AnimatePresence mode="wait">
                    {promoScene === 0 && (
                      <motion.div
                        key={`promo-scene-1-${replayKey}`}
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1.02 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.45 }}
                        className="relative z-10 flex h-full w-full flex-col justify-between p-8 sm:p-10"
                      >
                        <div className="flex items-center justify-between">
                          <Image
                            src="/logo.png"
                            alt="Jos TechFest"
                            width={120}
                            height={36}
                            className="h-7 w-auto object-contain brightness-0 invert"
                          />
                          <span className="rounded-full border border-emerald-400/40 bg-emerald-500/15 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-emerald-300">
                            26 NOV 2026 · JOS
                          </span>
                        </div>

                        <div className="my-auto flex flex-col gap-3">
                          <span className="self-start rounded-full border border-blue-400/40 bg-blue-500/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-300">
                            {promoConfig.hookEyebrow}
                          </span>
                          <motion.h2
                            initial={{ opacity: 0, y: 36 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ type: "spring", stiffness: 180, damping: 16 }}
                            className="text-4xl sm:text-5xl font-black tracking-tight leading-[1.03] text-white"
                          >
                            {promoConfig.hookLine1}{" "}
                            <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                              {promoConfig.hookLine2}
                            </span>
                          </motion.h2>
                          <p className="text-xs sm:text-base text-slate-300 font-medium max-w-lg">
                            {promoConfig.hookSubcopy}
                          </p>
                        </div>

                        <div className="grid grid-cols-6 gap-2 rounded-2xl border border-white/15 bg-white/[0.04] p-2.5">
                          {roster.slice(0, 6).map((sp) => (
                            <div key={sp.id} className="flex flex-col items-center">
                              <div
                                className="relative h-11 w-11 overflow-hidden rounded-xl border"
                                style={{ borderColor: sp.secondaryColor }}
                              >
                                <img
                                  src={sp.image}
                                  alt={sp.name}
                                  className="h-full w-full object-cover object-top"
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
                        className="relative z-10 flex h-full w-full flex-col justify-between p-6 sm:p-8"
                      >
                        <div>
                          <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-400">
                            4 SIGNATURE SESSIONS · 15 SPEAKERS
                          </span>
                          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                            {promoConfig.showcaseHeader}
                          </h2>
                        </div>

                        <div className="flex flex-col gap-2 my-auto">
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
                              className="rounded-2xl bg-white/[0.045] p-3"
                              style={{ border: `1px solid ${s.border}` }}
                            >
                              <div className="flex items-center justify-between gap-2 mb-1">
                                <div className="flex items-center gap-2">
                                  <span
                                    className="rounded-full px-2 py-0.5 text-[10px] font-extrabold"
                                    style={{ backgroundColor: s.bg, color: s.color }}
                                  >
                                    {s.num}
                                  </span>
                                  <span className="text-xs sm:text-sm font-black text-white">
                                    {s.title}
                                  </span>
                                </div>
                                <span className="text-[10px] font-bold text-slate-300">
                                  {s.time}
                                </span>
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {s.speakers.map((spName) => (
                                  <span
                                    key={spName}
                                    className="rounded-full border border-white/10 bg-black/60 px-2 py-0.5 text-[10px] font-semibold text-slate-200"
                                  >
                                    {spName}
                                  </span>
                                ))}
                              </div>
                            </motion.div>
                          ))}
                        </div>

                        <div className="flex items-center justify-between rounded-xl border border-indigo-400/30 bg-indigo-500/10 px-3 py-1.5 text-[11px]">
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
                        className="relative z-10 flex h-full w-full flex-col items-center justify-between text-center p-8 sm:p-10"
                      >
                        <div className="flex flex-col items-center gap-2">
                          <div className="rounded-2xl border border-white/15 bg-white/[0.05] px-5 py-2.5">
                            <Image
                              src="/logo.png"
                              alt="Jos TechFest"
                              width={140}
                              height={44}
                              className="h-9 w-auto object-contain brightness-0 invert"
                            />
                          </div>
                          <span className="rounded-full border border-emerald-400/40 bg-emerald-500/15 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-emerald-300">
                            #JosTechFest · {promoConfig.eventDate}
                          </span>
                        </div>

                        <div className="flex flex-col items-center gap-2">
                          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
                            {promoConfig.hookLine1}{" "}
                            <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                              {promoConfig.hookLine2}
                            </span>
                          </h2>
                          <p className="text-xs text-slate-300">
                            {promoConfig.eventVenue}
                          </p>
                        </div>

                        <a
                          href={`https://${promoConfig.ctaUrl.replace(/^https?:\/\//, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full max-w-md rounded-full bg-gradient-to-r from-emerald-500 via-emerald-600 to-blue-600 px-6 py-3.5 text-center shadow-2xl shadow-emerald-900/50"
                        >
                          <span className="block text-[10px] font-extrabold uppercase tracking-widest text-emerald-100">
                            Register Now
                          </span>
                          <span className="block text-base sm:text-xl font-black text-white">
                            {promoConfig.ctaUrl}
                          </span>
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            </div>

            {/* ============================================================
                RIGHT SIDEBAR: LIVE REMOTION PROPS INSPECTOR & EDITOR
                ============================================================ */}
            {showEditorPanel && (
              <aside className="lg:col-span-4 rounded-3xl border border-white/15 bg-white/[0.03] p-5 shadow-2xl backdrop-blur-md">
                <div className="flex items-center justify-between border-b border-white/10 pb-3.5 mb-4">
                  <div className="flex items-center gap-2">
                    <Sliders className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                    <h2 className="text-sm font-black uppercase tracking-wider text-white">
                      {mode === "promo" ? "15s Promo Props Editor" : "Speaker Props Editor"}
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={handleResetDefaults}
                    className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/[0.1] px-2.5 py-1 text-[11px] font-semibold text-slate-300 hover:text-white cursor-pointer"
                    title="Reset all edited props to default"
                  >
                    <RefreshCw className="h-3 w-3" />
                    Reset Defaults
                  </button>
                </div>

                {mode === "speakers" ? (
                  <div className="flex flex-col gap-3.5 text-xs">
                    {/* Photo Upload + Add Custom Speaker Row */}
                    <div className="flex items-center gap-2">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl border border-emerald-500/40 bg-emerald-500/15 hover:bg-emerald-500/25 px-3 py-2 font-bold text-emerald-300 cursor-pointer"
                      >
                        <Upload className="h-3.5 w-3.5" />
                        Upload / Change Photo
                      </button>
                      <button
                        type="button"
                        onClick={handleAddCustomSpeaker}
                        className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-blue-500/40 bg-blue-500/15 hover:bg-blue-500/25 px-3 py-2 font-bold text-blue-300 cursor-pointer"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        New Speaker
                      </button>
                      {roster.length > 1 && (
                        <button
                          type="button"
                          onClick={handleDeleteCurrentSpeaker}
                          className="inline-flex items-center justify-center rounded-xl border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 p-2 text-red-300 cursor-pointer"
                          title="Delete speaker card"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>

                    <label className="flex flex-col gap-1">
                      <span className="font-bold text-slate-400">Speaker / Anchor Name</span>
                      <input
                        type="text"
                        value={currentSpeaker.name}
                        onChange={(e) => updateCurrentSpeaker({ name: e.target.value })}
                        className="rounded-xl border border-white/15 bg-black/60 px-3 py-2 text-white font-semibold focus:border-emerald-400 focus:outline-none"
                      />
                    </label>

                    <div className="grid grid-cols-2 gap-2.5">
                      <label className="flex flex-col gap-1">
                        <span className="font-bold text-slate-400">Role Pill</span>
                        <input
                          type="text"
                          value={currentSpeaker.role}
                          onChange={(e) => updateCurrentSpeaker({ role: e.target.value })}
                          className="rounded-xl border border-white/15 bg-black/60 px-3 py-2 text-white font-semibold focus:border-emerald-400 focus:outline-none"
                        />
                      </label>
                      <label className="flex flex-col gap-1">
                        <span className="font-bold text-slate-400">Time Slot</span>
                        <input
                          type="text"
                          value={currentSpeaker.timeSlot}
                          onChange={(e) => updateCurrentSpeaker({ timeSlot: e.target.value })}
                          className="rounded-xl border border-white/15 bg-black/60 px-3 py-2 text-white font-semibold focus:border-emerald-400 focus:outline-none"
                        />
                      </label>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      <label className="flex flex-col gap-1">
                        <span className="font-bold text-slate-400">Session Track Title</span>
                        <input
                          type="text"
                          value={currentSpeaker.trackTitle}
                          onChange={(e) =>
                            updateCurrentSpeaker({ trackTitle: e.target.value })
                          }
                          className="rounded-xl border border-white/15 bg-black/60 px-3 py-2 text-white font-semibold focus:border-emerald-400 focus:outline-none"
                        />
                      </label>
                      <label className="flex flex-col gap-1">
                        <span className="font-bold text-slate-400">Top Badge Label</span>
                        <input
                          type="text"
                          value={currentSpeaker.badgeLabel}
                          onChange={(e) =>
                            updateCurrentSpeaker({ badgeLabel: e.target.value })
                          }
                          className="rounded-xl border border-white/15 bg-black/60 px-3 py-2 text-white font-semibold focus:border-emerald-400 focus:outline-none"
                        />
                      </label>
                    </div>

                    <label className="flex flex-col gap-1">
                      <span className="font-bold text-slate-400">Talk / Focus Title</span>
                      <textarea
                        rows={2}
                        value={currentSpeaker.talkTitle}
                        onChange={(e) =>
                          updateCurrentSpeaker({ talkTitle: e.target.value })
                        }
                        className="rounded-xl border border-white/15 bg-black/60 px-3 py-2 text-white font-semibold focus:border-emerald-400 focus:outline-none resize-none"
                      />
                    </label>

                    {/* Track Color Theme Selector */}
                    <div>
                      <span className="block font-bold text-slate-400 mb-1.5">
                        Track Color Theme
                      </span>
                      <div className="grid grid-cols-2 gap-2">
                        {COLOR_PRESETS.map((preset) => {
                          const active =
                            currentSpeaker.secondaryColor === preset.secondaryColor;
                          return (
                            <button
                              key={preset.label}
                              type="button"
                              onClick={() =>
                                updateCurrentSpeaker({
                                  primaryColor: preset.primaryColor,
                                  secondaryColor: preset.secondaryColor,
                                  glowRgba: preset.glowRgba,
                                  borderRgba: preset.borderRgba,
                                  badgeBgRgba: preset.badgeBgRgba,
                                })
                              }
                              className={`flex items-center gap-2 rounded-xl border px-2.5 py-2 text-left font-bold cursor-pointer transition-all ${
                                active
                                  ? "border-white bg-white/[0.12] text-white"
                                  : "border-white/10 bg-black/40 text-slate-300 hover:border-white/30"
                              }`}
                            >
                              <span
                                className="h-3.5 w-3.5 rounded-full flex-shrink-0"
                                style={{ backgroundColor: preset.secondaryColor }}
                              />
                              <span className="truncate text-[11px]">
                                {preset.label}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Direct Render Action inside Editor */}
                    <div className="pt-2 flex flex-col gap-2">
                      <button
                        type="button"
                        onClick={handleDownloadCurrentVideo}
                        disabled={Boolean(downloadingLabel)}
                        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-400 hover:to-blue-500 py-3 text-xs font-black uppercase tracking-wider text-white shadow-lg cursor-pointer disabled:opacity-60"
                      >
                        {downloadingLabel ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Rendering Video ({downloadProgress}%)
                          </>
                        ) : (
                          <>
                            <Download className="h-4 w-4" />
                            Render & Download {aspect} Video
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ) : (
                  /* 15s Promo Copy Editor */
                  <div className="flex flex-col gap-3 text-xs">
                    <label className="flex flex-col gap-1">
                      <span className="font-bold text-slate-400">Hook Eyebrow Badge</span>
                      <input
                        type="text"
                        value={promoConfig.hookEyebrow}
                        onChange={(e) =>
                          updatePromoConfig({
                            ...promoConfig,
                            hookEyebrow: e.target.value,
                          })
                        }
                        className="rounded-xl border border-white/15 bg-black/60 px-3 py-2 text-white font-semibold focus:border-emerald-400 focus:outline-none"
                      />
                    </label>

                    <div className="grid grid-cols-2 gap-2.5">
                      <label className="flex flex-col gap-1">
                        <span className="font-bold text-slate-400">Headline Line 1</span>
                        <input
                          type="text"
                          value={promoConfig.hookLine1}
                          onChange={(e) =>
                            updatePromoConfig({
                              ...promoConfig,
                              hookLine1: e.target.value,
                            })
                          }
                          className="rounded-xl border border-white/15 bg-black/60 px-3 py-2 text-white font-semibold focus:border-emerald-400 focus:outline-none"
                        />
                      </label>
                      <label className="flex flex-col gap-1">
                        <span className="font-bold text-slate-400">
                          Headline Accent Line 2
                        </span>
                        <input
                          type="text"
                          value={promoConfig.hookLine2}
                          onChange={(e) =>
                            updatePromoConfig({
                              ...promoConfig,
                              hookLine2: e.target.value,
                            })
                          }
                          className="rounded-xl border border-white/15 bg-black/60 px-3 py-2 text-white font-semibold focus:border-emerald-400 focus:outline-none"
                        />
                      </label>
                    </div>

                    <label className="flex flex-col gap-1">
                      <span className="font-bold text-slate-400">Hook Supporting Copy</span>
                      <textarea
                        rows={2}
                        value={promoConfig.hookSubcopy}
                        onChange={(e) =>
                          updatePromoConfig({
                            ...promoConfig,
                            hookSubcopy: e.target.value,
                          })
                        }
                        className="rounded-xl border border-white/15 bg-black/60 px-3 py-2 text-white font-semibold focus:border-emerald-400 focus:outline-none resize-none"
                      />
                    </label>

                    <label className="flex flex-col gap-1">
                      <span className="font-bold text-slate-400">
                        Scene 2 Tracks Headline
                      </span>
                      <input
                        type="text"
                        value={promoConfig.showcaseHeader}
                        onChange={(e) =>
                          updatePromoConfig({
                            ...promoConfig,
                            showcaseHeader: e.target.value,
                          })
                        }
                        className="rounded-xl border border-white/15 bg-black/60 px-3 py-2 text-white font-semibold focus:border-emerald-400 focus:outline-none"
                      />
                    </label>

                    <div className="grid grid-cols-2 gap-2.5">
                      <label className="flex flex-col gap-1">
                        <span className="font-bold text-slate-400">Event Date & Time</span>
                        <input
                          type="text"
                          value={promoConfig.eventDate}
                          onChange={(e) =>
                            updatePromoConfig({
                              ...promoConfig,
                              eventDate: e.target.value,
                            })
                          }
                          className="rounded-xl border border-white/15 bg-black/60 px-3 py-2 text-white font-semibold focus:border-emerald-400 focus:outline-none"
                        />
                      </label>
                      <label className="flex flex-col gap-1">
                        <span className="font-bold text-slate-400">Event Venue</span>
                        <input
                          type="text"
                          value={promoConfig.eventVenue}
                          onChange={(e) =>
                            updatePromoConfig({
                              ...promoConfig,
                              eventVenue: e.target.value,
                            })
                          }
                          className="rounded-xl border border-white/15 bg-black/60 px-3 py-2 text-white font-semibold focus:border-emerald-400 focus:outline-none"
                        />
                      </label>
                    </div>

                    <label className="flex flex-col gap-1">
                      <span className="font-bold text-slate-400">Registration CTA URL</span>
                      <input
                        type="text"
                        value={promoConfig.ctaUrl}
                        onChange={(e) =>
                          updatePromoConfig({
                            ...promoConfig,
                            ctaUrl: e.target.value,
                          })
                        }
                        className="rounded-xl border border-white/15 bg-black/60 px-3 py-2 text-white font-semibold focus:border-emerald-400 focus:outline-none"
                      />
                    </label>

                    <div className="flex items-center gap-2 pt-1">
                      {([0, 1, 2] as const).map((scIdx) => (
                        <button
                          key={scIdx}
                          type="button"
                          onClick={() => {
                            setIsPlaying(false);
                            setPromoScene(scIdx);
                          }}
                          className={`flex-1 rounded-lg border py-1.5 text-[11px] font-bold cursor-pointer ${
                            promoScene === scIdx
                              ? "border-emerald-400 bg-emerald-500/20 text-emerald-300"
                              : "border-white/10 bg-black/40 text-slate-400"
                          }`}
                        >
                          Scene {scIdx + 1}
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={handleDownloadCurrentVideo}
                      disabled={Boolean(downloadingLabel)}
                      className="mt-1 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-600 py-3 text-xs font-black uppercase tracking-wider text-white shadow-lg cursor-pointer disabled:opacity-60"
                    >
                      {downloadingLabel ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Rendering Promo ({downloadProgress}%)
                        </>
                      ) : (
                        <>
                          <Download className="h-4 w-4" />
                          Render & Download 9:16 Promo
                        </>
                      )}
                    </button>
                  </div>
                )}
              </aside>
            )}
          </div>
        )}

        {/* ============================================================
            SPEAKER STAGE SELECTOR DECK
            ============================================================ */}
        <div className="mt-8">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <h2 className="text-sm font-extrabold uppercase tracking-widest text-slate-400">
              Speaker & Anchor Roster ({roster.length} Cards — Click to Edit or Download)
            </h2>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleAddCustomSpeaker}
                className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/15 hover:bg-emerald-500/25 px-3.5 py-1.5 text-xs font-bold text-emerald-300 cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" /> Add Custom Speaker
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode("speakers");
                  setSelectedIndex(
                    (prev) => (prev - 1 + roster.length) % roster.length
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
                  setSelectedIndex((prev) => (prev + 1) % roster.length);
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
              <button
                type="button"
                onClick={() => setAutoCycle((v) => !v)}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                  autoCycle
                    ? "border-amber-400/50 bg-amber-500/20 text-amber-300"
                    : "border-white/15 bg-white/[0.04] text-slate-300 hover:text-white"
                }`}
              >
                <Repeat className="h-3.5 w-3.5" />
                {autoCycle ? "Auto-Reel ON" : "Auto-Reel"}
              </button>
            </div>
          </div>

          <ul
            role="list"
            className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3"
          >
            {roster.map((person, idx) => {
              const isSelected = mode === "speakers" && safeIndex === idx;
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
                      <img
                        src={person.image}
                        alt={person.name}
                        className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
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

        {/* Bottom Links */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
          <Link
            href="/speakers"
            className="text-xs font-semibold text-slate-400 hover:text-emerald-400 transition-colors"
          >
            ← Back to Full Speakers & Sessions Directory
          </Link>
          <a
            href="/remotion-studio/index.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            Open Standalone Static Remotion Bundle (`/remotion-studio/index.html`)
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </main>
  );
}
