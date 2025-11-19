// components/Host.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface Host {
  name: string;
  role: string;
  image: string;
}

const hosts: Host[] = [
  {
    name: "Sam Adebayo",
    role: "",
    image: "/images/ancor7.jpg",
  },
  {
    name: "Winifred Wade",
    role: "",
    image: "/images/ancor1.jpg",
  },
  {
    name: "Judith Nyior",
    role: "",
    image: "/images/ancor6.jpg",
  },
  {
    name: "Ajifa Solomon",
    role: "",
    image: "/images/ancor2.jpg",
  },
  {
    name: "Rinret  Keswet",
    role: "",
    image: "/images/ancor5.jpg",
  },
  {
    name: "Tamimia Esther Nuhu",
    role: "",
    image: "/images/ancor3.jpg",
  },
   
  
];

// Card Component
function Card({ host }: { host: Host }) {
  return (
    <div className="relative w-72 h-[400px] bg-white rounded-md overflow-hidden shadow-xl">
      <div className="absolute top-0 left-0 w-full bg-opacity-90 p-4 z-10 text-left">
        <h3 className="text-sm font-bold text-amber-400">{host.name}</h3>
        <p className="text-xs text-amber-400">{host.role}</p>
      </div>

      <Image
        src={host.image}
        alt={host.name}
        width={400}
        height={500}
        className="object-cover w-full h-full"
      />
    </div>
  );
}

export default function Host() {
  return (
    <section className="py-20 bg-black ">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9 }}
          className="text-4xl font-bold text-green-900 mb-4"
        >
          Our Anchors
        </motion.h2>

        <motion.h5
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 10, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-amber-400 mb-20 font-semibold"
        >
          Guiding the flow of TechFest with energy, insight, and passion
        </motion.h5>

        {/* Top Row - 3 Cards */}
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-center md:mb-8">
          <motion.div
            className="md:-rotate-16"
            whileHover={{ scale: 1.05, rotate: -10 }}
            initial={{ opacity: 0, x: -200 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
          >
            <Card host={hosts[0]} />
          </motion.div>

          <motion.div
            className="md:rotate-16"
            whileHover={{ scale: 1.05, rotate: 10 }}
            initial={{ opacity: 0, x: 200 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.8, ease: "easeOut", delay: 0.3 }}
          >
            <Card host={hosts[1]} />
          </motion.div>

          <motion.div
            className="md:-rotate-12"
            whileHover={{ scale: 1.05, rotate: -10 }}
            initial={{ opacity: 0, x: -200 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.8, ease: "easeOut", delay: 0.6 }}
          >
            <Card host={hosts[2]} />
          </motion.div>
        </div>

        {/* Bottom Row - 3 Cards */}
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-center">
          <motion.div
            className="md:rotate-12"
            whileHover={{ scale: 1.05, rotate: 10 }}
            initial={{ opacity: 0, x: -200 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.8, ease: "easeOut", delay: 0.9 }}
          >
            <Card host={hosts[3]} />
          </motion.div>

          <motion.div
            className="md:-rotate-12"
            whileHover={{ scale: 1.05, rotate: -10 }}
            initial={{ opacity: 0, x: 200 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.8, ease: "easeOut", delay: 1.2 }}
          >
            <Card host={hosts[4]} />
          </motion.div>

          <motion.div
            className="md:rotate-12"
            whileHover={{ scale: 1.05, rotate: 10 }}
            initial={{ opacity: 0, x: -200 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.8, ease: "easeOut", delay: 1.5 }}
          >
            <Card host={hosts[5]} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
