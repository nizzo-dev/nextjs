import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button, Card, Container } from "@/components/ui";
import { ROUTES } from "@/lib/constants";
import { getProjectBySlug, getProjectDetailText, getProjectsContent } from "@/lib/content";
import { getLocale } from "@/lib/i18n";
import { defaultLocale } from "@/lib/locale";
import { createMetadata } from "@/lib/seo";
import { getCommonText } from "@/lib/translations";

export async function generateStaticParams() {
  const { projects } = getProjectsContent(defaultLocale);
  return projects.map((project) => ({ slug: project.slug }));
}

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const project = getProjectBySlug(locale, slug);
  if (!project) {
    const common = getCommonText(locale);
    return createMetadata({ title: common.projectNotFound, path: `/projects/${slug}`, locale });
  }
  return createMetadata({
    title: project.title,
    description: project.summary,
    path: `/projects/${slug}`,
    locale,
  });
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const locale = await getLocale();
  const text = getProjectDetailText(locale);
  const project = getProjectBySlug(locale, slug);

  if (!project) {
    notFound();
  }

  return (
    <Container className="py-12">
      <div className="space-y-12">
        <section className="relative overflow-hidden rounded-3xl">
          <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`} />
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative p-10 text-white md:p-14">
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div className="space-y-4">
                <div className="text-5xl md:text-6xl">{project.emoji}</div>
                <h1 className="text-3xl font-bold md:text-5xl">{project.title}</h1>
                <p className="max-w-2xl text-lg text-white/80">{project.summary}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href={ROUTES.projects}>
                  <Button className="bg-white/90 text-gray-900 hover:bg-white">{text.back}</Button>
                </Link>
                {project.demoUrl && (
                  <a href={project.demoUrl} target="_blank" rel="noreferrer">
                    <Button variant="outline" className="border-white/40 bg-white/10 text-white hover:bg-white/20">
                      {text.demo}
                    </Button>
                  </a>
                )}
                {project.repoUrl && (
                  <a href={project.repoUrl} target="_blank" rel="noreferrer">
                    <Button variant="outline" className="border-white/40 bg-white/10 text-white hover:bg-white/20">
                      {text.repo}
                    </Button>
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <Card className="p-6 md:p-8">
            <h2 className="mb-4 text-2xl font-bold">{text.overview}</h2>
            <p className="leading-relaxed text-zinc-600 dark:text-zinc-400">{project.description}</p>

            {project.highlights && project.highlights.length > 0 && (
              <div className="mt-6 space-y-3">
                <h3 className="text-lg font-semibold">{text.highlights}</h3>
                <ul className="space-y-2">
                  {project.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-zinc-600 dark:text-zinc-400">
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
              <h3 className="mb-3 text-lg font-semibold">{text.info}</h3>
              <div className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                {project.year && (
                  <div className="flex items-center justify-between">
                    <span>{text.year}</span>
                    <span className="font-medium text-foreground">{project.year}</span>
                  </div>
                )}
                {project.role && (
                  <div className="flex items-center justify-between">
                    <span>{text.role}</span>
                    <span className="font-medium text-foreground">{project.role}</span>
                  </div>
                )}
                {project.category && (
                  <div className="flex items-center justify-between">
                    <span>{text.category}</span>
                    <span className="font-medium text-foreground">{project.category}</span>
                  </div>
                )}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="mb-3 text-lg font-semibold">{text.stack}</h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-zinc-100 px-3 py-1 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
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
  );
}
