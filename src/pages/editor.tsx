import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const sceneMaterial = [
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

const vfxFlags = [
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

export default function EditorView() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 max-w-[1400px] mx-auto space-y-8"
    >
      <header className="py-6 border-b border-border/50 relative">
        <Link href="/" className="absolute -top-4 text-xs text-muted-foreground flex items-center gap-1 hover:text-primary transition-colors">
          <ArrowLeft className="w-3 h-3" /> Back to Role Switcher
        </Link>
        <h1 className="text-4xl font-display font-bold tracking-tight">Post Production</h1>
        <p className="text-xl text-muted-foreground mt-2">Devara: Part 2 — Editor View</p>
      </header>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Scenes Received", value: "23 / 89", sub: "shot and delivered" },
          { label: "VFX Flags", value: "14", sub: "scenes requiring VFX" },
          { label: "Takes Logged", value: "312", sub: "total across all scenes" },
        ].map((k, i) => (
          <Card key={i} className="bg-card border-border hover:border-primary/50 transition-colors">
            <CardContent className="p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">{k.label}</p>
              <p className="text-4xl font-display font-bold">{k.value}</p>
              <p className="text-xs text-muted-foreground mt-2">{k.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-3">
          <h2 className="text-xl font-display font-bold">Scene Material Log</h2>
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 border-b border-border text-left">
                <tr>
                  <th className="p-3 text-muted-foreground font-medium">Scene</th>
                  <th className="p-3 text-muted-foreground font-medium">Title</th>
                  <th className="p-3 text-muted-foreground font-medium">Takes</th>
                  <th className="p-3 text-muted-foreground font-medium">Best Take</th>
                  <th className="p-3 text-muted-foreground font-medium">VFX</th>
                  <th className="p-3 text-muted-foreground font-medium">Received</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {sceneMaterial.map((s, i) => (
                  <tr key={i} className="hover:bg-muted/30 transition-colors">
                    <td className="p-3">
                      <Link href="/scenes/34" className="font-bold font-display text-primary hover:underline">{s.num}</Link>
                    </td>
                    <td className="p-3 font-medium">{s.title}</td>
                    <td className="p-3 text-center font-bold">{s.takes}</td>
                    <td className="p-3 text-xs font-medium text-green-600">{s.best}</td>
                    <td className="p-3">
                      {s.vfx ? <span className="px-2 py-0.5 bg-purple-500/10 text-purple-600 text-xs font-bold rounded">VFX</span>
                        : <span className="text-muted-foreground text-xs">—</span>}
                    </td>
                    <td className="p-3 text-xs text-muted-foreground">{s.received}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <h2 className="text-xl font-display font-bold">VFX Flags</h2>
            <div className="space-y-2">
              {vfxFlags.map((v, i) => (
                <div key={i} className="bg-card border border-border rounded-lg p-3">
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex items-center gap-2">
                      <Link href="/scenes/34" className="font-bold font-display text-primary text-sm hover:underline">Sc {v.scene}</Link>
                      <span className="text-sm font-medium">{v.type}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                      v.status === "In Progress" ? "bg-primary/10 text-primary" :
                      v.status === "Briefed" ? "bg-amber-500/10 text-amber-600" :
                      "bg-muted text-muted-foreground"
                    }`}>{v.status}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{v.vendor}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-display font-bold">Notes from Set</h2>
            <div className="space-y-2">
              {continuityNotes.map((n, i) => (
                <Card key={i} className="bg-card border-border border-l-2 border-l-primary">
                  <CardContent className="p-3">
                    <div className="flex justify-between items-baseline mb-1">
                      <Link href="/scenes/34" className="font-bold font-display text-primary text-sm hover:underline">Scene {n.scene}</Link>
                      <span className="text-xs text-muted-foreground">{n.from}</span>
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
