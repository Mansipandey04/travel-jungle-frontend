import Image from "next/image";
import Link from "next/link";
import type { Destination, TravelStory, Trip } from "@/lib/types";

export function PlaceTripCard({
  place,
  trip,
  stories = [],
}: {
  place: Destination;
  trip?: Trip;
  stories?: TravelStory[];
}) {
  return (
    <article className="border border-jungle/10 bg-sand">
      <div className="grid gap-0 lg:grid-cols-[1.05fr_1fr]">
        <Link
          href={`/explore-india/${place.slug}`}
          className="group relative block min-h-[260px] overflow-hidden lg:min-h-full"
        >
          <Image
            src={place.heroImageUrl}
            alt=""
            fill
            className="object-cover transition duration-700 group-hover:scale-[1.03]"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-jungle/50 to-transparent lg:bg-gradient-to-r" />
        </Link>

        <div className="flex flex-col p-6 md:p-8">
          <p className="font-sans text-xs uppercase tracking-[0.14em] text-jungle/55">
            {place.region} · {place.state}
          </p>
          <h2 className="mt-2 font-display text-3xl md:text-4xl">
            <Link href={`/explore-india/${place.slug}`} className="hover:text-coral">
              {place.name}
            </Link>
          </h2>
          <p className="mt-3 font-sans text-base leading-relaxed text-jungle/80">
            {place.summary}
          </p>
          {place.editorial?.mapNote ? (
            <p className="mt-3 font-sans text-sm text-jungle/65">{place.editorial.mapNote}</p>
          ) : null}
          {place.isDemo ? <p className="demo-badge mt-4">Demo content</p> : null}

          {trip ? (
            <div className="mt-8 border-t border-jungle/10 pt-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <p className="font-sans text-xs uppercase tracking-[0.14em] text-coral">
                    Trip · {trip.durationDays} days
                  </p>
                  <h3 className="mt-1 font-display text-2xl">
                    <Link href={`/trips/${trip.slug}`} className="hover:text-coral">
                      {trip.title}
                    </Link>
                  </h3>
                </div>
                {trip.isDemo ? (
                  <p className="demo-badge">No live pricing</p>
                ) : null}
              </div>
              <p className="mt-3 font-sans text-sm leading-relaxed text-jungle/75">
                {trip.summary}
              </p>

              <ol className="mt-5 space-y-3">
                {trip.itinerary.map((day) => (
                  <li key={day.day} className="grid grid-cols-[auto_1fr] gap-3">
                    <span className="font-sans text-xs font-medium uppercase tracking-[0.12em] text-coral">
                      Day {day.day}
                    </span>
                    <div>
                      <p className="font-display text-lg leading-snug">{day.title}</p>
                      <p className="mt-0.5 font-sans text-sm text-jungle/70">{day.body}</p>
                    </div>
                  </li>
                ))}
              </ol>

              {trip.inclusions.length > 0 ? (
                <p className="mt-5 font-sans text-xs text-jungle/60">
                  Includes: {trip.inclusions.join(" · ")}
                </p>
              ) : null}

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={`/trips/${trip.slug}`}
                  className="bg-jungle px-4 py-2 font-sans text-sm text-sand transition hover:bg-jungle/90"
                >
                  Full trip
                </Link>
                <Link
                  href={`/explore-india/${place.slug}`}
                  className="border border-jungle/25 px-4 py-2 font-sans text-sm text-jungle transition hover:border-jungle"
                >
                  Place details
                </Link>
              </div>
            </div>
          ) : (
            <div className="mt-8 border-t border-jungle/10 pt-6">
              <p className="font-sans text-sm text-jungle/65">
                No demo itinerary for this place yet.
              </p>
              <Link
                href={`/explore-india/${place.slug}`}
                className="mt-4 inline-flex border border-jungle/25 px-4 py-2 font-sans text-sm text-jungle transition hover:border-jungle"
              >
                Place details
              </Link>
            </div>
          )}

          <div className="mt-8 border-t border-jungle/10 pt-6">
            <p className="font-sans text-xs uppercase tracking-[0.14em] text-jungle/55">
              Stories
            </p>
            {stories.length > 0 ? (
              <ul className="mt-3 space-y-2">
                {stories.map((story) => (
                  <li key={story.id}>
                    <Link
                      href="/stories"
                      className="font-sans text-sm text-coral hover:underline"
                    >
                      {story.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 font-sans text-sm text-jungle/60">
                No linked story yet — community notes can be attached later, or used to sketch a
                custom package.
              </p>
            )}
            <Link
              href={`/contact?interest=custom-package&place=${place.slug}`}
              className="mt-4 inline-block font-sans text-sm text-jungle underline-offset-2 hover:text-coral hover:underline"
            >
              Request a custom package for {place.name}
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
