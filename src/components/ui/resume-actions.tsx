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
    <div className="flex flex-wrap gap-3 no-print">
      <Button onClick={handlePrint} className="hover-shine">
        下载 PDF
      </Button>
      <Link href={ROUTES.contact}>
        <Button variant="outline" className="hover-shine">
          联系我
        </Button>
      </Link>
    </div>
  );
}
