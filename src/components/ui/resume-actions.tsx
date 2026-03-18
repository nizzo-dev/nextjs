"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants";

export function ResumeActions() {
  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="no-print flex flex-wrap gap-3">
      <Button onClick={handlePrint}>下载 PDF</Button>
      <Link href={ROUTES.contact}>
        <Button variant="outline">联系我</Button>
      </Link>
    </div>
  );
}
