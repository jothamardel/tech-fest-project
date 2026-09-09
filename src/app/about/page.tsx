"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

// Helper for Drive HD Images
const toUrl = (id: string) => `https://lh3.googleusercontent.com/d/${id}`;

const heroSliderImages: string[] = [
  toUrl("1TWm7GJu32tVZvm6_QtOiuGuFP1O2mRhd"), // Main Stage
  toUrl("1ZMrYAMeAjZdj81gULy_9ShrLuQyO2EVo"), // Crowd
  toUrl("10HhuWkr6n4EI8vBNUFQLkySRahdnL9PE"), // Builders
  toUrl("129AWzwa71ZJW1tZCfEYr45U8gkTZe-IM"), // Networking
];

const aboutSliderImages: string[] = [
  toUrl("10SZ1JPYQLm2j8n678DH1VAXbjwUSvGq3"), // Keynote
  toUrl("14X-jB6oDv_E0jA4wYUFmgeeuMLC7nr6z"), // Audience
  toUrl("15vIajd67L9YuebAqBUv_0tb4l4Q_TZop"), // Community
  toUrl("1D3UWbSdcIK5N6Njj3z-LjAVmu4mowNhp"), // Stage
];

interface ImageSliderProps {
  images: string[];
  aspectRatio?: string;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images, aspectRatio = "4/3" }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, images.length]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };
  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };
  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  return (
    <div className="relative group">
      <div
        className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-900"
        style={{ aspectRatio }}
      >
        {images.map((image: string, index: number) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={image}
              alt={`Slide ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={index === 0}
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Dot Indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {images.map((_, index: number) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-emerald-500 w-8"
                : "bg-slate-700 hover:bg-slate-500 w-2"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const StatsSection: React.FC = () => {
  const stats = [
    { number: "1,500+", label: "Attendees" },
    { number: "50+", label: "Speakers" },
    { number: "100+", label: "Partners" },
  ];

  return (
    <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-800">
      {stats.map((stat, index: number) => (
        <div key={index} className="text-center">
          <div className="text-3xl sm:text-4xl font-black text-white">{stat.number}</div>
          <div className="text-xs sm:text-sm text-slate-500 uppercase tracking-widest mt-1">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
};

const AboutPage: React.FC = () => {
  const [scrollY, setScrollY] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 pb-24 overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 lg:pb-24 lg:pt-40">
        {/* Ambient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.08) 0%, transparent 55%)",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
              style={{
                transform: `translateY(${scrollY * 0.05}px)`,
                transition: "transform 0.1s ease-out",
              }}
            >
              <div>
                <span className="inline-block rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-emerald-400 mb-6">
                  Our Mission
                </span>
                <h1 className="text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-tight tracking-tight">
                  Unleashing Potential, <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-400">
                    Igniting Innovation.
                  </span>
                </h1>
              </div>

              <div className="prose prose-lg prose-invert max-w-none text-slate-400">
                <p className="text-lg leading-relaxed">
                  At the TechFest, we are dedicated to empowering the tech
                  community in Northern Nigeria and the Middle Belt by fostering
                  innovation and collaboration.
                </p>
                <p className="text-lg leading-relaxed">
                  Together, we aim to drive growth and develop real-world
                  solutions that will shape the future of technology.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href="/events"
                  className="inline-flex justify-center items-center bg-white text-slate-900 hover:bg-slate-200 px-8 py-3.5 rounded-full font-semibold transition-all duration-200 transform hover:scale-105"
                >
                  Learn More
                </Link>
                <Link
                  href="/events"
                  className="inline-flex justify-center items-center border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white px-8 py-3.5 rounded-full font-semibold transition-all duration-200"
                >
                  View Events
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
              style={{
                transform: `translateY(${scrollY * -0.05}px)`,
                transition: "transform 0.1s ease-out",
              }}
            >
              <ImageSlider images={heroSliderImages} aspectRatio="4/3" />
              {/* Decorative blurs */}
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/20 blur-3xl rounded-full"></div>
              <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-emerald-500/20 blur-3xl rounded-full"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative order-2 lg:order-1"
            >
              <ImageSlider images={aboutSliderImages} aspectRatio="1/1" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-10 order-1 lg:order-2"
            >
              <div>
                <h2 className="text-4xl lg:text-5xl font-black text-white mb-6 tracking-tight">
                  Who We Are
                </h2>
                <div className="w-16 h-1 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-500 mb-8"></div>
              </div>

              <div className="space-y-6 text-slate-400 text-lg">
                <p className="leading-relaxed">
                  JosTechFest is Northern Nigeria’s premier technology
                  conference and innovation hub.
                </p>
                <p className="leading-relaxed">
                  Our mission is to create a thriving ecosystem where innovators
                  can connect, learn, and build the future of tech.
                </p>
                <p className="leading-relaxed">
                  Through workshops, keynotes, and hackathons, we provide a
                  platform for emerging talent to showcase their skills.
                </p>
              </div>

              <StatsSection />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-slate-800 bg-slate-900/50 p-10 sm:p-16 backdrop-blur-sm relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent pointer-events-none" />
            
            <h2 className="text-4xl font-black text-white mb-6 tracking-tight relative z-10">
              Ready to Be Part of the Innovation?
            </h2>
            <p className="text-xl text-slate-400 mb-10 leading-relaxed max-w-2xl mx-auto relative z-10">
              Join hundreds of tech enthusiasts, entrepreneurs, and industry
              leaders at JosTechFest 2026.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <Link
                href="https://smartinvites.xyz/forms/68e930bf881d91001bd67f19/6903335d256533001abab3b9/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex justify-center items-center bg-emerald-600 hover:bg-emerald-500 text-white px-10 py-4 rounded-full font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg shadow-emerald-900/20"
              >
                Register Now
              </Link>
              <Link
                href="/events"
                className="inline-flex justify-center items-center border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-10 py-4 rounded-full font-semibold text-lg transition-all duration-200"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
