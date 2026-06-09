import { cookies } from "next/headers";
import {
  defaultLocale,
  isLocale,
  type Locale,
  locales,
  getLocaleFromPathname,
  replaceLocale,
  withLocale,
} from "@/lib/locale";

export {
  defaultLocale,
  isLocale,
  locales,
  type Locale,
  getLocaleFromPathname,
  replaceLocale,
  withLocale,
};

export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get("NEXT_LOCALE")?.value;
  return localeCookie && isLocale(localeCookie) ? localeCookie : defaultLocale;
}
