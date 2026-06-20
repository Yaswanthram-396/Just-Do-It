import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface KpiItem {
  label: string;
  value: string;
  sub?: string;
  tone?: "default" | "destructive";
}

const colsByCount: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-2 md:grid-cols-3",
  4: "grid-cols-2 md:grid-cols-4",
};

export function KpiGrid({ items }: { items: KpiItem[] }) {
  const cols = colsByCount[Math.min(items.length, 4)] ?? "grid-cols-2 md:grid-cols-4";
  return (
    <div className={cn("grid gap-3 sm:gap-4", cols)}>
      {items.map((k, i) => (
        <Card
          key={i}
          className={cn(
            "transition-colors",
            k.tone === "destructive"
              ? "bg-destructive/10 border-destructive/30 hover:border-destructive/60"
              : "bg-card border-border hover:border-primary/50"
          )}
        >
          <CardContent className="p-4 sm:p-6">
            <p className={cn("text-xs font-bold uppercase tracking-widest mb-2", k.tone === "destructive" ? "text-destructive" : "text-muted-foreground")}>
              {k.label}
            </p>
            <p className={cn("text-2xl sm:text-3xl lg:text-4xl font-display font-bold", k.tone === "destructive" && "text-destructive")}>
              {k.value}
            </p>
            {k.sub && (
              <p className={cn("text-xs sm:text-sm mt-2", k.tone === "destructive" ? "text-destructive/80 font-medium" : "text-muted-foreground")}>
                {k.sub}
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
