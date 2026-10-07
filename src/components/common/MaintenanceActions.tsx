"use client";

import React, { useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { KeyRound, Unlock, Lock, CheckCircle2, ArrowRight } from "lucide-react";
import { BYPASS_COOKIE_NAME, BYPASS_STORAGE_KEY } from "./MaintenanceSync";

function getBypassSnapshot(): boolean {
  try {
    const hasCookie = document.cookie
      .split(";")
      .some((c) => c.trim().startsWith(`${BYPASS_COOKIE_NAME}=true`));
    const hasStorage = sessionStorage.getItem(BYPASS_STORAGE_KEY) === "true";
    return hasCookie || hasStorage;
  } catch {
    return false;
  }
}

function getBypassServerSnapshot(): boolean {
  return false;
}

function subscribeBypass(callback: () => void): () => void {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

export function MaintenanceActions() {
  const router = useRouter();
  const isBypassed = useSyncExternalStore(
    subscribeBypass,
    getBypassSnapshot,
    getBypassServerSnapshot
  );

  const [showStaffModal, setShowStaffModal] = useState<boolean>(false);
  const [accessCode, setAccessCode] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const handleBypassUnlock = () => {
    try {
      sessionStorage.setItem(BYPASS_STORAGE_KEY, "true");
      document.cookie = `${BYPASS_COOKIE_NAME}=true; path=/; max-age=2592000; SameSite=Lax`;
    } catch {
      // Ignore storage restrictions
    }
    router.push("/?maintenance=false");
    router.refresh();
  };

  const handleReLock = () => {
    try {
      sessionStorage.removeItem(BYPASS_STORAGE_KEY);
      document.cookie = `${BYPASS_COOKIE_NAME}=; path=/; max-age=0; SameSite=Lax`;
    } catch {
      // Ignore
    }
    router.push("/?maintenance=true");
    router.refresh();
  };

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = accessCode.trim().toLowerCase();
    if (
      clean === "maintenance=false" ||
      clean === "false" ||
      clean === "preview" ||
      clean === "unlock"
    ) {
      handleBypassUnlock();
    } else {
      setErrorMsg("Invalid access code. Use 'preview' or append ?maintenance=false to any URL.");
    }
  };

  if (isBypassed) {
    return (
      <div className="w-full max-w-md mx-auto p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 backdrop-blur-md text-emerald-100 flex flex-col items-center gap-3 shadow-xl">
        <div className="flex items-center gap-2 text-emerald-300 font-semibold text-sm">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>Website Preview Mode Active</span>
        </div>
        <p className="text-xs text-emerald-200/80 text-center">
          You have unlocked maintenance mode on this device (persisted in cookies and session storage).
        </p>
        <div className="flex flex-wrap gap-2 justify-center w-full mt-1">
          <Button
            variant="accent"
            size="sm"
            onClick={() => {
              router.push("/");
              router.refresh();
            }}
            className="gap-2"
          >
            <span>Go to Homepage</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
          <Button
            variant="outlineLight"
            size="sm"
            onClick={handleReLock}
            className="text-xs text-red-200 hover:text-red-100 border-red-500/30 hover:border-red-500/60"
          >
            <Lock className="w-3.5 h-3.5 mr-1 text-red-400" />
            Re-lock Site
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center gap-3">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button
          variant="outlineLight"
          size="sm"
          onClick={() => setShowStaffModal(!showStaffModal)}
          className="text-xs text-slate-300 hover:text-white border-white/10 hover:border-white/30 backdrop-blur-md"
        >
          <KeyRound className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
          {showStaffModal ? "Hide Preview Access" : "Staff & Preview Access"}
        </Button>
        <Button
          variant="accent"
          size="sm"
          onClick={handleBypassUnlock}
          className="text-xs font-semibold"
        >
          <Unlock className="w-3.5 h-3.5 mr-1.5" />
          Unlock Preview Directly
        </Button>
      </div>

      {showStaffModal && (
        <form
          onSubmit={handleCodeSubmit}
          className="w-full p-4 mt-2 rounded-2xl bg-slate-900/90 border border-slate-700/60 backdrop-blur-md text-left transition-all animate-in fade-in duration-200"
        >
          <div className="text-xs font-semibold text-slate-200 mb-1 flex items-center justify-between">
            <span>Authorized Preview Access</span>
            <span className="text-[10px] text-amber-400/90 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
              maintenance=false
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mb-3">
            Enter <code className="text-amber-300 bg-black/40 px-1 py-0.5 rounded">maintenance=false</code> or code <code className="text-amber-300 bg-black/40 px-1 py-0.5 rounded">preview</code> below, or visit any URL with <code className="text-amber-300 bg-black/40 px-1 py-0.5 rounded">?maintenance=false</code>.
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. maintenance=false or preview"
              value={accessCode}
              onChange={(e) => {
                setAccessCode(e.target.value);
                setErrorMsg("");
              }}
              className="flex-1 px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
            <Button type="submit" variant="primary" size="sm" className="text-xs">
              Apply
            </Button>
          </div>
          {errorMsg && (
            <p className="text-[11px] text-rose-400 mt-2 font-medium">{errorMsg}</p>
          )}
        </form>
      )}
    </div>
  );
}
