import Link from "next/link";
import { cookies } from "next/headers";
import { Container, Button, Card, MouseFollowCharacter } from "@/components/ui";
import { ROUTES, PERSONAL_INFO } from "@/lib/constants";
import { getFeaturedProjects, getHomeContent } from "@/lib/content";
import { defaultLocale, isLocale } from "@/lib/i18n";

export default async function Home() {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get("NEXT_LOCALE")?.value;
  const locale = localeCookie && isLocale(localeCookie) ? localeCookie : defaultLocale;
  const homeContent = getHomeContent(locale);
  const featuredProjects = getFeaturedProjects(locale).slice(0, 4);

  const socialLinks = [
    { label: "GitHub", href: PERSONAL_INFO.github },
    { label: "Email", href: `mailto:${PERSONAL_INFO.email}` },
    { label: "AI Demo", href: PERSONAL_INFO.website },
  ];

  return (
    <>
      <Container className="py-12 md:py-24">
        <div className="space-y-24">
          <section className="relative flex flex-col items-center space-y-8 text-center">
            <div className="absolute left-1/2 top-1/2 -z-10 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/20 blur-3xl" />

            <div className="relative">
              <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-5xl font-bold text-white shadow-lg shadow-indigo-500/30 transition-transform duration-300 hover:scale-110">
                {PERSONAL_INFO.name[0].toUpperCase()}
              </div>
              <div className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full border-4 border-white bg-green-500 dark:border-black" />
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
                {homeContent.text.greeting}{" "}
                <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  {PERSONAL_INFO.name}
                </span>
              </h1>
              <p className="mx-auto max-w-3xl text-xl text-zinc-600 dark:text-zinc-400">
                <span className="font-semibold text-indigo-500">
                  {PERSONAL_INFO.title}
                </span>
                <span className="mx-2">|</span>
                {PERSONAL_INFO.bio}
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Link href={ROUTES.projects}>
                <Button
                  size="lg"
                  className="border-0 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
                >
                  {homeContent.text.primaryAction}
                </Button>
              </Link>
              <Link href={ROUTES.contact}>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-indigo-500 text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-950"
                >
                  {homeContent.text.secondaryAction}
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
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

          <section className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
            {homeContent.stats.map((stat) => (
              <Card key={stat.label} className="cursor-default py-8 text-center">
                <div className={`bg-gradient-to-r ${stat.gradient} bg-clip-text text-2xl font-bold text-transparent`}>
                  {stat.value}
                </div>
                <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{stat.label}</div>
              </Card>
            ))}
          </section>

          <section className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold">{homeContent.text.skillsTitle}</h2>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">{homeContent.text.skillsSubtitle}</p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {homeContent.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="flex cursor-default items-center gap-2 rounded-full border border-zinc-200 bg-white px-6 py-3 shadow-sm transition-colors hover:border-indigo-500 dark:border-zinc-700 dark:bg-zinc-800"
                >
                  <span className="text-xl">{skill.icon}</span>
                  <span className="font-medium text-zinc-700 dark:text-zinc-300">{skill.name}</span>
                </div>
              ))}
            </div>
          </section>

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
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {featuredProjects.map((project) => (
                <Link key={project.id} href={ROUTES.project(project.slug)}>
                  <Card className="group h-full cursor-pointer overflow-hidden">
                    <div className={`flex h-40 items-center justify-center bg-gradient-to-br ${project.gradient}`}>
                      <span className="text-5xl transition-transform duration-300 group-hover:scale-125">{project.emoji}</span>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold transition-colors group-hover:text-indigo-500">
                        {project.title}
                      </h3>
                      <p className="mt-2 line-clamp-3 text-sm text-zinc-600 dark:text-zinc-400">
                        {project.summary}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="rounded bg-zinc-100 px-2 py-1 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          <section className="relative overflow-hidden rounded-3xl">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
            <div className="relative px-8 py-16 text-center">
              <h2 className="mb-4 text-3xl font-bold text-white">{homeContent.text.ctaTitle}</h2>
              <p className="mx-auto mb-8 max-w-3xl text-white/85">{homeContent.text.ctaSubtitle}</p>
              <Link href={ROUTES.contact}>
                <Button size="lg" className="bg-white text-indigo-600 hover:bg-white/90">
                  {homeContent.text.ctaButton}
                </Button>
              </Link>
            </div>
          </section>
        </div>
      </Container>

      <MouseFollowCharacter />
    </>
  );
}
