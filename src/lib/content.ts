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
  { name: "Vue", icon: "🟢", color: "from-emerald-400 to-green-600" },
  { name: "React Hooks", icon: "⚛️", color: "from-cyan-400 to-blue-500" },
  { name: "微信小程序", icon: "🧩", color: "from-lime-400 to-green-500" },
  { name: "Webpack / Vite", icon: "⚡", color: "from-amber-400 to-orange-500" },
  { name: "Ant Design / Element / Vant", icon: "🎨", color: "from-pink-400 to-rose-500" },
  { name: "ECharts / 地图", icon: "📊", color: "from-indigo-400 to-violet-500" },
  { name: "微前端 / 低代码", icon: "🧱", color: "from-sky-400 to-cyan-500" },
  { name: "Node.js / Linux", icon: "🛠️", color: "from-slate-500 to-zinc-700" },
  { name: "AI 辅助开发", icon: "🤖", color: "from-fuchsia-500 to-pink-600" },
];

const statsByLocale: Record<Locale, StatItem[]> = {
  zh: [
    {
      value: "Vue + React",
      label: "双主栈工程实践",
      color: "text-indigo-500",
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      value: "Web / H5 / 小程序",
      label: "多端交付经验",
      color: "text-pink-500",
      gradient: "from-pink-500 to-rose-500",
    },
    {
      value: "AI + 工程化",
      label: "效率与质量并重",
      color: "text-cyan-500",
      gradient: "from-cyan-500 to-blue-500",
    },
  ],
  en: [
    {
      value: "Vue + React",
      label: "Dual-stack engineering",
      color: "text-indigo-500",
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      value: "Web / H5 / Mini Program",
      label: "Cross-platform delivery",
      color: "text-pink-500",
      gradient: "from-pink-500 to-rose-500",
    },
    {
      value: "AI + DX",
      label: "Speed with quality",
      color: "text-cyan-500",
      gradient: "from-cyan-500 to-blue-500",
    },
  ],
};

const homeTextByLocale = {
  zh: {
    greeting: "你好，我是",
    primaryAction: "查看项目",
    secondaryAction: "联系我",
    skillsTitle: "核心能力",
    skillsSubtitle: "围绕多端业务、工程化和 AI 效率提升持续实践",
    featuredTitle: "精选项目",
    featuredSubtitle: "覆盖 AI、企业应用、多端与可视化方向",
    viewAll: "查看全部",
    ctaTitle: "如果你需要一名能快速落地的前端工程师",
    ctaSubtitle:
      "我可以参与 Vue / React 大型项目开发，多端适配、可视化、微前端、低代码和 AI 增效场景也有完整实践。",
    ctaButton: "发起沟通",
  },
  en: {
    greeting: "Hi, I'm",
    primaryAction: "View Projects",
    secondaryAction: "Contact Me",
    skillsTitle: "Core Skills",
    skillsSubtitle: "Focused on multi-platform delivery, engineering quality, and AI-assisted productivity",
    featuredTitle: "Featured Projects",
    featuredSubtitle: "Selected work across AI, enterprise apps, cross-platform delivery, and visualization",
    viewAll: "View All",
    ctaTitle: "Need a frontend engineer who can ship fast and clean?",
    ctaSubtitle:
      "I work across Vue, React, H5, mini programs, visualization, micro-frontends, low-code, and AI-assisted workflows.",
    ctaButton: "Get in Touch",
  },
} as const;

const aboutTextByLocale = {
  zh: {
    title: "关于我",
    subtitle: "聚焦业务落地与工程质量",
    experienceTitle: "项目经验",
    experienceSubtitle: "持续迭代的大型项目与复杂场景实践",
    educationTitle: "学习成长",
    educationSubtitle: "通过项目、工具和技术探索持续升级",
    servicesTitle: "我能提供的价值",
    servicesSubtitle: "不仅能写页面，也能推动交付效率和整体体验",
    ctaTitle: "如果你的项目正需要稳定推进",
    ctaSubtitle:
      "欢迎交流 Vue、React、多端适配、可视化、微前端、低代码或 AI 辅助开发相关合作。",
    ctaButton: "开始沟通",
    contactButton: "联系我",
  },
  en: {
    title: "About Me",
    subtitle: "Product-minded engineering with strong delivery discipline",
    experienceTitle: "Experience",
    experienceSubtitle: "Large projects, complex scenarios, and practical execution",
    educationTitle: "Growth",
    educationSubtitle: "Continuous learning through product work, tooling, and exploration",
    servicesTitle: "What I Bring",
    servicesSubtitle: "Beyond UI implementation: delivery speed, engineering quality, and user experience",
    ctaTitle: "Need steady progress on a demanding project?",
    ctaSubtitle:
      "Happy to discuss Vue, React, cross-platform delivery, visualization, micro-frontends, low-code, or AI-assisted development.",
    ctaButton: "Start a Conversation",
    contactButton: "Contact Me",
  },
} as const;

const projectsTextByLocale = {
  zh: {
    title: "项目作品",
    subtitle: "围绕 AI、企业前端、多端交付、可视化与工程化能力的真实实践。",
    featuredTitle: "精选项目",
    otherTitle: "更多实践",
    detailButton: "查看详情",
    repoButton: "源码",
    ctaTitle: "想进一步了解这些项目？",
    ctaSubtitle: "如果你对某个方向感兴趣，或者有类似需求，欢迎直接联系我。",
    ctaButton: "联系我",
  },
  en: {
    title: "Projects",
    subtitle: "Practical work spanning AI, enterprise frontend, cross-platform delivery, visualization, and engineering systems.",
    featuredTitle: "Featured",
    otherTitle: "More Work",
    detailButton: "View Details",
    repoButton: "Source Code",
    ctaTitle: "Interested in these projects?",
    ctaSubtitle: "If any of these directions match your needs, feel free to reach out.",
    ctaButton: "Contact Me",
  },
} as const;

const projectDetailTextByLocale = {
  zh: {
    back: "返回项目列表",
    demo: "在线演示",
    repo: "源码",
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
    overview: "Overview",
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
    title: "个人简历",
    summary: "个人概述",
    experience: "项目经验",
    education: "学习成长",
    skills: "技能矩阵",
    featured: "代表项目",
    viewAll: "查看全部 →",
    download: "下载 PDF",
    contact: "联系我",
  },
  en: {
    title: "Resume",
    summary: "Summary",
    experience: "Experience",
    education: "Growth",
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
      projects: "项目",
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
    { key: "all", name: "全部", emoji: "🌍" },
    { key: "web", name: "企业应用", emoji: "💼" },
    { key: "ai", name: "AI 与效率", emoji: "🤖" },
    { key: "visual", name: "可视化", emoji: "📈" },
  ],
  en: [
    { key: "all", name: "All", emoji: "🌍" },
    { key: "web", name: "Enterprise Apps", emoji: "💼" },
    { key: "ai", name: "AI & Productivity", emoji: "🤖" },
    { key: "visual", name: "Visualization", emoji: "📈" },
  ],
};

const projectBase = [
  {
    id: 1,
    slug: "cookieai",
    emoji: "🤖",
    gradient: "from-fuchsia-500 to-violet-600",
    tags: ["React", "AI", "Prompt Engineering", "Workflow"],
    featured: true,
    category: "ai",
    year: "2026",
    role: "独立设计与开发",
    demoUrl: "https://cookieai.xhbspace.cn",
    highlights: [
      "多轮对话与 AI 工作流整合",
      "面向真实使用场景的效率工具设计",
      "持续结合 AI 编程实践快速迭代",
    ],
  },
  {
    id: 2,
    slug: "enterprise-dashboard",
    emoji: "💼",
    gradient: "from-indigo-500 to-blue-600",
    tags: ["Vue", "Element UI", "Redux", "权限系统"],
    featured: true,
    category: "web",
    year: "2025",
    role: "前端负责人",
    highlights: [
      "负责大型后台项目模块拆分与组件复用",
      "推动复杂表单、列表和权限体系稳定落地",
      "注重性能优化和业务迭代效率",
    ],
  },
  {
    id: 3,
    slug: "mini-program-commerce",
    emoji: "🛍️",
    gradient: "from-emerald-500 to-teal-600",
    tags: ["H5", "微信小程序", "Vant", "多端适配"],
    featured: true,
    category: "web",
    year: "2025",
    role: "核心开发",
    highlights: [
      "同时兼顾 Web 端、H5 与小程序体验",
      "处理多终端 UI 还原与交互一致性问题",
      "沉淀跨端适配与组件封装方案",
    ],
  },
  {
    id: 4,
    slug: "data-visualization-platform",
    emoji: "📊",
    gradient: "from-cyan-500 to-sky-600",
    tags: ["ECharts", "BizCharts", "地图", "大屏"],
    featured: true,
    category: "visual",
    year: "2024",
    role: "可视化前端",
    highlights: [
      "建设多图表联动与地图可视化能力",
      "强调数据表达清晰度与交互体验",
      "支持大屏展示与业务决策场景",
    ],
  },
  {
    id: 5,
    slug: "micro-frontend-workspace",
    emoji: "🧩",
    gradient: "from-orange-500 to-amber-600",
    tags: ["微前端", "React", "Vue", "模块治理"],
    featured: false,
    category: "web",
    year: "2024",
    role: "架构参与",
    highlights: [
      "探索多团队并行开发下的前端边界管理",
      "提升应用拆分、发布和联调效率",
      "兼顾业务隔离与整体体验一致性",
    ],
  },
  {
    id: 6,
    slug: "low-code-builder",
    emoji: "🧱",
    gradient: "from-pink-500 to-rose-600",
    tags: ["低代码", "React", "Schema", "拖拽"],
    featured: false,
    category: "ai",
    year: "2024",
    role: "前端开发",
    highlights: [
      "参与低代码页面编排和组件配置能力建设",
      "关注可扩展性、配置表达和渲染性能",
      "提升业务页面生成效率",
    ],
  },
  {
    id: 7,
    slug: "build-performance-tooling",
    emoji: "⚡",
    gradient: "from-slate-600 to-zinc-800",
    tags: ["Webpack", "Vite", "构建优化", "性能分析"],
    featured: false,
    category: "ai",
    year: "2023",
    role: "工程化建设",
    highlights: [
      "优化本地开发体验与构建效率",
      "分析包体积、首屏和缓存策略",
      "推动工程脚手架和规范统一",
    ],
  },
  {
    id: 8,
    slug: "node-api-collab",
    emoji: "🔌",
    gradient: "from-lime-500 to-green-700",
    tags: ["Node.js", "Express", "Koa", "Linux"],
    featured: false,
    category: "web",
    year: "2023",
    role: "前后端联调",
    highlights: [
      "可承担基础接口开发与联调工作",
      "熟悉部署流程和 Linux 环境基础操作",
      "帮助前端交付更闭环地推进",
    ],
  },
] as const;

type ProjectText = Record<string, { title: string; summary: string; description: string }>;

const projectTextZh: ProjectText = {
  cookieai: {
    title: "Cookie AI",
    summary: "AI 项目演示站，聚焦对话、效率提升与个人 AI 编程实践。",
    description:
      "这是我的 AI 项目演示作品，重点展示如何把大模型能力融入真实工作流，包括对话交互、内容生成、问题解决与持续迭代。在开发过程中我也大量使用 AI 辅助编程工具，以更快验证想法并优化实现细节。",
  },
  "enterprise-dashboard": {
    title: "企业后台管理系统",
    summary: "基于 Vue 生态构建的大型后台项目，覆盖复杂业务模块与权限体系。",
    description:
      "项目强调大型业务系统中的组件复用、状态管理、权限控制和复杂页面交互。我负责前端模块实现与工程治理，关注可维护性、交付效率以及高还原度 UI 落地。",
  },
  "mini-program-commerce": {
    title: "多端商城项目",
    summary: "同时覆盖 Web、H5 与微信小程序的业务项目，重点解决多端适配问题。",
    description:
      "该项目围绕多端交付展开，强调组件复用、样式还原与交互一致性。针对不同终端表现差异进行适配处理，在保证业务效率的同时兼顾用户体验。",
  },
  "data-visualization-platform": {
    title: "数据可视化平台",
    summary: "结合图表和地图能力构建的数据大屏与业务分析项目。",
    description:
      "围绕 ECharts、BizCharts 与地图集成能力，建设多维指标展示、联动分析和大屏可视化页面。重点在于信息表达效率、交互清晰度以及展示性能。",
  },
  "micro-frontend-workspace": {
    title: "微前端工作台",
    summary: "服务多团队协作的微前端实践，优化业务拆分和独立发布效率。",
    description:
      "在复杂业务线协作场景下，通过微前端思想拆分应用边界，降低耦合度并提升团队并行开发效率，同时尽量保持产品体验统一。",
  },
  "low-code-builder": {
    title: "低代码搭建平台",
    summary: "围绕页面编排、组件配置和渲染引擎的低代码平台实践。",
    description:
      "参与低代码平台前端能力建设，关注配置化表达、组件扩展能力、拖拽体验和渲染性能，帮助业务更快搭建页面和活动场景。",
  },
  "build-performance-tooling": {
    title: "工程化与构建优化",
    summary: "围绕 Webpack、Vite 和开发流程提效的工程实践。",
    description:
      "针对大型项目的构建时间、开发体验和性能问题进行持续优化，包括依赖分析、包体积治理、缓存策略、脚手架整理与团队规范沉淀。",
  },
  "node-api-collab": {
    title: "Node 接口与部署协作",
    summary: "使用 Express / Koa 参与接口开发、联调与基础部署支持。",
    description:
      "除前端开发外，也能承担基础 Node.js 接口开发和联调工作，配合 Linux 环境完成简单部署与排查，提升项目推进的完整性。",
  },
};

const projectTextEn: ProjectText = {
  cookieai: {
    title: "Cookie AI",
    summary: "An AI demo project focused on conversations, productivity, and personal AI-assisted coding practice.",
    description:
      "This project showcases how LLM capabilities can be integrated into practical workflows, including chat interactions, content generation, problem solving, and rapid iteration with AI-assisted development tools.",
  },
  "enterprise-dashboard": {
    title: "Enterprise Dashboard",
    summary: "A large-scale admin system built with the Vue ecosystem for complex business workflows.",
    description:
      "Focused on reusable components, state management, access control, and complex page interactions in enterprise environments. The work emphasized maintainability, delivery efficiency, and strong UI fidelity.",
  },
  "mini-program-commerce": {
    title: "Cross-platform Commerce",
    summary: "A business project delivered across Web, H5, and WeChat Mini Program.",
    description:
      "Built for multi-platform consistency with careful handling of shared components, responsive behavior, and interaction fidelity across different clients and devices.",
  },
  "data-visualization-platform": {
    title: "Data Visualization Platform",
    summary: "Dashboards and data screens powered by charts and map integrations.",
    description:
      "Built with charting and map tooling to support multi-dimensional metrics, linked interactions, and large-screen presentations, with a strong focus on clarity and performance.",
  },
  "micro-frontend-workspace": {
    title: "Micro-frontend Workspace",
    summary: "A micro-frontend practice for multi-team collaboration and independent delivery.",
    description:
      "Explored micro-frontend architecture to reduce coupling, improve team autonomy, and support independent deployment while preserving a coherent product experience.",
  },
  "low-code-builder": {
    title: "Low-code Builder",
    summary: "A low-code platform for page orchestration, component configuration, and rendering.",
    description:
      "Worked on low-code frontend capabilities around schema-driven rendering, drag-and-drop editing, extensible components, and performance-sensitive page generation.",
  },
  "build-performance-tooling": {
    title: "Build & Performance Tooling",
    summary: "Engineering work around Webpack, Vite, and developer experience optimization.",
    description:
      "Improved build speed, local development experience, bundle size, and team-wide engineering workflows through tooling, analysis, and reusable standards.",
  },
  "node-api-collab": {
    title: "Node API Collaboration",
    summary: "API development, integration, and basic deployment support with Node.js.",
    description:
      "Handled lightweight API work with Express and Koa, supported frontend-backend integration, and contributed to basic Linux deployment and troubleshooting workflows.",
  },
};

const aboutContentByLocale = {
  zh: {
    experiences: [
      {
        role: "大型前端项目开发",
        company: "Vue / React 企业项目",
        period: "持续实践",
        description:
          "熟练掌握 Vue、React 函数式组件与 Hooks，能在复杂业务场景中完成模块拆分、状态管理、组件沉淀与大型项目交付。",
        icon: "🚀",
        gradient: "from-indigo-500 to-purple-600",
      },
      {
        role: "多端业务适配",
        company: "Web / H5 / 微信小程序",
        period: "持续实践",
        description:
          "拥有丰富的 Web 端、H5、微信小程序开发经验，能高效处理不同终端下的布局、交互与兼容性问题。",
        icon: "📱",
        gradient: "from-emerald-500 to-teal-600",
      },
      {
        role: "工程化与效率建设",
        company: "Webpack / Vite / AI 工具链",
        period: "持续实践",
        description:
          "熟练配置现代化构建工具，关注开发体验和项目性能；同时积极使用 AI 辅助编程工具提升研发效率，Cursor 为重度使用者。",
        icon: "⚙️",
        gradient: "from-pink-500 to-rose-600",
      },
    ] satisfies ExperienceItem[],
    educations: [
      {
        degree: "技术探索与持续学习",
        school: "个人项目 + 新技术实践",
        period: "长期进行中",
        icon: "📚",
        gradient: "from-amber-500 to-orange-600",
      },
    ] satisfies EducationItem[],
    services: [
      {
        icon: "🖥️",
        title: "前端项目开发",
        description: "面向 Vue、React 和复杂业务系统进行高质量开发与重构落地。",
        gradient: "from-blue-500 to-indigo-600",
      },
      {
        icon: "🎯",
        title: "多端与体验优化",
        description: "处理 Web、H5、小程序适配，提升设计还原度、交互质量和用户体验。",
        gradient: "from-fuchsia-500 to-pink-600",
      },
      {
        icon: "🤖",
        title: "工程化与 AI 增效",
        description: "结合构建优化、组件沉淀和 AI 辅助开发，提升团队开发效率与稳定性。",
        gradient: "from-cyan-500 to-sky-600",
      },
    ] satisfies ServiceItem[],
  },
  en: {
    experiences: [
      {
        role: "Large-scale Frontend Delivery",
        company: "Vue / React enterprise projects",
        period: "Ongoing",
        description:
          "Experienced with Vue, React functional components, and Hooks for complex business applications, modular delivery, state management, and scalable frontend systems.",
        icon: "🚀",
        gradient: "from-indigo-500 to-purple-600",
      },
      {
        role: "Cross-platform Product Work",
        company: "Web / H5 / WeChat Mini Program",
        period: "Ongoing",
        description:
          "Strong hands-on experience across Web, H5, and mini program projects, with a focus on layout adaptation, interaction consistency, and compatibility handling.",
        icon: "📱",
        gradient: "from-emerald-500 to-teal-600",
      },
      {
        role: "Engineering & Productivity",
        company: "Webpack / Vite / AI tooling",
        period: "Ongoing",
        description:
          "Comfortable with modern build tooling, performance optimization, and developer experience improvements. Heavy Cursor user with active AI-assisted coding workflows.",
        icon: "⚙️",
        gradient: "from-pink-500 to-rose-600",
      },
    ] satisfies ExperienceItem[],
    educations: [
      {
        degree: "Continuous Learning",
        school: "Personal projects and hands-on exploration",
        period: "Always active",
        icon: "📚",
        gradient: "from-amber-500 to-orange-600",
      },
    ] satisfies EducationItem[],
    services: [
      {
        icon: "🖥️",
        title: "Frontend Delivery",
        description: "Build and improve Vue and React products for complex business use cases.",
        gradient: "from-blue-500 to-indigo-600",
      },
      {
        icon: "🎯",
        title: "Cross-platform UX",
        description: "Handle Web, H5, and mini program adaptation while keeping high UI fidelity and user experience quality.",
        gradient: "from-fuchsia-500 to-pink-600",
      },
      {
        icon: "🤖",
        title: "Engineering + AI",
        description: "Improve delivery efficiency through tooling, component systems, and AI-assisted development workflows.",
        gradient: "from-cyan-500 to-sky-600",
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
      "前端工程师，擅长 Vue、React 函数式组件与 Hooks，在大型项目、多端适配、构建优化、可视化、微前端、低代码和 AI 辅助开发方面有持续实践。",
    highlights: [
      "具备 Web、H5、微信小程序多端开发与适配经验",
      "熟练使用 Webpack、Vite，重视开发体验与性能优化",
      "擅长结合 AI 工具提升开发效率并推动个人项目快速迭代",
    ],
    skillGroups: [
      {
        label: "前端框架",
        items: ["Vue", "React", "Hooks", "Vue Router", "Redux"],
      },
      {
        label: "多端与 UI",
        items: ["Web", "H5", "微信小程序", "Ant Design", "Element UI", "Vant"],
      },
      {
        label: "工程与前沿实践",
        items: ["Webpack", "Vite", "ECharts", "BizCharts", "微前端", "低代码", "地图集成", "AI Coding"],
      },
      {
        label: "协作能力",
        items: ["Node.js", "Express", "Koa", "Linux", "接口联调", "部署支持"],
      },
    ],
  },
  en: {
    summary:
      "Frontend engineer with strong hands-on experience in Vue, React functional components, Hooks, cross-platform product work, build tooling, visualization, micro-frontends, low-code systems, and AI-assisted development.",
    highlights: [
      "Delivered across Web, H5, and WeChat Mini Program environments",
      "Experienced with Webpack and Vite for DX and performance optimization",
      "Actively uses AI tools to accelerate coding, iteration, and problem solving",
    ],
    skillGroups: [
      {
        label: "Frameworks",
        items: ["Vue", "React", "Hooks", "Vue Router", "Redux"],
      },
      {
        label: "Cross-platform & UI",
        items: ["Web", "H5", "WeChat Mini Program", "Ant Design", "Element UI", "Vant"],
      },
      {
        label: "Engineering & Advanced Topics",
        items: ["Webpack", "Vite", "ECharts", "BizCharts", "Micro-frontends", "Low-code", "Maps", "AI Coding"],
      },
      {
        label: "Collaboration",
        items: ["Node.js", "Express", "Koa", "Linux", "API Integration", "Deployment"],
      },
    ],
  },
};

const aboutIntroByLocale = {
  zh: "我是一名前端工程师，长期围绕 Vue、React、大型业务项目、多端适配和工程效率展开实践。除了页面开发，我也关注 UI 还原、性能优化、构建链路、可视化表达，以及如何把 AI 工具真正融入日常研发流程中。",
  en: "I am a frontend engineer focused on Vue, React, large business applications, cross-platform delivery, and engineering productivity. Beyond UI implementation, I care about fidelity, performance, tooling, visualization, and practical AI-assisted development workflows.",
} as const;

function buildProjects(locale: Locale): ProjectItem[] {
  const textMap = locale === "en" ? projectTextEn : projectTextZh;
  return projectBase.map((project) => ({
    ...project,
    tags: [...project.tags],
    highlights: project.highlights ? [...project.highlights] : undefined,
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
