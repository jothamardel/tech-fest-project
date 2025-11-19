"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface Speaker {
  name: string;
  role: string;
  image: string;
}

const eventGallery: Speaker[] = [
  { name: "", role: "", image: "/images/pic9.webp" },
  { name: "", role: "", image: "/images/jtf-4.jpg" },
  { name: "", role: "", image: "/images/jtf-8.jpg" },
  { name: "", role: "", image: "/images/jtf-26.jpg" },
  { name: "", role: "", image: "/images/jtf-28.jpg" },
  { name: "", role: "", image: "/images/jtf-56.jpg" },
  { name: "", role: "", image: "/images/jtf-21.jpg" },
  { name: "", role: "", image: "/images/jtf-31.jpg" },
  { name: "", role: "", image: "/images/jtf-40.jpg" },
  { name: "", role: "", image: "/images/jtf-3.jpg" },
  { name: "", role: "", image: "/images/jtf-4.jpg" },
  { name: "", role: "", image: "/images/jtf-7.jpg" },
  { name: "", role: "", image: "/images/jtf-27.jpg" },
  { name: "", role: "", image: "/images/jtf-43.jpg" },
  { name: "", role: "", image: "/images/jtf-30.jpg" },

  { name: "", role: "", image: "/images/pic8.jpg" },


];

export default function Galleries() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 text-center">

        <motion.h2
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9 }}
          className="text-4xl font-bold text-green-900 mb-4"
        >
          Past Events
        </motion.h2>

        <motion.h5
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="text-amber-400 mb-12 font-semibold"
        >
          A collection of our past events
        </motion.h5>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 justify-items-center w-full">
          {eventGallery.map((speaker, index) => (
            <motion.div
              key={index}
              initial={{ y: 60, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="w-full max-w-[18rem]"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="relative w-full h-96 rounded-md overflow-hidden shadow-2xl"
              >
                <Image
                  src={speaker.image}
                  alt="Event"
                  width={400}
                  height={500}
                  className="object-cover w-full h-full"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
