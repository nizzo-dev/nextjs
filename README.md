# Pani

一个基于 Next.js 构建的现代化 Web 应用框架。

## 特性

- ⚡️ **Next.js 16** - 使用最新的 App Router 和 Server Components
- 🎨 **Tailwind CSS 4** - 现代化的样式解决方案
- 🔒 **TypeScript** - 完整的类型安全支持
- 🧩 **组件化** - 可复用的 UI 组件库
- 🎣 **自定义 Hooks** - 常用的 React Hooks
- 📦 **工具函数** - 实用的工具函数集合
- 🌙 **深色模式** - 内置深色模式支持

## 项目结构

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API 路由
│   ├── about/             # 关于页面
│   ├── contact/           # 联系页面
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 首页
├── components/             # React 组件
│   ├── layout/            # 布局组件
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   └── main-layout.tsx
│   └── ui/                # UI 组件
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       └── container.tsx
├── hooks/                  # 自定义 Hooks
│   ├── use-debounce.ts
│   ├── use-local-storage.ts
│   └── use-media-query.ts
├── lib/                    # 工具库
│   ├── api.ts             # API 客户端
│   ├── constants.ts       # 常量配置
│   ├── utils.ts           # 工具函数
│   └── validations.ts     # 验证函数
└── types/                  # TypeScript 类型定义
    └── index.ts
```

## 开始使用

### 安装依赖

```bash
npm install
```

### 开发

```bash
npm run dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建

```bash
npm run build
```

### 启动生产服务器

```bash
npm start
```

## 组件使用示例

### Button

```tsx
import { Button } from "@/components/ui";

<Button variant="default" size="md">点击我</Button>
<Button variant="outline" isLoading={true}>加载中</Button>
```

### Card

```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";

<Card>
  <CardHeader>
    <CardTitle>标题</CardTitle>
  </CardHeader>
  <CardContent>
    内容
  </CardContent>
</Card>
```

### Input

```tsx
import { Input } from "@/components/ui";

<Input type="email" placeholder="请输入邮箱" />
```

## Hooks 使用示例

### useDebounce

```tsx
import { useDebounce } from "@/hooks";

const [search, setSearch] = useState("");
const debouncedSearch = useDebounce(search, 500);
```

### useLocalStorage

```tsx
import { useLocalStorage } from "@/hooks";

const [value, setValue] = useLocalStorage("key", "default");
```

### useMediaQuery

```tsx
import { useMediaQuery } from "@/hooks";

const isMobile = useMediaQuery("(max-width: 768px)");
```

## 环境变量

复制 `.env.example` 到 `.env.local` 并配置你的环境变量：

```env
NEXT_PUBLIC_API_URL=/api
```

## 技术栈

- [Next.js](https://nextjs.org/) - React 框架
- [React](https://react.dev/) - UI 库
- [TypeScript](https://www.typescriptlang.org/) - 类型系统
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [ESLint](https://eslint.org/) - 代码检查

## 许可证

MIT
