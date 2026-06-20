import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/patterns/PageHeader";
import { KpiGrid } from "@/components/patterns/KpiGrid";
import { StatusBadge } from "@/components/patterns/StatusBadge";
import { DetailCard } from "@/components/patterns/DetailCard";
import { ResponsiveTable, type ResponsiveTableColumn } from "@/components/patterns/ResponsiveTable";

interface SceneMaterial {
  num: string;
  title: string;
  takes: number;
  best: string;
  vfx: boolean;
  notes: string;
  received: string;
}

const sceneMaterial: SceneMaterial[] = [
  { num: "12", title: "Palace Interior", takes: 7, best: "Take 5", vfx: false, notes: "Strong performance. Wide + close covered.", received: "Oct 12" },
  { num: "23", title: "Flashback Village", takes: 12, best: "Take 9", vfx: true, notes: "Sky replacement needed. Good coverage.", received: "Oct 13" },
  { num: "34", title: "Rajahmundry Market", takes: 18, best: "TBD", vfx: true, notes: "Action heavy. Multiple setups. Review drone plates.", received: "Oct 14" },
  { num: "41", title: "Confrontation", takes: 9, best: "Take 7", vfx: false, notes: "Low light. Check for noise on B-cam.", received: "Oct 15" },
  { num: "55", title: "Wedding Sequence", takes: 14, best: "Take 11", vfx: true, notes: "Magic hour material beautiful. Crowd extension needed.", received: "Oct 16" },
  { num: "67", title: "Chase Scene", takes: 22, best: "Take 18", vfx: true, notes: "4-camera setup. Editor's note: great selects on cam 3.", received: "Oct 18" },
  { num: "71", title: "Hospital", takes: 6, best: "Take 4", vfx: false, notes: "Intimate scene. Clean audio.", received: "Oct 19" },
  { num: "78", title: "Boat Fight", takes: 15, best: "Take 12", vfx: true, notes: "Water material. VFX water enhancement requested.", received: "Oct 20" },
  { num: "12B", title: "Palace — Insert Shots", takes: 4, best: "Take 2", vfx: false, notes: "Close-up pickups. Use with master from Scene 12.", received: "Oct 21" },
  { num: "23B", title: "Village — Pickup", takes: 3, best: "Take 3", vfx: false, notes: "Match to Scene 23 color.", received: "Oct 22" },
  { num: "45", title: "Hero Entry", takes: 11, best: "Take 8", vfx: true, notes: "Grand entry. Background plate VFX pending.", received: "Oct 22" },
  { num: "50", title: "Safehouse", takes: 8, best: "Take 6", vfx: false, notes: "Dialogue heavy. Clear sync.", received: "Oct 23" },
];

interface VfxFlag {
  scene: string;
  type: string;
  vendor: string;
  status: "In Progress" | "Briefed" | "Not Started";
}

const vfxFlags: VfxFlag[] = [
  { scene: "34", type: "Crowd Extension", vendor: "Pixion Studios", status: "In Progress" },
  { scene: "55", type: "Sky Replacement + Crowd", vendor: "Red Chillies VFX", status: "Briefed" },
  { scene: "67", type: "Wire Removal + Stunt Enhancement", vendor: "DQ Entertainment", status: "In Progress" },
  { scene: "78", type: "Water CG Enhancement", vendor: "Pixion Studios", status: "Not Started" },
  { scene: "45", type: "Background Plate Composite", vendor: "Red Chillies VFX", status: "Briefed" },
  { scene: "103", type: "Full CG Sequence", vendor: "TBD", status: "Not Started" },
];

const continuityNotes = [
  { scene: "34", from: "Continuity Supervisor", note: "NTR kurta sleeve rolled up consistently across takes 14–18. Unrolled in takes 1–13. Use takes 14+ for continuity with Scene 41." },
  { scene: "67", from: "Continuity Supervisor", note: "Chase scene: scar on NTR left cheek visible in wide shots, absent in close-ups. Flag for editorial — may need patch in post." },
  { scene: "55", from: "Director", note: "Use magic hour material exclusively. Day-lit takes (1–6) not approved for cut." },
  { scene: "41", from: "Script Supervisor", note: "Dialogue line change on set — Take 7 onwards uses revised script. Disregard takes 1–6 for final cut." },
];

interface CutVersion {
  name: string;
  reels: string;
  status: "In Progress" | "Awaiting Review" | "Approved";
  updated: string;
}

const cutVersions: CutVersion[] = [
  { name: "Assembly Cut", reels: "Reels 1–4 (of 6)", status: "Approved", updated: "Oct 18" },
  { name: "Director's Cut v1", reels: "Reels 1–3 (of 6)", status: "Approved", updated: "Oct 20" },
  { name: "Director's Cut v2", reels: "Reels 1–2 (of 6)", status: "Awaiting Review", updated: "Oct 22" },
  { name: "Action Block Re-cut (Sc 67)", reels: "Reel 4", status: "In Progress", updated: "Oct 23" },
];

const vfxTone = { "In Progress": "primary", Briefed: "warning", "Not Started": "neutral" } as const;
const cutTone = { Approved: "success", "Awaiting Review": "warning", "In Progress": "primary" } as const;

const sceneColumns: ResponsiveTableColumn<SceneMaterial>[] = [
  { key: "num", header: "Scene", primary: true, render: s => <Link href="/scenes/34" className="font-bold font-display text-primary hover:underline">{s.num}</Link> },
  { key: "title", header: "Title", render: s => <span className="font-medium">{s.title}</span> },
  { key: "takes", header: "Takes", render: s => <span className="font-bold">{s.takes}</span> },
  { key: "best", header: "Best Take", render: s => <span className="text-xs font-medium text-green-600">{s.best}</span> },
  { key: "vfx", header: "VFX", render: s => s.vfx ? <span className="px-2 py-0.5 bg-purple-500/10 text-purple-600 text-xs font-bold rounded">VFX</span> : <span className="text-muted-foreground text-xs">—</span> },
  { key: "received", header: "Received", render: s => <span className="text-xs text-muted-foreground">{s.received}</span> },
];

export default function EditorView() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto space-y-6 sm:space-y-8"
    >
      <PageHeader title="Post Production" subtitle="Devara: Part 2 — Editor View" />

      <KpiGrid items={[
        { label: "Scenes Received", value: "23 / 89", sub: "shot and delivered" },
        { label: "VFX Flags", value: "14", sub: "scenes requiring VFX" },
        { label: "Takes Logged", value: "312", sub: "total across all scenes" },
      ]} />

      <div className="space-y-3">
        <h2 className="text-lg sm:text-xl font-display font-bold">Cut Versions &amp; Timeline Review</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {cutVersions.map((c, i) => (
            <DetailCard
              key={i}
              title={c.name}
              subtitle={`${c.reels} · Updated ${c.updated}`}
              badge={<StatusBadge tone={cutTone[c.status]}>{c.status}</StatusBadge>}
            />
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
        <div className="md:col-span-2 space-y-3">
          <h2 className="text-lg sm:text-xl font-display font-bold">Scene Material Log</h2>
          <ResponsiveTable columns={sceneColumns} rows={sceneMaterial} rowKey={s => s.num} />
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <h2 className="text-lg sm:text-xl font-display font-bold">VFX Flags</h2>
            <div className="space-y-2">
              {vfxFlags.map((v, i) => (
                <DetailCard
                  key={i}
                  title={
                    <div className="flex items-center gap-2">
                      <Link href="/scenes/34" className="font-bold font-display text-primary hover:underline">Sc {v.scene}</Link>
                      <span className="font-medium">{v.type}</span>
                    </div>
                  }
                  subtitle={v.vendor}
                  badge={<StatusBadge tone={vfxTone[v.status]}>{v.status}</StatusBadge>}
                />
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg sm:text-xl font-display font-bold">Notes from Set</h2>
            <div className="space-y-2">
              {continuityNotes.map((n, i) => (
                <Card key={i} className="bg-card border-border border-l-2 border-l-primary">
                  <CardContent className="p-3">
                    <div className="flex justify-between items-baseline mb-1 gap-2">
                      <Link href="/scenes/34" className="font-bold font-display text-primary text-sm hover:underline">Scene {n.scene}</Link>
                      <span className="text-xs text-muted-foreground shrink-0">{n.from}</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{n.note}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
