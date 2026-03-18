"use client";

import { useState } from "react";
import { Button, Card, Container, Input } from "@/components/ui";
import { PERSONAL_INFO } from "@/lib/constants";

const contactInfo = [
  {
    icon: "📮",
    label: "邮箱",
    value: PERSONAL_INFO.email,
    href: `mailto:${PERSONAL_INFO.email}`,
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    icon: "💻",
    label: "GitHub",
    value: "github.com/pipi596888",
    href: PERSONAL_INFO.github,
    gradient: "from-gray-700 to-gray-900",
  },
  {
    icon: "🤖",
    label: "AI 项目演示",
    value: "cookieai.xhbspace.cn",
    href: PERSONAL_INFO.website,
    gradient: "from-fuchsia-500 to-violet-600",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    alert("消息已发送。你也可以直接通过邮箱或 GitHub 联系我。");
    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Container className="py-12">
      <div className="space-y-16">
        <div className="relative space-y-4 text-center">
          <div className="absolute left-1/2 top-1/2 -z-10 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
          <h1 className="text-4xl font-bold md:text-5xl">
            联系
            <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
              {" "}我
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            欢迎交流 Vue、React、多端项目、可视化、微前端、低代码、AI 辅助开发等相关话题。
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">联系方式</h2>
            <div className="space-y-4">
              {contactInfo.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition-colors hover:border-indigo-500 dark:border-zinc-700 dark:bg-zinc-800"
                >
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${item.gradient} text-2xl shadow-lg`}>
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">{item.label}</p>
                    <p className="font-medium">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <Card className="overflow-hidden border-0 shadow-lg lg:col-span-2">
            <div className="p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500">
                  <span className="text-xl">✉️</span>
                </div>
                <h2 className="text-xl font-semibold">发送消息</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium leading-none">
                      姓名
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="请输入你的姓名"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium leading-none">
                      邮箱
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium leading-none">
                    主题
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="请输入主题"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium leading-none">
                    消息
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="flex w-full resize-none rounded-lg border border-zinc-200 bg-white px-4 py-3 text-base placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800"
                    placeholder="请输入你想沟通的内容"
                    required
                  />
                </div>

                <Button type="submit" size="lg" className="w-full md:w-auto" isLoading={isSubmitting}>
                  发送消息
                </Button>
              </form>
            </div>
          </Card>
        </div>
      </div>
    </Container>
  );
}
