"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ROUTES, PERSONAL_INFO } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export function Header() {
  const pathname = usePathname();

  const navItems = [
    { href: ROUTES.home, label: "首页" },
    { href: ROUTES.about, label: "关于" },
    { href: ROUTES.projects, label: "作品" },
    { href: ROUTES.contact, label: "联系" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/[.08] dark:border-white/[.145] bg-white/80 dark:bg-black/80 backdrop-blur-sm animate-fade-in-down">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm transition-transform duration-300 group-hover:scale-110">
            {PERSONAL_INFO.name[0]}
          </div>
          <span className="text-lg font-bold transition-colors group-hover:text-indigo-500">{PERSONAL_INFO.name}</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group relative px-4 py-2 text-sm font-medium transition-colors duration-200",
                pathname === item.href
                  ? "text-foreground"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-foreground"
              )}
            >
              {item.label}
              {/* 活跃状态指示器 */}
              {pathname === item.href && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-indigo-500 animate-pulse-soft" />
              )}
              {/* 悬停下划线动画 */}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-indigo-500 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <a href={`mailto:${PERSONAL_INFO.email}`}>
            <Button size="sm" className="hover-shine">联系我</Button>
          </a>
        </div>
      </div>
    </header>
  );
}
