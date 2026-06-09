import Link from "next/link";
import { Container, Button } from "@/components/ui";
import { getLocale } from "@/lib/i18n";
import { getCommonText } from "@/lib/translations";

export default async function NotFound() {
  const locale = await getLocale();
  const common = getCommonText(locale);

  return (
    <Container className="flex min-h-screen flex-col items-center justify-center">
      <div className="space-y-4 text-center">
        <h1 className="text-6xl font-bold">404</h1>
        <h2 className="text-2xl font-semibold">{common.notFoundTitle}</h2>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">{common.notFoundDesc}</p>
        <Link href="/">
          <Button>{common.backHome}</Button>
        </Link>
      </div>
    </Container>
  );
}
