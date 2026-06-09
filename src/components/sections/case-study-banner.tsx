import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants";
import type { ProjectItem } from "@/lib/content";
import { cn } from "@/lib/utils";

interface CaseStudyBannerProps {
  project: ProjectItem;
  label: string;
  ctaDemo: string;
  ctaDetail: string;
}

export function CaseStudyBanner({ project, label, ctaDemo, ctaDetail }: CaseStudyBannerProps) {
  return (
    <section className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="grid lg:grid-cols-2">
        <div className={cn("relative flex min-h-64 items-center justify-center bg-gradient-to-br p-10", project.gradient)}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.25),transparent_60%)]" />
          <div className="relative text-center">
            <div className="text-7xl">{project.emoji}</div>
            <p className="mt-4 text-sm font-medium uppercase tracking-widest text-white/80">{label}</p>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-6 p-8 md:p-10">
          <div>
            <h2 className="text-2xl font-bold md:text-3xl">{project.title}</h2>
            <p className="mt-3 leading-relaxed text-zinc-600 dark:text-zinc-400">{project.description}</p>
          </div>
          {project.highlights && (
            <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              {project.highlights.slice(0, 3).map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
          <div className="flex flex-wrap gap-3">
            {project.demoUrl && (
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                <Button className="border-0 bg-indigo-600 hover:bg-indigo-700">{ctaDemo}</Button>
              </a>
            )}
            <Link href={ROUTES.project(project.slug)}>
              <Button variant="outline">{ctaDetail}</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
