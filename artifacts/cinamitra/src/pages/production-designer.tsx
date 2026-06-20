import { Link } from "wouter";
import { motion } from "framer-motion";
import { LayoutTemplate } from "lucide-react";
import { PageHeader } from "@/components/patterns/PageHeader";
import { KpiGrid } from "@/components/patterns/KpiGrid";
import { StatusBadge } from "@/components/patterns/StatusBadge";
import { DetailCard } from "@/components/patterns/DetailCard";
import { ResponsiveTable, type ResponsiveTableColumn } from "@/components/patterns/ResponsiveTable";

interface Prop {
  item: string;
  scenes: string;
  status: "Confirmed" | "Sourcing" | "In Progress" | "Missing";
  vendor: string;
  cat: string;
}

const props: Prop[] = [
  { item: "Merchant Cart (wooden)", scenes: "34, 35", status: "Confirmed", vendor: "Roja Art Works", cat: "Furniture" },
  { item: "Fish boxes (x12)", scenes: "34", status: "Confirmed", vendor: "Local Market HYD", cat: "Prop" },
  { item: "Boat rope (hemp, 30m)", scenes: "34, 78", status: "Sourcing", vendor: "Marine Supplies Vizag", cat: "Prop" },
  { item: "Wooden crates (x6)", scenes: "34, 35", status: "Confirmed", vendor: "Roja Art Works", cat: "Furniture" },
  { item: "Palace chandelier (replica)", scenes: "12", status: "Confirmed", vendor: "Set Design Studio", cat: "Set Piece" },
  { item: "Period weapons (replica, x8)", scenes: "41, 67", status: "Sourcing", vendor: "Props Unlimited", cat: "Weapon" },
  { item: "Wedding mandap setup", scenes: "55", status: "In Progress", vendor: "Event Décor HYD", cat: "Set Piece" },
  { item: "Hospital equipment (x14)", scenes: "71", status: "Confirmed", vendor: "Med Props India", cat: "Prop" },
  { item: "Villain throne (custom)", scenes: "41, 89", status: "In Progress", vendor: "Custom Carpentry", cat: "Furniture" },
  { item: "Helicopter (toy replica, VFX)", scenes: "103", status: "Missing", vendor: "VFX Studio Mumbai", cat: "VFX Prop" },
  { item: "River boat (practical)", scenes: "78", status: "Confirmed", vendor: "Godavari Boats", cat: "Vehicle" },
  { item: "Street food stalls (x4)", scenes: "34", status: "Confirmed", vendor: "Local Build Team", cat: "Set Piece" },
];

interface LocationStatus {
  name: string;
  dressing: "Complete" | "In Progress" | "Pending";
  shoot: string;
  scene: string;
}

const locations: LocationStatus[] = [
  { name: "Rajahmundry Fish Market", dressing: "Complete", shoot: "Day 31", scene: "34" },
  { name: "Palace Interior (Studio Set)", dressing: "In Progress", shoot: "Day 23", scene: "12" },
  { name: "Wedding Temple (Exterior)", dressing: "Complete", shoot: "Day 27", scene: "55" },
  { name: "Hospital Ward (Set Build)", dressing: "In Progress", shoot: "Day 29", scene: "71" },
  { name: "River Ghat (Practical)", dressing: "Pending", shoot: "Day 30", scene: "78" },
];

interface SetReference {
  set: string;
  stage: "Floor Plan Approved" | "Under Construction" | "Dressing" | "Ready for Shoot";
  deadline: string;
}

const setReferences: SetReference[] = [
  { set: "Palace Throne Room", stage: "Ready for Shoot", deadline: "Oct 14" },
  { set: "Villain's Hideout Interior", stage: "Dressing", deadline: "Oct 18" },
  { set: "Climax Cliff Facade", stage: "Under Construction", deadline: "Oct 22" },
];

const propTone = { Confirmed: "success", "In Progress": "primary", Missing: "destructive", Sourcing: "warning" } as const;
const dressingTone = { Complete: "success", "In Progress": "primary", Pending: "warning" } as const;
const stageTone = { "Floor Plan Approved": "info", "Under Construction": "warning", Dressing: "primary", "Ready for Shoot": "success" } as const;

const propColumns: ResponsiveTableColumn<Prop>[] = [
  { key: "item", header: "Item", primary: true, render: p => <span className="font-medium">{p.item}</span> },
  { key: "scenes", header: "Scene(s)", render: p => <span className="font-display font-bold text-primary text-xs">{p.scenes}</span> },
  { key: "cat", header: "Category", render: p => <span className="px-2 py-0.5 bg-muted text-muted-foreground rounded text-xs">{p.cat}</span> },
  { key: "vendor", header: "Vendor", render: p => <span className="text-xs text-muted-foreground">{p.vendor}</span> },
  { key: "status", header: "Status", render: p => <StatusBadge tone={propTone[p.status]}>{p.status}</StatusBadge> },
];

export default function ProductionDesignerView() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto space-y-6 sm:space-y-8"
    >
      <PageHeader title="Art Department" subtitle="Devara: Part 2 — Production Design" />

      <KpiGrid items={[
        { label: "Active Props", value: "147", sub: "across all scenes" },
        { label: "Scenes Dressed", value: "34 / 89", sub: "shot scenes" },
        { label: "Pending Sourcing", value: "23", sub: "items unconfirmed" },
      ]} />

      <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
        <div className="md:col-span-2 space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h2 className="text-lg sm:text-xl font-display font-bold">Props Master List</h2>
            <div className="flex gap-2 flex-wrap">
              {["All", "Prop", "Set Piece", "Furniture"].map(f => (
                <button key={f} className="px-3 py-1 rounded text-xs font-semibold bg-muted text-muted-foreground hover:bg-muted/80 transition-colors">{f}</button>
              ))}
            </div>
          </div>
          <ResponsiveTable columns={propColumns} rows={props} rowKey={p => p.item} />
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <h2 className="text-lg sm:text-xl font-display font-bold">Location Set Status</h2>
            <div className="space-y-2">
              {locations.map((l, i) => (
                <DetailCard
                  key={i}
                  title={l.name}
                  badge={<StatusBadge tone={dressingTone[l.dressing]}>{l.dressing}</StatusBadge>}
                >
                  <p className="text-xs text-muted-foreground">Shoot Day {l.shoot} — <Link href="/scenes/34" className="text-primary hover:underline">Scene {l.scene}</Link></p>
                </DetailCard>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg sm:text-xl font-display font-bold">Set References &amp; Floor Plans</h2>
            <div className="grid grid-cols-2 gap-3">
              {setReferences.map((s, i) => (
                <div key={i} className="bg-card border border-border rounded-lg overflow-hidden">
                  <div className="aspect-video bg-muted/50 flex items-center justify-center">
                    <LayoutTemplate className="w-8 h-8 text-muted-foreground/50" />
                  </div>
                  <div className="p-3 space-y-1.5">
                    <p className="font-medium text-sm truncate">{s.set}</p>
                    <StatusBadge tone={stageTone[s.stage]}>{s.stage}</StatusBadge>
                    <p className="text-xs text-muted-foreground">Due {s.deadline}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
