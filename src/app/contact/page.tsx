import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 pb-20 pt-28 md:px-8 md:pt-32">
      <header className="mb-10">
        <h1 className="font-display text-4xl md:text-5xl">Contact</h1>
        <p className="mt-4 font-sans text-lg text-jungle/75">
          Questions about India journeys, diaries, community stories, or a custom package inspired
          by what you read — write to us.
        </p>
      </header>
      <Suspense fallback={<p className="font-sans text-sm text-jungle/65">Loading form…</p>}>
        <ContactForm />
      </Suspense>
    </div>
  );
}
