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
    <section className="relative overflow-hidden rounded-3xl">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.15),transparent_50%)]" />
      <div className="relative px-8 py-16 text-center">
        <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">{title}</h2>
        <p className="mx-auto mb-8 max-w-2xl text-white/85">{subtitle}</p>
        <Link href={href}>
          <Button size="lg" className="bg-white text-indigo-600 hover:bg-white/90">
            {buttonLabel}
          </Button>
        </Link>
      </div>
    </section>
  );
}
