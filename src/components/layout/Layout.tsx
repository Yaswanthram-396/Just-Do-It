import React, { useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./Sidebar";
import { TopNav } from "./TopNav";
import { useRole } from "./RoleContext";
import { useLocation, Link } from "wouter";
import { 
  UserCircle, Film, ListChecks, Wallet, FileText, Clapperboard, 
  LayoutDashboard, Calendar, Briefcase, Radio, MessageSquare, 
  Calculator, ScrollText, Banknote, Truck, Users, Camera, Layers, Shirt, Scissors 
} from "lucide-react";

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

  // Get dynamic bottom navigation items for mobile based on roles
  const getBottomNavItems = () => {
    switch (role) {
      case "Producer":
        return [
          { title: "Home", icon: UserCircle, url: "/producer" },
          { title: "Scenes", icon: Film, url: "/scenes" },
          { title: "Approvals", icon: ListChecks, url: "/approvals" },
          { title: "Finance", icon: Wallet, url: "/budget" },
        ];
      case "Director":
        return [
          { title: "Home", icon: Clapperboard, url: "/director" },
          { title: "Scenes", icon: Film, url: "/scenes" },
          { title: "Creative", icon: ListChecks, url: "/breakdown" },
          { title: "References", icon: FileText, url: "/reports" },
        ];
      case "Line Producer":
        return [
          { title: "Home", icon: LayoutDashboard, url: "/line-producer" },
          { title: "Scenes", icon: Film, url: "/scenes" },
          { title: "Scheduling", icon: Calendar, url: "/scheduling" },
          { title: "Budget", icon: Wallet, url: "/budget" },
        ];
      case "AD":
        return [
          { title: "Home", icon: Radio, url: "/ad" },
          { title: "Scenes", icon: Film, url: "/scenes" },
          { title: "Issues", icon: MessageSquare, url: "/discussions" },
          { title: "Reports", icon: FileText, url: "/reports" },
        ];
      case "Accountant":
        return [
          { title: "Home", icon: Calculator, url: "/accountant" },
          { title: "Invoices", icon: Briefcase, url: "/vendors" },
          { title: "Expenses", icon: Wallet, url: "/budget" },
          { title: "Reports", icon: FileText, url: "/reports" },
        ];
      case "Continuity":
        return [
          { title: "Home", icon: ScrollText, url: "/continuity" },
          { title: "Scenes", icon: Film, url: "/scenes" },
          { title: "Reports", icon: FileText, url: "/reports" },
        ];
      case "Cashier":
        return [
          { title: "Home", icon: Banknote, url: "/cashier" },
          { title: "Expenses", icon: Wallet, url: "/budget" },
          { title: "Receipts", icon: FileText, url: "/reports" },
        ];
      case "Production Manager":
        return [
          { title: "Home", icon: Truck, url: "/production-manager" },
          { title: "Logistics", icon: Calendar, url: "/scheduling" },
          { title: "Vendors", icon: Briefcase, url: "/vendors" },
          { title: "Resources", icon: Users, url: "/team" },
        ];
      case "Cinematographer":
        return [
          { title: "Home", icon: Camera, url: "/cinematographer" },
          { title: "Scenes", icon: Film, url: "/scenes" },
          { title: "Equipment", icon: ListChecks, url: "/breakdown" },
        ];
      case "Production Designer":
        return [
          { title: "Home", icon: Layers, url: "/production-designer" },
          { title: "Props", icon: ListChecks, url: "/breakdown" },
          { title: "Locations", icon: Calendar, url: "/scheduling" },
        ];
      case "Costume Designer":
        return [
          { title: "Home", icon: Shirt, url: "/costume-designer" },
          { title: "Costumes", icon: ListChecks, url: "/breakdown" },
          { title: "Characters", icon: Film, url: "/scenes" },
        ];
      case "Editor":
        return [
          { title: "Home", icon: Scissors, url: "/editor" },
          { title: "Scenes", icon: Film, url: "/scenes" },
          { title: "Post", icon: FileText, url: "/reports" },
        ];
      default:
        return [
          { title: "Home", icon: LayoutDashboard, url: "/dashboard" },
          { title: "Scenes", icon: Film, url: "/scenes" },
          { title: "Scheduling", icon: Calendar, url: "/scheduling" },
        ];
    }
  };

  const navItems = getBottomNavItems();

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-background text-foreground overflow-hidden">
        {/* Sidebar hidden on mobile */}
        <div className="hidden md:flex">
          <AppSidebar />
        </div>
        <div className="flex-col flex-1 min-w-0 flex overflow-hidden pb-16 md:pb-0">
          <TopNav />
          <main className="flex-1 overflow-auto bg-background/50 relative">
            {children}
          </main>
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-card border-t border-border flex justify-around items-center z-50 px-2 pb-safe">
          {navItems.map((item) => {
            const isActive = location === item.url || (item.url !== "/" && location.startsWith(item.url));
            const Icon = item.icon;
            return (
              <Link key={item.title} href={item.url}>
                <button className={`flex flex-col items-center justify-center gap-1 w-16 h-12 transition-all ${
                  isActive ? "text-primary font-bold scale-105" : "text-muted-foreground hover:text-foreground"
                }`}>
                  <Icon className="w-5 h-5" />
                  <span className="text-[10px] tracking-wide truncate max-w-full">{item.title}</span>
                </button>
              </Link>
            );
          })}
        </div>
      </div>
    </SidebarProvider>
  );
}

