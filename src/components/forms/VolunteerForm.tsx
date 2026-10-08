"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, CheckCircle2, AlertCircle, HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { wordpressApi } from "@/lib/wordpress";
import { CONTACT_PHONE } from "@/constants";

const volunteerSchema = z.object({
  fullName: z.string().min(2, "Please enter your name."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(6, "Please provide a contact number."),
  interest: z.string().min(1, "Please select an area of interest."),
  availability: z.string().min(1, "Please select your availability."),
  experience: z.string().optional(),
});

type VolunteerFormData = z.infer<typeof volunteerSchema>;

export function VolunteerForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<VolunteerFormData>({
    resolver: zodResolver(volunteerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      interest: "education",
      availability: "weekends",
      experience: "",
    },
  });

  const onSubmit = async (values: VolunteerFormData) => {
    setStatus("loading");
    setFeedback("");

    try {
      const res = await wordpressApi.submitVolunteer(values);
      if (res.success) {
        setStatus("success");
        setFeedback(
          res.message ||
            "Thank you for signing up to volunteer! Our volunteer coordinator will connect with you soon."
        );
        reset();
      } else {
        setStatus("error");
        setFeedback(res.message || "Failed to submit application. Please try again.");
      }
    } catch {
      setStatus("error");
      setFeedback("A network error occurred. Please try again later.");
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-md">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-slate-900 leading-snug">
          Apply to Volunteer
        </h3>
        <p className="mt-1 text-sm text-slate-600">
          Share your details and tell us how you&apos;d like to contribute.
        </p>
      </div>

      {status === "success" && (
        <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-3">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
          <p className="text-sm">{feedback}</p>
        </div>
      )}

      {status === "error" && (
        <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-sm">{feedback}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">
            Full Name <span className="text-red-500">*</span>
          </label>
          <Input
            placeholder="Your name"
            {...register("fullName")}
            disabled={status === "loading"}
          />
          {errors.fullName && (
            <p className="text-xs text-red-500">{errors.fullName.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">
              Email Address <span className="text-red-500">*</span>
            </label>
            <Input
              type="email"
              placeholder="you@domain.com"
              {...register("email")}
              disabled={status === "loading"}
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <Input
              placeholder={CONTACT_PHONE}
              {...register("phone")}
              disabled={status === "loading"}
            />
            {errors.phone && (
              <p className="text-xs text-red-500">{errors.phone.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">
              Area of Interest <span className="text-red-500">*</span>
            </label>
            <select
              {...register("interest")}
              disabled={status === "loading"}
              className="flex h-12 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
            >
              <option value="education">Teaching & Academic Mentoring</option>
              <option value="women">Women Vocational Skills</option>
              <option value="health">Medical Camps & Health Outreach</option>
              <option value="media">Creative Media & Storytelling</option>
              <option value="general">Field Operations & Support</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">
              Availability <span className="text-red-500">*</span>
            </label>
            <select
              {...register("availability")}
              disabled={status === "loading"}
              className="flex h-12 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
            >
              <option value="weekends">Weekends Only</option>
              <option value="weekdays">Weekdays (Part-time)</option>
              <option value="remote">Flexible / Remote</option>
              <option value="fulltime">Full-time Fellowship</option>
            </select>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">
            Relevant Experience / Skills (Optional)
          </label>
          <Textarea
            rows={3}
            placeholder="Tell us about your background or motivation..."
            {...register("experience")}
            disabled={status === "loading"}
          />
        </div>

        <Button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-[#03452c] hover:bg-[#023320] text-white py-3.5 h-auto rounded-full font-semibold gap-2 shadow-md transition-all"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Submitting Application...</span>
            </>
          ) : (
            <>
              <HeartHandshake className="h-5 w-5 text-amber-300" />
              <span>Submit Volunteer Application</span>
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
