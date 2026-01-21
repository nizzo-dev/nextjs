/**
 * 数据库连接工具
 * 
 * Next.js 支持在服务器端直接连接数据库
 * 可以在 API Routes 和 Server Components 中使用
 * 
 * 支持的数据库：
 * - PostgreSQL (使用 pg)
 * - MySQL (使用 mysql2)
 * - MongoDB (使用 mongoose)
 * - SQLite (使用 better-sqlite3)
 */

// ============================================
// PostgreSQL 示例 (推荐用于生产环境)
// ============================================
// 安装: npm install pg @types/pg
/*
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

export async function query<T = unknown>(text: string, params?: unknown[]): Promise<T[]> {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  console.log('Executed query', { text, duration, rows: res.rowCount });
  return res.rows as T[];
}

export const db = pool;
*/

// ============================================
// MySQL 示例
// ============================================
// 安装: npm install mysql2
/*
import mysql from 'mysql2/promise';

let pool: mysql.Pool | null = null;

export function getPool(): mysql.Pool {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306'),
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'pani',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }
  return pool;
}

export async function query<T = unknown>(sql: string, params?: unknown[]): Promise<T[]> {
  const connection = await getPool().getConnection();
  try {
    const [rows] = await connection.execute(sql, params);
    return rows as T[];
  } finally {
    connection.release();
  }
}

export const db = getPool();
*/

// ============================================
// MongoDB 示例
// ============================================
// 安装: npm install mongoose
/*
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/pani';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
*/

// ============================================
// SQLite 示例 (适合开发和测试)
// ============================================
// 安装: npm install better-sqlite3 @types/better-sqlite3
/*
import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const dbPath = process.env.DB_PATH || path.join(process.cwd(), 'data', 'pani.db');

// 确保数据目录存在
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new Database(dbPath);

// 启用外键约束
db.pragma('foreign_keys = ON');

export function query<T = unknown>(sql: string, params?: unknown[]): T[] {
  const stmt = db.prepare(sql);
  if (params) {
    return stmt.all(...params) as T[];
  }
  return stmt.all() as T[];
}

export function run(sql: string, params?: unknown[]): { changes: number; lastInsertRowid: number } {
  const stmt = db.prepare(sql);
  if (params) {
    return stmt.run(...params) as { changes: number; lastInsertRowid: number };
  }
  return stmt.run() as { changes: number; lastInsertRowid: number };
}

export { db };
*/

// ============================================
// 通用数据库接口 (适配器模式)
// ============================================
// 这个接口可以让你在不同数据库之间切换

export interface DatabaseAdapter {
  query<T = unknown>(sql: string, params?: unknown[]): Promise<T[]>;
  close?(): Promise<void>;
}

// ============================================
// 当前实现：内存数据库 (用于演示)
// ============================================
// 在生产环境中，请替换为上面的真实数据库实现

class MemoryDatabase implements DatabaseAdapter {
  private data: Map<string, unknown[]> = new Map();

  async query<T = unknown>(sql: string, params?: unknown[]): Promise<T[]> {
    // 这是一个简化的内存数据库实现
    // 仅用于演示，实际项目中请使用真实数据库
    
    // 模拟查询延迟
    await new Promise(resolve => setTimeout(resolve, 10));
    
    // 解析 SQL 查询
    const sqlUpper = sql.toUpperCase().trim();
    
    // SELECT 查询
    if (sqlUpper.startsWith('SELECT')) {
      const tableMatch = sql.match(/FROM\s+(\w+)/i);
      if (!tableMatch) {
        return [];
      }
      
      const tableName = tableMatch[1].toLowerCase();
      const tableData = this.data.get(tableName) || [];
      
      // 简单的 WHERE 条件匹配
      if (sqlUpper.includes('WHERE')) {
        const whereMatch = sql.match(/WHERE\s+(\w+)\s*=\s*\?/i);
        if (whereMatch && params && params.length > 0) {
          const column = whereMatch[1];
          const value = params[0];
          return tableData.filter((item) => {
            const record = item as Record<string, unknown>;
            return record[column] === value;
          }) as T[];
        }
      }
      
      return tableData as T[];
    }
    
    return [];
  }

  async insert(table: string, data: Record<string, unknown>): Promise<void> {
    const tableData = this.data.get(table) || [];
    tableData.push({ ...data, id: String(tableData.length + 1) });
    this.data.set(table, tableData);
  }

  async findOne(table: string, condition: Record<string, unknown>): Promise<unknown | null> {
    const tableData = this.data.get(table) || [];
    return tableData.find((item) => {
      const record = item as Record<string, unknown>;
      return Object.keys(condition).every(key => record[key] === condition[key]);
    }) || null;
  }
}

// 导出数据库实例
// 在生产环境中，请替换为真实数据库连接
export const db = new MemoryDatabase();

// 初始化示例数据（仅用于演示）
if (typeof window === 'undefined') {
  // 只在服务器端执行
  // 注意：实际项目中密码应该使用 bcrypt 加密
  // 这里为了演示，使用明文密码 "123456"
  db.insert('users', {
    id: '1',
    email: 'demo@example.com',
    password: '123456', // 实际应该存储 bcrypt 哈希值
    name: '演示用户',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
}

// ============================================
// 数据库查询辅助函数
// ============================================

/**
 * 根据邮箱查找用户
 */
export async function findUserByEmail(email: string) {
  // 使用真实数据库时的示例：
  // return db.query<DbUser>('SELECT * FROM users WHERE email = ?', [email]);
  
  // 当前使用内存数据库
  return db.findOne('users', { email }) as Promise<import('@/types').DbUser | null>;
}

/**
 * 根据 ID 查找用户
 */
export async function findUserById(id: string) {
  // 使用真实数据库时的示例：
  // return db.query<DbUser>('SELECT * FROM users WHERE id = ?', [id]);
  
  return db.findOne('users', { id }) as Promise<import('@/types').DbUser | null>;
}

