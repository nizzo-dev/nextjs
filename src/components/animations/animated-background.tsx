"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { gsap, prefersReducedMotion, registerGsap } from "@/lib/gsap";

const PARTICLE_COUNT = 8;

const PARTICLE_POSITIONS = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
  left: (i * 37 + 13) % 100,
  delay: (i * 1.3) % 12,
  duration: 12 + (i % 5) * 2,
  size: 3 + (i % 4),
}));

export function AnimatedBackground() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const containerRef = useRef<HTMLDivElement>(null);
  const timelinesRef = useRef<gsap.core.Timeline[]>([]);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      registerGsap();
      timelinesRef.current.forEach((t) => t.kill());
      timelinesRef.current = [];

      if (prefersReducedMotion()) return;

      const orb1 = containerRef.current.querySelector(".gradient-orb-1");
      const orb2 = containerRef.current.querySelector(".gradient-orb-2");

      if (orb1) {
        gsap.to(orb1, {
          x: isMobile ? -15 : -30,
          y: isMobile ? 15 : 30,
          scale: 1.03,
          duration: 12,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      if (!isMobile && orb2) {
        gsap.to(orb2, {
          x: 40,
          y: 20,
          scale: 1.08,
          duration: 12.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      const orb3 = containerRef.current.querySelector(".gradient-orb-3");
      if (!isMobile && orb3) {
        gsap.set(orb3, { xPercent: -50, yPercent: -50 });
        gsap.to(orb3, {
          scale: 1.15,
          opacity: 0.25,
          duration: 5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      if (!isMobile) {
        const shapes = containerRef.current.querySelectorAll(".floating-shape");
        shapes.forEach((shape, i) => {
          gsap.to(shape, {
            x: 15 * (i % 2 === 0 ? 1 : -1),
            y: -10,
            rotation: 8 * (i % 2 === 0 ? 1 : -1),
            duration: 8 + i * 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * -2,
          });
        });

        const particles = containerRef.current.querySelectorAll(".particle");
        particles.forEach((particle, i) => {
          const pos = PARTICLE_POSITIONS[i];
          const pt = gsap.timeline({ repeat: -1, delay: pos.delay });
          pt.set(particle, { y: window.innerHeight, opacity: 0, rotation: 0 })
            .to(particle, { opacity: 1, duration: pos.duration * 0.1, ease: "none" }, 0)
            .to(particle, { y: -window.innerHeight, rotation: 360, duration: pos.duration, ease: "none" }, 0)
            .to(particle, { opacity: 0, duration: pos.duration * 0.1, ease: "none" }, pos.duration * 0.9);
          timelinesRef.current.push(pt);
        });
      }

      const handleVisibility = () => {
        if (document.hidden) gsap.globalTimeline.pause();
        else gsap.globalTimeline.resume();
      };

      document.addEventListener("visibilitychange", handleVisibility);
      return () => {
        document.removeEventListener("visibilitychange", handleVisibility);
        timelinesRef.current.forEach((timeline) => timeline.kill());
        timelinesRef.current = [];
      };
    },
    { scope: containerRef, dependencies: [isMobile] },
  );

  return (
    <div ref={containerRef} aria-hidden="true">
      <div className="gradient-orb gradient-orb-1 opacity-40 md:opacity-50" />
      {!isMobile && <div className="gradient-orb gradient-orb-2" />}
      {!isMobile && <div className="gradient-orb gradient-orb-3 will-change-transform" />}

      {!isMobile && (
        <>
          <div className="floating-shape floating-shape-1 will-change-transform" />
          <div className="floating-shape floating-shape-2 will-change-transform" />
          <div className="floating-shape floating-shape-3 will-change-transform" />
          <div className="particles-container">
            {PARTICLE_POSITIONS.map((pos, i) => (
              <div
                key={i}
                className="particle will-change-transform"
                style={{ left: `${pos.left}%`, width: `${pos.size}px`, height: `${pos.size}px` }}
              />
            ))}
          </div>
        </>
      )}

      <div className="fixed inset-0 bg-gradient-grid pointer-events-none z-0" />
    </div>
  );
}
