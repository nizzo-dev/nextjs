import Link from "next/link";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { Container, Button, Card } from "@/components/ui";
import { ROUTES } from "@/lib/constants";
import { getProjectBySlug, getProjectsContent } from "@/lib/content";
import { defaultLocale, isLocale } from "@/lib/i18n";

export async function generateStaticParams() {
  const { projects } = getProjectsContent(defaultLocale);
  return projects.map((project) => ({ slug: project.slug }));
}

interface ProjectDetailPageProps {
  params: {
    slug: string;
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get("NEXT_LOCALE")?.value;
  const locale = localeCookie && isLocale(localeCookie) ? localeCookie : defaultLocale;
  const project = getProjectBySlug(locale, params.slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <Container className="py-12">
        <div className="space-y-12">
          <section className="relative overflow-hidden rounded-3xl">
            <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`} />
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative p-10 md:p-14 text-white">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
                <div className="space-y-4">
                  <div className="text-5xl md:text-6xl">{project.emoji}</div>
                  <h1 className="text-3xl md:text-5xl font-bold">
                    {project.title}
                  </h1>
                  <p className="text-white/80 text-lg max-w-2xl">
                    {project.summary}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link href={ROUTES.projects}>
                    <Button className="bg-white/90 text-gray-900 hover:bg-white">
                      返回项目列表
                    </Button>
                  </Link>
                  {project.demoUrl && (
                    <a href={project.demoUrl} target="_blank" rel="noreferrer">
                      <Button
                        variant="outline"
                        className="bg-white/10 border-white/40 text-white hover:bg-white/20"
                      >
                        在线预览
                      </Button>
                    </a>
                  )}
                  {project.repoUrl && (
                    <a href={project.repoUrl} target="_blank" rel="noreferrer">
                      <Button
                        variant="outline"
                        className="bg-white/10 border-white/40 text-white hover:bg-white/20"
                      >
                        源代码
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-[2fr_1fr]">
            <Card className="p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-4">项目简介</h2>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {project.description}
              </p>

              {project.highlights && project.highlights.length > 0 && (
                <div className="mt-6 space-y-3">
                  <h3 className="text-lg font-semibold">项目亮点</h3>
                  <ul className="space-y-2">
                    {project.highlights.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-zinc-600 dark:text-zinc-400"
                      >
                        <span className="mt-1 h-2 w-2 rounded-full bg-indigo-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Card>

            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-3">项目信息</h3>
                <div className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                  {project.year && (
                    <div className="flex items-center justify-between">
                      <span>年份</span>
                      <span className="font-medium text-foreground">
                        {project.year}
                      </span>
                    </div>
                  )}
                  {project.role && (
                    <div className="flex items-center justify-between">
                      <span>角色</span>
                      <span className="font-medium text-foreground">
                        {project.role}
                      </span>
                    </div>
                  )}
                  {project.category && (
                    <div className="flex items-center justify-between">
                      <span>分类</span>
                      <span className="font-medium text-foreground">
                        {project.category.toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-3">技术栈</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full text-zinc-600 dark:text-zinc-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Card>
            </div>
          </section>
        </div>
      </Container>
    </>
  );
}
