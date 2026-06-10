import { Container } from "@/components/ui";
import { PageHero } from "@/components/animations";
import { getProjectsContent } from "@/lib/content";
import { getLocale } from "@/lib/i18n";
import { createMetadata } from "@/lib/seo";
import { getCommonText, getPageMetaText } from "@/lib/translations";
import { ProjectsView } from "./projects-view";

export async function generateMetadata() {
  const locale = await getLocale();
  const meta = getPageMetaText(locale).projects;
  return createMetadata({ title: meta.title, description: meta.description, path: "/projects", locale });
}

export default async function ProjectsPage() {
  const locale = await getLocale();
  const { projects, categories, text } = getProjectsContent(locale);
  const common = getCommonText(locale);

  return (
    <Container className="py-12 md:py-16">
      <PageHero>
        <div className="relative mb-16 grid gap-8 md:grid-cols-[1fr_0.55fr] md:items-end">
          <div className="space-y-4">
            <p className="page-hero-kicker font-mono text-xs tracking-[0.2em] text-blue-600 dark:text-blue-300">
              {text.featuredTitle}
            </p>
            <h1 className="page-hero-title text-4xl font-bold tracking-tight md:text-6xl">{text.title}</h1>
            <p className="page-hero-subtitle max-w-3xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">{text.subtitle}</p>
          </div>
          <div className="page-hero-visual hidden rounded-2xl border border-blue-200/70 bg-blue-600 p-6 text-white shadow-xl shadow-blue-950/10 dark:border-blue-400/20 md:block">
            <p className="font-mono text-4xl font-semibold">{projects.length}</p>
            <p className="mt-2 text-sm text-blue-100">{text.otherTitle}</p>
          </div>
        </div>
      </PageHero>

      <ProjectsView categories={categories} projects={projects} emptyLabel={common.emptyProjects} text={text} />
    </Container>
  );
}
