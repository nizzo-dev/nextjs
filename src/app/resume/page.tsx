import Link from "next/link";
import { Container, Card, ResumeActions } from "@/components/ui";
import { PageHero, ScrollReveal, StaggerChildren } from "@/components/animations";
import { PERSONAL_INFO, ROUTES } from "@/lib/constants";
import { getAboutContent, getFeaturedProjects, getResumeContent } from "@/lib/content";
import { getLocale } from "@/lib/i18n";
import { createMetadata } from "@/lib/seo";
import { getPageMetaText, getPersonalProfile } from "@/lib/translations";

export async function generateMetadata() {
  const locale = await getLocale();
  const meta = getPageMetaText(locale).resume;
  return createMetadata({
    title: meta.title,
    description: meta.description(PERSONAL_INFO.displayName),
    path: "/resume",
    locale,
  });
}

export default async function ResumePage() {
  const locale = await getLocale();
  const aboutContent = getAboutContent(locale);
  const resumeContent = getResumeContent(locale);
  const profile = getPersonalProfile(locale);
  const featuredProjects = getFeaturedProjects(locale).slice(0, 3);

  return (
    <Container className="py-12 md:py-16">
      <div className="space-y-14">
        <PageHero>
          <section className="grid gap-8 rounded-2xl bg-slate-950 p-8 text-white shadow-2xl shadow-blue-950/20 md:grid-cols-[1fr_auto] md:items-end md:p-10">
            <div className="space-y-4">
              <p className="page-hero-kicker font-mono text-xs tracking-[0.2em] text-blue-200">{resumeContent.text.title}</p>
              <h1 className="page-hero-title text-4xl font-bold tracking-tight md:text-6xl">{PERSONAL_INFO.displayName}</h1>
              <p className="page-hero-subtitle text-lg text-blue-50/75">{profile.title}</p>
              <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-blue-100/70">
                <span>{PERSONAL_INFO.email}</span>
                <span>{PERSONAL_INFO.github}</span>
                <span>{PERSONAL_INFO.website}</span>
              </div>
            </div>
            <div className="page-hero-actions">
              <ResumeActions
                downloadLabel={resumeContent.text.download}
                contactLabel={resumeContent.text.contact}
              />
            </div>
          </section>
        </PageHero>

        <ScrollReveal>
          <Card className="p-6 md:p-8">
            <h2 className="mb-3 text-2xl font-bold tracking-tight">{resumeContent.text.summary}</h2>
            <p className="leading-relaxed text-zinc-600 dark:text-zinc-400">{resumeContent.summary}</p>
            <StaggerChildren className="mt-6 grid gap-4 md:grid-cols-3" stagger={0.1}>
              {resumeContent.highlights.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-blue-200/70 bg-blue-50/70 p-4 text-sm text-blue-900 dark:border-blue-400/20 dark:bg-blue-950/30 dark:text-blue-100"
                >
                  {item}
                </div>
              ))}
            </StaggerChildren>
          </Card>
        </ScrollReveal>

        <ScrollReveal>
          <section className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight">{resumeContent.text.experience}</h2>
            <StaggerChildren className="space-y-4">
              {aboutContent.experiences.map((experience) => (
                <Card key={experience.role} className="p-6">
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{experience.role}</h3>
                      <p className="text-sm text-blue-600 dark:text-blue-300">{experience.company}</p>
                    </div>
                    <span className="text-sm text-zinc-500 dark:text-zinc-400">{experience.period}</span>
                  </div>
                  <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">{experience.description}</p>
                </Card>
              ))}
            </StaggerChildren>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight">{resumeContent.text.education}</h2>
            <StaggerChildren className="grid gap-4 md:grid-cols-2">
              {aboutContent.educations.map((education) => (
                <Card key={education.school} className="p-6">
                  <h3 className="text-lg font-semibold">{education.degree}</h3>
                  <p className="text-sm text-blue-600 dark:text-blue-300">{education.school}</p>
                  <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">{education.period}</p>
                </Card>
              ))}
            </StaggerChildren>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight">{resumeContent.text.skills}</h2>
            <StaggerChildren className="grid gap-4 md:grid-cols-2">
              {resumeContent.skillGroups.map((group) => (
                <Card key={group.label} className="p-6">
                  <h3 className="mb-3 text-lg font-semibold">{group.label}</h3>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-700 dark:bg-blue-950/40 dark:text-blue-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </Card>
              ))}
            </StaggerChildren>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight">{resumeContent.text.featured}</h2>
              <Link href={ROUTES.projects} className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-300">
                {resumeContent.text.viewAll}
              </Link>
            </div>
            <StaggerChildren className="grid gap-4 md:grid-cols-3">
              {featuredProjects.map((project) => (
                <Link key={project.slug} href={ROUTES.project(project.slug)}>
                  <Card className="p-5 transition-transform hover:-translate-y-1">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white">
                        {project.title.slice(0, 1)}
                      </span>
                      <div>
                        <h3 className="font-semibold">{project.title}</h3>
                        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{project.summary}</p>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </StaggerChildren>
          </section>
        </ScrollReveal>
      </div>
    </Container>
  );
}
