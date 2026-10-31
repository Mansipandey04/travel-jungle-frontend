import type { Metadata } from "next";
import Image from "next/image";
import { EventList } from "@/components/event/EventList";
import { fetchEvents } from "@/lib/api/server";

export const metadata: Metadata = { title: "Events" };

const heroImage =
  "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=2000&q=80";

export default async function EventsPage() {
  const events = await fetchEvents();

  return (
    <div className="pb-20">
      <section className="relative min-h-[52vh] overflow-hidden text-sand">
        <Image
          src={heroImage}
          alt="Festival gathering under warm lights"
          fill
          priority
          className="object-cover object-center brightness-[0.55] contrast-[1.05]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(24,61,43,0.75)_0%,rgba(24,61,43,0.55)_45%,rgba(24,61,43,0.92)_100%)]" />

        <div className="relative z-10 mx-auto flex min-h-[52vh] max-w-6xl flex-col justify-end px-5 pb-12 pt-28 md:px-8 md:pb-16">
          <div className="max-w-2xl rounded-sm bg-jungle/80 p-6 shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-sm md:p-8">
            <p className="font-sans text-xs uppercase tracking-[0.2em] text-gold">
              Culture by day · gathering by night
            </p>
            <h1 className="mt-3 font-display text-4xl text-sand md:text-6xl">Events</h1>
            <p className="mt-4 font-sans text-base leading-relaxed text-sand/95 md:text-lg">
              India festivals and gatherings from the live API. Dates only when verified.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="bg-sand px-3 py-1.5 font-sans text-xs uppercase tracking-[0.14em] text-jungle">
                Cultural
              </span>
              <span className="bg-coral px-3 py-1.5 font-sans text-xs uppercase tracking-[0.14em] text-sand">
                Gathering
              </span>
              <span className="bg-gold px-3 py-1.5 font-sans text-xs uppercase tracking-[0.14em] text-jungle">
                Culture + night out
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 pt-14 md:px-8">
        {events.length > 0 ? (
          <EventList items={events} />
        ) : (
          <p className="font-sans text-base text-jungle/70">
            No published events in the API yet. Add them via admin, or keep browsing Explore India
            and Stories.
          </p>
        )}
      </div>
    </div>
  );
}
