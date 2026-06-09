"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import { defaultEase, gsap, prefersReducedMotion, registerGsap } from "@/lib/gsap";

export interface HeroTimelineProps {
  children: React.ReactNode;
  className?: string;
}

export function HeroTimeline({ children, className }: HeroTimelineProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      if (prefersReducedMotion()) return;

      const tl = gsap.timeline({ defaults: { ease: defaultEase } });

      tl.from(".hero-avatar", { scale: 0.8, opacity: 0, duration: 0.6 })
        .from(".hero-title", { y: 30, opacity: 0, duration: 0.5 }, "-=0.3")
        .from(".hero-subtitle", { y: 20, opacity: 0, duration: 0.4 }, "-=0.2")
        .from(".hero-cta > *", { y: 15, opacity: 0, duration: 0.35, stagger: 0.1 }, "-=0.1")
        .from(".hero-social > *", { opacity: 0, y: 10, duration: 0.3, stagger: 0.08 }, "-=0.1");
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
