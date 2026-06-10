import Link from "next/link";
import { Button } from "@/components/ui/button";

interface GradientCtaProps {
  title: string;
  subtitle: string;
  buttonLabel: string;
  href: string;
}

export function GradientCta({ title, subtitle, buttonLabel, href }: GradientCtaProps) {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(59,130,246,0.28),transparent_50%)]" />
      <div className="absolute -left-16 bottom-0 h-40 w-40 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="relative px-8 py-16 md:px-12 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-2xl font-bold tracking-tight text-white md:text-3xl">{title}</h2>
          <p className="mb-8 text-zinc-400">{subtitle}</p>
          <Button asChild size="lg" className="bg-blue-500 hover:bg-blue-400">
            <Link href={href}>
              {buttonLabel}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
