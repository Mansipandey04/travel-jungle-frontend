import type { Destination } from "@/lib/types";

/** Phase 2 typed stubs — swap to live API client in Phase 5. All rows are demo. */
export const destinations: Destination[] = [
  {
    id: "dst-living-root",
    slug: "double-decker-living-root-bridge",
    name: "Double Decker Living Root Bridge",
    region: "Northeast",
    state: "Meghalaya",
    summary:
      "A living Khasi bridge of intertwined Ficus elastica roots spanning a monsoon gorge near Nongriat.",
    heroImageUrl:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1600&q=80",
    editorial: {
      pullQuote: "A path grown, not built — still tended by the village that walks it.",
      mapNote: "Approach via Tyrna village; the trek descends steep stone steps into the gorge.",
    },
    isPublished: true,
    isDemo: true,
  },
  {
    id: "dst-majuli",
    slug: "majuli",
    name: "Majuli",
    region: "Northeast",
    state: "Assam",
    summary:
      "One of the world’s largest river islands, shaped by the Brahmaputra and home to Assamese satras.",
    heroImageUrl:
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1600&q=80",
    editorial: {
      mapNote: "Reach by ferry from Nimati Ghat near Jorhat.",
    },
    isPublished: true,
    isDemo: true,
  },
  {
    id: "dst-tirthan",
    slug: "tirthan-valley",
    name: "Tirthan Valley",
    region: "Himalaya",
    state: "Himachal Pradesh",
    summary:
      "A quiet Himalayan valley along the Tirthan River, gateway toward the Great Himalayan National Park.",
    heroImageUrl:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1600&q=80",
    isPublished: true,
    isDemo: true,
  },
  {
    id: "dst-ziro",
    slug: "ziro-valley",
    name: "Ziro Valley",
    region: "Northeast",
    state: "Arunachal Pradesh",
    summary:
      "An Apatani plateau of rice fields and pine ridges in the Lower Subansiri district.",
    heroImageUrl:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1600&q=80",
    isPublished: true,
    isDemo: true,
  },
  {
    id: "dst-shnongpdeng",
    slug: "shnongpdeng",
    name: "Shnongpdeng",
    region: "Northeast",
    state: "Meghalaya",
    summary:
      "A riverside village on the Umngot, known for clear water and limestone cliffs near Dawki.",
    heroImageUrl:
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1600&q=80",
    isPublished: true,
    isDemo: true,
  },
  {
    id: "dst-hampi",
    slug: "hampi",
    name: "Hampi",
    region: "Deccan",
    state: "Karnataka",
    summary:
      "Ruins of the Vijayanagara capital among boulder hills along the Tungabhadra River.",
    heroImageUrl:
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1600&q=80",
    editorial: {
      pullQuote: "A stone city in a landscape of granite and river light.",
    },
    isPublished: true,
    isDemo: true,
  },
];

export function getDestinationBySlug(slug: string): Destination | undefined {
  return destinations.find((d) => d.slug === slug);
}
