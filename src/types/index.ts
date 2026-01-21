/**
 * 全局类型定义
 */

// 通用响应类型
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// 分页类型
export interface PaginationParams {
  page?: number;
  pageSize?: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// 用户类型（示例）
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

// 登录请求类型
export interface LoginRequest {
  email: string;
  password: string;
}

// 登录响应类型
export interface LoginResponse {
  user: User;
  token: string;
}

// 数据库用户类型（包含密码哈希）
export interface DbUser {
  id: string;
  name: string;
  email: string;
  password: string; // 存储的是哈希后的密码
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

