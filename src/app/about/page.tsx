import { MainLayout } from "@/components/layout";
import { Container } from "@/components/ui";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <MainLayout>
      <Container className="py-12">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">关于我们</h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              这是一个基于 Next.js 构建的现代化 Web 应用
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>快速开发</CardTitle>
                <CardDescription>
                  使用 Next.js 和 TypeScript 构建，提供出色的开发体验
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  基于 React Server Components 和最新的 Web 标准
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>类型安全</CardTitle>
                <CardDescription>
                  完整的 TypeScript 支持，确保代码质量和开发效率
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  类型定义覆盖整个应用，减少运行时错误
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>现代化 UI</CardTitle>
                <CardDescription>
                  使用 Tailwind CSS 构建美观且响应式的用户界面
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  支持深色模式，提供优秀的用户体验
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </MainLayout>
  );
}

