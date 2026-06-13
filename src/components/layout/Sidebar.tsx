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
  Scissors
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
    switch (role) {
      case "Producer":
        return [
          { title: "Home", icon: UserCircle, url: "/producer" },
          { title: "Scenes", icon: Film, url: "/scenes" },
          { title: "Approvals", icon: ListChecks, url: "/approvals" }, // Fallback to breakdown or just leave
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
    <Sidebar className="border-r border-[#E5E7EB] bg-white">
      <SidebarHeader className="p-4 border-b border-[#E5E7EB] bg-white">
        {!isCollapsed ? (
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Roja Entertainment</span>
            <span className="text-sm font-bold text-[#1A1A1A] font-display">Devara: Part 2</span>
            {role && (
              <div className="mt-2 inline-flex w-fit items-center rounded-md border border-[#FF7A00]/20 bg-[#FFF4E8] px-2 py-0.5 text-[10px] font-semibold text-[#FF7A00] transition-colors focus:outline-none">
                Viewing as: {role}
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center w-full">
            <div className="w-8 h-8 rounded bg-[#FF7A00] flex items-center justify-center font-display font-bold text-white">
              D2
            </div>
          </div>
        )}
      </SidebarHeader>

      <SidebarContent className="bg-white">
        <SidebarGroup>
          <SidebarGroupLabel className="text-neutral-400 font-semibold px-3 uppercase tracking-wider text-[10px]">Production</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {getPrimaryNav().map((item) => {
                const isActive = location === item.url || (item.url !== "/" && location.startsWith(item.url));
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={isActive}
                      className={cn(
                        "transition-all duration-200 pl-3 h-9 font-medium text-xs",
                        isActive 
                          ? "bg-[#FFF4E8]! text-[#FF7A00]! border-l-4 border-[#FF7A00]! rounded-r-md rounded-l-none font-bold" 
                          : "text-neutral-600 hover:bg-[#FFF4E8]/40 hover:text-[#FF7A00] rounded-md"
                      )}
                    >
                      <Link href={item.url}>
                        <item.icon className={cn("w-4 h-4", isActive ? "text-[#FF7A00]" : "text-neutral-500")} />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-[#E5E7EB] bg-white">
        {!isCollapsed ? (
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9 border border-[#E5E7EB]">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>KJ</AvatarFallback>
            </Avatar>
            <div className="flex flex-col flex-1 overflow-hidden">
              <span className="text-sm font-medium leading-none truncate text-[#1A1A1A]">Karan Johar</span>
              <span className="text-xs text-neutral-400 truncate">karan@roja.com</span>
            </div>
            <button className="text-neutral-400 hover:text-[#1A1A1A] transition-colors ml-auto">
              <Settings className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex justify-center w-full">
            <Avatar className="h-8 w-8 border border-[#E5E7EB]">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>KJ</AvatarFallback>
            </Avatar>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}

