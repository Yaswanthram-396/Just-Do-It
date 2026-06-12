import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, AlertTriangle } from "lucide-react";

const wardrobes = [
  { char: "NTR Jr.", actor: "N.T. Rama Rao Jr.", scenes: "12, 23, 34, 41, 55, 67, 78, 89, 103", costume: "White kurta + gold trim (hero look)", continuity: "Locked", fittings: 3 },
  { char: "Saif Ali Khan", actor: "Saif Ali Khan", scenes: "23, 41, 50, 55, 67, 103", costume: "Dark wool coat + villain accessories", continuity: "Alert", fittings: 2 },
  { char: "Female Lead", actor: "Janhvi Kapoor", scenes: "12, 55, 89", costume: "Silk saree — 3 variations", continuity: "Locked", fittings: 4 },
  { char: "Antagonist 2", actor: "Prakash Raj", scenes: "41, 67, 103", costume: "Military-style uniform", continuity: "In Review", fittings: 1 },
  { char: "Village Elder", actor: "Nassar", scenes: "23, 45", costume: "Traditional dhoti + angavastram", continuity: "Locked", fittings: 1 },
  { char: "Palace Guard (x6)", actor: "Stunt Team A", scenes: "12, 41", costume: "Period armor — custom fabricated", continuity: "Locked", fittings: 6 },
  { char: "Wedding Priest", actor: "S.A. Chandrasekhar", scenes: "55", costume: "Traditional panchakacham", continuity: "Locked", fittings: 1 },
  { char: "Market Crowd (x30)", actor: "Extras", scenes: "34, 35", costume: "Period casual — 1920s Telugu town", continuity: "In Review", fittings: 0 },
];

const fittings = [
  { char: "NTR Jr.", actor: "N.T. Rama Rao Jr.", date: "Oct 18", time: "10:00 AM", status: "Confirmed" },
  { char: "Saif Ali Khan", actor: "Saif Ali Khan", date: "Oct 19", time: "02:00 PM", status: "Confirmed" },
  { char: "Female Lead", actor: "Janhvi Kapoor", date: "Oct 20", time: "11:00 AM", status: "Pending" },
  { char: "Antagonist 2", actor: "Prakash Raj", date: "Oct 21", time: "09:00 AM", status: "Confirmed" },
  { char: "Market Extras (sample)", actor: "5 selected extras", date: "Oct 22", time: "03:00 PM", status: "Pending" },
];

const alerts = [
  { scene: "41", note: "NTR costume must exactly match Scene 34 — 2-day gap in shooting", urgent: true },
  { scene: "55", note: "Saif costume revision request — collar detail changed by Director Oct 15", urgent: true },
  { scene: "103", note: "NTR torn-shirt state must match Scene 98 exit — verify tears placement", urgent: false },
];

export default function CostumeDesignerView() {
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
        <h1 className="text-4xl font-display font-bold tracking-tight">Costume Department</h1>
        <p className="text-xl text-muted-foreground mt-2">Devara: Part 2</p>
      </header>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Characters", value: "12", sub: "with costume sheets" },
          { label: "Costume Sets", value: "47", sub: "total variations" },
          { label: "Fittings This Week", value: "8", sub: "5 confirmed, 3 pending" },
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
          <h2 className="text-xl font-display font-bold">Character Wardrobe</h2>
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 border-b border-border text-left">
                <tr>
                  <th className="p-3 text-muted-foreground font-medium">Character</th>
                  <th className="p-3 text-muted-foreground font-medium">Scenes</th>
                  <th className="p-3 text-muted-foreground font-medium">Key Costume</th>
                  <th className="p-3 text-muted-foreground font-medium">Continuity</th>
                  <th className="p-3 text-muted-foreground font-medium">Fittings</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {wardrobes.map((w, i) => (
                  <tr key={i} className="hover:bg-muted/30 transition-colors">
                    <td className="p-3">
                      <p className="font-medium">{w.char}</p>
                      <p className="text-xs text-muted-foreground">{w.actor}</p>
                    </td>
                    <td className="p-3 font-display font-bold text-primary text-xs">{w.scenes}</td>
                    <td className="p-3 text-xs text-muted-foreground max-w-[160px]">{w.costume}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                        w.continuity === "Locked" ? "bg-green-500/10 text-green-600" :
                        w.continuity === "Alert" ? "bg-destructive/10 text-destructive" :
                        "bg-amber-500/10 text-amber-600"
                      }`}>{w.continuity}</span>
                    </td>
                    <td className="p-3 text-sm font-medium text-center">{w.fittings}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <h2 className="text-xl font-display font-bold">Fitting Schedule</h2>
            <div className="space-y-2">
              {fittings.map((f, i) => (
                <div key={i} className="bg-card border border-border rounded-lg p-3">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <p className="font-medium text-sm">{f.char}</p>
                      <p className="text-xs text-muted-foreground">{f.actor}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                      f.status === "Confirmed" ? "bg-green-500/10 text-green-600" : "bg-amber-500/10 text-amber-600"
                    }`}>{f.status}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{f.date} at {f.time}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-display font-bold flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              Continuity Alerts
            </h2>
            <div className="space-y-2">
              {alerts.map((a, i) => (
                <Card key={i} className={`border ${a.urgent ? "bg-destructive/5 border-destructive/30" : "bg-card border-border"}`}>
                  <CardContent className="p-3">
                    <div className="flex gap-2 items-baseline mb-1">
                      <Link href="/scenes/34" className="font-bold font-display text-primary text-sm hover:underline">Scene {a.scene}</Link>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{a.note}</p>
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
