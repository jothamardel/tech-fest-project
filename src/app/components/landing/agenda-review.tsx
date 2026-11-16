"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  TECHFEST_SESSIONS,
  getPersonInitials,
  type SessionSpeaker,
} from "@/data/sessions";

interface AgendaItem {
  time: string;
  title: string;
  subtitle?: string;
  trackBadge?: string;
  accent?: "blue" | "emerald" | "indigo" | "amber";
  speakers?: SessionSpeaker[];
}

interface AgendaBlock {
  blockTitle: string;
  date: string;
  badge: string;
  events: AgendaItem[];
}

const morningSessions = TECHFEST_SESSIONS.slice(0, 2);
const afternoonSessions = TECHFEST_SESSIONS.slice(2, 4);

const agendaBlocks: AgendaBlock[] = [
  {
    blockTitle: "Morning Programme — Opening & Sessions 01–02",
    date: "26 November 2026 · Sarau Event Center, Jos",
    badge: "Morning",
    events: [
      {
        time: "08:30 AM",
        title: "Registration, Check-in & Morning Networking",
        subtitle: "Arrival of builders, speakers, and guests",
      },
      {
        time: "09:30 AM",
        title: "Welcome Remark & Opening Keynote",
        subtitle: "Hosted by Samuel Adebayo, Judith Nyior & Anna",
      },
      ...morningSessions.map((session) => ({
        time: session.time,
        title: `Session: ${session.title}`,
        subtitle: session.tagline,
        trackBadge: session.stage,
        accent: session.accent,
        speakers: session.speakers,
      })),
    ],
  },
  {
    blockTitle: "Afternoon Programme — Sessions 03–04 & Closing Showcase",
    date: "26 November 2026 · Sarau Event Center, Jos",
    badge: "Afternoon",
    events: [
      ...afternoonSessions.map((session) => ({
        time: session.time,
        title: `Session: ${session.title}`,
        subtitle: session.tagline,
        trackBadge: session.stage,
        accent: session.accent,
        speakers: session.speakers,
      })),
      {
        time: "04:15 PM",
        title: "Open Demos, Ecosystem Networking & Closing Remarks",
        subtitle: "Live product demos, founder mixer & community photo",
      },
    ],
  },
];

const BADGE_COLORS = {
  blue: "border-blue-500/30 bg-blue-500/10 text-blue-300",
  emerald: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  indigo: "border-indigo-500/30 bg-indigo-500/10 text-indigo-300",
  amber: "border-amber-500/30 bg-amber-500/10 text-amber-300",
};

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
            26 November 2026 · Full-Day Programme
          </span>
          <h2
            id="agenda-heading"
            className="text-4xl sm:text-5xl font-black text-white tracking-tight"
          >
            Event Agenda
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
            One action-packed day featuring four signature sessions —{" "}
            <span className="text-slate-200 font-medium">AI x Education</span>,{" "}
            <span className="text-slate-200 font-medium">AI x Business</span>,{" "}
            <span className="text-slate-200 font-medium">AI x Creatives</span>, and{" "}
            <span className="text-slate-200 font-medium">Startup Ecosystem &amp; Policy</span>.
          </p>
        </motion.div>

        {/* Morning & Afternoon cards for 26 Nov 2026 */}
        <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
          {agendaBlocks.map((block, index) => (
            <motion.article
              key={block.blockTitle}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-1.5"
              aria-label={`${block.blockTitle} — ${block.date}`}
            >
              <div className="rounded-[calc(2rem-0.375rem)] bg-slate-900/90 p-6 sm:p-7 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                {/* Block header */}
                <div className="flex items-start justify-between mb-6 pb-4 border-b border-slate-800/80">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white">
                      {block.blockTitle}
                    </h3>
                    <p className="mt-1 text-sm text-slate-400">{block.date}</p>
                  </div>
                  <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400">
                    {block.badge}
                  </span>
                </div>

                {/* Timeline events */}
                <ol
                  role="list"
                  className="space-y-5"
                  aria-label={`Events for ${block.blockTitle}`}
                >
                  {block.events.map((event, i) => (
                    <li key={event.title} className="flex items-start gap-4">
                      {/* Timeline line + dot */}
                      <div className="flex flex-col items-center self-stretch">
                        <div className="h-2.5 w-2.5 rounded-full bg-blue-500 flex-shrink-0 mt-1.5 ring-4 ring-blue-500/15" />
                        {i < block.events.length - 1 && (
                          <div className="w-px flex-1 bg-slate-800 mt-2 min-h-[2rem]" />
                        )}
                      </div>

                      <div className="flex-1 pb-2">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="text-xs font-mono text-slate-400">
                            {event.time}
                          </span>
                          {event.trackBadge && event.accent && (
                            <span
                              className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${BADGE_COLORS[event.accent]}`}
                            >
                              {event.trackBadge}
                            </span>
                          )}
                        </div>

                        <p className="text-sm sm:text-base font-bold text-white">
                          {event.title}
                        </p>
                        {event.subtitle && (
                          <p className="mt-0.5 text-xs text-slate-400">
                            {event.subtitle}
                          </p>
                        )}

                        {/* Inline speaker chips for session blocks */}
                        {event.speakers && event.speakers.length > 0 && (
                          <div className="mt-3 rounded-xl border border-slate-800/90 bg-slate-950/60 p-3">
                            <div className="flex flex-wrap items-center gap-2.5">
                              {event.speakers.map((sp) => (
                                <div
                                  key={sp.id}
                                  className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/90 pr-3 pl-1 py-1"
                                >
                                  <div className="relative flex h-6 w-6 items-center justify-center overflow-hidden rounded-full bg-slate-800 text-[9px] font-bold text-white ring-1 ring-white/20">
                                    {sp.image ? (
                                      <Image
                                        src={sp.image}
                                        alt={sp.name}
                                        fill
                                        sizes="24px"
                                        className="object-cover object-top"
                                      />
                                    ) : (
                                      <span aria-hidden="true">
                                        {getPersonInitials(sp.name)}
                                      </span>
                                    )}
                                  </div>
                                  <span className="text-xs font-medium text-slate-200">
                                    {sp.name}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Footer CTA to jump to full session portraits */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <Link
            href="#sessions"
            className="text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
          >
            View full session breakdowns &amp; speaker portraits ↑
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
