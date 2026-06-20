import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/patterns/PageHeader";
import { KpiGrid } from "@/components/patterns/KpiGrid";
import { StatusBadge } from "@/components/patterns/StatusBadge";
import { ResponsiveTable, type ResponsiveTableColumn } from "@/components/patterns/ResponsiveTable";

interface SceneStatus {
  num: string;
  title: string;
  status: "Locked" | "Revision" | "Open";
  note: string;
}

const scenes: SceneStatus[] = [
  { num: "34", title: "Rajahmundry Market", status: "Locked", note: "Approved lighting setup." },
  { num: "41", title: "Palace Exterior", status: "Revision", note: "Need more extras in background." },
  { num: "55", title: "Action Sequence A", status: "Open", note: "Reviewing stunt choreography." },
  { num: "12", title: "Intro Village", status: "Locked", note: "Performance is solid." },
  { num: "89", title: "Temple Confrontation", status: "Open", note: "Waiting on VFX pre-viz." },
  { num: "22", title: "Safehouse Discussion", status: "Locked", note: "Good pacing." },
  { num: "67", title: "Forest Ambush", status: "Revision", note: "Costume continuity check needed." },
  { num: "45", title: "Hero Entry", status: "Locked", note: "Perfect execution." },
  { num: "33", title: "Market Chase", status: "Open", note: "Camera B placement needed." },
  { num: "71", title: "Climax Pt 1", status: "Open", note: "Reviewing references." },
];

const revisions = [
  { date: "Oct 12", scene: "Scene 41", text: "Revised dialogue to reflect new plot point." },
  { date: "Oct 14", scene: "Scene 67", text: "Approved alternate ending for sequence." },
  { date: "Oct 15", scene: "Scene 22", text: "Locked blocking for master shot." },
  { date: "Oct 16", scene: "Scene 89", text: "Adjusted lighting mood to cooler tones." },
  { date: "Oct 18", scene: "Scene 12", text: "Finalized prop placement." },
];

const statusTone = { Locked: "success", Revision: "warning", Open: "info" } as const;

const sceneColumns: ResponsiveTableColumn<SceneStatus>[] = [
  { key: "num", header: "Scene#", primary: true, render: s => <Link href={`/scenes/${s.num}`} className="font-bold font-display hover:text-primary transition-colors">{s.num}</Link> },
  { key: "title", header: "Title", render: s => <span className="font-medium">{s.title}</span> },
  { key: "status", header: "Status", render: s => <StatusBadge tone={statusTone[s.status]}>{s.status}</StatusBadge> },
  { key: "note", header: "Creative Note", className: "max-w-[200px]", render: s => <span className="text-muted-foreground">{s.note}</span> },
];

export default function DirectorView() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto space-y-6 sm:space-y-8"
    >
      <PageHeader title="Good morning, Koratala Siva." subtitle="Here's Devara: Part 2." />

      <KpiGrid items={[
        { label: "Locked Scenes", value: "89 / 312", sub: "Ready for Post" },
        { label: "Pending Revisions", value: "12", sub: "Require feedback" },
        { label: "Continuity Alerts", value: "4", sub: "Critical", tone: "destructive" },
        { label: "Creative Notes", value: "47", sub: "Across departments" },
      ]} />

      <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
        <div className="md:col-span-2 space-y-3 sm:space-y-6">
          <h2 className="text-xl sm:text-2xl font-display font-bold">Scene Creative Status</h2>
          <ResponsiveTable columns={sceneColumns} rows={scenes} rowKey={s => s.num} />
        </div>

        <div className="space-y-6 sm:space-y-8">
          <Card className="bg-destructive/5 border-destructive/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-display text-destructive">Attention Required</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-destructive mt-1.5 shrink-0" />
                <p>Scene 41 has continuity conflict from last shoot day</p>
              </div>
              <div className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-destructive mt-1.5 shrink-0" />
                <p>Scene 55 costume revision request from Costume Dept</p>
              </div>
              <div className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                <p>Scene 34 visual reference uploaded by DOP</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-display">Recent Decisions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {revisions.map((r, i) => (
                <div key={i} className="border-l-2 border-primary/50 pl-3">
                  <div className="flex justify-between items-baseline mb-1 gap-2">
                    <span className="font-bold text-sm font-display">{r.scene}</span>
                    <span className="text-xs text-muted-foreground shrink-0">{r.date}</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-snug">{r.text}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="space-y-4 pt-4">
        <h2 className="text-lg sm:text-xl font-display font-bold">Mood References</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { sc: "Scene 34", colors: "from-amber-900 to-stone-900" },
            { sc: "Scene 41", colors: "from-blue-900 to-cyan-900" },
            { sc: "Scene 12", colors: "from-emerald-900 to-teal-900" },
            { sc: "Scene 89", colors: "from-rose-900 to-red-900" },
          ].map((m, i) => (
            <div key={i} className={`h-24 sm:h-32 rounded-lg bg-gradient-to-br ${m.colors} p-4 flex items-end justify-start shadow-inner`}>
              <span className="text-white font-bold tracking-widest uppercase text-xs opacity-80">{m.sc}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
