"use client";

import { useEffect } from "react";
import { Button, Container } from "@/components/ui";
import { useClientLocale } from "@/hooks/use-client-locale";
import { getCommonText } from "@/lib/translations";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const locale = useClientLocale();
  const common = getCommonText(locale);

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="flex min-h-[100dvh] flex-col items-center justify-center py-16">
      <div className="relative max-w-xl space-y-4 rounded-2xl border border-blue-200/70 bg-white/85 p-10 text-center shadow-2xl shadow-blue-950/10 backdrop-blur-sm dark:border-blue-400/20 dark:bg-slate-950/75">
        <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-blue-500/10 blur-2xl" />
        <h1 className="relative text-4xl font-bold tracking-tight">{common.errorTitle}</h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          {error.message || common.errorFallback}
        </p>
        <div className="flex justify-center gap-4">
          <Button onClick={reset}>{common.errorRetry}</Button>
          <Button variant="outline" onClick={() => { window.location.href = "/"; }}>
            {common.backHome}
          </Button>
        </div>
      </div>
    </Container>
  );
}
