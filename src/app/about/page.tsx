import { cookies } from "next/headers";
import { Container, Button, Card } from "@/components/ui";
import { ROUTES, PERSONAL_INFO } from "@/lib/constants";
import { getAboutContent } from "@/lib/content";
import { defaultLocale, isLocale } from "@/lib/i18n";

export default async function AboutPage() {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get("NEXT_LOCALE")?.value;
  const locale = localeCookie && isLocale(localeCookie) ? localeCookie : defaultLocale;
  const aboutContent = getAboutContent(locale);
  return (
    <>
      <Container className="py-12">
        <div className="space-y-20">
          {/* About Me Section */}
          <section className="flex flex-col md:flex-row gap-12 items-center relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl -z-10" />

            <div className="relative">
              <div className="w-48 h-48 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-6xl text-white font-bold animate-float flex-shrink-0 shadow-xl shadow-indigo-500/30">
                {PERSONAL_INFO.name[0]}
              </div>
              <div className="absolute -bottom-2 -right-2 bg-green-500 w-10 h-10 rounded-full border-4 border-white dark:border-black animate-pulse" />
            </div>
            <div className="space-y-6 text-center md:text-left">
              <div>
                <h1 className="text-4xl font-bold">
                  关于
                  <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    我
                  </span>
                </h1>
                <p className="text-lg text-zinc-600 dark:text-zinc-400 mt-2">
                  {PERSONAL_INFO.title}
                </p>
              </div>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
                我是一名充满热情的全栈开发者，专注于构建高质量的 Web 应用。
                在过去的几年里，我积累了丰富的项目经验，擅长使用现代技术栈
                解决复杂的技术挑战。我相信好的代码应该是简洁、可维护的，
                用户体验应该是直观且流畅的。
              </p>
              <div className="flex gap-4 justify-center md:justify-start">
                <a href={`mailto:${PERSONAL_INFO.email}`}>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 hover-shine border-0"
                  >
                    联系我
                  </Button>
                </a>
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="lg" className="hover-shine">
                    GitHub
                  </Button>
                </a>
              </div>
            </div>
          </section>

          {/* Experience Section */}
          <section className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold">工作经历</h2>
              <p className="text-zinc-600 dark:text-zinc-400 mt-2">
                我的职业历程
              </p>
            </div>
            <div className="space-y-6">
              {aboutContent.experiences.map((exp, index) => (
                <Card
                  key={exp.role}
                  className="animate-fade-in-up hover-lift overflow-hidden border-0 shadow-md"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex">
                    <div className={`w-2 bg-gradient-to-b ${exp.gradient}`} />
                    <div className="p-6 flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${exp.gradient} flex items-center justify-center text-2xl`}
                          >
                            {exp.icon}
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold">
                              {exp.role}
                            </h3>
                            <p className="text-indigo-500">{exp.company}</p>
                          </div>
                        </div>
                        <span className="text-sm text-zinc-500 dark:text-zinc-400 px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-full">
                          {exp.period}
                        </span>
                      </div>
                      <p className="text-zinc-600 dark:text-zinc-400">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Education Section */}
          <section className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold">教育背景</h2>
              <p className="text-zinc-600 dark:text-zinc-400 mt-2">
                我的学习经历
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 max-w-2xl mx-auto">
              {aboutContent.educations.map((edu, index) => (
                <Card
                  key={edu.school}
                  className="animate-fade-in-up hover-lift overflow-hidden border-0 shadow-md"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div
                    className={`h-32 bg-gradient-to-br ${edu.gradient} flex items-center justify-center`}
                  >
                    <div className="text-6xl">{edu.icon}</div>
                  </div>
                  <div className="p-6 text-center bg-white dark:bg-zinc-900">
                    <h3 className="text-xl font-semibold">{edu.degree}</h3>
                    <p className="text-indigo-500">{edu.school}</p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
                      {edu.period}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Services Section */}
          <section className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold">我能提供的服务</h2>
              <p className="text-zinc-600 dark:text-zinc-400 mt-2">
                专业服务，为你创造价值
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {aboutContent.services.map((service, index) => (
                <Card
                  key={service.title}
                  className="text-center hover-lift animate-fade-in-up overflow-hidden border-0 shadow-md"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div
                    className={`h-32 bg-gradient-to-br ${service.gradient} flex items-center justify-center`}
                  >
                    <span className="text-6xl">{service.icon}</span>
                  </div>
                  <div className="p-8 bg-white dark:bg-zinc-900">
                    <h3 className="text-xl font-semibold mb-2">
                      {service.title}
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      {service.description}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-30" />
            <div className="relative text-center py-16 px-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                有想法？让我帮你实现！
              </h2>
              <p className="text-white/80 mb-6 max-w-xl mx-auto">
                无论是网站开发、技术咨询还是其它需求，我都愿意倾听并提供
                专业的解决方案。
              </p>
              <a href={ROUTES.contact}>
                <Button
                  size="lg"
                  className="bg-white text-indigo-600 hover:bg-white/90 hover-shine"
                >
                  开始合作
                </Button>
              </a>
            </div>
          </section>
        </div>
      </Container>
    </>
  );
}
