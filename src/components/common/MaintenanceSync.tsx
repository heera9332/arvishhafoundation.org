"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export const BYPASS_COOKIE_NAME = "maintenance_bypass";
export const BYPASS_STORAGE_KEY = "maintenance_bypass";

export function MaintenanceSync() {
  const searchParams = useSearchParams();

  useEffect(() => {
    try {
      const maintenanceParam = searchParams.get("maintenance")?.toLowerCase();

      // Check query param for explicit toggle
      if (
        maintenanceParam === "false" ||
        maintenanceParam === "0" ||
        maintenanceParam === "off" ||
        maintenanceParam === "no"
      ) {
        sessionStorage.setItem(BYPASS_STORAGE_KEY, "true");
        document.cookie = `${BYPASS_COOKIE_NAME}=true; path=/; max-age=2592000; SameSite=Lax`;
        return;
      }

      if (
        maintenanceParam === "true" ||
        maintenanceParam === "1" ||
        maintenanceParam === "on" ||
        maintenanceParam === "yes"
      ) {
        sessionStorage.removeItem(BYPASS_STORAGE_KEY);
        document.cookie = `${BYPASS_COOKIE_NAME}=; path=/; max-age=0; SameSite=Lax`;
        return;
      }

      // Sync between cookie and sessionStorage
      const hasCookie = document.cookie
        .split(";")
        .some((c) => c.trim().startsWith(`${BYPASS_COOKIE_NAME}=true`));

      const hasSession = sessionStorage.getItem(BYPASS_STORAGE_KEY) === "true";

      if (hasCookie && !hasSession) {
        // Cookie exists, ensure sessionStorage is populated
        sessionStorage.setItem(BYPASS_STORAGE_KEY, "true");
      } else if (!hasCookie && hasSession) {
        // Session storage has bypass but cookie is missing (e.g., cleared), restore cookie and refresh
        document.cookie = `${BYPASS_COOKIE_NAME}=true; path=/; max-age=2592000; SameSite=Lax`;
        window.location.reload();
      }
    } catch {
      // Storage access may fail under strict security/privacy configurations
    }
  }, [searchParams]);

  return null;
}
