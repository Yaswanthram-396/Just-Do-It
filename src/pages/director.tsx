import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  Film, Image as ImageIcon, Camera, AlertCircle, CheckCircle2,
  Clock, Sparkles, User, Palette, ArrowLeft,
  ChevronRight, ClipboardList, RefreshCw, Star, Layers, Play, Printer
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function DirectorView() {
  const scenesData = [
    {
      num: "34",
      title: "Rajahmundry Market Chase",
      status: "Ready",
      mood: "Warm daylight, chaotic, high-contrast action",
      camera: "Handheld anamorphic, 35mm, low-angle tracking",
      performance: "High urgency, heavy crowd reactions, lead character breathing heavily.",
      blocking: "Ready", costumes: "Ready", props: "Ready", cameraGear: "Ready", location: "Ready", talent: "Ready"
    },
    {
      num: "41",
      title: "Palace Corridor Confrontation",
      status: "Revision",
      mood: "Cool moonlight, heavy shadows, tense silence",
      camera: "Steadicam, slow push-in, wide focal length",
      performance: "Understated, whispered dialogue, eye-line match is critical.",
      blocking: "Ready", costumes: "Ready", props: "Pending", cameraGear: "Ready", location: "Ready", talent: "Ready"
    },
    {
      num: "12",
      title: "Intro Village Arrival",
      status: "Locked",
      mood: "Golden hour haze, warm tones, nostalgic cinematic landscape",
      camera: "Drone overhead landscape, slider crane transition",
      performance: "Welcoming expressions, wide establishing setup.",
      blocking: "Ready", costumes: "Ready", props: "Ready", cameraGear: "Ready", location: "Ready", talent: "Ready"
    },
    {
      num: "67",
      title: "Forest Ambush Sequence",
      status: "Revision",
      mood: "Overcast misty forest, monochrome shades, silhouettes",
      camera: "Technocrane, rapid whip pans, tracking drone",
      performance: "Stunt heavy, complex reaction coordinates.",
      blocking: "Pending", costumes: "Warning", props: "Ready", cameraGear: "Ready", location: "Ready", talent: "Pending"
    }
  ];

  const creativePriorities = [
    { desc: "Scene 41 backstory script revision needs director approval signature.", type: "Revisions", badge: "Critical" },
    { desc: "Scene 67 costume continuity check mismatch regarding leather vest.", type: "Continuity", badge: "Urgent" },
    { desc: "Climax VFX Pre-viz render approved plates ready for review.", type: "Approvals", badge: "Action Required" },
  ];

  const actorNotes = [
    { char: "Devara (NTR Jr.)", note: "Subtle authority, deep gravel voice tone during the council confrontation. Avoid emotional spikes.", priority: "High" },
    { char: "Bhaira (Saif Ali Khan)", note: "Calculating stare, eyes always scanning the room. Play with slight nervous smile.", priority: "High" },
    { char: "Thangam (Janhvi Kapoor)", note: "Expressive village eyes, dialogue delivery with local dialect inflections.", priority: "Medium" }
  ];

  const continuityWarnings = [
    { issue: "Scene 67 Forest Ambush - costume mismatch: Lead character vest blood stain doesn't match Scene 66 wrap state.", dept: "Costumes", priority: "Critical" },
    { issue: "Scene 41 Corridor - prop variance: Knife model changed between Take 1 and Take 5 setup.", dept: "Props", priority: "High" },
    { issue: "Scene 34 Market - lighting color balance mismatch on drone shots versus handheld plates.", dept: "Camera / DOP", priority: "Medium" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 md:p-8 max-w-[1400px] mx-auto space-y-8 bg-background text-foreground min-h-screen"
    >
      <header className="py-6 border-b border-border/50 relative">
        <Link href="/" className="absolute -top-4 text-xs text-muted-foreground flex items-center gap-1 hover:text-primary transition-colors">
          <ArrowLeft className="w-3 h-3" /> Back to Role Switcher
        </Link>
        <h1 className="text-4xl font-display font-bold tracking-tight">Creative Command</h1>
        <p className="text-xl text-muted-foreground mt-2">Devara: Part 2 — Director's Visual Studio</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Storyboarded Scenes", value: "89 / 312", sub: "Locked & approved scene frames" },
          { label: "Creative Revisions", value: "12 Scenes", sub: "Requires visual or script approval" },
          { label: "Overall Shot Readiness", value: "94%", sub: "Camera, gear, and location setups locked" },
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <div className="space-y-3">
            <h2 className="text-xl font-display font-bold">Upcoming Scene Vision Board</h2>
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                <thead className="bg-muted/50 border-b border-border text-left">
                  <tr>
                    <th className="p-3 text-muted-foreground font-medium">Scene</th>
                    <th className="p-3 text-muted-foreground font-medium">Mood & Lighting</th>
                    <th className="p-3 text-muted-foreground font-medium">Camera Plan</th>
                    <th className="p-3 text-muted-foreground font-medium text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {scenesData.map((scene) => (
                    <tr key={scene.num} className="hover:bg-muted/30 transition-colors">
                      <td className="p-3">
                        <span className="font-bold text-xs text-primary block">Scene {scene.num}</span>
                        <span className="text-xs text-foreground font-semibold">{scene.title}</span>
                      </td>
                      <td className="p-3 text-xs text-muted-foreground max-w-[200px] leading-relaxed">
                        {scene.mood}
                      </td>
                      <td className="p-3 text-xs text-muted-foreground max-w-[200px] leading-relaxed">
                        {scene.camera}
                      </td>
                      <td className="p-3 text-right">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          scene.status === "Locked" ? "bg-green-500/10 text-green-600" :
                          scene.status === "Ready" ? "bg-primary/20 text-primary" :
                          "bg-amber-500/10 text-amber-600"
                        }`}>{scene.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

          <div className="space-y-3">
            <h2 className="text-xl font-display font-bold">Climax Storyboard & Visual Mood</h2>
            <Card className="border border-border bg-card overflow-hidden">
              <div className="h-56 bg-gradient-to-br from-slate-900 to-slate-800 relative flex items-center justify-center border-b border-border group">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors" />
                <Play className="w-12 h-12 text-primary opacity-80 group-hover:scale-110 transition-transform cursor-pointer z-10" />
                <div className="absolute bottom-4 left-4 text-white text-xs z-10">
                  <p className="font-bold">Frame #12: Boat Crash Close-up</p>
                  <p className="text-[10px] opacity-75">Steadicam, Anamorphic lens 35mm</p>
                </div>
              </div>
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong>Color Theme:</strong> Muted rustic orange & steel blue. Maintain high-contrast dramatic shadows. The crowd should feel active and chaotic but not distract from the central eye-line.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <h2 className="text-xl font-display font-bold">Creative Priorities</h2>
            <div className="space-y-3">
              {creativePriorities.map((p, idx) => (
                <div key={idx} className="p-3.5 bg-card border border-border rounded-xl flex flex-col gap-2 shadow-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase text-primary bg-primary/10 px-2 py-0.5 rounded">
                      {p.type}
                    </span>
                    <span className="text-[10px] font-bold text-destructive">{p.badge}</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-display font-bold">Actor Performance Reminders</h2>
            <div className="space-y-3">
              {actorNotes.map((note, idx) => (
                <div key={idx} className="p-3 border border-border rounded-xl bg-card space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-foreground">{note.char}</span>
                    <span className="text-[9px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded">{note.priority}</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{note.note}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-display font-bold flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-destructive" />
              Continuity Watchlist
            </h2>
            <div className="space-y-2">
              {continuityWarnings.map((c, i) => (
                <div key={i} className="p-3 border border-border rounded-xl bg-card flex flex-col gap-1">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold uppercase text-primary">{c.dept}</span>
                    <span className="text-[9px] font-bold text-destructive bg-destructive/10 px-1.5 py-0.5 rounded">{c.priority}</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{c.issue}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
