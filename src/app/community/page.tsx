import { redirect } from "next/navigation";

/** Community merged into Stories — keep old URL working. */
export default function CommunityPage() {
  redirect("/stories#share");
}
