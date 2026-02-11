import Link from "next/link";
import { cookies } from "next/headers";
import { Container, Button, Card } from "@/components/ui";
import { ROUTES } from "@/lib/constants";
import { getProjectsContent } from "@/lib/content";
import { defaultLocale, isLocale } from "@/lib/i18n";

export default async function ProjectsPage() {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get("NEXT_LOCALE")?.value;
  const locale = localeCookie && isLocale(localeCookie) ? localeCookie : defaultLocale;
  const { projects, categories: projectCategories } = getProjectsContent(locale);
  const featuredProjects = projects.filter((project) => project.featured);
  const otherProjects = projects.filter((project) => !project.featured);

  return (
    <>
      <Container className="py-12">
        <div className="space-y-16">
          {/* Header */}
          <div className="text-center space-y-4 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10" />
            <h1 className="text-4xl md:text-5xl font-bold">
              我的
              <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                作品
              </span>
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              这里展示了我最近的项目实践，覆盖 Web、AI 与工程化方向。
            </p>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-3">
            {projectCategories.map((category, index) => (
              <Button
                key={category.key}
                variant={index === 0 ? "default" : "outline"}
                size="sm"
                className={`animate-fade-in-up ${index === 0 ? "bg-gradient-to-r from-indigo-500 to-purple-500 border-0" : ""}`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="mr-2">{category.emoji}</span>
                {category.name}
              </Button>
            ))}
          </div>

          {/* Featured Projects */}
          <section className="space-y-8">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <span className="text-3xl">🌟</span>
              精选项目
            </h2>
            <div className="grid gap-8 lg:grid-cols-2">
              {featuredProjects.map((project, index) => (
                <Card
                  key={project.slug}
                  className="group overflow-hidden hover-lift animate-fade-in-up border-0 shadow-lg"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div
                    className={`h-56 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative overflow-hidden`}
                  >
                    <span className="text-8xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 filter drop-shadow-lg">
                      {project.emoji}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                      <Link href={ROUTES.project(project.slug)}>
                        <Button
                          size="sm"
                          className="bg-white/90 text-gray-900 hover:bg-white hover-shine"
                        >
                          查看详情
                        </Button>
                      </Link>
                      {project.repoUrl && (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-white/90 text-gray-900 hover:bg-white border-white/50"
                          >
                            源代码
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="p-6 bg-white dark:bg-zinc-900">
                    <h3 className="text-2xl font-bold group-hover:text-indigo-500 transition-colors mb-2">
                      {project.title}
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-400 mt-3 leading-relaxed">
                      {project.summary}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full text-zinc-600 dark:text-zinc-400"
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

          {/* Other Projects */}
          <section className="space-y-8">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <span className="text-3xl">📁</span>
              其他项目
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {otherProjects.map((project, index) => (
                <Link key={project.slug} href={ROUTES.project(project.slug)}>
                  <Card
                    className="group hover-lift cursor-pointer overflow-hidden border-0 shadow-md"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div
                      className={`h-36 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative overflow-hidden`}
                    >
                      <span className="text-5xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                        {project.emoji}
                      </span>
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                    </div>
                    <div className="p-5 bg-white dark:bg-zinc-900">
                      <h3 className="font-semibold text-lg group-hover:text-indigo-500 transition-colors mb-1">
                        {project.title}
                      </h3>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 line-clamp-2">
                        {project.summary}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {project.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 2 && (
                          <span className="text-xs px-2 py-1 text-zinc-500">
                            +{project.tags.length - 2}
                          </span>
                        )}
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-30" />
            <div className="relative text-center py-16 px-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                对这些项目感兴趣？
              </h2>
              <p className="text-white/80 max-w-xl mx-auto mb-8">
                想了解更多项目详情，或有合作想法，欢迎联系我。
              </p>
              <a href={ROUTES.contact}>
                <Button
                  size="lg"
                  className="bg-white text-indigo-600 hover:bg-white/90 hover-shine"
                >
                  联系我
                </Button>
              </a>
            </div>
          </section>
        </div>
      </Container>
    </>
  );
}
