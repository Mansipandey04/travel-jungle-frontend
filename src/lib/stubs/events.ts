import type { EventItem } from "@/lib/types";

/**
 * Demo events — dates omitted unless verified.
 * Vibes mix cultural tradition with gathering / party energy.
 */
export const events: EventItem[] = [
  {
    id: "evt-ziro-season",
    slug: "ziro-harvest-season",
    destinationSlug: "ziro-valley",
    title: "Ziro harvest season",
    summary:
      "Apatani field rhythms, shared meals, and evening music under pine light — culture first, gathering energy included. Specific festival tickets are not asserted here.",
    startsOn: null,
    endsOn: null,
    locationLabel: "Ziro Valley, Arunachal Pradesh",
    heroImageUrl:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1600&q=80",
    vibe: "both",
    moodLine: "Harvest tables · night music · valley glow",
    isPublished: true,
    isDemo: true,
  },
  {
    id: "evt-majuli-satra",
    slug: "majuli-satra-visits",
    destinationSlug: "majuli",
    title: "Majuli satra evenings",
    summary:
      "Satra courtyards, lamp light, and community welcome on the island. Timed programmes appear only when verified — come for culture, stay for the shared night.",
    startsOn: null,
    endsOn: null,
    locationLabel: "Majuli, Assam",
    heroImageUrl:
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1600&q=80",
    vibe: "cultural",
    moodLine: "Courtyard lamps · chorus · river quiet",
    isPublished: true,
    isDemo: true,
  },
  {
    id: "evt-shnongpdeng-river",
    slug: "umngot-riverside-gathering",
    destinationSlug: "shnongpdeng",
    title: "Umngot riverside gathering",
    summary:
      "Clear-water banks near Dawki — day swimming energy, dusk camp circles, and informal music. A gathering note, not a ticketed club night.",
    startsOn: null,
    endsOn: null,
    locationLabel: "Shnongpdeng, Meghalaya",
    heroImageUrl:
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1600&q=80",
    vibe: "gathering",
    moodLine: "River day · fire circle · open sky",
    isPublished: true,
    isDemo: true,
  },
  {
    id: "evt-hampi-night",
    slug: "hampi-stone-night",
    destinationSlug: "hampi",
    title: "Hampi stone night",
    summary:
      "Boulder silhouettes, heritage walks by day, and easy cafe terraces after dark — Deccan culture with a social night edge. No invented DJ line-ups.",
    startsOn: null,
    endsOn: null,
    locationLabel: "Hampi, Karnataka",
    heroImageUrl:
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1600&q=80",
    vibe: "both",
    moodLine: "Temple stone · terrace talk · warm night",
    isPublished: true,
    isDemo: true,
  },
  {
    id: "evt-meghalaya-root-meet",
    slug: "root-bridge-village-meet",
    destinationSlug: "double-decker-living-root-bridge",
    title: "Root-bridge village meet",
    summary:
      "After the trek: tea, stories, and a soft village gathering feel near Nongriat. Cultural footing with people-energy — not a commercial party flyer.",
    startsOn: null,
    endsOn: null,
    locationLabel: "Nongriat side, Meghalaya",
    heroImageUrl:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1600&q=80",
    vibe: "gathering",
    moodLine: "Trail end · shared tea · forest night",
    isPublished: true,
    isDemo: true,
  },
];

export function getEventBySlug(slug: string): EventItem | undefined {
  return events.find((e) => e.slug === slug);
}
