import Image from "next/image";
import Link from "next/link";
import type { Destination } from "@/lib/types";

export function DestinationList({ items }: { items: Destination[] }) {
  return (
    <ul className="divide-y divide-jungle/10">
      {items.map((d) => (
        <li key={d.id} className="grid gap-6 py-10 md:grid-cols-[1.1fr_1fr] md:items-center">
          <Link href={`/explore-india/${d.slug}`} className="group relative block aspect-[16/10] overflow-hidden">
            <Image
              src={d.heroImageUrl}
              alt=""
              fill
              className="object-cover transition duration-700 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </Link>
          <div>
            <p className="font-sans text-xs uppercase tracking-[0.14em] text-jungle/55">
              {d.region} · {d.state}
            </p>
            <h2 className="mt-2 font-display text-3xl md:text-4xl">
              <Link href={`/explore-india/${d.slug}`} className="hover:text-coral">
                {d.name}
              </Link>
            </h2>
            <p className="mt-3 max-w-prose font-sans text-base leading-relaxed text-jungle/80">
              {d.summary}
            </p>
            {d.isDemo ? <p className="demo-badge mt-4">Demo content</p> : null}
          </div>
        </li>
      ))}
    </ul>
  );
}
