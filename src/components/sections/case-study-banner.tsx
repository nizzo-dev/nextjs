import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants";
import type { ProjectItem } from "@/lib/content";

interface CaseStudyBannerProps {
  project: ProjectItem;
  label: string;
  ctaDemo: string;
  ctaDetail: string;
}

export function CaseStudyBanner({ project, label, ctaDemo, ctaDetail }: CaseStudyBannerProps) {
  return (
    <section className="overflow-hidden rounded-2xl border border-blue-200/70 bg-white/80 shadow-xl shadow-blue-950/5 backdrop-blur-sm dark:border-blue-400/20 dark:bg-slate-950/70">
      <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
        <div className="relative flex min-h-72 items-end bg-gradient-to-br from-slate-950 via-blue-950 to-blue-700 p-8 md:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(96,165,250,0.34),transparent_60%)]" />
          <div className="absolute right-6 top-6 h-28 w-28 rounded-full border border-white/10" />
          <div className="relative">
            <p className="font-mono text-xs tracking-[0.18em] text-white/70">{label}</p>
            <div className="mt-4 text-6xl font-bold tracking-tight text-white">{project.title.slice(0, 1)}</div>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-6 p-8 md:p-12">
          <div>
            <h2 className="text-2xl font-bold md:text-3xl">{project.title}</h2>
            <p className="mt-3 leading-relaxed text-zinc-600 dark:text-zinc-400">{project.description}</p>
          </div>
          {project.highlights && (
            <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              {project.highlights.slice(0, 3).map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
          <div className="flex flex-wrap gap-3">
            {project.demoUrl && (
              <Button asChild>
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">{ctaDemo}</a>
              </Button>
            )}
            <Button asChild variant="outline">
              <Link href={ROUTES.project(project.slug)}>{ctaDetail}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
