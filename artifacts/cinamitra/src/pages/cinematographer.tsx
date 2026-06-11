import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const upcomingScenes = [
  { num: "34", title: "Rajahmundry Market", loc: "EXT", tod: "DAY", camera: "Arri Alexa 35 + Drone", lighting: "Natural + 2 HMI Fills", status: "Ready" },
  { num: "41", title: "Confrontation", loc: "INT", tod: "NIGHT", camera: "Sony FX9 + Steadicam", lighting: "Practical + 4 LED Panels", status: "Locked" },
  { num: "55", title: "Wedding Sequence", loc: "EXT", tod: "GOLDEN HOUR", camera: "Arri Alexa 35 + 50mm Anamorphic", lighting: "Natural — magic hour window", status: "Ready" },
  { num: "67", title: "Chase Scene", loc: "EXT", tod: "DAY", camera: "4 x GoPro Hero 12 + Drone", lighting: "Natural — overcast preferred", status: "Locked" },
  { num: "78", title: "Boat Fight", loc: "EXT", tod: "DUSK", camera: "Arri Alexa 35 + Water Housing", lighting: "Natural + 1 Soft Box", status: "Planning" },
  { num: "89", title: "Final Reveal", loc: "INT", tod: "NIGHT", camera: "Sony FX9", lighting: "Low key — single source dramatic", status: "Planning" },
  { num: "103", title: "Climax", loc: "EXT", tod: "DAY", camera: "Arri Alexa 35 + Crane 50ft", lighting: "Natural sun + reflectors", status: "TBD" },
  { num: "12", title: "Palace Interior", loc: "INT", tod: "DAY", camera: "Arri Alexa 35 + Dolly", lighting: "Window light + 6 Kino Flos", status: "Locked" },
];

const equipment = [
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

export default function CinematographerView() {
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
        <h1 className="text-4xl font-display font-bold tracking-tight">Camera & Lighting</h1>
        <p className="text-xl text-muted-foreground mt-2">Devara: Part 2 — DOP View</p>
      </header>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Upcoming Scenes", value: "8", sub: "this week" },
          { label: "Equipment Confirmed", value: "94%", sub: "of planned gear" },
          { label: "Lighting Plans Locked", value: "67 / 89", sub: "shot scenes" },
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
          <h2 className="text-xl font-display font-bold">Upcoming Scenes</h2>
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 border-b border-border text-left">
                <tr>
                  <th className="p-3 text-muted-foreground font-medium">Scene</th>
                  <th className="p-3 text-muted-foreground font-medium">Title</th>
                  <th className="p-3 text-muted-foreground font-medium">Setup</th>
                  <th className="p-3 text-muted-foreground font-medium">Camera</th>
                  <th className="p-3 text-muted-foreground font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {upcomingScenes.map((s, i) => (
                  <tr key={i} className="hover:bg-muted/30 transition-colors cursor-pointer">
                    <td className="p-3">
                      <Link href="/scenes/34" className="font-bold font-display text-primary hover:underline">{s.num}</Link>
                    </td>
                    <td className="p-3 font-medium">{s.title}</td>
                    <td className="p-3">
                      <div className="flex gap-1">
                        <span className="px-1.5 py-0.5 bg-muted rounded text-xs font-medium">{s.loc}</span>
                        <span className="px-1.5 py-0.5 bg-muted rounded text-xs font-medium">{s.tod}</span>
                      </div>
                    </td>
                    <td className="p-3 text-xs text-muted-foreground">{s.camera}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                        s.status === "Locked" ? "bg-green-500/10 text-green-600" :
                        s.status === "Ready" ? "bg-primary/10 text-primary" :
                        s.status === "Planning" ? "bg-amber-500/10 text-amber-600" :
                        "bg-muted text-muted-foreground"
                      }`}>{s.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <h2 className="text-xl font-display font-bold">Equipment Schedule</h2>
            <div className="space-y-2">
              {equipment.map((e, i) => (
                <div key={i} className="bg-card border border-border rounded-lg p-3 flex justify-between items-start">
                  <div>
                    <p className="font-medium text-sm">{e.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{e.note}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-xs font-bold shrink-0 ml-2 ${
                    e.status === "Available" ? "bg-green-500/10 text-green-600" :
                    e.status === "Booked" ? "bg-primary/10 text-primary" :
                    e.status === "In Use" ? "bg-amber-500/10 text-amber-600" :
                    "bg-muted text-muted-foreground"
                  }`}>{e.status}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-display font-bold">Director's Visual Notes</h2>
            <div className="space-y-3">
              {directorNotes.map((n, i) => (
                <Card key={i} className="bg-card border-border border-l-2 border-l-primary">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-baseline mb-2">
                      <Link href="/scenes/34" className="font-bold font-display text-primary text-sm hover:underline">Scene {n.scene}</Link>
                      <span className="text-xs text-muted-foreground">{n.date}</span>
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
