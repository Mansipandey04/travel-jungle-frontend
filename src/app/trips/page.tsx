import { redirect } from "next/navigation";

/** Trips list lives on Explore India — keep /trips as a friendly redirect. */
export default function TripsPage() {
  redirect("/explore-india#trips");
}
