import { Phone, Mail, ShieldCheck, User } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/common/PageHero";
import { SectionLabel } from "@/components/common/SectionLabel";
import { ContactForm } from "@/components/forms/ContactForm";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { contactData } from "@/data/page-contact";
import { constructMetadata, generateBreadcrumbSchema } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Contact Us — Get In Touch With Arvishha Foundation",
  description:
    "Reach out to Arvishha Foundation for general inquiries, project collaborations, CSR partnerships, or volunteering details.",
  canonical: "/contact",
});

export default function ContactPage() {
  const breadcrumbLd = generateBreadcrumbSchema([
    { name: "Contact", url: "/contact" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <PageHero
        eyebrow={contactData.hero.eyebrow}
        heading={contactData.hero.heading}
        description={contactData.hero.description}
        breadcrumbs={[{ label: "Contact Us" }]}
      />

      <section className="py-20 sm:py-28 bg-[#faf9f5]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Contact Channels & Direct Info */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <SectionLabel>Direct Channels</SectionLabel>
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                  Reach Our Team
                </h2>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  We look forward to hearing from you. Select the most convenient channel below or submit the inquiry form.
                </p>
              </div>

              <div className="space-y-4">
                {contactData.info.name && (
                  <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex items-start gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-xs uppercase tracking-wider font-bold text-slate-500">
                        Contact Person
                      </h3>
                      <p className="text-base font-bold text-slate-900 mt-1">
                        {contactData.info.name}
                      </p>
                      <p className="text-xs text-emerald-800 font-medium">
                        Arvishha Foundation Representative
                      </p>
                    </div>
                  </div>
                )}

                <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex items-start gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-[#03452c] shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-xs uppercase tracking-wider font-bold text-slate-500">
                      Mobile Number
                    </h3>
                    <a
                      href={`tel:${contactData.info.phone.replace(/[^0-9]/g, "")}`}
                      className="text-base font-bold text-slate-900 hover:text-[#03452c] transition-colors block mt-1"
                    >
                      {contactData.info.phone}
                    </a>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex items-start gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-[#03452c] shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-xs uppercase tracking-wider font-bold text-slate-500">
                      Email Address
                    </h3>
                    <a
                      href={`mailto:${contactData.info.email}`}
                      className="text-base font-bold text-slate-900 hover:text-[#03452c] transition-colors block mt-1"
                    >
                      {contactData.info.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Statutory details box */}
              <div className="p-5 rounded-2xl bg-[#023420] text-emerald-100 text-xs space-y-2 border border-emerald-900">
                <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Statutory Registrations</span>
                </div>
                <p>Registration No: {contactData.info.registrationNumber}</p>
                <p>NITI Aayog Darpan: {contactData.info.darpanId}</p>
                <p>{contactData.info.taxExemption}</p>
              </div>
            </div>

            {/* Contact Form Card */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-lg">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-slate-900">
                  Send A Message
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  Fill in your details below and our team will get back to you within 24–48 hours.
                </p>
              </div>

              <ContactForm />
            </div>
          </div>
        </Container>
      </section>

      {/* Frequently Asked Section on Contact Page */}
      <section className="py-20 bg-white border-t border-slate-200/60">
        <Container size="narrow">
          <div className="text-center mb-12">
            <SectionLabel>Common Inquiries</SectionLabel>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Questions Before Reaching Out?
            </h2>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {contactData.faq.map((item) => (
              <AccordionItem key={item.id} value={item.id}>
                <AccordionTrigger className="text-left font-semibold text-slate-900 hover:text-[#03452c]">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 text-sm leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Container>
      </section>
    </>
  );
}
