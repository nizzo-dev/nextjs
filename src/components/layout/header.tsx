"use client";

import { memo, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui/button";
import { PERSONAL_INFO, ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { gsap, registerGsap } from "@/lib/gsap";
import type { Locale } from "@/lib/locale";
import { ThemeToggle } from "./theme-toggle";
import { LocaleSwitcher } from "./locale-switcher";
import { MobileNav } from "./mobile-nav";

interface NavItem {
  href: string;
  label: string;
}

interface HeaderProps {
  locale: Locale;
  navItems: NavItem[];
  contactLabel: string;
  localeSwitchLabel: string;
}

export const Header = memo(function Header({
  locale,
  navItems,
  contactLabel,
  localeSwitchLabel,
}: HeaderProps) {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const nav = navRef.current;
      const indicator = indicatorRef.current;
      if (!nav || !indicator) return;

      const activeLink = nav.querySelector<HTMLElement>('[data-active="true"]');
      if (!activeLink) {
        gsap.set(indicator, { opacity: 0 });
        return;
      }

      const navRect = nav.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();

      gsap.to(indicator, {
        x: linkRect.left - navRect.left,
        width: linkRect.width,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    },
    { dependencies: [pathname] },
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-blue-950/10 bg-white/75 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/75">
      <div className="container mx-auto flex h-16 items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link href={ROUTES.home} className="flex min-w-0 items-center space-x-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white shadow-lg shadow-blue-600/20">
            {PERSONAL_INFO.displayName[0].toUpperCase()}
          </div>
          <div className="min-w-0 leading-tight">
            <span className="block truncate text-sm font-bold">{PERSONAL_INFO.displayName}</span>
            <span className="hidden text-xs text-zinc-500 sm:block dark:text-zinc-400">
              @{PERSONAL_INFO.handle}
            </span>
          </div>
        </Link>

        <nav ref={navRef} className="relative hidden items-center space-x-1 md:flex">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href === ROUTES.projects && pathname.startsWith(`${ROUTES.projects}/`));

            return (
              <Link
                key={item.href}
                href={item.href}
                data-active={isActive ? "true" : "false"}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-colors duration-200",
                  isActive ? "text-blue-700 dark:text-blue-200" : "text-slate-600 hover:text-blue-700 dark:text-slate-400 dark:hover:text-blue-200",
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <span
            ref={indicatorRef}
            className="pointer-events-none absolute bottom-0 left-0 h-0.5 rounded-full bg-blue-500 shadow-[0_0_16px_rgba(59,130,246,0.55)]"
            style={{ width: 0, opacity: 0 }}
          />
        </nav>

        <div className="flex items-center gap-2">
          <LocaleSwitcher locale={locale} label={localeSwitchLabel} />
          <ThemeToggle />
          <Button asChild size="sm" className="hidden md:inline-flex">
            <a href={`mailto:${PERSONAL_INFO.email}`}>{contactLabel}</a>
          </Button>
          <MobileNav
            navItems={navItems}
            contactLabel={contactLabel}
            locale={locale}
            localeSwitchLabel={localeSwitchLabel}
          />
        </div>
      </div>
    </header>
  );
});
