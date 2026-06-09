# Pipi · 个人作品集

基于 Next.js 16 构建的个人简介与项目展示站点，聚焦 Vue / React 双栈、多端交付、数据可视化与 AI 工程化实践。

在线演示：配置 `NEXT_PUBLIC_SITE_URL` 后部署至 Vercel 即可访问。

## 功能

- 首页叙事：主打案例（Cookie AI）+ 项目经验 + 精选作品
- 项目作品：分类筛选、详情页、Demo / 源码链接
- 在线简历：支持打印导出 PDF
- 联系页面：邮件客户端直达（mailto）
- 中英文切换、深色模式、响应式导航
- GSAP 滚动动画（移动端自动降级）
- SEO：sitemap、robots、Open Graph、JSON-LD

## 技术栈

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS 4
- GSAP + ScrollTrigger
- 内容层：`src/lib/content.ts`（可迁移至 MDX）

## 本地开发

```bash
npm install
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000)

## 环境变量

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## 构建

```bash
npm run build
npm start
```

## 项目结构

```
src/
├── app/                 # 页面与 API 路由
├── components/
│   ├── animations/      # GSAP 动画组件
│   ├── layout/          # Header、Footer、导航
│   ├── sections/        # 页面区块（案例、CTA）
│   └── ui/              # 基础 UI 组件
├── lib/
│   ├── content.ts       # 站点内容数据
│   ├── constants.ts     # 个人信息与配置
│   └── seo.ts           # SEO 工具
└── hooks/
```

## 自定义内容

编辑 `src/lib/constants.ts` 中的个人信息，以及 `src/lib/content.ts` 中的项目与文案。

## License

MIT
