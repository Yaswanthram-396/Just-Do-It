import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useState } from "react";
import { PageHeader } from "@/components/patterns/PageHeader";
import { KpiGrid } from "@/components/patterns/KpiGrid";
import { StatusBadge } from "@/components/patterns/StatusBadge";
import { ResponsiveTable, type ResponsiveTableColumn } from "@/components/patterns/ResponsiveTable";

interface ContinuityItem {
  scene: string;
  char: string;
  type: string;
  desc: string;
  status: "Flagged" | "Monitoring" | "Resolved";
}

const continuityLog: ContinuityItem[] = [
  { scene: "41", char: "NTR Jr.", type: "Wardrobe", desc: "White kurta sleeve rolled up in Scene 34, must match", status: "Flagged" },
  { scene: "55", char: "Saif Ali Khan", type: "Props", desc: "Villain's ring was absent in last cut of Scene 50", status: "Monitoring" },
  { scene: "67", char: "NTR Jr.", type: "Makeup", desc: "Scar on left cheek must be consistent with Scene 60", status: "Flagged" },
  { scene: "71", char: "Extras", type: "Continuity", desc: "Crowd positions differ between Scene 70 and 71", status: "Resolved" },
  { scene: "34", char: "Saif Ali Khan", type: "Wardrobe", desc: "Villain coat collar — check orientation from last shoot", status: "Monitoring" },
  { scene: "78", char: "NTR Jr.", type: "Props", desc: "Boat rope tied differently across angles", status: "Flagged" },
  { scene: "89", char: "NTR Jr.", type: "Makeup", desc: "Wound on right arm continuity across 3 scenes", status: "Flagged" },
  { scene: "12", char: "All Cast", type: "Continuity", desc: "Daylight direction inconsistent — reshoot morning setup", status: "Resolved" },
  { scene: "23", char: "Extras", type: "Wardrobe", desc: "Period costume accuracy verified, approved", status: "Resolved" },
  { scene: "103", char: "NTR Jr.", type: "Wardrobe", desc: "Climax outfit — torn shirt must match Scene 98 exit", status: "Monitoring" },
  { scene: "94", char: "All Cast", type: "Props", desc: "Song sequence — floral props continuity across 4 days", status: "Monitoring" },
  { scene: "45", char: "Saif Ali Khan", type: "Makeup", desc: "Aged look applied — verify consistency across scenes 43–50", status: "Resolved" },
];

const characters = [
  { name: "NTR Jr.", scenes: ["12", "23", "34", "41", "55", "67", "78", "89", "103"], baseNote: "White kurta + gold trim (Scenes 34–55). Torn state from Scene 90 onwards." },
  { name: "Saif Ali Khan", scenes: ["23", "41", "50", "55", "67", "103"], baseNote: "Villain dark coat established Scene 23. Ring continuity critical." },
  { name: "Female Lead", scenes: ["12", "55", "89"], baseNote: "Traditional silk saree. Bun hairstyle consistent." },
  { name: "Antagonist 2", scenes: ["41", "67", "103"], baseNote: "Uniform outfit. Beard growth tracked across shooting days." },
];

const filters = ["All", "Wardrobe", "Props", "Makeup", "Flagged"];
const statusTone = { Flagged: "destructive", Resolved: "success", Monitoring: "warning" } as const;

const continuityColumns: ResponsiveTableColumn<ContinuityItem>[] = [
  { key: "scene", header: "Scene", primary: true, render: r => <Link href="/scenes/34" className="font-bold font-display text-primary hover:underline">Scene {r.scene}</Link> },
  { key: "char", header: "Character", render: r => <span className="font-medium">{r.char}</span> },
  { key: "type", header: "Type", render: r => <span className="px-2 py-0.5 rounded bg-muted text-muted-foreground text-xs font-medium">{r.type}</span> },
  { key: "desc", header: "Issue", className: "max-w-[220px]", render: r => <span className="text-muted-foreground text-xs">{r.desc}</span> },
  { key: "status", header: "Status", render: r => <StatusBadge tone={statusTone[r.status]}>{r.status}</StatusBadge> },
];

export default function ContinuityView() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = continuityLog.filter(item => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Flagged") return item.status === "Flagged";
    return item.type === activeFilter;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto space-y-6 sm:space-y-8"
    >
      <PageHeader title="Continuity Dashboard" subtitle="Devara: Part 2" />

      <KpiGrid items={[
        { label: "Continuity Warnings", value: "4", sub: "require action", tone: "destructive" },
        { label: "Scenes Logged", value: "89", sub: "of 312 total" },
        { label: "Characters Tracked", value: "12", sub: "active in production" },
      ]} />

      <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h2 className="text-lg sm:text-xl font-display font-bold">Continuity Log</h2>
            <div className="flex gap-2 flex-wrap">
              {filters.map(f => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${activeFilter === f ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveTable columns={continuityColumns} rows={filtered} rowKey={(r, i) => `${r.scene}-${i}`} emptyMessage="No continuity items match this filter." />
        </div>

        <div className="space-y-4">
          <h2 className="text-lg sm:text-xl font-display font-bold">Character Timelines</h2>
          {characters.map((ch, i) => (
            <Card key={i} className="bg-card border-border">
              <CardHeader className="pb-2 pt-4 px-4">
                <CardTitle className="text-sm font-display">{ch.name}</CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4 space-y-2">
                <p className="text-xs text-muted-foreground leading-relaxed">{ch.baseNote}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {ch.scenes.map(sc => (
                    <Link key={sc} href="/scenes/34">
                      <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-bold rounded hover:bg-primary/20 transition-colors cursor-pointer">
                        Sc {sc}
                      </span>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}

          <div className="mt-4">
            <h3 className="text-sm font-display font-bold mb-3 text-muted-foreground uppercase tracking-wider">Scene Continuity Pairs</h3>
            <div className="space-y-2">
              {[
                { a: "34", b: "41", note: "Same costume, 2-day shoot gap" },
                { a: "67", b: "71", note: "NTR scar must carry through" },
                { a: "55", b: "78", note: "Wedding to boat — hairstyle check" },
              ].map((p, i) => (
                <div key={i} className="flex flex-wrap items-center gap-2 bg-muted/40 rounded p-2 text-xs">
                  <span className="font-bold font-display text-primary">Sc {p.a}</span>
                  <span className="text-muted-foreground">→</span>
                  <span className="font-bold font-display text-primary">Sc {p.b}</span>
                  <span className="text-muted-foreground">— {p.note}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
