import { Container, Button, Card } from "@/components/ui";
import { PageHero, ScrollReveal, StaggerChildren } from "@/components/animations";
import { GradientCta } from "@/components/sections/gradient-cta";
import { PERSONAL_INFO, ROUTES } from "@/lib/constants";
import { getAboutContent } from "@/lib/content";
import { getLocale } from "@/lib/i18n";
import { createMetadata } from "@/lib/seo";
import { getPageMetaText, getPersonalProfile } from "@/lib/translations";

export async function generateMetadata() {
  const locale = await getLocale();
  const meta = getPageMetaText(locale).about;
  return createMetadata({
    title: meta.title,
    description: meta.description(PERSONAL_INFO.displayName),
    path: "/about",
    locale,
  });
}

export default async function AboutPage() {
  const locale = await getLocale();
  const aboutContent = getAboutContent(locale);
  const profile = getPersonalProfile(locale);

  return (
    <Container className="py-12 md:py-16">
      <div className="space-y-24">
        <PageHero>
          <section className="grid gap-10 md:grid-cols-[0.85fr_1.15fr] md:items-center">
            <div className="page-hero-visual relative order-2 md:order-1">
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-slate-950 via-blue-950 to-blue-700 p-8 text-white shadow-2xl shadow-blue-950/20">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_12%,rgba(96,165,250,0.36),transparent_48%)]" />
                <div className="relative flex h-full flex-col justify-between">
                  <div className="font-mono text-xs tracking-[0.2em] text-blue-100/70">@{PERSONAL_INFO.handle}</div>
                  <div>
                    <div className="text-7xl font-bold tracking-tight">{PERSONAL_INFO.displayName[0].toUpperCase()}</div>
                    <p className="mt-4 max-w-xs text-sm leading-relaxed text-blue-50/75">{profile.tagline}</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-2xl border border-blue-500/20 bg-blue-500/5" />
            </div>

            <div className="order-1 space-y-6 md:order-2">
              <p className="page-hero-kicker font-mono text-xs tracking-[0.2em] text-blue-600 dark:text-blue-300">
                {profile.title}
              </p>
              <h1 className="page-hero-title text-4xl font-bold leading-tight tracking-tight md:text-6xl">
                {aboutContent.text.title} <span className="text-blue-600 dark:text-blue-300">{PERSONAL_INFO.displayName}</span>
              </h1>
              <p className="page-hero-subtitle max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                {aboutContent.intro}
              </p>
              <div className="page-hero-actions flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href={PERSONAL_INFO.website} target="_blank" rel="noopener noreferrer">AI Demo</a>
                </Button>
              </div>
            </div>
          </section>
        </PageHero>

        <ScrollReveal>
          <section className="space-y-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{aboutContent.text.experienceTitle}</h2>
              <p className="mt-3 text-zinc-600 dark:text-zinc-400">{aboutContent.text.experienceSubtitle}</p>
            </div>
            <StaggerChildren className="grid gap-5">
              {aboutContent.experiences.map((exp) => (
                <Card key={exp.role} className="overflow-hidden p-0">
                  <div className="grid gap-px bg-blue-200/70 dark:bg-blue-400/20 md:grid-cols-[0.34fr_1fr]">
                    <div className="bg-blue-600 p-6 text-white dark:bg-blue-700">
                      <p className="font-mono text-xs text-blue-100/80">{exp.period}</p>
                      <p className="mt-6 text-2xl font-bold">{exp.company}</p>
                    </div>
                    <div className="bg-white/90 p-6 dark:bg-slate-950/80">
                      <div>
                        <h3 className="text-xl font-semibold">{exp.role}</h3>
                        <p className="mt-3 text-zinc-600 dark:text-zinc-400">{exp.description}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </StaggerChildren>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="space-y-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{aboutContent.text.educationTitle}</h2>
              <p className="mt-3 text-zinc-600 dark:text-zinc-400">{aboutContent.text.educationSubtitle}</p>
            </div>
            <StaggerChildren className="grid gap-6 md:grid-cols-2">
              {aboutContent.educations.map((edu) => (
                <Card key={edu.school} className="p-6">
                  <div className="mb-8 h-1 w-16 rounded-full bg-blue-500" />
                  <div>
                    <h3 className="text-xl font-semibold">{edu.degree}</h3>
                    <p className="mt-2 text-blue-600 dark:text-blue-300">{edu.school}</p>
                    <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">{edu.period}</p>
                  </div>
                </Card>
              ))}
            </StaggerChildren>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="space-y-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{aboutContent.text.servicesTitle}</h2>
              <p className="mt-3 text-zinc-600 dark:text-zinc-400">{aboutContent.text.servicesSubtitle}</p>
            </div>
            <StaggerChildren className="grid gap-6 md:grid-cols-3">
              {aboutContent.services.map((service) => (
                <Card key={service.title} className="p-7">
                  <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-lg font-bold text-white shadow-lg shadow-blue-600/20">
                    {service.title.slice(0, 1)}
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">{service.title}</h3>
                  <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{service.description}</p>
                </Card>
              ))}
            </StaggerChildren>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <GradientCta
            title={aboutContent.text.ctaTitle}
            subtitle={aboutContent.text.ctaSubtitle}
            buttonLabel={aboutContent.text.ctaButton}
            href={ROUTES.contact}
          />
        </ScrollReveal>
      </div>
    </Container>
  );
}
