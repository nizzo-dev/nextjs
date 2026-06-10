import type { Metadata } from "next";
import { PERSONAL_INFO, SITE_CONFIG } from "@/lib/constants";
import type { Locale } from "@/lib/locale";
import { defaultLocale } from "@/lib/locale";
import { getAppConfigText, getPersonalProfile } from "@/lib/translations";
import type { NoteItem, ProjectItem } from "@/lib/content";

const siteUrl = SITE_CONFIG.url;

export function createMetadata({
  title,
  description,
  path = "/",
  locale = defaultLocale,
}: {
  title?: string;
  description?: string;
  path?: string;
  locale?: Locale;
}): Metadata {
  const appConfig = getAppConfigText(locale);
  const pageTitle = title ? `${title} | ${appConfig.name}` : undefined;
  const pageDescription = description ?? appConfig.description;
  const url = `${siteUrl}${path}`;
  const ogTitle = pageTitle ?? appConfig.name;

  return {
    ...(pageTitle ? { title: pageTitle } : {}),
    description: pageDescription,
    metadataBase: new URL(siteUrl),
    alternates: { canonical: url },
    openGraph: {
      title: ogTitle,
      description: pageDescription,
      url,
      siteName: appConfig.name,
      locale: locale === "en" ? "en_US" : "zh_CN",
      type: "website",
      images: [{ url: SITE_CONFIG.ogImage, width: 1200, height: 630, alt: appConfig.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: pageDescription,
      images: [SITE_CONFIG.ogImage],
    },
    authors: [{ name: PERSONAL_INFO.displayName, url: PERSONAL_INFO.github }],
  };
}

export function personJsonLd(locale: Locale = defaultLocale) {
  const profile = getPersonalProfile(locale);
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PERSONAL_INFO.displayName,
    alternateName: PERSONAL_INFO.handle,
    jobTitle: profile.title,
    url: siteUrl,
    email: PERSONAL_INFO.email,
    sameAs: [PERSONAL_INFO.github, PERSONAL_INFO.website],
    description: profile.bio,
  };
}

export function projectJsonLd(project: ProjectItem, locale: Locale = defaultLocale) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    headline: project.title,
    description: project.summary,
    url: `${siteUrl}/projects/${project.slug}`,
    inLanguage: locale === "en" ? "en" : "zh-CN",
    creator: {
      "@type": "Person",
      name: PERSONAL_INFO.displayName,
      url: siteUrl,
    },
    keywords: project.tags.join(", "),
    datePublished: project.year,
  };
}

export function articleJsonLd(note: NoteItem, locale: Locale = defaultLocale) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: note.title,
    description: note.summary,
    url: `${siteUrl}/notes/${note.slug}`,
    datePublished: note.date,
    inLanguage: locale === "en" ? "en" : "zh-CN",
    author: {
      "@type": "Person",
      name: PERSONAL_INFO.displayName,
      url: siteUrl,
    },
    keywords: note.tags.join(", "),
  };
}
