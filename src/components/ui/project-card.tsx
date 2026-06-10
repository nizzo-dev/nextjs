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
  const height = variant === "featured" ? "h-60" : "h-44";

  return (
    <Link href={ROUTES.project(project.slug)} className={cn("block h-full", className)}>
      <Card className="group h-full cursor-pointer overflow-hidden">
        <div className={cn("relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-blue-700", height)}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(96,165,250,0.28),transparent_55%)]" />
          <div className="absolute -right-8 -top-10 h-40 w-40 rounded-full border border-white/10 transition-transform duration-700 group-hover:scale-125" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200/50 to-transparent" />
          <div className="absolute -right-2 -top-4 select-none text-7xl font-black text-white/10 md:text-8xl">
            {project.title.slice(0, 1)}
          </div>
          <div className="relative flex h-full flex-col justify-between p-5">
            <div className="flex items-start justify-between gap-2">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-2xl font-bold text-white ring-1 ring-white/15 backdrop-blur-sm md:h-14 md:w-14">
                {project.title.slice(0, 1)}
              </span>
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
          <h3 className="text-lg font-semibold transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-300">
            {project.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {project.summary}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-blue-50 px-2.5 py-1 text-xs text-blue-700 dark:bg-blue-950/40 dark:text-blue-200"
              >
                {tag}
              </span>
            ))}
          </div>
          {detailLabel && (
            <p className="mt-4 text-xs font-medium text-blue-600 opacity-0 transition-opacity group-hover:opacity-100 dark:text-blue-300">
              {detailLabel}
            </p>
          )}
        </div>
      </Card>
    </Link>
  );
}
