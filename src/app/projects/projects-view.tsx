"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Button, Card } from "@/components/ui";
import { ProjectCard } from "@/components/ui/project-card";
import { GradientCta } from "@/components/sections/gradient-cta";
import { ScrollReveal, StaggerChildren } from "@/components/animations";
import { ROUTES } from "@/lib/constants";
import type { CategoryItem, ProjectItem } from "@/lib/content";
import { cn } from "@/lib/utils";

interface ProjectsViewProps {
  categories: CategoryItem[];
  projects: ProjectItem[];
  emptyLabel: string;
  text: {
    featuredTitle: string;
    otherTitle: string;
    detailButton: string;
    ctaTitle: string;
    ctaSubtitle: string;
    ctaButton: string;
  };
}

export function ProjectsView({ categories, projects, emptyLabel, text }: ProjectsViewProps) {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = useMemo(() => {
    if (activeCategory === "all") return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [projects, activeCategory]);

  const featuredProjects = filtered.filter((p) => p.featured);
  const otherProjects = filtered.filter((p) => !p.featured);

  return (
    <div className="space-y-16">
      <ScrollReveal>
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => {
            const isActive = activeCategory === category.key;
            return (
              <Button
                key={category.key}
                variant={isActive ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category.key)}
                className={cn(isActive && "border-0 bg-indigo-600 hover:bg-indigo-700")}
              >
                <span className="mr-2">{category.emoji}</span>
                {category.name}
              </Button>
            );
          })}
        </div>
      </ScrollReveal>

      {filtered.length === 0 ? (
        <p className="py-12 text-center text-zinc-500">{emptyLabel}</p>
      ) : (
        <>
          {featuredProjects.length > 0 && (
            <ScrollReveal>
              <section className="space-y-8">
                <h2 className="flex items-center gap-3 text-2xl font-bold">
                  <span className="text-3xl">✨</span>
                  {text.featuredTitle}
                </h2>
                <StaggerChildren className="grid gap-8 lg:grid-cols-2" stagger={0.12}>
                  {featuredProjects.map((project) => (
                    <Card key={project.slug} className="group overflow-hidden border-0 shadow-lg">
                      <div className={`relative flex h-56 items-center justify-center bg-gradient-to-br ${project.gradient}`}>
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2),transparent_55%)]" />
                        <span className="relative text-8xl transition-transform duration-500 group-hover:scale-110">
                          {project.emoji}
                        </span>
                        <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-100 md:opacity-0 md:transition-all md:duration-300 md:group-hover:opacity-100">
                          <Link href={ROUTES.project(project.slug)}>
                            <Button size="sm" className="bg-white/90 text-gray-900 hover:bg-white">
                              {text.detailButton}
                            </Button>
                          </Link>
                          {project.demoUrl && (
                            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                              <Button variant="outline" size="sm" className="border-white/50 bg-white/90 text-gray-900 hover:bg-white">
                                Demo
                              </Button>
                            </a>
                          )}
                        </div>
                      </div>
                      <div className="bg-white p-6 dark:bg-zinc-900">
                        <h3 className="text-2xl font-bold transition-colors group-hover:text-indigo-500">{project.title}</h3>
                        <p className="mt-3 leading-relaxed text-zinc-600 dark:text-zinc-400">{project.summary}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <span key={tag} className="rounded-full bg-zinc-100 px-3 py-1 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Card>
                  ))}
                </StaggerChildren>
              </section>
            </ScrollReveal>
          )}

          {otherProjects.length > 0 && (
            <ScrollReveal>
              <section className="space-y-8">
                <h2 className="flex items-center gap-3 text-2xl font-bold">
                  <span className="text-3xl">📁</span>
                  {text.otherTitle}
                </h2>
                <StaggerChildren className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" stagger={0.08}>
                  {otherProjects.map((project) => (
                    <ProjectCard key={project.slug} project={project} detailLabel={text.detailButton} />
                  ))}
                </StaggerChildren>
              </section>
            </ScrollReveal>
          )}
        </>
      )}

      <ScrollReveal>
        <GradientCta
          title={text.ctaTitle}
          subtitle={text.ctaSubtitle}
          buttonLabel={text.ctaButton}
          href={ROUTES.contact}
        />
      </ScrollReveal>
    </div>
  );
}
