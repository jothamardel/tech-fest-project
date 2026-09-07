"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

interface Speaker {
  name: string;
  role: string;
  image: string;
}

const keynoteSpeakers: Speaker[] = [
  { name: "Mr. David Daser",            role: "Speaker", image: "/images/Daser.jpg" },
  { name: "Oluwafunmilayo Para Mallam", role: "Speaker", image: "/images/Funmi.jpg" },
  { name: "Prof. Goselle Obed Nanjul",  role: "Speaker", image: "/images/Gosale.jpg" },
  { name: "Engr. Christie Dasaro",      role: "Speaker", image: "/images/Chriatie.jpg" },
  { name: "Ardel Mbiplang",            role: "Speaker", image: "/images/mbi.jpg" },
  { name: "Uduma Glory",               role: "Speaker", image: "/images/speaker.jpg" },
];

export default function KeynoteSpeakers() {
  return (
    <section
      id="speakers"
      aria-labelledby="speakers-heading"
      className="relative bg-slate-950 py-24 px-4 sm:px-6 overflow-hidden"
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 70% 40%, rgba(59,130,246,0.06) 0%, transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <span className="inline-block rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-blue-400 mb-4">
            Keynote Speakers
          </span>
          <h2
            id="speakers-heading"
            className="text-4xl sm:text-5xl font-black text-white tracking-tight"
          >
            Visionary Voices
          </h2>
          <p className="mt-4 text-slate-400 max-w-xl mx-auto">
            Visionary leaders sharing ideas that will shape the future of technology and industry in Africa.
          </p>
        </motion.div>

        {/* Speaker grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          role="list"
          aria-label="Keynote speakers"
        >
          {keynoteSpeakers.map((speaker, index) => (
            <motion.article
              key={speaker.name}
              role="listitem"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 hover:border-slate-700 transition-all duration-300 hover:shadow-xl hover:shadow-black/40"
            >
              {/* Image */}
              <div className="relative h-80 overflow-hidden">
                <Image
                  src={speaker.image}
                  alt={`${speaker.name} — ${speaker.role}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Gradient overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(15,23,42,1) 0%, rgba(15,23,42,0.2) 60%, transparent 100%)",
                  }}
                />
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="text-base font-bold text-white">{speaker.name}</h3>
                <p className="mt-1 text-sm text-slate-500">{speaker.role}</p>
                <div className="mt-3 h-px bg-slate-800" />
                <div className="mt-3 flex gap-2">
                  <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-2.5 py-0.5 text-xs text-blue-300">
                    TechFest 2026
                  </span>
                  <span className="rounded-full border border-slate-700 bg-slate-800/60 px-2.5 py-0.5 text-xs text-slate-400">
                    Jos, Nigeria
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 flex justify-center"
        >
          <Link
            href="/speakers"
            aria-label="View all TechFest 2026 speakers"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-blue-600 hover:bg-blue-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-900/40 transition-all duration-200"
          >
            View All Speakers
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
