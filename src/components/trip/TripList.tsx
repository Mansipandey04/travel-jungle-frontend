import Link from "next/link";
import type { Trip } from "@/lib/types";

export function TripList({ items }: { items: Trip[] }) {
  return (
    <ul className="space-y-10">
      {items.map((trip) => (
        <li key={trip.id} className="border-b border-jungle/10 pb-10">
          <p className="font-sans text-xs uppercase tracking-[0.14em] text-jungle/55">
            {trip.durationDays} days · India
          </p>
          <h2 className="mt-2 font-display text-3xl">
            <Link href={`/trips/${trip.slug}`} className="hover:text-coral">
              {trip.title}
            </Link>
          </h2>
          <p className="mt-3 max-w-2xl font-sans text-base leading-relaxed text-jungle/80">
            {trip.summary}
          </p>
          {trip.isDemo ? <p className="demo-badge mt-4">Demo content — no live pricing</p> : null}
        </li>
      ))}
    </ul>
  );
}
