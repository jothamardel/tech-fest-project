


"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Typewriter } from "react-simple-typewriter";

const heroImages = [
  "https://77iiucovgsphsggt.public.blob.vercel-storage.com/pic%2040%29.jpg",
  "https://77iiucovgsphsggt.public.blob.vercel-storage.com/pic16.jpg",
  "https://77iiucovgsphsggt.public.blob.vercel-storage.com/picc1.jpg",
  "https://77iiucovgsphsggt.public.blob.vercel-storage.com/tf%20%2811%20of%2040%29.jpg",
  "https://77iiucovgsphsggt.public.blob.vercel-storage.com/tf%20%2815%20of%2040%29.jpg",
  "https://77iiucovgsphsggt.public.blob.vercel-storage.com/tf%20%2821%20of%2040%29.jpg",
  "https://77iiucovgsphsggt.public.blob.vercel-storage.com/tf%20%2835%20of%2040%29.jpg",
];

export default function Hero() {
  const [bgIndex, setBgIndex] = useState(0);

  // Rotate background images every 5 seconds
  useEffect(() => {
    const bgInterval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(bgInterval);
  }, []);

  return (
    <section className="relative flex items-center justify-center w-full min-h-screen text-center overflow-hidden">
      {/* Background image with responsive scaling */}
      <div
        className="absolute inset-0 -z-10 w-full h-full bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage: `url(${heroImages[bgIndex]})`,
        }}
      />

      {/* Add a dark overlay for better text contrast */}
      <div className="absolute inset-0 -z-0 bg-black/50"></div>

      {/* Hero content */}
      <div className="z-10 mx-auto max-w-6xl flex flex-col items-center justify-center px-6 sm:px-10 md:px-16 lg:px-20">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white"
        >
          <Typewriter
            words={["Jos TechFest", "AI Summit 2025"]}
            loop={true}
            cursor
            cursorStyle="|"
            typeSpeed={120}
            deleteSpeed={80}
            delaySpeed={2000}
          />
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-amber-500 font-semibold max-w-3xl"
        >
          Slide into a world of creativity — discover speakers, community
          projects, and hands-on sessions designed to inspire the next
          generation of African builders.
        </motion.p>

        {/* Buttons */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            href="https://smartinvites.xyz/forms/68e930bf881d91001bd67f19/6903335d256533001abab3b9/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-tl from-[#0A3511] to-green-900 px-8 sm:px-10 py-2 sm:py-3 cursor-pointer shadow-md"
          >
            <p className="text-sm sm:text-base font-semibold text-white">
              Slide to enter
            </p>
            <span className="inline-block ml-2 rounded-full bg-white/20 px-2 sm:px-3 py-1 text-xs font-medium">
              →
            </span>
            <motion.span
              className="absolute -left-32 h-full w-32 bg-white/10 backdrop-blur"
              animate={{ x: [0, 520] }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            />
          </motion.a>

          <Link
            href="/about"
            className="hidden sm:flex items-center rounded-full border border-gray-200 bg-white/90 px-6 py-2 sm:py-3 text-sm sm:text-base text-gray-800 hover:bg-white hover:shadow-md"
          >
            Learn more
          </Link>
        </div>
      </div>
    </section>
  );
}
