import React, { useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./Sidebar";
import { TopNav } from "./TopNav";
import { useRole } from "./RoleContext";
import { useLocation } from "wouter";

export function Layout({ children }: { children: React.ReactNode }) {
  const { role } = useRole();
  const [location, setLocation] = useLocation();

  useEffect(() => {
    if (!role) {
      setLocation("/");
    }
  }, [role, setLocation]);

  // Reset scroll position of main content on page navigation
  useEffect(() => {
    const resetScroll = () => {
      window.scrollTo(0, 0);
      const mainEl = document.querySelector("main");
      if (mainEl) {
        mainEl.scrollTop = 0;
      }
    };
    resetScroll();
    const timer = setTimeout(resetScroll, 100);
    return () => clearTimeout(timer);
  }, [location]);

  if (!role) {
    return null;
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-background text-foreground overflow-hidden">
        <AppSidebar />
        <div className="flex-col flex-1 min-w-0 flex overflow-hidden">
          <TopNav />
          <main className="flex-1 overflow-auto bg-background/50 relative">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

