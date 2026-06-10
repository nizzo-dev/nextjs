import Link from "next/link";
import { Card, Container, Button } from "@/components/ui";
import { PageHero, ScrollReveal, StaggerChildren } from "@/components/animations";
import { ROUTES } from "@/lib/constants";
import { getNotesContent } from "@/lib/content";
import { getLocale } from "@/lib/i18n";
import { createMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const locale = await getLocale();
  const { text } = getNotesContent(locale);
  return createMetadata({
    title: text.title,
    description: text.subtitle,
    path: ROUTES.notes,
    locale,
  });
}

export default async function NotesPage() {
  const locale = await getLocale();
  const { notes, text } = getNotesContent(locale);

  return (
    <Container className="py-12 md:py-16">
      <div className="space-y-16">
        <PageHero>
          <section className="grid gap-8 md:grid-cols-[1fr_0.45fr] md:items-end">
            <div className="space-y-4">
              <p className="page-hero-kicker font-mono text-xs tracking-[0.2em] text-blue-600 dark:text-blue-300">
                {text.readMore}
              </p>
              <h1 className="page-hero-title text-4xl font-bold tracking-tight md:text-6xl">{text.title}</h1>
              <p className="page-hero-subtitle max-w-3xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                {text.subtitle}
              </p>
            </div>
            <div className="page-hero-visual hidden rounded-2xl bg-slate-950 p-6 text-white shadow-2xl shadow-blue-950/20 md:block">
              <p className="font-mono text-4xl font-semibold">{notes.length}</p>
              <p className="mt-2 text-sm text-blue-100">{text.title}</p>
            </div>
          </section>
        </PageHero>

        <ScrollReveal>
          <StaggerChildren className="grid gap-6 md:grid-cols-2" stagger={0.1}>
            {notes.map((note) => (
              <Card key={note.slug} className="flex h-full flex-col p-6">
                <div className="flex items-center justify-between gap-4 text-sm text-zinc-500 dark:text-zinc-400">
                  <time dateTime={note.date}>{note.date}</time>
                  <span>{note.readingTime}</span>
                </div>
                <h2 className="mt-6 text-2xl font-bold tracking-tight">{note.title}</h2>
                <p className="mt-3 flex-1 leading-relaxed text-zinc-600 dark:text-zinc-400">{note.summary}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {note.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-700 dark:bg-blue-950/40 dark:text-blue-200">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-6">
                  <Button asChild variant="outline">
                    <Link href={ROUTES.note(note.slug)}>{text.readMore}</Link>
                  </Button>
                </div>
              </Card>
            ))}
          </StaggerChildren>
        </ScrollReveal>
      </div>
    </Container>
  );
}
