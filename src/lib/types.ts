/** Shared types mirroring Phase 3/5 API schemas (frontend-owned for Phase 2). */

export type Destination = {
  id: string;
  slug: string;
  name: string;
  region: string;
  state: string;
  summary: string;
  heroImageUrl: string;
  editorial?: {
    pullQuote?: string;
    mapNote?: string;
  };
  isPublished: boolean;
  isDemo: boolean;
};

export type Trip = {
  id: string;
  slug: string;
  destinationSlug: string;
  title: string;
  summary: string;
  durationDays: number;
  itinerary: { day: number; title: string; body: string }[];
  inclusions: string[];
  heroImageUrl: string;
  isPublished: boolean;
  isDemo: boolean;
};

export type EventVibe = "cultural" | "gathering" | "both";

export type EventItem = {
  id: string;
  slug: string;
  destinationSlug: string | null;
  title: string;
  summary: string;
  startsOn: string | null;
  endsOn: string | null;
  locationLabel: string;
  heroImageUrl: string;
  /** cultural ritual / gathering night / mix — UI theming only in MVP */
  vibe: EventVibe;
  moodLine?: string;
  isPublished: boolean;
  isDemo: boolean;
};

export type StoryLayer = {
  headline: string;
  body: string;
  tips?: string[];
};

export type HiddenIndiaStory = {
  id: string;
  slug: string;
  destinationSlug: string;
  title: string;
  tagline: string;
  heroImageUrl: string;
  region: string;
  state: string;
  layerDiscover: StoryLayer;
  layerExperience: StoryLayer;
  layerExplore: StoryLayer;
  isPublished: boolean;
  isDemo: boolean;
};

export type TravelStory = {
  id: string;
  slug: string;
  destinationSlug: string | null;
  title: string;
  bodyMd: string;
  authorDisplay: string;
  status: "pending" | "approved" | "rejected";
  source: "editorial" | "community";
  heroImageUrl: string;
  isDemo: boolean;
};
