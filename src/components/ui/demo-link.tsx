"use client";

import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";
import { requestFullscreen } from "@/lib/fullscreen";

interface DemoLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: ReactNode;
}

export function DemoLink({ href, children, onClick, target, rel, ...props }: DemoLinkProps) {
  const isInternal = href.startsWith("/");

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (isInternal) {
      void requestFullscreen();
    }
    onClick?.(event);
  };

  return (
    <a
      {...props}
      href={href}
      target={isInternal ? undefined : target ?? "_blank"}
      rel={isInternal ? undefined : rel ?? "noopener noreferrer"}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
