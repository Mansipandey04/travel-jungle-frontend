import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import {
  fetchDestinationBySlug,
  fetchDestinations,
  fetchHiddenIndiaForDestination,
  fetchStories,
  fetchTrips,
  storiesForDestination,
  tripsForDestination,
} from "@/lib/api/server";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const destinations = await fetchDestinations();
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const dest = await fetchDestinationBySlug(slug);
  return { title: dest?.name ?? "Destination" };
}

export default async function DestinationDetailPage({ params }: Props) {
  const { slug } = await params;
  const dest = await fetchDestinationBySlug(slug);
  if (!dest) notFound();

  const [trips, stories, diary] = await Promise.all([
    fetchTrips(),
    fetchStories(),
    fetchHiddenIndiaForDestination(dest.slug),
  ]);
  const trip = tripsForDestination(trips, dest.slug)[0];
  const relatedStories = storiesForDestination(stories, dest.slug);

  return (
    <article>
      <div className="relative h-[55vh] min-h-[360px] w-full">
        <Image
          src={dest.heroImageUrl}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-sand via-sand/20 to-transparent" />
      </div>
      <div className="mx-auto max-w-3xl px-5 pb-20 pt-10 md:px-8">
        <p className="font-sans text-xs uppercase tracking-[0.14em] text-jungle/55">
          {dest.region} · {dest.state}
        </p>
        <h1 className="mt-3 font-display text-4xl md:text-5xl">{dest.name}</h1>
        {dest.isDemo ? <p className="demo-badge mt-4">Demo content</p> : null}
        <p className="mt-6 font-sans text-lg leading-relaxed text-jungle/85">{dest.summary}</p>
        {dest.editorial?.pullQuote ? (
          <blockquote className="mt-10 border-l-2 border-gold pl-5 font-display text-2xl text-jungle/90">
            {dest.editorial.pullQuote}
          </blockquote>
        ) : null}
        {dest.editorial?.mapNote ? (
          <p className="mt-6 font-sans text-sm text-jungle/70">{dest.editorial.mapNote}</p>
        ) : null}
        {diary ? (
          <p className="mt-8">
            <Link
              href={`/hidden-india/${diary.slug}`}
              className="font-sans text-coral hover:underline"
            >
              Read the Hidden India diary →
            </Link>
          </p>
        ) : null}

        {trip ? (
          <section className="mt-16 border-t border-jungle/10 pt-12">
            <p className="font-sans text-xs uppercase tracking-[0.14em] text-coral">
              Trip · {trip.durationDays} days
            </p>
            <h2 className="mt-2 font-display text-3xl">{trip.title}</h2>
            <p className="mt-3 font-sans text-base text-jungle/80">{trip.summary}</p>
            <ol className="mt-8 space-y-5">
              {trip.itinerary.map((day) => (
                <li key={day.day}>
                  <p className="font-sans text-xs uppercase tracking-[0.14em] text-coral">
                    Day {day.day}
                  </p>
                  <h3 className="mt-1 font-display text-xl">{day.title}</h3>
                  <p className="mt-2 font-sans text-base text-jungle/80">{day.body}</p>
                </li>
              ))}
            </ol>
            <p className="mt-6">
              <Link href={`/trips/${trip.slug}`} className="font-sans text-coral hover:underline">
                Open full trip page →
              </Link>
            </p>
          </section>
        ) : null}

        <section className="mt-16 border-t border-jungle/10 pt-12">
          <h2 className="font-display text-2xl">Linked stories</h2>
          {relatedStories.length > 0 ? (
            <ul className="mt-5 space-y-4">
              {relatedStories.map((story) => (
                <li key={story.id}>
                  <p className="font-display text-xl">{story.title}</p>
                  <p className="mt-1 font-sans text-sm text-jungle/75">{story.bodyMd}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 font-sans text-sm text-jungle/65">
              No approved stories linked yet. Share one from Stories — it starts as pending.
            </p>
          )}
          <Link
            href={`/contact?interest=custom-package&place=${dest.slug}`}
            className="mt-5 inline-block font-sans text-sm text-coral hover:underline"
          >
            Request a custom package from stories →
          </Link>
        </section>

        <section className="mt-16 border-t border-jungle/10 pt-12">
          <h2 className="font-display text-2xl">Enquire</h2>
          <p className="mt-2 font-sans text-sm text-jungle/70">
            Submits live to the backend enquiry API (rate-limited).
          </p>
          <div className="mt-6">
            <EnquiryForm sourceType="destination" sourceId={dest.id} />
          </div>
        </section>
      </div>
    </article>
  );
}
