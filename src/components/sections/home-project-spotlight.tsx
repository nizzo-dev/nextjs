import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export interface ProjectSpotlightText {
  eyebrow: string;
  title: string;
  intro: string;
  highlights: readonly { title: string; description: string }[];
  liveAction: string;
  detailAction: string;
  previewAlt: string;
}

interface HomeProjectSpotlightProps {
  text: ProjectSpotlightText;
  tags: readonly string[];
  liveUrl: string;
  detailHref: string;
  image: string;
}

const icons = [
  // 实时：信号
  <path key="a" d="M4 12h3l2-6 4 12 2-6h5" />,
  // AI 总结：星光
  <path key="b" d="M12 3v4M12 17v4M3 12h4M17 12h4M6.3 6.3l2.5 2.5M15.2 15.2l2.5 2.5M6.3 17.7l2.5-2.5M15.2 8.8l2.5-2.5" />,
  // 对话：气泡
  <path key="c" d="M5 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-8l-4 3v-3H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" />,
];

export function HomeProjectSpotlight({ text, tags, liveUrl, detailHref, image }: HomeProjectSpotlightProps) {
  return (
    <section aria-labelledby="project-spotlight-title" className="relative">
      <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/80 shadow-xl shadow-blue-950/5 backdrop-blur-md dark:border-white/10 dark:bg-slate-950/70 dark:shadow-black/30">
        <div aria-hidden className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-orange-400/15 blur-3xl dark:bg-orange-500/10" />
        <div aria-hidden className="pointer-events-none absolute -bottom-32 right-0 h-80 w-80 rounded-full bg-blue-500/15 blur-3xl dark:bg-blue-500/20" />

        <div className="relative grid items-center gap-8 p-6 md:p-10 lg:grid-cols-[1fr_1.15fr] lg:gap-12">
          <div className="order-2 lg:order-1">
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-300/60 bg-orange-50/80 px-3 py-1 text-xs font-medium text-orange-700 dark:border-orange-400/30 dark:bg-orange-500/10 dark:text-orange-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-60 motion-reduce:animate-none" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500" />
              </span>
              {text.eyebrow}
            </span>

            <h2 id="project-spotlight-title" className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
              <span className="bg-gradient-to-r from-rose-500 via-orange-500 to-amber-400 bg-clip-text text-transparent">{text.title}</span>
            </h2>
            <p className="mt-4 leading-relaxed text-zinc-600 dark:text-zinc-400">{text.intro}</p>

            <ul className="mt-6 space-y-3">
              {text.highlights.map((h, i) => (
                <li key={h.title} className="flex gap-3">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 ring-1 ring-blue-100 dark:bg-blue-950/50 dark:text-blue-300 dark:ring-blue-400/20">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      {icons[i % icons.length]}
                    </svg>
                  </span>
                  <span className="text-sm leading-relaxed">
                    <span className="font-medium text-zinc-900 dark:text-zinc-100">{h.title}</span>
                    <span className="text-zinc-600 dark:text-zinc-400"> — {h.description}</span>
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span key={tag} className="rounded-full bg-blue-50 px-2.5 py-1 text-xs text-blue-700 dark:bg-blue-950/40 dark:text-blue-200">{tag}</span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-500">
                <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                  {text.liveAction}
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="ml-1.5">
                    <path d="M7 17 17 7M8 7h9v9" />
                  </svg>
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href={detailHref}>{text.detailAction}</Link>
              </Button>
            </div>
          </div>

          <a href={liveUrl} target="_blank" rel="noopener noreferrer" aria-label={text.liveAction}
            className="group order-1 block lg:order-2">
            <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-950 shadow-2xl shadow-blue-950/20 ring-1 ring-black/5 transition-transform duration-500 ease-out group-hover:-translate-y-1 motion-reduce:transform-none dark:border-white/10 dark:shadow-black/50">
              <div className="flex items-center gap-1.5 border-b border-white/10 bg-slate-900/90 px-3 py-2">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                <span className="ml-3 truncate rounded-md bg-white/5 px-2 py-0.5 text-[11px] text-slate-400">iknow.itnan.fun</span>
              </div>
              <Image src={image} alt={text.previewAlt} width={1600} height={1000} sizes="(min-width: 1024px) 560px, 100vw"
                className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.02] motion-reduce:transform-none" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
