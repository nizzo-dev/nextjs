"use client";

import React, { useEffect, useRef } from "react";

export function MouseFollowCharacter() {
  const leftPupilRef = useRef<SVGCircleElement>(null);
  const rightPupilRef = useRef<SVGCircleElement>(null);
  const leftHighlightRef = useRef<SVGCircleElement>(null);
  const rightHighlightRef = useRef<SVGCircleElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isHoveringRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const characterCenterX = rect.left + rect.width / 2;
      const characterCenterY = rect.top + rect.height / 2;

      // 计算鼠标相对于角色中心的位置
      const deltaX = e.clientX - characterCenterX;
      const deltaY = e.clientY - characterCenterY;

      // 计算角度
      const angle = Math.atan2(deltaY, deltaX);

      // 限制眼球移动范围（半径）
      const maxRadius = 6;

      // 根据鼠标距离调整移动范围
      const distance = Math.min(Math.sqrt(deltaX * deltaX + deltaY * deltaY), 200);
      const radius = (distance / 200) * maxRadius;

      const eyeX = Math.cos(angle) * radius;
      const eyeY = Math.sin(angle) * radius;

      // 直接更新 DOM 属性，绕过 React 渲染周期
      if (leftPupilRef.current && rightPupilRef.current) {
        leftPupilRef.current.setAttribute("cx", String(40 + eyeX));
        leftPupilRef.current.setAttribute("cy", String(45 + eyeY));
        rightPupilRef.current.setAttribute("cx", String(60 + eyeX));
        rightPupilRef.current.setAttribute("cy", String(45 + eyeY));
      }

      // 更新高光位置
      if (leftHighlightRef.current && rightHighlightRef.current) {
        leftHighlightRef.current.setAttribute("cx", String(40 + eyeX + 1.5));
        leftHighlightRef.current.setAttribute("cy", String(45 + eyeY - 1.5));
        rightHighlightRef.current.setAttribute("cx", String(60 + eyeX + 1.5));
        rightHighlightRef.current.setAttribute("cy", String(45 + eyeY - 1.5));
      }
    };

    const handleMouseEnter = () => {
      isHoveringRef.current = true;
    };

    const handleMouseLeave = () => {
      isHoveringRef.current = false;
      // 重置眼睛位置
      if (leftPupilRef.current && rightPupilRef.current) {
        leftPupilRef.current.setAttribute("cx", "40");
        leftPupilRef.current.setAttribute("cy", "45");
        rightPupilRef.current.setAttribute("cx", "60");
        rightPupilRef.current.setAttribute("cy", "45");
      }
      if (leftHighlightRef.current && rightHighlightRef.current) {
        leftHighlightRef.current.setAttribute("cx", "41.5");
        leftHighlightRef.current.setAttribute("cy", "43.5");
        rightHighlightRef.current.setAttribute("cx", "61.5");
        rightHighlightRef.current.setAttribute("cy", "43.5");
      }
    };

    // 使用 passive listener 提高性能
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="character-container fixed bottom-8 left-8 w-24 h-32 cursor-pointer animate-float z-40"
    >
      <svg viewBox="0 0 100 140" className="w-full h-full">
        {/* 身体 */}
        <ellipse
          cx="50"
          cy="100"
          rx="35"
          ry="35"
          fill="#6366f1"
        />

        {/* 头 */}
        <circle
          cx="50"
          cy="45"
          r="30"
          fill="#fef3c7"
          stroke="#6366f1"
          strokeWidth="2"
        />

        {/* 头发 */}
        <path
          d="M25 40 Q30 15 50 18 Q70 15 75 40 Q75 25 50 22 Q25 25 25 40"
          fill="#4b5563"
        />

        {/* 左眼白 */}
        <ellipse
          cx="40"
          cy="45"
          rx="10"
          ry="12"
          fill="white"
          stroke="#4b5563"
          strokeWidth="1"
        />

        {/* 右眼白 */}
        <ellipse
          cx="60"
          cy="45"
          rx="10"
          ry="12"
          fill="white"
          stroke="#4b5563"
          strokeWidth="1"
        />

        {/* 左眼珠 - 直接操作 DOM */}
        <circle
          ref={leftPupilRef}
          cx="40"
          cy="45"
          r="5"
          fill="#1f2937"
        />

        {/* 右眼珠 - 直接操作 DOM */}
        <circle
          ref={rightPupilRef}
          cx="60"
          cy="45"
          r="5"
          fill="#1f2937"
        />

        {/* 左眼高光 - 直接操作 DOM */}
        <circle
          ref={leftHighlightRef}
          cx="41.5"
          cy="43.5"
          r="2"
          fill="white"
        />

        {/* 右眼高光 - 直接操作 DOM */}
        <circle
          ref={rightHighlightRef}
          cx="61.5"
          cy="43.5"
          r="2"
          fill="white"
        />

        {/* 腮红 */}
        <ellipse
          cx="30"
          cy="58"
          rx="6"
          ry="4"
          fill="#fca5a5"
          opacity="0.6"
        />
        <ellipse
          cx="70"
          cy="58"
          rx="6"
          ry="4"
          fill="#fca5a5"
          opacity="0.6"
        />

        {/* 手臂 */}
        <ellipse
          cx="20"
          cy="95"
          rx="8"
          ry="15"
          fill="#6366f1"
        />
        <ellipse
          cx="80"
          cy="95"
          rx="8"
          ry="15"
          fill="#6366f1"
        />
      </svg>
    </div>
  );
}
