import { useState } from "react";
import { Link } from "wouter";
import { 
  Film, Calendar, TrendingDown, Users, AlertTriangle, 
  Clock, CheckCircle2, AlertCircle, DollarSign, Activity, 
  MapPin, CloudRain, ShieldCheck, ShieldAlert, ArrowRight, Info
} from "lucide-react";
import { motion } from "framer-motion";

export default function LineProducerView() {
  const [selectedSceneFilter, setSelectedSceneFilter] = useState("All");

  return (
    <div className="p-4 md:p-8 max-w-[1600px] mx-auto min-h-screen bg-background text-foreground flex flex-col gap-6">
      
      {/* Hero Header Section */}
      <div className="relative overflow-hidden rounded-[20px] border border-border bg-card p-6 shadow-sm">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-85 pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
              <Activity className="w-3.5 h-3.5" /> Line Producer Terminal
            </div>
            <h1 className="text-2xl md:text-3xl font-display font-bold tracking-tight text-foreground">Production Command Center</h1>
            <p className="text-xs text-muted-foreground font-medium max-w-xl">
              Real-time operational dashboard for monitoring budgets, conflicts, timeline, and vendors.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-success">
            <span className="w-2.5 h-2.5 rounded-full bg-success animate-pulse"></span>
            <span>Live Sync Active</span>
          </div>
        </div>
      </div>

      {/* Top Row: Executive KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: "Shoot Day", value: "Day 23", detail: "Active Day of 45", icon: Calendar, color: "text-primary", bg: "bg-primary/5 border-primary/10" },
          { label: "Scenes Completed", value: "18 / 24", detail: "75% Target Reached", icon: Film, color: "text-primary", bg: "bg-primary/5 border-primary/10" },
          { label: "Budget Variance", value: "-2.4%", detail: "Under Track Target", icon: TrendingDown, color: "text-success", bg: "bg-success/5 border-success/10" },
          { label: "Vendors Health", value: "12 Active", detail: "1 Delayed, 1 Low Fuel", icon: Users, color: "text-primary", bg: "bg-card border-border" },
          { label: "Active Risks", value: "3 Alerts", detail: "Requires Attention", icon: AlertTriangle, color: "text-destructive", bg: "bg-destructive/5 border-destructive/10" },
        ].map((kpi, idx) => (
          <div 
            key={idx} 
            className={`border border-border rounded-[20px] p-5 shadow-sm flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 bg-card ${kpi.bg || ""}`}
          >
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{kpi.label}</span>
              <div className="p-1.5 rounded-lg bg-background border border-border shadow-xs">
                <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
              </div>
            </div>
            <div className="mt-3 space-y-0.5">
              <span className="text-2xl font-display font-extrabold tracking-tight text-foreground">{kpi.value}</span>
              <p className="text-[10px] font-semibold text-muted-foreground">{kpi.detail}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid: 3-column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Readiness, Budget, Shoot Score (col-span-4) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Shoot Readiness Score Widget */}
          <div className="border border-border rounded-[20px] bg-card p-5 shadow-sm">
            <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-primary" /> Shoot Readiness Score
            </h2>
            <div className="flex items-center gap-5 mb-4">
              <div className="relative flex items-center justify-center">
                <svg className="w-20 h-20 transform -rotate-90">
                  <circle cx="40" cy="40" r="34" stroke="var(--border)" strokeWidth="6" fill="transparent" />
                  <circle cx="40" cy="40" r="34" stroke="var(--primary)" strokeWidth="6" fill="transparent" 
                    strokeDasharray={2 * Math.PI * 34} 
                    strokeDashoffset={2 * Math.PI * 34 * (1 - 0.92)} 
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute text-lg font-extrabold text-foreground">92%</span>
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">Ready for Tomorrow</p>
                <p className="text-xs text-muted-foreground">1 critical warning outstanding regarding VFX coordinates.</p>
              </div>
            </div>
            <div className="space-y-2 text-xs font-semibold text-muted-foreground">
              <div className="flex justify-between items-center py-1.5 border-b border-border">
                <span className="flex items-center gap-2">🟢 Characters</span>
                <span className="text-success">✓ Confirmed</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-border">
                <span className="flex items-center gap-2">🟢 Props & Sets</span>
                <span className="text-success">✓ Verified</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-border">
                <span className="flex items-center gap-2">🟢 Costumes</span>
                <span className="text-success">✓ Ready</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-border">
                <span className="flex items-center gap-2">🟢 Locations</span>
                <span className="text-success">✓ Permits OK</span>
              </div>
              <div className="flex justify-between items-center py-1.5">
                <span className="flex items-center gap-2">🔴 VFX Supervisor Match</span>
                <span className="text-destructive">⚠ Awaiting Setup</span>
              </div>
            </div>
          </div>

          {/* Breakdown Completeness Section */}
          <div className="border border-border rounded-[20px] bg-card p-5 shadow-sm flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <Film className="w-4 h-4 text-primary" /> Breakdown Completeness
              </h2>
              <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">5 Scenes</span>
            </div>
            
            <div className="space-y-3.5">
              {[
                { id: 34, title: "Rajahmundry Market", pct: 85, chars: true, props: true, costumes: true, locs: false },
                { id: 41, title: "Confrontation Hideout", pct: 92, chars: true, props: true, costumes: true, locs: true },
                { id: 67, title: "Chase Streets", pct: 75, chars: true, props: true, costumes: false, locs: true },
                { id: 71, title: "Hospital Room", pct: 100, chars: true, props: true, costumes: true, locs: true },
                { id: 78, title: "Boat Fight River", pct: 80, chars: true, props: false, costumes: true, locs: true },
              ].map((scene) => (
                <div key={scene.id} className="p-3 rounded-xl border border-border bg-background hover:border-primary/30 transition-all">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-extrabold text-foreground">Scene {scene.id}</span>
                    <span className="text-xs font-bold text-primary">{scene.pct}%</span>
                  </div>
                  
                  <div className="h-1.5 w-full bg-border rounded-full overflow-hidden mb-2.5">
                    <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full" style={{ width: `${scene.pct}%` }} />
                  </div>
                  
                  <div className="grid grid-cols-4 gap-1 text-[9px] font-bold text-center">
                    <span className={`px-1 py-0.5 rounded ${scene.chars ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive'}`}>
                      Char {scene.chars ? '✓' : '⚠'}
                    </span>
                    <span className={`px-1 py-0.5 rounded ${scene.props ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive'}`}>
                      Props {scene.props ? '✓' : '⚠'}
                    </span>
                    <span className={`px-1 py-0.5 rounded ${scene.costumes ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive'}`}>
                      Cost {scene.costumes ? '✓' : '⚠'}
                    </span>
                    <span className={`px-1 py-0.5 rounded ${scene.locs ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive'}`}>
                      Locs {scene.locs ? '✓' : '⚠'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Center Column: Resource Conflicts & Timeline (col-span-5) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Resource Conflict Command Center */}
          <div className="border border-border rounded-[20px] bg-card p-5 shadow-sm flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-destructive flex items-center gap-2">
                <ShieldAlert className="w-4 h-4" /> Resource Conflicts
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-destructive/20 text-destructive text-[10px] font-extrabold">
                3 Critical
              </span>
            </div>

            <div className="space-y-4">
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

          {/* Today's Production Timeline */}
          <div className="border border-border rounded-[20px] bg-card p-5 shadow-sm flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" /> Today's Shoot Timeline
              </h2>
              <span className="text-[10px] font-bold text-muted-foreground">Shoot Day 23</span>
            </div>

            <div className="relative pl-6 border-l border-border space-y-6 my-2">
              {[
                { time: "08:00", title: "Technical Crew Setup", desc: "Lighting, Camera rigs placement at Rajahmundry Market", type: "setup" },
                { time: "09:30", title: "Scene 34 Shooting - Take 1", desc: "Merchant Cart movement. Main cast in position", type: "shoot" },
                { time: "11:00", title: "Scene 41 Prep & Shooting", desc: "Interiors hideout dialogue sequence", type: "shoot" },
                { time: "13:00", title: "Lunch Break", desc: "Sri Sai Catering - On set serving", type: "break" },
                { time: "14:00", title: "Scene 67 Chase Sequence", desc: "Action sequence, safety vehicles standby", type: "shoot" },
                { time: "17:00", title: "Daily Wrap & Data Backup", desc: "Continuity cards log, cards shipped to post-prod", type: "wrap" },
              ].map((item, idx) => (
                <div key={idx} className="relative">
                  <span className={`absolute -left-[31px] top-1 w-2.5 h-2.5 rounded-full border-2 border-background ring-4 ring-offset-0 ${
                    item.type === 'setup' ? 'bg-primary ring-primary/20' :
                    item.type === 'shoot' ? 'bg-primary ring-primary/25' :
                    item.type === 'break' ? 'bg-success ring-success/20' :
                    'bg-muted ring-muted-foreground/10'
                  }`} />
                  
                  <div className="flex items-start gap-4">
                    <span className="text-xs font-bold text-muted-foreground w-10 shrink-0 pt-0.5">{item.time}</span>
                    <div className="space-y-0.5">
                      <p className="text-xs font-extrabold text-foreground">{item.title}</p>
                      <p className="text-xs text-muted-foreground font-medium">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Vendor Health, Activity, Weather (col-span-3) */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          
          {/* Vendor Health Dashboard */}
          <div className="border border-border rounded-[20px] bg-card p-5 shadow-sm flex flex-col">
            <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" /> Vendor Status
            </h2>

            <div className="space-y-3">
              <div className="p-3 border border-border rounded-xl bg-background flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-success" />
                  <div>
                    <h4 className="text-xs font-extrabold text-foreground">Sri Sai Catering</h4>
                    <p className="text-[10px] text-muted-foreground font-bold">Lunch Confirmed • Ready</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-success bg-success/20 px-2 py-0.5 rounded-md">
                  Active
                </span>
              </div>

              <div className="p-3 border border-border rounded-xl bg-background flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                  <div>
                    <h4 className="text-xs font-extrabold text-foreground">Generators Co.</h4>
                    <p className="text-[10px] text-primary font-bold">Fuel Low • Refuel Required</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-primary bg-primary/20 px-2 py-0.5 rounded-md">
                  Alert
                </span>
              </div>
            </div>
          </div>

          {/* Weather & Location Risk Widget */}
          <div className="border border-border rounded-[20px] bg-card p-5 shadow-sm flex flex-col">
            <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
              <CloudRain className="w-4 h-4 text-primary" /> Weather & Location
            </h2>
            <div className="flex justify-between items-center mb-3">
              <div>
                <p className="text-xs font-extrabold text-foreground">Rajahmundry Outdoor Set</p>
                <p className="text-[11px] text-muted-foreground font-medium">Current temperature</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-extrabold text-primary">31°C</p>
                <p className="text-[10px] text-muted-foreground font-bold uppercase">Scatter Clouds</p>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
