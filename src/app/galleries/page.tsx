"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Metadata } from "next";

/* ── All 51 HD photos from the Google Drive shared folder ─────
   https://drive.google.com/drive/folders/1j-g3uDDnPqlzrL7nCRRWBZ3SvQTFuA3s
   Direct CDN URL pattern: https://lh3.googleusercontent.com/d/{FILE_ID}
   ─────────────────────────────────────────────────────────── */
const toUrl = (id: string) => `https://lh3.googleusercontent.com/d/${id}`;

const ALL_PHOTOS = [
  { id: "10HhuWkr6n4EI8vBNUFQLkySRahdnL9PE", alt: "TechFest — builders on the main floor" },
  { id: "10SZ1JPYQLm2j8n678DH1VAXbjwUSvGq3", alt: "Speaker delivering a keynote at TechFest" },
  { id: "11jZvmy5Q2EJlVIeFY-3kooAkn_JDq6I7", alt: "Panel discussion with industry experts" },
  { id: "129AWzwa71ZJW1tZCfEYr45U8gkTZe-IM", alt: "Networking session at TechFest" },
  { id: "14X-jB6oDv_E0jA4wYUFmgeeuMLC7nr6z", alt: "Audience engaged during a workshop" },
  { id: "15vIajd67L9YuebAqBUv_0tb4l4Q_TZop", alt: "Community builders collaborating" },
  { id: "18iuwOQcjgAoo39CnvCM0p_mvlLK190bp", alt: "TechFest open lounge and networking" },
  { id: "18ljXz2G0tJ5assbtj_-ffWWQYLRw_zvA", alt: "Hands-on workshop session at TechFest" },
  { id: "1CSXshQebP-9GwLh63yLKvWum4fzVR5DC", alt: "TechFest attendees at registration" },
  { id: "1D3UWbSdcIK5N6Njj3z-LjAVmu4mowNhp", alt: "Keynote speaker on stage" },
  { id: "1D5p744qsTZ7EcjgWU-Ua3WYxOSW2k7AH", alt: "TechFest crowd in the main hall" },
  { id: "1EAtaHNro38IY6wUXYnvWgKf7ONaJBiA8", alt: "Builder presenting a demo" },
  { id: "1FeGOdweky5XAR0XvgRzk05DNnKgEKe3D", alt: "TechFest evening mixer" },
  { id: "1I71DW5T-AJEeJ3SlwBjA-UyJRTnTQzx9", alt: "Community roundtable discussion" },
  { id: "1Jp6mOyLZpvJA11plVGRGuEc3wGsetg2T", alt: "Award ceremony at TechFest" },
  { id: "1NQErqyBsMDITTro9hrYJHYz3etetcavl", alt: "Speaker with audience Q&A" },
  { id: "1NjQErPeqihm-pPe2GfYmQw848QIQ1Ufz", alt: "TechFest participants group photo" },
  { id: "1NwxSSJE5T_4ajzFn6ki2QBqNi6vfXS75", alt: "Workshop hands-on session" },
  { id: "1R_s9Fvuo9xrdHtSjLxYpUJit97H2W0YQ", alt: "Innovation showcase display" },
  { id: "1TBRHS5diw8DpOxVAyf-sQ_XDIXeA9fep", alt: "TechFest breakout discussion" },
  { id: "1TWm7GJu32tVZvm6_QtOiuGuFP1O2mRhd", alt: "TechFest main stage panoramic" },
  { id: "1ZMrYAMeAjZdj81gULy_9ShrLuQyO2EVo", alt: "Crowd at TechFest auditorium" },
  { id: "1_TFSGzbZhu0tzl2VrRNYAwh9-0vQ5wHD", alt: "Panel of speakers on stage" },
  { id: "1_ipF60C7TlyYc9Ju_ybzn4Cxr8IRaTpy", alt: "Builder networking at TechFest mixer" },
  { id: "1brF5p4mp9eNrdvjsFrRQzcUd2ln-PzOA", alt: "Workshop participants collaborating" },
  { id: "1cgKcAiWQAwjJNCqFxQckkIu3OHpdfZRp", alt: "TechFest registration desk" },
  { id: "1dKZeXxdvGk1c2_CBD-3CZ1duNywfQZGh", alt: "Audience listening to a keynote" },
  { id: "1dsWY3MVhhuXTtRV8F9t3Rkm_M6ikTu8V", alt: "TechFest community group photo" },
  { id: "1hXiDVkjc-r7eFGBlevlXx0SgHxDnYVja", alt: "Speaker Q&A session" },
  { id: "1hn-bsN5dJjic3qBEvAPHZ9m9Yk1P6gyZ", alt: "Builders at open demo tables" },
  { id: "1if6gfmrQEsYpiA90QDa5pFqMH64lVt83", alt: "TechFest closing ceremony" },
  { id: "1iwrjeNdTR0ddzKEdQ365NzftD99JDW2Z", alt: "Evening networking at TechFest" },
  { id: "1jH_UQ-iKfmEo22_oHuqyjnheC6IUY8Re", alt: "Community leaders and founders" },
  { id: "1kDOfTT4GL-mUDI9d7tlJ7rAEs3OBUGN4", alt: "Tech workshop with laptops" },
  { id: "1kXHMOd5jXb5V8aKWpcRFsilzDfuHaZG_", alt: "Panel moderator and guests" },
  { id: "1kp4DfgTLYBZMCEulxVGHpdVW0U3iOn42", alt: "Audience applause at TechFest" },
  { id: "1lsoQeHOkJngXZ6l0ycj1vsRToQK4sPCH", alt: "Pre-event setup at Sarau Center" },
  { id: "1mF0xKO155vc-PAbpVGZwcKpiKgoIagNs", alt: "TechFest banner and branding" },
  { id: "1mndH6ojfkHJZolTvdzdI_20Oi33ZtRp6", alt: "Startup pitch session" },
  { id: "1nGuxzwPk8OfUW9XQ9ztjssTsuhJOMnmc", alt: "Builders celebrating at TechFest" },
  { id: "1npVKerOBEisOwcSZoIDVc9UN47BbOTWn", alt: "VIP roundtable session" },
  { id: "1o1_PDIXAp9XQxhfx4GKXC615xCGsXxft", alt: "Keynote speaker close-up" },
  { id: "1p8GAGnim-UId9EOnUGVHzJ4FGeASuEV1", alt: "Workshop facilitator on stage" },
  { id: "1siONYfOystUjaAGV4FBx9ph0tssMSzLb", alt: "TechFest live demo showcase" },
  { id: "1tPuiLRAazHWrWNEYbHaVi9DNwUgCqqS_", alt: "Networking cocktail evening" },
  { id: "1vyRQ_3lsa0flPOsJwbYjcMdIVamfceHw", alt: "Tech community members interacting" },
  { id: "1wB6UrC1DQo_usGm-minlNSLZh5a4t7YB", alt: "Presenter at TechFest podium" },
  { id: "1wWxMB5daT-fBMz8WzpzLJSiJW0T6SG2y", alt: "Workshop group activity" },
  { id: "1xP8yVBdKZnr56NGNfRBLhrp7NOZ_heI5", alt: "TechFest outdoor area" },
  { id: "1zD3iy55V9cvZtAF9X6LCicNHxudT4VrJ", alt: "Closing remarks at TechFest" },
];

/* ── Lightbox ─────────────────────────────────────────────── */
function Lightbox({
  photo,
  index,
  total,
  onClose,
  onPrev,
  onNext,
}: {
  photo: (typeof ALL_PHOTOS)[0];
  index: number;
  total: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label={`Photo ${index + 1} of ${total}: ${photo.alt}`}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-sm" />

      {/* Close */}
      <button
        onClick={onClose}
        aria-label="Close lightbox"
        className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-slate-900/80 text-slate-300 hover:text-white hover:border-slate-600 transition-all"
      >
        <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4" aria-hidden="true">
          <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" d="M3 3l10 10M13 3L3 13" />
        </svg>
      </button>

      {/* Counter */}
      <div className="absolute top-4 left-4 z-10 rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1 text-xs font-mono text-slate-400">
        {index + 1} / {total}
      </div>

      {/* Image */}
      <motion.div
        key={photo.id}
        initial={{ scale: 0.93, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.93, opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="relative z-10 max-h-[85vh] max-w-[90vw] overflow-hidden rounded-2xl shadow-2xl shadow-black/60"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={toUrl(photo.id)}
          alt={photo.alt}
          referrerPolicy="no-referrer"
          className="block max-h-[85vh] max-w-[90vw] object-contain"
        />
        {/* Caption */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent px-5 py-4">
          <p className="text-sm text-slate-300">{photo.alt}</p>
        </div>
      </motion.div>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="Previous photo"
        className="absolute left-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-slate-700 bg-slate-900/80 text-slate-300 hover:text-white hover:border-slate-600 transition-all disabled:opacity-30"
        disabled={index === 0}
      >
        <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4" aria-hidden="true">
          <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M10 3L5 8l5 5" />
        </svg>
      </button>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="Next photo"
        className="absolute right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-slate-700 bg-slate-900/80 text-slate-300 hover:text-white hover:border-slate-600 transition-all disabled:opacity-30"
        disabled={index === total - 1}
      >
        <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4" aria-hidden="true">
          <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M6 3l5 5-5 5" />
        </svg>
      </button>
    </motion.div>
  );
}

/* ── Page ─────────────────────────────────────────────────── */
export default function GalleriesPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const openLightbox = useCallback((i: number) => setActiveIndex(i), []);
  const closeLightbox = useCallback(() => setActiveIndex(null), []);
  const prev = useCallback(() =>
    setActiveIndex((i) => (i !== null && i > 0 ? i - 1 : i)), []);
  const next = useCallback(() =>
    setActiveIndex((i) => (i !== null && i < ALL_PHOTOS.length - 1 ? i + 1 : i)), []);

  return (
    <>
      <main className="min-h-screen bg-slate-950 pb-24">
        {/* Hero banner */}
        <div className="relative overflow-hidden pt-32 pb-16 px-4 sm:px-6">
          {/* Ambient glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.08) 0%, transparent 55%)",
            }}
          />
          <div className="relative mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-emerald-400 mb-4">
                Photo Archive
              </span>
              <h1 className="text-5xl sm:text-6xl font-black text-white tracking-tight">
                TechFest Gallery
              </h1>
              <p className="mt-5 text-slate-400 max-w-xl mx-auto text-lg">
                {ALL_PHOTOS.length} high-definition moments from previous editions. Click any photo to enlarge.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Masonry-style photo grid */}
        <section
          className="mx-auto max-w-7xl px-4 sm:px-6"
          aria-label="TechFest photo gallery"
        >
          <div className="columns-2 sm:columns-3 lg:columns-4 xl:columns-5 gap-3 space-y-3">
            {ALL_PHOTOS.map((photo, index) => (
              <motion.button
                key={photo.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (index % 10) * 0.04 }}
                onClick={() => openLightbox(index)}
                aria-label={`View photo: ${photo.alt}`}
                className="group relative block w-full break-inside-avoid overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <img
                  src={toUrl(photo.id)}
                  alt={photo.alt}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="block w-full h-auto object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/30 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm">
                    <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4 text-white" aria-hidden="true">
                      <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" d="M2 2h5M2 2v5M14 2h-5M14 2v5M2 14h5M2 14v-5M14 14h-5M14 14v-5" />
                    </svg>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Bottom stats bar */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-6 border-t border-slate-800 pt-8"
          >
            {[
              { label: "Photos", value: ALL_PHOTOS.length },
              { label: "Editions", value: "2" },
              { label: "Attendees captured", value: "500+" },
            ].map(({ label, value }) => (
              <div key={label} className="text-center">
                <p className="text-2xl font-black text-white">{value}</p>
                <p className="text-xs text-slate-500 uppercase tracking-widest mt-0.5">{label}</p>
              </div>
            ))}
          </motion.div>
        </section>
      </main>

      {/* Lightbox */}
      <AnimatePresence>
        {activeIndex !== null && (
          <Lightbox
            photo={ALL_PHOTOS[activeIndex]}
            index={activeIndex}
            total={ALL_PHOTOS.length}
            onClose={closeLightbox}
            onPrev={prev}
            onNext={next}
          />
        )}
      </AnimatePresence>
    </>
  );
}
