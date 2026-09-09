"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface Speaker {
  name: string;
  role: string;
  image: string;
}

const speakerImages = [
  "/images/nent.jpg",
  "/images/daser.jpg",
  "/images/Gosale.jpg",
  "/images/Chriatie.jpg",
  "/images/mbi.jpg",
  "/images/speaker.jpg",
  "/images/jtf-56.jpg",
  "/images/mbi.jpg",
  "/images/jtf-36.jpg",
  "/images/nnamdi.jpg",
  "/images/shols.jpg",
  "/images/chris.jpg",
];

// Explicit list of 12 speakers with names, roles and images
const speakers: Speaker[] = [
  // { name: "Mr. Nentawe Yilwatda", role: "Speaker", image: speakerImages[0] },
  { name: "Mr. David Daser", role: "Speaker", image: speakerImages[1] },
  { name: "Prof. Goselle Obed Nanjul", role: "Speaker", image: speakerImages[2] },
  { name: "Engr. Christie Dasaro", role: "Speaker", image: speakerImages[3] },
  { name: "Ardel Mbiplang", role: "Speaker", image: speakerImages[4] },
  { name: "Glory Ezinne Dickson-Oleka", role: "Speaker", image: speakerImages[5] },
  { name: "Timithy Dake", role: "Speaker", image: speakerImages[6] },
  // { name: "Ardel Mbiplnag", role: "Speaker", image: speakerImages[7] },
  { name: "Dr. Adamu Usman", role: "Speaker", image: speakerImages[8] },
  { name: "Nnamdi Ibe", role: "Speaker", image: speakerImages[9] },
  { name: "Shola Akambi", role: "Speaker", image: speakerImages[10] },
  { name: "Chris Dawen", role: "Speaker", image: speakerImages[11] },
];


export default function Speakers() {
  return (
    <main className="min-h-screen bg-slate-950 pb-24">
      {/* Hero banner */}
      <div className="relative overflow-hidden pt-32 pb-16 px-4 sm:px-6">
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
              Meet Our Speakers
            </span>
            <h1 className="text-5xl sm:text-6xl font-black text-white tracking-tight">
              Visionary Voices
            </h1>
            <p className="mt-5 text-slate-400 max-w-xl mx-auto text-lg">
              Visionaries, innovators, and leaders shaping the future of technology.
            </p>
          </motion.div>
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center w-full">
          {speakers.map((speaker, index) => (
             <motion.article
              key={speaker.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (index % 10) * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 w-full hover:border-slate-700 transition-all duration-300 hover:shadow-xl hover:shadow-black/40"
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
                  <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs text-emerald-300">
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
      </section>
    </main>
  );
}