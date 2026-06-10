import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button, Card, Container } from "@/components/ui";
import { ROUTES } from "@/lib/constants";
import { getNoteBySlug, getNotesContent, getProjectBySlug } from "@/lib/content";
import { getLocale } from "@/lib/i18n";
import { defaultLocale } from "@/lib/locale";
import { articleJsonLd, createMetadata } from "@/lib/seo";

interface NotePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  const { notes } = getNotesContent(defaultLocale);
  return notes.map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({ params }: NotePageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const note = getNoteBySlug(locale, slug);
  if (!note) return createMetadata({ title: "Note", path: ROUTES.note(slug), locale });

  return createMetadata({
    title: note.title,
    description: note.summary,
    path: ROUTES.note(note.slug),
    locale,
  });
}

export default async function NotePage({ params }: NotePageProps) {
  const { slug } = await params;
  const locale = await getLocale();
  const { text } = getNotesContent(locale);
  const note = getNoteBySlug(locale, slug);

  if (!note) {
    notFound();
  }

  const relatedProjects = note.relatedProjects
    .map((projectSlug) => getProjectBySlug(locale, projectSlug))
    .filter(Boolean);

  return (
    <Container className="py-12 md:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(note, locale)) }}
      />
      <article className="mx-auto max-w-4xl space-y-10">
        <div className="space-y-6">
          <Button asChild variant="ghost">
            <Link href={ROUTES.notes}>{text.back}</Link>
          </Button>
          <div className="rounded-2xl bg-slate-950 p-8 text-white shadow-2xl shadow-blue-950/20 md:p-12">
            <div className="flex flex-wrap gap-3 text-sm text-blue-100/70">
              <time dateTime={note.date}>{note.date}</time>
              <span>{note.readingTime}</span>
            </div>
            <h1 className="mt-5 text-4xl font-bold tracking-tight md:text-6xl">{note.title}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-blue-50/75">{note.summary}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {note.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-white/10 px-3 py-1 text-xs text-blue-50 ring-1 ring-white/10">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <Card className="p-6 md:p-8">
          <div className="space-y-6 text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
            {note.content.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Card>

        {relatedProjects.length > 0 && (
          <section className="space-y-5">
            <h2 className="text-2xl font-bold tracking-tight">{text.relatedProjects}</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {relatedProjects.map((project) => (
                <Card key={project!.slug} className="p-5">
                  <h3 className="font-semibold">{project!.title}</h3>
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{project!.summary}</p>
                  <Button asChild variant="ghost" className="mt-4 px-0">
                    <Link href={ROUTES.project(project!.slug)}>{project!.title}</Link>
                  </Button>
                </Card>
              ))}
            </div>
          </section>
        )}
      </article>
    </Container>
  );
}
