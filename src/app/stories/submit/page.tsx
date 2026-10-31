import type { Metadata } from "next";
import Link from "next/link";
import { CommunitySubmitForm } from "@/components/forms/CommunitySubmitForm";
import { fetchDestinations } from "@/lib/api/server";

export const metadata: Metadata = { title: "Share a story" };

export default async function StorySubmitPage() {
  const destinations = await fetchDestinations();

  return (
    <div className="mx-auto max-w-3xl px-5 pb-20 pt-28 md:px-8 md:pt-32">
      <header className="mb-10">
        <p className="font-sans text-xs uppercase tracking-[0.14em] text-jungle/55">
          Stories
        </p>
        <h1 className="mt-2 font-display text-4xl md:text-5xl">Share a story</h1>
        <p className="mt-4 font-sans text-lg text-jungle/75">
          India places only. Submissions stay pending until approved — we don&apos;t invent
          testimonials.
        </p>
        <Link href="/stories" className="mt-4 inline-block font-sans text-sm text-coral hover:underline">
          ← Back to stories
        </Link>
      </header>
      <CommunitySubmitForm destinations={destinations} />
    </div>
  );
}
