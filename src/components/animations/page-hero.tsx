"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import { defaultEase, gsap, prefersReducedMotion, registerGsap } from "@/lib/gsap";

export interface PageHeroProps {
  children: React.ReactNode;
  className?: string;
}

export function PageHero({ children, className }: PageHeroProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      if (prefersReducedMotion()) return;

      const tl = gsap.timeline({ defaults: { ease: defaultEase } });
      tl.from(".page-hero-kicker", { y: 14, opacity: 0, duration: 0.35 })
        .from(".page-hero-title", { y: 34, opacity: 0, filter: "blur(8px)", duration: 0.6 }, "-=0.15")
        .from(".page-hero-subtitle", { y: 20, opacity: 0, duration: 0.45 }, "-=0.25")
        .from(".page-hero-actions > *", { y: 14, opacity: 0, duration: 0.35, stagger: 0.08 }, "-=0.2")
        .from(".page-hero-visual", { x: 24, opacity: 0, scale: 0.96, duration: 0.65 }, "-=0.45");
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
