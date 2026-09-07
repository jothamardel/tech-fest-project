import { MapPin } from "lucide-react";

export default function Venue() {
  const lat = 9.8965;
  const lng = 8.8583;
  const mapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

  return (
    <section
      id="venue"
      aria-labelledby="venue-heading"
      className="relative bg-slate-950 py-24 px-4 sm:px-6 overflow-hidden"
    >
      {/* Top border */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />

      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 80% 60%, rgba(16,185,129,0.05) 0%, transparent 55%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-10">
          <span className="inline-block rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-emerald-400 mb-4">
            Location
          </span>
          <h2
            id="venue-heading"
            className="text-4xl sm:text-5xl font-black text-white tracking-tight"
          >
            Venue &amp; Logistics
          </h2>

          {/* Address row */}
          <div className="mt-4 flex items-start gap-3">
            <MapPin
              className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-400"
              aria-hidden="true"
            />
            <address className="not-italic text-slate-300 text-sm leading-relaxed">
              <strong className="text-white font-semibold">Sarau Event Center</strong>
              <br />
              Jos, Plateau State, Nigeria
            </address>
          </div>

          {/* Quick links */}
          <div className="mt-3 flex gap-4 ml-8">
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View Sarau Event Center on Google Maps"
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              View on Google Maps →
            </a>
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Get driving directions to Sarau Event Center"
              className="text-sm text-slate-500 hover:text-slate-300 transition-colors"
            >
              Get directions
            </a>
          </div>
        </div>

        {/* Map embed + info grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Map — takes 2/3 width on lg */}
          <div
            className="relative overflow-hidden rounded-2xl border border-slate-800 lg:col-span-2"
            style={{ paddingBottom: "56.25%" }}
          >
            <iframe
              title="Sarau Event Center, Jos — Google Maps"
              src={`https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute left-0 top-0 h-full w-full"
            />
            {/* Blinking marker */}
            <div className="absolute inset-0 pointer-events-none">
              <div
                className="absolute"
                style={{
                  left: "50%",
                  top: "50%",
                  transform: "translate(calc(-50%), calc(-50% - 12px))",
                }}
              >
                <span className="relative flex items-center justify-center">
                  <span className="absolute inline-flex h-6 w-6 rounded-full bg-blue-500 opacity-60 animate-ping" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-blue-500 border-2 border-white shadow" />
                </span>
              </div>
            </div>
          </div>

          {/* Info card */}
          <div className="flex flex-col gap-4">
            {/* About card */}
            <div className="flex-1 rounded-2xl border border-slate-800 bg-slate-900/70 backdrop-blur-sm p-6">
              <h3 className="text-base font-bold text-white mb-3">About the Venue</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Sarau Event Center is a modern, centrally-located events venue in Jos — ideal
                for conferences, exhibitions, and community gatherings.
              </p>
            </div>

            {/* Amenities list */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 backdrop-blur-sm p-6">
              <h3 className="text-base font-bold text-white mb-4">Venue Highlights</h3>
              <ul className="space-y-3" aria-label="Venue amenities">
                {[
                  { icon: "🏛️", text: "Capacity: up to 800 (flexible seating)" },
                  { icon: "🎙️", text: "AV setup, stage lighting & high-speed Wi-Fi" },
                  { icon: "♿", text: "Ramp access & ground-level entrances" },
                  { icon: "🚗", text: "On-site parking + transport nearby" },
                  { icon: "🍽️", text: "Restaurants & hotels within 15 minutes" },
                ].map(({ icon, text }) => (
                  <li key={text} className="flex items-start gap-3 text-sm text-slate-400">
                    <span className="flex-shrink-0 mt-0.5">{icon}</span>
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}