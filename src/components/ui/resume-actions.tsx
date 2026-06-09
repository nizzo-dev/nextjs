"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants";

interface ResumeActionsProps {
  downloadLabel: string;
  contactLabel: string;
}

export function ResumeActions({ downloadLabel, contactLabel }: ResumeActionsProps) {
  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="no-print flex flex-wrap gap-3">
      <Button onClick={handlePrint}>{downloadLabel}</Button>
      <Link href={ROUTES.contact}>
        <Button variant="outline">{contactLabel}</Button>
      </Link>
    </div>
  );
}
