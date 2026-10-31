import type { Metadata } from "next";
import { PlaceTripCard } from "@/components/destination/PlaceTripCard";
import {
  fetchDestinations,
  fetchStories,
  fetchTrips,
  storiesForDestination,
  tripsForDestination,
} from "@/lib/api/server";

export const metadata: Metadata = {
  title: "Explore India",
};

export default async function ExploreIndiaPage() {
  const [destinations, trips, stories] = await Promise.all([
    fetchDestinations(),
    fetchTrips(),
    fetchStories(),
  ]);

  return (
    <div className="mx-auto max-w-6xl px-5 pb-20 pt-28 md:px-8 md:pt-32">
      <header className="max-w-2xl">
        <h1 className="font-display text-4xl md:text-5xl">Explore India</h1>
        <p className="mt-4 font-sans text-lg text-jungle/75">
          Live from the Travel Jungle API — each card pairs a place with its illustrative itinerary
          and any linked stories.
        </p>
      </header>

      {destinations.length === 0 ? (
        <p className="mt-12 font-sans text-base text-jungle/70">
          No destinations returned from the API yet. Confirm the backend is running on port 8000
          and seed data is loaded.
        </p>
      ) : (
        <ul className="mt-12 space-y-10">
          {destinations.map((place) => {
            const placeTrips = tripsForDestination(trips, place.slug);
            return (
              <li key={place.id}>
                <PlaceTripCard
                  place={place}
                  trip={placeTrips[0]}
                  stories={storiesForDestination(stories, place.slug)}
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
