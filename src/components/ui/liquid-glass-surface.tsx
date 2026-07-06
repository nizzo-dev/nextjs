"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore, type CSSProperties, type ReactNode } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

const LiquidGlass = dynamic(() => import("liquid-glass-react"), {
  ssr: false,
});

type LiquidGlassMode = "standard" | "polar" | "prominent" | "shader";

interface LiquidGlassSurfaceProps {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  fallbackClassName?: string;
  prominence?: "subtle" | "strong" | "hero";
  cornerRadius?: number;
  padding?: string;
  displacementScale?: number;
  blurAmount?: number;
  saturation?: number;
  aberrationIntensity?: number;
  elasticity?: number;
  overLight?: boolean;
  mode?: LiquidGlassMode;
  style?: CSSProperties;
}

function subscribeToHydration(callback: () => void) {
  const timeoutId = window.setTimeout(callback, 0);
  return () => window.clearTimeout(timeoutId);
}

function getClientSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

export function LiquidGlassSurface({
  children,
  className,
  contentClassName,
  fallbackClassName,
  prominence = "strong",
  cornerRadius = 999,
  padding = "0px",
  displacementScale = 42,
  blurAmount = 0.08,
  saturation = 135,
  aberrationIntensity = 1.4,
  elasticity = 0.18,
  overLight = false,
  mode = "standard",
  style,
}: LiquidGlassSurfaceProps) {
  const reducedMotion = useReducedMotion();
  const mounted = useSyncExternalStore(
    subscribeToHydration,
    getClientSnapshot,
    getServerSnapshot,
  );

  const fallback = (
    <span
      data-prominence={prominence}
      className={cn(
        "liquid-glass-surface relative inline-flex items-center justify-center overflow-hidden rounded-full border border-white/40 bg-white/20 text-white shadow-xl shadow-blue-950/25 backdrop-blur-2xl",
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:bg-[radial-gradient(circle_at_18%_0%,rgba(255,255,255,0.7),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.42),rgba(255,255,255,0.08)_48%,rgba(56,189,248,0.2))]",
        "after:pointer-events-none after:absolute after:inset-px after:rounded-[inherit] after:border after:border-white/25",
        fallbackClassName,
        className,
      )}
      style={style}
    >
      <span className={cn("relative z-10 inline-flex items-center justify-center", contentClassName)}>
        {children}
      </span>
    </span>
  );

  if (!mounted || reducedMotion) {
    return fallback;
  }

  return (
    <span
      data-prominence={prominence}
      className={cn("liquid-glass-surface relative inline-flex items-center justify-center align-middle", className)}
    >
      <LiquidGlass
        className="liquid-glass-react"
        displacementScale={displacementScale}
        blurAmount={blurAmount}
        saturation={saturation}
        aberrationIntensity={aberrationIntensity}
        elasticity={elasticity}
        cornerRadius={cornerRadius}
        padding={padding}
        overLight={overLight}
        mode={mode}
        style={style}
      >
        <span className={cn("inline-flex items-center justify-center", contentClassName)}>
          {children}
        </span>
      </LiquidGlass>
    </span>
  );
}
