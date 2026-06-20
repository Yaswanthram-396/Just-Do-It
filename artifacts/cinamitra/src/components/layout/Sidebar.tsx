import { Link, useLocation } from "wouter";
import { useRole } from "./RoleContext";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Film, 
  ListChecks, 
  Calendar, 
  Wallet, 
  MessageSquare, 
  Users, 
  FileText,
  UserCircle,
  Settings,
  Briefcase,
  Clapperboard,
  Calculator,
  Radio,
  ScrollText,
  Banknote,
  Truck,
  Camera,
  Layers,
  Shirt,
  Scissors,
  LogOut
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function AppSidebar() {
  const { role, setRole } = useRole();
  const [location] = useLocation();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const getPrimaryNav = () => {
    switch (role) {
      case "Producer":
        return [
          { title: "Home", icon: UserCircle, url: "/producer" },
          { title: "Scenes", icon: Film, url: "/scenes" },
          { title: "Risk & Deals", icon: ListChecks, url: "/producer" },
          { title: "Finance", icon: Wallet, url: "/budget" },
          { title: "Reports", icon: FileText, url: "/reports" },
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
          { title: "Breakdown", icon: ListChecks, url: "/breakdown" },
          { title: "Scheduling", icon: Calendar, url: "/scheduling" },
          { title: "Budget", icon: Wallet, url: "/budget" },
          { title: "Vendors", icon: Briefcase, url: "/vendors" },
          { title: "Reports", icon: FileText, url: "/reports" },
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
          { title: "Vendors", icon: Briefcase, url: "/vendors" },
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
          { title: "Post Production", icon: FileText, url: "/reports" },
        ];
      default:
        return [
          { title: "Command Center", icon: LayoutDashboard, url: "/dashboard" },
          { title: "Scene Explorer", icon: Film, url: "/scenes" },
          { title: "Breakdown Studio", icon: ListChecks, url: "/breakdown" },
          { title: "Scheduling", icon: Calendar, url: "/scheduling" },
          { title: "Budget OS", icon: Wallet, url: "/budget" },
          { title: "Discussions", icon: MessageSquare, url: "/discussions" },
          { title: "Vendors", icon: Briefcase, url: "/vendors" },
          { title: "Reports", icon: FileText, url: "/reports" },
          { title: "Team", icon: Users, url: "/team" },
        ];
    }
  };

  return (
    <Sidebar className="border-r border-sidebar-border bg-sidebar">
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        {!isCollapsed ? (
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Roja Entertainment</span>
            <span className="text-sm font-bold text-foreground font-display">Devara: Part 2</span>
            {role && (
              <div className="mt-2 inline-flex w-fit items-center rounded-sm border border-primary/20 bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                Viewing as: {role}
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center w-full">
            <div className="w-8 h-8 rounded bg-primary flex items-center justify-center font-display font-bold text-primary-foreground">
              D2
            </div>
          </div>
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Production</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {getPrimaryNav().map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location === item.url || (item.url !== "/" && location.startsWith(item.url))}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-sidebar-border space-y-3">
        {!isCollapsed ? (
          <>
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9 border border-border">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>KJ</AvatarFallback>
              </Avatar>
              <div className="flex flex-col flex-1 overflow-hidden">
                <span className="text-sm font-medium leading-none truncate">Karan Johar</span>
                <span className="text-xs text-muted-foreground truncate">karan@roja.com</span>
              </div>
              <button className="text-muted-foreground hover:text-foreground transition-colors ml-auto">
                <Settings className="w-4 h-4" />
              </button>
            </div>
            <Link
              href="/"
              onClick={() => setRole(null)}
              className="flex items-center gap-2 w-full px-2.5 py-2 rounded-md text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Switch Role
            </Link>
          </>
        ) : (
          <div className="flex flex-col items-center gap-3 w-full">
            <Avatar className="h-8 w-8 border border-border">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>KJ</AvatarFallback>
            </Avatar>
            <Link
              href="/"
              onClick={() => setRole(null)}
              className="text-muted-foreground hover:text-foreground transition-colors"
              title="Switch Role"
            >
              <LogOut className="w-4 h-4" />
            </Link>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
