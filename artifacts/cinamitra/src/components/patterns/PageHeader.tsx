import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backHref?: string;
  backLabel?: string;
  actions?: ReactNode;
}

export function PageHeader({ title, subtitle, backHref = "/", backLabel = "Back to Role Switcher", actions }: PageHeaderProps) {
  return (
    <header className="py-4 sm:py-6 border-b border-border/50 relative">
      <Link href={backHref} className="absolute -top-3 sm:-top-4 text-xs text-muted-foreground flex items-center gap-1 hover:text-primary transition-colors">
        <ArrowLeft className="w-3 h-3" /> {backLabel}
      </Link>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold tracking-tight">{title}</h1>
          {subtitle && <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mt-1 sm:mt-2">{subtitle}</p>}
        </div>
        {actions && <div className="flex items-center gap-2 flex-wrap">{actions}</div>}
      </div>
    </header>
  );
}
