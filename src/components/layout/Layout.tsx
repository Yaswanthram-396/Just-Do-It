import React, { useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./Sidebar";
import { TopNav } from "./TopNav";
import { useRole } from "./RoleContext";
import { useLocation } from "wouter";

export function Layout({ children }: { children: React.ReactNode }) {
  const { role } = useRole();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!role) {
      setLocation("/");
    }
  }, [role, setLocation]);

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

