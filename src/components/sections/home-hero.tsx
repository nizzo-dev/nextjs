"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { defaultEase, gsap, prefersReducedMotion, registerGsap } from "@/lib/gsap";

interface HomeHeroProps {
  greeting: string;
  displayName: string;
  tagline: string;
  bio: string;
  primaryAction: string;
  secondaryAction: string;
  stats: { value: string; label: string }[];
}

export function HomeHero({
  greeting,
  displayName,
  tagline,
  bio,
  primaryAction,
  secondaryAction,
  stats,
}: HomeHeroProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();
      if (prefersReducedMotion()) return;

      const tl = gsap.timeline({ defaults: { ease: defaultEase } });
      tl.from(".hero-eyebrow", { y: 12, opacity: 0, duration: 0.45 })
        .from(".hero-title", { y: 28, opacity: 0, filter: "blur(8px)", duration: 0.6 }, "-=0.2")
        .from(".hero-subtitle", { y: 18, opacity: 0, duration: 0.45 }, "-=0.25")
        .from(".hero-cta > *", { y: 14, opacity: 0, duration: 0.35, stagger: 0.08 }, "-=0.15")
        .from(".hero-visual", { x: 28, opacity: 0, scale: 0.96, duration: 0.7 }, "-=0.4")
        .from(".hero-stat", { y: 10, opacity: 0, duration: 0.35, stagger: 0.06 }, "-=0.2");
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      className="relative grid min-h-[100dvh] grid-cols-1 items-center gap-10 pt-20 pb-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 lg:pt-24"
    >
      <div className="flex flex-col justify-center space-y-6 lg:space-y-8">
        <p className="hero-eyebrow font-mono text-xs tracking-[0.2em] text-blue-600 dark:text-blue-300">
          {tagline}
        </p>

        <h1 className="hero-title text-4xl font-bold leading-[1.08] tracking-tight md:text-5xl lg:text-6xl">
          {greeting}{" "}
          <span className="text-blue-600 dark:text-blue-300">{displayName}</span>
        </h1>

        <p className="hero-subtitle max-w-[42ch] text-base leading-relaxed text-zinc-600 dark:text-zinc-400 md:text-lg">
          {bio}
        </p>

        <div className="hero-cta flex flex-wrap gap-3 pt-1">
          <Button asChild size="lg" className="px-7">
            <Link href={ROUTES.projects}>
              {primaryAction}
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="px-7">
            <Link href={ROUTES.resume}>
              {secondaryAction}
            </Link>
          </Button>
        </div>
      </div>

      <div className="hero-visual relative mx-auto w-full max-w-lg lg:max-w-none lg:justify-self-end">
        <div className="relative overflow-hidden rounded-2xl border border-blue-200/70 bg-slate-950 shadow-2xl shadow-blue-950/20 dark:border-blue-400/20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(59,130,246,0.24),transparent_55%)]" />
          <div className="relative aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5]">
            <Image
              src="https://picsum.photos/seed/pipi-dev-workspace/800/1000"
              alt="Developer workspace"
              fill
              priority
              className="object-cover opacity-90"
              sizes="(max-width: 1024px) 100vw, 480px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <div className="grid grid-cols-3 gap-3 border-t border-white/10 pt-5">
                {stats.map((stat, i) => (
                  <div
                    key={stat.label}
                    className={cn(
                      "hero-stat text-center",
                      i > 0 && "border-l border-white/10",
                    )}
                  >
                    <div className="font-mono text-lg font-semibold text-white md:text-xl">
                      {stat.value}
                    </div>
                    <div className="mt-1 text-[10px] uppercase tracking-wider text-white/60 md:text-xs">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div
          aria-hidden
          className="absolute -right-4 -top-4 -z-10 h-full w-full rounded-2xl border border-blue-500/20 bg-blue-500/5"
        />
      </div>
    </section>
  );
}
