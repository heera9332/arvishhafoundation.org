import React from "react";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/common/SectionLabel";
import { VolunteerForm } from "@/components/forms/VolunteerForm";
import { DynamicForm } from "@/components/forms/DynamicForm";
import { getInvolvedData } from "@/data/page-get-involved";
import type { VolunteerBlock } from "@/payload-types";

export interface VolunteerComponentProps {
  data?: VolunteerBlock | Record<string, unknown>;
}

export function VolunteerComponent(
  props: VolunteerComponentProps | VolunteerBlock
) {
  const block = (("data" in props && props.data ? props.data : props) || {}) as Partial<VolunteerBlock>;

  const eyebrow = block.eyebrow || "Volunteer With Us";
  const heading =
    block.heading || "Ways You Can Share Your Passion & Skills";
  const description =
    block.description ||
    "We match volunteers with initiatives where their unique background—whether teaching, healthcare, arts, or communication—creates the highest positive impact.";

  const roles =
    block.roles && block.roles.length > 0
      ? block.roles
      : getInvolvedData.volunteerRoles;

  const dynamicFormTitle =
    typeof block.form === "object" && block.form && "title" in block.form
      ? block.form.title
      : undefined;

  const formHeading =
    block.formHeading || dynamicFormTitle || "Apply to Volunteer";
  const formDescription =
    block.formDescription ||
    "Share your details and tell us how you'd like to contribute.";

  return (
    <section id="volunteer" className="py-20 sm:py-28 bg-white scroll-mt-32">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Volunteer Roles List */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <SectionLabel>{eyebrow}</SectionLabel>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {heading}
              </h2>
              <p className="mt-4 text-base text-slate-600 leading-relaxed">
                {description}
              </p>
            </div>

            <div className="space-y-4">
              {roles.map((role, idx) => (
                <div
                  key={idx}
                  className="bg-[#faf9f5] border border-slate-200/80 rounded-2xl p-6 shadow-2xs hover:border-emerald-800/40 transition-colors"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <h3 className="text-lg font-bold text-[#03452c]">
                      {role.title}
                    </h3>
                    {role.mode && (
                      <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 font-semibold">
                        {role.mode}
                      </span>
                    )}
                  </div>
                  {role.commitment && (
                    <p className="text-xs text-amber-700 font-medium mb-2">
                      Commitment: {role.commitment}
                    </p>
                  )}
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {role.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Volunteer Form Card */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-md">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-slate-900 leading-snug">
                  {formHeading}
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  {formDescription}
                </p>
              </div>

              <DynamicForm
                form={block.form}
                defaultFormTitle="volunteer"
                fallback={<VolunteerForm />}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default VolunteerComponent;
