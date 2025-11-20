import { MapPin } from "lucide-react";

export default function Venue() {
  const lat = 9.8965;
  const lng = 8.8583;
  const mapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  // Adjust these to nudge the blinking marker relative to the map center (in pixels)
  const offsetX = 0; // positive moves right, negative moves left
  const offsetY = -12; // positive moves down, negative moves up

  return (
    <section id="venue" className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-4xl font-bold text-green-900 ">Venue</h2>
        <div className="flex items-start gap-3 text-gray-700 mb-6">
          <MapPin className="mt-1 h-5 w-5 text-red-600" />
          <div>
            <p className="font-medium">Sarau Event Center, Jos</p>
            <p className="text-sm">Coordinates: {lat}, {lng}</p>
            <div className="mt-2 flex gap-2">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-green-700 underline hover:no-underline"
              >
                View on Google Maps
              </a>
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-green-700 underline hover:no-underline"
              >
                Get directions
              </a>
            </div>
          </div>
        </div>

        <div className="relative w-full overflow-hidden rounded-lg border" style={{ paddingBottom: "56.25%" }}>
          <iframe
            title="Sarau Event Center, Jos - Map"
            src={`https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute left-0 top-0 h-full w-full"
          />
          {/* Blinking marker overlay positioned relative to map center with adjustable offsets */}
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute"
              style={{
                left: "50%",
                top: "50%",
                transform: `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))`,
              }}
            >
              <span className="relative flex items-center justify-center">
                <span className="absolute inline-flex h-6 w-6 rounded-full bg-red-500 opacity-75 animate-ping" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-red-600 border-2 border-white shadow" />
              </span>
            </div>
          </div>
        </div>

        {/* Venue description */}
        <div className="mt-6 text-gray-700 space-y-3">
          <p className="text-sm">
            Sarau Event Center is a modern, centrally-located events venue in Jos suitable for conferences,
            exhibitions and community gatherings. The facility offers a main hall with flexible seating for up
            to 800 attendees, on-site parking and fast Wi‑Fi — ideal for hybrid sessions and live demos.
          </p>

          <ul className="list-disc ml-5 text-sm text-gray-600 space-y-1">
            <li>Capacity: up to 800 people (configurable seating)</li>
            <li>Amenities: AV setup, stage lighting, high-speed internet, breakout rooms</li>
            <li>Accessibility: ramp access and ground-level entrances</li>
            <li>Nearby: hotels, restaurants and public transport options within 10–15 minutes</li>
          </ul>

          <div className="mt-2 flex flex-wrap gap-3">
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-green-700 underline hover:no-underline"
            >
              Open in Google Maps
            </a>
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-green-700 underline hover:no-underline"
            >
              Get driving directions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}