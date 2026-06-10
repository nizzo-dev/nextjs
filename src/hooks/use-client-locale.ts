"use client";

import { useCallback, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { defaultLocale, isLocale, type Locale } from "@/lib/locale";

export function readLocaleCookie(): Locale {
  if (typeof document === "undefined") return defaultLocale;
  const match = document.cookie.match(/(?:^|;\s*)NEXT_LOCALE=(\w+)/);
  const value = match?.[1];
  return value && isLocale(value) ? value : defaultLocale;
}

export function useClientLocale(): Locale {
  const pathname = usePathname();

  const subscribe = useCallback((callback: () => void) => {
    window.addEventListener("locale-change", callback);
    return () => window.removeEventListener("locale-change", callback);
  }, []);

  const getSnapshot = useCallback(() => {
    void pathname;
    return readLocaleCookie();
  }, [pathname]);

  return useSyncExternalStore(subscribe, getSnapshot, () => defaultLocale);
}
