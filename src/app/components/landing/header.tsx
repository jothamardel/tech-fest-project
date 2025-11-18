"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="inset-x-0 top-0 z-50 fixed ">
      {/* Navbar */}
      <div className="flex items-center justify-between px-8  bg-white p-4">
        <Link href="/" passHref>
          <Image
            src="/logo.png"
            alt="Tech-fest Logo"
            width={150}
            height={150}
            className="cursor-pointer"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-white-700 h-10">
          <Link href="/" className="hover:text-amber-500">
            Home
          </Link>
          <Link href="/about" className="hover:text-amber-500">
            About
          </Link>
          <Link href="/community" className="hover:text-amber-500">
            Community
          </Link>
          <Link href="/speakers" className="hover:text-amber-500">
            Speakers
          </Link>
          <Link href="/contact" className="hover:text-amber-500">
            Contact
          </Link>
        </nav>

        {/* Desktop button */}
      


<Link
  href="https://smartinvites.xyz/forms/68e930bf881d91001bd67f19/6903335d256533001abab3b9/"
  target="_blank"
  rel="noopener noreferrer"
  className="border border-green-700 rounded-full px-4 py-1 text-xs hover:bg-green-700 hover:text-white transition"
  onClick={() => setOpen(false)}
>
  Register Now
</Link>

        <button
          className="md:hidden text-gray-700"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <div className="overflow-hidden  bg-[#02190C] text-white h-8 sm:h-8 lg:h-12 flex items-center w-full">
        <motion.div
          className="flex items-center gap-8 text-sm sm:text-sm lg:text-base font-medium w-full"
          animate={{ x: ["0%", "-100%"] }}
          transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
        >
       


          {[
  "TechFest",
  "Creativity",
  "Networking",
  "Innovation",
  "AI",
  "TechFest",
  "Creativity",
  "Networking",
  "Innovation",
  "AI",
  "TechFest",
  "Creativity",
  "Networking",
  "Innovation",
  "AI",
  "TechFest",
  "Creativity",
  "Networking",
  "Innovation",
  "AI",
  
  "TechFest",
  "Creativity",
  "Networking",
  "Innovation",
  "AI",
  
  "TechFest",
  "Creativity",
  "Networking",
  "Innovation",
  "AI",
  
  "TechFest",
  "Creativity",
  "Networking",
  "Innovation",
  "AI",
  
  "TechFest",
  "Creativity",
  "Networking",
  "Innovation",
  "AI",
].map((item, index) => (
  <div key={index} className="flex items-center gap-2">
    <p>{item}</p>
    <svg
      className="w-4 h-4 text-amber-400"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M12 2.5l2.9 6.18 6.83.59-5.18 4.53 1.55 6.7L12 16.84 5.9 20.5l1.55-6.7L2.27 9.27l6.83-.59L12 2.5z"
      />
    </svg>
  </div>
))}

        </motion.div>
      </div>

      {/*<div className="overflow-hidden bg-green-900 text-white h-8 sm:h-8 lg:h-12 flex items-center w-full">
        <motion.div
          className="flex items-center gap-8 text-sm sm:text-sm lg:text-base font-medium w-full"
         animate={{ x: ["0%", "-100%"] }}
              transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        >

          <p className="whitespace-nowrap"> Welcome to TechFest 2025</p>
          <span className="center">
          |
          </span>

          <p>Innovation</p>
          <span className=" center">
          |
          </span>

          <p>Creativity</p>
          <span className="center">
          |
          </span>

          <p>Networking</p>
           <span className=" center">
          |
          </span>

          <p className="whitespace-nowrap">World-class Speakers</p>
          <span className=" center">
          |
          </span>
          <p>#JosTechFest</p>
          <span className="center">
            |
          </span>




           <p className="whitespace-nowrap"> Welcome to TechFest 2025</p>
          <span className="center">
          |
          </span>

          <p>Innovation</p>
          <span className=" center">
          |
          </span>

          <p>Creativity</p>
          <span className="center">
          |
          </span>

          <p>Networking</p>
           <span className=" center">
          |
          </span>

          <p className="whitespace-nowrap">World-class Speakers</p>
          <span className=" center">
          |
          </span>
          <p>#JosTechFest</p>
           <span className="center">
            |
          </span>

           <p className="whitespace-nowrap"> Welcome to TechFest 2025</p>
          <span className="center">
          |
          </span>
        </motion.div>
      </div>*/}

      {open && (
        <div className="absolute left-0 w-full bg-white shadow-md flex flex-col items-center py-4 space-y-4 md:hidden z-40">
          <Link href="/" onClick={() => setOpen(false)}>
            Home
          </Link>
          <Link href="/about" onClick={() => setOpen(false)}>
            About
          </Link>
          <Link href="/community" onClick={() => setOpen(false)}>
            Community
          </Link>
          <Link href="/speakers" onClick={() => setOpen(false)}>
            Speakers
          </Link>
          <Link href="/contact" onClick={() => setOpen(false)}>
            Contact
          </Link>
         

          <Link
  href="https://smartinvites.xyz/forms/68e930bf881d91001bd67f19/6903335d256533001abab3b9/"
  target="_blank"
  rel="noopener noreferrer"
  className="border border-green-700 rounded-full px-4 py-1 text-xs hover:bg-green-700 hover:text-white transition"
  onClick={() => setOpen(false)}
>
  Register Now
</Link>

        </div>
      )}
    </header>
  );
}
