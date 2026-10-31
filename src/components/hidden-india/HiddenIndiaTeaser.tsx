import Image from "next/image";
import Link from "next/link";
import type { HiddenIndiaStory } from "@/lib/types";

export function HiddenIndiaTeaser({ items }: { items: HiddenIndiaStory[] }) {
  return (
    <ul className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((story) => (
        <li key={story.id}>
          <Link href={`/hidden-india/${story.slug}`} className="group block">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={story.heroImageUrl}
                alt=""
                fill
                className="object-cover transition duration-700 group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-jungle/70 via-jungle/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-sand">
                <p className="font-sans text-xs uppercase tracking-[0.14em] text-sage">
                  {story.state}
                </p>
                <h3 className="mt-1 font-display text-2xl">{story.title}</h3>
              </div>
            </div>
            <p className="mt-3 font-sans text-sm text-jungle/75">{story.tagline}</p>
            {story.isDemo ? <p className="demo-badge mt-2">Demo content</p> : null}
          </Link>
        </li>
      ))}
    </ul>
  );
}
