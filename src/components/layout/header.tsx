"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export function Header() {
  const pathname = usePathname();

  const navItems = [
    { href: ROUTES.home, label: "首页" },
    { href: ROUTES.about, label: "关于" },
    { href: ROUTES.contact, label: "联系" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/[.08] dark:border-white/[.145] bg-white/80 dark:bg-black/80 backdrop-blur-sm animate-fade-in-down">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2 group">
          <span className="text-xl font-bold transition-transform duration-300 group-hover:scale-110">Pani</span>
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
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-foreground animate-pulse-soft" />
              )}
              {/* 悬停下划线动画 */}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-foreground/50 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <Link href={ROUTES.login}>
            <Button variant="outline" size="sm">登录</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

