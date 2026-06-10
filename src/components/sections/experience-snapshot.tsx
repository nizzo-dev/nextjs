import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants";
import type { ExperienceItem } from "@/lib/content";

interface ExperienceSnapshotProps {
  title: string;
  subtitle: string;
  viewAllLabel: string;
  experiences: ExperienceItem[];
}

export function ExperienceSnapshot({
  title,
  subtitle,
  viewAllLabel,
  experiences,
}: ExperienceSnapshotProps) {
  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold">{title}</h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">{subtitle}</p>
        </div>
        <Button asChild variant="ghost">
          <Link href={ROUTES.about}>{viewAllLabel}</Link>
        </Button>
      </div>
      <div className="grid gap-px overflow-hidden rounded-2xl border border-blue-200/70 bg-blue-200/70 dark:border-blue-400/20 dark:bg-blue-400/20 md:grid-cols-2">
        {experiences.map((exp) => (
          <div key={exp.role} className="bg-white/85 dark:bg-slate-950/75">
            <div className="flex h-full flex-col p-8">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-sm font-semibold text-white shadow-lg shadow-blue-600/20">
                  {exp.company.slice(0, 1).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-semibold">{exp.role}</h3>
                  <p className="text-sm text-blue-600 dark:text-blue-300">{exp.company}</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{exp.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
