import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function DirectorView() {
  const scenes = [
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
        <h1 className="text-4xl font-display font-bold tracking-tight">Good morning, Koratala Siva.</h1>
        <p className="text-xl text-muted-foreground mt-2">Here's Devara: Part 2.</p>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <Card className="bg-card border-border hover:border-primary/50 transition-colors">
          <CardContent className="p-6">
            <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-2">Locked Scenes</p>
            <p className="text-4xl font-display font-bold text-primary">89 / 312</p>
            <p className="text-sm mt-2 font-medium">Ready for Post</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:border-primary/50 transition-colors">
          <CardContent className="p-6">
            <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-2">Pending Revisions</p>
            <p className="text-4xl font-display font-bold">12</p>
            <p className="text-sm mt-2 text-muted-foreground">Require feedback</p>
          </CardContent>
        </Card>

        <Card className="bg-destructive/10 border-destructive/30 hover:border-destructive/60 transition-colors">
          <CardContent className="p-6">
            <p className="text-sm font-bold uppercase tracking-widest text-destructive mb-2">Continuity Alerts</p>
            <p className="text-4xl font-display font-bold text-destructive">4</p>
            <p className="text-sm mt-2 text-destructive/80 font-medium">Critical</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:border-primary/50 transition-colors">
          <CardContent className="p-6">
            <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-2">Creative Notes</p>
            <p className="text-4xl font-display font-bold">47</p>
            <p className="text-sm mt-2 text-muted-foreground">Across departments</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-2xl font-display font-bold">Scene Creative Status</h2>
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-muted-foreground font-medium border-b border-border text-left">
                <tr>
                  <th className="p-3 pl-4">Scene#</th>
                  <th className="p-3">Title</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Creative Note</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {scenes.map((s, i) => (
                  <tr key={i} className="hover:bg-muted/50 transition-colors cursor-pointer group">
                    <td className="p-3 pl-4 font-bold font-display group-hover:text-primary transition-colors">
                      <Link href={`/scenes/${s.num}`}>{s.num}</Link>
                    </td>
                    <td className="p-3 font-medium">{s.title}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        s.status === "Locked" ? "bg-green-500/10 text-green-500" :
                        s.status === "Revision" ? "bg-orange-500/10 text-orange-500" :
                        "bg-blue-500/10 text-blue-500"
                      }`}>
                        {s.status}
                      </span>
                    </td>
                    <td className="p-3 text-muted-foreground truncate max-w-[200px]">{s.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-8">
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
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="font-bold text-sm font-display">{r.scene}</span>
                    <span className="text-xs text-muted-foreground">{r.date}</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-snug">{r.text}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="space-y-4 pt-4">
        <h2 className="text-xl font-display font-bold">Mood References</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { sc: "Scene 34", colors: "from-amber-900 to-stone-900" },
            { sc: "Scene 41", colors: "from-blue-900 to-cyan-900" },
            { sc: "Scene 12", colors: "from-emerald-900 to-teal-900" },
            { sc: "Scene 89", colors: "from-rose-900 to-red-900" }
          ].map((m, i) => (
            <div key={i} className={`h-32 rounded-lg bg-gradient-to-br ${m.colors} p-4 flex items-end justify-start shadow-inner`}>
              <span className="text-white font-bold tracking-widest uppercase text-xs opacity-80">{m.sc}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
