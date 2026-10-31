import type { Metadata } from "next";
import Link from "next/link";
import { brand } from "@/lib/brand";

export const metadata: Metadata = { title: "About" };

const pillars = [
  {
    title: "Hidden gems of India",
    body: "Extraordinary places beyond the tourist crowds — quiet valleys, living trails, river islands, and stone cities that deserve to be discovered.",
  },
  {
    title: "Curated group adventures",
    body: "Illustrative journeys with like-minded wanderers. We pace the story first; live prices and departures appear only when verified.",
  },
  {
    title: "Parties & social events",
    body: "Cultural evenings, riverside gathers, music nights, and terrace energy — come for the place, stay for the people.",
  },
  {
    title: "A community, not just a trip",
    body: "Share stories, meet your tribe, and return for the next chapter. Strangers can leave as friends — and come back as family.",
  },
  {
    title: "Experiences over itineraries",
    body: "The best memories aren’t only where you go, but who you go with. Diaries, stories, and gatherings keep the human side first.",
  },
];

export default function AboutPage() {
  return (
    <div className="pb-20">
      <section className="border-b border-jungle/10 bg-jungle text-sand">
        <div className="mx-auto max-w-3xl px-5 pb-16 pt-28 md:px-8 md:pt-32 md:pb-20">
          <p className="font-sans text-xs uppercase tracking-[0.18em] text-gold">
            About {brand.name}
          </p>
          <h1 className="mt-4 font-display text-4xl leading-tight md:text-5xl">
            Discover the Hidden.
            <br />
            Experience the Extraordinary.
          </h1>
          <p className="mt-6 font-display text-xl text-sage md:text-2xl">{brand.tagline}</p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-5 pt-12 md:px-8 md:pt-16">
        <p className="font-sans text-lg leading-relaxed text-jungle/85">
          Travel Jungle is more than a travel feed — it&apos;s a vibe, an adventure, and a place
          where strangers can become unforgettable travel buddies.
        </p>
        <p className="mt-5 font-sans text-lg leading-relaxed text-jungle/85">
          We believe the best stories live beyond the usual tourist spots. That&apos;s why our
          signature is exploring the{" "}
          <strong className="font-sans font-medium text-jungle">hidden gems of India</strong> —
          untouched landscapes, secret waterfalls, unexplored trails, peaceful mountain escapes,
          and breathtaking places that deserve to be found.
        </p>
        <p className="mt-5 font-sans text-lg leading-relaxed text-jungle/85">
          But the adventure doesn&apos;t stop at traveling. From thrilling group trips and offbeat
          getaways to electrifying parties, music nights, and social events, we bring people
          together for experiences worth remembering — India only.
        </p>

        <h2 className="mt-14 font-display text-3xl md:text-4xl">What makes us different</h2>
        <ul className="mt-8 space-y-8">
          {pillars.map((item) => (
            <li key={item.title} className="border-l-2 border-coral pl-5">
              <h3 className="font-display text-xl text-jungle">{item.title}</h3>
              <p className="mt-2 font-sans text-base leading-relaxed text-jungle/75">{item.body}</p>
            </li>
          ))}
        </ul>

        <section className="mt-14 border border-jungle/10 bg-sage/35 px-6 py-8 md:px-8">
          <h2 className="font-display text-2xl md:text-3xl">Our philosophy</h2>
          <p className="mt-4 font-display text-xl leading-snug text-jungle md:text-2xl">
            Less ordinary. More adventure. More connections. More memories.
          </p>
          <p className="mt-5 font-sans text-base leading-relaxed text-jungle/80">
            Whether you&apos;re chasing sunsets in the mountains, discovering India&apos;s
            best-kept secrets, dancing under the stars, or simply looking for your next adventure
            squad — Travel Jungle is where you belong.
          </p>
          <p className="mt-5 font-sans text-base font-medium text-jungle">
            Explore the unexplored. Meet your tribe. Live the vibe.
          </p>
          <p className="mt-6 font-display text-xl text-coral">
            Welcome to Travel Jungle — your adventure, your people, your story.
          </p>
        </section>

        <p className="mt-10 font-sans text-sm text-jungle/60">
          Demo content on the site is labelled. We never invent prices, ratings, or testimonials as
          real. {brand.scopeNote}
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/explore-india"
            className="bg-coral px-5 py-2.5 font-sans text-sm text-sand transition hover:bg-coral/90"
          >
            Explore India
          </Link>
          <Link
            href="/events"
            className="border border-jungle/30 px-5 py-2.5 font-sans text-sm text-jungle transition hover:border-jungle hover:bg-jungle hover:text-sand"
          >
            See events
          </Link>
          <Link
            href="/stories"
            className="border border-jungle/30 px-5 py-2.5 font-sans text-sm text-jungle transition hover:border-jungle hover:bg-jungle hover:text-sand"
          >
            Read stories
          </Link>
        </div>
      </div>
    </div>
  );
}
