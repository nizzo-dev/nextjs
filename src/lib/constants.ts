/**
 * 应用常量配置
 */

export const APP_CONFIG = {
  name: "Nizzo · 前端工程师",
  description:
    "nizzo-dev 的个人作品集，聚焦 Vue / React 双栈、多端交付、数据可视化与 AI 工具落地。",
  version: "0.1.0",
} as const;

export const SITE_CONFIG = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ogImage: "/og-cover.svg",
} as const;

export const ROUTES = {
  home: "/",
  about: "/about",
  projects: "/projects",
  notes: "/notes",
  contact: "/contact",
  resume: "/resume",
  project: (slug: string) => `/projects/${slug}`,
  note: (slug: string) => `/notes/${slug}`,
} as const;

export const PERSONAL_INFO = {
  /** 站点展示名 */
  displayName: "Nizzo",
  /** GitHub / 技术社区用户名 */
  handle: "nizzo-dev",
  name: "Nizzo",
  title: "前端工程师",
  tagline: "Vue / React 双栈 · 多端交付 · AI 工程化",
  bio: "擅长企业级后台、复杂业务拆解与工程化建设；在 Cookie AI 等项目中持续探索 AI 辅助研发提效。",
  email: "2066869033@qq.com",
  github: "https://github.com/nizzo-dev",
  website: "https://cookieai.xhbspace.cn",
  twitter: "",
  linkedin: "",
} as const;

export const API_ENDPOINTS = {} as const;
