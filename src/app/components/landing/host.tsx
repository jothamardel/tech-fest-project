// // components/Host.tsx
// "use client";

// import Image from "next/image";
// import { motion } from "framer-motion";

// interface Host {
//   name: string;
//   role: string;
//   image: string;
// }

// const hosts: Host[] = [
//   {
//     name: "Winifred Wade",
//     role: "Event Host",
//     image: "/images/ancor1.jpg",
//   },
//   {
//     name: "Ajifa Solomon",
//     role: "Co-Host",
//     image: "/images/ancor2.jpg",
    
//   },

  
// ];

// // Card Component
// function Card({ host }: { host: Host }) {
//   return (
//     <div className="relative w-72 h-[400px] bg-white rounded-md overflow-hidden shadow-xl">
//     <div className="absolute top-0 left-0 w-full  bg-opacity-90 p-4 z-10 text-left">
//         <h3 className="text-lg font-semibold text-white">{host.name}</h3>
//         <p className="text-sm text-gray-300">{host.role}</p>
//       </div>


//             {/* Host Image */}
//       <Image
//         src={host.image}
//         alt={host.name}
//         width={400}
//         height={500}
//         className="object-cover w-full h-full"
//       />
//     </div>
//   );
// }

// export default function Host() {
//   return (
//     <section className="py-20 bg-white ">
//       <div className="max-w-6xl mx-auto px-6 text-center">
//         <motion.h2
//           initial={{ y: 50, opacity: 0 }}
//           whileInView={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.9 }}
//           className="text-4xl font-bold text-green-900 mb-4"
//         >
//          Our Hosts
//         </motion.h2>

//         <motion.h5
//           initial={{ y: 40, opacity: 0 }}
//           animate={{ y: 10, opacity: 1 }}
//           transition={{ delay: 0.1, duration: 0.5 }}
//           className="text-gray-600 mb-20  font-semibold  "
//         >
//             Guiding the flow of TechFest with  energy, insight, and passion
//         </motion.h5>

//         {/* Overlapping rotated cards */}
//         <div className="flex flex-col items-center gap-4  md:relative md:h-[420px] md:flex-row md:justify-center">

//           {/* First Card */}
//           <motion.div
//             className="md:absolute md:-rotate-16 md:left-1/4 md:z-10"
//             whileHover={{ scale: 1.05, rotate: -10 }}
//             initial={{ opacity: 0, x: -200 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 1.8, ease: "easeOut" }}
//           >
//             <Card host={hosts[0]} />
//           </motion.div>

//           {/* Second Card */}
//           <motion.div
//             className="md:absolute md:rotate-16 md:right-1/4 md:z-40"
//             whileHover={{ scale: 1.05, rotate: 10 }}
//             initial={{ opacity: 0, x: 200 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 1.8, ease: "easeOut", delay: 0.3 }}
//           >
//             <Card host={hosts[1]} />
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }





// components/Host.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface Host {
  name: string;
  role: string;
  image: string;
}

const hosts: Host[] = [
  {
    name: "Winifred Wade",
    role: "Event Host",
    image: "/images/ancor1.jpg",
  },
  {
    name: "Ajifa Solomon",
    role: "Co-Host",
    image: "/images/ancor2.jpg",
  },
  {
    name: "Rinret  Keswet",
    role: "Guest Host",
    image: "/images/ancor5.jpg",
  },
  {
    name: "Tamimia Esther Nuhu",
    role: "Moderator",
    image: "/images/ancor3.jpg",
  },
];

// Card Component
function Card({ host }: { host: Host }) {
  return (
    <div className="relative w-72 h-[400px] bg-white rounded-md overflow-hidden shadow-xl">
      <div className="absolute top-0 left-0 w-full bg-opacity-90 p-4 z-10 text-left">
        <h3 className="text-lg font-semibold text-white">{host.name}</h3>
        <p className="text-sm text-gray-300">{host.role}</p>
      </div>

      <Image
        src={host.image}
        alt={host.name}
        width={400}
        height={500}
        className="object-cover w-full h-full"
      />
    </div>
  );
}

export default function Host() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9 }}
          className="text-4xl font-bold text-green-900 mb-4"
        >
          Our Anchors
        </motion.h2>

        <motion.h5
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 10, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-amber-500 mb-20 font-semibold"
        >
          Guiding the flow of TechFest with energy, insight, and passion
        </motion.h5>

        {/* Overlapping Rotated Cards (Maintained) */}
        <div className="flex flex-col items-center gap-6 md:relative md:h-[420px] md:flex-row md:justify-center">

          {/* 1st Card */}
          <motion.div
            className="md:absolute md:-rotate-16 md:left-[5%] md:z-10"
            whileHover={{ scale: 1.05, rotate: -10 }}
            initial={{ opacity: 0, x: -200 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
          >
            <Card host={hosts[0]} />
          </motion.div>

          {/* 2nd Card */}
          <motion.div
            className="md:absolute md:rotate-16 md:left-1/4 md:z-20"
            whileHover={{ scale: 1.05, rotate: 10 }}
            initial={{ opacity: 0, x: 200 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.8, ease: "easeOut", delay: 0.3 }}
          >
            <Card host={hosts[1]} />
          </motion.div>

          {/* 3rd Card */}
          <motion.div
            className="md:absolute md:-rotate-12 md:right-1/4 md:z-30"
            whileHover={{ scale: 1.05, rotate: -10 }}
            initial={{ opacity: 0, x: -200 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.8, ease: "easeOut", delay: 0.6 }}
          >
            <Card host={hosts[2]} />
          </motion.div>

          {/* 4th Card */}
          <motion.div
            className="md:absolute md:rotate-12 md:right-[5%] md:z-40"
            whileHover={{ scale: 1.05, rotate: 10 }}
            initial={{ opacity: 0, x: 200 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.8, ease: "easeOut", delay: 0.9 }}
          >
            <Card host={hosts[3]} />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
