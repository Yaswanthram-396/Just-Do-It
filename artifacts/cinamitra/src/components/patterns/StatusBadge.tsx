import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type StatusTone = "success" | "warning" | "destructive" | "info" | "primary" | "neutral";

const toneClasses: Record<StatusTone, string> = {
  success: "bg-green-500/10 text-green-600",
  warning: "bg-amber-500/10 text-amber-600",
  destructive: "bg-destructive/10 text-destructive",
  info: "bg-blue-500/10 text-blue-600",
  primary: "bg-primary/10 text-primary",
  neutral: "bg-muted text-muted-foreground",
};

interface StatusBadgeProps {
  children: ReactNode;
  tone: StatusTone;
  className?: string;
}

export function StatusBadge({ children, tone, className }: StatusBadgeProps) {
  return (
    <span className={cn("inline-flex items-center whitespace-nowrap px-2 py-0.5 rounded text-xs font-bold", toneClasses[tone], className)}>
      {children}
    </span>
  );
}
