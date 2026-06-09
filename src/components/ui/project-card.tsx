import Link from "next/link";
import { Card } from "@/components/ui/card";
import { ROUTES } from "@/lib/constants";
import type { ProjectItem } from "@/lib/content";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: ProjectItem;
  detailLabel?: string;
  variant?: "grid" | "featured";
  className?: string;
}

export function ProjectCard({
  project,
  detailLabel,
  variant = "grid",
  className,
}: ProjectCardProps) {
  const height = variant === "featured" ? "h-52" : "h-40";

  return (
    <Link href={ROUTES.project(project.slug)} className={cn("block h-full", className)}>
      <Card className="group h-full cursor-pointer overflow-hidden border-zinc-200/80 dark:border-zinc-800">
        <div className={cn("relative overflow-hidden bg-gradient-to-br", project.gradient, height)}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.22),transparent_55%)]" />
          <div className="absolute -right-2 -top-4 select-none text-7xl font-black text-white/10 md:text-8xl">
            {project.emoji}
          </div>
          <div className="relative flex h-full flex-col justify-between p-5">
            <div className="flex items-start justify-between gap-2">
              <span className="text-4xl drop-shadow-sm md:text-5xl">{project.emoji}</span>
              {project.year && (
                <span className="rounded-full bg-black/20 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
                  {project.year}
                </span>
              )}
            </div>
            {project.role && (
              <span className="text-xs font-medium text-white/80">{project.role}</span>
            )}
          </div>
        </div>
        <div className="p-5 md:p-6">
          <h3 className="text-lg font-semibold transition-colors group-hover:text-indigo-500">
            {project.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {project.summary}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-zinc-100 px-2 py-1 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
              >
                {tag}
              </span>
            ))}
          </div>
          {detailLabel && (
            <p className="mt-4 text-xs font-medium text-indigo-500 opacity-0 transition-opacity group-hover:opacity-100">
              {detailLabel} →
            </p>
          )}
        </div>
      </Card>
    </Link>
  );
}
