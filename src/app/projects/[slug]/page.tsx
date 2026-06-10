import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button, Card, Container } from "@/components/ui";
import { ProjectMediaGallery } from "@/components/sections/project-media-gallery";
import { ROUTES } from "@/lib/constants";
import { getProjectBySlug, getProjectDetailText, getProjectsContent } from "@/lib/content";
import { getLocale } from "@/lib/i18n";
import { defaultLocale } from "@/lib/locale";
import { createMetadata, projectJsonLd } from "@/lib/seo";
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
  const isEnglish = locale === "en";

  if (!project) {
    notFound();
  }

  return (
    <Container className="py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd(project, locale)) }}
      />
      <div className="space-y-14">
        <section className="relative overflow-hidden rounded-2xl bg-slate-950 text-white shadow-2xl shadow-blue-950/20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_15%,rgba(96,165,250,0.34),transparent_48%)]" />
          <div className="absolute right-8 top-8 h-36 w-36 rounded-full border border-white/10" />
          <div className="relative p-8 md:p-14">
            <div className="grid gap-10 md:grid-cols-[1fr_0.42fr] md:items-end">
              <div className="space-y-5">
                <p className="font-mono text-xs tracking-[0.2em] text-blue-100/70">{project.category}</p>
                <h1 className="text-4xl font-bold tracking-tight md:text-6xl">{project.title}</h1>
                <p className="max-w-2xl text-lg leading-relaxed text-blue-50/75">{project.summary}</p>
              </div>
              <div className="flex flex-wrap gap-3 md:justify-end">
                <Button asChild className="bg-white text-blue-700 hover:bg-blue-50">
                  <Link href={ROUTES.projects}>{text.back}</Link>
                </Button>
                {project.demoUrl && (
                  <Button asChild variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20">
                    <a href={project.demoUrl} target="_blank" rel="noreferrer">
                      {text.demo}
                    </a>
                  </Button>
                )}
                {project.repoUrl && (
                  <Button asChild variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20">
                    <a href={project.repoUrl} target="_blank" rel="noreferrer">
                      {text.repo}
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-8">
            <Card className="p-6 md:p-8">
              <p className="font-mono text-xs tracking-[0.2em] text-blue-600 dark:text-blue-300">
                {isEnglish ? "Overview" : "项目概览"}
              </p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight">{text.overview}</h2>
              <p className="mt-4 leading-relaxed text-zinc-600 dark:text-zinc-400">{project.description}</p>
            </Card>

            <ProjectMediaGallery items={project.screenshots} />

            <div className="grid gap-5 md:grid-cols-2">
              {[
                [isEnglish ? "Problem" : "问题背景", project.caseStudy.problem],
                [isEnglish ? "My role" : "我的角色", project.caseStudy.roleDetails],
                [isEnglish ? "Solution" : "解决方案", project.caseStudy.solution],
                [isEnglish ? "Outcome" : "最终结果", project.caseStudy.outcome],
              ].map(([title, body]) => (
                <Card key={title} className="p-6">
                  <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{body}</p>
                </Card>
              ))}
            </div>

            <Card className="p-6 md:p-8">
              <h2 className="text-2xl font-bold tracking-tight">{isEnglish ? "Technical highlights" : "技术亮点"}</h2>
              <div className="mt-5 grid gap-3">
                {project.caseStudy.technicalHighlights.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-blue-200/70 bg-blue-50/60 p-4 text-sm text-blue-950 dark:border-blue-400/20 dark:bg-blue-950/30 dark:text-blue-100"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 md:p-8">
              <h2 className="text-2xl font-bold tracking-tight">{isEnglish ? "Lessons" : "复盘总结"}</h2>
              <p className="mt-4 leading-relaxed text-zinc-600 dark:text-zinc-400">{project.caseStudy.lessons}</p>
            </Card>
          </div>

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
                    className="rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-700 dark:bg-blue-950/40 dark:text-blue-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="mb-3 text-lg font-semibold">{isEnglish ? "Constraints" : "约束条件"}</h3>
              <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
                {project.caseStudy.constraints.map((constraint) => (
                  <li key={constraint} className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                    <span>{constraint}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </section>
      </div>
    </Container>
  );
}
