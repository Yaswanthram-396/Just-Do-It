import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Search, Bell, X, Film, Users, Box, Briefcase } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useIsMobile } from "@/hooks/use-mobile";
import { useRole } from "@/components/layout/RoleContext";
import { searchIndex, type SearchItem } from "@/lib/searchIndex";
import { getNotificationsForRole, type Notification } from "@/lib/notifications";

const TYPE_ICON: Record<SearchItem["type"], React.ElementType> = {
  Scene: Film, Cast: Users, Prop: Box, Vendor: Briefcase,
};

const TONE_DOT: Record<Notification["tone"], string> = {
  success: "bg-green-500", warning: "bg-amber-500", destructive: "bg-destructive", info: "bg-blue-500",
};

function SearchResults({ results, onSelect }: { results: SearchItem[]; onSelect: () => void }) {
  if (results.length === 0) {
    return <div className="p-4 text-sm text-muted-foreground text-center">No matches found.</div>;
  }
  return (
    <ul className="max-h-80 overflow-y-auto py-1">
      {results.map((item, i) => {
        const Icon = TYPE_ICON[item.type];
        return (
          <li key={`${item.type}-${item.label}-${i}`}>
            <Link
              href={item.url}
              onClick={onSelect}
              className="flex items-center gap-3 px-3 py-2 hover:bg-accent transition-colors"
            >
              <div className="w-7 h-7 rounded-md bg-muted flex items-center justify-center shrink-0">
                <Icon className="w-3.5 h-3.5 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{item.label}</p>
                <p className="text-xs text-muted-foreground truncate">{item.sublabel}</p>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground shrink-0">{item.type}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function NotificationsPopover() {
  const { role } = useRole();
  const notifications = getNotificationsForRole(role);
  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="relative w-8 h-8 flex items-center justify-center rounded-full hover:bg-accent text-muted-foreground hover:text-foreground transition-colors">
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-destructive border-2 border-background" />
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <span className="text-sm font-bold font-display">Notifications</span>
          <span className="text-xs text-muted-foreground">{role ?? "All roles"}</span>
        </div>
        <ul className="max-h-96 overflow-y-auto divide-y divide-border">
          {notifications.map(n => (
            <li key={n.id} className="flex items-start gap-3 px-4 py-3 hover:bg-accent/60 transition-colors">
              <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${TONE_DOT[n.tone]}`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium truncate">{n.title}</p>
                  <span className="text-[10px] text-muted-foreground shrink-0">{n.time}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{n.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
}

export function TopNav() {
  const isMobile = useIsMobile();
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [resultsOpen, setResultsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [, navigate] = useLocation();

  const results = searchIndex(query);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setResultsOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const closeSearch = () => {
    setResultsOpen(false);
    setQuery("");
    setMobileSearchOpen(false);
  };

  if (isMobile && mobileSearchOpen) {
    return (
      <header className="h-14 border-b border-border bg-background/95 backdrop-blur flex items-center gap-2 px-4 sticky top-0 z-40">
        <Search className="w-4 h-4 text-muted-foreground shrink-0" />
        <div ref={containerRef} className="relative flex-1">
          <Input
            autoFocus
            value={query}
            onChange={e => { setQuery(e.target.value); setResultsOpen(true); }}
            onFocus={() => setResultsOpen(true)}
            onKeyDown={e => {
              if (e.key === "Escape") setResultsOpen(false);
              if (e.key === "Enter" && results[0]) { navigate(results[0].url); closeSearch(); }
            }}
            placeholder="Search scenes, cast, props..."
            className="h-8 border-none focus-visible:ring-1 w-full"
          />
          {resultsOpen && query && (
            <div className="absolute left-0 right-0 top-full mt-1 bg-popover text-popover-foreground border border-border rounded-md shadow-md z-50">
              <SearchResults results={results} onSelect={closeSearch} />
            </div>
          )}
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={closeSearch}>
          <X className="w-4 h-4" />
        </Button>
      </header>
    );
  }

  return (
    <header className="h-14 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center px-4 justify-between sticky top-0 z-40">
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <SidebarTrigger className="-ml-2" />
        <div ref={containerRef} className="w-full max-w-sm hidden md:block relative">
          <div className="flex items-center relative">
            <Search className="w-4 h-4 absolute left-2.5 text-muted-foreground" />
            <Input
              value={query}
              onChange={e => { setQuery(e.target.value); setResultsOpen(true); }}
              onFocus={() => setResultsOpen(true)}
              onKeyDown={e => {
                if (e.key === "Escape") setResultsOpen(false);
                if (e.key === "Enter" && results[0]) { navigate(results[0].url); closeSearch(); }
              }}
              placeholder="Search scenes, cast, props..."
              className="h-8 pl-9 bg-muted/50 border-none focus-visible:ring-1"
            />
          </div>
          {resultsOpen && query && (
            <div className="absolute left-0 right-0 top-full mt-1 bg-popover text-popover-foreground border border-border rounded-md shadow-md z-50">
              <SearchResults results={results} onSelect={closeSearch} />
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4 shrink-0">
        <button
          className="md:hidden w-8 h-8 flex items-center justify-center rounded-full hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => setMobileSearchOpen(true)}
        >
          <Search className="w-4 h-4" />
        </button>
        <NotificationsPopover />
      </div>
    </header>
  );
}
