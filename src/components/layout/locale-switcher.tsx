"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/locale";

interface LocaleSwitcherProps {
  locale: Locale;
  label: string;
  className?: string;
}

export function LocaleSwitcher({ locale, label, className }: LocaleSwitcherProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const nextLocale: Locale = locale === "zh" ? "en" : "zh";

  const handleSwitch = () => {
    startTransition(async () => {
      await fetch("/api/locale", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale: nextLocale }),
      });
      window.dispatchEvent(new Event("locale-change"));
      router.refresh();
    });
  };

  return (
    <button
      type="button"
      disabled={pending}
      onClick={handleSwitch}
      className={cn(
        "inline-flex h-9 items-center rounded-lg border border-zinc-200 bg-white px-3 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-50 disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800",
        className,
      )}
      aria-label={`Switch to ${nextLocale === "zh" ? "Chinese" : "English"}`}
    >
      {label}
    </button>
  );
}
