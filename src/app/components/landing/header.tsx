"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/community", label: "Community" },
  { href: "/speakers", label: "Speakers" },
  { href: "/contact", label: "Contact" },
];

const tickerWords = [
  "TechFest 2026",
  "AI x Industry",
  "Innovation",
  "Networking",
  "Builders",
  "26 Nov, Jos",
  "Workshops",
  "#JosTechFest",
  "TechFest 2026",
  "AI x Industry",
  "Innovation",
  "Networking",
  "Builders",
  "26 Nov, Jos",
  "Workshops",
  "#JosTechFest",
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex flex-col">
      {/* ── Main nav bar ────────────────────────────────────────── */}
      <div
        className={`flex items-center justify-between px-6 sm:px-8 py-3 transition-all duration-300
          ${
            scrolled
              ? "bg-slate-950/95 border-b border-slate-800 shadow-lg shadow-black/30"
              : "bg-slate-950/70"
          }
          backdrop-blur-md`}
      >
        {/* Logo */}
        <Link href="/" className="flex-shrink-0" aria-label="Jos TechFest — Home">
          <Image
            src="/logo.png"
            alt="Jos TechFest Logo"
            width={130}
            height={40}
            className="h-auto w-auto max-h-10 object-contain brightness-0 invert"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-7 text-sm font-medium">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-slate-400 hover:text-white transition-colors duration-150 relative group"
            >
              {label}
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-blue-500 transition-all duration-200 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="https://smartinvites.xyz/forms/68e930bf881d91001bd67f19/6903335d256533001abab3b9/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Register for TechFest 2026"
            className="inline-flex items-center gap-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-5 py-2 transition-colors duration-150 shadow-md shadow-blue-900/40"
          >
            Register Now
            <span aria-hidden="true" className="text-blue-200">→</span>
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-slate-300 hover:text-white transition-colors p-1"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* ── Ticker strip ─────────────────────────────────────────── */}
      <div
        className={`overflow-hidden h-8 flex items-center border-b transition-all duration-300
          ${scrolled ? "bg-slate-900/95 border-slate-800" : "bg-slate-900/80 border-slate-800/60"}`}
        aria-hidden="true"
      >
        <div className="flex items-center gap-6 text-xs font-medium text-slate-500 animate-marquee whitespace-nowrap">
          {tickerWords.map((word, i) => (
            <span key={i} className="flex items-center gap-3">
              <span>{word}</span>
              <svg className="w-3 h-3 text-blue-500/60 flex-shrink-0" viewBox="0 0 12 12" fill="currentColor">
                <circle cx="6" cy="6" r="2" />
              </svg>
            </span>
          ))}
        </div>
      </div>

      {/* ── Mobile slide-down menu ───────────────────────────────── */}
      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile navigation"
          className="md:hidden flex flex-col items-center gap-5 py-6 bg-slate-950/98 backdrop-blur-lg border-b border-slate-800 shadow-xl"
        >
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="text-base font-medium text-slate-300 hover:text-white transition-colors"
            >
              {label}
            </Link>
          ))}
          <Link
            href="https://smartinvites.xyz/forms/68e930bf881d91001bd67f19/6903335d256533001abab3b9/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex items-center gap-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-6 py-2.5 transition-colors"
          >
            Register Now →
          </Link>
        </nav>
      )}
    </header>
  );
}
