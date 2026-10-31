import type { Metadata } from "next";
import Link from "next/link";
import { StoryList } from "@/components/story/StoryList";
import { fetchDestinations, fetchStories } from "@/lib/api/server";

export const metadata: Metadata = { title: "Stories" };

export default async function StoriesPage() {
  const [stories, destinations] = await Promise.all([
    fetchStories(),
    fetchDestinations(),
  ]);
  const linked = stories.filter((s) => s.destinationSlug);
  const unlinked = stories.filter((s) => !s.destinationSlug);

  return (
    <div className="mx-auto max-w-6xl px-5 pb-20 pt-28 md:px-8 md:pt-32">
      <header className="max-w-2xl">
        <h1 className="font-display text-4xl md:text-5xl">Stories</h1>
        <p className="mt-4 font-sans text-lg text-jungle/75">
          Approved stories from the API. Share yours for review — submissions start as pending.
        </p>
        <p className="mt-4 font-sans text-sm text-jungle/65">
          {stories.length} published · {linked.length} linked to places · {unlinked.length} open
          · {destinations.length} places available to link
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="#read"
            className="border border-jungle/25 px-4 py-2 font-sans text-sm text-jungle transition hover:border-jungle hover:bg-jungle hover:text-sand"
          >
            Read stories
          </Link>
          <Link
            href="/stories/submit"
            className="bg-coral px-4 py-2 font-sans text-sm text-sand transition hover:bg-coral/90"
          >
            Share your story
          </Link>
        </div>
      </header>

      <section className="mt-12 max-w-2xl border border-jungle/10 bg-sage/30 px-5 py-6 md:px-6">
        <h2 className="font-display text-2xl">Custom packages from stories</h2>
        <p className="mt-3 font-sans text-sm leading-relaxed text-jungle/75">
          Like a story&apos;s pacing? Ask for a demo itinerary inspired by it — no invented prices.
        </p>
        <Link
          href="/contact?interest=custom-package"
          className="mt-4 inline-block bg-jungle px-5 py-2.5 font-sans text-sm text-sand transition hover:bg-jungle/90"
        >
          Talk about a custom package
        </Link>
      </section>

      <section id="read" className="scroll-mt-28 mt-14">
        {stories.length > 0 ? (
          <StoryList items={stories} destinations={destinations} />
        ) : (
          <p className="font-sans text-base text-jungle/70">
            No approved stories yet. Be the first to{" "}
            <Link href="/stories/submit" className="text-coral hover:underline">
              share a story
            </Link>
            .
          </p>
        )}
      </section>

      <section id="share" className="mt-16 scroll-mt-28 border-t border-jungle/10 pt-14">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl">Share with Travel Jungle</h2>
          <p className="mt-3 font-sans text-base text-jungle/75">
            Posts go to <code className="text-sm">POST /api/v1/community/stories</code> and stay
            pending until an admin approves them.
          </p>
          <Link
            href="/stories/submit"
            className="mt-6 inline-block bg-coral px-6 py-3 font-sans text-sm text-sand hover:bg-coral/90"
          >
            Open submit form
          </Link>
        </div>
      </section>
    </div>
  );
}
