"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import { defaultEase, gsap, prefersReducedMotion, registerGsap } from "@/lib/gsap";

export interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  y?: number;
  delay?: number;
  duration?: number;
  start?: string;
}

export function ScrollReveal({
  children,
  className,
  y = 40,
  delay = 0,
  duration = 0.7,
  start = "top 85%",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const el = ref.current;
      if (!el) return;

      if (prefersReducedMotion()) {
        gsap.set(el, { opacity: 1, y: 0 });
        return;
      }

      gsap.from(el, {
        y,
        opacity: 0,
        duration,
        delay,
        ease: defaultEase,
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: "play none none none",
        },
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
