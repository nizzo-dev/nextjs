"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { registerGsap, ScrollTrigger } from "@/lib/gsap";

export function GsapProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    registerGsap();
  }, []);

  useEffect(() => {
    const timeout = window.setTimeout(() => ScrollTrigger.refresh(), 100);
    return () => window.clearTimeout(timeout);
  }, [pathname]);

  return children;
}
