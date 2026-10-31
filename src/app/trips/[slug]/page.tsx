import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { fetchTripBySlug, fetchTrips } from "@/lib/api/server";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const trips = await fetchTrips();
  return trips.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const trip = await fetchTripBySlug(slug);
  return { title: trip?.title ?? "Trip" };
}

export default async function TripDetailPage({ params }: Props) {
  const { slug } = await params;
  const trip = await fetchTripBySlug(slug);
  if (!trip) notFound();

  return (
    <article>
      <div className="relative h-[45vh] min-h-[300px] w-full">
        <Image src={trip.heroImageUrl} alt="" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-sand via-sand/30 to-transparent" />
      </div>
      <div className="mx-auto max-w-3xl px-5 pb-20 pt-10 md:px-8">
        <p className="font-sans text-xs uppercase tracking-[0.14em] text-jungle/55">
          {trip.durationDays} days · India
        </p>
        <h1 className="mt-3 font-display text-4xl md:text-5xl">{trip.title}</h1>
        {trip.isDemo ? (
          <p className="demo-badge mt-4">Demo content — no live pricing or availability</p>
        ) : null}
        <p className="mt-6 font-sans text-lg leading-relaxed text-jungle/85">{trip.summary}</p>

        {trip.destinationSlug ? (
          <p className="mt-4">
            <Link
              href={`/explore-india/${trip.destinationSlug}`}
              className="font-sans text-sm text-coral hover:underline"
            >
              View place →
            </Link>
          </p>
        ) : null}

        <section className="mt-12">
          <h2 className="font-display text-2xl">Itinerary</h2>
          <ol className="mt-6 space-y-6">
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
        </section>

        {trip.inclusions.length > 0 ? (
          <section className="mt-12">
            <h2 className="font-display text-2xl">Inclusions</h2>
            <ul className="mt-4 list-disc space-y-1 pl-5 font-sans text-base text-jungle/80">
              {trip.inclusions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className="mt-16 border-t border-jungle/10 pt-12">
          <h2 className="font-display text-2xl">Enquire</h2>
          <div className="mt-6">
            <EnquiryForm sourceType="trip" sourceId={trip.id} />
          </div>
        </section>
      </div>
    </article>
  );
}
