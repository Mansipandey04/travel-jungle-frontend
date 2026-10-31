import { redirect } from "next/navigation";

/** Submit flow now lives under Stories. */
export default function CommunitySubmitRedirectPage() {
  redirect("/stories/submit");
}
