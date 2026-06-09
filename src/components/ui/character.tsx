"use client";

import React, { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion, registerGsap } from "@/lib/gsap";

export function MouseFollowCharacter() {
  const leftPupilRef = useRef<SVGCircleElement>(null);
  const rightPupilRef = useRef<SVGCircleElement>(null);
  const leftHighlightRef = useRef<SVGCircleElement>(null);
  const rightHighlightRef = useRef<SVGCircleElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const container = containerRef.current;
      if (!container || prefersReducedMotion()) return;

      gsap.to(container, {
        y: -10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      const hoverIn = () => gsap.to(container, { scale: 1.1, duration: 0.3, ease: "back.out(1.7)" });
      const hoverOut = () => gsap.to(container, { scale: 1, duration: 0.3, ease: "power2.out" });

      container.addEventListener("mouseenter", hoverIn);
      container.addEventListener("mouseleave", hoverOut);

      return () => {
        container.removeEventListener("mouseenter", hoverIn);
        container.removeEventListener("mouseleave", hoverOut);
      };
    },
    { scope: containerRef },
  );

  useEffect(() => {
    const leftPupil = leftPupilRef.current;
    const rightPupil = rightPupilRef.current;
    const leftHighlight = leftHighlightRef.current;
    const rightHighlight = rightHighlightRef.current;

    if (!leftPupil || !rightPupil || !leftHighlight || !rightHighlight) return;

    const container = containerRef.current;
    if (!container) return;

    const eyeConfig = { duration: 0.3, ease: "power2.out", overwrite: "auto" as const };

    const resetEyes = () => {
      gsap.to(leftPupil, { attr: { cx: 40, cy: 45 }, ...eyeConfig });
      gsap.to(rightPupil, { attr: { cx: 60, cy: 45 }, ...eyeConfig });
      gsap.to(leftHighlight, { attr: { cx: 41.5, cy: 43.5 }, ...eyeConfig });
      gsap.to(rightHighlight, { attr: { cx: 61.5, cy: 43.5 }, ...eyeConfig });
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const deltaX = e.clientX - (rect.left + rect.width / 2);
      const deltaY = e.clientY - (rect.top + rect.height / 2);
      const angle = Math.atan2(deltaY, deltaX);
      const distance = Math.min(Math.sqrt(deltaX * deltaX + deltaY * deltaY), 200);
      const radius = (distance / 200) * 6;
      const eyeX = Math.cos(angle) * radius;
      const eyeY = Math.sin(angle) * radius;

      gsap.to(leftPupil, { attr: { cx: 40 + eyeX, cy: 45 + eyeY }, ...eyeConfig });
      gsap.to(rightPupil, { attr: { cx: 60 + eyeX, cy: 45 + eyeY }, ...eyeConfig });
      gsap.to(leftHighlight, { attr: { cx: 40 + eyeX + 1.5, cy: 45 + eyeY - 1.5 }, ...eyeConfig });
      gsap.to(rightHighlight, { attr: { cx: 60 + eyeX + 1.5, cy: 45 + eyeY - 1.5 }, ...eyeConfig });
    };

    container.addEventListener("mouseleave", resetEyes);
    document.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      container.removeEventListener("mouseleave", resetEyes);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="character-container fixed bottom-8 left-8 w-24 h-32 cursor-pointer z-40 will-change-transform"
    >
      <svg viewBox="0 0 100 140" className="w-full h-full">
        <ellipse cx="50" cy="100" rx="35" ry="35" fill="#6366f1" />
        <circle cx="50" cy="45" r="30" fill="#fef3c7" stroke="#6366f1" strokeWidth="2" />
        <path
          d="M25 40 Q30 15 50 18 Q70 15 75 40 Q75 25 50 22 Q25 25 25 40"
          fill="#4b5563"
        />
        <ellipse cx="40" cy="45" rx="10" ry="12" fill="white" stroke="#4b5563" strokeWidth="1" />
        <ellipse cx="60" cy="45" rx="10" ry="12" fill="white" stroke="#4b5563" strokeWidth="1" />
        <circle ref={leftPupilRef} cx="40" cy="45" r="5" fill="#1f2937" />
        <circle ref={rightPupilRef} cx="60" cy="45" r="5" fill="#1f2937" />
        <circle ref={leftHighlightRef} cx="41.5" cy="43.5" r="2" fill="white" />
        <circle ref={rightHighlightRef} cx="61.5" cy="43.5" r="2" fill="white" />
        <ellipse cx="30" cy="58" rx="6" ry="4" fill="#fca5a5" opacity="0.6" />
        <ellipse cx="70" cy="58" rx="6" ry="4" fill="#fca5a5" opacity="0.6" />
        <ellipse cx="20" cy="95" rx="8" ry="15" fill="#6366f1" />
        <ellipse cx="80" cy="95" rx="8" ry="15" fill="#6366f1" />
      </svg>
    </div>
  );
}
