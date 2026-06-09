"use client";

import { useEffect, useState } from "react";
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
  const [locale, setLocale] = useState<Locale>(defaultLocale);

  useEffect(() => {
    setLocale(readLocaleCookie());

    const onLocaleChange = () => setLocale(readLocaleCookie());
    window.addEventListener("locale-change", onLocaleChange);
    return () => window.removeEventListener("locale-change", onLocaleChange);
  }, [pathname]);

  return locale;
}
