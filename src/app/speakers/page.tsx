
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
  "/images/peter.jpg",

  "/images/longs.jpg",
  "/images/ret.jpg",
  "/images/lint.jpg",
  "/images/mo.jpg",
  "/images/dav.jpg",
  "/images/sati.jpg",
  "/images/sam.jpg",
  "/images/kunle.jpg",
"/images/new.png",

   

];

// Explicit list of 15 speakers with names, roles and images
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
  { name: "Peter Adaaku", role: "Speaker", image: speakerImages[12] },
  { name: "Longs Pemun Gotar", role: "Speaker", image: speakerImages[13] },
  { name: "Ribetnan Dami", role: "Speaker", image: speakerImages[14] },
  { name: "Wapnen Gwok", role: "Speaker", image: speakerImages[15] },
  { name: "Moses Amama", role: "Speaker", image: speakerImages[16] },
  { name: "David Eyi", role: "Speaker", image: speakerImages[17] },
  { name: "Jatau Shedrack Sati", role: "Speaker", image: speakerImages[18] },
  { name: "Sam Semako", role: "Speaker", image: speakerImages[19] },
  { name: "Kunle Princewill", role: "Speaker", image: speakerImages[20] },
  // { name: " Emmanuel Olarewaju David", role: "Speakder", image: speakerImages[21] },

  { name: "Emmanuel Olarewaju David", role: "Speaker", image: speakerImages[21] },
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