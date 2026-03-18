/**
 * 应用常量配置
 */

export const APP_CONFIG = {
  name: "pipi596888",
  description: "个人作品集，聚焦 Vue、React、多端开发、工程化与 AI 实践。",
  version: "0.1.0",
} as const;

export const ROUTES = {
  home: "/",
  about: "/about",
  projects: "/projects",
  contact: "/contact",
  login: "/login",
  resume: "/resume",
  project: (slug: string) => `/projects/${slug}`,
} as const;

export const PERSONAL_INFO = {
  name: "pipi596888",
  title: "前端工程师",
  bio: "熟练掌握 Vue、React、Web/H5/微信小程序开发，关注工程化、可视化、AI 辅助开发与用户体验。",
  email: "2066869033@qq.com",
  github: "https://github.com/pipi596888/",
  website: "https://cookieai.xhbspace.cn",
  twitter: "",
  linkedin: "",
} as const;

export const API_ENDPOINTS = {
  // users: "/api/users",
  // posts: "/api/posts",
} as const;
