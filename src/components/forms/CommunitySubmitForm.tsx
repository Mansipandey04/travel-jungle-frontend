"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ApiError, apiPost } from "@/lib/api/client";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import type { Destination } from "@/lib/types";
import {
  communityStorySchema,
  type CommunityStoryValues,
} from "@/lib/validators/community-story";

export function CommunitySubmitForm({
  destinations = [],
}: {
  destinations?: Destination[];
}) {
  const [done, setDone] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CommunityStoryValues>({
    resolver: zodResolver(communityStorySchema),
    defaultValues: { destinationSlug: "" },
  });

  const onSubmit = handleSubmit(async (values) => {
    setServerError(null);
    try {
      await apiPost("/community/stories", {
        title: values.title,
        body_md: values.bodyMd,
        author_display: values.authorDisplay,
        destination_slug: values.destinationSlug || null,
      });
      setDone(true);
      reset({ destinationSlug: "" });
    } catch (err) {
      setServerError(
        err instanceof ApiError
          ? err.message
          : "Could not submit story. Is the backend up?",
      );
    }
  });

  if (done) {
    return (
      <p className="font-sans text-base text-jungle" role="status">
        Story submitted as <strong>pending</strong>. It will appear under Stories after admin
        approval.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-xl space-y-6" noValidate>
      <div>
        <label className="font-sans text-sm text-jungle/70" htmlFor="title">
          Title
        </label>
        <Input id="title" {...register("title")} />
        {errors.title ? (
          <p className="mt-1 text-sm text-coral">{errors.title.message}</p>
        ) : null}
      </div>
      <div>
        <label className="font-sans text-sm text-jungle/70" htmlFor="authorDisplay">
          Display name
        </label>
        <Input id="authorDisplay" {...register("authorDisplay")} />
        {errors.authorDisplay ? (
          <p className="mt-1 text-sm text-coral">{errors.authorDisplay.message}</p>
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
        <p className="mt-1 font-sans text-xs text-jungle/55">
          Kept on the form for follow-up; API stores author display + story body.
        </p>
      </div>
      <div>
        <label className="font-sans text-sm text-jungle/70" htmlFor="destinationSlug">
          Related Explore India place (optional)
        </label>
        <select
          id="destinationSlug"
          className="mt-1 w-full border border-jungle/20 bg-sand px-3 py-2.5 font-sans text-sm text-jungle outline-none focus:border-jungle"
          {...register("destinationSlug")}
          defaultValue=""
        >
          <option value="">Link later / use for custom package</option>
          {destinations.map((d) => (
            <option key={d.slug} value={d.slug}>
              {d.name} · {d.state}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="font-sans text-sm text-jungle/70" htmlFor="bodyMd">
          Your story (India places only)
        </label>
        <Textarea id="bodyMd" rows={8} {...register("bodyMd")} />
        {errors.bodyMd ? (
          <p className="mt-1 text-sm text-coral">{errors.bodyMd.message}</p>
        ) : null}
      </div>
      {serverError ? <p className="text-sm text-coral">{serverError}</p> : null}
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting…" : "Submit for review"}
      </Button>
    </form>
  );
}
