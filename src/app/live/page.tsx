"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import {
  Play,
  Pause,
  Maximize2,
  Monitor,
  Smartphone,
  ChevronLeft,
  ChevronRight,
  Download,
  Image as ImageIcon,
  Loader2,
  Sliders,
  Plus,
  Upload,
  ExternalLink,
  RefreshCw,
  Trash2,
  Timer,
  Radio,
  ShieldAlert,
  EyeOff,
  RotateCcw,
  Layers,
  Sparkles,
} from "lucide-react";
import {
  ACT_META,
  ACCENT_PALETTE,
  DEFAULT_PROGRAM_SLIDES,
  type ProgramSlide,
  type SlideActId,
  type SlideThemeAccent,
} from "./programSlides";
import {
  SlideStageRenderer,
  type StageBroadcastState,
} from "./SlideStageRenderer";
import {
  downloadSlidePosterPng,
  downloadSlideVideoFile,
} from "./slideExporter";

const STORAGE_KEY_SLIDES = "jtf2026_live_program_slides_v14";
const STORAGE_KEY_SYNC = "jtf2026_live_sync_payload_v14";
const BROADCAST_CHANNEL_NAME = "jtf2026_live_stage_v14";

interface SyncPayload {
  slides: ProgramSlide[];
  selectedIndex: number;
  aspect: "16:9" | "9:16";
  replayKey: number;
  broadcast: StageBroadcastState;
}

const DEFAULT_BROADCAST_STATE: StageBroadcastState = {
  logoHold: false,
  blackout: false,
  showLowerThird: false,
  lowerThirdTitle: "LIVE AT JOS TECHFEST",
  lowerThirdMessage:
    "Share your insights & photos using #JosTechFest · Register at register.techfest.com.ng",
  showTimer: false,
  timerRemainingSec: 900, // 15 minutes default
  timerRunning: false,
};

export default function LiveEventProjectionPage() {
  const [isLedReceiver, setIsLedReceiver] = useState(false);
  const [slides, setSlides] = useState<ProgramSlide[]>(DEFAULT_PROGRAM_SLIDES);
  const [actFilter, setActFilter] = useState<SlideActId | "all">("all");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [aspect, setAspect] = useState<"16:9" | "9:16">("16:9");
  const [replayKey, setReplayKey] = useState(0);
  const [autoAdvance, setAutoAdvance] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hudVisible, setHudVisible] = useState(true);
  const [activeTab, setActiveTab] = useState<"edit" | "broadcast" | "inject">("edit");
  const [broadcast, setBroadcast] = useState<StageBroadcastState>(
    DEFAULT_BROADCAST_STATE
  );
  const [downloadingLabel, setDownloadingLabel] = useState<string | null>(null);
  const [downloadProgress, setDownloadProgress] = useState(0);

  // Inject Custom Media state
  const [injectTitle, setInjectTitle] = useState("Special Stage Presentation");
  const [injectSubtitle, setInjectSubtitle] = useState("Live Keynote Deck · Jos TechFest 2026");
  const [injectEmbedUrl, setInjectEmbedUrl] = useState("");

  const stageRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const injectFileRef = useRef<HTMLInputElement>(null);
  const channelRef = useRef<BroadcastChannel | null>(null);
  const hudTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Detect ?view=led mode & load persisted slides
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("view") === "led") {
        setIsLedReceiver(true);
      }
      try {
        const saved = localStorage.getItem(STORAGE_KEY_SLIDES);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setSlides(parsed);
          }
        }
        const savedSync = localStorage.getItem(STORAGE_KEY_SYNC);
        if (savedSync && params.get("view") === "led") {
          const payload: SyncPayload = JSON.parse(savedSync);
          if (payload.slides?.length) setSlides(payload.slides);
          if (typeof payload.selectedIndex === "number")
            setSelectedIndex(payload.selectedIndex);
          if (payload.aspect) setAspect(payload.aspect);
          if (payload.broadcast) setBroadcast(payload.broadcast);
        }
      } catch {
        // ignore storage errors
      }
    }
  }, []);

  // Setup BroadcastChannel for dual-screen operator -> LED wall sync
  useEffect(() => {
    if (typeof window === "undefined" || !("BroadcastChannel" in window)) return;
    const ch = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
    channelRef.current = ch;

    ch.onmessage = (event) => {
      const data = event.data as SyncPayload;
      if (!data) return;
      if (isLedReceiver) {
        setSlides(data.slides);
        setSelectedIndex(data.selectedIndex);
        setAspect(data.aspect);
        setReplayKey(data.replayKey);
        setBroadcast(data.broadcast);
      }
    };

    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY_SYNC && e.newValue && isLedReceiver) {
        try {
          const data: SyncPayload = JSON.parse(e.newValue);
          setSlides(data.slides);
          setSelectedIndex(data.selectedIndex);
          setAspect(data.aspect);
          setReplayKey(data.replayKey);
          setBroadcast(data.broadcast);
        } catch {
          // ignore
        }
      }
    };
    window.addEventListener("storage", onStorage);

    return () => {
      ch.close();
      window.removeEventListener("storage", onStorage);
    };
  }, [isLedReceiver]);

  // Publish state changes from Operator Console to LED Output Window
  useEffect(() => {
    if (isLedReceiver) return;
    const payload: SyncPayload = {
      slides,
      selectedIndex,
      aspect,
      replayKey,
      broadcast,
    };
    channelRef.current?.postMessage(payload);
    try {
      localStorage.setItem(STORAGE_KEY_SYNC, JSON.stringify(payload));
    } catch {
      // ignore quota
    }
  }, [isLedReceiver, slides, selectedIndex, aspect, replayKey, broadcast]);

  // Stage countdown timer tick
  useEffect(() => {
    if (!broadcast.timerRunning || isLedReceiver) return;
    const id = setInterval(() => {
      setBroadcast((prev) => {
        if (prev.timerRemainingSec <= 1) {
          return { ...prev, timerRemainingSec: 0, timerRunning: false };
        }
        return { ...prev, timerRemainingSec: prev.timerRemainingSec - 1 };
      });
    }, 1000);
    return () => clearInterval(id);
  }, [broadcast.timerRunning, isLedReceiver]);

  // Auto-advance playlist mode (every 8s)
  useEffect(() => {
    if (!autoAdvance || isLedReceiver) return;
    const id = setInterval(() => {
      setSelectedIndex((prev) => (prev + 1) % slides.length);
      setReplayKey((k) => k + 1);
    }, 8000);
    return () => clearInterval(id);
  }, [autoAdvance, isLedReceiver, slides.length]);

  const safeIndex = Math.min(selectedIndex, Math.max(0, slides.length - 1));
  const currentSlide = slides[safeIndex] || DEFAULT_PROGRAM_SLIDES[0];

  const persistSlides = useCallback((next: ProgramSlide[]) => {
    setSlides(next);
    try {
      localStorage.setItem(STORAGE_KEY_SLIDES, JSON.stringify(next));
    } catch {
      // ignore
    }
  }, []);

  const updateCurrentSlide = useCallback(
    (patch: Partial<ProgramSlide>) => {
      const next = slides.map((s, idx) =>
        idx === safeIndex ? { ...s, ...patch } : s
      );
      persistSlides(next);
    },
    [slides, safeIndex, persistSlides]
  );

  const toggleFullscreen = useCallback(async () => {
    const target = stageRef.current || document.documentElement;
    if (!document.fullscreenElement) {
      await target.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      await document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  }, []);

  useEffect(() => {
    const onFs = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  // Auto-hide HUD in fullscreen or LED receiver mode after 2.5s of mouse inactivity
  const handleMouseMove = useCallback(() => {
    setHudVisible(true);
    if (hudTimeoutRef.current) clearTimeout(hudTimeoutRef.current);
    hudTimeoutRef.current = setTimeout(() => {
      setHudVisible(false);
    }, 2500);
  }, []);

  // Keyboard shortcuts for AV Operator (Arrows = prev/next cue, F = Fullscreen, L = Logo Hold, B = Blackout, R = Replay)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % slides.length);
        setReplayKey((k) => k + 1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + slides.length) % slides.length);
        setReplayKey((k) => k + 1);
      } else if (e.key.toLowerCase() === "f") {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key.toLowerCase() === "l") {
        e.preventDefault();
        setBroadcast((prev) => ({
          ...prev,
          logoHold: !prev.logoHold,
          blackout: false,
        }));
      } else if (e.key.toLowerCase() === "b") {
        e.preventDefault();
        setBroadcast((prev) => ({
          ...prev,
          blackout: !prev.blackout,
          logoHold: false,
        }));
      } else if (e.key.toLowerCase() === "r") {
        e.preventDefault();
        setReplayKey((k) => k + 1);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [slides.length, toggleFullscreen]);

  const handleOpenPopoutLed = useCallback(() => {
    window.open(
      "/live?view=led",
      "JTF2026_LED_WALL",
      "width=1280,height=720,menubar=no,toolbar=no,location=no,status=no"
    );
  }, []);

  const handlePhotoUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      if (file.type.startsWith("video/")) {
        const videoUrl = URL.createObjectURL(file);
        updateCurrentSlide({
          mediaUrl: videoUrl,
          mediaType: "video",
        });
        setReplayKey((k) => k + 1);
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          updateCurrentSlide({
            mediaUrl: reader.result,
            mediaType: "image",
          });
          setReplayKey((k) => k + 1);
        }
      };
      reader.readAsDataURL(file);
    },
    [updateCurrentSlide]
  );

  const handleInjectFileMedia = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const isVideo = file.type.startsWith("video/");
      const url = URL.createObjectURL(file);
      const newCue = String(slides.length + 1).padStart(2, "0");
      const newSlide: ProgramSlide = {
        id: `custom-media-${Date.now()}`,
        cueNumber: newCue,
        actId: currentSlide.actId,
        actLabel: "Custom Media",
        kind: "custom-media",
        timeSlot: "LIVE ON STAGE",
        badgeLabel: isVideo ? "LIVE STAGE VIDEO" : "LIVE PRESENTATION SLIDE",
        title: injectTitle || file.name,
        subtitle: injectSubtitle,
        accent: currentSlide.accent,
        mediaUrl: url,
        mediaType: isVideo ? "video" : "image",
        stageNote: `Injected ${isVideo ? "video" : "image"} asset: ${file.name}`,
      };
      const next = [...slides];
      next.splice(safeIndex + 1, 0, newSlide);
      persistSlides(next);
      setSelectedIndex(safeIndex + 1);
      setReplayKey((k) => k + 1);
    },
    [slides, safeIndex, currentSlide, injectTitle, injectSubtitle, persistSlides]
  );

  const handleInjectEmbedSlide = useCallback(() => {
    if (!injectEmbedUrl.trim()) return;
    const newCue = String(slides.length + 1).padStart(2, "0");
    const newSlide: ProgramSlide = {
      id: `custom-embed-${Date.now()}`,
      cueNumber: newCue,
      actId: currentSlide.actId,
      actLabel: "Live Deck",
      kind: "custom-media",
      timeSlot: "LIVE PRESENTATION",
      badgeLabel: "LIVE SPEAKER DECK",
      title: injectTitle || "Speaker Presentation",
      subtitle: injectSubtitle,
      accent: currentSlide.accent,
      mediaUrl: injectEmbedUrl.trim(),
      mediaType: "embed",
      stageNote: "Embedded presentation URL.",
    };
    const next = [...slides];
    next.splice(safeIndex + 1, 0, newSlide);
    persistSlides(next);
    setSelectedIndex(safeIndex + 1);
    setInjectEmbedUrl("");
    setReplayKey((k) => k + 1);
  }, [
    injectEmbedUrl,
    slides,
    safeIndex,
    currentSlide,
    injectTitle,
    injectSubtitle,
    persistSlides,
  ]);

  const handleDownloadVideo = useCallback(async () => {
    if (downloadingLabel) return;
    try {
      setDownloadProgress(0);
      setDownloadingLabel(`Cue #${currentSlide.cueNumber}`);
      await downloadSlideVideoFile(currentSlide, aspect, (pct) =>
        setDownloadProgress(pct)
      );
    } finally {
      setDownloadingLabel(null);
      setDownloadProgress(0);
    }
  }, [downloadingLabel, currentSlide, aspect]);

  const handleDownloadPoster = useCallback(async () => {
    await downloadSlidePosterPng(currentSlide, aspect);
  }, [currentSlide, aspect]);

  // =========================================================================
  // CLEAN LED RECEIVER VIEW (/live?view=led)
  // =========================================================================
  if (isLedReceiver) {
    return (
      <main
        ref={stageRef}
        onMouseMove={handleMouseMove}
        className="relative h-screen w-screen overflow-hidden bg-black"
      >
        <SlideStageRenderer
          slide={currentSlide}
          aspect="16:9"
          replayKey={replayKey}
          broadcast={broadcast}
        />
        {hudVisible && (
          <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full border border-white/15 bg-black/80 px-4 py-2 text-xs font-bold text-white backdrop-blur-md">
            <span>
              Cue #{currentSlide.cueNumber} · {currentSlide.title}
            </span>
            <button
              type="button"
              onClick={toggleFullscreen}
              className="rounded-full bg-emerald-600 hover:bg-emerald-500 px-3 py-1 text-white cursor-pointer"
            >
              {isFullscreen ? "Exit Fullscreen" : "Fullscreen LED (F)"}
            </button>
          </div>
        )}
      </main>
    );
  }

  const filteredSlides = slides
    .map((s, idx) => ({ slide: s, originalIndex: idx }))
    .filter((item) => actFilter === "all" || item.slide.actId === actFilter);

  // =========================================================================
  // OPERATOR STAGE DIRECTOR & RUN-OF-SHOW CONSOLE (/live)
  // =========================================================================
  return (
    <main className="min-h-screen bg-[#070A09] text-white pt-24 pb-16 px-4 sm:px-6">
      <div className="mx-auto max-w-[1600px]">
        {/* ── TOP MASTER BROADCAST BAR ─────────────────────────── */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-4 sm:p-5 mb-6">
          <div>
            <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/15 px-3 py-0.5 text-[11px] font-extrabold uppercase tracking-widest text-emerald-300">
                <Radio className="h-3.5 w-3.5 animate-pulse" aria-hidden="true" />
                Live Event LED & Run-of-Show Console
              </span>
              <span className="text-xs font-semibold text-slate-400">
                26 Nov 2026 · Sarau Event Center, Jos · {slides.length} Program Cues
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Jos TechFest 2026 — Master Program & LED Projection Deck
            </h1>
          </div>

          {/* Primary Broadcast Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Pop-Out Clean LED Output Window */}
            <button
              type="button"
              onClick={handleOpenPopoutLed}
              className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 px-4 py-2 text-xs font-extrabold text-white shadow-lg shadow-emerald-950/60 transition-all cursor-pointer"
              title="Opens a clean 16:9 LED Output window synced in real time to drag onto the venue LED screen"
            >
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              Pop-Out Clean LED Window
            </button>

            {/* Fullscreen This Monitor */}
            <button
              type="button"
              onClick={toggleFullscreen}
              className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/15 hover:bg-emerald-500/25 px-3.5 py-2 text-xs font-bold text-emerald-300 transition-all cursor-pointer"
            >
              <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
              Fullscreen LED (F)
            </button>

            {/* Safety Keys: Logo Hold (L) & Blackout (B) */}
            <button
              type="button"
              onClick={() =>
                setBroadcast((prev) => ({
                  ...prev,
                  logoHold: !prev.logoHold,
                  blackout: false,
                }))
              }
              className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-bold transition-all cursor-pointer ${
                broadcast.logoHold
                  ? "border-amber-400 bg-amber-500 text-slate-950 shadow-lg"
                  : "border-white/15 bg-white/[0.04] text-slate-300 hover:text-white"
              }`}
              title="Toggle Logo Hold Screen (Shortcut: L)"
            >
              <ShieldAlert className="h-3.5 w-3.5" aria-hidden="true" />
              {broadcast.logoHold ? "Logo Hold: ACTIVE" : "Logo Hold (L)"}
            </button>

            <button
              type="button"
              onClick={() =>
                setBroadcast((prev) => ({
                  ...prev,
                  blackout: !prev.blackout,
                  logoHold: false,
                }))
              }
              className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-bold transition-all cursor-pointer ${
                broadcast.blackout
                  ? "border-red-400 bg-red-600 text-white shadow-lg"
                  : "border-white/15 bg-white/[0.04] text-slate-300 hover:text-white"
              }`}
              title="Toggle LED Blackout (Shortcut: B)"
            >
              <EyeOff className="h-3.5 w-3.5" aria-hidden="true" />
              {broadcast.blackout ? "Blackout: ACTIVE" : "Blackout (B)"}
            </button>

            {/* Aspect Ratio Toggle */}
            <div className="inline-flex rounded-full border border-white/10 bg-black/50 p-1">
              <button
                type="button"
                onClick={() => setAspect("16:9")}
                className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold cursor-pointer ${
                  aspect === "16:9"
                    ? "bg-blue-600 text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Monitor className="h-3.5 w-3.5" aria-hidden="true" /> 16:9 LED
              </button>
              <button
                type="button"
                onClick={() => setAspect("9:16")}
                className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold cursor-pointer ${
                  aspect === "9:16"
                    ? "bg-blue-600 text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Smartphone className="h-3.5 w-3.5" aria-hidden="true" /> 9:16 Social
              </button>
            </div>

            {/* Download Active Slide as Video or PNG */}
            <button
              type="button"
              onClick={handleDownloadVideo}
              disabled={Boolean(downloadingLabel)}
              className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 hover:bg-blue-500 disabled:opacity-60 px-4 py-2 text-xs font-bold text-white shadow-lg cursor-pointer"
            >
              {downloadingLabel ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                  Exporting {downloadProgress}%
                </>
              ) : (
                <>
                  <Download className="h-3.5 w-3.5" aria-hidden="true" />
                  Download Video
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleDownloadPoster}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.05] hover:bg-white/[0.1] px-3.5 py-2 text-xs font-bold text-white cursor-pointer"
            >
              <ImageIcon className="h-3.5 w-3.5" aria-hidden="true" />
              PNG Slide
            </button>
          </div>
        </div>

        {/* ============================================================
            3-COLUMN BROADCAST WORKSPACE:
            Col 1: Run-of-Show Program Playlist (4 Acts)
            Col 2: Live 16:9 / 9:16 Stage Monitor + Transport Controls
            Col 3: Live Slide Editor, Stage Overlays & Media Injector
            ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* ── COLUMN 1: 4-ACT RUN-OF-SHOW PROGRAM PLAYLIST (3 Cols) ── */}
          <section
            aria-label="Run of show program playlist"
            className="lg:col-span-3 rounded-3xl border border-white/10 bg-white/[0.025] p-4 flex flex-col max-h-[82vh]"
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xs font-black uppercase tracking-widest text-slate-300">
                Program Run-of-Show ({filteredSlides.length})
              </h2>
              <button
                type="button"
                onClick={() => {
                  persistSlides(DEFAULT_PROGRAM_SLIDES);
                  setSelectedIndex(0);
                  setReplayKey((k) => k + 1);
                }}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400 hover:text-white cursor-pointer"
                title="Reset program deck to default"
              >
                <RefreshCw className="h-3 w-3" aria-hidden="true" /> Reset
              </button>
            </div>

            {/* Act Filter Pills */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              <button
                type="button"
                onClick={() => setActFilter("all")}
                className={`rounded-full px-2.5 py-1 text-[11px] font-bold cursor-pointer ${
                  actFilter === "all"
                    ? "bg-emerald-500 text-slate-950"
                    : "bg-white/[0.05] text-slate-300 hover:text-white"
                }`}
              >
                All ({slides.length})
              </button>
              {(Object.keys(ACT_META) as SlideActId[]).map((actKey) => (
                <button
                  key={actKey}
                  type="button"
                  onClick={() => setActFilter(actKey)}
                  className={`rounded-full px-2.5 py-1 text-[11px] font-bold cursor-pointer ${
                    actFilter === actKey
                      ? "bg-emerald-500 text-slate-950"
                      : "bg-white/[0.05] text-slate-300 hover:text-white"
                  }`}
                >
                  {ACT_META[actKey].shortLabel}
                </button>
              ))}
            </div>

            {/* Scrollable Cue List */}
            <ol
              role="list"
              className="flex-1 overflow-y-auto space-y-2 pr-1"
            >
              {filteredSlides.map(({ slide, originalIndex }) => {
                const isCurrent = originalIndex === safeIndex;
                const sTheme = ACCENT_PALETTE[slide.accent];
                return (
                  <li key={slide.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedIndex(originalIndex);
                        setReplayKey((k) => k + 1);
                      }}
                      className={`w-full text-left rounded-2xl p-2.5 transition-all cursor-pointer border flex items-center gap-3 ${
                        isCurrent
                          ? "bg-emerald-500/15 border-emerald-400 shadow-lg"
                          : "bg-black/40 border-white/10 hover:border-white/25"
                      }`}
                    >
                      <span
                        className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl text-xs font-black"
                        style={{
                          backgroundColor: isCurrent
                            ? "#10B981"
                            : sTheme.badgeBgRgba,
                          color: isCurrent ? "#052E16" : sTheme.secondary,
                          border: `1px solid ${sTheme.borderRgba}`,
                        }}
                      >
                        {slide.cueNumber}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <span
                            className="text-[10px] font-extrabold uppercase tracking-wider truncate"
                            style={{ color: sTheme.secondary }}
                          >
                            {slide.actLabel}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400 flex-shrink-0">
                            {slide.timeSlot}
                          </span>
                        </div>
                        <p className="text-xs font-bold text-white truncate mt-0.5">
                          {slide.title}
                        </p>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ol>
          </section>

          {/* ── COLUMN 2: LIVE LED STAGE MONITOR & TRANSPORT BAR (6 Cols) ── */}
          <section
            aria-label="Live LED stage monitor"
            className="lg:col-span-6 flex flex-col gap-4"
          >
            {/* Stage Viewport */}
            <div
              ref={stageRef}
              onMouseMove={handleMouseMove}
              className={`relative mx-auto overflow-hidden rounded-3xl border border-white/15 bg-black shadow-2xl flex items-center justify-center ${
                isFullscreen
                  ? "w-screen h-screen rounded-none border-none"
                  : aspect === "16:9"
                  ? "w-full aspect-video"
                  : "w-full max-w-[420px] aspect-[9/16]"
              }`}
            >
              <SlideStageRenderer
                slide={currentSlide}
                aspect={aspect}
                replayKey={replayKey}
                broadcast={broadcast}
              />

              {/* Auto-Hiding Fullscreen Transport HUD */}
              {isFullscreen && hudVisible && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 rounded-full border border-white/20 bg-black/85 px-6 py-3 shadow-2xl backdrop-blur-md">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedIndex(
                        (prev) => (prev - 1 + slides.length) % slides.length
                      );
                      setReplayKey((k) => k + 1);
                    }}
                    className="rounded-full bg-white/10 hover:bg-white/20 p-2 text-white cursor-pointer"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <span className="text-xs font-extrabold text-white px-2">
                    Cue #{currentSlide.cueNumber} / {slides.length} ·{" "}
                    {currentSlide.title}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedIndex((prev) => (prev + 1) % slides.length);
                      setReplayKey((k) => k + 1);
                    }}
                    className="rounded-full bg-emerald-600 hover:bg-emerald-500 p-2 text-white cursor-pointer"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={toggleFullscreen}
                    className="ml-2 rounded-full border border-white/20 px-3 py-1 text-xs font-bold text-slate-200 hover:text-white cursor-pointer"
                  >
                    Exit Fullscreen
                  </button>
                </div>
              )}
            </div>

            {/* Operator Cue Transport Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedIndex(
                      (prev) => (prev - 1 + slides.length) % slides.length
                    );
                    setReplayKey((k) => k + 1);
                  }}
                  className="inline-flex items-center gap-1 rounded-xl border border-white/15 bg-white/[0.05] hover:bg-white/[0.12] px-3.5 py-2 text-xs font-bold text-white cursor-pointer"
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" /> Prev Cue (←)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedIndex((prev) => (prev + 1) % slides.length);
                    setReplayKey((k) => k + 1);
                  }}
                  className="inline-flex items-center gap-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-4 py-2 text-xs font-extrabold text-white shadow cursor-pointer"
                >
                  Next Cue (→) <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => setReplayKey((k) => k + 1)}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/[0.04] hover:bg-white/[0.1] px-3 py-2 text-xs font-bold text-slate-200 cursor-pointer"
                  title="Replay Entrance Motion (R)"
                >
                  <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" /> Replay Motion
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setAutoAdvance((v) => !v)}
                  className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-bold cursor-pointer ${
                    autoAdvance
                      ? "border-amber-400 bg-amber-500/20 text-amber-300"
                      : "border-white/15 bg-white/[0.04] text-slate-300"
                  }`}
                >
                  {autoAdvance ? (
                    <>
                      <Pause className="h-3.5 w-3.5" aria-hidden="true" /> Auto-Play ON (8s)
                    </>
                  ) : (
                    <>
                      <Play className="h-3.5 w-3.5" aria-hidden="true" /> Auto-Play Deck
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Stage Director Note Box */}
            {currentSlide.stageNote && (
              <div className="rounded-2xl border border-blue-500/25 bg-blue-500/10 px-4 py-3 text-xs text-blue-200 flex items-center justify-between gap-4">
                <div>
                  <span className="font-extrabold uppercase tracking-wider text-blue-400 mr-2">
                    Stage Cue Note:
                  </span>
                  <span>{currentSlide.stageNote}</span>
                </div>
                <span className="font-mono text-[11px] text-blue-300 flex-shrink-0">
                  Cue #{currentSlide.cueNumber} / {slides.length}
                </span>
              </div>
            )}
          </section>

          {/* ── COLUMN 3: SLIDE EDITOR, STAGE OVERLAYS & MEDIA INJECTOR (3 Cols) ── */}
          <aside className="lg:col-span-3 rounded-3xl border border-white/10 bg-white/[0.025] p-4 flex flex-col gap-4">
            {/* Inspector Tabs */}
            <div className="grid grid-cols-3 gap-1 rounded-2xl bg-black/50 p-1 border border-white/10">
              <button
                type="button"
                onClick={() => setActiveTab("edit")}
                className={`inline-flex items-center justify-center gap-1 rounded-xl py-2 text-[11px] font-extrabold cursor-pointer ${
                  activeTab === "edit"
                    ? "bg-emerald-500 text-slate-950"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Sliders className="h-3.5 w-3.5" aria-hidden="true" /> Edit Slide
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("broadcast")}
                className={`inline-flex items-center justify-center gap-1 rounded-xl py-2 text-[11px] font-extrabold cursor-pointer ${
                  activeTab === "broadcast"
                    ? "bg-emerald-500 text-slate-950"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Timer className="h-3.5 w-3.5" aria-hidden="true" /> Overlays
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("inject")}
                className={`inline-flex items-center justify-center gap-1 rounded-xl py-2 text-[11px] font-extrabold cursor-pointer ${
                  activeTab === "inject"
                    ? "bg-emerald-500 text-slate-950"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Plus className="h-3.5 w-3.5" aria-hidden="true" /> Add Media
              </button>
            </div>

            {/* TAB 1: LIVE SLIDE PROPS EDITOR */}
            {activeTab === "edit" && (
              <div className="flex flex-col gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,video/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl border border-emerald-500/40 bg-emerald-500/15 hover:bg-emerald-500/25 px-3 py-2 font-bold text-emerald-300 cursor-pointer"
                  >
                    <Upload className="h-3.5 w-3.5" aria-hidden="true" />
                    {currentSlide.kind === "startup-video"
                      ? "Upload Startup MP4 Video"
                      : "Upload Photo / Video"}
                  </button>
                  {slides.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        const next = slides.filter((_, idx) => idx !== safeIndex);
                        persistSlides(next);
                        setSelectedIndex(Math.max(0, safeIndex - 1));
                      }}
                      className="rounded-xl border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 p-2 text-red-300 cursor-pointer"
                      title="Delete this slide cue"
                    >
                      <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  )}
                </div>

                <label className="flex flex-col gap-1">
                  <span className="font-bold text-slate-400">Main Headline / Speaker Name</span>
                  <input
                    type="text"
                    value={currentSlide.title}
                    onChange={(e) => updateCurrentSlide({ title: e.target.value })}
                    className="rounded-xl border border-white/15 bg-black/60 px-3 py-2 text-white font-semibold focus:border-emerald-400 focus:outline-none"
                  />
                </label>

                <label className="flex flex-col gap-1">
                  <span className="font-bold text-slate-400">Subtitle / Role</span>
                  <input
                    type="text"
                    value={currentSlide.subtitle}
                    onChange={(e) =>
                      updateCurrentSlide({ subtitle: e.target.value })
                    }
                    className="rounded-xl border border-white/15 bg-black/60 px-3 py-2 text-white font-semibold focus:border-emerald-400 focus:outline-none"
                  />
                </label>

                <div className="grid grid-cols-2 gap-2">
                  <label className="flex flex-col gap-1">
                    <span className="font-bold text-slate-400">Time Slot</span>
                    <input
                      type="text"
                      value={currentSlide.timeSlot}
                      onChange={(e) =>
                        updateCurrentSlide({ timeSlot: e.target.value })
                      }
                      className="rounded-xl border border-white/15 bg-black/60 px-3 py-2 text-white font-semibold focus:border-emerald-400 focus:outline-none"
                    />
                  </label>
                  <label className="flex flex-col gap-1">
                    <span className="font-bold text-slate-400">Top Badge</span>
                    <input
                      type="text"
                      value={currentSlide.badgeLabel}
                      onChange={(e) =>
                        updateCurrentSlide({ badgeLabel: e.target.value })
                      }
                      className="rounded-xl border border-white/15 bg-black/60 px-3 py-2 text-white font-semibold focus:border-emerald-400 focus:outline-none"
                    />
                  </label>
                </div>

                <label className="flex flex-col gap-1">
                  <span className="font-bold text-slate-400">Talk Title / Quote Card</span>
                  <textarea
                    rows={2}
                    value={currentSlide.talkTitle || ""}
                    onChange={(e) =>
                      updateCurrentSlide({ talkTitle: e.target.value })
                    }
                    className="rounded-xl border border-white/15 bg-black/60 px-3 py-2 text-white font-semibold focus:border-emerald-400 focus:outline-none resize-none"
                  />
                </label>

                {/* Panel Questions LED Projector Switcher (for panel-backdrop slides) */}
                {currentSlide.panelQuestions &&
                  currentSlide.panelQuestions.length > 0 && (
                    <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.06] p-3 flex flex-col gap-2">
                      <span className="font-extrabold uppercase tracking-wider text-emerald-300 text-[11px]">
                        Project Panel Question on LED Wall
                      </span>
                      <div className="grid grid-cols-5 gap-1.5">
                        <button
                          type="button"
                          onClick={() =>
                            updateCurrentSlide({ activeQuestionIndex: null })
                          }
                          className={`rounded-lg border py-1.5 text-[11px] font-bold cursor-pointer ${
                            typeof currentSlide.activeQuestionIndex !== "number"
                              ? "border-emerald-400 bg-emerald-500 text-slate-950"
                              : "border-white/10 bg-black/50 text-slate-300"
                          }`}
                        >
                          All
                        </button>
                        {currentSlide.panelQuestions.map((q, qIdx) => (
                          <button
                            key={q.id}
                            type="button"
                            onClick={() =>
                              updateCurrentSlide({ activeQuestionIndex: qIdx })
                            }
                            className={`rounded-lg border py-1.5 text-[11px] font-bold cursor-pointer ${
                              currentSlide.activeQuestionIndex === qIdx
                                ? "border-emerald-400 bg-emerald-500 text-slate-950"
                                : "border-white/10 bg-black/50 text-slate-300"
                            }`}
                            title={q.title}
                          >
                            Q{q.number}
                          </button>
                        ))}
                      </div>
                      {typeof currentSlide.activeQuestionIndex === "number" &&
                        currentSlide.panelQuestions[
                          currentSlide.activeQuestionIndex
                        ] && (
                          <p className="text-[11px] text-slate-300 leading-snug mt-1">
                            <strong className="text-white">
                              {
                                currentSlide.panelQuestions[
                                  currentSlide.activeQuestionIndex
                                ].title
                              }
                              :
                            </strong>{" "}
                            {
                              currentSlide.panelQuestions[
                                currentSlide.activeQuestionIndex
                              ].prompt
                            }
                          </p>
                        )}
                    </div>
                  )}

                {/* Fireside Chat / Panelists Live Roster Editor */}
                {currentSlide.people && currentSlide.people.length > 0 && (
                  <div className="rounded-2xl border border-white/10 bg-black/40 p-3 flex flex-col gap-2.5">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold uppercase tracking-wider text-amber-300 text-[11px]">
                        Stage Guests / Founders ({currentSlide.people.length})
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          const nextPeople = [
                            ...(currentSlide.people || []),
                            {
                              id: `guest-${Date.now()}`,
                              name: `Founder ${(currentSlide.people?.length || 0) + 1}`,
                              role: "Startup Founder",
                              talkTitle: "Building & Scaling from Jos",
                              image: null,
                              initials: `F${(currentSlide.people?.length || 0) + 1}`,
                            },
                          ];
                          updateCurrentSlide({ people: nextPeople });
                        }}
                        className="inline-flex items-center gap-1 rounded-full bg-amber-500/20 border border-amber-400/40 px-2.5 py-0.5 text-[10px] font-bold text-amber-300 cursor-pointer"
                      >
                        <Plus className="h-3 w-3" aria-hidden="true" /> Add Guest
                      </button>
                    </div>
                    <div className="max-h-44 overflow-y-auto space-y-2 pr-1">
                      {currentSlide.people.map((person, pIdx) => (
                        <div
                          key={person.id}
                          className="rounded-xl border border-white/10 bg-white/[0.03] p-2 flex flex-col gap-1.5"
                        >
                          <div className="flex items-center gap-1.5">
                            <input
                              type="text"
                              value={person.name}
                              onChange={(e) => {
                                const newName = e.target.value;
                                const parts = newName.trim().split(/\s+/);
                                const initials =
                                  parts.length > 1
                                    ? `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
                                    : (parts[0] || "F").slice(0, 2).toUpperCase();
                                const nextPeople = (currentSlide.people || []).map(
                                  (item, i) =>
                                    i === pIdx
                                      ? { ...item, name: newName, initials }
                                      : item
                                );
                                updateCurrentSlide({ people: nextPeople });
                              }}
                              placeholder="Founder / Guest Name"
                              className="flex-1 rounded-lg border border-white/15 bg-black/60 px-2 py-1 text-[11px] font-bold text-white"
                            />
                            {currentSlide.people && currentSlide.people.length > 1 && (
                              <button
                                type="button"
                                onClick={() => {
                                  const nextPeople = (currentSlide.people || []).filter(
                                    (_, i) => i !== pIdx
                                  );
                                  updateCurrentSlide({ people: nextPeople });
                                }}
                                className="text-red-400 hover:text-red-300 p-1 cursor-pointer"
                                title="Remove guest"
                              >
                                <Trash2 className="h-3 w-3" aria-hidden="true" />
                              </button>
                            )}
                          </div>
                          <input
                            type="text"
                            value={person.role}
                            onChange={(e) => {
                              const nextPeople = (currentSlide.people || []).map(
                                (item, i) =>
                                  i === pIdx
                                    ? { ...item, role: e.target.value }
                                    : item
                              );
                              updateCurrentSlide({ people: nextPeople });
                            }}
                            placeholder="Startup Name / Role"
                            className="rounded-lg border border-white/10 bg-black/50 px-2 py-1 text-[10px] text-slate-300"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <span className="block font-bold text-slate-400 mb-1.5">
                    Stage Accent Theme
                  </span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {(Object.keys(ACCENT_PALETTE) as SlideThemeAccent[]).map(
                      (accKey) => {
                        const pal = ACCENT_PALETTE[accKey];
                        const active = currentSlide.accent === accKey;
                        return (
                          <button
                            key={accKey}
                            type="button"
                            onClick={() => updateCurrentSlide({ accent: accKey })}
                            className={`flex items-center gap-2 rounded-xl border px-2.5 py-2 text-left font-bold cursor-pointer ${
                              active
                                ? "border-white bg-white/[0.12] text-white"
                                : "border-white/10 bg-black/40 text-slate-400"
                            }`}
                          >
                            <span
                              className="h-3 w-3 rounded-full flex-shrink-0"
                              style={{ backgroundColor: pal.secondary }}
                            />
                            <span className="truncate text-[11px]">{pal.label}</span>
                          </button>
                        );
                      }
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: STAGE COUNTDOWN TIMER & LOWER-THIRD TICKER */}
            {activeTab === "broadcast" && (
              <div className="flex flex-col gap-4 text-xs">
                {/* Countdown Timer Controls */}
                <div className="rounded-2xl border border-white/10 bg-black/40 p-3.5 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold uppercase tracking-wider text-amber-300">
                      Stage Countdown Timer
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setBroadcast((prev) => ({
                          ...prev,
                          showTimer: !prev.showTimer,
                        }))
                      }
                      className={`rounded-full px-3 py-1 text-[11px] font-bold cursor-pointer ${
                        broadcast.showTimer
                          ? "bg-amber-500 text-slate-950"
                          : "bg-white/10 text-slate-300"
                      }`}
                    >
                      {broadcast.showTimer ? "Visible on LED" : "Hidden"}
                    </button>
                  </div>

                  {/* Quick Duration Presets */}
                  <div className="grid grid-cols-4 gap-1.5">
                    {[
                      { label: "5m", sec: 300 },
                      { label: "10m", sec: 600 },
                      { label: "15m", sec: 900 },
                      { label: "45m", sec: 2700 },
                    ].map((preset) => (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() =>
                          setBroadcast((prev) => ({
                            ...prev,
                            timerRemainingSec: preset.sec,
                            showTimer: true,
                          }))
                        }
                        className="rounded-lg border border-white/10 bg-white/[0.04] hover:bg-white/[0.1] py-1.5 font-bold text-white cursor-pointer"
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setBroadcast((prev) => ({
                          ...prev,
                          timerRunning: !prev.timerRunning,
                          showTimer: true,
                        }))
                      }
                      className="flex-1 rounded-xl bg-amber-500 hover:bg-amber-400 py-2 font-black text-slate-950 cursor-pointer"
                    >
                      {broadcast.timerRunning ? "Pause Timer" : "Start Countdown"}
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setBroadcast((prev) => ({
                          ...prev,
                          timerRunning: false,
                          timerRemainingSec: 900,
                        }))
                      }
                      className="rounded-xl border border-white/15 px-3 py-2 font-bold text-slate-300 cursor-pointer"
                    >
                      Reset
                    </button>
                  </div>
                </div>

                {/* Live Lower-Third Announcement Banner */}
                <div className="rounded-2xl border border-white/10 bg-black/40 p-3.5 flex flex-col gap-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold uppercase tracking-wider text-emerald-300">
                      Lower-Third Stage Banner
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setBroadcast((prev) => ({
                          ...prev,
                          showLowerThird: !prev.showLowerThird,
                        }))
                      }
                      className={`rounded-full px-3 py-1 text-[11px] font-bold cursor-pointer ${
                        broadcast.showLowerThird
                          ? "bg-emerald-500 text-slate-950"
                          : "bg-white/10 text-slate-300"
                      }`}
                    >
                      {broadcast.showLowerThird ? "LIVE ON LED" : "Off"}
                    </button>
                  </div>

                  <input
                    type="text"
                    value={broadcast.lowerThirdTitle}
                    onChange={(e) =>
                      setBroadcast((prev) => ({
                        ...prev,
                        lowerThirdTitle: e.target.value,
                      }))
                    }
                    placeholder="Badge (e.g. UP NEXT)"
                    className="rounded-xl border border-white/15 bg-black/60 px-3 py-1.5 text-white font-semibold"
                  />

                  <textarea
                    rows={2}
                    value={broadcast.lowerThirdMessage}
                    onChange={(e) =>
                      setBroadcast((prev) => ({
                        ...prev,
                        lowerThirdMessage: e.target.value,
                      }))
                    }
                    placeholder="Announcement text..."
                    className="rounded-xl border border-white/15 bg-black/60 px-3 py-1.5 text-white font-semibold resize-none"
                  />
                </div>
              </div>
            )}

            {/* TAB 3: INJECT ON-THE-DAY MEDIA / SPEAKER DECK (NO FLASH DRIVES NEEDED) */}
            {activeTab === "inject" && (
              <div className="flex flex-col gap-3 text-xs">
                <p className="text-slate-400 leading-relaxed">
                  Drop in any image, `.mp4` video, or Google Slides / Canva embed URL to project immediately as the next cue on the LED wall.
                </p>

                <label className="flex flex-col gap-1">
                  <span className="font-bold text-slate-400">Slide / Deck Title</span>
                  <input
                    type="text"
                    value={injectTitle}
                    onChange={(e) => setInjectTitle(e.target.value)}
                    className="rounded-xl border border-white/15 bg-black/60 px-3 py-2 text-white font-semibold"
                  />
                </label>

                <label className="flex flex-col gap-1">
                  <span className="font-bold text-slate-400">Subtitle / Speaker</span>
                  <input
                    type="text"
                    value={injectSubtitle}
                    onChange={(e) => setInjectSubtitle(e.target.value)}
                    className="rounded-xl border border-white/15 bg-black/60 px-3 py-2 text-white font-semibold"
                  />
                </label>

                <input
                  ref={injectFileRef}
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleInjectFileMedia}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => injectFileRef.current?.click()}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/15 hover:bg-emerald-500/25 py-2.5 font-extrabold text-emerald-300 cursor-pointer"
                >
                  <Upload className="h-4 w-4" aria-hidden="true" />
                  Inject Local Image or MP4 Video
                </button>

                <div className="border-t border-white/10 pt-2.5 flex flex-col gap-2">
                  <span className="font-bold text-slate-400">
                    Or Embed Google Slides / Canva / Web URL
                  </span>
                  <input
                    type="url"
                    value={injectEmbedUrl}
                    onChange={(e) => setInjectEmbedUrl(e.target.value)}
                    placeholder="https://docs.google.com/presentation/..."
                    className="rounded-xl border border-white/15 bg-black/60 px-3 py-2 text-white font-semibold"
                  />
                  <button
                    type="button"
                    onClick={handleInjectEmbedSlide}
                    className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 py-2.5 font-extrabold text-white cursor-pointer"
                  >
                    <Plus className="h-4 w-4" aria-hidden="true" />
                    Add Embedded Deck to Run-of-Show
                  </button>
                </div>
              </div>
            )}

            {/* Quick Links to Moderator Guide, Remotion Studio Bundle & Main Website */}
            <div className="mt-auto pt-3 border-t border-white/10 flex flex-col gap-2 text-xs">
              <Link
                href="/guide"
                target="_blank"
                className="inline-flex items-center justify-between rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 px-3.5 py-2.5 font-bold text-emerald-300 transition-colors"
              >
                <span>Moderator &amp; Guest Questions Guide</span>
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
              <a
                href="/remotion-studio/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between rounded-xl border border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 px-3.5 py-2.5 font-bold text-indigo-300 transition-colors"
              >
                <span className="inline-flex items-center gap-2">
                  <Layers className="h-3.5 w-3.5" aria-hidden="true" />
                  Open Remotion Timeline Studio
                </span>
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-1.5 text-slate-400 hover:text-emerald-400 py-1 font-semibold"
              >
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                Back to Jos TechFest 2026 Home
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
