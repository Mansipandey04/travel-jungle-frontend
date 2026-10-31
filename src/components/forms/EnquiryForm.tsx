"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ApiError, apiPost } from "@/lib/api/client";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { enquirySchema, type EnquiryValues } from "@/lib/validators/enquiry";

export function EnquiryForm({
  sourceType = "general",
  sourceId,
}: {
  sourceType?: EnquiryValues["sourceType"];
  sourceId?: string;
}) {
  const [done, setDone] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<EnquiryValues>({
    resolver: zodResolver(enquirySchema),
    defaultValues: { sourceType, sourceId: sourceId || "", phone: "" },
  });

  const onSubmit = handleSubmit(async (values) => {
    setServerError(null);
    try {
      const parsedId = values.sourceId ? Number(values.sourceId) : null;
      await apiPost("/enquiries", {
        name: values.name,
        email: values.email,
        phone: values.phone || null,
        message: values.message,
        source_type: values.sourceType,
        source_id: Number.isFinite(parsedId) ? parsedId : null,
      });
      setDone(true);
      reset({ sourceType, sourceId: sourceId || "", phone: "" });
    } catch (err) {
      setServerError(
        err instanceof ApiError ? err.message : "Could not send enquiry. Is the backend up?",
      );
    }
  });

  if (done) {
    return (
      <p className="font-sans text-base text-jungle" role="status">
        Enquiry received — we&apos;ll follow up when an editor is available.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      <input type="hidden" {...register("sourceType")} />
      <input type="hidden" {...register("sourceId")} />
      <div>
        <label className="font-sans text-sm text-jungle/70" htmlFor="enq-name">
          Name
        </label>
        <Input id="enq-name" {...register("name")} autoComplete="name" />
        {errors.name ? (
          <p className="mt-1 text-sm text-coral">{errors.name.message}</p>
        ) : null}
      </div>
      <div>
        <label className="font-sans text-sm text-jungle/70" htmlFor="enq-email">
          Email
        </label>
        <Input id="enq-email" type="email" {...register("email")} autoComplete="email" />
        {errors.email ? (
          <p className="mt-1 text-sm text-coral">{errors.email.message}</p>
        ) : null}
      </div>
      <div>
        <label className="font-sans text-sm text-jungle/70" htmlFor="enq-phone">
          Phone (optional)
        </label>
        <Input id="enq-phone" {...register("phone")} autoComplete="tel" />
      </div>
      <div>
        <label className="font-sans text-sm text-jungle/70" htmlFor="enq-message">
          Message
        </label>
        <Textarea id="enq-message" rows={4} {...register("message")} />
        {errors.message ? (
          <p className="mt-1 text-sm text-coral">{errors.message.message}</p>
        ) : null}
      </div>
      {serverError ? <p className="text-sm text-coral">{serverError}</p> : null}
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending…" : "Send enquiry"}
      </Button>
    </form>
  );
}
