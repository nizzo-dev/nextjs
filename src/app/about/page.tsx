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
    <Container className="py-12">
      <div className="space-y-20">
        <PageHero>
          <section className="relative flex flex-col items-center gap-12 md:flex-row">
            <div className="absolute left-1/2 top-1/2 -z-10 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-500/10 blur-3xl" />

            <div className="relative">
              <div className="flex h-48 w-48 items-center justify-center rounded-2xl bg-indigo-600 text-6xl font-bold text-white shadow-xl shadow-indigo-500/25">
                {PERSONAL_INFO.displayName[0].toUpperCase()}
              </div>
            </div>

            <div className="space-y-6 text-center md:text-left">
              <div>
                <h1 className="page-hero-title text-4xl font-bold">
                  {aboutContent.text.title}
                  <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    {" "} {PERSONAL_INFO.name}
                  </span>
                </h1>
                <p className="page-hero-subtitle mt-2 text-lg text-zinc-600 dark:text-zinc-400">{profile.title}</p>
              </div>

              <p className="max-w-3xl leading-relaxed text-zinc-600 dark:text-zinc-400">
                {aboutContent.intro}
              </p>

              <div className="flex flex-wrap justify-center gap-4 md:justify-start">
                <a href={`mailto:${PERSONAL_INFO.email}`}>
                  <Button size="lg" className="border-0 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600">
                    {aboutContent.text.contactButton}
                  </Button>
                </a>
                <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="lg">
                    GitHub
                  </Button>
                </a>
                <a href={PERSONAL_INFO.website} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="lg">
                    AI Demo
                  </Button>
                </a>
              </div>
            </div>
          </section>
        </PageHero>

        <ScrollReveal>
          <section className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold">{aboutContent.text.experienceTitle}</h2>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">{aboutContent.text.experienceSubtitle}</p>
            </div>
            <StaggerChildren className="space-y-6">
              {aboutContent.experiences.map((exp) => (
                <Card key={exp.role} className="overflow-hidden border-0 shadow-md">
                  <div className="flex">
                    <div className={`w-2 bg-gradient-to-b ${exp.gradient}`} />
                    <div className="flex-1 p-6">
                      <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${exp.gradient} text-2xl`}>
                            {exp.icon}
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold">{exp.role}</h3>
                            <p className="text-indigo-500">{exp.company}</p>
                          </div>
                        </div>
                        <span className="rounded-full bg-zinc-100 px-4 py-2 text-sm text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                          {exp.period}
                        </span>
                      </div>
                      <p className="text-zinc-600 dark:text-zinc-400">{exp.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </StaggerChildren>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold">{aboutContent.text.educationTitle}</h2>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">{aboutContent.text.educationSubtitle}</p>
            </div>
            <StaggerChildren className="mx-auto grid max-w-2xl gap-6 md:grid-cols-1">
              {aboutContent.educations.map((edu) => (
                <Card key={edu.school} className="overflow-hidden border-0 shadow-md">
                  <div className={`flex h-28 items-center justify-center bg-gradient-to-br ${edu.gradient} text-5xl`}>
                    {edu.icon}
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-semibold">{edu.degree}</h3>
                    <p className="text-indigo-500">{edu.school}</p>
                    <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">{edu.period}</p>
                  </div>
                </Card>
              ))}
            </StaggerChildren>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold">{aboutContent.text.servicesTitle}</h2>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">{aboutContent.text.servicesSubtitle}</p>
            </div>
            <StaggerChildren className="grid gap-6 md:grid-cols-3">
              {aboutContent.services.map((service) => (
                <Card key={service.title} className="overflow-hidden border-0 text-center shadow-md">
                  <div className={`flex h-32 items-center justify-center bg-gradient-to-br ${service.gradient} text-6xl`}>
                    {service.icon}
                  </div>
                  <div className="p-8">
                    <h3 className="mb-2 text-xl font-semibold">{service.title}</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">{service.description}</p>
                  </div>
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
