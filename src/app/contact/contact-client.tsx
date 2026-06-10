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
  const [intent, setIntent] = useState<string>(text.intentOptions[0]?.value ?? "");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const contactInfo = [
    {
      icon: "E",
      label: text.emailLabel,
      value: text.emailValue,
      href: `mailto:${PERSONAL_INFO.email}`,
    },
    {
      icon: "G",
      label: text.githubLabel,
      value: PERSONAL_INFO.handle,
      href: PERSONAL_INFO.github,
    },
    {
      icon: "A",
      label: text.cookieAiLabel,
      value: "cookieai.xhbspace.cn",
      href: PERSONAL_INFO.website,
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = [
      `${text.mailBodyIntent}: ${intent}`,
      `${text.mailBodyName}: ${formData.name}`,
      `${text.mailBodyEmail}: ${formData.email}`,
      "",
      formData.message,
    ].join("\n");

    const subject = intent ? `[${intent}] ${formData.subject}` : formData.subject;
    const mailto = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Container className="py-12 md:py-16">
      <div className="space-y-20">
        <PageHero>
          <div className="relative grid gap-8 md:grid-cols-[1fr_0.55fr] md:items-end">
            <div className="space-y-4">
              <p className="page-hero-kicker font-mono text-xs tracking-[0.2em] text-blue-600 dark:text-blue-300">
                {text.channelsTitle}
              </p>
              <h1 className="page-hero-title text-4xl font-bold tracking-tight md:text-6xl">
                {text.title}
                <span className="text-blue-600 dark:text-blue-300"> {text.titleAccent}</span>
              </h1>
              <p className="page-hero-subtitle max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                {text.subtitle}
              </p>
            </div>
            <div className="page-hero-visual hidden rounded-2xl bg-slate-950 p-6 text-white shadow-2xl shadow-blue-950/20 md:block">
              <p className="font-mono text-sm text-blue-200">{PERSONAL_INFO.email}</p>
              <p className="mt-4 text-sm leading-relaxed text-blue-50/70">
                {text.subtitle}
              </p>
            </div>
          </div>
        </PageHero>

        <ScrollReveal>
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">{text.channelsTitle}</h2>
              <Card className="p-5">
                <h3 className="font-semibold">{text.expectationTitle}</h3>
                <ul className="mt-4 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                  {text.expectationItems.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
              <StaggerChildren className="space-y-4">
                {contactInfo.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 rounded-2xl border border-blue-200/70 bg-white/85 p-4 shadow-sm shadow-blue-950/5 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-blue-400 dark:border-blue-400/20 dark:bg-slate-950/70"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-sm font-bold text-white shadow-lg shadow-blue-600/20">
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

            <Card className="overflow-hidden p-0 lg:col-span-2">
              <div className="p-8">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white">
                    M
                  </div>
                  <h2 className="text-xl font-semibold">{text.formTitle}</h2>
                </div>

                {submitted ? (
                  <div className="rounded-xl border border-blue-200 bg-blue-50 p-6 text-sm text-blue-800 dark:border-blue-400/20 dark:bg-blue-950/40 dark:text-blue-100">
                    {text.successMessage}{" "}
                    <a href={`mailto:${PERSONAL_INFO.email}`} className="font-medium underline">
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium">{text.intentTitle}</label>
                        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{text.intentHelper}</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {text.intentOptions.map((option) => {
                          const isActive = intent === option.value;
                          return (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => setIntent(option.value)}
                              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                                isActive
                                  ? "border-blue-600 bg-blue-600 text-white"
                                  : "border-blue-200 bg-white/70 text-blue-700 hover:border-blue-400 dark:border-blue-400/20 dark:bg-slate-950/70 dark:text-blue-200"
                              }`}
                            >
                              {option.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
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
                        className="flex w-full resize-none rounded-xl border border-slate-200 bg-white/85 px-4 py-3 text-base placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:border-white/10 dark:bg-slate-950/70"
                        placeholder={text.messagePlaceholder}
                        required
                      />
                    </div>
                    <Button type="submit" size="lg">
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
