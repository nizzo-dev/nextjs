import Link from "next/link";
import { Card } from "@/components/ui/card";
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
        <Link href={ROUTES.about}>
          <Button variant="ghost">{viewAllLabel}</Button>
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {experiences.map((exp) => (
          <Card key={exp.role} className="overflow-hidden border-0 shadow-md">
            <div className="flex">
              <div className={`w-1.5 bg-gradient-to-b ${exp.gradient}`} />
              <div className="flex-1 p-6">
                <div className="mb-3 flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${exp.gradient} text-lg`}>
                    {exp.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold">{exp.role}</h3>
                    <p className="text-sm text-indigo-500">{exp.company}</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{exp.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
