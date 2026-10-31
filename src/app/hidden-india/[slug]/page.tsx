import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { LayerSection } from "@/components/hidden-india/LayerSection";
import {
  fetchHiddenIndia,
  fetchHiddenIndiaBySlug,
} from "@/lib/api/server";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const stories = await fetchHiddenIndia();
  return stories.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const story = await fetchHiddenIndiaBySlug(slug);
  return { title: story ? `${story.title} — Hidden India` : "Hidden India" };
}

export default async function HiddenIndiaPage({ params }: Props) {
  const { slug } = await params;
  const story = await fetchHiddenIndiaBySlug(slug);
  if (!story) notFound();

  return (
    <article>
      <div className="relative min-h-[70vh] w-full text-sand">
        <Image
          src={story.heroImageUrl}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-jungle via-jungle/40 to-jungle/20" />
        <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-end px-5 pb-16 pt-28 md:px-8">
          <p className="font-sans text-xs uppercase tracking-[0.18em] text-sage">
            Hidden India · {story.state}
          </p>
          <h1 className="mt-3 font-display text-4xl md:text-6xl">{story.title}</h1>
          <p className="mt-4 max-w-xl font-sans text-lg text-sand/90">{story.tagline}</p>
          {story.isDemo ? (
            <p className="mt-6 inline-block font-sans text-xs uppercase tracking-[0.12em] text-sage/90">
              Demo content
            </p>
          ) : null}
        </div>
      </div>

      <LayerSection layer={story.layerDiscover} index={1} />
      <LayerSection layer={story.layerExperience} index={2} />
      <LayerSection layer={story.layerExplore} index={3} />

      <section className="border-t border-jungle/10 bg-sage/40 py-16">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <h2 className="font-display text-2xl">Explore with Travel Jungle</h2>
          <p className="mt-2 font-sans text-sm text-jungle/70">
            Enquire about this diary.{" "}
            <Link
              href={`/explore-india/${story.destinationSlug}`}
              className="text-coral hover:underline"
            >
              View destination
            </Link>
          </p>
          <div className="mt-8">
            <EnquiryForm sourceType="hidden_india" sourceId={story.id} />
          </div>
        </div>
      </section>
    </article>
  );
}
