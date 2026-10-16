"use client";

import React, { useState, useEffect } from "react";
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
  Hash,
  Globe,
  MapPin,
  ChevronDown,
  HeartHandshake,
} from "lucide-react";
import type { Form } from "@/payload-types";
import { LexicalRenderer, type LexicalNode } from "@/blocks/shared/LexicalRenderer";
import { ContactForm } from "@/components/forms/ContactForm";
import { cn } from "@/lib/utils";

type FormField = NonNullable<NonNullable<Form["fields"]>[number]>;

const COUNTRY_OPTIONS = [
  "India",
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "United Arab Emirates",
  "Singapore",
  "Germany",
  "France",
  "Other",
];

export interface DynamicFormProps {
  form?: (string | null) | Form;
  className?: string;
  fallback?: React.ReactNode;
  defaultFormTitle?: string;
}

/**
 * Format field labels nicely, converting snake_case or lowercase into title case.
 */
function formatFieldLabel(label?: string | null, name?: string | null): string {
  const raw = (label || name || "").trim();
  if (!raw) return "";
  if (raw === raw.toLowerCase()) {
    return raw
      .replace(/[_-]/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }
  return raw;
}

/**
 * Determine Tailwind column span class based on field width (percentage).
 */
function getColumnSpanClass(width?: number | null): string {
  if (!width) return "sm:col-span-12";
  if (width <= 25) return "sm:col-span-3";
  if (width <= 34) return "sm:col-span-4";
  if (width <= 50) return "sm:col-span-6";
  if (width <= 67) return "sm:col-span-8";
  if (width <= 75) return "sm:col-span-9";
  return "sm:col-span-12";
}

/**
 * Determine suitable icon for a given field definition.
 */
function getFieldIcon(field: FormField) {
  if (field.blockType === "email") return Mail;
  if (field.blockType === "number") return Hash;
  if (field.blockType === "country") return Globe;
  if (field.blockType === "state") return MapPin;
  if (field.blockType === "textarea") return MessageSquare;

  const name = ("name" in field ? field.name : "").toLowerCase();
  const label = ("label" in field && typeof field.label === "string" ? field.label : "").toLowerCase();

  if (
    name.includes("phone") ||
    name.includes("mobile") ||
    name.includes("tel") ||
    label.includes("phone") ||
    label.includes("mobile")
  ) {
    return Phone;
  }
  if (name.includes("name") || name.includes("user") || label.includes("name")) {
    return User;
  }
  if (
    name.includes("subject") ||
    name.includes("topic") ||
    name.includes("title") ||
    label.includes("subject") ||
    label.includes("topic")
  ) {
    return Tag;
  }
  return null;
}

/**
 * Active interactive form renderer for a loaded Form document.
 */
function FormRenderer({
  formDoc,
  className,
}: {
  formDoc: Form;
  className?: string;
}) {
  const [formData, setFormData] = useState<Record<string, unknown>>(() => {
    const initial: Record<string, unknown> = {};
    formDoc.fields?.forEach((field) => {
      if (field.blockType === "message") return;
      if ("defaultValue" in field && field.defaultValue !== undefined && field.defaultValue !== null) {
        initial[field.name] = field.defaultValue;
      } else if (field.blockType === "checkbox") {
        initial[field.name] = false;
      } else {
        initial[field.name] = "";
      }
    });
    return initial;
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleChange = (name: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validate = (): boolean => {
    const nextErrors: Record<string, string> = {};

    formDoc.fields?.forEach((field) => {
      if (field.blockType === "message") return;

      const val = formData[field.name];
      const isRequired = Boolean(field.required);
      const label = formatFieldLabel(field.label, field.name);

      if (isRequired) {
        if (field.blockType === "checkbox") {
          if (!val) {
            nextErrors[field.name] = `${label} is required.`;
          }
        } else if (val === undefined || val === null || String(val).trim() === "") {
          nextErrors[field.name] = `${label} is required.`;
        }
      }

      if (field.blockType === "email" && val && typeof val === "string") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(val.trim())) {
          nextErrors[field.name] = "Please enter a valid email address.";
        }
      }
    });

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const submissionData = Object.entries(formData).map(([field, value]) => ({
        field,
        value: typeof value === "boolean" ? (value ? "true" : "false") : String(value ?? ""),
      }));

      const res = await fetch("/api/form-submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          form: formDoc.id,
          submissionData,
        }),
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => null);
        throw new Error(errJson?.errors?.[0]?.message || "Failed to submit form");
      }

      if (formDoc.confirmationType === "redirect" && formDoc.redirect?.url) {
        window.location.href = formDoc.redirect.url;
        return;
      }

      setStatus("success");

      // Reset form fields back to default values
      const resetValues: Record<string, unknown> = {};
      formDoc.fields?.forEach((f) => {
        if (f.blockType === "message") return;
        if ("defaultValue" in f && f.defaultValue !== undefined && f.defaultValue !== null) {
          resetValues[f.name] = f.defaultValue;
        } else if (f.blockType === "checkbox") {
          resetValues[f.name] = false;
        } else {
          resetValues[f.name] = "";
        }
      });
      setFormData(resetValues);
    } catch (err: unknown) {
      console.error("[DynamicForm] Submission error:", err);
      setStatus("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "An error occurred while submitting your message. Please try again."
      );
    }
  };

  return (
    <div className={cn("w-full", className)}>
      {/* Success Notification Box */}
      {status === "success" && (
        <div className="mb-6 p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-3">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-semibold text-sm sm:text-base">Message Received</h4>
            {formDoc.confirmationMessage?.root ? (
              <div className="text-xs sm:text-sm text-emerald-800">
                <LexicalRenderer
                  node={formDoc.confirmationMessage.root as unknown as LexicalNode}
                />
              </div>
            ) : (
              <p className="text-xs sm:text-sm text-emerald-800">
                Thank you! Your message has been sent successfully. Our team will get back to you shortly.
              </p>
            )}
          </div>
        </div>
      )}

      {/* Error Notification Box */}
      {status === "error" && (
        <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-sm">Submission Notice</h4>
            <p className="text-xs sm:text-sm mt-0.5 text-amber-800">
              {errorMessage || "Failed to submit message. Please try again."}
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-5">
          {formDoc.fields?.map((field, idx) => {
            const fieldKey = ("name" in field ? field.name : "") || `field-${idx}`;
            const colSpan = getColumnSpanClass("width" in field ? field.width : undefined);
            const Icon = getFieldIcon(field);
            const hasError = Boolean(errors[fieldKey]);

            // Message Block (Lexical Content inside form)
            if (field.blockType === "message") {
              if (!field.message?.root) return null;
              return (
                <div key={fieldKey} className="sm:col-span-12 py-2 text-slate-700 text-sm">
                  <LexicalRenderer node={field.message.root as unknown as LexicalNode} />
                </div>
              );
            }

            // Checkbox Block
            if (field.blockType === "checkbox") {
              const label = formatFieldLabel(field.label, field.name);
              return (
                <div key={fieldKey} className={cn("flex flex-col space-y-1.5", colSpan)}>
                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      id={`form-${field.name}`}
                      name={field.name}
                      checked={Boolean(formData[field.name])}
                      onChange={(e) => handleChange(field.name, e.target.checked)}
                      disabled={status === "loading"}
                      className="mt-1 h-4 w-4 rounded border-slate-300 text-[#083827] focus:ring-[#083827]"
                    />
                    <span className="text-xs sm:text-sm text-slate-700 font-medium">
                      {label}
                      {field.required && <span className="text-red-500 font-bold ml-1">*</span>}
                    </span>
                  </label>
                  {hasError && (
                    <p className="text-xs text-red-500 font-medium">{errors[field.name]}</p>
                  )}
                </div>
              );
            }

            // Textarea Block
            if (field.blockType === "textarea") {
              const label = formatFieldLabel(field.label, field.name);
              return (
                <div key={fieldKey} className={cn("space-y-1.5", colSpan)}>
                  <label
                    htmlFor={`form-${field.name}`}
                    className="text-xs sm:text-sm font-semibold text-slate-800 flex items-center"
                  >
                    {label}
                    {field.required && <span className="text-red-500 font-bold ml-1">*</span>}
                  </label>
                  <div className="relative">
                    {Icon && (
                      <Icon className="absolute left-3.5 top-3.5 h-[18px] w-[18px] text-slate-400 pointer-events-none" />
                    )}
                    <textarea
                      id={`form-${field.name}`}
                      name={field.name}
                      rows={4}
                      value={String(formData[field.name] ?? "")}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      disabled={status === "loading"}
                      placeholder={
                        ("placeholder" in field &&
                          typeof field.placeholder === "string" &&
                          field.placeholder) ||
                        "Share details here..."
                      }
                      className={cn(
                        "w-full min-h-[125px] sm:min-h-[135px] pr-4 pt-3 pb-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#083827]/20 focus:border-[#083827] transition-all resize-y disabled:opacity-50 disabled:cursor-not-allowed",
                        Icon ? "pl-10" : "pl-4",
                        hasError && "border-red-400 focus:ring-red-400/20 focus:border-red-500"
                      )}
                    />
                  </div>
                  {hasError && (
                    <p className="text-xs text-red-500 font-medium">{errors[field.name]}</p>
                  )}
                </div>
              );
            }

            // Select Block
            if (field.blockType === "select") {
              const label = formatFieldLabel(field.label, field.name);
              return (
                <div key={fieldKey} className={cn("space-y-1.5", colSpan)}>
                  <label
                    htmlFor={`form-${field.name}`}
                    className="text-xs sm:text-sm font-semibold text-slate-800 flex items-center"
                  >
                    {label}
                    {field.required && <span className="text-red-500 font-bold ml-1">*</span>}
                  </label>
                  <div className="relative">
                    <select
                      id={`form-${field.name}`}
                      name={field.name}
                      value={String(formData[field.name] ?? "")}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      disabled={status === "loading"}
                      className={cn(
                        "w-full h-12 sm:h-[50px] pl-4 pr-10 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#083827]/20 focus:border-[#083827] transition-all appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
                        hasError && "border-red-400 focus:ring-red-400/20 focus:border-red-500"
                      )}
                    >
                      <option value="">{field.placeholder || "Please select..."}</option>
                      {field.options?.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                  </div>
                  {hasError && (
                    <p className="text-xs text-red-500 font-medium">{errors[field.name]}</p>
                  )}
                </div>
              );
            }

            // Country Block
            if (field.blockType === "country") {
              const label = formatFieldLabel(field.label, "Country");
              return (
                <div key={fieldKey} className={cn("space-y-1.5", colSpan)}>
                  <label
                    htmlFor={`form-${field.name}`}
                    className="text-xs sm:text-sm font-semibold text-slate-800 flex items-center"
                  >
                    {label}
                    {field.required && <span className="text-red-500 font-bold ml-1">*</span>}
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-slate-400 pointer-events-none" />
                    <select
                      id={`form-${field.name}`}
                      name={field.name}
                      value={String(formData[field.name] ?? "")}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      disabled={status === "loading"}
                      className={cn(
                        "w-full h-12 sm:h-[50px] pl-10 pr-10 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#083827]/20 focus:border-[#083827] transition-all appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
                        hasError && "border-red-400 focus:ring-red-400/20 focus:border-red-500"
                      )}
                    >
                      <option value="">Select country...</option>
                      {COUNTRY_OPTIONS.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                  </div>
                  {hasError && (
                    <p className="text-xs text-red-500 font-medium">{errors[field.name]}</p>
                  )}
                </div>
              );
            }

            // Standard Inputs (text, email, number, state)
            const nameLower = ("name" in field ? field.name : "").toLowerCase();
            const labelLower = ("label" in field && typeof field.label === "string" ? field.label : "").toLowerCase();

            const isPhoneField =
              nameLower.includes("phone") ||
              nameLower.includes("mobile") ||
              nameLower.includes("tel") ||
              labelLower.includes("phone") ||
              labelLower.includes("mobile");

            const isNameField =
              nameLower.includes("name") ||
              nameLower.includes("user") ||
              labelLower.includes("name");

            const inputType =
              field.blockType === "email"
                ? "email"
                : field.blockType === "number"
                  ? "number"
                  : isPhoneField
                    ? "tel"
                    : "text";

            const customPlaceholder =
              "placeholder" in field &&
              typeof field.placeholder === "string" &&
              field.placeholder
                ? field.placeholder
                : "";

            const fieldPlaceholder =
              customPlaceholder ||
              (field.blockType === "email"
                ? "you@example.com"
                : isPhoneField
                  ? "+91 98765 43210"
                  : field.blockType === "state"
                    ? "e.g. Maharashtra, Delhi"
                    : isNameField
                      ? "e.g. John Doe"
                      : nameLower.includes("subject") ||
                          nameLower.includes("topic") ||
                          labelLower.includes("subject")
                        ? "e.g. CSR Partnership / General Inquiry"
                        : "");

            const label = formatFieldLabel(field.label, field.name);

            return (
              <div key={fieldKey} className={cn("space-y-1.5", colSpan)}>
                <label
                  htmlFor={`form-${field.name}`}
                  className="text-xs sm:text-sm font-semibold text-slate-800 flex items-center"
                >
                  {label}
                  {field.required && <span className="text-red-500 font-bold ml-1">*</span>}
                </label>
                <div className="relative flex items-center">
                  {Icon && (
                    <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-slate-400 pointer-events-none" />
                  )}
                  <input
                    id={`form-${field.name}`}
                    type={inputType}
                    name={field.name}
                    value={String(formData[field.name] ?? "")}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    disabled={status === "loading"}
                    placeholder={fieldPlaceholder}
                    className={cn(
                      "w-full h-12 sm:h-[50px] pr-4 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#083827]/20 focus:border-[#083827] transition-all disabled:opacity-50 disabled:cursor-not-allowed",
                      Icon ? "pl-10" : "pl-4",
                      hasError && "border-red-400 focus:ring-red-400/20 focus:border-red-500"
                    )}
                  />
                </div>
                {hasError && (
                  <p className="text-xs text-red-500 font-medium">{errors[field.name]}</p>
                )}
              </div>
            );
          })}
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
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <span>{formDoc.submitButtonLabel || "Send Message"}</span>
                {formDoc.title?.toLowerCase().includes("volunteer") ||
                formDoc.submitButtonLabel?.toLowerCase().includes("volunteer") ? (
                  <HeartHandshake className="h-4 w-4 ml-0.5 text-amber-300" />
                ) : (
                  <Send className="h-4 w-4 ml-0.5" />
                )}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

/**
 * Top-level DynamicForm component.
 * Handles dynamic API fetching when form is an ID or not provided,
 * and renders FormRenderer when form data is available.
 */
export function DynamicForm({
  form,
  className,
  fallback,
  defaultFormTitle = "contact",
}: DynamicFormProps) {
  const isFormObject = Boolean(
    form && typeof form === "object" && "fields" in form && Array.isArray(form.fields)
  );

  const [fetchedForm, setFetchedForm] = useState<Form | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(!isFormObject);

  const formDoc = isFormObject ? (form as Form) : fetchedForm;

  useEffect(() => {
    if (isFormObject) return;

    let isMounted = true;

    async function fetchForm() {
      try {
        // 1. If form is an ID string, fetch that specific form from /api/forms/:id
        if (typeof form === "string" && form.trim()) {
          const idRes = await fetch(`/api/forms/${encodeURIComponent(form.trim())}`);
          if (idRes.ok) {
            const data: Form = await idRes.json();
            if (isMounted && data && Array.isArray(data.fields)) {
              setFetchedForm(data);
              return;
            }
          }
        }

        // 2. Fetch the form by defaultFormTitle from /api/forms
        const searchTitle = defaultFormTitle || "contact";
        const queryRes = await fetch(
          `/api/forms?where[title][like]=${encodeURIComponent(searchTitle)}&limit=1`
        );
        if (queryRes.ok) {
          const listData = await queryRes.json();
          if (
            isMounted &&
            listData?.docs?.[0] &&
            Array.isArray(listData.docs[0].fields)
          ) {
            setFetchedForm(listData.docs[0]);
            return;
          }
        }

        // 3. Fallback: fetch any available form from /api/forms
        const allRes = await fetch(`/api/forms?limit=1`);
        if (allRes.ok) {
          const allData = await allRes.json();
          if (
            isMounted &&
            allData?.docs?.[0] &&
            Array.isArray(allData.docs[0].fields)
          ) {
            setFetchedForm(allData.docs[0]);
            return;
          }
        }
      } catch (err) {
        console.warn("[DynamicForm] Could not fetch form from API:", err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchForm();

    return () => {
      isMounted = false;
    };
  }, [form, isFormObject, defaultFormTitle]);

  // Loading state while resolving from API
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16 text-slate-500 gap-3">
        <Loader2 className="h-6 w-6 animate-spin text-[#03452c]" />
        <span className="text-sm font-medium">Loading form...</span>
      </div>
    );
  }

  // Graceful fallback to static ContactForm if API returned no valid dynamic form
  if (!formDoc || !formDoc.fields || formDoc.fields.length === 0) {
    return fallback ? <>{fallback}</> : <ContactForm />;
  }

  return <FormRenderer key={formDoc.id} formDoc={formDoc} className={className} />;
}

export default DynamicForm;
