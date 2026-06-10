import { defaultLocale, type Locale } from "@/lib/locale";

export const personalProfileByLocale = {
  zh: {
    title: "前端工程师",
    tagline: "Vue / React 双栈 · 多端交付 · AI 工程化",
    bio: "擅长企业级后台、复杂业务拆解与工程化建设；在 Cookie AI 等项目中持续探索 AI 辅助研发提效。",
  },
  en: {
    title: "Frontend Engineer",
    tagline: "Vue / React · Cross-platform · AI Engineering",
    bio: "Focused on enterprise dashboards, complex business systems, and engineering excellence, with hands-on AI-assisted development through projects like Cookie AI.",
  },
} as const;

export const appConfigByLocale = {
  zh: {
    name: "Pipi · 前端工程师",
    description:
      "pipi596888 的个人作品集，聚焦 Vue / React 双栈、多端交付、数据可视化与 AI 工具落地。",
  },
  en: {
    name: "Pipi · Frontend Engineer",
    description:
      "Portfolio of pipi596888, focused on Vue/React dual-stack, cross-platform delivery, data visualization, and AI tooling.",
  },
} as const;

export const footerTextByLocale = {
  zh: {
    navTitle: "导航",
    linksTitle: "链接",
    ctaTitle: "合作咨询",
    sendEmail: "发送邮件",
    expertise: "Vue / React · 多端 · 可视化 · AI 工程化",
    emailLink: "Email",
  },
  en: {
    navTitle: "Navigation",
    linksTitle: "Links",
    ctaTitle: "Work With Me",
    sendEmail: "Send Email",
    expertise: "Vue / React · Cross-platform · Visualization · AI",
    emailLink: "Email",
  },
} as const;

export const commonTextByLocale = {
  zh: {
    resumeAction: "查看简历",
    emptyProjects: "该分类下暂无项目",
    notFoundTitle: "页面未找到",
    notFoundDesc: "抱歉，您访问的页面不存在",
    backHome: "返回首页",
    errorTitle: "出错了",
    errorFallback: "发生了意外错误",
    errorRetry: "重试",
    projectNotFound: "项目未找到",
    loading: "加载中...",
    themeToLight: "切换到浅色模式",
    themeToDark: "切换到深色模式",
    menuOpen: "打开菜单",
    menuClose: "关闭菜单",
  },
  en: {
    resumeAction: "View Resume",
    emptyProjects: "No projects in this category",
    notFoundTitle: "Page Not Found",
    notFoundDesc: "Sorry, the page you are looking for does not exist.",
    backHome: "Back to Home",
    errorTitle: "Something went wrong",
    errorFallback: "An unexpected error occurred",
    errorRetry: "Try Again",
    projectNotFound: "Project Not Found",
    loading: "Loading...",
    themeToLight: "Switch to light mode",
    themeToDark: "Switch to dark mode",
    menuOpen: "Open menu",
    menuClose: "Close menu",
  },
} as const;

export const pageMetaByLocale = {
  zh: {
    home: { title: "首页", description: (name: string, tagline: string, bio: string) => `${name} - ${tagline}。${bio}` },
    about: { title: "关于我", description: (name: string) => `了解 ${name} 的前端开发经历、技术方向与合作价值。` },
    projects: { title: "项目作品", description: "AI、企业前端、多端交付、可视化与工程化方向的项目实践。" },
    resume: { title: "简历", description: (name: string) => `${name} 的在线简历 - 前端工程师，Vue / React 双栈。` },
  },
  en: {
    home: { title: "Home", description: (name: string, tagline: string, bio: string) => `${name} - ${tagline}. ${bio}` },
    about: { title: "About", description: (name: string) => `Learn about ${name}'s frontend experience, skills, and collaboration value.` },
    projects: { title: "Projects", description: "Work across AI, enterprise frontend, cross-platform delivery, visualization, and engineering." },
    resume: { title: "Resume", description: (name: string) => `${name}'s online resume - Frontend Engineer, Vue / React dual-stack.` },
  },
} as const;

type ProjectMeta = { role: string; highlights: string[]; tags: string[] };

export const projectMetaZh: Record<string, ProjectMeta> = {
  cookieai: {
    role: "独立设计与开发",
    highlights: ["多轮对话与 AI 工作流整合", "面向真实使用场景的效率工具设计", "持续结合 AI 编程实践快速迭代"],
    tags: ["React", "AI", "Prompt Engineering", "Workflow"],
  },
  "enterprise-dashboard": {
    role: "前端负责人",
    highlights: ["负责大型后台项目模块拆分与组件复用", "推动复杂表单、列表和权限体系稳定落地", "注重性能优化和业务迭代效率"],
    tags: ["Vue", "Element UI", "Redux", "权限系统"],
  },
  "mini-program-commerce": {
    role: "核心开发",
    highlights: ["同时兼顾 Web 端、H5 与小程序体验", "处理多终端 UI 还原与交互一致性问题", "沉淀跨端适配与组件封装方案"],
    tags: ["H5", "微信小程序", "Vant", "多端适配"],
  },
  "data-visualization-platform": {
    role: "可视化前端",
    highlights: ["建设多图表联动与地图可视化能力", "强调数据表达清晰度与交互体验", "支持大屏展示与业务决策场景"],
    tags: ["ECharts", "BizCharts", "地图", "大屏"],
  },
  "micro-frontend-workspace": {
    role: "架构参与",
    highlights: ["探索多团队并行开发下的前端边界管理", "提升应用拆分、发布和联调效率", "兼顾业务隔离与整体体验一致性"],
    tags: ["微前端", "React", "Vue", "模块治理"],
  },
  "low-code-builder": {
    role: "前端开发",
    highlights: ["参与低代码页面编排和组件配置能力建设", "关注可扩展性、配置表达和渲染性能", "提升业务页面生成效率"],
    tags: ["低代码", "React", "Schema", "拖拽"],
  },
  "build-performance-tooling": {
    role: "工程化建设",
    highlights: ["优化本地开发体验与构建效率", "分析包体积、首屏和缓存策略", "推动工程脚手架和规范统一"],
    tags: ["Webpack", "Vite", "构建优化", "性能分析"],
  },
  "node-api-collab": {
    role: "前后端联调",
    highlights: ["可承担基础接口开发与联调工作", "熟悉部署流程和 Linux 环境基础操作", "帮助前端交付更闭环地推进"],
    tags: ["Node.js", "Express", "Koa", "Linux"],
  },
  "tts-voice-platform": {
    role: "独立设计与开发",
    highlights: [
      "单角色 / 多角色文本转语音，支持情绪与多格式导出",
      "音色管理、声音克隆与作品全流程管理",
      "用户反馈与管理员后台（权限、日志、资源监控）",
    ],
    tags: ["Vue 3", "TypeScript", "Element Plus", "TTS", "Pinia"],
  },
  "device-upgrade-platform": {
    role: "前端核心开发",
    highlights: [
      "路由、菜单、按钮三层权限与后端动态菜单合并",
      "PageProTable 统一表格 + 分片上传与下载任务进度",
      "样本、工单、设备台账、升级包等模块完整联调交付",
    ],
    tags: ["React 19", "Vite", "Ant Design", "Zustand", "ProTable"],
  },
};

export const projectMetaEn: Record<string, ProjectMeta> = {
  cookieai: {
    role: "Solo Design & Development",
    highlights: [
      "Integrated multi-turn chat with AI workflows",
      "Productivity tools designed for real-world usage",
      "Rapid iteration with AI-assisted coding practices",
    ],
    tags: ["React", "AI", "Prompt Engineering", "Workflow"],
  },
  "enterprise-dashboard": {
    role: "Frontend Lead",
    highlights: [
      "Modularized large admin systems with reusable components",
      "Delivered complex forms, lists, and permission systems",
      "Focused on performance and delivery efficiency",
    ],
    tags: ["Vue", "Element UI", "Redux", "Access Control"],
  },
  "mini-program-commerce": {
    role: "Core Developer",
    highlights: [
      "Delivered consistent UX across Web, H5, and mini programs",
      "Resolved cross-terminal UI and interaction differences",
      "Built reusable cross-platform adaptation patterns",
    ],
    tags: ["H5", "WeChat Mini Program", "Vant", "Cross-platform"],
  },
  "data-visualization-platform": {
    role: "Visualization Frontend",
    highlights: [
      "Built linked charts and map-based visualization",
      "Prioritized clarity of data storytelling and interaction",
      "Supported large-screen dashboards for business decisions",
    ],
    tags: ["ECharts", "BizCharts", "Maps", "Dashboards"],
  },
  "micro-frontend-workspace": {
    role: "Architecture Contributor",
    highlights: [
      "Managed frontend boundaries for multi-team collaboration",
      "Improved app splitting, release, and integration efficiency",
      "Balanced team autonomy with unified product experience",
    ],
    tags: ["Micro-frontends", "React", "Vue", "Module Governance"],
  },
  "low-code-builder": {
    role: "Frontend Developer",
    highlights: [
      "Built page orchestration and component configuration features",
      "Focused on extensibility, schema design, and render performance",
      "Accelerated business page creation workflows",
    ],
    tags: ["Low-code", "React", "Schema", "Drag & Drop"],
  },
  "build-performance-tooling": {
    role: "Engineering",
    highlights: [
      "Improved local dev experience and build performance",
      "Analyzed bundle size, first paint, and caching strategies",
      "Standardized scaffolding and team conventions",
    ],
    tags: ["Webpack", "Vite", "Build Optimization", "Performance"],
  },
  "node-api-collab": {
    role: "Full-stack Collaboration",
    highlights: [
      "Handled basic API development and integration",
      "Supported deployment and troubleshooting on Linux",
      "Helped close the loop between frontend delivery and backend",
    ],
    tags: ["Node.js", "Express", "Koa", "Linux"],
  },
  "tts-voice-platform": {
    role: "Solo Design & Development",
    highlights: [
      "Single- and multi-role TTS with emotions and multi-format export",
      "Voice management, cloning, and full project lifecycle",
      "User feedback plus admin console for roles, logs, and monitoring",
    ],
    tags: ["Vue 3", "TypeScript", "Element Plus", "TTS", "Pinia"],
  },
  "device-upgrade-platform": {
    role: "Core Frontend Developer",
    highlights: [
      "Three-layer access control with backend-driven dynamic menus",
      "Shared PageProTable, chunked uploads, and download task progress",
      "End-to-end delivery across samples, tickets, devices, and upgrades",
    ],
    tags: ["React 19", "Vite", "Ant Design", "Zustand", "ProTable"],
  },
};

function pick<T extends Record<Locale, unknown>>(map: T, locale: Locale): T[Locale] {
  return (map[locale] ?? map[defaultLocale]) as T[Locale];
}

export function getPersonalProfile(locale: Locale) {
  return pick(personalProfileByLocale, locale);
}

export function getAppConfigText(locale: Locale) {
  return pick(appConfigByLocale, locale);
}

export function getFooterText(locale: Locale) {
  return pick(footerTextByLocale, locale);
}

export function getCommonText(locale: Locale) {
  return pick(commonTextByLocale, locale);
}

export function getPageMetaText(locale: Locale) {
  return pick(pageMetaByLocale, locale);
}

export function getProjectMetaMap(locale: Locale) {
  return locale === "en" ? projectMetaEn : projectMetaZh;
}
