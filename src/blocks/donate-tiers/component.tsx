import React from "react";
import type { DonateTiersBlock } from "@/payload-types";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/common/SectionLabel";
import { Button } from "@/components/ui/button";
import { Building, CheckCircle2 } from "lucide-react";
import { donateData } from "@/data/page-donate";

export function DonateTiersComponent(block: DonateTiersBlock) {
  const eyebrow = block.eyebrow || donateData.hero.eyebrow;
  const heading = block.heading || donateData.hero.heading;
  const description = block.description || donateData.hero.description;
  const tiers =
    block.tiers && block.tiers.length > 0
      ? block.tiers
      : donateData.impactOptions;

  const bank = {
    accountName:
      block.bankDetails?.accountName || donateData.bankDetails.accountName,
    accountNumber:
      block.bankDetails?.accountNumber || donateData.bankDetails.accountNumber,
    bankName: block.bankDetails?.bankName || donateData.bankDetails.bankName,
    branch: block.bankDetails?.branch || donateData.bankDetails.branch,
    ifscCode: block.bankDetails?.ifscCode || donateData.bankDetails.ifscCode,
    upiId: block.bankDetails?.upiId || donateData.bankDetails.upiId,
  };

  const transparencyPoints =
    block.transparencyPoints && block.transparencyPoints.length > 0
      ? block.transparencyPoints.map((p) => p.point)
      : [
          "Transparent audited financial disclosures",
          "Quarterly impact and photographic field dispatches",
          "Official digitally signed contribution receipts",
        ];

  return (
    <section className="py-20 sm:py-28 bg-[#faf9f5]">
      <Container>
        {/* Impact Donation Tiers */}
        <div className="mb-20">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <SectionLabel>{eyebrow}</SectionLabel>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {heading}
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base">
              {description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiers.map((tier, idx) => {
              const key =
                "id" in tier && typeof tier.id === "string" ? tier.id : idx;
              return (
                <div
                  key={key}
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
              );
            })}
          </div>
        </div>

        {/* Bank Transfer & Details Card */}
        <div
          id="bank-transfer"
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start scroll-mt-32"
        >
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-lg space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-[#03452c]">
                <Building className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 leading-tight">
                  Direct Bank Transfer &amp; UPI
                </h3>
                <p className="text-xs text-slate-500">
                  Official account for donor contributions
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block mb-1">Account Name</span>
                <span className="font-bold text-slate-900 font-mono text-sm">
                  {bank.accountName}
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block mb-1">Account Number</span>
                <span className="font-bold text-slate-900 font-mono text-sm">
                  {bank.accountNumber}
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block mb-1">Bank Name</span>
                <span className="font-bold text-slate-900">
                  {bank.bankName}
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block mb-1">Branch</span>
                <span className="font-bold text-slate-900">
                  {bank.branch}
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block mb-1">IFSC Code</span>
                <span className="font-bold text-slate-900 font-mono text-sm">
                  {bank.ifscCode}
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block mb-1">UPI ID</span>
                <span className="font-bold text-emerald-800 font-mono text-sm">
                  {bank.upiId}
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#023420] text-white rounded-3xl p-8 sm:p-10 shadow-lg space-y-5">
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
              Tax Benefits &amp; Assurance
            </span>
            <h3 className="text-2xl font-bold leading-tight">
              100% Transparency Guarantee
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
              Every donation received directly funds our grassroots learning
              centers, healthcare initiatives, and skill training workshops.
            </p>
            <ul className="space-y-3 text-xs sm:text-sm text-emerald-100/90 pt-2">
              {transparencyPoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default DonateTiersComponent;
