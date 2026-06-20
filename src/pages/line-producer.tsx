import { useState } from "react";
import { Link } from "wouter";
import { 
  Film, Calendar, TrendingDown, Users, AlertTriangle, 
  Clock, CheckCircle2, AlertCircle, DollarSign, Activity, 
  MapPin, CloudRain, ShieldCheck, ShieldAlert, ArrowRight, Info, ArrowLeft
} from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

export default function LineProducerView() {
  const [selectedSceneFilter, setSelectedSceneFilter] = useState("All");

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
        <h1 className="text-4xl font-display font-bold tracking-tight">Production operations</h1>
        <p className="text-xl text-muted-foreground mt-2">Devara: Part 2 — Line Producer Command</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Shoot Day", value: "Day 23 of 45", sub: "Active day of principal photography" },
          { label: "Scenes Completed", value: "18 / 24", sub: "75% daily target reached" },
          { label: "Budget Variance", value: "-2.4%", sub: "Under track budget target" },
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
            <h2 className="text-xl font-display font-bold">Daily Scene Readiness Checklist</h2>
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                <thead className="bg-muted/50 border-b border-border text-left">
                  <tr>
                    <th className="p-3 text-muted-foreground font-medium">Scene</th>
                    <th className="p-3 text-muted-foreground font-medium">Readiness</th>
                    <th className="p-3 text-muted-foreground font-medium text-center">Cast</th>
                    <th className="p-3 text-muted-foreground font-medium text-center">Props</th>
                    <th className="p-3 text-muted-foreground font-medium text-center">Costumes</th>
                    <th className="p-3 text-muted-foreground font-medium text-center">Location</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    { id: 34, title: "Rajahmundry Market", pct: 85, chars: true, props: true, costumes: true, locs: false },
                    { id: 41, title: "Confrontation Hideout", pct: 92, chars: true, props: true, costumes: true, locs: true },
                    { id: 67, title: "Chase Streets", pct: 75, chars: true, props: true, costumes: false, locs: true },
                    { id: 71, title: "Hospital Room", pct: 100, chars: true, props: true, costumes: true, locs: true },
                    { id: 78, title: "Boat Fight River", pct: 80, chars: true, props: false, costumes: true, locs: true },
                  ].map((scene) => (
                    <tr key={scene.id} className="hover:bg-muted/30 transition-colors">
                      <td className="p-3">
                        <span className="font-semibold text-xs text-foreground block">Scene {scene.id}</span>
                        <span className="text-xs text-muted-foreground">{scene.title}</span>
                      </td>
                      <td className="p-3 font-semibold font-display text-primary">{scene.pct}%</td>
                      <td className="p-3 text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${scene.chars ? "bg-green-500/10 text-green-600" : "bg-destructive/10 text-destructive"}`}>{scene.chars ? "Ready" : "Alert"}</span>
                      </td>
                      <td className="p-3 text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${scene.props ? "bg-green-500/10 text-green-600" : "bg-destructive/10 text-destructive"}`}>{scene.props ? "Ready" : "Alert"}</span>
                      </td>
                      <td className="p-3 text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${scene.costumes ? "bg-green-500/10 text-green-600" : "bg-destructive/10 text-destructive"}`}>{scene.costumes ? "Ready" : "Alert"}</span>
                      </td>
                      <td className="p-3 text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${scene.locs ? "bg-green-500/10 text-green-600" : "bg-destructive/10 text-destructive"}`}>{scene.locs ? "Ready" : "Alert"}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

          <div className="space-y-3">
            <h2 className="text-xl font-display font-bold">Resource Conflict Command Center</h2>
            <div className="space-y-3">
              <div className="p-4 rounded-xl border border-l-4 border-l-destructive border-border bg-destructive/5 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-destructive">
                  <AlertCircle className="w-4 h-4" /> Scene 34 Equipment Overlap
                </div>
                <p className="text-xs font-bold text-foreground">
                  "Merchant Cart" is booked concurrently:
                </p>
                <ul className="text-xs text-muted-foreground list-disc list-inside space-y-1 font-semibold pl-1">
                  <li>Scene 34 (Rajahmundry Market)</li>
                  <li>Scene 41 (Confrontation Hideout)</li>
                </ul>
                <div className="text-[11px] font-bold text-primary bg-primary/10 rounded-lg p-2 border border-primary/20 mt-1">
                  Conflict: Both scheduled on Shoot Day 24. Re-allocation required.
                </div>
              </div>

              <div className="p-4 rounded-xl border border-l-4 border-l-primary border-border bg-primary/5 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-primary">
                  <AlertTriangle className="w-4 h-4" /> Hospital Location Permit
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-bold text-foreground">District General Permit Expiring</p>
                    <p className="text-xs text-muted-foreground font-medium">Expiration: Tomorrow at 18:00</p>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-primary/20 text-primary text-[9px] font-bold uppercase">
                    Urgent
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground font-medium">
                  Renewals team notified. Approval signature required from production head.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <h2 className="text-xl font-display font-bold">Shoot Readiness Score</h2>
            <Card className="bg-card border-border">
              <CardContent className="p-6 flex flex-col items-center justify-center space-y-4">
                <div className="relative flex items-center justify-center">
                  <svg className="w-24 h-24 transform -rotate-90">
                    <circle cx="48" cy="48" r="40" stroke="var(--border)" strokeWidth="6" fill="transparent" />
                    <circle cx="48" cy="48" r="40" stroke="var(--primary)" strokeWidth="6" fill="transparent" 
                      strokeDasharray={2 * Math.PI * 40} 
                      strokeDashoffset={2 * Math.PI * 40 * (1 - 0.92)} 
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute text-2xl font-extrabold text-foreground">92%</span>
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold text-foreground">Ready for Tomorrow</p>
                  <p className="text-xs text-muted-foreground mt-1">1 critical warning outstanding regarding VFX coordinates.</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-display font-bold">Key Vendor Status</h2>
            <div className="space-y-2">
              <div className="p-3 border border-border rounded-xl bg-card flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  <div>
                    <h4 className="text-xs font-bold text-foreground">Sri Sai Catering</h4>
                    <p className="text-[10px] text-muted-foreground">Lunch Confirmed • Ready</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-green-600 bg-green-500/10 px-2 py-0.5 rounded-md">
                  Active
                </span>
              </div>

              <div className="p-3 border border-border rounded-xl bg-card flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                  <div>
                    <h4 className="text-xs font-bold text-foreground">Generators Co.</h4>
                    <p className="text-[10px] text-primary font-bold">Fuel Low • Refuel Required</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                  Alert
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-display font-bold">Weather & Location Risk</h2>
            <Card className="bg-card border-border">
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <p className="text-xs font-bold text-foreground">Rajahmundry Outdoor Set</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">Current weather</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-extrabold text-primary">31°C</p>
                  <p className="text-[10px] text-muted-foreground font-bold uppercase mt-0.5">Scatter Clouds</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
