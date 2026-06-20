import { useState } from "react";
import { 
  Film, Calendar, TrendingUp, Users, AlertTriangle, 
  Clock, CheckCircle2, AlertCircle, DollarSign, Activity, 
  MapPin, ShieldCheck, ShieldAlert, ArrowRight, Check, X,
  TrendingDown, FileText, ChevronRight, BarChart3, HelpCircle
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

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
    <div className="p-4 md:p-8 max-w-[1600px] mx-auto min-h-screen bg-background text-foreground flex flex-col gap-6 md:gap-8">
      
      {/* Executive Welcome Header */}
      <header className="relative overflow-hidden rounded-[20px] border border-border bg-card p-6 shadow-md">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-80 pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl font-display font-extrabold tracking-tight text-foreground">Good morning, Rana Ji.</h1>
            <p className="text-sm text-muted-foreground font-medium">
              Here is the executive overview for <strong className="text-primary">Devara: Part 2</strong>. Budget and Schedule are stable.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="px-4 py-2 bg-primary/10 rounded-xl border border-primary/20 text-primary text-xs font-bold flex items-center gap-2">
              <Film className="w-3.5 h-3.5" /> ₹165Cr Project Scope
            </div>
            <div className="px-4 py-2 bg-card rounded-xl border border-border text-muted-foreground text-xs font-bold flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5" /> Day 23 of 45
            </div>
          </div>
        </div>
      </header>

      {/* Executive KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: "Schedule Health", value: "87%", status: "On Track", icon: Activity, color: "text-success", bg: "bg-success/5 border-success/10" },
          { label: "Budget Usage", value: "₹142Cr", status: "of ₹165Cr (86%)", icon: DollarSign, color: "text-primary", bg: "bg-primary/5 border-primary/10" },
          { label: "Days Buffer", value: "+2 Days", status: "Available Buffer", icon: ShieldCheck, color: "text-primary", bg: "bg-primary/5 border-primary/10" },
          { label: "Pending Approvals", value: approvals.filter(a => a.status === "Pending").length.toString(), status: "Actions Required", icon: FileText, color: "text-destructive", bg: "bg-destructive/5 border-destructive/10" },
          { label: "Production Risk", value: "Medium", status: "2 Critical Risks", icon: AlertTriangle, color: "text-primary", bg: "bg-card border-border" }
        ].map((kpi, idx) => (
          <div key={idx} className={`border border-border rounded-[20px] p-5 bg-card shadow-sm flex flex-col justify-between hover:translate-y-[-2px] transition-transform duration-200 ${kpi.bg}`}>
            <div className="flex justify-between items-start">
              <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">{kpi.label}</span>
              <div className="p-1.5 rounded-lg bg-background border border-border shadow-xs">
                <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
              </div>
            </div>
            <div className="mt-4 space-y-0.5">
              <span className="text-2xl font-display font-extrabold tracking-tight text-foreground">{kpi.value}</span>
              <p className="text-[10px] font-semibold text-muted-foreground">{kpi.status}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (col-span-7) */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Budget Analytics widget */}
          <div className="border border-border rounded-[20px] bg-card p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-base font-bold text-foreground">Budget Analytics</h2>
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
                <p className="text-lg font-extrabold text-success">₹164.8Cr</p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground font-bold uppercase">Project Variance</p>
                <p className="text-lg font-extrabold text-primary">-₹0.2Cr</p>
              </div>
            </div>
          </div>

          {/* Approval Decision Center */}
          <div className="border border-border rounded-[20px] bg-card p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-base font-bold text-foreground">Approval Decision Center</h2>
                <p className="text-xs text-muted-foreground">Decisions impacting project budget & timelines</p>
              </div>
              <span className="text-xs font-bold text-destructive bg-destructive/10 px-2.5 py-1 rounded-full">
                {approvals.filter(a => a.status === "Pending").length} Actions Required
              </span>
            </div>

            <div className="space-y-4">
              {approvals.map((a) => (
                <div key={a.id} className="p-4 rounded-xl border border-border bg-background hover:border-primary/20 transition-all flex flex-col gap-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-extrabold text-foreground">{a.item}</h4>
                      <p className="text-xs text-muted-foreground font-semibold">Requested by {a.req}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-base font-extrabold text-foreground">{a.amt}</p>
                      <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase ${
                        a.priority === 'High' ? 'bg-destructive/10 text-destructive' : 'bg-primary/10 text-primary'
                      }`}>
                        {a.priority} Priority
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground font-medium bg-card p-2.5 rounded-lg border border-border">
                    <span className="font-bold text-foreground">Justification:</span> {a.justification}
                  </p>

                  <div className="flex justify-between items-center pt-2">
                    <span className={`text-xs font-bold uppercase ${
                      a.status === 'Approved' ? 'text-success' :
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

          {/* Producer Read-Only Call Sheet Overview */}
          <div className="border border-border rounded-[20px] bg-card p-6 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-base font-bold text-foreground">Today's Call Sheet Overview (Read-Only)</h2>
              <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">Day {dummyCallSheet.shootDayNum}</span>
            </div>
            
            <div className="p-4 rounded-xl border border-border bg-background space-y-4 text-xs">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-muted-foreground">
                <div>
                  <span className="font-bold text-foreground block">Production Name</span>
                  {dummyCallSheet.productionName}
                </div>
                <div>
                  <span className="font-bold text-foreground block">Date</span>
                  {dummyCallSheet.date}
                </div>
                <div>
                  <span className="font-bold text-foreground block">Location</span>
                  {dummyCallSheet.location}
                </div>
                <div>
                  <span className="font-bold text-foreground block">Weather</span>
                  {dummyCallSheet.weather}
                </div>
              </div>

              <div className="border-t border-border pt-3">
                <span className="font-bold text-foreground block mb-2">Scenes Scheduled Today</span>
                {dummyCallSheet.todayScenes.map((s, idx) => (
                  <div key={idx} className="flex justify-between items-start bg-card/45 border border-border rounded-lg p-2.5">
                    <div>
                      <p className="font-bold text-primary">{s.scene}: {s.desc}</p>
                      <p className="text-[10px] text-muted-foreground">Cast: {s.cast}</p>
                    </div>
                    <span className="font-semibold text-foreground shrink-0">{s.pages} pgs</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-3">
                <span className="font-bold text-foreground block mb-2">Key Cast Set Call Times</span>
                <div className="space-y-1.5">
                  {dummyCallSheet.castCallTimes.map((c, idx) => (
                    <div key={idx} className="flex justify-between text-muted-foreground">
                      <span>{c.role} ({c.actor})</span>
                      <span className="font-bold text-foreground">{c.onSet}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column (col-span-5) */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Executive Alerts Center */}
          <div className="border border-border rounded-[20px] bg-card p-6 shadow-sm">
            <h2 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
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
                    <span className="text-xs font-extrabold text-foreground">{alert.type}</span>
                    <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded ${
                      alert.status === 'Critical' ? 'bg-destructive/20 text-destructive' :
                      alert.status === 'Urgent' ? 'bg-primary/20 text-primary' :
                      'bg-primary/10 text-primary'
                    }`}>
                      {alert.status}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground font-medium leading-relaxed">{alert.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Major Cost Drivers */}
          <div className="border border-border rounded-[20px] bg-card p-6 shadow-sm">
            <h2 className="text-base font-bold text-foreground mb-4">Major Cost Drivers</h2>
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

          {/* Risk Heatmap */}
          <div className="border border-border rounded-[20px] bg-card p-6 shadow-sm">
            <h2 className="text-base font-bold text-foreground mb-3">Risk Heatmap</h2>
            <div className="grid grid-cols-3 gap-2.5 text-center text-xs font-bold">
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-xl text-destructive">
                <p className="text-[10px] uppercase font-bold text-destructive/80">High Risk</p>
                <p className="text-xs font-extrabold mt-1">VFX & Cast Dates</p>
              </div>
              <div className="p-3 bg-primary/10 border border-primary/20 rounded-xl text-primary">
                <p className="text-[10px] uppercase font-bold text-primary/80">Med Risk</p>
                <p className="text-xs font-extrabold mt-1">Weather & Location</p>
              </div>
              <div className="p-3 bg-success/10 border border-success/20 rounded-xl text-success">
                <p className="text-[10px] uppercase font-bold text-success/80">Low Risk</p>
                <p className="text-xs font-extrabold mt-1">Catering & Logistics</p>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
