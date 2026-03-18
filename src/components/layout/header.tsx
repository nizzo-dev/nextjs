"use client";

import { memo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PERSONAL_INFO, ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";

export const Header = memo(function Header() {
  const pathname = usePathname();

  const navItems = [
    { href: ROUTES.home, label: "首页" },
    { href: ROUTES.about, label: "关于" },
    { href: ROUTES.projects, label: "项目" },
    { href: ROUTES.resume, label: "简历" },
    { href: ROUTES.contact, label: "联系" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/[.08] bg-white/80 backdrop-blur-sm dark:border-white/[.145] dark:bg-black/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href={ROUTES.home} className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-sm font-bold text-white">
            {PERSONAL_INFO.name[0].toUpperCase()}
          </div>
          <span className="text-lg font-bold">{PERSONAL_INFO.name}</span>
        </Link>

        <nav className="hidden items-center space-x-1 md:flex">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href === ROUTES.projects && pathname.startsWith(`${ROUTES.projects}/`));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-colors duration-200",
                  isActive ? "text-foreground" : "text-zinc-600 hover:text-foreground dark:text-zinc-400",
                )}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-indigo-500" />
                )}
              </Link>
            );
          })}
        </nav>

        <a href={`mailto:${PERSONAL_INFO.email}`}>
          <Button size="sm">联系我</Button>
        </a>
      </div>
    </header>
  );
});
