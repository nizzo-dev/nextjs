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
    <div className="space-y-20">
      <ScrollReveal>
        <div className="flex gap-3 overflow-x-auto pb-2 md:flex-wrap md:overflow-visible">
          {categories.map((category) => {
            const isActive = activeCategory === category.key;
            return (
              <Button
                key={category.key}
                variant={isActive ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category.key)}
                className={cn("shrink-0", isActive && "border-blue-600 bg-blue-600 text-white hover:bg-blue-500")}
              >
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
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{text.featuredTitle}</h2>
                <StaggerChildren className="grid gap-8 lg:grid-cols-2" stagger={0.12}>
                  {featuredProjects.map((project) => (
                    <Card key={project.slug} className="group overflow-hidden p-0">
                      <div className="relative flex h-64 items-end bg-gradient-to-br from-slate-950 via-blue-950 to-blue-700 p-6">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(96,165,250,0.28),transparent_55%)]" />
                        <span className="relative text-7xl font-bold text-white/90 transition-transform duration-500 group-hover:translate-x-2">
                          {project.title.slice(0, 1)}
                        </span>
                        <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-100 md:opacity-0 md:transition-all md:duration-300 md:group-hover:opacity-100">
                          <Button asChild size="sm" className="bg-white text-blue-700 hover:bg-blue-50">
                            <Link href={ROUTES.project(project.slug)}>
                              {text.detailButton}
                            </Link>
                          </Button>
                          {project.demoUrl && (
                            <Button asChild variant="outline" size="sm" className="border-white/50 bg-white/90 text-blue-700 hover:bg-white">
                              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                                Demo
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                      <div className="bg-white/90 p-6 dark:bg-slate-950/80">
                        <h3 className="text-2xl font-bold transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-300">{project.title}</h3>
                        <p className="mt-3 leading-relaxed text-zinc-600 dark:text-zinc-400">{project.summary}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <span key={tag} className="rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-700 dark:bg-blue-950/40 dark:text-blue-200">
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
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{text.otherTitle}</h2>
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
