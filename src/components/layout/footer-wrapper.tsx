import { getHeaderText } from "@/lib/content";
import { getLocale } from "@/lib/i18n";
import { getFooterText, getPersonalProfile } from "@/lib/translations";
import { Footer } from "./footer";

export async function FooterWrapper() {
  const locale = await getLocale();
  const headerText = getHeaderText(locale);
  const footerText = getFooterText(locale);
  const profile = getPersonalProfile(locale);

  const navItems = [
    { label: headerText.nav.home, href: "/" },
    { label: headerText.nav.about, href: "/about" },
    { label: headerText.nav.projects, href: "/projects" },
    { label: headerText.nav.notes, href: "/notes" },
    { label: headerText.nav.resume, href: "/resume" },
    { label: headerText.nav.contact, href: "/contact" },
  ];

  return (
    <Footer
      navItems={navItems}
      footerText={footerText}
      profile={profile}
    />
  );
}
