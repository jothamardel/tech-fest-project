"use client";

import Link from "next/link";
import Image from "next/image";

const quickLinks = [
  { href: "/about",     label: "About" },
  { href: "/speakers",  label: "Speakers" },
  { href: "/community", label: "Community" },
  { href: "/galleries", label: "Gallery" },
  { href: "/contact",   label: "Contact" },
];

const resources = [
  { href: "/about",   label: "Our Story" },
  { href: "/contact", label: "FAQs" },
  { href: "/contact", label: "Privacy Policy" },
  { href: "/contact", label: "Terms of Service" },
];

export default function Footer() {
  return (
    <footer
      aria-label="Site footer"
      className="relative bg-slate-950 border-t border-slate-800"
    >
      {/* Top gradient line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        {/* Main grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4">

          {/* Brand */}
          <div className="flex flex-col">
            <Link href="/" aria-label="Jos TechFest — Home">
              <Image
                src="/logo.png"
                alt="Jos TechFest Logo"
                width={130}
                height={40}
                className="h-auto w-auto max-h-10 object-contain brightness-0 invert mb-4"
              />
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed">
              Celebrating innovation, creativity, and collaboration across Africa.
            </p>
            {/* Social icons */}
            <div className="mt-5 flex gap-3">
              {[
                {
                  label: "Twitter / X",
                  path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.261 5.624L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z",
                  href: "#",
                },
                {
                  label: "LinkedIn",
                  path: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
                  href: "#",
                },
                {
                  label: "Instagram",
                  path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
                  href: "#",
                },
              ].map(({ label, path, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={`Follow TechFest on ${label}`}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-500 hover:border-slate-700 hover:text-slate-300 transition-all duration-200"
                >
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
                    <path d={path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <nav aria-label="Quick links">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-5">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map(({ href, label }) => (
                <li key={href + label}>
                  <Link
                    href={href}
                    className="text-sm text-slate-400 hover:text-white transition-colors duration-150"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Resources */}
          <nav aria-label="Resources">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-5">
              Resources
            </h3>
            <ul className="space-y-3">
              {resources.map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-slate-400 hover:text-white transition-colors duration-150"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Stay Updated */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-5">
              Stay Updated
            </h3>
            <p className="text-sm text-slate-500 mb-4">
              Subscribe to get the latest TechFest 2026 updates.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              aria-label="Newsletter subscription"
              className="flex flex-col gap-2 sm:flex-row"
            >
              <input
                type="email"
                placeholder="your@email.com"
                aria-label="Email address for newsletter"
                className="w-full rounded-full border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/40 transition-all"
              />
              <button
                type="submit"
                aria-label="Subscribe to TechFest newsletter"
                className="flex-shrink-0 rounded-full bg-emerald-600 hover:bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-150"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-800 pt-6">
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} Jos TechFest. All rights reserved.
          </p>
          <p className="text-xs text-slate-600">
            AI x Industry: Automating the Future of Work
          </p>
        </div>
      </div>
    </footer>
  );
}