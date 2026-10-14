import React from "react";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/common/PageHero";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Terms & Conditions — Arvishha Foundation",
  description: "Terms and conditions of use for Arvishha Foundation.",
  canonical: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal & Governance"
        heading="Terms & Conditions"
        description="Guidelines governing the use of the Arvishha Foundation website."
        breadcrumbs={[{ label: "Terms & Conditions" }]}
      />
      <section className="py-16 sm:py-24 bg-white">
        <Container size="narrow" className="prose prose-slate max-w-none space-y-6">
          <p className="lead text-base sm:text-lg text-slate-700 leading-relaxed">
            By accessing and browsing the Arvishha Foundation website, you acknowledge agreement with the following terms and conditions.
          </p>
          <h2 className="text-2xl font-bold text-slate-900 pt-4">1. Non-Profit Mission</h2>
          <p>
            All information provided on this platform is for community awareness, educational non-profit advocacy, and public engagement.
          </p>
          <h2 className="text-2xl font-bold text-slate-900 pt-4">2. Intellectual Property</h2>
          <p>
            All text, branding, and proprietary media are the intellectual property of Arvishha Foundation unless indicated otherwise. Authentic photographs of beneficiaries may not be reproduced without written permission.
          </p>
          <h2 className="text-2xl font-bold text-slate-900 pt-4">3. Governing Law</h2>
          <p>
            These terms are governed by the statutory non-profit and civil laws of the relevant jurisdiction.
          </p>
        </Container>
      </section>
    </>
  );
}
