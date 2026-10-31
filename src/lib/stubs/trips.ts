import type { Trip } from "@/lib/types";

/** Demo trips — no prices or live availability. */
export const trips: Trip[] = [
  {
    id: "trip-meghalaya-roots",
    slug: "meghalaya-root-bridges",
    destinationSlug: "double-decker-living-root-bridge",
    title: "Meghalaya Root Bridges",
    summary:
      "A slow walk through Khasi hills toward living root bridges and village paths — illustrative itinerary only.",
    durationDays: 5,
    itinerary: [
      { day: 1, title: "Arrive Shillong", body: "Settle in and orient to the Khasi Hills." },
      { day: 2, title: "Toward Tyrna", body: "Transfer toward the trailhead village." },
      { day: 3, title: "Nongriat bridges", body: "Descend to the double-decker living root bridge." },
      { day: 4, title: "Forest return", body: "Ascend and rest in the hills." },
      { day: 5, title: "Depart", body: "Return toward Shillong." },
    ],
    inclusions: ["Local guiding notes", "Village stay suggestions", "Editorial trail briefing"],
    heroImageUrl:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1600&q=80",
    isPublished: true,
    isDemo: true,
  },
  {
    id: "trip-tirthan-quiet",
    slug: "tirthan-quiet-days",
    destinationSlug: "tirthan-valley",
    title: "Tirthan Quiet Days",
    summary:
      "River mornings and forest afternoons in Tirthan Valley — demo outline without departure guarantees.",
    durationDays: 4,
    itinerary: [
      { day: 1, title: "Valley arrival", body: "Reach a riverside stay." },
      { day: 2, title: "River & villages", body: "Walk along the Tirthan." },
      { day: 3, title: "Park fringe", body: "Gentle trail toward GHNP approaches." },
      { day: 4, title: "Depart", body: "Leave the valley." },
    ],
    inclusions: ["Stay ideas", "Trail notes", "India-only scope"],
    heroImageUrl:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1600&q=80",
    isPublished: true,
    isDemo: true,
  },
  {
    id: "trip-hampi-stone",
    slug: "hampi-stone-light",
    destinationSlug: "hampi",
    title: "Hampi Stone & Light",
    summary:
      "Unhurried circuits among Vijayanagara ruins and boulder country — demo content only.",
    durationDays: 3,
    itinerary: [
      { day: 1, title: "Sacred centre", body: "Temples and bazaar streets." },
      { day: 2, title: "River & boulders", body: "Tungabhadra edges and open rock." },
      { day: 3, title: "Quiet monuments", body: "Lesser-walked clusters before departure." },
    ],
    inclusions: ["Heritage pacing notes", "Heat-aware day structure"],
    heroImageUrl:
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1600&q=80",
    isPublished: true,
    isDemo: true,
  },
];

export function getTripBySlug(slug: string): Trip | undefined {
  return trips.find((t) => t.slug === slug);
}

export function getTripsForDestination(destinationSlug: string): Trip[] {
  return trips.filter((t) => t.destinationSlug === destinationSlug);
}

export function getPrimaryTripForDestination(destinationSlug: string): Trip | undefined {
  return getTripsForDestination(destinationSlug)[0];
}

