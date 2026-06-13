import { useRole } from "./RoleContext";
import { Link, useLocation } from "wouter";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Search, Bell, LogOut } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function TopNav() {
  const { role, setRole } = useRole();
  const [location, setLocation] = useLocation();

  const handleSwitchRole = () => {
    setRole(null);
    setLocation("/");
  };

  return (
    <header className="h-14 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center px-4 justify-between sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="-ml-2" />
        <div className="w-full max-w-sm hidden md:flex items-center relative">
          <Search className="w-4 h-4 absolute left-2.5 text-muted-foreground" />
          <Input 
            placeholder="Search scenes, cast, props..." 
            className="h-8 pl-9 bg-muted/50 border-none focus-visible:ring-1"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {role && (
          <div className="flex items-center gap-2 mr-2">
            <span className="text-xs text-muted-foreground font-medium hidden sm:inline-block bg-muted px-2 py-1 rounded">
              Role: {role}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSwitchRole}
              className="h-8 text-xs gap-1.5 border-border hover:bg-muted font-medium transition-all"
            >
              <LogOut className="w-3.5 h-3.5 text-muted-foreground" />
              Switch Role
            </Button>
          </div>
        )}
        
        <button className="relative w-8 h-8 flex items-center justify-center rounded-full hover:bg-accent text-muted-foreground hover:text-foreground transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-destructive border-2 border-background"></span>
        </button>
      </div>
    </header>
  );
}

