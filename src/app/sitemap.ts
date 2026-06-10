import type { MetadataRoute } from "next";
import { SITE_CONFIG, ROUTES } from "@/lib/constants";
import { getNotesContent, getProjectsContent } from "@/lib/content";
import { defaultLocale } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_CONFIG.url;
  const { projects } = getProjectsContent(defaultLocale);
  const { notes } = getNotesContent(defaultLocale);

  const staticRoutes = [ROUTES.home, ROUTES.about, ROUTES.projects, ROUTES.notes, ROUTES.resume, ROUTES.contact];

  return [
    ...staticRoutes.map((path) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === ROUTES.home ? 1 : 0.8,
    })),
    ...projects.map((project) => ({
      url: `${base}${ROUTES.project(project.slug)}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: project.featured ? 0.75 : 0.6,
    })),
    ...notes.map((note) => ({
      url: `${base}${ROUTES.note(note.slug)}`,
      lastModified: new Date(note.date),
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })),
  ];
}
