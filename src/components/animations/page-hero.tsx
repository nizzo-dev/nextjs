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
      tl.from(".page-hero-title", { y: 30, opacity: 0, duration: 0.5 })
        .from(".page-hero-subtitle", { y: 20, opacity: 0, duration: 0.4 }, "-=0.2");
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
