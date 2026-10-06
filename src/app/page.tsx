import { homeData } from "@/data/page-home";
import { HomeHero } from "@/components/home/HomeHero";
import { ImpactTrust } from "@/components/home/ImpactTrust";
import { FocusAreas } from "@/components/home/FocusAreas";
import { MissionSection } from "@/components/home/MissionSection";
import { ImpactDarkSection } from "@/components/home/ImpactDarkSection";
import { ProjectsSection } from "@/components/home/ProjectsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { CTASection } from "@/components/home/CTASection";
import { FAQSection } from "@/components/home/FAQSection";
import { NewsSection } from "@/components/home/NewsSection";
import { ContactSection } from "@/components/home/ContactSection";
import { constructMetadata, generateOrganizationSchema } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Arvishha Foundation — Development. Dignity. Social Change.",
  description:
    "Arvishha Foundation is a modern non-governmental organization working on education, women empowerment, child welfare, preventive healthcare, rights awareness, and sustainable development.",
  canonical: "/",
});

export default function HomePage() {
  const jsonLd = generateOrganizationSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 2. Hero */}
      <HomeHero data={homeData.hero} />

      {/* 3. Impact / Trust Section */}
      <ImpactTrust data={homeData.impactStats} />

      {/* 4. Focus Areas */}
      <FocusAreas data={homeData.focusAreas} />

      {/* 5. About / Mission Section */}
      <MissionSection data={homeData.missionApproach} />

      {/* 6. Impact Dark-Green Section */}
      <ImpactDarkSection data={homeData.impactDark} />

      {/* 7. Programs / Projects */}
      <ProjectsSection data={homeData.projects} />

      {/* 8. Stories / Testimonials */}
      <TestimonialsSection data={homeData.testimonials} />

      {/* 9. How We Work / Process */}
      <ProcessSection data={homeData.approach} />

      {/* 10. CTA */}
      <CTASection data={homeData.cta} />

      {/* 11. FAQ */}
      <FAQSection data={homeData.faq} />

      {/* 12. News & Stories */}
      <NewsSection data={homeData.news} />

      {/* 13. Contact Section */}
      <ContactSection data={homeData.contact} />
    </>
  );
}
