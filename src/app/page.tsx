import Link from "next/link";
import { cookies } from "next/headers";
import { Container, Button, Card, MouseFollowCharacter } from "@/components/ui";
import { ROUTES, PERSONAL_INFO } from "@/lib/constants";
import { getHomeContent, getFeaturedProjects } from "@/lib/content";
import { defaultLocale, isLocale } from "@/lib/i18n";

export default async function Home() {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get("NEXT_LOCALE")?.value;
  const locale = localeCookie && isLocale(localeCookie) ? localeCookie : defaultLocale;
  const homeContent = getHomeContent(locale);
  const featuredProjects = getFeaturedProjects(locale).slice(0, 3);
  return (
    <>
      <Container className="py-12 md:py-24">
        <div className="space-y-24">
          {/* Hero Section */}
          <section className="flex flex-col items-center text-center space-y-8 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl -z-10" />

            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-5xl text-white font-bold animate-float shadow-lg shadow-indigo-500/30 hover:scale-110 transition-transform duration-300">
                {PERSONAL_INFO.name[0]}
              </div>
              <div className="absolute -bottom-1 -right-1 bg-green-500 w-8 h-8 rounded-full border-4 border-white dark:border-black animate-pulse" />
              <div
                className="absolute -top-2 -left-2 w-4 h-4 bg-pink-500 rounded-full animate-pulse-soft"
                style={{ animationDelay: "0.5s" }}
              />
              <div
                className="absolute top-4 -right-4 w-3 h-3 bg-cyan-500 rounded-full animate-pulse-soft"
                style={{ animationDelay: "1s" }}
              />
            </div>

            <div className="space-y-4 relative">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                你好，我是
                <span className="animate-gradient-text bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                  {PERSONAL_INFO.name}
                </span>
              </h1>
              <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto animate-fade-in-up">
                <span className="font-semibold text-indigo-500">
                  {PERSONAL_INFO.title}
                </span>
                <span className="mx-2">|</span>
                {PERSONAL_INFO.bio}
              </p>
            </div>

            <div className="flex flex-wrap gap-4 justify-center animate-fade-in-up animate-delay-200">
              <Link href={ROUTES.projects}>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 hover-shine border-0"
                >
                  查看作品
                </Button>
              </Link>
              <Link href={ROUTES.contact}>
                <Button
                  variant="outline"
                  size="lg"
                  className="hover-shine border-indigo-500 text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-950"
                >
                  联系我
                </Button>
              </Link>
            </div>

            <div className="flex gap-4 animate-fade-in-up animate-delay-300">
              {[
                { icon: "github", href: PERSONAL_INFO.github, label: "GitHub" },
                {
                  icon: "twitter",
                  href: PERSONAL_INFO.twitter,
                  label: "Twitter",
                },
                {
                  icon: "linkedin",
                  href: PERSONAL_INFO.linkedin,
                  label: "LinkedIn",
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-950 transition-all duration-300 hover-scale hover-lift"
                >
                  {social.icon === "github" && (
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  )}
                  {social.icon === "twitter" && (
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  )}
                  {social.icon === "linkedin" && (
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </section>

          {/* Stats Section */}
          <section className="grid grid-cols-3 gap-6 max-w-4xl mx-auto">
            {homeContent.stats.map((stat, index) => (
              <Card
                key={stat.label}
                className="text-center py-8 animate-fade-in-up group hover-lift cursor-default"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className={`text-4xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}
                >
                  {stat.value}
                </div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 group-hover:text-zinc-800 dark:group-hover:text-zinc-200 transition-colors">
                  {stat.label}
                </div>
              </Card>
            ))}
          </section>

          {/* Skills Section */}
          <section className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold">技术栈</h2>
              <p className="text-zinc-600 dark:text-zinc-400 mt-2">
                我常用的技术
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {homeContent.skills.map((skill, index) => (
                <div
                  key={skill.name}
                  className="group flex items-center gap-2 px-6 py-3 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:border-indigo-500 transition-all duration-300 hover-lift cursor-default animate-fade-in-up shadow-sm hover:shadow-md"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="text-xl group-hover:scale-125 transition-transform duration-300">
                    {skill.icon}
                  </span>
                  <span className="font-medium text-zinc-700 dark:text-zinc-300 group-hover:text-indigo-500 transition-colors">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Featured Projects Preview */}
          <section className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold">精选项目</h2>
                <p className="text-zinc-600 dark:text-zinc-400 mt-2">
                  最近的工作成果
                </p>
              </div>
              <Link href={ROUTES.projects}>
                <Button variant="ghost" className="group">
                  查看全部
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </Button>
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.map((project, index) => (
                <Link key={project.id} href={ROUTES.project(project.slug)}>
                  <Card className="group h-full hover-lift cursor-pointer overflow-hidden">
                    <div
                      className={`h-40 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative overflow-hidden`}
                    >
                      <span className="text-5xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                        {project.emoji}
                      </span>
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                    </div>
                    <div className="p-6">
                      <h3 className="font-semibold text-lg group-hover:text-indigo-500 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 line-clamp-2">
                        {project.summary}
                      </p>
                      <div className="flex gap-2 mt-4">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded text-zinc-600 dark:text-zinc-400"
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

          {/* CTA Section */}
          <section className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-30" />
            <div className="relative text-center py-16 px-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                准备好开始合作了吗？
              </h2>
              <p className="text-white/80 max-w-xl mx-auto mb-8">
                无论你是想构建一个网站、开发一个应用，还是需要技术咨询，
                我都很乐意帮忙。
              </p>
              <Link href={ROUTES.contact}>
                <Button
                  size="lg"
                  className="bg-white text-indigo-600 hover:bg-white/90 hover-shine"
                >
                  立即联系
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
