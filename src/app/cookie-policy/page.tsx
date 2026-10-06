import React from "react";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/common/PageHero";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Cookie Policy — Arvishha Foundation",
  description: "Information regarding cookie usage on the Arvishha Foundation website.",
  canonical: "/cookie-policy",
});

export default function CookiePolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal & Governance"
        heading="Cookie Policy"
        description="Understanding how cookies are used to enhance your experience."
        breadcrumbs={[{ label: "Cookie Policy" }]}
      />
      <section className="py-16 sm:py-24 bg-white">
        <Container size="narrow" className="prose prose-slate max-w-none space-y-6">
          <p className="lead text-base sm:text-lg text-slate-700 leading-relaxed">
            Our website uses minimal, essential cookies and analytics to evaluate technical performance, maintain security, and optimize user experience.
          </p>
          <h2 className="text-2xl font-bold text-slate-900 pt-4">Essential Cookies</h2>
          <p>
            These cookies are required for basic navigation and functional operations, such as session management and form submissions.
          </p>
          <h2 className="text-2xl font-bold text-slate-900 pt-4">Managing Preferences</h2>
          <p>
            You can configure your browser to reject cookies or prompt you before accepting them. Disabling essential cookies may impact specific functionality.
          </p>
        </Container>
      </section>
    </>
  );
}
