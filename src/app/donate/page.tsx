import Link from "next/link";
import { CheckCircle2, ShieldCheck, Building, ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/common/PageHero";
import { SectionLabel } from "@/components/common/SectionLabel";
import { Button } from "@/components/ui/button";
import { donateData } from "@/data/page-donate";
import { constructMetadata, generateBreadcrumbSchema } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Donate & Support — Arvishha Foundation",
  description:
    "Support Arvishha Foundation. Every donation directly powers community learning centers, women vocational training, and free health checkups.",
  canonical: "/donate",
});

export default function DonatePage() {
  const breadcrumbLd = generateBreadcrumbSchema([
    { name: "Donate", url: "/donate" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <PageHero
        eyebrow={donateData.hero.eyebrow}
        heading={donateData.hero.heading}
        description={donateData.hero.description}
        breadcrumbs={[{ label: "Donate / Support" }]}
      />

      <section className="py-20 sm:py-28 bg-[#faf9f5]">
        <Container>
          {/* Impact Donation Tiers */}
          <div className="mb-20">
            <div className="max-w-2xl mx-auto text-center mb-12">
              <SectionLabel>Your Impact in Numbers</SectionLabel>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Where Your Contribution Goes
              </h2>
              <p className="mt-3 text-slate-600 text-sm sm:text-base">
                Choose an initiative you feel passionate about to sponsor directly.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {donateData.impactOptions.map((tier, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
                >
                  <div>
                    <span className="inline-block text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-[#03452c] border border-emerald-200 mb-4">
                      {tier.amount}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug group-hover:text-[#03452c] transition-colors">
                      {tier.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {tier.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <Button
                      asChild
                      className="w-full bg-[#03452c] hover:bg-[#023320] text-white rounded-full text-xs font-semibold py-2.5 h-auto justify-center"
                    >
                      <a href="#bank-transfer">Donate This Amount</a>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bank Transfer & Wire Details */}
          <div
            id="bank-transfer"
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start scroll-mt-32"
          >
            {/* Account Details */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-lg space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-[#03452c]">
                  <Building className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 leading-tight">
                    Direct Bank Transfer & UPI
                  </h3>
                  <p className="text-xs text-slate-500">
                    Official account for donor contributions
                  </p>
                </div>
              </div>

              <div className="space-y-4 pt-2">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-slate-500 uppercase">
                    Account Name
                  </span>
                  <span className="text-sm font-bold text-slate-900">
                    {donateData.bankDetails.accountName}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-slate-500 uppercase">
                    Account Number
                  </span>
                  <span className="text-sm font-mono font-bold text-[#03452c]">
                    {donateData.bankDetails.accountNumber}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
                    <span className="text-xs font-semibold text-slate-500 uppercase block mb-1">
                      Bank Name & Branch
                    </span>
                    <span className="text-sm font-semibold text-slate-900">
                      {donateData.bankDetails.bankName}
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
                    <span className="text-xs font-semibold text-slate-500 uppercase block mb-1">
                      IFSC / SWIFT Code
                    </span>
                    <span className="text-sm font-mono font-bold text-slate-900">
                      {donateData.bankDetails.ifscCode}
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-xs font-bold text-amber-900 uppercase">
                    UPI ID (Google Pay, PhonePe, Paytm)
                  </span>
                  <span className="text-sm font-mono font-bold text-slate-900">
                    {donateData.bankDetails.upiId}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed pt-2">
                * After making a direct wire transfer, please email your transaction receipt along with your PAN / ID number to{" "}
                <a
                  href="mailto:donations@arvishhafoundation.org"
                  className="font-bold text-[#03452c] underline"
                >
                  donations@arvishhafoundation.org
                </a>{" "}
                to receive an official 80G tax receipt and acknowledgement certificate.
              </p>
            </div>

            {/* Transparency & Impact Assurance */}
            <div className="lg:col-span-5 bg-[#023420] text-white rounded-3xl p-8 sm:p-10 shadow-lg space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 text-amber-400 text-xs font-bold border border-emerald-800">
                <ShieldCheck className="h-4 w-4" />
                <span>100% Transparent Non-Profit</span>
              </div>

              <h3 className="text-2xl font-bold leading-tight">
                Our Pledge to Every Donor
              </h3>

              <div className="space-y-4 pt-2">
                {donateData.transparencyPoints.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                    <p className="text-sm text-emerald-100 leading-relaxed">
                      {point}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-emerald-900">
                <Button
                  asChild
                  className="w-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-full py-3 h-auto justify-center"
                >
                  <Link href="/contact" className="inline-flex items-center gap-2">
                    <span>Inquire About CSR Grant / Wire</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
