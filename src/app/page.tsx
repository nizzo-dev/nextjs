import Link from "next/link";
import { Container, Button } from "@/components/ui";
import { ProjectCard } from "@/components/ui/project-card";
import { HomeCharacter } from "@/components/ui/home-character";
import { ScrollReveal } from "@/components/animations";
import { HomeHero } from "@/components/sections/home-hero";
import { CaseStudyBanner } from "@/components/sections/case-study-banner";
import { ExperienceSnapshot } from "@/components/sections/experience-snapshot";
import { GradientCta } from "@/components/sections/gradient-cta";
import { ROUTES, PERSONAL_INFO } from "@/lib/constants";
import { getFeaturedProjects, getHomeContent } from "@/lib/content";
import { getLocale } from "@/lib/i18n";
import { createMetadata } from "@/lib/seo";
import { getCommonText, getPageMetaText, getPersonalProfile } from "@/lib/translations";

export async function generateMetadata() {
  const locale = await getLocale();
  const profile = getPersonalProfile(locale);
  const meta = getPageMetaText(locale).home;
  return createMetadata({
    title: meta.title,
    description: meta.description(PERSONAL_INFO.displayName, profile.tagline, profile.bio),
    path: "/",
    locale,
  });
}

export default async function Home() {
  const locale = await getLocale();
  const homeContent = getHomeContent(locale);
  const profile = getPersonalProfile(locale);
  const common = getCommonText(locale);
  const featuredProjects = getFeaturedProjects(locale)
    .filter((p) => p.slug !== "cookieai")
    .slice(0, 3);

  const [leadProject, ...restProjects] = featuredProjects;

  return (
    <>
      <Container className="pb-16 md:pb-24">
        <div className="space-y-24 md:space-y-32">
          <HomeHero
            greeting={homeContent.text.greeting}
            displayName={PERSONAL_INFO.displayName}
            tagline={profile.tagline}
            bio={profile.bio}
            primaryAction={homeContent.text.primaryAction}
            secondaryAction={common.resumeAction}
            stats={homeContent.stats}
          />

          {homeContent.spotlight && (
            <ScrollReveal>
              <CaseStudyBanner
                project={homeContent.spotlight}
                label={homeContent.text.caseStudyLabel}
                ctaDemo={homeContent.text.caseStudyDemo}
                ctaDetail={homeContent.text.caseStudyDetail}
              />
            </ScrollReveal>
          )}

          <ScrollReveal>
            <ExperienceSnapshot
              title={homeContent.text.experienceTitle}
              subtitle={homeContent.text.experienceSubtitle}
              viewAllLabel={homeContent.text.experienceViewAll}
              experiences={homeContent.experiencePreview}
            />
          </ScrollReveal>

          <ScrollReveal>
            <section className="space-y-10">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  {homeContent.text.featuredTitle}
                </h2>
                <p className="mt-3 text-zinc-600 dark:text-zinc-400">
                  {homeContent.text.featuredSubtitle}
                </p>
              </div>

              {leadProject && (
                <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
                  <ProjectCard project={leadProject} variant="featured" className="h-full" />
                  <div className="grid gap-6">
                    {restProjects.map((project) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end border-t border-zinc-200 pt-6 dark:border-zinc-800">
                <Button asChild variant="ghost">
                  <Link href={ROUTES.projects}>{homeContent.text.viewAll}</Link>
                </Button>
              </div>
            </section>
          </ScrollReveal>

          <ScrollReveal>
            <section className="space-y-8">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                {homeContent.text.skillsTitle}
              </h2>
              <div className="relative -mx-4 md:mx-0">
                <div className="flex gap-3 overflow-x-auto px-4 pb-2 md:flex-wrap md:overflow-visible md:px-0">
                  {homeContent.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="flex shrink-0 items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-5 py-2.5 text-sm backdrop-blur-sm transition-colors hover:border-blue-400 hover:bg-blue-50 dark:border-blue-400/20 dark:bg-slate-950/70 dark:hover:bg-blue-950/40"
                    >
                      <span className="font-medium text-zinc-800 dark:text-zinc-200">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </ScrollReveal>

          <ScrollReveal>
            <GradientCta
              title={homeContent.text.ctaTitle}
              subtitle={homeContent.text.ctaSubtitle}
              buttonLabel={homeContent.text.ctaButton}
              href={ROUTES.contact}
            />
          </ScrollReveal>

          <ScrollReveal>
            <section className="flex flex-wrap items-center justify-center gap-6 border-t border-zinc-200 pt-10 dark:border-zinc-800">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-zinc-600 transition-colors hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-300"
              >
                GitHub
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="text-sm font-medium text-zinc-600 transition-colors hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-300"
              >
                Email
              </a>
              <a
                href={PERSONAL_INFO.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-zinc-600 transition-colors hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-300"
              >
                Cookie AI
              </a>
              <Link
                href={ROUTES.resume}
                className="text-sm font-medium text-zinc-600 transition-colors hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-300"
              >
                {common.resumeAction}
              </Link>
            </section>
          </ScrollReveal>
        </div>
      </Container>

      <HomeCharacter />
    </>
  );
}
