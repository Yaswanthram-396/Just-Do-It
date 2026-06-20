import { useState } from "react";
import { 
  Film, Calendar, TrendingUp, Users, AlertTriangle, 
  Clock, CheckCircle2, AlertCircle, DollarSign, Activity, 
  MapPin, ShieldCheck, ShieldAlert, ArrowRight, Check, X,
  TrendingDown, FileText, ChevronRight, BarChart3, HelpCircle, ArrowLeft
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { motion } from "framer-motion";

export default function ProducerView() {
  const [approvals, setApprovals] = useState([
    { id: 1, item: "Market Set Extension (Art Dept)", req: "Sabu Cyril", amt: "₹12.5L", priority: "High", justification: "Extended climax village square shoot requirement to match revised screen script.", status: "Pending" },
    { id: 2, item: "Extra Vanity Vans (2) for Day 31-35", req: "Production", amt: "₹3.2L", priority: "Medium", justification: "Additional cast requirements for song sequence shoot.", status: "Pending" },
    { id: 3, item: "VFX Pre-viz Render Farm scaling", req: "Kamal", amt: "₹8.0L", priority: "High", justification: "Urgent preview generation for executive producer review.", status: "Pending" },
  ]);

  const handleApprove = (id: number) => {
    setApprovals(prev => prev.map(a => a.id === id ? { ...a, status: "Approved" } : a));
  };

  const handleReject = (id: number) => {
    setApprovals(prev => prev.map(a => a.id === id ? { ...a, status: "Rejected" } : a));
  };

  // Realistic Call Sheet Dummy data for read-only view
  const dummyCallSheet = {
    productionName: "Devara: Part 2",
    shootDayNum: 23,
    date: "2026-06-20",
    weather: "Overcast coastal, 28°C",
    sunrise: "05:42 AM",
    sunset: "06:34 PM",
    location: "Rajahmundry Harbour Block A",
    todayScenes: [
      { scene: "Sc 34", desc: "Rajahmundry Market Chase - Climax Confrontation setup", cast: "NTR Jr., Saif Ali Khan, 50 Extras", pages: "2 1/8" }
    ],
    castCallTimes: [
      { role: "Devara / Vara", actor: "NTR Jr.", onSet: "08:00 AM" },
      { role: "Bhaira", actor: "Saif Ali Khan", onSet: "08:30 AM" }
    ]
  };

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
        <h1 className="text-4xl font-display font-bold tracking-tight">Executive Dashboard</h1>
        <p className="text-xl text-muted-foreground mt-2">Devara: Part 2 — Producer's Command View</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Total Budget Used", value: "₹142Cr / ₹165Cr", sub: "86% of total film budget spent" },
          { label: "Schedule Progress", value: "Day 23 of 45", sub: "51% of principal photography done" },
          { label: "Sign-offs Awaiting", value: `${approvals.filter(a => a.status === "Pending").length} Requests`, sub: "Require immediate executive decision" },
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
          <div className="border border-border rounded-lg bg-card p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-display font-bold text-foreground">Budget Spend Analytics</h2>
                <p className="text-xs text-muted-foreground">Planned vs Actual Spend (Cr)</p>
              </div>
              <div className="flex gap-4 text-xs font-semibold">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-primary" /> Planned</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-primary/40" /> Actual</span>
              </div>
            </div>

            {/* Custom SVG Line Chart */}
            <div className="h-60 w-full relative mb-6">
              <svg className="w-full h-full" viewBox="0 0 600 240" fill="none">
                {[0, 60, 120, 180, 240].map((y, i) => (
                  <line key={i} x1="40" y1={y} x2="580" y2={y} stroke="#162842" strokeWidth="1.5" />
                ))}
                <text x="10" y="240" className="text-[10px] font-bold fill-[#94A3B8]">₹0Cr</text>
                <text x="10" y="180" className="text-[10px] font-bold fill-[#94A3B8]">₹40Cr</text>
                <text x="10" y="120" className="text-[10px] font-bold fill-[#94A3B8]">₹80Cr</text>
                <text x="10" y="60" className="text-[10px] font-bold fill-[#94A3B8]">₹120Cr</text>
                <text x="10" y="15" className="text-[10px] font-bold fill-[#94A3B8]">₹160Cr</text>

                <path d="M 40 240 L 140 200 L 260 150 L 380 90 L 500 50 L 580 30" stroke="#D4A64A" strokeWidth="3" strokeLinecap="round" />
                <path d="M 40 240 L 140 210 L 260 160 L 380 110" stroke="#F3C977" strokeWidth="3" strokeLinecap="round" />
                
                <circle cx="380" cy="110" r="5" fill="#F3C977" stroke="#132238" strokeWidth="2" />
                <text x="365" y="90" className="text-xs font-extrabold fill-[#F3C977]">₹142Cr</text>
              </svg>
            </div>

            <div className="grid grid-cols-3 gap-4 border-t border-border pt-4 text-center">
              <div>
                <p className="text-[10px] text-muted-foreground font-bold uppercase">Average Burn Rate</p>
                <p className="text-lg font-extrabold text-foreground">₹4.2L / day</p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground font-bold uppercase">Forecast at Completion</p>
                <p className="text-lg font-extrabold text-green-600">₹164.8Cr</p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground font-bold uppercase">Project Variance</p>
                <p className="text-lg font-extrabold text-primary">-₹0.2Cr</p>
              </div>
            </div>
          </div>

          <div className="border border-border rounded-lg bg-card p-6 shadow-sm space-y-4">
            <h2 className="text-xl font-display font-bold text-foreground">Approval Decision Center</h2>
            <div className="space-y-4">
              {approvals.map((a) => (
                <div key={a.id} className="p-4 rounded-xl border border-border bg-background hover:border-primary/20 transition-all flex flex-col gap-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-bold text-foreground">{a.item}</h4>
                      <p className="text-xs text-muted-foreground">Requested by {a.req}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-base font-bold text-foreground">{a.amt}</p>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ${
                        a.priority === 'High' ? 'bg-destructive/10 text-destructive' : 'bg-primary/10 text-primary'
                      }`}>
                        {a.priority} Priority
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed bg-card p-2.5 rounded-lg border border-border">
                    <span className="font-bold text-foreground">Justification:</span> {a.justification}
                  </p>

                  <div className="flex justify-between items-center pt-2">
                    <span className={`text-xs font-bold uppercase ${
                      a.status === 'Approved' ? 'text-green-600' :
                      a.status === 'Rejected' ? 'text-destructive' :
                      'text-muted-foreground'
                    }`}>
                      Status: {a.status}
                    </span>
                    {a.status === "Pending" ? (
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleReject(a.id)}
                          className="px-3.5 py-1.5 bg-card border border-border text-xs font-bold rounded-lg hover:bg-destructive/10 hover:text-destructive transition-colors flex items-center gap-1 text-foreground"
                        >
                          <X className="w-3.5 h-3.5" /> Reject
                        </button>
                        <button 
                          onClick={() => handleApprove(a.id)}
                          className="px-3.5 py-1.5 bg-primary text-primary-foreground text-xs font-bold rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-1"
                        >
                          <Check className="w-3.5 h-3.5" /> Approve
                        </button>
                      </div>
                    ) : (
                      <span className="text-[10px] font-bold text-muted-foreground">Action logged</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="border border-border rounded-lg bg-card p-5 shadow-sm space-y-4">
            <h2 className="text-xl font-display font-bold flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-destructive" /> Executive Escalations
            </h2>
            <div className="space-y-3">
              {[
                { type: "Permit Risks", desc: "Hospital permit expires tomorrow at 18:00. Renewal is delayed at municipal desk.", status: "Critical" },
                { type: "Vendor Risks", desc: "Devi Transport reports 2 logistical vehicles delayed in Chennai transit corridor.", status: "Warning" },
                { type: "Budget Risks", desc: "Sabu Cyril reports steel & timber costs escalated +5.2% for climax set construction.", status: "Notice" },
                { type: "Schedule Risks", desc: "NTR Jr. unavailable Shoot Day 27 due to pre-scheduled promotional dates.", status: "Urgent" },
              ].map((alert, idx) => (
                <div key={idx} className="p-3 border border-border rounded-xl bg-background flex flex-col gap-1 hover:border-destructive/20 transition-all">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-foreground">{alert.type}</span>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${
                      alert.status === 'Critical' ? 'bg-destructive/20 text-destructive' :
                      alert.status === 'Urgent' ? 'bg-primary/20 text-primary' :
                      'bg-primary/10 text-primary'
                    }`}>
                      {alert.status}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{alert.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-border rounded-lg bg-card p-5 shadow-sm space-y-4">
            <h2 className="text-xl font-display font-bold">Major Cost Drivers</h2>
            <div className="space-y-3.5">
              {[
                { label: "Cast & Talents", allocated: "₹65Cr", spent: "₹60Cr", pct: 92 },
                { label: "VFX Pipeline & Renders", allocated: "₹45Cr", spent: "₹38Cr", pct: 84 },
                { label: "Set Design & Art", allocated: "₹22Cr", spent: "₹21Cr", pct: 95 },
                { label: "Logistics & Transport", allocated: "₹21Cr", spent: "₹18Cr", pct: 85 },
                { label: "Locations", allocated: "₹12Cr", spent: "₹5Cr", pct: 41 },
              ].map((driver, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-foreground">{driver.label}</span>
                    <span className="text-muted-foreground">{driver.spent} / {driver.allocated}</span>
                  </div>
                  <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${driver.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-border rounded-lg bg-card p-5 shadow-sm space-y-3">
            <h2 className="text-xl font-display font-bold">Risk Heatmap</h2>
            <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-bold">
              <div className="p-2.5 bg-destructive/10 border border-destructive/20 rounded-xl text-destructive flex flex-col justify-between h-20">
                <span className="uppercase font-bold opacity-80">High Risk</span>
                <span className="font-bold leading-tight">VFX & Cast Dates</span>
              </div>
              <div className="p-2.5 bg-primary/10 border border-primary/20 rounded-xl text-primary flex flex-col justify-between h-20">
                <span className="uppercase font-bold opacity-80">Med Risk</span>
                <span className="font-bold leading-tight">Weather & Location</span>
              </div>
              <div className="p-2.5 bg-green-500/10 border border-green-500/20 rounded-xl text-green-600 flex flex-col justify-between h-20">
                <span className="uppercase font-bold opacity-80">Low Risk</span>
                <span className="font-bold leading-tight">Catering & Logistics</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
