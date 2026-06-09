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
    <Container className="flex min-h-screen flex-col items-center justify-center">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold">{common.errorTitle}</h1>
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
