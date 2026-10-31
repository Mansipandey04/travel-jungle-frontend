"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ApiError, apiPost } from "@/lib/api/client";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { contactSchema, type ContactValues } from "@/lib/validators/contact";

function buildPrefill(interest: string | null, story: string | null, place: string | null) {
  if (interest === "custom-package") {
    const bits = [
      "I'd like a custom India package inspired by Travel Jungle stories.",
      story ? `Story: ${story}` : null,
      place ? `Place: ${place}` : null,
      "Please outline a demo itinerary (no invented prices).",
    ].filter(Boolean);
    return {
      subject: "Custom package from stories",
      message: bits.join("\n"),
    };
  }
  return { subject: "", message: "" };
}

export function ContactForm() {
  const searchParams = useSearchParams();
  const [done, setDone] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const interest = searchParams.get("interest");
  const story = searchParams.get("story");
  const place = searchParams.get("place");
  const prefill = buildPrefill(interest, story, place);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: prefill,
  });

  useEffect(() => {
    reset(buildPrefill(interest, story, place));
  }, [interest, story, place, reset]);

  const onSubmit = handleSubmit(async (values) => {
    setServerError(null);
    try {
      await apiPost("/contact", {
        name: values.name,
        email: values.email,
        subject: values.subject,
        message: values.message,
      });
      setDone(true);
      reset({ subject: "", message: "", name: "", email: "" });
    } catch (err) {
      setServerError(
        err instanceof ApiError ? err.message : "Could not send message. Is the backend up?",
      );
    }
  });

  if (done) {
    return (
      <p className="font-sans text-base text-jungle" role="status">
        Thanks — your message was saved via the contact API.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-xl space-y-6" noValidate>
      {interest === "custom-package" ? (
        <p className="border border-jungle/10 bg-sage/30 px-4 py-3 font-sans text-sm text-jungle/80">
          Custom package request — we&apos;ll shape a demo outline from the story/place you chose.
          No live pricing in MVP.
        </p>
      ) : null}
      <div>
        <label className="font-sans text-sm text-jungle/70" htmlFor="name">
          Name
        </label>
        <Input id="name" {...register("name")} autoComplete="name" />
        {errors.name ? (
          <p className="mt-1 text-sm text-coral">{errors.name.message}</p>
        ) : null}
      </div>
      <div>
        <label className="font-sans text-sm text-jungle/70" htmlFor="email">
          Email
        </label>
        <Input id="email" type="email" {...register("email")} autoComplete="email" />
        {errors.email ? (
          <p className="mt-1 text-sm text-coral">{errors.email.message}</p>
        ) : null}
      </div>
      <div>
        <label className="font-sans text-sm text-jungle/70" htmlFor="subject">
          Subject
        </label>
        <Input id="subject" {...register("subject")} />
        {errors.subject ? (
          <p className="mt-1 text-sm text-coral">{errors.subject.message}</p>
        ) : null}
      </div>
      <div>
        <label className="font-sans text-sm text-jungle/70" htmlFor="message">
          Message
        </label>
        <Textarea id="message" rows={5} {...register("message")} />
        {errors.message ? (
          <p className="mt-1 text-sm text-coral">{errors.message.message}</p>
        ) : null}
      </div>
      {serverError ? <p className="text-sm text-coral">{serverError}</p> : null}
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
