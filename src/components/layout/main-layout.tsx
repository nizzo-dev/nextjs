import { HeaderWrapper } from "./header-wrapper";
import { FooterWrapper } from "./footer-wrapper";
import { AnimatedBackground } from "@/components/animations";

export interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col transition-colors duration-300 relative overflow-hidden">
      <AnimatedBackground />

      <HeaderWrapper />
      <main className="flex-1 transition-colors duration-300 relative z-10">
        {children}
      </main>
      <FooterWrapper />
    </div>
  );
}
