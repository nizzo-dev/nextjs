# 数据库连接指南

Next.js 完全支持在服务器端直接连接数据库。你可以在 **API Routes** 和 **Server Components** 中使用数据库。

## 📚 支持的数据库

### 1. PostgreSQL (推荐用于生产环境)

**安装依赖：**
```bash
npm install pg @types/pg
```

**配置环境变量 (.env.local)：**
```env
DATABASE_URL=postgresql://username:password@localhost:5432/pani
```

**使用方式：**
在 `src/lib/db.ts` 中取消注释 PostgreSQL 部分的代码，并注释掉内存数据库部分。

**示例查询：**
```typescript
import { query } from '@/lib/db';

// 查询用户
const users = await query('SELECT * FROM users WHERE email = $1', [email]);

// 插入数据
await query(
  'INSERT INTO users (email, name, password) VALUES ($1, $2, $3)',
  [email, name, hashedPassword]
);
```

---

### 2. MySQL

**安装依赖：**
```bash
npm install mysql2
```

**配置环境变量 (.env.local)：**
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=pani
```

**使用方式：**
在 `src/lib/db.ts` 中取消注释 MySQL 部分的代码。

**示例查询：**
```typescript
import { query } from '@/lib/db';

const users = await query('SELECT * FROM users WHERE email = ?', [email]);
```

---

### 3. MongoDB

**安装依赖：**
```bash
npm install mongoose
```

**配置环境变量 (.env.local)：**
```env
MONGODB_URI=mongodb://localhost:27017/pani
```

**使用方式：**
在 `src/lib/db.ts` 中取消注释 MongoDB 部分的代码。

**示例查询：**
```typescript
import connectDB from '@/lib/db';
import { User } from '@/models/User'; // 需要创建 Mongoose 模型

await connectDB();
const user = await User.findOne({ email });
```

---

### 4. SQLite (适合开发和测试)

**安装依赖：**
```bash
npm install better-sqlite3 @types/better-sqlite3
```

**配置环境变量 (.env.local)：**
```env
DB_PATH=./data/pani.db
```

**使用方式：**
在 `src/lib/db.ts` 中取消注释 SQLite 部分的代码。

**示例查询：**
```typescript
import { query, run } from '@/lib/db';

const users = await query('SELECT * FROM users WHERE email = ?', [email]);
await run('INSERT INTO users (email, name) VALUES (?, ?)', [email, name]);
```

---

## 🔐 密码加密

在生产环境中，**必须**使用 bcrypt 加密密码：

**安装依赖：**
```bash
npm install bcryptjs @types/bcryptjs
```

**加密密码：**
```typescript
import bcrypt from 'bcryptjs';

const hashedPassword = await bcrypt.hash(password, 10);
```

**验证密码：**
```typescript
import bcrypt from 'bcryptjs';

const isValid = await bcrypt.compare(password, dbUser.password);
```

---

## 🔑 JWT Token 生成

**安装依赖：**
```bash
npm install jsonwebtoken @types/jsonwebtoken
```

**生成 Token：**
```typescript
import jwt from 'jsonwebtoken';

const token = jwt.sign(
  { userId: user.id, email: user.email },
  process.env.JWT_SECRET!,
  { expiresIn: '7d' }
);
```

**验证 Token：**
```typescript
import jwt from 'jsonwebtoken';

const decoded = jwt.verify(token, process.env.JWT_SECRET!);
```

---

## 📝 使用示例

### 在 API Route 中使用

```typescript
// src/app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { findUserByEmail } from '@/lib/db';

export async function GET(request: NextRequest) {
  const email = request.nextUrl.searchParams.get('email');
  
  if (!email) {
    return NextResponse.json({ error: 'Email required' }, { status: 400 });
  }
  
  const user = await findUserByEmail(email);
  
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
  
  return NextResponse.json({ user });
}
```

### 在 Server Component 中使用

```typescript
// src/app/users/page.tsx
import { query } from '@/lib/db';

export default async function UsersPage() {
  const users = await query('SELECT * FROM users LIMIT 10');
  
  return (
    <div>
      {users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
```

---

## ⚠️ 重要注意事项

1. **连接池管理**：在生产环境中，使用连接池来管理数据库连接
2. **环境变量**：永远不要在代码中硬编码数据库凭据，使用环境变量
3. **SQL 注入**：始终使用参数化查询，不要拼接 SQL 字符串
4. **错误处理**：妥善处理数据库错误，不要暴露敏感信息
5. **连接缓存**：在 Next.js 中，使用全局变量缓存数据库连接（避免重复连接）

---

## 🚀 当前实现

当前项目使用**内存数据库**进行演示。要切换到真实数据库：

1. 选择你的数据库类型
2. 安装相应的依赖包
3. 在 `src/lib/db.ts` 中取消注释对应的数据库代码
4. 注释掉内存数据库部分
5. 配置环境变量
6. 更新查询函数以匹配你的数据库语法

