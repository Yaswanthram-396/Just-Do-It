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

  return (
    <div className="p-6 md:p-8 max-w-[1600px] mx-auto min-h-screen bg-[#FAFAFC] text-[#1A1A1A] flex flex-col gap-8">
      
      {/* Executive Welcome Header */}
      <header className="relative overflow-hidden rounded-[20px] border border-[#E5E7EB] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFF4E8] to-[#FFFFFF] opacity-80 pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-display font-extrabold tracking-tight text-[#1A1A1A]">Good morning, Rana Ji.</h1>
            <p className="text-sm text-[#6B7280] font-medium">
              Here is the executive overview for <strong className="text-[#FF7A00]">Devara: Part 2</strong>. Budget and Schedule are stable.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="px-4 py-2 bg-[#FFF4E8] rounded-xl border border-[#FF7A00]/20 text-[#FF7A00] text-xs font-bold flex items-center gap-2">
              <Film className="w-3.5 h-3.5" /> ₹165Cr Project Scope
            </div>
            <div className="px-4 py-2 bg-white rounded-xl border border-[#E5E7EB] text-[#6B7280] text-xs font-bold flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5" /> Day 23 of 45
            </div>
          </div>
        </div>
      </header>

      {/* Executive KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: "Schedule Health", value: "87%", status: "On Track", icon: Activity, color: "text-[#22C55E]", bg: "bg-[#ECFDF3]/50 border-[#22C55E]/10" },
          { label: "Budget Usage", value: "₹142Cr", status: "of ₹165Cr (86%)", icon: DollarSign, color: "text-[#FF7A00]", bg: "bg-[#FFF4E8]/60 border-[#FF7A00]/10" },
          { label: "Days Buffer", value: "+2 Days", status: "Available Buffer", icon: ShieldCheck, color: "text-[#3B82F6]", bg: "bg-[#EAF3FF]/40 border-[#3B82F6]/10" },
          { label: "Pending Approvals", value: approvals.filter(a => a.status === "Pending").length.toString(), status: "Actions Required", icon: FileText, color: "text-[#EF4444]", bg: "bg-[#FEF2F2] border-[#EF4444]/15" },
          { label: "Production Risk", value: "Medium", status: "2 Critical Risks", icon: AlertTriangle, color: "text-amber-500", bg: "bg-white border-[#E5E7EB]" }
        ].map((kpi, idx) => (
          <div key={idx} className={`border border-[#E5E7EB] rounded-[20px] p-5 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.03)] flex flex-col justify-between hover:translate-y-[-2px] transition-transform duration-200 ${kpi.bg}`}>
            <div className="flex justify-between items-start">
              <span className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">{kpi.label}</span>
              <div className="p-1.5 rounded-lg bg-white/95 border border-[#E5E7EB] shadow-xs">
                <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
              </div>
            </div>
            <div className="mt-4 space-y-0.5">
              <span className="text-2xl font-display font-extrabold tracking-tight text-[#1A1A1A]">{kpi.value}</span>
              <p className="text-[10px] font-semibold text-[#6B7280]">{kpi.status}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (col-span-7) */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Budget Analytics widget */}
          <div className="border border-[#E5E7EB] rounded-[20px] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-base font-bold text-[#1A1A1A]">Budget Analytics</h2>
                <p className="text-xs text-[#6B7280]">Planned vs Actual Cumulative Spend (Cr)</p>
              </div>
              <div className="flex gap-4 text-xs font-semibold">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-[#FF7A00]" /> Planned</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-[#3B82F6]" /> Actual</span>
              </div>
            </div>

            {/* Custom SVG Line Chart */}
            <div className="h-60 w-full relative mb-6">
              <svg className="w-full h-full" viewBox="0 0 600 240" fill="none">
                {/* Horizontal grid lines */}
                {[0, 60, 120, 180, 240].map((y, i) => (
                  <line key={i} x1="40" y1={y} x2="580" y2={y} stroke="#F3F4F6" strokeWidth="1.5" />
                ))}
                {/* Y-Axis labels */}
                <text x="10" y="240" className="text-[10px] font-bold fill-[#9CA3AF]">₹0Cr</text>
                <text x="10" y="180" className="text-[10px] font-bold fill-[#9CA3AF]">₹40Cr</text>
                <text x="10" y="120" className="text-[10px] font-bold fill-[#9CA3AF]">₹80Cr</text>
                <text x="10" y="60" className="text-[10px] font-bold fill-[#9CA3AF]">₹120Cr</text>
                <text x="10" y="15" className="text-[10px] font-bold fill-[#9CA3AF]">₹160Cr</text>

                {/* Planned Line path */}
                <path d="M 40 240 L 140 200 L 260 150 L 380 90 L 500 50 L 580 30" stroke="#FF7A00" strokeWidth="3" strokeLinecap="round" />
                
                {/* Actual Line path */}
                <path d="M 40 240 L 140 210 L 260 160 L 380 110" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" />
                
                {/* Highlight Point */}
                <circle cx="380" cy="110" r="5" fill="#3B82F6" stroke="white" strokeWidth="2" />
                <text x="365" y="90" className="text-xs font-extrabold fill-[#3B82F6]">₹142Cr</text>
              </svg>
            </div>

            <div className="grid grid-cols-3 gap-4 border-t border-[#F3F4F6] pt-4 text-center">
              <div>
                <p className="text-[10px] text-[#9CA3AF] font-bold uppercase">Average Burn Rate</p>
                <p className="text-lg font-extrabold text-[#1A1A1A]">₹4.2L / day</p>
              </div>
              <div>
                <p className="text-[10px] text-[#9CA3AF] font-bold uppercase">Forecast at Completion</p>
                <p className="text-lg font-extrabold text-[#22C55E]">₹164.8Cr</p>
              </div>
              <div>
                <p className="text-[10px] text-[#9CA3AF] font-bold uppercase">Project Variance</p>
                <p className="text-lg font-extrabold text-[#3B82F6]">-₹0.2Cr</p>
              </div>
            </div>
          </div>

          {/* Approval Decision Center */}
          <div className="border border-[#E5E7EB] rounded-[20px] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-base font-bold text-[#1A1A1A]">Approval Decision Center</h2>
                <p className="text-xs text-[#6B7280]">Decisions impacting project budget & timelines</p>
              </div>
              <span className="text-xs font-bold text-[#EF4444] bg-[#FEF2F2] px-2.5 py-1 rounded-full">
                {approvals.filter(a => a.status === "Pending").length} Actions Required
              </span>
            </div>

            <div className="space-y-4">
              {approvals.map((a) => (
                <div key={a.id} className="p-4 rounded-xl border border-[#E5E7EB] bg-[#FAFAFC] hover:border-[#FF7A00]/20 transition-all flex flex-col gap-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-extrabold text-[#1A1A1A]">{a.item}</h4>
                      <p className="text-xs text-[#6B7280] font-semibold">Requested by {a.req}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-base font-extrabold text-[#1A1A1A]">{a.amt}</p>
                      <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase ${
                        a.priority === 'High' ? 'bg-[#FEF2F2] text-[#EF4444]' : 'bg-[#FFF4E8] text-[#FF7A00]'
                      }`}>
                        {a.priority} Priority
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-[#4B5563] font-medium bg-white p-2.5 rounded-lg border border-[#E5E7EB]/50">
                    <span className="font-bold text-[#1A1A1A]">Justification:</span> {a.justification}
                  </p>

                  <div className="flex justify-between items-center pt-2">
                    <span className={`text-xs font-bold uppercase ${
                      a.status === 'Approved' ? 'text-[#22C55E]' :
                      a.status === 'Rejected' ? 'text-[#EF4444]' :
                      'text-[#9CA3AF]'
                    }`}>
                      Status: {a.status}
                    </span>
                    {a.status === "Pending" ? (
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleReject(a.id)}
                          className="px-3.5 py-1.5 bg-white border border-[#E5E7EB] text-xs font-bold rounded-lg hover:bg-[#FEF2F2] hover:text-[#EF4444] transition-colors flex items-center gap-1"
                        >
                          <X className="w-3.5 h-3.5" /> Reject
                        </button>
                        <button 
                          onClick={() => handleApprove(a.id)}
                          className="px-3.5 py-1.5 bg-[#FF7A00] text-white text-xs font-bold rounded-lg hover:bg-[#FF922B] transition-colors flex items-center gap-1"
                        >
                          <Check className="w-3.5 h-3.5" /> Approve
                        </button>
                      </div>
                    ) : (
                      <span className="text-[10px] font-bold text-[#6B7280]">Action logged</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Production Progress Timeline tracker */}
          <div className="border border-[#E5E7EB] rounded-[20px] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
            <h2 className="text-base font-bold text-[#1A1A1A] mb-4">Production Progress</h2>
            <div className="space-y-4">
              {[
                { stage: "Pre-Production", pct: 100, status: "Complete", color: "bg-[#22C55E]" },
                { stage: "Principal Photography", pct: 51, status: "Active (Day 23 of 45)", color: "bg-[#FF7A00]" },
                { stage: "VFX Pipeline", pct: 32, status: "Running (Pre-viz complete)", color: "bg-[#3B82F6]" },
                { stage: "Post-Production", pct: 10, status: "Drafting Cuts", color: "bg-[#6B7280]" },
              ].map((prog, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-[#1A1A1A]">{prog.stage}</span>
                    <span className="text-[#6B7280]">{prog.status} ({prog.pct}%)</span>
                  </div>
                  <div className="h-2 w-full bg-[#E5E7EB] rounded-full overflow-hidden">
                    <div className={`h-full ${prog.color} rounded-full`} style={{ width: `${prog.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column (col-span-5) */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Executive Alerts Center */}
          <div className="border border-[#E5E7EB] rounded-[20px] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
            <h2 className="text-base font-bold text-[#1A1A1A] mb-4 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-[#EF4444]" /> Executive Escalations
            </h2>
            <div className="space-y-3">
              {[
                { type: "Permit Risks", desc: "Hospital permit expires tomorrow at 18:00. Renewal is delayed at municipal desk.", status: "Critical" },
                { type: "Vendor Risks", desc: "Devi Transport reports 2 logistical vehicles delayed in Chennai transit corridor.", status: "Warning" },
                { type: "Budget Risks", desc: "Sabu Cyril reports steel & timber costs escalated +5.2% for climax set construction.", status: "Notice" },
                { type: "Schedule Risks", desc: "NTR Jr. unavailable Shoot Day 27 due to pre-scheduled promotional dates.", status: "Urgent" },
              ].map((alert, idx) => (
                <div key={idx} className="p-3 border border-[#E5E7EB] rounded-xl bg-[#FAFAFC] flex flex-col gap-1 hover:border-[#EF4444]/20 transition-all">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-extrabold text-[#1A1A1A]">{alert.type}</span>
                    <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded ${
                      alert.status === 'Critical' ? 'bg-[#FEF2F2] text-[#EF4444]' :
                      alert.status === 'Urgent' ? 'bg-[#FFF4E8] text-[#FF7A00]' :
                      'bg-[#EAF3FF] text-[#3B82F6]'
                    }`}>
                      {alert.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#6B7280] font-medium leading-relaxed">{alert.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Major Cost Drivers */}
          <div className="border border-[#E5E7EB] rounded-[20px] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
            <h2 className="text-base font-bold text-[#1A1A1A] mb-4">Major Cost Drivers</h2>
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
                    <span className="text-[#1A1A1A]">{driver.label}</span>
                    <span className="text-[#6B7280]">{driver.spent} / {driver.allocated}</span>
                  </div>
                  <div className="h-1.5 w-full bg-[#E5E7EB] rounded-full overflow-hidden">
                    <div className="h-full bg-[#FF7A00] rounded-full" style={{ width: `${driver.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Financial Decisions & Risk Heatmap (Side-by-Side tabs or stacking) */}
          <div className="border border-[#E5E7EB] rounded-[20px] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
            <h2 className="text-base font-bold text-[#1A1A1A] mb-3">Upcoming Financial Decisions</h2>
            <div className="space-y-3">
              {[
                { desc: "Pre-buy VFX packages for final combat segment", cost: "₹4.8Cr", date: "In 3 Days" },
                { desc: "Additional weather/reshoot coverage policy", cost: "₹1.2Cr", date: "In 5 Days" },
              ].map((dec, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 border border-[#E5E7EB] rounded-xl bg-[#FFF4E8]/20">
                  <div className="space-y-0.5">
                    <p className="text-xs font-extrabold text-[#1A1A1A]">{dec.desc}</p>
                    <p className="text-[10px] text-[#FF7A00] font-bold">Deadline: {dec.date}</p>
                  </div>
                  <span className="text-xs font-extrabold text-[#1A1A1A] bg-white border border-[#E5E7EB] px-2.5 py-1 rounded-lg">
                    {dec.cost}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Production Risk Heatmap */}
          <div className="border border-[#E5E7EB] rounded-[20px] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
            <h2 className="text-base font-bold text-[#1A1A1A] mb-3">Risk Heatmap</h2>
            <div className="grid grid-cols-3 gap-2.5 text-center text-xs font-bold">
              <div className="p-3 bg-[#FEF2F2] border border-[#EF4444]/20 rounded-xl text-[#EF4444]">
                <p className="text-[10px] uppercase font-bold text-[#EF4444]/80">High Risk</p>
                <p className="text-sm font-extrabold mt-1">VFX & Cast Dates</p>
              </div>
              <div className="p-3 bg-[#FFF4E8] border border-[#FF7A00]/20 rounded-xl text-[#FF7A00]">
                <p className="text-[10px] uppercase font-bold text-[#FF7A00]/80">Med Risk</p>
                <p className="text-sm font-extrabold mt-1">Weather & Location</p>
              </div>
              <div className="p-3 bg-[#ECFDF3] border border-[#22C55E]/20 rounded-xl text-[#22C55E]">
                <p className="text-[10px] uppercase font-bold text-[#22C55E]/80">Low Risk</p>
                <p className="text-sm font-extrabold mt-1">Catering & Logistics</p>
              </div>
            </div>
          </div>

          {/* Milestone Tracker */}
          <div className="border border-[#E5E7EB] rounded-[20px] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
            <h2 className="text-base font-bold text-[#1A1A1A] mb-4">Production Milestones</h2>
            <div className="space-y-4">
              {[
                { title: "First Look / Teaser Release", date: "June 25, 2026", status: "Ready", ok: true },
                { title: "Principal Photography Wrap", date: "July 15, 2026", status: "On Schedule", ok: true },
                { title: "VFX Pipeline Final Lock", date: "August 30, 2026", status: "At Risk", ok: false },
                { title: "Final theatrical print release", date: "October 10, 2026", status: "On Schedule", ok: true },
              ].map((m, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <div className="space-y-0.5">
                    <p className="text-xs font-extrabold text-[#1A1A1A]">{m.title}</p>
                    <p className="text-[10px] text-[#9CA3AF] font-bold">{m.date}</p>
                  </div>
                  <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full ${
                    m.status === 'Ready' ? 'bg-[#ECFDF3] text-[#22C55E]' :
                    m.ok ? 'bg-[#EAF3FF] text-[#3B82F6]' : 'bg-[#FEF2F2] text-[#EF4444]'
                  }`}>
                    {m.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Executive Activity */}
          <div className="border border-[#E5E7EB] rounded-[20px] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
            <h2 className="text-base font-bold text-[#1A1A1A] mb-3">Recent Executive Activity</h2>
            <div className="space-y-3.5 text-xs">
              {[
                { activity: "Rana Ji approved VFX Pre-viz scaling (₹8.0L)", time: "10 min ago" },
                { activity: "Sabu Cyril requested Set Extension (Art Dept)", time: "45 min ago" },
                { activity: "Line Producer updated Shoot Timeline for Day 23", time: "2 hrs ago" },
              ].map((act, idx) => (
                <div key={idx} className="flex justify-between items-start gap-4 border-b border-[#F3F4F6] pb-2 last:border-0 last:pb-0">
                  <p className="text-[#4B5563] font-medium">{act.activity}</p>
                  <span className="text-[10px] text-[#9CA3AF] font-bold shrink-0">{act.time}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
