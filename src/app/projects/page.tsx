import Link from "next/link";
import { cookies } from "next/headers";
import { Button, Card, Container } from "@/components/ui";
import { ROUTES } from "@/lib/constants";
import { getProjectsContent } from "@/lib/content";
import { defaultLocale, isLocale } from "@/lib/i18n";

export default async function ProjectsPage() {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get("NEXT_LOCALE")?.value;
  const locale = localeCookie && isLocale(localeCookie) ? localeCookie : defaultLocale;
  const { projects, categories, text } = getProjectsContent(locale);
  const featuredProjects = projects.filter((project) => project.featured);
  const otherProjects = projects.filter((project) => !project.featured);

  return (
    <Container className="py-12">
      <div className="space-y-16">
        <div className="relative space-y-4 text-center">
          <div className="absolute left-1/2 top-1/2 -z-10 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/10 blur-3xl" />
          <h1 className="text-4xl font-bold md:text-5xl">{text.title}</h1>
          <p className="mx-auto max-w-3xl text-lg text-zinc-600 dark:text-zinc-400">{text.subtitle}</p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category, index) => (
            <Button
              key={category.key}
              variant={index === 0 ? "default" : "outline"}
              size="sm"
              className={index === 0 ? "border-0 bg-gradient-to-r from-indigo-500 to-purple-500" : ""}
            >
              <span className="mr-2">{category.emoji}</span>
              {category.name}
            </Button>
          ))}
        </div>

        <section className="space-y-8">
          <h2 className="flex items-center gap-3 text-2xl font-bold">
            <span className="text-3xl">✨</span>
            {text.featuredTitle}
          </h2>
          <div className="grid gap-8 lg:grid-cols-2">
            {featuredProjects.map((project) => (
              <Card key={project.slug} className="group overflow-hidden border-0 shadow-lg">
                <div className={`relative flex h-56 items-center justify-center bg-gradient-to-br ${project.gradient}`}>
                  <span className="text-8xl transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12">
                    {project.emoji}
                  </span>
                  <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-100 md:opacity-0 md:transition-all md:duration-300 md:group-hover:opacity-100">
                    <Link href={ROUTES.project(project.slug)}>
                      <Button size="sm" className="bg-white/90 text-gray-900 hover:bg-white">
                        {text.detailButton}
                      </Button>
                    </Link>
                    {project.demoUrl && (
                      <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="sm" className="border-white/50 bg-white/90 text-gray-900 hover:bg-white">
                          演示
                        </Button>
                      </a>
                    )}
                  </div>
                </div>
                <div className="bg-white p-6 dark:bg-zinc-900">
                  <h3 className="text-2xl font-bold transition-colors group-hover:text-indigo-500">{project.title}</h3>
                  <p className="mt-3 leading-relaxed text-zinc-600 dark:text-zinc-400">{project.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-zinc-100 px-3 py-1 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="flex items-center gap-3 text-2xl font-bold">
            <span className="text-3xl">📁</span>
            {text.otherTitle}
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {otherProjects.map((project) => (
              <Link key={project.slug} href={ROUTES.project(project.slug)}>
                <Card className="group cursor-pointer overflow-hidden border-0 shadow-md">
                  <div className={`flex h-36 items-center justify-center bg-gradient-to-br ${project.gradient}`}>
                    <span className="text-5xl transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12">
                      {project.emoji}
                    </span>
                  </div>
                  <div className="bg-white p-5 dark:bg-zinc-900">
                    <h3 className="mb-1 text-lg font-semibold transition-colors group-hover:text-indigo-500">
                      {project.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">{project.summary}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="rounded bg-zinc-100 px-2 py-1 text-xs dark:bg-zinc-800">
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
            <h2 className="mb-4 text-3xl font-bold text-white">{text.ctaTitle}</h2>
            <p className="mx-auto mb-8 max-w-xl text-white/80">{text.ctaSubtitle}</p>
            <a href={ROUTES.contact}>
              <Button size="lg" className="bg-white text-indigo-600 hover:bg-white/90">
                {text.ctaButton}
              </Button>
            </a>
          </div>
        </section>
      </div>
    </Container>
  );
}
