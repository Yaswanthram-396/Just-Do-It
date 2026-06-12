import { useRole } from "./RoleContext";
import { Link, useLocation } from "wouter";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";

export function TopNav() {
  const { role, setRole } = useRole();
  const [location, setLocation] = useLocation();

  const handleRoleChange = (value: string) => {
    setRole(value as any);
    if (value === "Producer") setLocation("/producer");
    else if (value === "Director") setLocation("/director");
    else if (value === "Line Producer") setLocation("/line-producer");
    else if (value === "AD") setLocation("/ad");
    else if (value === "Accountant") setLocation("/accountant");
    else if (value === "Continuity") setLocation("/continuity");
    else if (value === "Cashier") setLocation("/cashier");
    else if (value === "Production Manager") setLocation("/production-manager");
    else if (value === "Cinematographer") setLocation("/cinematographer");
    else if (value === "Production Designer") setLocation("/production-designer");
    else if (value === "Costume Designer") setLocation("/costume-designer");
    else if (value === "Editor") setLocation("/editor");
    else setLocation("/dashboard");
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
        <div className="flex items-center gap-2 mr-2">
          <span className="text-xs text-muted-foreground hidden sm:inline-block">Role Switcher:</span>
          <Select value={role || ""} onValueChange={handleRoleChange}>
            <SelectTrigger className="w-[180px] h-8 text-xs font-medium border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors">
              <SelectValue placeholder="Select Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Producer">Producer</SelectItem>
              <SelectItem value="Director">Director</SelectItem>
              <SelectItem value="Line Producer">Line Producer</SelectItem>
              <SelectItem value="AD">AD</SelectItem>
              <SelectItem value="Accountant">Accountant</SelectItem>
              <SelectItem value="Continuity">Continuity</SelectItem>
              <SelectItem value="Cashier">Cashier</SelectItem>
              <SelectItem value="Production Manager">Production Manager</SelectItem>
              <SelectItem value="Cinematographer">Cinematographer</SelectItem>
              <SelectItem value="Production Designer">Production Designer</SelectItem>
              <SelectItem value="Costume Designer">Costume Designer</SelectItem>
              <SelectItem value="Editor">Editor</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <button className="relative w-8 h-8 flex items-center justify-center rounded-full hover:bg-accent text-muted-foreground hover:text-foreground transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-destructive border-2 border-background"></span>
        </button>
      </div>
    </header>
  );
}
