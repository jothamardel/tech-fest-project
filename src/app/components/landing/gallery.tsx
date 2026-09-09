"use client";

import { motion } from "framer-motion";
import Link from "next/link";

/* ── Google Drive HD Photos ───────────────────────────────────
   Direct view links from the shared folder:
   https://drive.google.com/drive/folders/1j-g3uDDnPqlzrL7nCRRWBZ3SvQTFuA3s
   Format: https://lh3.googleusercontent.com/d/{FILE_ID}
   ─────────────────────────────────────────────────────────── */
const toGDriveUrl = (id: string) =>
  `https://lh3.googleusercontent.com/d/${id}`;

const galleryPhotos = [
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
];

/* ── Hero bento card photo (highest energy shot) ─────────── */
export const BENTO_HERO_PHOTO_ID = "1TWm7GJu32tVZvm6_QtOiuGuFP1O2mRhd";
export const BENTO_HERO_PHOTO_URL = toGDriveUrl(BENTO_HERO_PHOTO_ID);

export default function Gallery() {
  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="relative bg-slate-950 py-24 px-4 sm:px-6 overflow-hidden"
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, rgba(16,185,129,0.05) 0%, transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
        >
          <div>
            <span className="inline-block rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-emerald-400 mb-4">
              Photo Archive
            </span>
            <h2
              id="gallery-heading"
              className="text-4xl sm:text-5xl font-black text-white tracking-tight"
            >
              From the Archives
            </h2>
            <p className="mt-3 text-slate-400 max-w-md">
              Snapshots of the energy, ideas, and people that made TechFest one for the books.
            </p>
          </div>

          <Link
            href="/galleries"
            aria-label="Browse full TechFest photo gallery"
            className="inline-flex items-center gap-2 self-start sm:self-auto rounded-full border border-slate-700 bg-slate-900/60 px-5 py-2.5 text-sm font-medium text-slate-300 hover:border-slate-600 hover:text-white transition-all duration-200 flex-shrink-0"
          >
            Browse all photos →
          </Link>
        </motion.div>

        {/* Photo grid */}
        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
          role="list"
          aria-label="TechFest photo gallery"
        >
          {galleryPhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              role="listitem"
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.04 }}
              className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 cursor-pointer"
            >
              {/* Photo */}
              <img
                src={toGDriveUrl(photo.id)}
                alt={photo.alt}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                referrerPolicy="no-referrer"
              />

              {/* Hover overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(to top, rgba(2,6,23,0.7) 0%, transparent 60%)",
                }}
              />

              {/* Ring highlight on hover */}
              <div className="absolute inset-0 ring-0 rounded-2xl group-hover:ring-1 group-hover:ring-emerald-500/30 transition-all duration-300" />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex justify-center"
        >
          <Link
            href="/galleries"
            aria-label="See more photos from TechFest"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 px-7 py-3 text-sm font-semibold text-slate-200 hover:text-white transition-all duration-200"
          >
            See More Photos
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
