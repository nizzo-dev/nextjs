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
    <Container className="py-12">
      <PageHero>
        <div className="relative mb-16 space-y-4 text-center">
          <div className="absolute left-1/2 top-1/2 -z-10 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-3xl" />
          <h1 className="page-hero-title text-4xl font-bold md:text-5xl">{text.title}</h1>
          <p className="page-hero-subtitle mx-auto max-w-3xl text-lg text-zinc-600 dark:text-zinc-400">{text.subtitle}</p>
        </div>
      </PageHero>

      <ProjectsView categories={categories} projects={projects} emptyLabel={common.emptyProjects} text={text} />
    </Container>
  );
}
