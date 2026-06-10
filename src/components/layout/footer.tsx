"use client";

import { memo } from "react";
import Link from "next/link";
import { PERSONAL_INFO } from "@/lib/constants";
import type { getFooterText, getPersonalProfile } from "@/lib/translations";

type FooterText = ReturnType<typeof getFooterText>;
type Profile = ReturnType<typeof getPersonalProfile>;

interface FooterProps {
  navItems: { label: string; href: string }[];
  footerText: FooterText;
  profile: Profile;
}

export const Footer = memo(function Footer({ navItems, footerText, profile }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { label: "GitHub", href: PERSONAL_INFO.github },
    { label: "Cookie AI", href: PERSONAL_INFO.website },
    { label: footerText.emailLink, href: `mailto:${PERSONAL_INFO.email}` },
  ];

  return (
    <footer className="border-t border-blue-950/10 bg-white/65 backdrop-blur-xl transition-colors duration-300 dark:border-white/10 dark:bg-slate-950/70">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white shadow-lg shadow-blue-600/20">
                {PERSONAL_INFO.displayName[0].toUpperCase()}
              </div>
              <div>
                <span className="text-lg font-bold">{PERSONAL_INFO.displayName}</span>
                <p className="text-xs text-zinc-500">@{PERSONAL_INFO.handle}</p>
              </div>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {profile.title} · {profile.tagline}
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">{footerText.navTitle}</h4>
            <ul className="space-y-2 text-sm">
              {navItems.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-zinc-600 transition-colors hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">{footerText.linksTitle}</h4>
            <ul className="space-y-2 text-sm">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-zinc-600 transition-colors hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">{footerText.ctaTitle}</h4>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="inline-flex text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-300"
            >
              {footerText.sendEmail}
            </a>
            <p className="text-xs text-zinc-500">{footerText.expertise}</p>
          </div>
        </div>

        <div className="mt-8 border-t border-blue-950/10 pt-8 dark:border-white/10">
          <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
            © {currentYear} {PERSONAL_INFO.displayName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
});
