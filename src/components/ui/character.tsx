"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion, registerGsap } from "@/lib/gsap";

type CatState = "resting" | "walking";
type CatExpression = "calm" | "sleepy" | "cute" | "curious";

const VIEWPORT_MARGIN = 18;
const HEADER_CLEARANCE = 76;
const MIN_STEP_DISTANCE = 220;

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function pickExpression(): CatExpression {
  const roll = Math.random();
  if (roll > 0.82) return "cute";
  if (roll > 0.62) return "sleepy";
  return "calm";
}

export function MouseFollowCharacter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const directionRef = useRef<HTMLDivElement>(null);
  const spriteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();

    const container = containerRef.current;
    const direction = directionRef.current;
    const sprite = spriteRef.current;
    if (!container || !direction || !sprite) return;

    const reduceMotion = prefersReducedMotion();
    const q = gsap.utils.selector(container);
    let disposed = false;
    let current = { x: VIEWPORT_MARGIN + 10, y: VIEWPORT_MARGIN + 10 };
    let moveTween: gsap.core.Tween | null = null;
    let idleTween: gsap.core.Tween | null = null;
    let walkCycle: gsap.core.Timeline | null = null;
    let timer: number | null = null;

    const getBounds = () => {
      const rect = container.getBoundingClientRect();
      return {
        minX: VIEWPORT_MARGIN,
        minY: HEADER_CLEARANCE,
        maxX: Math.max(VIEWPORT_MARGIN, window.innerWidth - rect.width - VIEWPORT_MARGIN),
        maxY: Math.max(HEADER_CLEARANCE, window.innerHeight - rect.height - VIEWPORT_MARGIN),
      };
    };

    const setCatState = (state: CatState, expression: CatExpression) => {
      container.dataset.state = state;
      container.dataset.expression = expression;
    };

    const stopTimer = () => {
      if (timer) {
        window.clearTimeout(timer);
        timer = null;
      }
    };

    const placeInsideViewport = () => {
      const bounds = getBounds();
      current = {
        x: clamp(current.x, bounds.minX, bounds.maxX),
        y: clamp(current.y, bounds.minY, bounds.maxY),
      };
      gsap.set(container, { x: current.x, y: current.y });
    };

    const stopWalkCycle = () => {
      walkCycle?.kill();
      walkCycle = null;
      gsap.set(
        q(".cat-side-stage, .cat-side-leg, .cat-side-head, .cat-side-tail, .cat-side-tail-tip, .cat-side-body"),
        { clearProps: "transform" },
      );
    };

    const startWalkCycle = () => {
      stopWalkCycle();
      gsap.set(q(".cat-side-stage"), { transformOrigin: "50% 100%" });
      gsap.set(q(".cat-side-leg"), { transformOrigin: "50% 0%" });
      gsap.set(q(".cat-side-head"), { transformOrigin: "50% 100%" });
      gsap.set(q(".cat-side-tail, .cat-side-tail-tip"), { transformOrigin: "38px 76px" });
      gsap.set(q(".cat-side-body"), { transformOrigin: "50% 50%" });

      walkCycle = gsap.timeline({
        repeat: -1,
        defaults: { duration: reduceMotion ? 0.34 : 0.18, ease: "sine.inOut" },
      });

      walkCycle
        .to(q(".cat-side-stage"), { y: -5, rotate: -1.8 }, 0)
        .to(q(".cat-side-leg-front-left, .cat-side-leg-back-right"), { rotate: -34, x: 7, y: -7 }, 0)
        .to(q(".cat-side-leg-front-right, .cat-side-leg-back-left"), { rotate: 28, x: -6, y: 2 }, 0)
        .to(q(".cat-side-head"), { rotate: 6, y: 2 }, 0)
        .to(q(".cat-side-tail, .cat-side-tail-tip"), { rotate: 18, y: -3 }, 0)
        .to(q(".cat-side-body"), { scaleX: 1.045, y: 1 }, 0)
        .to(q(".cat-side-stage"), { y: 1, rotate: 1.4 }, ">")
        .to(q(".cat-side-leg-front-left, .cat-side-leg-back-right"), { rotate: 28, x: -6, y: 2 }, "<")
        .to(q(".cat-side-leg-front-right, .cat-side-leg-back-left"), { rotate: -34, x: 7, y: -7 }, "<")
        .to(q(".cat-side-head"), { rotate: -5, y: 0 }, "<")
        .to(q(".cat-side-tail, .cat-side-tail-tip"), { rotate: -18, y: 2 }, "<")
        .to(q(".cat-side-body"), { scaleX: 0.99, y: 0 }, "<");
    };

    const pickTarget = () => {
      const bounds = getBounds();
      const minDistance = Math.min(
        MIN_STEP_DISTANCE,
        Math.max(130, Math.min(window.innerWidth, window.innerHeight) * 0.26),
      );
      let target = {
        x: randomBetween(bounds.minX, bounds.maxX),
        y: randomBetween(bounds.minY, bounds.maxY),
      };

      for (let i = 0; i < 10; i += 1) {
        if (Math.hypot(target.x - current.x, target.y - current.y) > minDistance) return target;
        target = {
          x: randomBetween(bounds.minX, bounds.maxX),
          y: randomBetween(bounds.minY, bounds.maxY),
        };
      }

      return target;
    };

    const scheduleRest = () => {
      if (disposed) return;

      const expression = pickExpression();
      const restDuration =
        expression === "sleepy"
          ? randomBetween(2500, 4600)
          : expression === "cute"
            ? randomBetween(1700, 2800)
            : randomBetween(1200, 2600);

      setCatState("resting", expression);
      stopWalkCycle();
      gsap.to(direction, {
        scaleX: 1,
        duration: 0.2,
        ease: "power2.out",
      });

      idleTween?.kill();
      idleTween = gsap.to(sprite, {
        y: expression === "sleepy" ? 5 : 0,
        rotate: expression === "cute" ? -4 : 0,
        scale: expression === "cute" ? 1.04 : 1,
        duration: 0.45,
        ease: "power2.out",
      });

      stopTimer();
      timer = window.setTimeout(walkToNextSpot, reduceMotion ? restDuration + 1300 : restDuration);
    };

    const showCuteReaction = () => {
      if (disposed || container.dataset.state === "walking") return;
      stopTimer();
      setCatState("resting", "cute");
      idleTween?.kill();
      idleTween = gsap.fromTo(
        sprite,
        { y: 0, rotate: -8, scale: 0.96 },
        { y: -5, rotate: 7, scale: 1.08, duration: 0.36, yoyo: true, repeat: 1, ease: "back.out(2)" },
      );
      timer = window.setTimeout(scheduleRest, 1450);
    };

    const walkToNextSpot = () => {
      if (disposed) return;

      const target = pickTarget();
      const dx = target.x - current.x;
      const distance = Math.hypot(target.x - current.x, target.y - current.y);

      if (distance < 32) {
        scheduleRest();
        return;
      }

      setCatState("walking", "curious");
      idleTween?.kill();
      startWalkCycle();
      gsap.to(direction, {
        scaleX: dx < 0 ? -1 : 1,
        duration: 0.18,
        ease: "power2.out",
      });
      gsap.to(sprite, {
        y: 0,
        rotate: 0,
        scale: 1,
        duration: 0.2,
        ease: "power2.out",
      });

      moveTween?.kill();
      moveTween = gsap.to(container, {
        x: target.x,
        y: target.y,
        duration: reduceMotion ? clamp(distance / 68, 3.2, 7.6) : clamp(distance / randomBetween(82, 118), 1.6, 5.8),
        ease: "sine.inOut",
        onUpdate: () => {
          current = {
            x: Number(gsap.getProperty(container, "x")),
            y: Number(gsap.getProperty(container, "y")),
          };
        },
        onComplete: () => {
          current = target;
          scheduleRest();
        },
      });
    };

    const handleResize = () => {
      placeInsideViewport();
    };

    const initialBounds = getBounds();
    current = {
      x: initialBounds.minX + 14,
      y: initialBounds.maxY,
    };
    gsap.set(direction, { scaleX: 1 });
    placeInsideViewport();
    setCatState("resting", "cute");

    timer = window.setTimeout(walkToNextSpot, reduceMotion ? 1200 : 420);
    window.addEventListener("resize", handleResize);
    container.addEventListener("pointerdown", showCuteReaction);

    return () => {
      disposed = true;
      moveTween?.kill();
      idleTween?.kill();
      stopWalkCycle();
      stopTimer();
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("pointerdown", showCuteReaction);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="cat-pet fixed left-0 top-0 z-40 h-[136px] w-[136px] cursor-pointer will-change-transform"
      aria-label="Nizzo's walking cat mascot"
      data-state="resting"
      data-expression="calm"
    >
      <div className="cat-heart" aria-hidden="true" />
      <div ref={directionRef} className="cat-direction h-full w-full">
        <div ref={spriteRef} className="cat-sprite-wrap h-full w-full">
          <svg viewBox="0 0 132 150" className="cat-sprite cat-front h-full w-full" role="img" aria-hidden="true">
            <ellipse className="cat-shadow" cx="66" cy="138" rx="38" ry="7" fill="#0f172a" opacity="0.17" />
            <path className="cat-front-tail" d="M96 111 C124 109 124 67 101 70 C89 72 87 91 101 93" fill="none" stroke="#F8FAFC" strokeWidth="14" strokeLinecap="round" />
            <path className="cat-front-tail-tip" d="M101 70 C89 72 87 91 101 93" fill="none" stroke="#2563EB" strokeWidth="6" strokeLinecap="round" />
            <ellipse cx="66" cy="101" rx="35" ry="34" fill="#F8FAFC" stroke="#2563EB" strokeWidth="2.4" />
            <ellipse cx="66" cy="109" rx="21" ry="20" fill="#DBEAFE" opacity="0.72" />
            <path d="M47 87 C56 95 76 95 85 87 L82 103 C75 111 57 111 50 103 Z" fill="#2563EB" />
            <circle cx="55" cy="94" r="2" fill="#93C5FD" opacity="0.7" />
            <circle cx="76" cy="95" r="1.8" fill="#93C5FD" opacity="0.7" />
            <path d="M36 41 L45 10 L63 37 Z" fill="#F8FAFC" stroke="#2563EB" strokeWidth="3" strokeLinejoin="round" />
            <path d="M96 41 L87 10 L69 37 Z" fill="#F8FAFC" stroke="#2563EB" strokeWidth="3" strokeLinejoin="round" />
            <path d="M44 32 L47 22 L55 34 Z" fill="#FDA4AF" />
            <path d="M88 32 L85 22 L77 34 Z" fill="#FDA4AF" />
            <path d="M33 60 C33 42 46 28 66 28 C86 28 99 42 99 60 C99 82 83 94 66 94 C49 94 33 82 33 60Z" fill="#F8FAFC" stroke="#2563EB" strokeWidth="3" />
            <path d="M54 31 C57 38 62 41 66 41 C70 41 75 38 78 31" fill="none" stroke="#BFDBFE" strokeWidth="4" strokeLinecap="round" />
            <path d="M62 31 L60 44 M70 31 L72 44" stroke="#93C5FD" strokeWidth="3" strokeLinecap="round" />
            <g className="cat-eye">
              <ellipse cx="54" cy="58" rx="10.5" ry="12" fill="#DCFCE7" stroke="#1E3A8A" strokeWidth="1.5" />
              <ellipse cx="78" cy="58" rx="10.5" ry="12" fill="#DCFCE7" stroke="#1E3A8A" strokeWidth="1.5" />
              <ellipse cx="54" cy="58" rx="2.8" ry="7.5" fill="#0F172A" />
              <ellipse cx="78" cy="58" rx="2.8" ry="7.5" fill="#0F172A" />
              <circle cx="55.8" cy="55.8" r="1.6" fill="white" />
              <circle cx="79.8" cy="55.8" r="1.6" fill="white" />
            </g>
            <path className="cat-sleep-eye cat-sleep-eye-left" d="M45 58 C49 62 56 62 60 58" fill="none" stroke="#1E3A8A" strokeWidth="2.4" strokeLinecap="round" />
            <path className="cat-sleep-eye cat-sleep-eye-right" d="M72 58 C76 62 83 62 87 58" fill="none" stroke="#1E3A8A" strokeWidth="2.4" strokeLinecap="round" />
            <path d="M66 67 L61 72 L71 72 Z" fill="#F472B6" />
            <path className="cat-mouth-calm" d="M66 72 C63 77 58 78 54 75 M66 72 C69 77 74 78 78 75" fill="none" stroke="#334155" strokeWidth="1.9" strokeLinecap="round" />
            <path className="cat-mouth-cute" d="M59 73 C62 80 70 80 73 73" fill="none" stroke="#334155" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M43 67 H24 M44 73 L26 79 M89 67 H108 M88 73 L106 79" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
            <ellipse cx="44" cy="79" rx="7" ry="4" fill="#FDA4AF" opacity="0.72" />
            <ellipse cx="88" cy="79" rx="7" ry="4" fill="#FDA4AF" opacity="0.72" />
            <ellipse cx="53" cy="130" rx="11" ry="7" fill="#F8FAFC" stroke="#2563EB" strokeWidth="1" />
            <ellipse cx="79" cy="130" rx="11" ry="7" fill="#F8FAFC" stroke="#2563EB" strokeWidth="1" />
          </svg>

          <svg viewBox="0 0 132 150" className="cat-sprite cat-side h-full w-full" role="img" aria-hidden="true">
            <g className="cat-side-stage">
              <ellipse cx="64" cy="138" rx="43" ry="7" fill="#0f172a" opacity="0.17" />
              <path className="cat-side-tail" d="M34 96 C8 87 12 57 37 59 C51 60 51 76 39 79" fill="none" stroke="#F8FAFC" strokeWidth="13" strokeLinecap="round" />
              <path className="cat-side-tail-tip" d="M17 71 C22 62 29 58 37 59" fill="none" stroke="#2563EB" strokeWidth="5" strokeLinecap="round" />
              <ellipse className="cat-side-body" cx="66" cy="99" rx="40" ry="27" fill="#F8FAFC" stroke="#2563EB" strokeWidth="2.4" />
              <ellipse cx="67" cy="107" rx="25" ry="16" fill="#DBEAFE" opacity="0.72" />
              <path d="M82 77 C91 84 105 84 114 78 L111 92 C103 99 90 97 82 89 Z" fill="#2563EB" />
              <circle cx="92" cy="86" r="2" fill="#93C5FD" opacity="0.7" />
              <g className="cat-side-leg cat-side-leg-back-left">
                <path d="M45 116 C40 124 41 131 50 132 C57 132 58 124 54 116Z" fill="#E0F2FE" stroke="#2563EB" strokeWidth="1.5" />
                <ellipse cx="50" cy="132" rx="9" ry="5" fill="#F8FAFC" />
              </g>
              <g className="cat-side-leg cat-side-leg-front-left">
                <path d="M81 114 C75 122 76 131 86 132 C93 132 94 123 89 115Z" fill="#F8FAFC" stroke="#2563EB" strokeWidth="1.5" />
                <ellipse cx="86" cy="132" rx="9" ry="5" fill="#F8FAFC" />
              </g>
              <g className="cat-side-leg cat-side-leg-back-right">
                <path d="M56 116 C51 124 52 131 61 132 C68 132 69 124 64 116Z" fill="#DBEAFE" stroke="#2563EB" strokeWidth="1.4" opacity="0.88" />
                <ellipse cx="61" cy="132" rx="9" ry="5" fill="#DBEAFE" />
              </g>
              <g className="cat-side-leg cat-side-leg-front-right">
                <path d="M93 114 C87 122 88 131 98 132 C105 132 106 123 100 115Z" fill="#DBEAFE" stroke="#2563EB" strokeWidth="1.4" opacity="0.88" />
                <ellipse cx="98" cy="132" rx="9" ry="5" fill="#DBEAFE" />
              </g>
              <g className="cat-side-head">
                <path d="M87 45 L96 17 L108 47 Z" fill="#F8FAFC" stroke="#2563EB" strokeWidth="3" strokeLinejoin="round" />
                <path d="M116 48 L111 19 L98 48 Z" fill="#F8FAFC" stroke="#2563EB" strokeWidth="3" strokeLinejoin="round" />
                <path d="M96 39 L98 29 L103 42 Z" fill="#FDA4AF" />
                <path d="M108 40 L107 29 L102 43 Z" fill="#FDA4AF" />
                <path d="M81 63 C81 45 94 35 108 42 C122 49 124 69 112 81 C100 92 81 82 81 63Z" fill="#F8FAFC" stroke="#2563EB" strokeWidth="3" />
                <path d="M91 42 C95 47 100 49 105 49" fill="none" stroke="#BFDBFE" strokeWidth="3" strokeLinecap="round" />
                <ellipse cx="106" cy="61" rx="9" ry="11" fill="#DCFCE7" stroke="#1E3A8A" strokeWidth="1.5" />
                <ellipse cx="108" cy="61" rx="2.7" ry="7" fill="#0F172A" />
                <circle cx="109.5" cy="58.5" r="1.5" fill="white" />
                <path d="M119 68 L113 72 L121 75 Z" fill="#F472B6" />
                <path d="M111 75 C114 80 119 80 122 76" fill="none" stroke="#334155" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M113 66 H127 M113 71 L128 75" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
                <ellipse cx="99" cy="75" rx="6" ry="4" fill="#FDA4AF" opacity="0.62" />
              </g>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
