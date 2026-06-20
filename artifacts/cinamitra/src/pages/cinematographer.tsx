import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/patterns/PageHeader";
import { KpiGrid } from "@/components/patterns/KpiGrid";
import { StatusBadge } from "@/components/patterns/StatusBadge";
import { DetailCard } from "@/components/patterns/DetailCard";
import { ResponsiveTable, type ResponsiveTableColumn } from "@/components/patterns/ResponsiveTable";

interface SceneSetup {
  num: string;
  title: string;
  loc: string;
  tod: string;
  camera: string;
  status: "Ready" | "Locked" | "Planning" | "TBD";
}

const upcomingScenes: SceneSetup[] = [
  { num: "34", title: "Rajahmundry Market", loc: "EXT", tod: "DAY", camera: "Arri Alexa 35 + Drone", status: "Ready" },
  { num: "41", title: "Confrontation", loc: "INT", tod: "NIGHT", camera: "Sony FX9 + Steadicam", status: "Locked" },
  { num: "55", title: "Wedding Sequence", loc: "EXT", tod: "GOLDEN HOUR", camera: "Arri Alexa 35 + 50mm Anamorphic", status: "Ready" },
  { num: "67", title: "Chase Scene", loc: "EXT", tod: "DAY", camera: "4 x GoPro Hero 12 + Drone", status: "Locked" },
  { num: "78", title: "Boat Fight", loc: "EXT", tod: "DUSK", camera: "Arri Alexa 35 + Water Housing", status: "Planning" },
  { num: "89", title: "Final Reveal", loc: "INT", tod: "NIGHT", camera: "Sony FX9", status: "Planning" },
  { num: "103", title: "Climax", loc: "EXT", tod: "DAY", camera: "Arri Alexa 35 + Crane 50ft", status: "TBD" },
  { num: "12", title: "Palace Interior", loc: "INT", tod: "DAY", camera: "Arri Alexa 35 + Dolly", status: "Locked" },
];

interface Equipment {
  name: string;
  note: string;
  status: "Available" | "Booked" | "In Use" | "Reserved";
}

const equipment: Equipment[] = [
  { name: "Arri Alexa 35 (A-Cam)", note: "Scene 34, 55, 103", status: "Available" },
  { name: "Sony FX9 (B-Cam)", note: "Scene 41, 89", status: "Available" },
  { name: "Crane 50ft", note: "Day 31 — Scene 103", status: "Booked" },
  { name: "Steadicam Rig", note: "Scene 41 — Action sequences", status: "Available" },
  { name: "DJI Inspire 3 Drone", note: "Scene 34, 67 aerial", status: "In Use" },
  { name: "Water Housing (Sony)", note: "Scene 78 boat fight", status: "Reserved" },
];

const directorNotes = [
  { scene: "34", note: "Market chase: start with wide overhead drone, cut to ground-level handheld chase. High energy, unstable frame.", date: "Oct 10" },
  { scene: "55", note: "Wedding sequence: we need magic hour warmth. Shoot window is 30 minutes max. Pre-light from 5:30PM.", date: "Oct 12" },
  { scene: "41", note: "Confrontation: low key, single source light on Saif's face. NTR in shadow until reveal moment. Very deliberate.", date: "Oct 14" },
];

const sceneTone = { Locked: "success", Ready: "primary", Planning: "warning", TBD: "neutral" } as const;
const equipmentTone = { Available: "success", Booked: "primary", "In Use": "warning", Reserved: "neutral" } as const;

const sceneColumns: ResponsiveTableColumn<SceneSetup>[] = [
  { key: "num", header: "Scene", primary: true, render: s => <Link href="/scenes/34" className="font-bold font-display text-primary hover:underline">{s.num}</Link> },
  { key: "title", header: "Title", render: s => <span className="font-medium">{s.title}</span> },
  {
    key: "setup", header: "Setup",
    render: s => (
      <div className="flex gap-1">
        <span className="px-1.5 py-0.5 bg-muted rounded text-xs font-medium">{s.loc}</span>
        <span className="px-1.5 py-0.5 bg-muted rounded text-xs font-medium">{s.tod}</span>
      </div>
    ),
  },
  { key: "camera", header: "Camera", render: s => <span className="text-xs text-muted-foreground">{s.camera}</span> },
  { key: "status", header: "Status", render: s => <StatusBadge tone={sceneTone[s.status]}>{s.status}</StatusBadge> },
];

export default function CinematographerView() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto space-y-6 sm:space-y-8"
    >
      <PageHeader title="Camera & Lighting" subtitle="Devara: Part 2 — DOP View" />

      <KpiGrid items={[
        { label: "Upcoming Scenes", value: "8", sub: "this week" },
        { label: "Equipment Confirmed", value: "94%", sub: "of planned gear" },
        { label: "Lighting Plans Locked", value: "67 / 89", sub: "shot scenes" },
      ]} />

      <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
        <div className="md:col-span-2 space-y-3">
          <h2 className="text-lg sm:text-xl font-display font-bold">Upcoming Scenes</h2>
          <ResponsiveTable columns={sceneColumns} rows={upcomingScenes} rowKey={s => s.num} />
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <h2 className="text-lg sm:text-xl font-display font-bold">Equipment Schedule</h2>
            <div className="space-y-2">
              {equipment.map((e, i) => (
                <DetailCard key={i} title={e.name} subtitle={e.note} badge={<StatusBadge tone={equipmentTone[e.status]}>{e.status}</StatusBadge>} />
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg sm:text-xl font-display font-bold">Director's Visual Notes</h2>
            <div className="space-y-3">
              {directorNotes.map((n, i) => (
                <Card key={i} className="bg-card border-border border-l-2 border-l-primary">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-baseline mb-2 gap-2">
                      <Link href="/scenes/34" className="font-bold font-display text-primary text-sm hover:underline">Scene {n.scene}</Link>
                      <span className="text-xs text-muted-foreground shrink-0">{n.date}</span>
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
