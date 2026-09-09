"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface Host {
  name: string;
  role: string;
  image: string;
}

const hosts: Host[] = [
  { name: "Sam Adebayo",      role: "Anchor", image: "/images/ancor7.jpg" },
  { name: "Winifred Wade",    role: "Anchor", image: "/images/ancor1.jpg" },
  { name: "Judith Nyior",     role: "Anchor", image: "/images/ancor6.jpg" },
  { name: "Ajifa Solomon",    role: "Anchor", image: "/images/ancor2.jpg" },
  { name: "Rinret Keswet",    role: "Anchor", image: "/images/ancor5.jpg" },
  { name: "Tamimia Esther Nuhu", role: "Anchor", image: "/images/ancor3.jpg" },
];

function HostCard({ host, rotate, delay }: { host: Host; rotate: string; delay: number }) {
  return (
    <motion.div
      className={`md:${rotate}`}
      whileHover={{ scale: 1.06, rotate: 0 }}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
    >
      <article
        className="relative w-56 h-80 sm:w-64 sm:h-96 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl shadow-black/60 transition-shadow duration-300 hover:shadow-emerald-900/20"
        aria-label={`${host.name}, ${host.role}`}
      >
        {/* Gradient overlay — top */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(to bottom, rgba(2,6,23,0.7) 0%, transparent 30%, rgba(2,6,23,0.85) 100%)",
          }}
        />

        {/* Name + role */}
        <div className="absolute top-4 left-4 z-20">
          <p className="text-xs font-semibold text-emerald-400">{host.name}</p>
          <p className="text-xs text-slate-500 mt-0.5">{host.role}</p>
        </div>

        <Image
          src={host.image}
          alt={`${host.name} — TechFest Anchor`}
          fill
          sizes="(max-width: 640px) 56vw, 256px"
          className="object-cover"
        />
      </article>
    </motion.div>
  );
}

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
          <span className="inline-block rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-emerald-400 mb-4">
            Meet the Anchors
          </span>
          <h2
            id="anchors-heading"
            className="text-4xl sm:text-5xl font-black text-white tracking-tight"
          >
            Our Anchors
          </h2>
          <p className="mt-4 text-slate-400 max-w-lg mx-auto">
            Guiding the flow of TechFest with energy, insight, and passion.
          </p>
        </motion.div>

        {/* Top row — 3 cards */}
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-center md:mb-8">
          <HostCard host={hosts[0]} rotate="-rotate-3"  delay={0} />
          <HostCard host={hosts[1]} rotate="rotate-3"   delay={0.15} />
          <HostCard host={hosts[2]} rotate="-rotate-2"  delay={0.3} />
        </div>

        {/* Bottom row — 3 cards */}
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-center mt-0 md:mt-2">
          <HostCard host={hosts[3]} rotate="rotate-3"   delay={0.45} />
          <HostCard host={hosts[4]} rotate="-rotate-3"  delay={0.6} />
          <HostCard host={hosts[5]} rotate="rotate-2"   delay={0.75} />
        </div>
      </div>
    </section>
  );
}
