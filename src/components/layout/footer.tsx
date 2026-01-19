import Link from "next/link";
import { ROUTES, APP_CONFIG } from "@/lib/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-black/[.08] dark:border-white/[.145] bg-white dark:bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{APP_CONFIG.name}</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {APP_CONFIG.description}
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">导航</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href={ROUTES.home}
                  className="text-zinc-600 dark:text-zinc-400 hover:text-foreground transition-colors"
                >
                  首页
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.about}
                  className="text-zinc-600 dark:text-zinc-400 hover:text-foreground transition-colors"
                >
                  关于
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.contact}
                  className="text-zinc-600 dark:text-zinc-400 hover:text-foreground transition-colors"
                >
                  联系
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">资源</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://nextjs.org/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-600 dark:text-zinc-400 hover:text-foreground transition-colors"
                >
                  文档
                </a>
              </li>
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-600 dark:text-zinc-400 hover:text-foreground transition-colors"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">联系</h4>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              如有问题，请联系我们
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-black/[.08] dark:border-white/[.145]">
          <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
            © {currentYear} {APP_CONFIG.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

