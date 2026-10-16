import { Suspense } from "react";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Inter, Lora } from "next/font/google";
import "./globals.css";
import { Header } from "@/global/header/component";
import { Footer } from "@/global/footer/component";
import { getSiteSettings } from "@/global/site-settings";
import { getSEOSettings } from "@/global/seo-settings";
import { constructMetadata } from "@/lib/seo";
import { MaintenanceSync } from "@/components/common/MaintenanceSync";
import { BYPASS_COOKIE_NAME } from "@/proxy";
import MaintenancePage from "@/app/(website)/static/maintenance/page";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const lora = Lora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lora",
  weight: ["400", "500", "600", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  const [settings, seoSettings] = await Promise.all([
    getSiteSettings(),
    getSEOSettings(),
  ]);

  return constructMetadata({
    siteName: settings.siteName,
    tagline: settings.tagline,
    favicon: settings.faviconUrl,
    image: settings.logoUrl || seoSettings.defaultImageUrl,
    seoSettings,
  });
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  // If maintenance mode is enabled in Site Settings, render MaintenancePage unless bypassed
  if (settings.maintenanceMode) {
    const cookieStore = await cookies();
    const isBypassed = cookieStore.get(BYPASS_COOKIE_NAME)?.value === "true";
    if (!isBypassed) {
      return (
        <html lang="en" className={`${inter.variable} ${lora.variable} h-full`}>
          <head>
            <link rel="icon" href={settings.faviconUrl || "/images/logo.png"} />
          </head>
          <body className="min-h-full flex flex-col font-sans antialiased text-slate-900 bg-[#021b11]">
            <Suspense fallback={null}>
              <MaintenanceSync />
            </Suspense>
            <MaintenancePage />
          </body>
        </html>
      );
    }
  }

  return (
    <html lang="en" className={`${inter.variable} ${lora.variable} h-full scroll-smooth`}>
      <head>
        <link rel="icon" href={settings.faviconUrl || "/images/logo.png"} />
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
