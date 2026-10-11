"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Loader2,
  CheckCircle2,
  AlertCircle,
  Send,
  User,
  Mail,
  Phone,
  Tag,
  MessageSquare,
} from "lucide-react";
import { wordpressApi } from "@/lib/wordpress";
import { CONTACT_PHONE } from "@/constants";
import { cn } from "@/lib/utils";

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your full name (minimum 2 characters)."),
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

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {/* Your Full Name */}
          <div className="space-y-1.5">
            <label
              htmlFor="contact-name"
              className="text-xs sm:text-sm font-semibold text-slate-800 flex items-center"
            >
              Your Full Name <span className="text-red-500 font-bold ml-1">*</span>
            </label>
            <div className="relative flex items-center">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-slate-400 pointer-events-none" />
              <input
                id="contact-name"
                type="text"
                placeholder="e.g. John Doe"
                disabled={status === "loading"}
                {...register("name")}
                className={cn(
                  "w-full h-12 sm:h-[50px] pl-10 pr-4 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#083827]/20 focus:border-[#083827] transition-all disabled:opacity-50 disabled:cursor-not-allowed",
                  errors.name && "border-red-400 focus:ring-red-400/20 focus:border-red-500"
                )}
              />
            </div>
            {errors.name && (
              <p className="text-xs text-red-500 font-medium">{errors.name.message}</p>
            )}
          </div>

          {/* Email Address */}
          <div className="space-y-1.5">
            <label
              htmlFor="contact-email"
              className="text-xs sm:text-sm font-semibold text-slate-800 flex items-center"
            >
              Email Address <span className="text-red-500 font-bold ml-1">*</span>
            </label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-slate-400 pointer-events-none" />
              <input
                id="contact-email"
                type="email"
                placeholder="you@example.com"
                disabled={status === "loading"}
                {...register("email")}
                className={cn(
                  "w-full h-12 sm:h-[50px] pl-10 pr-4 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#083827]/20 focus:border-[#083827] transition-all disabled:opacity-50 disabled:cursor-not-allowed",
                  errors.email && "border-red-400 focus:ring-red-400/20 focus:border-red-500"
                )}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-500 font-medium">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {/* Phone Number */}
          <div className="space-y-1.5">
            <label
              htmlFor="contact-phone"
              className="text-xs sm:text-sm font-semibold text-slate-800 block"
            >
              Phone Number
            </label>
            <div className="relative flex items-center">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-slate-400 pointer-events-none" />
              <input
                id="contact-phone"
                type="tel"
                placeholder={CONTACT_PHONE}
                disabled={status === "loading"}
                {...register("phone")}
                className="w-full h-12 sm:h-[50px] pl-10 pr-4 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#083827]/20 focus:border-[#083827] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          {/* Subject */}
          <div className="space-y-1.5">
            <label
              htmlFor="contact-subject"
              className="text-xs sm:text-sm font-semibold text-slate-800 flex items-center"
            >
              Subject <span className="text-red-500 font-bold ml-1">*</span>
            </label>
            <div className="relative flex items-center">
              <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-slate-400 pointer-events-none" />
              <input
                id="contact-subject"
                type="text"
                placeholder="e.g. CSR Partnership / Volunteer Inquiry"
                disabled={status === "loading"}
                {...register("subject")}
                className={cn(
                  "w-full h-12 sm:h-[50px] pl-10 pr-4 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#083827]/20 focus:border-[#083827] transition-all disabled:opacity-50 disabled:cursor-not-allowed",
                  errors.subject && "border-red-400 focus:ring-red-400/20 focus:border-red-500"
                )}
              />
            </div>
            {errors.subject && (
              <p className="text-xs text-red-500 font-medium">{errors.subject.message}</p>
            )}
          </div>
        </div>

        {/* Your Message */}
        <div className="space-y-1.5">
          <label
            htmlFor="contact-message"
            className="text-xs sm:text-sm font-semibold text-slate-800 flex items-center"
          >
            Your Message <span className="text-red-500 font-bold ml-1">*</span>
          </label>
          <div className="relative">
            <MessageSquare className="absolute left-3.5 top-3.5 h-[18px] w-[18px] text-slate-400 pointer-events-none" />
            <textarea
              id="contact-message"
              rows={4}
              placeholder="Tell us how we can help or collaborate..."
              disabled={status === "loading"}
              {...register("message")}
              className={cn(
                "w-full min-h-[125px] sm:min-h-[135px] pl-10 pr-4 pt-3 pb-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#083827]/20 focus:border-[#083827] transition-all resize-y disabled:opacity-50 disabled:cursor-not-allowed",
                errors.message && "border-red-400 focus:ring-red-400/20 focus:border-red-500"
              )}
            />
          </div>
          {errors.message && (
            <p className="text-xs text-red-500 font-medium">{errors.message.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={status === "loading"}
            className="inline-flex items-center justify-center gap-2.5 bg-[#083827] hover:bg-[#05291c] text-white px-8 py-3.5 rounded-full font-medium text-sm sm:text-base shadow-md shadow-emerald-950/20 hover:shadow-lg transition-all active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Sending Message...</span>
              </>
            ) : (
              <>
                <span>Send Message</span>
                <Send className="h-4 w-4 ml-0.5" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
