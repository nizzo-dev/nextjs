import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/hooks/use-theme";
import { getLocale } from "@/lib/i18n";
import { createMetadata, personJsonLd } from "@/lib/seo";
import { getAppConfigText } from "@/lib/translations";
import { MainLayout } from "@/components/layout";
import { GsapProvider } from "@/components/animations";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const appConfig = getAppConfigText(locale);
  return {
    ...createMetadata({ locale }),
    title: {
      default: appConfig.name,
      template: `%s | ${appConfig.name}`,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lang = await getLocale();

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");var d=t==="dark"||(!t||t==="system")&&window.matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.add(d?"dark":"light")}catch(e){}})();`,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd(lang)) }}
        />
        <ThemeProvider>
          <GsapProvider>
            <MainLayout>{children}</MainLayout>
          </GsapProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
