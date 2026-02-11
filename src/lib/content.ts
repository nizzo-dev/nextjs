import { defaultLocale, type Locale } from "@/lib/i18n";

export interface SkillItem {
  name: string;
  icon: string;
  color: string;
}

export interface StatItem {
  value: string;
  label: string;
  color: string;
  gradient: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string;
  icon: string;
  gradient: string;
}

export interface EducationItem {
  degree: string;
  school: string;
  period: string;
  icon: string;
  gradient: string;
}

export interface ServiceItem {
  icon: string;
  title: string;
  description: string;
  gradient: string;
}

export interface ProjectItem {
  id: number;
  slug: string;
  title: string;
  summary: string;
  description: string;
  emoji: string;
  gradient: string;
  tags: string[];
  featured?: boolean;
  category?: string;
  year?: string;
  role?: string;
  highlights?: string[];
  demoUrl?: string;
  repoUrl?: string;
}

export interface CategoryItem {
  key: string;
  name: string;
  emoji: string;
}

export interface ResumeSkillGroup {
  label: string;
  items: string[];
}

const skills: SkillItem[] = [
  { name: "React", icon: "⚛️", color: "from-cyan-400 to-blue-500" },
  { name: "Next.js", icon: "▲", color: "from-gray-800 to-gray-600" },
  { name: "TypeScript", icon: "📘", color: "from-blue-500 to-indigo-600" },
  { name: "Node.js", icon: "🟢", color: "from-green-500 to-emerald-600" },
  { name: "Tailwind", icon: "🎨", color: "from-cyan-400 to-blue-500" },
  { name: "PostgreSQL", icon: "🐘", color: "from-blue-600 to-indigo-700" },
  { name: "GraphQL", icon: "🕸️", color: "from-pink-500 to-rose-600" },
  { name: "Docker", icon: "🐳", color: "from-blue-400 to-cyan-500" },
];

const statsByLocale: Record<Locale, StatItem[]> = {
  zh: [
    {
      value: "3+",
      label: "年开发经验",
      color: "text-indigo-500",
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      value: "20+",
      label: "完成项目",
      color: "text-pink-500",
      gradient: "from-pink-500 to-rose-500",
    },
    {
      value: "10+",
      label: "技术栈",
      color: "text-cyan-500",
      gradient: "from-cyan-500 to-blue-500",
    },
  ],
  en: [
    {
      value: "3+",
      label: "Years Experience",
      color: "text-indigo-500",
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      value: "20+",
      label: "Projects Delivered",
      color: "text-pink-500",
      gradient: "from-pink-500 to-rose-500",
    },
    {
      value: "10+",
      label: "Core Skills",
      color: "text-cyan-500",
      gradient: "from-cyan-500 to-blue-500",
    },
  ],
};

const homeTextByLocale = {
  zh: {
    greeting: "你好，我是",
    primaryAction: "查看作品",
    secondaryAction: "联系我",
    skillsTitle: "技术栈",
    skillsSubtitle: "我常用的技术",
    featuredTitle: "精选项目",
    featuredSubtitle: "最近的工作成果",
    viewAll: "查看全部",
    ctaTitle: "准备好开始合作了吗？",
    ctaSubtitle: "无论你是想构建一个网站、开发一个应用，还是需要技术咨询，我都很乐意帮忙。",
    ctaButton: "立即联系",
  },
  en: {
    greeting: "Hi, I'm",
    primaryAction: "View Work",
    secondaryAction: "Contact Me",
    skillsTitle: "Tech Stack",
    skillsSubtitle: "Tools I use most often",
    featuredTitle: "Featured Projects",
    featuredSubtitle: "Latest work highlights",
    viewAll: "View All",
    ctaTitle: "Ready to build together?",
    ctaSubtitle: "Whether it is a new website, a product idea, or technical consulting, I am happy to help.",
    ctaButton: "Get in Touch",
  },
} as const;

const aboutTextByLocale = {
  zh: {
    title: "关于我",
    subtitle: "我的职业历程",
    experienceTitle: "工作经历",
    experienceSubtitle: "我的职业历程",
    educationTitle: "教育背景",
    educationSubtitle: "我的学习经历",
    servicesTitle: "我能提供的服务",
    servicesSubtitle: "专业服务，为你创造价值",
    ctaTitle: "有想法？让我帮你实现！",
    ctaSubtitle: "无论是网站开发、技术咨询还是其它需求，我都愿意倾听并提供专业的解决方案。",
    ctaButton: "开始合作",
    contactButton: "联系我",
  },
  en: {
    title: "About Me",
    subtitle: "Career highlights",
    experienceTitle: "Experience",
    experienceSubtitle: "What I've been working on",
    educationTitle: "Education",
    educationSubtitle: "Academic background",
    servicesTitle: "Services",
    servicesSubtitle: "Professional support for your product",
    ctaTitle: "Got an idea? Let's make it real.",
    ctaSubtitle: "From web development to technical consulting, I'm happy to help with the right solution.",
    ctaButton: "Start a Project",
    contactButton: "Contact Me",
  },
} as const;

const projectsTextByLocale = {
  zh: {
    title: "我的作品",
    subtitle: "这里展示了我最近的项目实践，覆盖 Web、AI 与工程化方向。",
    featuredTitle: "精选项目",
    otherTitle: "其他项目",
    detailButton: "查看详情",
    repoButton: "源代码",
    ctaTitle: "对这些项目感兴趣？",
    ctaSubtitle: "想了解更多项目详情，或有合作想法，欢迎联系我。",
    ctaButton: "联系我",
  },
  en: {
    title: "Projects",
    subtitle: "Selected work across Web, AI, and engineering productivity.",
    featuredTitle: "Featured",
    otherTitle: "More Projects",
    detailButton: "View Details",
    repoButton: "Source Code",
    ctaTitle: "Interested in these projects?",
    ctaSubtitle: "Reach out if you'd like to learn more or collaborate.",
    ctaButton: "Contact Me",
  },
} as const;

const projectDetailTextByLocale = {
  zh: {
    back: "返回项目列表",
    demo: "在线预览",
    repo: "源代码",
    overview: "项目简介",
    highlights: "项目亮点",
    info: "项目信息",
    year: "年份",
    role: "角色",
    category: "分类",
    stack: "技术栈",
  },
  en: {
    back: "Back to Projects",
    demo: "Live Demo",
    repo: "Source Code",
    overview: "Project Overview",
    highlights: "Highlights",
    info: "Project Info",
    year: "Year",
    role: "Role",
    category: "Category",
    stack: "Tech Stack",
  },
} as const;

const resumeTextByLocale = {
  zh: {
    title: "简历",
    summary: "个人概述",
    experience: "工作经历",
    education: "教育背景",
    skills: "技能栈",
    featured: "精选项目",
    viewAll: "查看全部 →",
    download: "下载 PDF",
    contact: "联系我",
  },
  en: {
    title: "Resume",
    summary: "Summary",
    experience: "Experience",
    education: "Education",
    skills: "Skills",
    featured: "Featured Projects",
    viewAll: "View All →",
    download: "Download PDF",
    contact: "Contact Me",
  },
} as const;

const headerTextByLocale = {
  zh: {
    nav: {
      home: "首页",
      about: "关于",
      projects: "作品",
      resume: "简历",
      contact: "联系",
    },
    contactButton: "联系我",
    switchLabel: "EN",
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      projects: "Projects",
      resume: "Resume",
      contact: "Contact",
    },
    contactButton: "Contact",
    switchLabel: "中文",
  },
} as const;

const projectCategoriesByLocale: Record<Locale, CategoryItem[]> = {
  zh: [
    { key: "all", name: "全部", emoji: "🧩" },
    { key: "web", name: "Web 应用", emoji: "🌐" },
    { key: "ai", name: "AI & 工具", emoji: "🤖" },
    { key: "oss", name: "开源项目", emoji: "🧪" },
  ],
  en: [
    { key: "all", name: "All", emoji: "🧩" },
    { key: "web", name: "Web Apps", emoji: "🌐" },
    { key: "ai", name: "AI & Tools", emoji: "🤖" },
    { key: "oss", name: "Open Source", emoji: "🧪" },
  ],
};

const projectBase = [
  {
    id: 1,
    slug: "ai-assistant",
    emoji: "🤖",
    gradient: "from-violet-500 to-purple-600",
    tags: ["React", "TypeScript", "OpenAI API", "RAG"],
    featured: true,
    category: "ai",
    year: "2025",
    role: "Full-stack",
    highlights: ["Multi-model support", "Tool calling", "Conversation history"],
  },
  {
    id: 2,
    slug: "ecommerce-platform",
    emoji: "🛒",
    gradient: "from-orange-500 to-amber-600",
    tags: ["Next.js", "Stripe", "PostgreSQL", "Redis"],
    featured: true,
    category: "web",
    year: "2024",
    role: "Frontend Lead",
    highlights: ["SSR + ISR", "Multi-payments", "Ops console"],
  },
  {
    id: 3,
    slug: "video-conference",
    emoji: "📹",
    gradient: "from-blue-500 to-cyan-600",
    tags: ["WebRTC", "Node.js", "WebSocket"],
    featured: true,
    category: "web",
    year: "2024",
    role: "Full-stack",
    highlights: ["Low latency", "Recording", "Collaboration board"],
  },
  {
    id: 4,
    slug: "online-education",
    emoji: "🎓",
    gradient: "from-emerald-500 to-teal-600",
    tags: ["Next.js", "Prisma", "PostgreSQL"],
    featured: true,
    category: "web",
    year: "2023",
    role: "Full-stack",
    highlights: ["Course planning", "Learning analytics", "Content delivery"],
  },
  {
    id: 5,
    slug: "task-manager",
    emoji: "🧭",
    gradient: "from-pink-500 to-rose-600",
    tags: ["React", "Node.js", "MongoDB"],
    featured: false,
    category: "web",
    year: "2023",
    role: "Frontend",
    highlights: ["Visual workflows", "Realtime collaboration", "Role-based access"],
  },
  {
    id: 6,
    slug: "chat-app",
    emoji: "💬",
    gradient: "from-indigo-500 to-violet-600",
    tags: ["React", "Node.js", "Socket.io"],
    featured: false,
    category: "web",
    year: "2022",
    role: "Full-stack",
    highlights: ["Read receipts", "File sharing", "Search"],
  },
  {
    id: 7,
    slug: "automation-testing",
    emoji: "🧪",
    gradient: "from-amber-500 to-orange-600",
    tags: ["TypeScript", "Playwright", "Node.js"],
    featured: false,
    category: "ai",
    year: "2022",
    role: "Frontend",
    highlights: ["Script management", "Visual flows", "Reporting"],
  },
  {
    id: 8,
    slug: "personal-blog",
    emoji: "✍️",
    gradient: "from-gray-500 to-slate-600",
    tags: ["Next.js", "MDX", "Tailwind CSS"],
    featured: false,
    category: "oss",
    year: "2022",
    role: "Full-stack",
    highlights: ["Content versioning", "Themes", "Full-text search"],
  },
  {
    id: 9,
    slug: "weather-app",
    emoji: "🌤️",
    gradient: "from-sky-400 to-sky-600",
    tags: ["React", "Chart.js", "Weather API"],
    featured: false,
    category: "web",
    year: "2021",
    role: "Frontend",
    highlights: ["Multi-city", "Trends", "Auto location"],
  },
  {
    id: 10,
    slug: "analytics-dashboard",
    emoji: "📊",
    gradient: "from-cyan-500 to-blue-600",
    tags: ["TypeScript", "D3.js", "Node.js"],
    featured: false,
    category: "web",
    year: "2021",
    role: "Frontend",
    highlights: ["Multi-dim filters", "Exports", "Access control"],
  },
  {
    id: 11,
    slug: "snippet-manager",
    emoji: "🧩",
    gradient: "from-slate-600 to-gray-700",
    tags: ["React", "Firebase", "Monaco Editor"],
    featured: false,
    category: "oss",
    year: "2021",
    role: "Frontend",
    highlights: ["Sync", "Team sharing", "Themes"],
  },
  {
    id: 12,
    slug: "restaurant-booking",
    emoji: "🍽️",
    gradient: "from-red-500 to-rose-600",
    tags: ["React", "MongoDB", "Stripe"],
    featured: false,
    category: "web",
    year: "2020",
    role: "Full-stack",
    highlights: ["Reservations", "Seating management", "Payments"],
  },
  {
    id: 13,
    slug: "fitness-tracker",
    emoji: "🏋️",
    gradient: "from-green-500 to-emerald-600",
    tags: ["React Native", "GraphQL", "Node.js"],
    featured: false,
    category: "web",
    year: "2020",
    role: "Frontend",
    highlights: ["Training plans", "Data sync", "Goal tracking"],
  },
  {
    id: 14,
    slug: "image-editor",
    emoji: "🖼️",
    gradient: "from-fuchsia-500 to-pink-600",
    tags: ["React", "Canvas API", "Web Workers"],
    featured: false,
    category: "web",
    year: "2019",
    role: "Frontend",
    highlights: ["Filter library", "Batch edits", "Export optimizations"],
  },
  {
    id: 15,
    slug: "rss-reader",
    emoji: "📰",
    gradient: "from-orange-400 to-red-500",
    tags: ["Next.js", "PWA", "Service Worker"],
    featured: false,
    category: "oss",
    year: "2019",
    role: "Frontend",
    highlights: ["Offline cache", "Subscriptions", "Reader mode"],
  },
  {
    id: 16,
    slug: "file-sharing",
    emoji: "📦",
    gradient: "from-blue-600 to-indigo-700",
    tags: ["React", "WebRTC", "WebSocket"],
    featured: false,
    category: "web",
    year: "2019",
    role: "Full-stack",
    highlights: ["End-to-end encryption", "Resume transfer", "One-time links"],
  },
] as const;

type ProjectText = Record<string, { title: string; summary: string; description: string }>;

const projectTextZh: ProjectText = {
  "ai-assistant": {
    title: "AI 助手应用",
    summary: "多轮对话 + 代码生成 + 文档分析的一体化 AI 助手。",
    description:
      "基于大语言模型的智能助手，支持多轮对话、代码生成、文档分析与检索增强。提供可配置工具链，覆盖日常开发、内容生产与团队协作场景。",
  },
  "ecommerce-platform": {
    title: "电商平台",
    summary: "覆盖商品、订单、支付与运营后台的完整电商解决方案。",
    description:
      "完整的电商系统，包含商品管理、购物车、订单、支付与营销模块，支持 SEO 与性能优化，具备高并发场景下的可扩展架构。",
  },
  "video-conference": {
    title: "视频会议平台",
    summary: "低延迟实时会议，支持屏幕共享与白板协作。",
    description:
      "实时视频会议应用，支持屏幕共享、白板协作与录制回放。优化信令与媒体传输，确保弱网场景下的稳定性。",
  },
  "online-education": {
    title: "在线教育平台",
    summary: "课程管理 + 直播课堂 + 练习测评的在线学习系统。",
    description:
      "面向教育机构的综合在线学习系统，包含课程管理、直播课堂、作业与测评、学习进度追踪等能力。",
  },
  "task-manager": {
    title: "任务管理应用",
    summary: "团队协作任务管理，支持看板与甘特图。",
    description:
      "团队协作任务管理工具，提供看板、甘特图与依赖关系管理，帮助团队可视化项目进度。",
  },
  "chat-app": {
    title: "聊天应用",
    summary: "支持私聊、群聊与文件分享的实时通信应用。",
    description:
      "实时聊天应用，支持私聊、群聊、文件共享与消息已读。使用 WebSocket 构建稳定的实时通信能力。",
  },
  "automation-testing": {
    title: "自动化测试平台",
    summary: "可视化录制回放与报表分析的测试平台。",
    description:
      "可视化自动化测试平台，支持录制回放、断言配置与报告生成，显著提升团队测试效率。",
  },
  "personal-blog": {
    title: "博客系统",
    summary: "支持 MDX、SEO 与评论的个人博客平台。",
    description: "个人博客平台，支持 MDX 写作、代码高亮、SEO 优化与评论系统。",
  },
  "weather-app": {
    title: "天气应用",
    summary: "多城市查询 + 趋势图表的实时天气应用。",
    description:
      "实时天气预报应用，支持多城市查询、趋势图表展示与历史天气数据。",
  },
  "analytics-dashboard": {
    title: "数据分析仪表盘",
    summary: "多维度指标分析与可视化报表系统。",
    description:
      "面向业务与运营的数据分析仪表盘，支持多维度指标分析与可视化报表导出。",
  },
  "snippet-manager": {
    title: "代码片段管理",
    summary: "开发者代码片段管理与分享工具。",
    description:
      "面向开发者的代码片段管理工具，支持标签分类、语法高亮与一键复制。",
  },
  "restaurant-booking": {
    title: "餐厅预订系统",
    summary: "餐厅管理与在线预订的一体化系统。",
    description:
      "餐厅管理与在线预订系统，支持座位管理、菜品展示与订单处理。",
  },
  "fitness-tracker": {
    title: "健身追踪应用",
    summary: "训练计划 + 数据追踪 + 目标管理。",
    description:
      "个人健身助手，记录训练数据、制定训练计划并跟踪目标进度。",
  },
  "image-editor": {
    title: "图片编辑器",
    summary: "浏览器端图片编辑工具。",
    description:
      "浏览器端图片编辑工具，支持裁剪、滤镜、标注与批量处理。",
  },
  "rss-reader": {
    title: "RSS 阅读器",
    summary: "现代化 RSS 阅读器，支持离线阅读。",
    description:
      "现代化 RSS 阅读器，支持订阅管理、智能分类、离线阅读与分享。",
  },
  "file-sharing": {
    title: "文件分享工具",
    summary: "点对点文件传输工具，支持加密与过期。",
    description:
      "点对点文件分享工具，支持大文件传输、加密传输与过期自动删除。",
  },
};

const projectTextEn: ProjectText = {
  "ai-assistant": {
    title: "AI Assistant",
    summary: "Conversational AI with code generation and document insights.",
    description:
      "An AI assistant powered by large language models. Supports multi-turn chat, code generation, and document analysis with retrieval augmentation.",
  },
  "ecommerce-platform": {
    title: "E-commerce Platform",
    summary: "End-to-end commerce system covering catalog, orders, and payments.",
    description:
      "A full-featured commerce platform with product management, cart, orders, payments, and marketing tools optimized for performance and SEO.",
  },
  "video-conference": {
    title: "Video Conference",
    summary: "Low-latency meetings with screen share and collaboration.",
    description:
      "A real-time video conferencing product with screen sharing, whiteboard collaboration, and recording. Optimized for stability on weak networks.",
  },
  "online-education": {
    title: "Online Learning",
    summary: "Course management, live classes, and assessments in one system.",
    description:
      "An online learning platform for education providers, including course management, live classrooms, assignments, and progress tracking.",
  },
  "task-manager": {
    title: "Task Manager",
    summary: "Team collaboration with kanban and Gantt views.",
    description:
      "A collaborative task management tool with kanban boards, Gantt charts, and dependencies for clear project visibility.",
  },
  "chat-app": {
    title: "Chat App",
    summary: "Real-time messaging with groups and file sharing.",
    description:
      "A real-time chat app with private chats, group rooms, file sharing, and read receipts built on WebSocket.",
  },
  "automation-testing": {
    title: "Automation Testing",
    summary: "Visual test recording, playback, and reporting.",
    description:
      "A visual test automation platform supporting recording, assertions, and detailed reporting to boost QA efficiency.",
  },
  "personal-blog": {
    title: "Personal Blog",
    summary: "MDX-driven blog with SEO and comments.",
    description:
      "A personal blogging platform with MDX authoring, syntax highlighting, SEO optimization, and comments.",
  },
  "weather-app": {
    title: "Weather App",
    summary: "Real-time weather with multi-city forecasts.",
    description:
      "Weather app with multi-city search, trend charts, and historical data views.",
  },
  "analytics-dashboard": {
    title: "Analytics Dashboard",
    summary: "Multi-dimensional analytics and reporting.",
    description:
      "A data analytics dashboard for business and operations with flexible filters and exportable reports.",
  },
  "snippet-manager": {
    title: "Snippet Manager",
    summary: "Save and share developer snippets.",
    description:
      "A developer tool for managing code snippets with tags, syntax highlighting, and quick sharing.",
  },
  "restaurant-booking": {
    title: "Restaurant Booking",
    summary: "Reservation and seating management system.",
    description:
      "A restaurant management and booking system with seat planning, menu display, and order processing.",
  },
  "fitness-tracker": {
    title: "Fitness Tracker",
    summary: "Training plans, data tracking, and goals.",
    description:
      "A personal fitness tracker that logs workouts, plans training, and tracks progress.",
  },
  "image-editor": {
    title: "Image Editor",
    summary: "Browser-based image editing tools.",
    description:
      "An in-browser image editor with crop, filters, annotations, and batch processing.",
  },
  "rss-reader": {
    title: "RSS Reader",
    summary: "Modern RSS reader with offline mode.",
    description:
      "A modern RSS reader supporting subscription management, smart grouping, and offline reading.",
  },
  "file-sharing": {
    title: "File Sharing",
    summary: "Peer-to-peer file transfer with encryption.",
    description:
      "A peer-to-peer file sharing tool with encryption, expiration, and large-file transfer support.",
  },
};

const aboutContentByLocale = {
  zh: {
    experiences: [
      {
        role: "高级前端开发工程师",
        company: "某科技公司",
        period: "2022 - 至今",
        description:
          "负责核心产品的前端架构设计与开发，落地设计系统与组件库，持续优化性能与开发体验。",
        icon: "💼",
        gradient: "from-indigo-500 to-purple-600",
      },
      {
        role: "全栈开发工程师",
        company: "某创业公司",
        period: "2020 - 2022",
        description:
          "参与多项目全栈交付，独立负责前端架构与后端 API 设计，实现从 0 到 1 的产品落地。",
        icon: "🚀",
        gradient: "from-pink-500 to-rose-600",
      },
      {
        role: "初级前端开发工程师",
        company: "某互联网公司",
        period: "2019 - 2020",
        description:
          "负责官网与内部系统的开发维护，积累扎实的前端工程与协作经验。",
        icon: "🧑‍💻",
        gradient: "from-cyan-500 to-blue-600",
      },
    ] satisfies ExperienceItem[],
    educations: [
      {
        degree: "计算机科学与技术",
        school: "某大学",
        period: "2015 - 2019",
        icon: "🎓",
        gradient: "from-emerald-500 to-teal-600",
      },
    ] satisfies EducationItem[],
    services: [
      {
        icon: "🧭",
        title: "Web 开发",
        description:
          "为企业与个人提供专业 Web 应用开发服务，覆盖前端、后端与部署交付。",
        gradient: "from-blue-500 to-indigo-600",
      },
      {
        icon: "🎨",
        title: "UI/UX 设计",
        description: "提供界面与交互设计服务，打造美观易用的产品体验。",
        gradient: "from-pink-500 to-rose-600",
      },
      {
        icon: "🧠",
        title: "技术咨询",
        description: "面向团队与创业公司提供技术选型、架构与性能优化建议。",
        gradient: "from-amber-500 to-orange-600",
      },
    ] satisfies ServiceItem[],
  },
  en: {
    experiences: [
      {
        role: "Senior Frontend Engineer",
        company: "Tech Company",
        period: "2022 - Present",
        description:
          "Led frontend architecture, design system rollout, and continuous performance improvements.",
        icon: "💼",
        gradient: "from-indigo-500 to-purple-600",
      },
      {
        role: "Full-stack Engineer",
        company: "Startup",
        period: "2020 - 2022",
        description:
          "Delivered multiple full-stack products, owning frontend architecture and backend API design.",
        icon: "🚀",
        gradient: "from-pink-500 to-rose-600",
      },
      {
        role: "Frontend Engineer",
        company: "Internet Company",
        period: "2019 - 2020",
        description:
          "Built and maintained marketing sites and internal systems, strengthening collaboration and engineering foundations.",
        icon: "🧑‍💻",
        gradient: "from-cyan-500 to-blue-600",
      },
    ] satisfies ExperienceItem[],
    educations: [
      {
        degree: "B.S. in Computer Science",
        school: "University",
        period: "2015 - 2019",
        icon: "🎓",
        gradient: "from-emerald-500 to-teal-600",
      },
    ] satisfies EducationItem[],
    services: [
      {
        icon: "🧭",
        title: "Web Development",
        description:
          "End-to-end web development across frontend, backend, and deployment.",
        gradient: "from-blue-500 to-indigo-600",
      },
      {
        icon: "🎨",
        title: "UI/UX Design",
        description: "Designing clear, delightful interfaces and interactions.",
        gradient: "from-pink-500 to-rose-600",
      },
      {
        icon: "🧠",
        title: "Technical Consulting",
        description:
          "Architecture and performance guidance for teams and early-stage startups.",
        gradient: "from-amber-500 to-orange-600",
      },
    ] satisfies ServiceItem[],
  },
} as const;

const resumeContentByLocale: Record<
  Locale,
  { summary: string; highlights: string[]; skillGroups: ResumeSkillGroup[] }
> = {
  zh: {
    summary:
      "全栈开发工程师，专注于构建高质量 Web 应用。擅长 React、Next.js 与 Node.js，关注性能、体验与工程化。",
    highlights: [
      "主导落地组件库与设计系统，提高交付一致性",
      "优化渲染与数据层性能，提升核心页面转化",
      "具备从需求到上线的全流程交付能力",
    ],
    skillGroups: [
      {
        label: "前端",
        items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
      },
      {
        label: "后端",
        items: ["Node.js", "PostgreSQL", "GraphQL", "Redis"],
      },
      {
        label: "工程化",
        items: ["Monorepo", "CI/CD", "Docker", "Testing"],
      },
    ],
  },
  en: {
    summary:
      "Full-stack engineer focused on building high-quality web applications with React, Next.js, and Node.js.",
    highlights: [
      "Led component library and design system delivery for consistent UX",
      "Improved rendering and data performance on core pages",
      "Delivered products end-to-end from discovery to launch",
    ],
    skillGroups: [
      {
        label: "Frontend",
        items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
      },
      {
        label: "Backend",
        items: ["Node.js", "PostgreSQL", "GraphQL", "Redis"],
      },
      {
        label: "Engineering",
        items: ["Monorepo", "CI/CD", "Docker", "Testing"],
      },
    ],
  },
};

const aboutIntroByLocale = {
  zh:
    "我是一名充满热情的全栈开发者，专注于构建高质量的 Web 应用。在过去的几年里，我积累了丰富的项目经验，擅长使用现代技术栈解决复杂的技术挑战。我相信好的代码应该是简洁、可维护的，用户体验应该是直观且流畅的。",
  en:
    "I'm a passionate full-stack engineer focused on building high-quality web products. Over the years I have delivered multiple projects using modern stacks and believe great software should be clean, maintainable, and delightful to use.",
} as const;

function buildProjects(locale: Locale): ProjectItem[] {
  const textMap = locale === "en" ? projectTextEn : projectTextZh;
  return projectBase.map((project) => ({
    ...project,
    ...textMap[project.slug],
  }));
}

export function getHomeContent(locale: Locale) {
  return {
    skills,
    stats: statsByLocale[locale] ?? statsByLocale[defaultLocale],
    text: homeTextByLocale[locale] ?? homeTextByLocale[defaultLocale],
  };
}

export function getAboutContent(locale: Locale) {
  return {
    ...aboutContentByLocale[locale],
    intro: aboutIntroByLocale[locale] ?? aboutIntroByLocale[defaultLocale],
    text: aboutTextByLocale[locale] ?? aboutTextByLocale[defaultLocale],
  };
}

export function getProjectsContent(locale: Locale) {
  return {
    projects: buildProjects(locale),
    categories: projectCategoriesByLocale[locale] ?? projectCategoriesByLocale[defaultLocale],
    text: projectsTextByLocale[locale] ?? projectsTextByLocale[defaultLocale],
  };
}

export function getProjectBySlug(locale: Locale, slug: string): ProjectItem | undefined {
  return buildProjects(locale).find((project) => project.slug === slug);
}

export function getFeaturedProjects(locale: Locale): ProjectItem[] {
  return buildProjects(locale).filter((project) => project.featured);
}

export function getResumeContent(locale: Locale) {
  return {
    ...resumeContentByLocale[locale],
    text: resumeTextByLocale[locale] ?? resumeTextByLocale[defaultLocale],
  };
}

export function getProjectDetailText(locale: Locale) {
  return projectDetailTextByLocale[locale] ?? projectDetailTextByLocale[defaultLocale];
}

export function getHeaderText(locale: Locale) {
  return headerTextByLocale[locale] ?? headerTextByLocale[defaultLocale];
}
