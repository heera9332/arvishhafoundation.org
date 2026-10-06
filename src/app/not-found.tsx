import React from "react";
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex-1 flex items-center justify-center py-32 bg-[#faf9f5]">
      <Container size="narrow" className="text-center space-y-6">
        <span className="inline-block text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 uppercase tracking-widest">
          404 — Page Not Found
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Looking for Something Else?
        </h1>
        <p className="text-slate-600 max-w-md mx-auto text-base leading-relaxed">
          The page or initiative you are looking for may have moved or is temporarily unavailable.
        </p>
        <div className="pt-4 flex flex-wrap gap-4 justify-center">
          <Button asChild className="bg-[#03452c] hover:bg-[#023320] text-white rounded-full">
            <Link href="/" className="inline-flex items-center gap-2">
              <Home className="h-4 w-4" />
              <span>Return Home</span>
            </Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/what-we-do" className="inline-flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Explore Our Work</span>
            </Link>
          </Button>
        </div>
      </Container>
    </div>
  );
}
