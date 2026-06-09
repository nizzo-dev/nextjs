export const locales = ["zh", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "zh";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getLocaleFromPathname(pathname: string): Locale | null {
  const segment = pathname.split("/")[1];
  if (segment && isLocale(segment)) {
    return segment;
  }
  return null;
}

export function withLocale(locale: Locale, path: string): string {
  if (path === "/") {
    return `/${locale}`;
  }
  return `/${locale}${path}`;
}

export function replaceLocale(pathname: string, locale: Locale): string {
  const segments = pathname.split("/");
  if (segments.length > 1 && isLocale(segments[1])) {
    segments[1] = locale;
  } else {
    segments.splice(1, 0, locale);
  }
  return segments.join("/") || "/";
}
