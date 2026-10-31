/** Snake_case shapes returned by FastAPI `/api/v1`. */

export type ApiPageMeta = {
  page: number;
  page_size: number;
  total: number;
};

export type ApiPage<T> = {
  items: T[];
  meta: ApiPageMeta;
};

export type ApiDestination = {
  id: number;
  slug: string;
  name: string;
  region: string;
  state: string;
  summary: string;
  hero_image_url: string | null;
  editorial: Record<string, unknown> | null;
  is_published: boolean;
  is_demo: boolean;
};

export type ApiItineraryDay = {
  day: number;
  title: string;
  summary: string;
};

export type ApiTrip = {
  id: number;
  slug: string;
  destination_id: number;
  title: string;
  summary: string;
  duration_days: number | null;
  itinerary: ApiItineraryDay[] | null;
  inclusions: string[] | null;
  hero_image_url: string | null;
  is_published: boolean;
  is_demo: boolean;
};

export type ApiEvent = {
  id: number;
  slug: string;
  destination_id: number | null;
  title: string;
  summary: string;
  starts_on: string | null;
  ends_on: string | null;
  location_label: string | null;
  hero_image_url: string | null;
  is_published: boolean;
  is_demo: boolean;
};

export type ApiLayer = {
  headline: string;
  body: string;
  tips?: string[];
  media_refs?: string[];
};

export type ApiHiddenIndia = {
  id: number;
  slug: string;
  destination_id: number;
  title: string;
  tagline: string;
  layer_discover: ApiLayer;
  layer_experience: ApiLayer;
  layer_explore: ApiLayer;
  is_published: boolean;
  is_demo: boolean;
};

export type ApiStory = {
  id: number;
  slug: string;
  destination_id: number | null;
  title: string;
  body_md: string;
  author_display: string;
  status: "pending" | "approved" | "rejected" | string;
  source: "editorial" | "community" | string;
  is_demo: boolean;
};
