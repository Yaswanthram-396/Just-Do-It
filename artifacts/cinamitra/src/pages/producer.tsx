import { PageHeader } from "@/components/patterns/PageHeader";
import { KpiGrid } from "@/components/patterns/KpiGrid";
import { DetailCard } from "@/components/patterns/DetailCard";
import { StatusBadge } from "@/components/patterns/StatusBadge";

const riskFlags = [
  { item: "Overseas distribution deal (APAC)", owner: "Legal & Biz Affairs", status: "In Negotiation", tone: "warning" as const },
  { item: "Star cast date clash — Schedule risk Days 40-45", owner: "Line Producer", status: "Escalated", tone: "destructive" as const },
  { item: "Insurance renewal for VFX heavy shoot block", owner: "Production", status: "On Track", tone: "success" as const },
];

export default function ProducerView() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto space-y-8 sm:space-y-12">
      <PageHeader title="Good morning, Rana Ji." subtitle="Here's Devara: Part 2 at a glance." />

      <KpiGrid items={[
        { label: "Schedule Health", value: "87%", sub: "On Track" },
        { label: "Budget Health", value: "₹142Cr", sub: "of ₹165Cr (86%)" },
        { label: "Days Buffer", value: "+2", sub: "Available" },
        { label: "Greenlight Risk", value: "Medium", sub: "1 escalated risk flag", tone: "destructive" },
      ]} />

      <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
        <div className="bg-card border border-border p-6 rounded-lg min-h-[220px] sm:min-h-[300px] flex items-center justify-center">
          <p className="text-muted-foreground font-display text-center text-sm">[ Burn Rate vs Plan Chart Placeholder ]</p>
        </div>
        <div className="bg-card border border-border p-6 rounded-lg min-h-[220px] sm:min-h-[300px] flex items-center justify-center">
          <p className="text-muted-foreground font-display text-center text-sm">[ Schedule Progress Gantt Placeholder ]</p>
        </div>
      </div>

      <div>
        <h2 className="text-xl sm:text-2xl font-display font-bold mb-4 sm:mb-6">Production Risk &amp; Deal Status</h2>
        <div className="grid gap-3">
          {riskFlags.map((r, i) => (
            <DetailCard
              key={i}
              title={r.item}
              subtitle={`Owner: ${r.owner}`}
              urgent={r.tone === "destructive"}
              badge={<StatusBadge tone={r.tone}>{r.status}</StatusBadge>}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
