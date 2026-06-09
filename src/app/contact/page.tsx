import { ContactClient } from "./contact-client";
import { getContactContent } from "@/lib/content";
import { getLocale } from "@/lib/i18n";

export default async function ContactPage() {
  const locale = await getLocale();
  const text = getContactContent(locale);

  return <ContactClient text={text} />;
}
