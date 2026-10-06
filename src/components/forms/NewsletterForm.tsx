"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { wordpressApi } from "@/lib/wordpress";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setFeedback("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    try {
      const res = await wordpressApi.subscribeNewsletter(email);
      if (res.success) {
        setStatus("success");
        setFeedback("Thank you! You've successfully subscribed to our newsletter.");
        setEmail("");
      } else {
        setStatus("error");
        setFeedback(res.message || "Failed to subscribe. Please try again.");
      }
    } catch {
      setStatus("error");
      setFeedback("Network error. Please try again later.");
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status !== "idle") setStatus("idle");
          }}
          placeholder="Enter your email address..."
          disabled={status === "loading" || status === "success"}
          className="flex-1 h-12 px-4 rounded-xl bg-emerald-950/80 border border-emerald-800 text-white placeholder:text-emerald-400/60 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-colors"
          required
        />
        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          className="h-12 px-6 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold text-sm inline-flex items-center justify-center gap-2 transition-all disabled:opacity-50 shrink-0"
        >
          {status === "loading" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <span>Subscribe</span>
              <Send className="h-4 w-4" />
            </>
          )}
        </button>
      </form>

      {status === "success" && (
        <p className="mt-2.5 flex items-center gap-1.5 text-xs text-emerald-300">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
          <span>{feedback}</span>
        </p>
      )}

      {status === "error" && (
        <p className="mt-2.5 flex items-center gap-1.5 text-xs text-amber-300">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{feedback}</span>
        </p>
      )}
    </div>
  );
}
