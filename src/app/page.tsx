import Link from "next/link";
import { MainLayout } from "@/components/layout";
import { Container, Button, Card, CardHeader, CardTitle, CardDescription, CardContent, MouseFollowCharacter } from "@/components/ui";
import { ROUTES } from "@/lib/constants";

const features = [
  {
    title: "🚀 快速开发",
    description: "使用 Next.js 16 和 React 19 构建，享受最新的开发体验",
    content: "Server Components、App Router 和 React Compiler 让开发更高效",
  },
  {
    title: "🎨 现代化 UI",
    description: "Tailwind CSS 4 提供美观且响应式的设计系统",
    content: "内置深色模式支持，组件化设计，易于定制",
  },
  {
    title: "🔒 类型安全",
    description: "完整的 TypeScript 支持，确保代码质量",
    content: "严格的类型检查，减少运行时错误，提升开发效率",
  },
  {
    title: "📦 开箱即用",
    description: "预配置的组件库、工具函数和最佳实践",
    content: "包含常用组件、Hooks、API 客户端等，快速开始开发",
  },
  {
    title: "⚡ 性能优化",
    description: "自动代码分割、图片优化和 SEO 支持",
    content: "Next.js 内置的性能优化功能，确保应用快速加载",
  },
  {
    title: "🛠️ 开发工具",
    description: "完善的开发工具链和代码质量检查",
    content: "ESLint、TypeScript、热重载等工具，提升开发体验",
  },
];

export default function Home() {
  return (
    <MainLayout>
      <Container className="py-12 md:py-24">
        <div className="space-y-12">
          {/* Hero Section */}
          <section className="text-center space-y-6">
            <h1
              className="text-4xl md:text-6xl font-bold tracking-tight animate-fade-in-down"
            >
              欢迎来到 <span className="animate-gradient-text">Pani</span>
            </h1>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto animate-fade-in-up animate-delay-200">
              一个基于 Next.js 构建的现代化 Web 应用框架
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animate-delay-400">
              <Link href={ROUTES.about}>
                <Button size="lg" className="hover-shine">了解更多</Button>
              </Link>
              <Link href={ROUTES.contact}>
                <Button variant="outline" size="lg" className="hover-shine">联系我们</Button>
              </Link>
            </div>
          </section>

          {/* Features Section */}
          <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card
                key={feature.title}
                className="animate-fade-in-up"
                style={{ animationDelay: `${(index + 3) * 100}ms` }}
              >
                <CardHeader>
                  <CardTitle className="hover-scale inline-block cursor-default">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {feature.content}
                  </p>
                </CardContent>
              </Card>
            ))}
          </section>
        </div>
      </Container>

      {/* 眼睛跟随鼠标的小人物 */}
      <MouseFollowCharacter />
    </MainLayout>
  );
}
