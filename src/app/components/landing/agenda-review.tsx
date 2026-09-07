"use client";

import { motion } from "framer-motion";

const agenda = [
  {
    day: "Day 1 — Main Conference",
    date: "26 November 2026",
    events: [
      { time: "TBD", title: "Registration & Check-in" },
      { time: "TBD", title: "Introduction & Networking" },
      { time: "TBD", title: "Welcome Remark" },
      { time: "TBD", title: "Special Address" },
      { time: "TBD", title: "Keynote — AI x Industry" },
    ],
  },
  {
    day: "Day 2 — Exclusive Networking",
    date: "27 November 2026",
    events: [
      { time: "TBD", title: "Builder Mixer (CEOs, CTOs & Founders)" },
      { time: "TBD", title: "Roundtable Discussions" },
      { time: "TBD", title: "Open Demos & Showcase" },
    ],
  },
];

export default function Agenda() {
  return (
    <section
      id="schedule"
      aria-labelledby="agenda-heading"
      className="relative bg-slate-950 py-24 px-4 sm:px-6 overflow-hidden"
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 20%, rgba(59,130,246,0.06) 0%, transparent 55%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <span className="inline-block rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-blue-400 mb-4">
            Programme
          </span>
          <h2
            id="agenda-heading"
            className="text-4xl sm:text-5xl font-black text-white tracking-tight"
          >
            Event Agenda
          </h2>
          <p className="mt-4 text-slate-400 max-w-xl mx-auto">
            Two days of innovation, collaboration, and unforgettable experiences.
          </p>
        </motion.div>

        {/* Day cards */}
        <div className="grid gap-5 md:grid-cols-2">
          {agenda.map((day, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="rounded-2xl border border-slate-800 bg-slate-900/70 backdrop-blur-sm p-6 hover:border-slate-700 transition-all duration-300 hover:shadow-xl hover:shadow-black/30"
              aria-label={`${day.day} — ${day.date}`}
            >
              {/* Day header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-white">{day.day}</h3>
                  <p className="mt-1 text-sm text-slate-500">{day.date}</p>
                </div>
                <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-2.5 py-1 text-xs font-semibold text-blue-400">
                  Day {index + 1}
                </span>
              </div>

              {/* Timeline events */}
              <ol className="space-y-4" aria-label={`Events for ${day.day}`}>
                {day.events.map((event, i) => (
                  <li key={i} className="flex items-start gap-4">
                    {/* Timeline line + dot */}
                    <div className="flex flex-col items-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-blue-500 flex-shrink-0 mt-1 ring-2 ring-blue-500/20" />
                      {i < day.events.length - 1 && (
                        <div className="w-px flex-1 bg-slate-800 mt-1 min-h-[1.5rem]" />
                      )}
                    </div>
                    <div className="pb-1">
                      <p className="text-xs font-mono text-slate-600 leading-none mb-1">{event.time}</p>
                      <p className="text-sm font-medium text-slate-200">{event.title}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </motion.article>
          ))}
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 text-center text-sm text-slate-600"
        >
          * Full timetable will be published closer to the event date.
        </motion.p>
      </div>
    </section>
  );
}
