"use client";

import { useState } from "react";
import { Button, Card, Container, Input } from "@/components/ui";
import { PageHero, ScrollReveal, StaggerChildren } from "@/components/animations";
import { PERSONAL_INFO } from "@/lib/constants";
import type { getContactContent } from "@/lib/content";

type ContactText = ReturnType<typeof getContactContent>;

interface ContactClientProps {
  text: ContactText;
}

export function ContactClient({ text }: ContactClientProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const contactInfo = [
    {
      icon: "📮",
      label: text.emailLabel,
      value: text.emailValue,
      href: `mailto:${PERSONAL_INFO.email}`,
      gradient: "from-blue-500 to-indigo-600",
    },
    {
      icon: "💻",
      label: text.githubLabel,
      value: PERSONAL_INFO.handle,
      href: PERSONAL_INFO.github,
      gradient: "from-gray-700 to-gray-900",
    },
    {
      icon: "🤖",
      label: text.cookieAiLabel,
      value: "cookieai.xhbspace.cn",
      href: PERSONAL_INFO.website,
      gradient: "from-indigo-500 to-violet-600",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = [
      `${text.mailBodyName}: ${formData.name}`,
      `${text.mailBodyEmail}: ${formData.email}`,
      "",
      formData.message,
    ].join("\n");

    const mailto = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Container className="py-12">
      <div className="space-y-16">
        <PageHero>
          <div className="relative space-y-4 text-center">
            <div className="absolute left-1/2 top-1/2 -z-10 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-3xl" />
            <h1 className="page-hero-title text-4xl font-bold md:text-5xl">
              {text.title}
              <span className="text-indigo-600 dark:text-indigo-400"> {text.titleAccent}</span>
            </h1>
            <p className="page-hero-subtitle mx-auto max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
              {text.subtitle}
            </p>
          </div>
        </PageHero>

        <ScrollReveal>
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">{text.channelsTitle}</h2>
              <StaggerChildren className="space-y-4">
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
              </StaggerChildren>
            </div>

            <Card className="overflow-hidden border-0 shadow-lg lg:col-span-2">
              <div className="p-8">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-xl text-white">
                    ✉️
                  </div>
                  <h2 className="text-xl font-semibold">{text.formTitle}</h2>
                </div>

                {submitted ? (
                  <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-6 text-sm text-indigo-800 dark:border-indigo-900 dark:bg-indigo-950 dark:text-indigo-200">
                    {text.successMessage}{" "}
                    <a href={`mailto:${PERSONAL_INFO.email}`} className="font-medium underline">
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">{text.nameLabel}</label>
                        <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder={text.namePlaceholder} required />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">{text.emailFieldLabel}</label>
                        <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder={text.emailPlaceholder} required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">{text.subjectLabel}</label>
                      <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} placeholder={text.subjectPlaceholder} required />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">{text.messageLabel}</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        className="flex w-full resize-none rounded-lg border border-zinc-200 bg-white px-4 py-3 text-base placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800"
                        placeholder={text.messagePlaceholder}
                        required
                      />
                    </div>
                    <Button type="submit" size="lg" className="border-0 bg-indigo-600 hover:bg-indigo-700">
                      {text.submitButton}
                    </Button>
                  </form>
                )}
              </div>
            </Card>
          </div>
        </ScrollReveal>
      </div>
    </Container>
  );
}
