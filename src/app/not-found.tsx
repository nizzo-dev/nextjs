import Link from "next/link";
import { Container, Button } from "@/components/ui";
import { getLocale } from "@/lib/i18n";
import { getCommonText } from "@/lib/translations";

export default async function NotFound() {
  const locale = await getLocale();
  const common = getCommonText(locale);

  return (
    <Container className="flex min-h-[100dvh] flex-col items-center justify-center py-16">
      <div className="relative max-w-xl space-y-4 rounded-2xl border border-blue-200/70 bg-white/85 p-10 text-center shadow-2xl shadow-blue-950/10 backdrop-blur-sm dark:border-blue-400/20 dark:bg-slate-950/75">
        <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-blue-500/10 blur-2xl" />
        <h1 className="relative font-mono text-7xl font-bold text-blue-600 dark:text-blue-300">404</h1>
        <h2 className="text-2xl font-semibold">{common.notFoundTitle}</h2>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">{common.notFoundDesc}</p>
        <Button asChild>
          <Link href="/">{common.backHome}</Link>
        </Button>
      </div>
    </Container>
  );
}
