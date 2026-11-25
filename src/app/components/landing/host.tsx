"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Mic } from "lucide-react";
import {
  TECHFEST_ANCHORS,
  getPersonInitials,
  type EventAnchor,
} from "@/data/sessions";

function HostCard({
  host,
  rotate,
  delay,
}: {
  host: EventAnchor;
  rotate: string;
  delay: number;
}) {
  const initials = getPersonInitials(host.name);

  return (
    <motion.div
      className={`md:${rotate}`}
      whileHover={{ scale: 1.04, rotate: 0 }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay, ease: [0.32, 0.72, 0, 1] }}
    >
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-1.5 shadow-2xl shadow-black/60">
        <article
          className="relative w-64 h-88 sm:w-72 sm:h-96 overflow-hidden rounded-[calc(2rem-0.375rem)] bg-slate-900 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)]"
          aria-label={`${host.name}, ${host.role}`}
        >
          {/* Gradient overlay */}
          <div
            aria-hidden="true"
            className="absolute inset-0 z-10"
            style={{
              background:
                "linear-gradient(to bottom, rgba(2,6,23,0.75) 0%, transparent 35%, rgba(2,6,23,0.9) 100%)",
            }}
          />

          {/* Name + role */}
          <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-white">{host.name}</p>
              <p className="text-xs text-indigo-400 font-medium mt-0.5">
                {host.role}
              </p>
            </div>
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-indigo-500/30 bg-indigo-500/15 text-indigo-300">
              <Mic className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
          </div>

          {host.image ? (
            <Image
              src={host.image}
              alt={`${host.name} — TechFest Anchor`}
              fill
              sizes="(max-width: 640px) 64vw, 288px"
              className="object-cover object-top"
            />
          ) : (
            <div
              className="flex h-full w-full flex-col items-center justify-center p-6 text-center"
              style={{
                background:
                  "radial-gradient(circle at 50% 45%, rgba(99,102,241,0.3) 0%, rgba(15,23,42,0.98) 72%)",
              }}
            >
              <div
                className="flex h-24 w-24 items-center justify-center rounded-full border border-indigo-500/40 bg-indigo-500/15 text-3xl font-black tracking-wider text-white shadow-inner"
                aria-hidden="true"
              >
                {initials}
              </div>
              <span className="mt-4 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-300">
                TechFest 2026 Anchor
              </span>
            </div>
          )}
        </article>
      </div>
    </motion.div>
  );
}

const ROTATIONS = ["-rotate-2", "rotate-1", "rotate-2"];

export default function Host() {
  return (
    <section
      id="anchors"
      aria-labelledby="anchors-heading"
      className="relative bg-slate-950 py-24 px-4 sm:px-6 overflow-hidden"
    >
      {/* Background noise texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(148,163,184,1) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, rgba(99,102,241,0.07) 0%, transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="inline-block rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-indigo-400 mb-4">
            Meet the Anchors
          </span>
          <h2
            id="anchors-heading"
            className="text-4xl sm:text-5xl font-black text-white tracking-tight"
          >
            Our Anchors
          </h2>
          <p className="mt-4 text-slate-400 max-w-lg mx-auto">
            Guiding the flow of Jos TechFest 2026 across all sessions with energy, insight, and passion.
          </p>
        </motion.div>

        {/* Single row — Samuel Adebayo, Tamimia Esther Nuhu, and Anna Agbolade */}
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-center">
          {TECHFEST_ANCHORS.map((host, idx) => (
            <HostCard
              key={host.id}
              host={host}
              rotate={ROTATIONS[idx % ROTATIONS.length]}
              delay={idx * 0.15}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
