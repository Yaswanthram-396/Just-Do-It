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
  Radio
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
  const { role } = useRole();
  const [location] = useLocation();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const getPrimaryNav = () => {
    const baseNav = [
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

    return baseNav;
  };

  const getRoleSpecificNav = () => {
    switch (role) {
      case "Producer":
        return [{ title: "Producer View", icon: UserCircle, url: "/producer" }];
      case "Director":
        return [{ title: "Director View", icon: Clapperboard, url: "/director" }];
      case "Line Producer":
        return [{ title: "Line Producer View", icon: LayoutDashboard, url: "/line-producer" }];
      case "AD":
        return [{ title: "AD Mobile View", icon: Radio, url: "/ad" }];
      case "Accountant":
        return [{ title: "Accountant View", icon: Calculator, url: "/accountant" }];
      default:
        return [];
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
        {role && (
          <SidebarGroup>
            <SidebarGroupLabel>Role Specific</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {getRoleSpecificNav().map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={location === item.url}>
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
        )}

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

      <SidebarFooter className="p-4 border-t border-sidebar-border">
        {!isCollapsed ? (
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
        ) : (
          <div className="flex justify-center w-full">
            <Avatar className="h-8 w-8 border border-border">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>KJ</AvatarFallback>
            </Avatar>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
