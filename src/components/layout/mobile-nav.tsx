"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PERSONAL_INFO, ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";
import { LocaleSwitcher } from "./locale-switcher";
import { useClientLocale } from "@/hooks/use-client-locale";
import { getCommonText } from "@/lib/translations";
import type { Locale } from "@/lib/locale";

interface NavItem {
  href: string;
  label: string;
}

interface MobileNavProps {
  navItems: NavItem[];
  contactLabel: string;
  locale: Locale;
  localeSwitchLabel: string;
}

export function MobileNav({ navItems, contactLabel, locale, localeSwitchLabel }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const clientLocale = useClientLocale();
  const common = getCommonText(clientLocale);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? common.menuClose : common.menuOpen}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-blue-200 bg-white/80 text-blue-700 backdrop-blur-sm dark:border-blue-400/25 dark:bg-slate-950/70 dark:text-blue-200"
      >
        {open ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 top-16 z-40 bg-slate-950/45 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <nav className="fixed inset-x-0 top-16 z-50 border-b border-blue-950/10 bg-white/95 p-4 shadow-2xl shadow-blue-950/10 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/95">
            <ul className="space-y-1">
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href === ROUTES.projects && pathname.startsWith(`${ROUTES.projects}/`));

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "block rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-200"
                          : "text-zinc-700 hover:bg-blue-50 dark:text-zinc-300 dark:hover:bg-blue-950/30",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="mt-4 space-y-3 border-t border-zinc-100 pt-4 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <LocaleSwitcher locale={locale} label={localeSwitchLabel} className="flex-1 justify-center" />
                <ThemeToggle />
              </div>
              <Button asChild className="w-full" size="sm">
                <a href={`mailto:${PERSONAL_INFO.email}`}>
                  {contactLabel}
                </a>
              </Button>
            </div>
          </nav>
        </>
      )}
    </div>
  );
}
