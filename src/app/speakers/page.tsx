
"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface Speaker {
  name: string;
  role: string;
  image: string;
}

const speakerImages = [
  "/images/Daser.jpg",
  "/images/Funmi.jpg",
  "/images/Gosale.jpg",
  "/images/Chriatie.jpg",
  "/images/mbi.jpg",
  "/images/speaker.jpg",
  "/images/jtf-56.jpg",
  "/images/nnamdi.jpg",
  "/images/jtf-36.jpg",
  "/images/jtf-26.jpg",
  "/images/jtf-27.jpg",
  "/images/jtf-28.jpg",
  "/images/jtf-30.jpg",
  "/images/jtf-31.jpg",
 
  "/images/jtf-40.jpg",
  "/images/jtf-43.jpg",
  "/images/pic1.jpg",
  "/images/pic2.jpg",
  "/images/pic3.jpg",
  "/images/pic4.jpg",
  "/images/pic5.jpg",
  "/images/pic6.jpg",
  "/images/pic7.jpg",
  "/images/pic8.jpg",
  "/images/pic10.jpg",
  "/images/pic12.jpg",
  "/images/pic13.jpg",
  "/images/pic10.webp",
  "/images/pic11.webp",
  "/images/pic9.webp",
  "/images/Chriatie.jpg",
  "/images/Daser.jpg",
  "/images/Funmi.jpg",
  "/images/Gosale.jpg",
  "/images/Rimg.jpg",
  "/images/shola.jpg",
  "/images/mbi.jpg",
];

// Explicit list of 15 speakers with names, roles and images
const speakers: Speaker[] = [
  { name: "Mr. David Daser", role: "Speaker", image: speakerImages[0] },
  { name: "Oluwafunmilayo Para Mallam", role: "Speaker", image: speakerImages[1] },
  { name: "Prof. Goselle Obed Nanjul", role: "Speaker", image: speakerImages[2] },
  { name: "Engr. Christie Dasaro", role: "Speaker", image: speakerImages[3] },
  { name: "Ardel Mbiplang", role: "Speaker", image: speakerImages[4] },
  { name: "Uduma Glory", role: "Speaker", image: speakerImages[5] },
  { name: "Timithy Dake", role: "Speaker", image: speakerImages[6] },
  { name: "Nnamdi Ibe", role: "Speaker", image: speakerImages[7] },
  { name: "Dr. Adamu Usman", role: "Speaker", image: speakerImages[8] },
  { name: "Grace Eze", role: "UX Researcher", image: speakerImages[9] },
  { name: "Emeka Obi", role: "NLP Engineer", image: speakerImages[10] },
  { name: "Rukayat Bello", role: "Community Manager", image: speakerImages[11] },
  { name: "Daniel Akpan", role: "Security Specialist", image: speakerImages[12] },
  { name: "Zainab Abdullahi", role: "AI Ethics Researcher", image: speakerImages[13] },
  { name: "Michael Ade", role: "Growth Lead", image: speakerImages[14] },
];

export default function Speakers() {
  return (
    <section className="py-20 bg-[#f9faf9] font-poppins">
      <div className="max-w-7xl mx-auto px-6 text-center">
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
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="relative w-full h-96 rounded-md overflow-hidden shadow-2xl bg-black"
              >
                <div className="absolute top-0 left-0 w-full p-4 z-10 text-left">
                  <h3 className="text-sm font-semibold text-amber-400">{speaker.name}</h3>
                  <p className="text-xs text-amber-400">{speaker.role}</p>
                </div>

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