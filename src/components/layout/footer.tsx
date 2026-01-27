import Link from "next/link";
import { ROUTES, PERSONAL_INFO } from "@/lib/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    navigation: [
      { label: "首页", href: ROUTES.home },
      { label: "关于", href: ROUTES.about },
      { label: "作品", href: ROUTES.projects },
      { label: "联系", href: ROUTES.contact },
    ],
    social: [
      { label: "GitHub", href: PERSONAL_INFO.github },
      { label: "Twitter", href: PERSONAL_INFO.twitter },
      { label: "LinkedIn", href: PERSONAL_INFO.linkedin },
    ],
  };

  return (
    <footer className="border-t border-black/10 dark:border-white/10 bg-white/50 dark:bg-black/50 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                {PERSONAL_INFO.name[0]}
              </div>
              <span className="text-lg font-bold">{PERSONAL_INFO.name}</span>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 transition-colors duration-300">
              {PERSONAL_INFO.title} - {PERSONAL_INFO.bio}
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold transition-colors duration-300">导航</h4>
            <ul className="space-y-2 text-sm">
              {footerLinks.navigation.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-zinc-600 dark:text-zinc-400 hover:text-foreground transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold transition-colors duration-300">社交</h4>
            <ul className="space-y-2 text-sm">
              {footerLinks.social.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-600 dark:text-zinc-400 hover:text-foreground transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold transition-colors duration-300">联系我</h4>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 transition-colors duration-300">
              {PERSONAL_INFO.email}
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-500">
              期待与你的合作！
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-black/10 dark:border-white/10 transition-colors duration-300">
          <p className="text-center text-sm text-zinc-600 dark:text-zinc-400 transition-colors duration-300">
            © {currentYear} {PERSONAL_INFO.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
