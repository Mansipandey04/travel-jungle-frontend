import type {
  Destination,
  EventItem,
  HiddenIndiaStory,
  TravelStory,
  Trip,
} from "@/lib/types";
import type {
  ApiDestination,
  ApiEvent,
  ApiHiddenIndia,
  ApiStory,
  ApiTrip,
} from "@/lib/api/types";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1600&q=80";

export function imageOrFallback(url: string | null | undefined): string {
  return url && url.trim() ? url : FALLBACK_IMAGE;
}

export function mapDestination(api: ApiDestination): Destination {
  const editorial = api.editorial ?? undefined;
  return {
    id: String(api.id),
    slug: api.slug,
    name: api.name,
    region: api.region,
    state: api.state,
    summary: api.summary,
    heroImageUrl: imageOrFallback(api.hero_image_url),
    editorial: editorial
      ? {
          pullQuote:
            typeof editorial.pull_quote === "string"
              ? editorial.pull_quote
              : typeof editorial.pullQuote === "string"
                ? editorial.pullQuote
                : undefined,
          mapNote:
            typeof editorial.map_note === "string"
              ? editorial.map_note
              : typeof editorial.mapNote === "string"
                ? editorial.mapNote
                : undefined,
        }
      : undefined,
    isPublished: api.is_published,
    isDemo: api.is_demo,
  };
}

export function mapTrip(
  api: ApiTrip,
  destinationById: Map<number, Destination>,
): Trip {
  const dest = destinationById.get(api.destination_id);
  return {
    id: String(api.id),
    slug: api.slug,
    destinationSlug: dest?.slug ?? "",
    title: api.title,
    summary: api.summary,
    durationDays: api.duration_days ?? 1,
    itinerary: (api.itinerary ?? []).map((day) => ({
      day: day.day,
      title: day.title,
      body: day.summary,
    })),
    inclusions: Array.isArray(api.inclusions) ? api.inclusions : [],
    heroImageUrl: imageOrFallback(api.hero_image_url ?? dest?.heroImageUrl),
    isPublished: api.is_published,
    isDemo: api.is_demo,
  };
}

export function mapEvent(
  api: ApiEvent,
  destinationById: Map<number, Destination>,
): EventItem {
  const dest = api.destination_id
    ? destinationById.get(api.destination_id)
    : undefined;
  return {
    id: String(api.id),
    slug: api.slug,
    destinationSlug: dest?.slug ?? null,
    title: api.title,
    summary: api.summary,
    startsOn: api.starts_on,
    endsOn: api.ends_on,
    locationLabel: api.location_label ?? dest?.name ?? "India",
    heroImageUrl: imageOrFallback(api.hero_image_url ?? dest?.heroImageUrl),
    vibe: "both",
    moodLine: "Culture · gathering · India only",
    isPublished: api.is_published,
    isDemo: api.is_demo,
  };
}

export function mapHiddenIndia(
  api: ApiHiddenIndia,
  destinationById: Map<number, Destination>,
): HiddenIndiaStory {
  const dest = destinationById.get(api.destination_id);
  return {
    id: String(api.id),
    slug: api.slug,
    destinationSlug: dest?.slug ?? api.slug,
    title: api.title,
    tagline: api.tagline,
    heroImageUrl: imageOrFallback(dest?.heroImageUrl),
    region: dest?.region ?? "India",
    state: dest?.state ?? "",
    layerDiscover: {
      headline: api.layer_discover.headline,
      body: api.layer_discover.body,
      tips: api.layer_discover.tips,
    },
    layerExperience: {
      headline: api.layer_experience.headline,
      body: api.layer_experience.body,
      tips: api.layer_experience.tips,
    },
    layerExplore: {
      headline: api.layer_explore.headline,
      body: api.layer_explore.body,
      tips: api.layer_explore.tips,
    },
    isPublished: api.is_published,
    isDemo: api.is_demo,
  };
}

export function mapStory(
  api: ApiStory,
  destinationById: Map<number, Destination>,
): TravelStory {
  const dest = api.destination_id
    ? destinationById.get(api.destination_id)
    : undefined;
  return {
    id: String(api.id),
    slug: api.slug,
    destinationSlug: dest?.slug ?? null,
    title: api.title,
    bodyMd: api.body_md,
    authorDisplay: api.author_display,
    status: (api.status as TravelStory["status"]) || "approved",
    source: (api.source as TravelStory["source"]) || "editorial",
    heroImageUrl: imageOrFallback(dest?.heroImageUrl),
    isDemo: api.is_demo,
  };
}
