"use client";

import { useEffect } from "react";
import { Button, Container } from "@/components/ui";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // 记录错误到错误报告服务
    console.error(error);
  }, [error]);

  return (
    <Container className="flex min-h-screen flex-col items-center justify-center">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold">出错了</h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          {error.message || "发生了意外错误"}
        </p>
        <div className="flex gap-4 justify-center">
          <Button onClick={reset}>重试</Button>
          <Button variant="outline" onClick={() => window.location.href = "/"}>
            返回首页
          </Button>
        </div>
      </div>
    </Container>
  );
}

