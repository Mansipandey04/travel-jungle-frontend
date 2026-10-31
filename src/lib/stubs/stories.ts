import type { TravelStory } from "@/lib/types";

/**
 * Editorial / approved stories.
 * `destinationSlug` set = linked to Explore India place.
 * `destinationSlug` null = place link planned for later (or open for custom packaging).
 */
export const stories: TravelStory[] = [
  {
    id: "story-root-bridge-walk",
    slug: "walking-to-the-root-bridge",
    destinationSlug: "double-decker-living-root-bridge",
    title: "Walking to the Root Bridge",
    bodyMd:
      "The path to Nongriat is a long stone descent through humid forest. This editorial note stays with place and footing — not ratings, prices, or invented quotes.",
    authorDisplay: "Travel Jungle Editorial",
    status: "approved",
    source: "editorial",
    heroImageUrl:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1600&q=80",
    isDemo: true,
  },
  {
    id: "story-tirthan-morning",
    slug: "tirthan-morning-light",
    destinationSlug: "tirthan-valley",
    title: "Tirthan Morning Light",
    bodyMd:
      "Mist lifts off the Tirthan in thin layers. An editorial sketch of a Himalayan valley morning — demo copy for Phase 2.",
    authorDisplay: "Travel Jungle Editorial",
    status: "approved",
    source: "editorial",
    heroImageUrl:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1600&q=80",
    isDemo: true,
  },
  {
    id: "story-hampi-stone",
    slug: "hampi-after-the-heat",
    destinationSlug: "hampi",
    title: "Hampi After the Heat",
    bodyMd:
      "Late light softens the granite. An editorial walk through quieter temple clusters — linked to the Hampi place card on Explore India.",
    authorDisplay: "Travel Jungle Editorial",
    status: "approved",
    source: "editorial",
    heroImageUrl:
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1600&q=80",
    isDemo: true,
  },
  {
    id: "story-majuli-ferry",
    slug: "ferry-light-on-majuli",
    destinationSlug: "majuli",
    title: "Ferry Light on Majuli",
    bodyMd:
      "Crossing toward the island, the Brahmaputra feels wider than any schedule. Place-linked editorial note for Majuli.",
    authorDisplay: "Travel Jungle Editorial",
    status: "approved",
    source: "editorial",
    heroImageUrl:
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1600&q=80",
    isDemo: true,
  },
  {
    id: "story-monsoon-notebook",
    slug: "monsoon-notebook",
    destinationSlug: null,
    title: "Monsoon Notebook",
    bodyMd:
      "Rain patterns, ferry delays, and tea-stall pauses across more than one state. Destination link will be added when the route is verified — or shaped into a custom package from reader notes.",
    authorDisplay: "Travel Jungle Editorial",
    status: "approved",
    source: "editorial",
    heroImageUrl:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1600&q=80",
    isDemo: true,
  },
  {
    id: "story-open-road-north",
    slug: "open-road-north",
    destinationSlug: null,
    title: "Open Road North",
    bodyMd:
      "A composite of ridge roads and valley nights. Not tied to a single Explore India place yet — future link or custom itinerary seed.",
    authorDisplay: "Travel Jungle Editorial",
    status: "approved",
    source: "editorial",
    heroImageUrl:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80",
    isDemo: true,
  },
];

export function getStoryBySlug(slug: string): TravelStory | undefined {
  return stories.find((s) => s.slug === slug);
}

export function getStoriesForDestination(destinationSlug: string): TravelStory[] {
  return stories.filter(
    (s) => s.status === "approved" && s.destinationSlug === destinationSlug,
  );
}

export function getUnlinkedStories(): TravelStory[] {
  return stories.filter((s) => s.status === "approved" && !s.destinationSlug);
}
