import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, AlertTriangle, Plus, X, Check } from "lucide-react";
import { useState, useEffect } from "react";

const INITIAL_WARDROBES = [
  { char: "NTR Jr.", actor: "N.T. Rama Rao Jr.", scenes: "12, 23, 34, 41, 55, 67, 78, 89, 103", costume: "White kurta + gold trim (hero look)", continuity: "Locked", fittings: 3 },
  { char: "Saif Ali Khan", actor: "Saif Ali Khan", scenes: "23, 41, 50, 55, 67, 103", costume: "Dark wool coat + villain accessories", continuity: "Alert", fittings: 2 },
  { char: "Female Lead", actor: "Janhvi Kapoor", scenes: "12, 55, 89", costume: "Silk saree — 3 variations", continuity: "Locked", fittings: 4 },
  { char: "Antagonist 2", actor: "Prakash Raj", scenes: "41, 67, 103", costume: "Military-style uniform", continuity: "In Review", fittings: 1 },
  { char: "Village Elder", actor: "Nassar", scenes: "23, 45", costume: "Traditional dhoti + angavastram", continuity: "Locked", fittings: 1 },
  { char: "Palace Guard (x6)", actor: "Stunt Team A", scenes: "12, 41", costume: "Period armor — custom fabricated", continuity: "Locked", fittings: 6 },
  { char: "Wedding Priest", actor: "S.A. Chandrasekhar", scenes: "55", costume: "Traditional panchakacham", continuity: "Locked", fittings: 1 },
  { char: "Market Crowd (x30)", actor: "Extras", scenes: "34, 35", costume: "Period casual — 1920s Telugu town", continuity: "In Review", fittings: 0 },
];

const INITIAL_FITTINGS = [
  { char: "NTR Jr.", actor: "N.T. Rama Rao Jr.", date: "Oct 18", time: "10:00 AM", status: "Confirmed" },
  { char: "Saif Ali Khan", actor: "Saif Ali Khan", date: "Oct 19", time: "02:00 PM", status: "Confirmed" },
  { char: "Female Lead", actor: "Janhvi Kapoor", date: "Oct 20", time: "11:00 AM", status: "Pending" },
  { char: "Antagonist 2", actor: "Prakash Raj", date: "Oct 21", time: "09:00 AM", status: "Confirmed" },
  { char: "Market Extras (sample)", actor: "5 selected extras", date: "Oct 22", time: "03:00 PM", status: "Pending" },
];

const INITIAL_ALERTS = [
  { scene: "41", note: "NTR costume must exactly match Scene 34 — 2-day gap in shooting", urgent: true },
  { scene: "55", note: "Saif costume revision request — collar detail changed by Director Oct 15", urgent: true },
  { scene: "103", note: "NTR torn-shirt state must match Scene 98 exit — verify tears placement", urgent: false },
];

export default function CostumeDesignerView() {
  const [wardrobes, setWardrobes] = useState<typeof INITIAL_WARDROBES>(() => {
    const saved = localStorage.getItem("cinamitra-wardrobes");
    return saved ? JSON.parse(saved) : INITIAL_WARDROBES;
  });
  const [fittings, setFittings] = useState<typeof INITIAL_FITTINGS>(() => {
    const saved = localStorage.getItem("cinamitra-fittings");
    return saved ? JSON.parse(saved) : INITIAL_FITTINGS;
  });
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("cinamitra-wardrobes", JSON.stringify(wardrobes));
  }, [wardrobes]);

  useEffect(() => {
    localStorage.setItem("cinamitra-fittings", JSON.stringify(fittings));
  }, [fittings]);

  // Form states
  const [showFittingForm, setShowFittingForm] = useState(false);
  const [newChar, setNewChar] = useState("");
  const [newActor, setNewActor] = useState("");
  const [newDate, setNewDate] = useState("Oct 23");
  const [newTime, setNewTime] = useState("12:00 PM");

  // Cycle Continuity Status
  const cycleContinuity = (charName: string) => {
    const statuses = ["Locked", "Alert", "In Review"];
    setWardrobes((prev: typeof INITIAL_WARDROBES) => prev.map((w) => {
      if (w.char === charName) {
        const nextIndex = (statuses.indexOf(w.continuity) + 1) % statuses.length;
        return { ...w, continuity: nextIndex === 0 ? "Locked" : nextIndex === 1 ? "Alert" : "In Review" };
      }
      return w;
    }));
  };

  // Cycle Fitting Status
  const cycleFittingStatus = (index: number) => {
    setFittings((prev: typeof INITIAL_FITTINGS) => prev.map((f, i) => {
      if (i === index) {
        return { ...f, status: f.status === "Confirmed" ? "Pending" : "Confirmed" };
      }
      return f;
    }));
  };

  // Add a new fitting
  const handleAddFitting = (e: React.FormEvent) => {
    e.preventDefault();
    if (newChar.trim() && newActor.trim()) {
      setFittings((prev: typeof INITIAL_FITTINGS) => [
        { char: newChar.trim(), actor: newActor.trim(), date: newDate, time: newTime, status: "Pending" },
        ...prev
      ]);
      setNewChar("");
      setNewActor("");
      setShowFittingForm(false);
      
      // Also increment fittings count in wardrobes if character matches
      setWardrobes((prev: typeof INITIAL_WARDROBES) => prev.map((w) => {
        if (w.char.toLowerCase() === newChar.toLowerCase() || w.actor.toLowerCase() === newActor.toLowerCase()) {
          return { ...w, fittings: w.fittings + 1 };
        }
        return w;
      }));
    }
  };

  // Calculate fitting statistics
  const confirmedFittings = fittings.filter(f => f.status === "Confirmed").length;
  const pendingFittings = fittings.filter(f => f.status === "Pending").length;

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
        <h1 className="text-4xl font-display font-bold tracking-tight">Costume Department</h1>
        <p className="text-xl text-muted-foreground mt-2">Devara: Part 2 — Wardrobe & Continuity Command</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Characters", value: wardrobes.length.toString(), sub: "with active costume sheets" },
          { label: "Costume Sets", value: "47", sub: "total variations" },
          { label: "Fittings This Week", value: fittings.length.toString(), sub: `${confirmedFittings} confirmed, ${pendingFittings} pending` },
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
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-display font-bold">Character Wardrobe</h2>
            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Click Continuity to cycle</span>
          </div>
          <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 border-b border-border text-left">
                  <tr>
                    <th className="p-3 text-muted-foreground font-medium">Character</th>
                    <th className="p-3 text-muted-foreground font-medium">Scenes</th>
                    <th className="p-3 text-muted-foreground font-medium">Key Costume</th>
                    <th className="p-3 text-muted-foreground font-medium">Continuity</th>
                    <th className="p-3 text-muted-foreground font-medium text-center">Fittings</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {wardrobes.map((w, i) => (
                    <tr key={i} className="hover:bg-muted/30 transition-colors">
                      <td className="p-3">
                        <p className="font-medium text-foreground">{w.char}</p>
                        <p className="text-xs text-muted-foreground">{w.actor}</p>
                      </td>
                      <td className="p-3 font-display font-bold text-primary text-xs">{w.scenes}</td>
                      <td className="p-3 text-xs text-muted-foreground max-w-[160px]">{w.costume}</td>
                      <td className="p-3">
                        <button
                          onClick={() => cycleContinuity(w.char)}
                          className={`px-2 py-0.5 rounded text-xs font-bold transition-colors cursor-pointer border ${
                            w.continuity === "Locked" ? "bg-green-500/10 text-green-500 border-green-500/20" :
                            w.continuity === "Alert" ? "bg-destructive/10 text-destructive border-destructive/20" :
                            "bg-amber-500/10 text-amber-500 border-amber-500/20"
                          }`}
                        >
                          {w.continuity}
                        </button>
                      </td>
                      <td className="p-3 text-sm font-medium text-center text-foreground">{w.fittings}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-display font-bold">Fitting Schedule</h2>
              <button 
                onClick={() => setShowFittingForm(!showFittingForm)}
                className="p-1.5 rounded bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                {showFittingForm ? <X className="w-3 h-3" /> : <Plus className="w-3 h-3" />} Fitting
              </button>
            </div>

            <AnimatePresence>
              {showFittingForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <Card className="bg-muted/15 border-border p-4">
                    <form onSubmit={handleAddFitting} className="space-y-3">
                      <div>
                        <label className="text-[10px] uppercase font-bold text-muted-foreground block mb-1">Character Name</label>
                        <input 
                          type="text" 
                          placeholder="e.g. NTR Jr." 
                          value={newChar} 
                          onChange={(e) => setNewChar(e.target.value)}
                          className="w-full bg-background border border-border p-2 rounded text-xs text-foreground focus:outline-none focus:border-primary"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-bold text-muted-foreground block mb-1">Actor Name</label>
                        <input 
                          type="text" 
                          placeholder="e.g. N.T. Rama Rao Jr." 
                          value={newActor} 
                          onChange={(e) => setNewActor(e.target.value)}
                          className="w-full bg-background border border-border p-2 rounded text-xs text-foreground focus:outline-none focus:border-primary"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] uppercase font-bold text-muted-foreground block mb-1">Date</label>
                          <input 
                            type="text" 
                            value={newDate} 
                            onChange={(e) => setNewDate(e.target.value)}
                            className="w-full bg-background border border-border p-2 rounded text-xs text-foreground focus:outline-none focus:border-primary"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] uppercase font-bold text-muted-foreground block mb-1">Time</label>
                          <input 
                            type="text" 
                            value={newTime} 
                            onChange={(e) => setNewTime(e.target.value)}
                            className="w-full bg-background border border-border p-2 rounded text-xs text-foreground focus:outline-none focus:border-primary"
                          />
                        </div>
                      </div>
                      <button type="submit" className="w-full bg-primary text-primary-foreground text-xs font-bold py-2 rounded hover:bg-primary/90 transition-colors cursor-pointer">
                        Add Fitting Schedule
                      </button>
                    </form>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
              {fittings.map((f, i) => (
                <div key={i} className="bg-card border border-border rounded-lg p-3 hover:border-primary/30 transition-all">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <p className="font-medium text-sm text-foreground">{f.char}</p>
                      <p className="text-xs text-muted-foreground">{f.actor}</p>
                    </div>
                    <button
                      onClick={() => cycleFittingStatus(i)}
                      className={`px-2 py-0.5 rounded text-xs font-bold cursor-pointer transition-colors border ${
                        f.status === "Confirmed" 
                          ? "bg-green-500/10 text-green-500 border-green-500/20" 
                          : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                      }`}
                    >
                      {f.status}
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{f.date} at {f.time}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-display font-bold flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-destructive animate-pulse" />
              Continuity Alerts
            </h2>
            <div className="space-y-2">
              {alerts.map((a, i) => (
                <Card key={i} className={`border ${a.urgent ? "bg-destructive/5 border-destructive/30" : "bg-card border-border"}`}>
                  <CardContent className="p-3">
                    <div className="flex gap-2 items-baseline mb-1">
                      <Link href={`/scenes/${a.scene}`} className="font-bold font-display text-primary text-sm hover:underline">Scene {a.scene}</Link>
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
