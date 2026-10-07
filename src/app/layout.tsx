import { Suspense } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { constructMetadata } from "@/lib/seo";
import { MaintenanceSync } from "@/components/common/MaintenanceSync";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = constructMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full scroll-smooth`}>
      <head>
        <link rel="icon" href="/images/logo.png" />
      </head>
      <body className="min-h-full flex flex-col font-sans antialiased text-slate-900 bg-white selection:bg-[#03452c] selection:text-white">
        <Suspense fallback={null}>
          <MaintenanceSync />
        </Suspense>
        <Header />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

