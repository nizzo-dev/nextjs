import type { Metadata } from "next";
import { getContactContent } from "@/lib/content";
import { getLocale } from "@/lib/i18n";
import { createMetadata } from "@/lib/seo";
import { PERSONAL_INFO } from "@/lib/constants";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const text = getContactContent(locale);
  return createMetadata({
    title: text.metaTitle,
    description: text.metaDescription ?? `Contact ${PERSONAL_INFO.displayName}.`,
    path: "/contact",
    locale,
  });
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
