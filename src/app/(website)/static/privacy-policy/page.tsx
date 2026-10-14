import React from "react";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/common/PageHero";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Privacy Policy — Arvishha Foundation",
  description: "Privacy Policy and donor data protection policies of Arvishha Foundation.",
  canonical: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal & Governance"
        heading="Privacy Policy"
        description="How Arvishha Foundation collects, protects, and respects donor and community data."
        breadcrumbs={[{ label: "Privacy Policy" }]}
      />
      <section className="py-16 sm:py-24 bg-white">
        <Container size="narrow" className="prose prose-slate max-w-none space-y-6">
          <p className="lead text-base sm:text-lg text-slate-700 leading-relaxed">
            Arvishha Foundation is committed to honoring and protecting the privacy of our visitors, donors, volunteers, and partners. This Privacy Policy details how we handle information collected through our website.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 pt-4">1. Information We Collect</h2>
          <p>
            When you interact with our website—such as submitting our contact form, signing up as a volunteer, subscribing to updates, or making a contribution—we may collect personal details such as your name, email address, phone number, and voluntary notes.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 pt-4">2. Use of Information</h2>
          <p>
            Information collected is strictly utilized to respond to inquiries, send receipts and acknowledgements, deliver requested project newsletters, and coordinate volunteer activities. We do not sell, rent, or trade personal data to third parties.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 pt-4">3. Data Security & Storage</h2>
          <p>
            We implement administrative and technical measures to safeguard information against unauthorized access, alteration, or disclosure.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 pt-4">4. Contact Us</h2>
          <p>
            If you have questions regarding this policy or wish to request data updates, please contact us at <a href="mailto:privacy@arvishhafoundation.org" className="text-[#03452c] underline">privacy@arvishhafoundation.org</a>.
          </p>
        </Container>
      </section>
    </>
  );
}
