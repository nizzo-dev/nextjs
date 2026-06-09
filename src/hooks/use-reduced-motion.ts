"use client";

import { useEffect, useState } from "react";
import { prefersReducedMotion } from "@/lib/gsap";

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(media.matches);

    const handler = (event: MediaQueryListEvent) => setReduced(event.matches);
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  return reduced;
}

export function useGsapReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() =>
    typeof window !== "undefined" ? prefersReducedMotion() : false,
  );

  useEffect(() => {
    setReduced(prefersReducedMotion());
  }, []);

  return reduced;
}
