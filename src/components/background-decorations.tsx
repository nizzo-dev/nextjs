"use client";

import { useEffect, useState } from "react";

export function BackgroundDecorations() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* 动态渐变球 */}
      <div className="gradient-orb gradient-orb-1" />
      <div className="gradient-orb gradient-orb-2" />
      <div className="gradient-orb gradient-orb-3" />

      {/* 浮动装饰形状 */}
      <div className="floating-shape floating-shape-1" />
      <div className="floating-shape floating-shape-2" />
      <div className="floating-shape floating-shape-3" />

      {/* 粒子效果 */}
      <div className="particles-container">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: `${10 + Math.random() * 10}s`,
              width: `${3 + Math.random() * 4}px`,
              height: `${3 + Math.random() * 4}px`,
            }}
          />
        ))}
      </div>

      {/* 网格背景 */}
      <div className="fixed inset-0 bg-gradient-grid pointer-events-none z-0" />
    </>
  );
}

export function FloatingShape({ className = "" }: { className?: string }) {
  return (
    <div
      className={`floating-shape ${className}`}
      style={{
        top: "30%",
        left: "5%",
        width: "120px",
        height: "120px",
        background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
        borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%",
      }}
    />
  );
}

export function GlowingOrb({
  size = 200,
  color = "purple",
  position = "center",
}: {
  size?: number;
  color?: "purple" | "pink" | "blue" | "orange";
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center";
}) {
  const colors = {
    purple: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    pink: "linear-gradient(135deg, #ec4899, #f43f5e)",
    blue: "linear-gradient(135deg, #06b6d4, #3b82f6)",
    orange: "linear-gradient(135deg, #f59e0b, #ef4444)",
  };

  const positions = {
    "top-left": "top: -50px; left: -50px;",
    "top-right": "top: -50px; right: -50px;",
    "bottom-left": "bottom: -50px; left: -50px;",
    "bottom-right": "bottom: -50px; right: -50px;",
    center: "top: 50%; left: 50%; transform: translate(-50%, -50%);",
  };

  return (
    <div
      style={{
        position: "fixed",
        width: `${size}px`,
        height: `${size}px`,
        background: colors[color],
        filter: "blur(80px)",
        borderRadius: "50%",
        opacity: 0.4,
        pointerEvents: "none",
        zIndex: 0,
        animation: "pulse-orb 8s ease-in-out infinite",
        ...Object.fromEntries(Object.entries(positions[position as keyof typeof positions] || {})),
      }}
    />
  );
}
