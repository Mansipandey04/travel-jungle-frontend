import "server-only";

import {
  mapDestination,
  mapEvent,
  mapHiddenIndia,
  mapStory,
  mapTrip,
} from "@/lib/api/mappers";
import type {
  ApiDestination,
  ApiEvent,
  ApiHiddenIndia,
  ApiPage,
  ApiStory,
  ApiTrip,
} from "@/lib/api/types";
import type {
  Destination,
  EventItem,
  HiddenIndiaStory,
  TravelStory,
  Trip,
} from "@/lib/types";

function backendBase(): string {
  return (process.env.BACKEND_INTERNAL_URL || "http://127.0.0.1:8000").replace(
    /\/$/,
    "",
  );
}

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T | null> {
  const url = `${backendBase()}${path.startsWith("/") ? path : `/${path}`}`;
  try {
    const res = await fetch(url, {
      ...init,
      headers: {
        Accept: "application/json",
        ...(init?.headers || {}),
      },
      next: { revalidate: 30 },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function fetchDestinations(): Promise<Destination[]> {
  const data = await apiFetch<ApiPage<ApiDestination>>(
    "/api/v1/destinations?page_size=50",
  );
  return (data?.items ?? []).map(mapDestination);
}

export async function fetchDestinationBySlug(
  slug: string,
): Promise<Destination | null> {
  const data = await apiFetch<ApiDestination>(`/api/v1/destinations/${slug}`);
  return data ? mapDestination(data) : null;
}

async function destinationMap(): Promise<Map<number, Destination>> {
  const destinations = await fetchDestinations();
  return new Map(destinations.map((d) => [Number(d.id), d]));
}

export async function fetchTrips(destinationSlug?: string): Promise<Trip[]> {
  const byId = await destinationMap();
  const q = destinationSlug
    ? `?page_size=50&destination=${encodeURIComponent(destinationSlug)}`
    : "?page_size=50";
  const data = await apiFetch<ApiPage<ApiTrip>>(`/api/v1/trips${q}`);
  return (data?.items ?? []).map((t) => mapTrip(t, byId));
}

export async function fetchTripBySlug(slug: string): Promise<Trip | null> {
  const byId = await destinationMap();
  const data = await apiFetch<ApiTrip>(`/api/v1/trips/${slug}`);
  return data ? mapTrip(data, byId) : null;
}

export async function fetchEvents(): Promise<EventItem[]> {
  const byId = await destinationMap();
  const data = await apiFetch<ApiPage<ApiEvent>>("/api/v1/events?page_size=50");
  return (data?.items ?? []).map((e) => mapEvent(e, byId));
}

export async function fetchHiddenIndia(): Promise<HiddenIndiaStory[]> {
  const byId = await destinationMap();
  const data = await apiFetch<ApiPage<ApiHiddenIndia>>(
    "/api/v1/hidden-india?page_size=50",
  );
  return (data?.items ?? []).map((h) => mapHiddenIndia(h, byId));
}

export async function fetchHiddenIndiaBySlug(
  slug: string,
): Promise<HiddenIndiaStory | null> {
  const byId = await destinationMap();
  const data = await apiFetch<ApiHiddenIndia>(`/api/v1/hidden-india/${slug}`);
  return data ? mapHiddenIndia(data, byId) : null;
}

export async function fetchStories(): Promise<TravelStory[]> {
  const byId = await destinationMap();
  const data = await apiFetch<ApiPage<ApiStory>>("/api/v1/stories?page_size=50");
  return (data?.items ?? []).map((s) => mapStory(s, byId));
}

export function tripsForDestination(trips: Trip[], destinationSlug: string): Trip[] {
  return trips.filter((t) => t.destinationSlug === destinationSlug);
}

export function storiesForDestination(
  stories: TravelStory[],
  destinationSlug: string,
): TravelStory[] {
  return stories.filter((s) => s.destinationSlug === destinationSlug);
}

export async function fetchHiddenIndiaForDestination(
  destinationSlug: string,
): Promise<HiddenIndiaStory | null> {
  const diaries = await fetchHiddenIndia();
  return diaries.find((d) => d.destinationSlug === destinationSlug) ?? null;
}
