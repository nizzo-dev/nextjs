import { getHeaderText } from "@/lib/content";
import { getLocale } from "@/lib/i18n";
import { Header } from "./header";

export async function HeaderWrapper() {
  const locale = await getLocale();
  const headerText = getHeaderText(locale);

  const navItems = [
    { href: "/", label: headerText.nav.home },
    { href: "/about", label: headerText.nav.about },
    { href: "/projects", label: headerText.nav.projects },
    { href: "/resume", label: headerText.nav.resume },
    { href: "/contact", label: headerText.nav.contact },
  ];

  return (
    <Header
      locale={locale}
      navItems={navItems}
      contactLabel={headerText.contactButton}
      localeSwitchLabel={headerText.switchLabel}
    />
  );
}
