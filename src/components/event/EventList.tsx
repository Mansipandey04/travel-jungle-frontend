import Image from "next/image";
import Link from "next/link";
import type { EventItem, EventVibe } from "@/lib/types";

const vibeLabel: Record<EventVibe, string> = {
  cultural: "Cultural",
  gathering: "Gathering",
  both: "Culture + night out",
};

export function EventList({ items }: { items: EventItem[] }) {
  return (
    <ul className="grid gap-8 md:grid-cols-2">
      {items.map((event, index) => (
        <li
          key={event.id}
          className={`event-card overflow-hidden border ${
            event.vibe === "gathering"
              ? "border-coral/35 bg-jungle text-sand"
              : event.vibe === "both"
                ? "border-gold/50 bg-sand"
                : "border-jungle/15 bg-sage/40"
          }`}
          style={{ animationDelay: `${index * 80}ms` }}
        >
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={event.heroImageUrl}
              alt=""
              fill
              className="event-photo object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div
              className={`absolute inset-0 ${
                event.vibe === "gathering"
                  ? "bg-gradient-to-t from-jungle via-jungle/30 to-coral/20"
                  : "bg-gradient-to-t from-jungle/70 via-transparent to-gold/10"
              }`}
            />
            <div className="event-spark absolute inset-0 opacity-40" aria-hidden />
            <p
              className={`absolute left-4 top-4 font-sans text-[11px] uppercase tracking-[0.16em] ${
                event.vibe === "gathering" ? "bg-coral px-2.5 py-1 text-sand" : "bg-sand/90 px-2.5 py-1 text-jungle"
              }`}
            >
              {vibeLabel[event.vibe]}
            </p>
          </div>

          <div className="p-6">
            <p
              className={`font-sans text-xs uppercase tracking-[0.14em] ${
                event.vibe === "gathering" ? "text-sage/80" : "text-jungle/55"
              }`}
            >
              {event.locationLabel}
            </p>
            <h2
              className={`mt-2 font-display text-2xl md:text-3xl ${
                event.vibe === "gathering" ? "text-sand" : "text-jungle"
              }`}
            >
              {event.title}
            </h2>
            {event.moodLine ? (
              <p
                className={`mt-2 font-sans text-sm italic ${
                  event.vibe === "gathering" ? "text-gold" : "text-coral"
                }`}
              >
                {event.moodLine}
              </p>
            ) : null}
            <p
              className={`mt-3 font-sans text-sm leading-relaxed md:text-base ${
                event.vibe === "gathering" ? "text-sand/85" : "text-jungle/80"
              }`}
            >
              {event.summary}
            </p>
            <p
              className={`mt-4 font-sans text-sm ${
                event.vibe === "gathering" ? "text-sage/75" : "text-jungle/60"
              }`}
            >
              {event.startsOn
                ? `Dates: ${event.startsOn}${event.endsOn ? ` – ${event.endsOn}` : ""}`
                : "Dates listed only when verified."}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {event.destinationSlug ? (
                <Link
                  href={`/explore-india/${event.destinationSlug}`}
                  className={`px-4 py-2 font-sans text-sm transition ${
                    event.vibe === "gathering"
                      ? "bg-coral text-sand hover:bg-coral/90"
                      : "bg-jungle text-sand hover:bg-jungle/90"
                  }`}
                >
                  Open place
                </Link>
              ) : null}
              <Link
                href={`/contact?interest=custom-package&place=${event.destinationSlug ?? ""}`}
                className={`border px-4 py-2 font-sans text-sm transition ${
                  event.vibe === "gathering"
                    ? "border-sand/40 text-sand hover:border-sand"
                    : "border-jungle/25 text-jungle hover:border-jungle"
                }`}
              >
                Ask about a gathering
              </Link>
            </div>
            {event.isDemo ? (
              <p
                className={`demo-badge mt-4 ${
                  event.vibe === "gathering" ? "!text-sage/80 !border-sage/40" : ""
                }`}
              >
                Demo content
              </p>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
}
