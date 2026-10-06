"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, CheckCircle2, AlertCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { wordpressApi } from "@/lib/wordpress";

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name (minimum 2 characters)."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().optional(),
  subject: z.string().min(3, "Please provide a subject."),
  message: z.string().min(10, "Please enter a message (at least 10 characters)."),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (values: ContactFormData) => {
    setStatus("loading");
    setFeedbackMessage("");

    try {
      const response = await wordpressApi.submitContact(values);
      if (response.success) {
        setStatus("success");
        setFeedbackMessage(
          response.message ||
            "Thank you! Your message has been sent successfully. Our team will get back to you shortly."
        );
        reset();
      } else {
        setStatus("error");
        setFeedbackMessage(
          response.message || "Failed to submit message. Please try again."
        );
      }
    } catch {
      setStatus("error");
      setFeedbackMessage(
        "A network error occurred. Please try again later or reach out via email directly."
      );
    }
  };

  return (
    <div className="w-full">
      {status === "success" && (
        <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-3">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-sm">Message Received</h4>
            <p className="text-xs sm:text-sm mt-0.5 text-emerald-800">{feedbackMessage}</p>
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-sm">Submission Notice</h4>
            <p className="text-xs sm:text-sm mt-0.5 text-amber-800">{feedbackMessage}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">
              Your Full Name <span className="text-red-500">*</span>
            </label>
            <Input
              placeholder="e.g. John Doe"
              {...register("name")}
              disabled={status === "loading"}
              className={errors.name ? "border-red-400 focus-visible:ring-red-400" : ""}
            />
            {errors.name && (
              <p className="text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">
              Email Address <span className="text-red-500">*</span>
            </label>
            <Input
              type="email"
              placeholder="you@example.com"
              {...register("email")}
              disabled={status === "loading"}
              className={errors.email ? "border-red-400 focus-visible:ring-red-400" : ""}
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">
              Phone Number
            </label>
            <Input
              placeholder="+1 (555) 000-0000"
              {...register("phone")}
              disabled={status === "loading"}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">
              Subject <span className="text-red-500">*</span>
            </label>
            <Input
              placeholder="e.g. CSR Partnership / Volunteer Inquiry"
              {...register("subject")}
              disabled={status === "loading"}
              className={errors.subject ? "border-red-400 focus-visible:ring-red-400" : ""}
            />
            {errors.subject && (
              <p className="text-xs text-red-500">{errors.subject.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">
            Your Message <span className="text-red-500">*</span>
          </label>
          <Textarea
            rows={4}
            placeholder="Tell us how we can help or collaborate..."
            {...register("message")}
            disabled={status === "loading"}
            className={errors.message ? "border-red-400 focus-visible:ring-red-400" : ""}
          />
          {errors.message && (
            <p className="text-xs text-red-500">{errors.message.message}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={status === "loading"}
          className="w-full sm:w-auto bg-[#03452c] hover:bg-[#023320] text-white px-8 py-3.5 h-auto rounded-full font-semibold gap-2 shadow-md transition-all"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Sending Message...</span>
            </>
          ) : (
            <>
              <span>Send Message</span>
              <Send className="h-4 w-4" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
