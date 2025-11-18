// // components/Speakers.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface Speaker {
  name: string;
  role: string;
  image: string;
}

// Generate 15 speakers
const speakers: Speaker[] = Array.from({ length: 15 }, (_, i) => ({
  name: `Speaker ${i + 1}`,
  role: "Innovation Leader",
  image: "/images/pic4.jpg", // replace with real images later
}));

export default function Speakers() {
  return (
    <section className="py-20 bg-[#f9faf9] font-poppins">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-green-900"
        >
          Meet Our Speakers
        </motion.h2>

        <motion.h5
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="text-amber-400 mb-12 font-semibold"
        >
          Visionaries, innovators, and leaders shaping the future of technology.
        </motion.h5>

        {/* Speaker Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center w-full">
          {speakers.map((speaker, index) => (
            <motion.div
              key={speaker.name}
              initial={{ y: 60, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="w-full max-w-[18rem]"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 1.5, ease: "easeInOut" }} // 👈 smooth hover
                className="relative w-full h-96 rounded-md overflow-hidden shadow-2xl"
              >
                {/* Overlay with name + role */}
                <div className="absolute top-0 left-0 w-full p-4 z-10 text-left">
                  <h3 className="text-lg font-semibold text-white">
                    {speaker.name}
                  </h3>
                  <p className="text-sm text-gray-300">{speaker.role}</p>
                </div>

                {/* Speaker Image */}
                <Image
                  src={speaker.image}
                  alt={speaker.name}
                  width={400}
                  height={500}
                  className="object-cover w-full h-full transition-transform duration-[1500ms] ease-in-out"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
