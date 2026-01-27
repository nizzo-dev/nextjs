import { MainLayout } from "@/components/layout";
import { Container, Button, Card } from "@/components/ui";
import { ROUTES } from "@/lib/constants";

const projects = [
  {
    id: 1,
    title: "AI 助手应用",
    description: "基于大语言模型的智能助手，支持多轮对话、代码生成、文档分析等功能。支持多种 AI 服务商 API。",
    emoji: "🤖",
    gradient: "from-violet-500 to-purple-600",
    tags: ["React", "TypeScript", "OpenAI API", "Vercel AI SDK"],
    link: "#",
    github: "#",
    featured: true,
  },
  {
    id: 2,
    title: "电商平台",
    description: "一个功能完整的电商网站，包含商品管理、购物车、订单系统、支付集成等功能。使用 Next.js 构建，支持 SSR 优化 SEO。",
    emoji: "🛒",
    gradient: "from-orange-500 to-amber-600",
    tags: ["Next.js", "React", "TypeScript", "Stripe", "PostgreSQL"],
    link: "#",
    github: "#",
    featured: true,
  },
  {
    id: 3,
    title: "视频会议平台",
    description: "实时视频会议应用，支持屏幕共享、白板协作、录制回放等功能。延迟低至 100ms 以内。",
    emoji: "📹",
    gradient: "from-blue-500 to-cyan-600",
    tags: ["React", "WebRTC", "Node.js", "WebSocket"],
    link: "#",
    github: "#",
    featured: true,
  },
  {
    id: 4,
    title: "在线教育平台",
    description: "完整的在线学习系统，包含课程管理、视频点播、在线测验、学习进度追踪等功能。",
    emoji: "🎓",
    gradient: "from-emerald-500 to-teal-600",
    tags: ["Next.js", "React", "Prisma", "PostgreSQL"],
    link: "#",
    github: "#",
    featured: true,
  },
  {
    id: 5,
    title: "任务管理应用",
    description: "团队协作任务管理工具，支持看板视图、甘特图、任务分配、进度追踪等功能。",
    emoji: "📋",
    gradient: "from-pink-500 to-rose-600",
    tags: ["React", "Node.js", "MongoDB", "Socket.io"],
    link: "#",
    github: "#",
    featured: false,
  },
  {
    id: 6,
    title: "聊天应用",
    description: "实时聊天应用，支持私聊、群聊、文件分享、消息已读等功能。使用 WebSocket 实现实时通信。",
    emoji: "💬",
    gradient: "from-indigo-500 to-violet-600",
    tags: ["React", "Node.js", "Socket.io", "Redis"],
    link: "#",
    github: "#",
    featured: false,
  },
  {
    id: 7,
    title: "自动化测试平台",
    description: "可视化的自动化测试工具，支持录制回放、断言配置、测试报告生成。提高测试效率 10 倍以上。",
    emoji: "🧪",
    gradient: "from-amber-500 to-orange-600",
    tags: ["React", "TypeScript", "Puppeteer", "Node.js"],
    link: "#",
    github: "#",
    featured: false,
  },
  {
    id: 8,
    title: "博客系统",
    description: "个人博客平台，支持 Markdown 写作、代码高亮、SEO 优化、评论系统等功能。",
    emoji: "✍️",
    gradient: "from-gray-500 to-slate-600",
    tags: ["Next.js", "React", "Tailwind CSS", "MDX"],
    link: "#",
    github: "#",
    featured: false,
  },
  {
    id: 9,
    title: "天气应用",
    description: "实时天气预报应用，支持多城市查询、天气趋势图表、历史天气数据等功能。",
    emoji: "🌤️",
    gradient: "from-sky-400 to-sky-600",
    tags: ["React", "TypeScript", "Chart.js", "Weather API"],
    link: "#",
    github: "#",
    featured: false,
  },
  {
    id: 10,
    title: "仪表盘系统",
    description: "数据分析仪表盘，支持数据可视化、多维度分析、报表导出等功能。",
    emoji: "📊",
    gradient: "from-cyan-500 to-blue-600",
    tags: ["React", "TypeScript", "D3.js", "Node.js"],
    link: "#",
    github: "#",
    featured: false,
  },
  {
    id: 11,
    title: "代码片段管理",
    description: "开发者工具，用于管理、分享代码片段。支持语法高亮、标签分类、一键复制。",
    emoji: "💻",
    gradient: "from-slate-600 to-gray-700",
    tags: ["React", "Vue", "Firebase", "Monaco Editor"],
    link: "#",
    github: "#",
    featured: false,
  },
  {
    id: 12,
    title: "餐厅预订系统",
    description: "餐厅管理和预订系统，支持在线预订、排座管理、菜品展示、订单处理等功能。",
    emoji: "🍽️",
    gradient: "from-red-500 to-rose-600",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    link: "#",
    github: "#",
    featured: false,
  },
  {
    id: 13,
    title: "健身追踪应用",
    description: "个人健身助手，记录运动数据、制定训练计划、追踪目标进度。支持 Apple Health 数据同步。",
    emoji: "💪",
    gradient: "from-green-500 to-emerald-600",
    tags: ["React Native", "TypeScript", "GraphQL", "Node.js"],
    link: "#",
    github: "#",
    featured: false,
  },
  {
    id: 14,
    title: "图片编辑器",
    description: "浏览器端图片编辑工具，支持裁剪、滤镜、标注、批量处理等功能。完全运行在浏览器端。",
    emoji: "🎨",
    gradient: "from-fuchsia-500 to-pink-600",
    tags: ["React", "Canvas API", "TypeScript", "Web Workers"],
    link: "#",
    github: "#",
    featured: false,
  },
  {
    id: 15,
    title: "RSS 阅读器",
    description: "现代化 RSS 阅读器，支持订阅管理、智能分类、离线阅读、分享功能。",
    emoji: "📰",
    gradient: "from-orange-400 to-red-500",
    tags: ["Next.js", "React", "PWA", "Service Worker"],
    link: "#",
    github: "#",
    featured: false,
  },
  {
    id: 16,
    title: "文件分享工具",
    description: "点对点文件分享应用，支持大文件传输、加密传输、过期自动删除。无需服务器中转。",
    emoji: "📦",
    gradient: "from-blue-600 to-indigo-700",
    tags: ["React", "WebRTC", "Node.js", "WebSocket"],
    link: "#",
    github: "#",
    featured: false,
  },
];

const categories = [
  { name: "全部", emoji: "🌟" },
  { name: "Web 应用", emoji: "🌐" },
  { name: "AI & 工具", emoji: "🤖" },
  { name: "开源项目", emoji: "📦" },
];

export default function ProjectsPage() {
  return (
    <MainLayout>
      <Container className="py-12">
        <div className="space-y-16">
          {/* Header */}
          <div className="text-center space-y-4 relative">
            {/* 装饰光晕 */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10" />
            <h1 className="text-4xl md:text-5xl font-bold">
              我的<span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">作品</span>
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              这里展示了我的一些项目作品，每个项目都经过精心打磨，包含了现代 Web 开发的各种技术实践。
            </p>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category, index) => (
              <Button
                key={category.name}
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
              <span className="text-3xl">⭐</span>
              精选项目
            </h2>
            <div className="grid gap-8 lg:grid-cols-2">
              {projects.filter((p) => p.featured).map((project, index) => (
                <Card
                  key={project.id}
                  className="group overflow-hidden hover-lift animate-fade-in-up border-0 shadow-lg"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`h-56 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative overflow-hidden`}>
                    <span className="text-8xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 filter drop-shadow-lg">
                      {project.emoji}
                    </span>
                    {/* 装饰光线 */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                      <a href={project.link}>
                        <Button size="sm" className="bg-white/90 text-gray-900 hover:bg-white hover-shine">
                          查看详情
                        </Button>
                      </a>
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="sm" className="bg-white/90 text-gray-900 hover:bg-white border-white/50">
                          源代码
                        </Button>
                      </a>
                    </div>
                  </div>
                  <div className="p-6 bg-white dark:bg-zinc-900">
                    <h3 className="text-2xl font-bold group-hover:text-indigo-500 transition-colors mb-2">
                      {project.title}
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-400 mt-3 leading-relaxed">
                      {project.description}
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
              {projects.filter((p) => !p.featured).map((project, index) => (
                <Card
                  key={project.id}
                  className="group hover-lift cursor-pointer overflow-hidden border-0 shadow-md"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className={`h-36 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative overflow-hidden`}>
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
                      {project.description}
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
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-30" />
            <div className="relative text-center py-16 px-8">
              <h2 className="text-3xl font-bold text-white mb-4">对这些项目感兴趣？</h2>
              <p className="text-white/80 max-w-xl mx-auto mb-8">
                想了解更多项目详情，或者有合作想法，欢迎联系我。
              </p>
              <a href={ROUTES.contact}>
                <Button size="lg" className="bg-white text-indigo-600 hover:bg-white/90 hover-shine">
                  联系我
                </Button>
              </a>
            </div>
          </section>
        </div>
      </Container>
    </MainLayout>
  );
}
