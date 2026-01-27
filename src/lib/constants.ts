/**
 * 应用常量配置
 */

export const APP_CONFIG = {
  name: "Pani",
  description: "个人作品集 - 全栈开发者",
  version: "0.1.0",
} as const;

export const ROUTES = {
  home: "/",
  about: "/about",
  projects: "/projects",
  contact: "/contact",
  login: "/login",
} as const;

export const PERSONAL_INFO = {
  name: "Pani",
  title: "全栈开发者",
  bio: "热爱编程，专注于构建高质量的 Web 应用。擅长 React、Next.js、Node.js 等技术栈。",
  email: "hello@example.com",
  github: "https://github.com",
  twitter: "https://twitter.com",
  linkedin: "https://linkedin.com",
} as const;

export const API_ENDPOINTS = {
  // 示例 API 端点
  // users: "/api/users",
  // posts: "/api/posts",
} as const;

