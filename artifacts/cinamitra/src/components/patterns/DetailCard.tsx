import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface DetailCardProps {
  title: ReactNode;
  subtitle?: string;
  badge?: ReactNode;
  children?: ReactNode;
  urgent?: boolean;
  className?: string;
}

export function DetailCard({ title, subtitle, badge, children, urgent, className }: DetailCardProps) {
  return (
    <Card className={cn(urgent ? "bg-destructive/5 border-destructive/30" : "bg-card border-border", className)}>
      <CardContent className="p-3">
        <div className="flex justify-between items-start gap-2 mb-1">
          <div className="min-w-0">
            <div className="font-medium text-sm truncate">{title}</div>
            {subtitle && <p className="text-xs text-muted-foreground truncate">{subtitle}</p>}
          </div>
          {badge && <div className="shrink-0">{badge}</div>}
        </div>
        {children}
      </CardContent>
    </Card>
  );
}
