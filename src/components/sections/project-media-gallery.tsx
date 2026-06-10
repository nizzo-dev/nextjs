import type { ProjectScreenshot } from "@/lib/content";

interface ProjectMediaGalleryProps {
  items: ProjectScreenshot[];
}

export function ProjectMediaGallery({ items }: ProjectMediaGalleryProps) {
  if (!items.length) return null;

  return (
    <div className="grid gap-5 md:grid-cols-2">
      {items.map((item) => (
        <figure
          key={item.src}
          className="overflow-hidden rounded-2xl border border-blue-200/70 bg-white/85 shadow-sm shadow-blue-950/5 backdrop-blur-sm dark:border-blue-400/20 dark:bg-slate-950/70"
        >
          <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_18%,rgba(96,165,250,0.3),transparent_46%)]" />
            <div className="absolute inset-x-6 top-6 h-2 rounded-full bg-white/10" />
            <div className="absolute left-6 top-12 h-28 w-28 rounded-2xl bg-blue-500/20 ring-1 ring-white/10" />
            <div className="absolute bottom-6 left-6 right-6 grid gap-3">
              <div className="h-3 rounded-full bg-white/20" />
              <div className="h-3 w-2/3 rounded-full bg-white/10" />
              <div className="mt-3 grid grid-cols-3 gap-3">
                <div className="h-14 rounded-xl bg-white/10" />
                <div className="h-14 rounded-xl bg-blue-400/20" />
                <div className="h-14 rounded-xl bg-white/10" />
              </div>
            </div>
          </div>
          <figcaption className="p-5">
            <h3 className="font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{item.description}</p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
