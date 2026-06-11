import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const props = [
  { item: "Merchant Cart (wooden)", scenes: "34, 35", status: "Confirmed", vendor: "Roja Art Works", cat: "Furniture" },
  { item: "Fish boxes (x12)", scenes: "34", status: "Confirmed", vendor: "Local Market HYD", cat: "Prop" },
  { item: "Boat rope (hemp, 30m)", scenes: "34, 78", status: "Sourcing", vendor: "Marine Supplies Vizag", cat: "Prop" },
  { item: "Wooden crates (x6)", scenes: "34, 35", status: "Confirmed", vendor: "Roja Art Works", cat: "Furniture" },
  { item: "Palace chandelier (replica)", scenes: "12", status: "Confirmed", vendor: "Set Design Studio", cat: "Set Piece" },
  { item: "Period weapons (replica, x8)", scenes: "41, 67", status: "Sourcing", vendor: "Props Unlimited", cat: "Weapon" },
  { item: "Wedding mandap setup", scenes: "55", status: "In Progress", vendor: "Event Décor HYD", cat: "Set Piece" },
  { item: "Hospital equipment (x14)", scenes: "71", status: "Confirmed", vendor: "Med Props India", cat: "Prop" },
  { item: "Villain throne (custom)", scenes: "41, 89", status: "In Progress", vendor: "Custom Carpentry", cat: "Furniture" },
  { item: "Helicopter (toy replica, VFX)", scenes: "103", status: "Missing", vendor: "VFX Studio Mumbai", cat: "VFX Prop" },
  { item: "River boat (practical)", scenes: "78", status: "Confirmed", vendor: "Godavari Boats", cat: "Vehicle" },
  { item: "Street food stalls (x4)", scenes: "34", status: "Confirmed", vendor: "Local Build Team", cat: "Set Piece" },
];

const locations = [
  { name: "Rajahmundry Fish Market", dressing: "Complete", shoot: "Day 31", scene: "34" },
  { name: "Palace Interior (Studio Set)", dressing: "In Progress", shoot: "Day 23", scene: "12" },
  { name: "Wedding Temple (Exterior)", dressing: "Complete", shoot: "Day 27", scene: "55" },
  { name: "Hospital Ward (Set Build)", dressing: "In Progress", shoot: "Day 29", scene: "71" },
  { name: "River Ghat (Practical)", dressing: "Pending", shoot: "Day 30", scene: "78" },
];

const construction = [
  { set: "Palace Throne Room", progress: 88, deadline: "Oct 14" },
  { set: "Villain's Hideout Interior", progress: 62, deadline: "Oct 18" },
  { set: "Climax Cliff Facade", progress: 35, deadline: "Oct 22" },
];

export default function ProductionDesignerView() {
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
        <h1 className="text-4xl font-display font-bold tracking-tight">Art Department</h1>
        <p className="text-xl text-muted-foreground mt-2">Devara: Part 2 — Production Design</p>
      </header>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Active Props", value: "147", sub: "across all scenes" },
          { label: "Scenes Dressed", value: "34 / 89", sub: "shot scenes" },
          { label: "Pending Sourcing", value: "23", sub: "items unconfirmed" },
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
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-display font-bold">Props Master List</h2>
            <div className="flex gap-2">
              {["All", "Prop", "Set Piece", "Furniture"].map(f => (
                <button key={f} className="px-3 py-1 rounded text-xs font-semibold bg-muted text-muted-foreground hover:bg-muted/80 transition-colors">{f}</button>
              ))}
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 border-b border-border text-left">
                <tr>
                  <th className="p-3 text-muted-foreground font-medium">Item</th>
                  <th className="p-3 text-muted-foreground font-medium">Scene(s)</th>
                  <th className="p-3 text-muted-foreground font-medium">Category</th>
                  <th className="p-3 text-muted-foreground font-medium">Vendor</th>
                  <th className="p-3 text-muted-foreground font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {props.map((p, i) => (
                  <tr key={i} className="hover:bg-muted/30 transition-colors">
                    <td className="p-3 font-medium">{p.item}</td>
                    <td className="p-3 font-display font-bold text-primary text-xs">{p.scenes}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 bg-muted text-muted-foreground rounded text-xs">{p.cat}</span>
                    </td>
                    <td className="p-3 text-xs text-muted-foreground">{p.vendor}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                        p.status === "Confirmed" ? "bg-green-500/10 text-green-600" :
                        p.status === "In Progress" ? "bg-primary/10 text-primary" :
                        p.status === "Missing" ? "bg-destructive/10 text-destructive" :
                        "bg-amber-500/10 text-amber-600"
                      }`}>{p.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <h2 className="text-xl font-display font-bold">Location Set Status</h2>
            <div className="space-y-2">
              {locations.map((l, i) => (
                <div key={i} className="bg-card border border-border rounded-lg p-3">
                  <div className="flex justify-between items-start mb-1">
                    <p className="font-medium text-sm">{l.name}</p>
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                      l.dressing === "Complete" ? "bg-green-500/10 text-green-600" :
                      l.dressing === "In Progress" ? "bg-primary/10 text-primary" :
                      "bg-amber-500/10 text-amber-600"
                    }`}>{l.dressing}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Shoot Day {l.shoot} — <Link href="/scenes/34" className="text-primary hover:underline">Scene {l.scene}</Link></p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-display font-bold">Set Construction</h2>
            <div className="space-y-3">
              {construction.map((c, i) => (
                <div key={i} className="bg-card border border-border rounded-lg p-4">
                  <div className="flex justify-between items-baseline mb-2">
                    <p className="font-medium text-sm">{c.set}</p>
                    <span className="text-xs text-muted-foreground">Due {c.deadline}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Progress value={c.progress} className="flex-1 h-2" />
                    <span className="text-sm font-bold font-display">{c.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
