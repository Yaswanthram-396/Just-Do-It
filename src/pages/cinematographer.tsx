import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, AlertCircle } from "lucide-react";

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
      className="p-4 md:p-8 max-w-[1400px] mx-auto space-y-8 bg-background text-foreground"
    >
      <header className="py-6 border-b border-border/50 relative">
        <Link href="/" className="absolute -top-4 text-xs text-muted-foreground flex items-center gap-1 hover:text-primary transition-colors">
          <ArrowLeft className="w-3 h-3" /> Back to Role Switcher
        </Link>
        <h1 className="text-4xl font-display font-bold tracking-tight">Camera & Lighting</h1>
        <p className="text-xl text-muted-foreground mt-2">Devara: Part 2 — DOP View</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Upcoming Scenes", value: "8", sub: "this week" },
          { label: "Camera Setup Confirmed", value: "94%", sub: "of planned lenses" },
          { label: "Lighting Plans Locked", value: "67 / 89", sub: "shot scenes" },
        ].map((k, i) => (
          <Card key={i} className="bg-card border-border hover:border-primary/50 transition-colors">
            <CardContent className="p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">{k.label}</p>
              <p className="text-4xl font-display font-bold text-foreground">{k.value}</p>
              <p className="text-xs text-muted-foreground mt-2">{k.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-3">
          <h2 className="text-xl font-display font-bold">Upcoming Scenes</h2>
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            {/* Desktop Table View */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-background border-b border-border text-left">
                  <tr>
                    <th className="p-3 text-muted-foreground font-medium">Scene</th>
                    <th className="p-3 text-muted-foreground font-medium">Title</th>
                    <th className="p-3 text-muted-foreground font-medium">Setup</th>
                    <th className="p-3 text-muted-foreground font-medium">Camera Gear</th>
                    <th className="p-3 text-muted-foreground font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-foreground">
                  {upcomingScenes.map((s, i) => (
                    <tr key={i} className="hover:bg-muted/30 transition-colors">
                      <td className="p-3 font-bold font-display text-primary">{s.num}</td>
                      <td className="p-3 font-medium">{s.title}</td>
                      <td className="p-3">
                        <div className="flex gap-1">
                          <span className="px-1.5 py-0.5 bg-background border border-border rounded text-xs font-medium text-muted-foreground">{s.loc}</span>
                          <span className="px-1.5 py-0.5 bg-background border border-border rounded text-xs font-medium text-muted-foreground">{s.tod}</span>
                        </div>
                      </td>
                      <td className="p-3 text-xs text-muted-foreground">{s.camera}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                          s.status === "Locked" ? "bg-success/20 text-success" :
                          s.status === "Ready" ? "bg-primary/20 text-primary" :
                          s.status === "Planning" ? "bg-primary/10 text-primary" :
                          "bg-muted text-muted-foreground"
                        }`}>{s.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card Layout */}
            <div className="block sm:hidden divide-y divide-border">
              {upcomingScenes.map((s, i) => (
                <div key={i} className="p-4 space-y-2 bg-card">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-primary">Scene {s.num}</span>
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                      s.status === "Locked" ? "bg-success/20 text-success" :
                      s.status === "Ready" ? "bg-primary/20 text-primary" :
                      "bg-muted text-muted-foreground"
                    }`}>{s.status}</span>
                  </div>
                  <h4 className="text-sm font-semibold">{s.title}</h4>
                  <p className="text-xs text-muted-foreground"><strong>Camera:</strong> {s.camera}</p>
                  <p className="text-xs text-muted-foreground"><strong>Lighting:</strong> {s.lighting}</p>
                  <div className="flex gap-1 pt-1">
                    <span className="px-1.5 py-0.5 bg-background border border-border rounded text-xs font-medium text-muted-foreground">{s.loc}</span>
                    <span className="px-1.5 py-0.5 bg-background border border-border rounded text-xs font-medium text-muted-foreground">{s.tod}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <h2 className="text-xl font-display font-bold">Director's Visual Notes</h2>
            <div className="space-y-3">
              {directorNotes.map((n, i) => (
                <Card key={i} className="bg-card border-border border-l-2 border-l-primary">
                  <CardContent className="p-4 space-y-2">
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold font-display text-primary text-sm">Scene {n.scene}</span>
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
