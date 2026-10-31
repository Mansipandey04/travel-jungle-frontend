import Image from "next/image";
import Link from "next/link";
import type { Destination, TravelStory } from "@/lib/types";

export function StoryList({
  items,
  destinations = [],
}: {
  items: TravelStory[];
  destinations?: Destination[];
}) {
  const bySlug = new Map(destinations.map((d) => [d.slug, d]));

  return (
    <ul className="space-y-12">
      {items.map((story, index) => {
        const place = story.destinationSlug
          ? bySlug.get(story.destinationSlug)
          : undefined;

        return (
          <li
            key={story.id}
            className="story-card grid gap-6 border-b border-jungle/10 pb-12 md:grid-cols-[1.05fr_1fr] md:items-center"
            style={{ animationDelay: `${index * 90}ms` }}
          >
            <div className="group relative aspect-[16/10] overflow-hidden">
              <Image
                src={story.heroImageUrl}
                alt=""
                fill
                className="story-photo object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-jungle/35 via-transparent to-transparent" />
            </div>

            <div>
              <p className="font-sans text-xs uppercase tracking-[0.14em] text-jungle/55">
                {story.source === "editorial" ? "Editorial" : "Community"} · {story.authorDisplay}
              </p>
              <h2 className="mt-2 font-display text-3xl">{story.title}</h2>
              <p className="mt-3 max-w-2xl font-sans text-base leading-relaxed text-jungle/80">
                {story.bodyMd}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
                {place ? (
                  <Link
                    href={`/explore-india/${place.slug}`}
                    className="font-sans text-sm text-coral hover:underline"
                  >
                    Explore place: {place.name} →
                  </Link>
                ) : (
                  <p className="font-sans text-sm text-jungle/55">
                    Place link coming later — or ask us to shape a custom package from this story.
                  </p>
                )}
                <Link
                  href={`/contact?interest=custom-package&story=${story.slug}`}
                  className="font-sans text-sm text-jungle underline-offset-2 hover:text-coral hover:underline"
                >
                  Request a custom package
                </Link>
              </div>

              {story.isDemo ? <p className="demo-badge mt-4">Demo content</p> : null}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
