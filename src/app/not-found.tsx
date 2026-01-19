import Link from "next/link";
import { Container, Button } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="flex min-h-screen flex-col items-center justify-center">
      <div className="space-y-4 text-center">
        <h1 className="text-6xl font-bold">404</h1>
        <h2 className="text-2xl font-semibold">页面未找到</h2>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          抱歉，您访问的页面不存在
        </p>
        <Link href="/">
          <Button>返回首页</Button>
        </Link>
      </div>
    </Container>
  );
}

