"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import { defaultEase, gsap, prefersReducedMotion, registerGsap } from "@/lib/gsap";

export interface StaggerChildrenProps {
  children: React.ReactNode;
  className?: string;
  childClassName?: string;
  stagger?: number;
  y?: number;
  duration?: number;
  start?: string;
}

export function StaggerChildren({
  children,
  className,
  childClassName,
  stagger = 0.12,
  y = 30,
  duration = 0.6,
  start = "top 85%",
}: StaggerChildrenProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const container = ref.current;
      if (!container) return;

      const items = container.children;
      if (!items.length) return;

      if (prefersReducedMotion()) {
        gsap.set(items, { opacity: 1, y: 0 });
        return;
      }

      gsap.from(items, {
        y,
        opacity: 0,
        duration,
        stagger,
        ease: defaultEase,
        scrollTrigger: {
          trigger: container,
          start,
          toggleActions: "play none none none",
        },
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={cn(className)}>
      {childClassName
        ? Array.isArray(children)
          ? children.map((child, i) => (
              <div key={i} className={childClassName}>
                {child}
              </div>
            ))
          : children
        : children}
    </div>
  );
}
