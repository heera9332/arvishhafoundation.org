import React from "react";
import { Phone, Mail, ShieldCheck } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/common/SectionLabel";
import { DynamicForm } from "@/components/forms/DynamicForm";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { contactData } from "@/data/page-contact";
import { getSiteSettings } from "@/global/site-settings";
import type { ContactPageBlock } from "@/payload-types";
import { ScrollReveal } from "@/components/animation/ScrollReveal";
import { StaggerGroup, StaggerItem } from "@/components/animation/StaggerGroup";

export interface ContactPageComponentProps {
  data?: ContactPageBlock | Record<string, unknown>;
}

export async function ContactPageComponent(
  props: ContactPageComponentProps | ContactPageBlock
) {
  const settings = await getSiteSettings();

  // Support both direct block props (<ContactPageComponent {...block} />)
  // and wrapped data prop (<ContactPageComponent data={block} />)
  const block = (("data" in props && props.data ? props.data : props) || {}) as Partial<ContactPageBlock>;

  const eyebrow = block.eyebrow || "Direct Channels";
  const heading = block.heading || "Reach Our Team";
  const description =
    block.description ||
    "We look forward to hearing from you. Select the most convenient channel below or submit the inquiry form.";
  const phone = block.phone || settings.phone || contactData.info.phone;
  const email = block.email || settings.contactEmail || contactData.info.email;
  const registrationNumber =
    block.registrationNumber || contactData.info.registrationNumber;

  const dynamicFormTitle =
    typeof block.form === "object" && block.form && "title" in block.form
      ? block.form.title
      : undefined;
  const formHeading = block.formHeading || dynamicFormTitle || "Send A Message";
  const formDescription =
    block.formDescription ||
    "Fill in your details below and our team will get back to you within 24–48 hours.";

  const showFaq = block.showFaq !== false;
  const faqEyebrow = block.faqEyebrow || "Common Inquiries";
  const faqHeading = block.faqHeading || "Questions Before Reaching Out?";
  const faqItems =
    block.faqItems && block.faqItems.length > 0
      ? block.faqItems
      : contactData.faq;

  return (
    <div className="contact-page-block overflow-hidden">
      <section className="py-20 sm:py-28 bg-[#faf9f5]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Contact Channels & Direct Info */}
            <div className="lg:col-span-5 space-y-8">
              <ScrollReveal variant="fade-right" duration={700}>
                <div>
                  <SectionLabel>{eyebrow}</SectionLabel>
                  <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                    {heading}
                  </h2>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                    {description}
                  </p>
                </div>
              </ScrollReveal>

              <StaggerGroup staggerDelay={100} initialDelay={150} className="space-y-4">
                <StaggerItem>
                  <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex items-start gap-4 hover:border-emerald-600/40 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                    <div className="h-12 w-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-[#03452c] shrink-0">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-xs uppercase tracking-wider font-bold text-slate-500">
                        Mobile Number
                      </h3>
                      <a
                        href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
                        className="text-base font-bold text-slate-900 hover:text-[#03452c] transition-colors block mt-1"
                      >
                        {phone}
                      </a>
                    </div>
                  </div>
                </StaggerItem>

                <StaggerItem>
                  <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex items-start gap-4 hover:border-emerald-600/40 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                    <div className="h-12 w-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-[#03452c] shrink-0">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-xs uppercase tracking-wider font-bold text-slate-500">
                        Email Address
                      </h3>
                      <a
                        href={`mailto:${email}`}
                        className="text-base font-bold text-slate-900 hover:text-[#03452c] transition-colors block mt-1"
                      >
                        {email}
                      </a>
                    </div>
                  </div>
                </StaggerItem>

                {/* Statutory details box */}
                {registrationNumber && (
                  <StaggerItem>
                    <div className="p-5 rounded-2xl bg-[#023420] text-emerald-100 text-xs space-y-2 border border-emerald-900 shadow-md">
                      <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                        <ShieldCheck className="h-4 w-4" />
                        <span>Statutory Registrations</span>
                      </div>
                      <p>Registration No: {registrationNumber}</p>
                    </div>
                  </StaggerItem>
                )}
              </StaggerGroup>
            </div>

            {/* Contact Form Card */}
            <div className="lg:col-span-7">
              <ScrollReveal variant="fade-left" duration={700} delay={150}>
                <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-lg">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-slate-900">
                      {formHeading}
                    </h3>
                    <p className="text-sm text-slate-600 mt-1">
                      {formDescription}
                    </p>
                  </div>

                  <DynamicForm form={block.form} />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </Container>
      </section>

      {/* Frequently Asked Section on Contact Page */}
      {showFaq && faqItems && faqItems.length > 0 && (
        <section className="py-20 bg-white border-t border-slate-200/60">
          <Container size="narrow" className="max-w-7xl">
            <ScrollReveal variant="fade-up" duration={700}>
              <div className="text-center mb-12">
                <SectionLabel>{faqEyebrow}</SectionLabel>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                  {faqHeading}
                </h2>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" duration={700} delay={150}>
              <Accordion type="single" collapsible className="space-y-4">
                {faqItems.map((item, idx) => {
                  const id = ("id" in item && item.id) ? item.id : `faq-${idx}`;
                  return (
                    <AccordionItem
                      key={id}
                      value={id}
                      className="border border-slate-200/80 rounded-2xl px-6 py-1 bg-[#faf9f5] transition-colors duration-200 data-[state=open]:bg-white data-[state=open]:border-emerald-600/40 data-[state=open]:shadow-sm"
                    >
                      <AccordionTrigger className="text-left font-semibold text-slate-900 hover:text-[#03452c] transition-colors">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-slate-600 text-sm leading-relaxed pt-2">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </ScrollReveal>
          </Container>
        </section>
      )}
    </div>
  );
}

export default ContactPageComponent;
