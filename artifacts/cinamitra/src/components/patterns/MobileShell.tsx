import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface MobileShellProps {
  children: ReactNode;
  bottomNav?: ReactNode;
  fab?: ReactNode;
}

/**
 * Shell for mobile-first role views (AD, Cashier). Renders full-bleed on an
 * actual phone viewport instead of simulating a phone frame inside the page —
 * the real device chrome is the frame. Constrained to a comfortable reading
 * column on desktop instead of floating a fixed-size box.
 */
export function MobileShell({ children, bottomNav, fab }: MobileShellProps) {
  return (
    <div className="flex justify-center min-h-[calc(100vh-3.5rem)] bg-muted/30">
      <div className="relative w-full max-w-md bg-background flex flex-col min-h-[calc(100vh-3.5rem)] shadow-sm">
        <div className={cn("flex-1 overflow-y-auto px-4 sm:px-5 py-5 space-y-5", bottomNav && "pb-24")}>
          {children}
        </div>
        {fab}
        {bottomNav && (
          <div className="sticky bottom-0 inset-x-0 bg-background border-t border-border flex justify-around items-center py-3 px-2">
            {bottomNav}
          </div>
        )}
      </div>
    </div>
  );
}
