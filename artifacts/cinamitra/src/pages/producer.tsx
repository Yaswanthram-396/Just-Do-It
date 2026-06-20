import { PageHeader } from "@/components/patterns/PageHeader";
import { KpiGrid } from "@/components/patterns/KpiGrid";

const approvals = [
  { item: "Market Set Extension (Art Dept)", req: "Sabu Cyril", amt: "₹12.5L" },
  { item: "Extra Vanity Vans (2) for Day 31-35", req: "Production", amt: "₹3.2L" },
  { item: "VFX Pre-viz Render Farm scaling", req: "Kamal", amt: "₹8.0L" },
];

export default function ProducerView() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto space-y-8 sm:space-y-12">
      <PageHeader title="Good morning, Rana Ji." subtitle="Here's Devara: Part 2 at a glance." />

      <KpiGrid items={[
        { label: "Schedule Health", value: "87%", sub: "On Track" },
        { label: "Budget Health", value: "₹142Cr", sub: "of ₹165Cr (86%)" },
        { label: "Days Buffer", value: "+2", sub: "Available" },
        { label: "Pending Approvals", value: "7", sub: "Items requiring signature", tone: "destructive" },
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
        <h2 className="text-xl sm:text-2xl font-display font-bold mb-4 sm:mb-6">Approval Queue</h2>
        <div className="grid gap-4">
          {approvals.map((a, i) => (
            <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-card border border-border rounded-lg">
              <div className="min-w-0">
                <p className="text-base sm:text-lg font-medium">{a.item}</p>
                <p className="text-sm text-muted-foreground">Requested by {a.req}</p>
              </div>
              <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6">
                <span className="text-lg sm:text-xl font-display font-bold">{a.amt}</span>
                <div className="flex gap-2">
                  <button className="px-4 sm:px-6 py-2 bg-primary text-primary-foreground font-bold rounded hover:bg-primary/90 transition-colors text-sm">Approve</button>
                  <button className="px-4 sm:px-6 py-2 bg-muted text-muted-foreground font-bold rounded hover:bg-destructive hover:text-destructive-foreground transition-colors text-sm">Reject</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
