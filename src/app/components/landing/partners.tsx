



"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const partners = [
  "/images/partners.png",
  "/images/partners2.png",
  "/images/partners3.png",
  "/images/koenig.jpeg",
  "/images/partners5.png",
  "/images/openai.png",
  "/images/partners11..png",
  "/images/Rimg.jpg",
  "/images/axiahub.png",
  "/images/clockchain.png",
   "/images/partnerslogoi.png",
    "/images/ahub.png",
    "/images/boldimg.png",
    "/images/logo-dark.png",
     "/images/partners11.png",
      "/images/axiahub.png",
     "/images/partners8.png",
];

export default function Partners() {
  return (
    <section className="w-full bg-[#fafaf9] py-10 px-6 md:px-12 font-poppins -mt-10">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-green-900 text-center"
        >
          Our Partners
        </motion.h2>

        <p className="mt-3 text-center text-amber-400 font-semibold">
          We’re proud to be supported by forward-thinking organizations and innovators.
        </p>

        {/* Scrolling Partner Logos */}
        <div className="mt-12 overflow-hidden relative">
          <motion.div
            className="flex gap-2 items-center"
            animate={{ x: ["0%", "-100%"] }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          >
            {[...partners, ...partners].map((logo, index) => (
              <div
                key={index}
                className="bg-white min-w-[150px] md:min-w-[180px] rounded-sm flex items-center justify-center h-28 hover:shadow-lg transition"
              >
                <Image
                  src={logo}
                  alt={`Partner ${index + 1}`}
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
