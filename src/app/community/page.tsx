"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface Member {
  id: number;
  name: string;
  role: string;
  description: string;
  image: string;
}

const members: Member[] = [
  {
    id: 1,
    name: "Ardel Mbiplang",
    role: "Chief Executive Officer",
    description:
      "Leads company vision, drives innovation, and oversees strategic growth and success.",
    image: "/images/mbi.jpg",
  },
  {
    id: 2,
    name: "Shola Akambi",
    role: "Chief Operating Officer",
    description:
      "Oversees operations, drives strategy, and ensures efficient tech company growth.",
    image: "/images/shola.jpg",
  },
  {
    id: 3,
    name: "Peter Gyang Sha",
    role: "Software Engineer/Frontend Lead",
    description: "Passionate about building user-friendly web apps.",
    image: "/images/piro.png",
  },
  {
    id: 4,
    name: "Othniel John",
    role: "Community Manager/Prompt Engineer",
    description:
      "A versatile Community Manager and Prompt Engineer who builds active communities.",
    image: "/images/oth.jpg",
  },
  {
    id: 5,
    name: "Samuel Sean",
    role: "Software Engineer",
    description:
      "A skilled professional who designs, develops, tests and maintains applications.",
    image: "/images/sean.jpg",
  },
  {
    id: 6,
    name: "Miracle Andrew",
    role: "Cyber Security Analyst",
    description: "Protecting systems, data, and people in a digital world.",
    image: "/images/Mira.jpg",
  },
  {
    id: 7,
    name: "Christopher Dawen",
    role: "Head of Partnership",
    description: "Building modern cross-platform mobile apps.",
    image: "/images/chris.jpg",
  },
];

const CommunityPage: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperInstance | null>(null);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.pagination.update();
      setActiveIndex(swiperRef.current.realIndex);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 pt-32 pb-24 overflow-hidden">
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 10%, rgba(16,185,129,0.05) 0%, transparent 60%)",
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col justify-center items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-emerald-400 mb-4">
              Core Team
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight">
              Our Community
            </h1>
            <p className="mt-5 text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
              JosTechFest is more than a gathering—it&rsquo;s a dedicated
              community working to strengthen Plateau State&rsquo;s tech ecosystem.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full mt-16 mb-16 relative px-8 sm:px-12 md:px-16"
          >
            <div className="h-[380px] sm:h-[400px] p-4 overflow-visible">
              <Swiper
                modules={[Pagination, Autoplay, Navigation]}
                spaceBetween={16}
                slidesPerView={3}
                centeredSlides={true}
                loop={true}
                speed={800}
                autoplay={{
                  delay: 3500,
                  disableOnInteraction: false,
                }}
                pagination={{ clickable: true, el: ".custom-pagination" }}
                navigation={{
                  nextEl: ".custom-next",
                  prevEl: ".custom-prev",
                }}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                className="h-full overflow-visible"
                breakpoints={{
                  320: { slidesPerView: 1 },
                  640: { slidesPerView: 1.5 },
                  768: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                }}
              >
                {members.map((member, index) => (
                  <SwiperSlide
                    key={member.id}
                    className="flex justify-center items-center h-fit p-4"
                  >
                    <div
                      className={`transition-all duration-500 ease-out bg-slate-900 rounded-3xl text-center border h-80 sm:h-88 w-full max-w-sm overflow-hidden flex flex-col relative ${
                        index === activeIndex
                          ? "scale-105 border-emerald-500/50 shadow-[0_0_40px_-10px_rgba(16,185,129,0.3)] z-10"
                          : "scale-90 border-slate-800 opacity-60 z-0"
                      }`}
                    >
                      {/* Avatar Image Section */}
                      <div className="flex justify-center mt-8">
                        <div className={`relative w-28 h-28 rounded-full overflow-hidden border-2 shadow-lg transition-colors duration-500 ${index === activeIndex ? "border-emerald-500" : "border-slate-700"}`}>
                          <Image
                            src={member.image}
                            alt={member.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>

                      {/* Text Section */}
                      <div className="p-6 flex-1 flex flex-col justify-center">
                        <h2 className="text-xl font-bold text-white mb-1">
                          {member.name}
                        </h2>
                        <p className="text-emerald-400 font-medium text-sm mb-3">
                          {member.role}
                        </p>
                        <p className="text-sm text-slate-400 line-clamp-3">
                          {member.description}
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Custom Navigation Buttons */}
              <button className="custom-prev absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-6 z-20 w-12 h-12 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-full flex items-center justify-center text-slate-300 hover:text-white transition-all duration-300 shadow-lg">
                <ArrowLeft size={20} />
              </button>
              <button className="custom-next absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-6 z-20 w-12 h-12 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-full flex items-center justify-center text-slate-300 hover:text-white transition-all duration-300 shadow-lg">
                <ArrowRight size={20} />
              </button>
            </div>

            {/* Custom Pagination */}
            <div className="custom-pagination flex justify-center mt-6 space-x-2" />
            
            <style jsx global>{`
              .custom-pagination .swiper-pagination-bullet {
                background-color: #475569 !important; /* slate-600 */
                opacity: 0.6;
                transition: all 0.3s ease;
                width: 8px;
                height: 8px;
                border-radius: 4px;
              }
              .custom-pagination .swiper-pagination-bullet-active {
                background-color: #10b981 !important; /* emerald-500 */
                opacity: 1;
                width: 32px;
                box-shadow: 0 0 10px rgba(16, 185, 129, 0.4);
              }
              .swiper-pagination {
                transition: transform 0.4s ease-in-out;
              }
            `}</style>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
