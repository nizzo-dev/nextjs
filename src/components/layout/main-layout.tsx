import { Header } from "./header";
import { Footer } from "./footer";
import { BackgroundDecorations } from "@/components/background-decorations";

export interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col transition-colors duration-300 relative overflow-hidden">
      {/* 背景装饰 */}
      <BackgroundDecorations />

      <Header />
      <main className="flex-1 transition-colors duration-300 relative z-10">
        {children}
      </main>
      <Footer />
    </div>
  );
}
