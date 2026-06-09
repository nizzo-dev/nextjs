"use client";

import { usePathname } from "next/navigation";
import { useMediaQuery } from "@/hooks/use-media-query";
import { MouseFollowCharacter } from "./character";

export function HomeCharacter() {
  const pathname = usePathname();
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  if (pathname !== "/" || !isDesktop) {
    return null;
  }

  return <MouseFollowCharacter />;
}
