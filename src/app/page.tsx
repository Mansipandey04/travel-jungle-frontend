import Image from "next/image";
import Link from "next/link";
import { HiddenIndiaTeaser } from "@/components/hidden-india/HiddenIndiaTeaser";
import { brand } from "@/lib/brand";
import { fetchHiddenIndia } from "@/lib/api/server";

const heroImage =
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2000&q=80";

export default async function HomePage() {
  const hiddenIndiaStories = await fetchHiddenIndia();
  const diaryCta = hiddenIndiaStories[0];

  return (
    <>
      <section className="relative min-h-[100svh] overflow-hidden text-sand">
        <Image
          src={heroImage}
          alt="Himalayan valley light across Indian ridgelines"
          fill
          priority
          className="animate-hero-media object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-jungle via-jungle/45 to-jungle/25" />
        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pb-20 pt-28 md:px-8 md:pb-28">
          <p className="animate-fade-up font-display text-4xl text-sand md:text-6xl lg:text-7xl">
            {brand.name}
          </p>
          <h1 className="animate-fade-up-delay mt-4 max-w-2xl font-display text-2xl leading-snug text-sage md:text-3xl">
            {brand.tagline}
          </h1>
          <p className="animate-fade-up-delay mt-4 max-w-lg font-sans text-base text-sand/85 md:text-lg">
            Editorial journeys into India&apos;s quieter places — destinations, diaries, and stories
            rooted in the subcontinent alone.
          </p>
          <div className="animate-fade-up-delay mt-8 flex flex-wrap gap-4">
            <Link
              href="/explore-india"
              className="bg-coral px-6 py-3 font-sans text-sm text-sand transition hover:bg-coral/90"
            >
              Explore India
            </Link>
            {diaryCta ? (
              <Link
                href={`/hidden-india/${diaryCta.slug}`}
                className="border border-sand/40 px-6 py-3 font-sans text-sm text-sand transition hover:border-sand"
              >
                Open a Hidden India diary
              </Link>
            ) : null}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <h2 className="font-display text-3xl md:text-4xl">Hidden India Diaries</h2>
        <p className="mt-3 max-w-2xl font-sans text-base text-jungle/75">
          Discover, Experience, and Explore with Travel Jungle — live diary layers from the API.
        </p>
        <div className="mt-12">
          {hiddenIndiaStories.length > 0 ? (
            <HiddenIndiaTeaser items={hiddenIndiaStories} />
          ) : (
            <p className="font-sans text-base text-jungle/70">
              No diaries from the API yet. Start the backend and run seed if needed.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
