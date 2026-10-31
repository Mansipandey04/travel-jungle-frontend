import Link from "next/link";
import { brand } from "@/lib/brand";

export function Footer() {
  return (
    <footer className="border-t border-jungle/10 bg-jungle text-sand">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 md:flex-row md:items-end md:justify-between md:px-8">
        <div className="max-w-md">
          <p className="font-display text-2xl">{brand.name}</p>
          <p className="mt-2 font-sans text-sm text-sage">{brand.tagline}</p>
          <p className="mt-4 font-sans text-sm text-sage/90">{brand.scopeNote}</p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 font-sans text-sm">
          <Link href="/explore-india" className="hover:text-gold">
            Explore India
          </Link>
          <Link href="/hidden-india/majuli" className="hover:text-gold">
            Hidden India
          </Link>
          <Link href="/stories" className="hover:text-gold">
            Stories
          </Link>
          <Link href="/stories/submit" className="hover:text-gold">
            Share a story
          </Link>
          <Link href="/contact" className="hover:text-gold">
            Contact
          </Link>
        </div>
      </div>
      <div className="border-t border-sand/10">
        <p className="mx-auto max-w-6xl px-5 py-4 font-sans text-xs text-sage/80 md:px-8">
          Demo content is labelled where shown. We never present invented prices, ratings, or
          testimonials as real.
        </p>
      </div>
    </footer>
  );
}
