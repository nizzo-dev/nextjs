"use client";

import type { MouseEvent } from "react";
import { useTheme } from "@/hooks/use-theme";
import { useClientLocale } from "@/hooks/use-client-locale";
import { getCommonText } from "@/lib/translations";
import { cn } from "@/lib/utils";

function toggleThemeWithReveal(
  button: HTMLButtonElement,
  event: MouseEvent<HTMLButtonElement>,
  nextTheme: "light" | "dark",
  setTheme: (theme: "light" | "dark") => void,
) {
  const startViewTransition = document.startViewTransition;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (typeof startViewTransition !== "function" || prefersReducedMotion) {
    setTheme(nextTheme);
    return;
  }

  const buttonRect = button.getBoundingClientRect();
  const x = event.clientX || buttonRect.left + buttonRect.width / 2;
  const y = event.clientY || buttonRect.top + buttonRect.height / 2;
  const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

  try {
    const transition = startViewTransition.call(document, () => {
      setTheme(nextTheme);
    });

    void transition.ready
      .then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${radius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 520,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            fill: "both",
            pseudoElement: "::view-transition-new(root)",
          } as KeyframeAnimationOptions & { pseudoElement: string },
        );
      })
      .catch(() => undefined);
  } catch {
    setTheme(nextTheme);
  }
}

export function ThemeToggle({ className }: { className?: string }) {
  const { mounted, resolvedTheme, setTheme } = useTheme();
  const locale = useClientLocale();
  const common = getCommonText(locale);
  const buttonClassName = cn(
    "inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800",
    className,
  );

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label={common.themeToDark}
        disabled
        className={cn(buttonClassName, "opacity-80")}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      </button>
    );
  }

  return (
    <button
      type="button"
      aria-label={resolvedTheme === "dark" ? common.themeToLight : common.themeToDark}
      onClick={(event) =>
        toggleThemeWithReveal(
          event.currentTarget,
          event,
          resolvedTheme === "dark" ? "light" : "dark",
          setTheme,
        )
      }
      className={buttonClassName}
    >
      {resolvedTheme === "dark" ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      )}
    </button>
  );
}
