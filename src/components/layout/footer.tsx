"use client";

import { memo } from "react";
import Link from "next/link";
import { PERSONAL_INFO, ROUTES } from "@/lib/constants";

export const Footer = memo(function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    navigation: [
      { label: "首页", href: ROUTES.home },
      { label: "关于", href: ROUTES.about },
      { label: "项目", href: ROUTES.projects },
      { label: "简历", href: ROUTES.resume },
      { label: "联系", href: ROUTES.contact },
    ],
    social: [
      { label: "GitHub", href: PERSONAL_INFO.github },
      { label: "AI Demo", href: PERSONAL_INFO.website },
      { label: "Email", href: `mailto:${PERSONAL_INFO.email}` },
    ],
  };

  return (
    <footer className="border-t border-black/10 bg-white/50 transition-colors duration-300 dark:border-white/10 dark:bg-black/50">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-sm font-bold text-white">
                {PERSONAL_INFO.name[0].toUpperCase()}
              </div>
              <span className="text-lg font-bold">{PERSONAL_INFO.name}</span>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {PERSONAL_INFO.title} · {PERSONAL_INFO.bio}
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">导航</h4>
            <ul className="space-y-2 text-sm">
              {footerLinks.navigation.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-zinc-600 transition-colors hover:text-foreground dark:text-zinc-400">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">链接</h4>
            <ul className="space-y-2 text-sm">
              {footerLinks.social.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-zinc-600 transition-colors hover:text-foreground dark:text-zinc-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">联系方式</h4>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">{PERSONAL_INFO.email}</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-500">欢迎交流项目合作、技术方案和 AI 实践。</p>
          </div>
        </div>

        <div className="mt-8 border-t border-black/10 pt-8 dark:border-white/10">
          <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
            © {currentYear} {PERSONAL_INFO.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
});
