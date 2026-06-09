import Link from "next/link";
import { Container, Button } from "@/components/ui";
import { ProjectCard } from "@/components/ui/project-card";
import { HomeCharacter } from "@/components/ui/home-character";
import { HeroTimeline, ScrollReveal, StaggerChildren } from "@/components/animations";
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

  const socialLinks = [
    { label: "GitHub", href: PERSONAL_INFO.github },
    { label: "Email", href: `mailto:${PERSONAL_INFO.email}` },
    { label: "Cookie AI", href: PERSONAL_INFO.website },
  ];

  return (
    <>
      <Container className="py-12 md:py-20">
        <div className="space-y-20 md:space-y-28">
          <HeroTimeline>
            <section className="relative flex flex-col items-center space-y-8 text-center">
              <div className="absolute left-1/2 top-1/2 -z-10 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/15 blur-3xl" />

              <div className="hero-avatar relative">
                <div className="flex h-28 w-28 items-center justify-center rounded-2xl bg-indigo-600 text-4xl font-bold text-white shadow-lg shadow-indigo-500/25 md:h-32 md:w-32 md:text-5xl">
                  {PERSONAL_INFO.displayName[0].toUpperCase()}
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-sm font-medium uppercase tracking-widest text-indigo-500">
                  {profile.tagline}
                </p>
                <h1 className="hero-title text-4xl font-bold tracking-tight md:text-6xl">
                  {homeContent.text.greeting}{" "}
                  <span className="text-indigo-600 dark:text-indigo-400">{PERSONAL_INFO.displayName}</span>
                </h1>
                <p className="hero-subtitle mx-auto max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
                  {profile.bio}
                </p>
              </div>

              <div className="hero-cta flex flex-wrap justify-center gap-4">
                <Link href={ROUTES.projects}>
                  <Button size="lg" className="border-0 bg-indigo-600 hover:bg-indigo-700">
                    {homeContent.text.primaryAction}
                  </Button>
                </Link>
                <Link href={ROUTES.resume}>
                  <Button variant="outline" size="lg">
                    {common.resumeAction}
                  </Button>
                </Link>
                <Link href={ROUTES.contact}>
                  <Button variant="outline" size="lg">
                    {homeContent.text.secondaryAction}
                  </Button>
                </Link>
              </div>

              <div className="hero-social flex flex-wrap justify-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-600 transition-colors hover:border-indigo-500 hover:text-indigo-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </section>
          </HeroTimeline>

          <ScrollReveal>
            <StaggerChildren className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
              {homeContent.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-zinc-200 bg-white p-8 text-center dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400 md:text-2xl">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{stat.label}</div>
                </div>
              ))}
            </StaggerChildren>
          </ScrollReveal>

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
            <section className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold">{homeContent.text.featuredTitle}</h2>
                  <p className="mt-2 text-zinc-600 dark:text-zinc-400">{homeContent.text.featuredSubtitle}</p>
                </div>
                <Link href={ROUTES.projects}>
                  <Button variant="ghost">{homeContent.text.viewAll}</Button>
                </Link>
              </div>
              <StaggerChildren className="grid gap-6 md:grid-cols-2 xl:grid-cols-3" stagger={0.1}>
                {featuredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </StaggerChildren>
            </section>
          </ScrollReveal>

          <ScrollReveal>
            <section className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold">{homeContent.text.skillsTitle}</h2>
                <p className="mt-2 text-zinc-600 dark:text-zinc-400">{homeContent.text.skillsSubtitle}</p>
              </div>
              <StaggerChildren className="flex flex-wrap justify-center gap-3" stagger={0.05}>
                {homeContent.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-5 py-2.5 text-sm dark:border-zinc-700 dark:bg-zinc-800"
                  >
                    <span>{skill.icon}</span>
                    <span className="font-medium text-zinc-700 dark:text-zinc-300">{skill.name}</span>
                  </div>
                ))}
              </StaggerChildren>
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
        </div>
      </Container>

      <HomeCharacter />
    </>
  );
}
