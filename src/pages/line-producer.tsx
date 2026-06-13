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
    <div className="p-6 md:p-8 max-w-[1600px] mx-auto min-h-screen bg-[#FAFAFC] text-[#1A1A1A] flex flex-col gap-6">
      
      {/* Hero Header Section */}
      <div className="relative overflow-hidden rounded-[20px] border border-[#E5E7EB] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFF4E8] to-[#FFFFFF] opacity-80 pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF4E8] text-[#FF7A00] text-xs font-semibold">
              <Activity className="w-3.5 h-3.5" /> Line Producer Terminal
            </div>
            <h1 className="text-2xl md:text-3xl font-display font-bold tracking-tight text-[#1A1A1A]">Production Command Center</h1>
            <p className="text-xs text-[#6B7280] font-medium max-w-xl">
              Real-time operational dashboard for monitoring budgets, conflicts, timeline, and vendors.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#6B7280]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E] animate-pulse"></span>
            <span>Live Sync Active</span>
          </div>
        </div>
      </div>

      {/* Top Row: Executive KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: "Shoot Day", value: "Day 23", detail: "Active Day of 45", icon: Calendar, color: "text-[#FF7A00]", bg: "bg-[#FFF4E8]/60 border-[#FF7A00]/10" },
          { label: "Scenes Completed", value: "18 / 24", detail: "75% Target Reached", icon: Film, color: "text-[#3B82F6]", bg: "bg-[#EAF3FF]/40 border-[#3B82F6]/10" },
          { label: "Budget Variance", value: "-2.4%", detail: "Under Track Target", icon: TrendingDown, color: "text-[#22C55E]", bg: "bg-[#ECFDF3]/50 border-[#22C55E]/10" },
          { label: "Vendors Health", value: "12 Active", detail: "1 Delayed, 1 Low Fuel", icon: Users, color: "text-amber-500", bg: "bg-white" },
          { label: "Active Risks", value: "3 Alerts", detail: "Requires Attention", icon: AlertTriangle, color: "text-[#EF4444]", bg: "bg-[#FEF2F2] border-[#EF4444]/15" },
        ].map((kpi, idx) => (
          <div 
            key={idx} 
            className={`border border-[#E5E7EB] rounded-[20px] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.03)] flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 bg-white ${kpi.bg || ""}`}
          >
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">{kpi.label}</span>
              <div className="p-1.5 rounded-lg bg-white/95 border border-[#E5E7EB] shadow-xs">
                <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
              </div>
            </div>
            <div className="mt-3 space-y-0.5">
              <span className="text-2xl font-display font-extrabold tracking-tight text-[#1A1A1A]">{kpi.value}</span>
              <p className="text-[10px] font-semibold text-[#9CA3AF]">{kpi.detail}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid: 3-column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Readiness, Budget, Shoot Score (col-span-4) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Shoot Readiness Score Widget */}
          <div className="border border-[#E5E7EB] rounded-[20px] bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-4 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#FF7A00]" /> Shoot Readiness Score
            </h2>
            <div className="flex items-center gap-5 mb-4">
              <div className="relative flex items-center justify-center">
                {/* SVG Progress Circle */}
                <svg className="w-20 h-20 transform -rotate-90">
                  <circle cx="40" cy="40" r="34" stroke="#E5E7EB" strokeWidth="6" fill="transparent" />
                  <circle cx="40" cy="40" r="34" stroke="#FF7A00" strokeWidth="6" fill="transparent" 
                    strokeDasharray={2 * Math.PI * 34} 
                    strokeDashoffset={2 * Math.PI * 34 * (1 - 0.92)} 
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute text-lg font-extrabold text-[#1A1A1A]">92%</span>
              </div>
              <div>
                <p className="text-sm font-bold text-[#1A1A1A]">Ready for Tomorrow</p>
                <p className="text-xs text-[#6B7280]">1 critical warning outstanding regarding VFX coordinates.</p>
              </div>
            </div>
            <div className="space-y-2 text-xs font-semibold text-[#4B5563]">
              <div className="flex justify-between items-center py-1.5 border-b border-[#F3F4F6]">
                <span className="flex items-center gap-2">🟢 Characters</span>
                <span className="text-[#22C55E]">✓ Confirmed</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-[#F3F4F6]">
                <span className="flex items-center gap-2">🟢 Props & Sets</span>
                <span className="text-[#22C55E]">✓ Verified</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-[#F3F4F6]">
                <span className="flex items-center gap-2">🟢 Costumes</span>
                <span className="text-[#22C55E]">✓ Ready</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-[#F3F4F6]">
                <span className="flex items-center gap-2">🟢 Locations</span>
                <span className="text-[#22C55E]">✓ Permits OK</span>
              </div>
              <div className="flex justify-between items-center py-1.5">
                <span className="flex items-center gap-2">🔴 VFX Supervisor Match</span>
                <span className="text-[#EF4444]">⚠ Awaiting Setup</span>
              </div>
            </div>
          </div>

          {/* Breakdown Completeness Section */}
          <div className="border border-[#E5E7EB] rounded-[20px] bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.03)] flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#6B7280] flex items-center gap-2">
                <Film className="w-4 h-4 text-[#FF7A00]" /> Breakdown Completeness
              </h2>
              <span className="text-[10px] font-bold text-[#FF7A00] bg-[#FFF4E8] px-2 py-0.5 rounded-full">5 Scenes</span>
            </div>
            
            <div className="space-y-3.5">
              {[
                { id: 34, title: "Rajahmundry Market", pct: 85, chars: true, props: true, costumes: true, locs: false },
                { id: 41, title: "Confrontation Hideout", pct: 92, chars: true, props: true, costumes: true, locs: true },
                { id: 67, title: "Chase Streets", pct: 75, chars: true, props: true, costumes: false, locs: true },
                { id: 71, title: "Hospital Room", pct: 100, chars: true, props: true, costumes: true, locs: true },
                { id: 78, title: "Boat Fight River", pct: 80, chars: true, props: false, costumes: true, locs: true },
              ].map((scene) => (
                <div key={scene.id} className="p-3 rounded-xl border border-[#E5E7EB] bg-[#FAFAFC] hover:border-[#FF7A00]/30 transition-all">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-extrabold text-[#1A1A1A]">Scene {scene.id}</span>
                    <span className="text-xs font-bold text-[#FF7A00]">{scene.pct}%</span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="h-1.5 w-full bg-[#E5E7EB] rounded-full overflow-hidden mb-2.5">
                    <div className="h-full bg-gradient-to-r from-[#FF7A00] to-[#FFB15E] rounded-full" style={{ width: `${scene.pct}%` }} />
                  </div>
                  
                  {/* Checklist grid */}
                  <div className="grid grid-cols-4 gap-1 text-[9px] font-bold text-center">
                    <span className={`px-1 py-0.5 rounded ${scene.chars ? 'bg-[#ECFDF3] text-[#16A34A]' : 'bg-[#FEF2F2] text-[#EF4444]'}`}>
                      Char {scene.chars ? '✓' : '⚠'}
                    </span>
                    <span className={`px-1 py-0.5 rounded ${scene.props ? 'bg-[#ECFDF3] text-[#16A34A]' : 'bg-[#FEF2F2] text-[#EF4444]'}`}>
                      Props {scene.props ? '✓' : '⚠'}
                    </span>
                    <span className={`px-1 py-0.5 rounded ${scene.costumes ? 'bg-[#ECFDF3] text-[#16A34A]' : 'bg-[#FEF2F2] text-[#EF4444]'}`}>
                      Cost {scene.costumes ? '✓' : '⚠'}
                    </span>
                    <span className={`px-1 py-0.5 rounded ${scene.locs ? 'bg-[#ECFDF3] text-[#16A34A]' : 'bg-[#FEF2F2] text-[#EF4444]'}`}>
                      Locs {scene.locs ? '✓' : '⚠'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Budget Health Widget */}
          <div className="border border-[#E5E7EB] rounded-[20px] bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-4 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-[#22C55E]" /> Budget Health
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] text-[#9CA3AF] font-bold uppercase">Allocated Budget</p>
                  <p className="text-base font-extrabold text-[#1A1A1A]">₹42,00,000</p>
                </div>
                <div>
                  <p className="text-[10px] text-[#9CA3AF] font-bold uppercase">Spent To Date</p>
                  <p className="text-base font-extrabold text-[#1A1A1A]">₹39,10,000</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-1 border-t border-[#F3F4F6]">
                <div>
                  <p className="text-[10px] text-[#9CA3AF] font-bold uppercase">Remaining</p>
                  <p className="text-base font-extrabold text-[#22C55E]">₹2,90,000</p>
                </div>
                <div>
                  <p className="text-[10px] text-[#9CA3AF] font-bold uppercase">Forecast</p>
                  <p className="text-base font-extrabold text-[#3B82F6]">On Track</p>
                </div>
              </div>
              {/* Micro-Progress Bar for Budget */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-bold text-[#6B7280]">
                  <span>Spent Percentage</span>
                  <span>93.1%</span>
                </div>
                <div className="h-2 w-full bg-[#E5E7EB] rounded-full overflow-hidden">
                  <div className="h-full bg-[#22C55E] rounded-full" style={{ width: '93.1%' }} />
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Center Column: Resource Conflicts & Timeline (col-span-5) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Resource Conflict Command Center */}
          <div className="border border-[#E5E7EB] rounded-[20px] bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.03)] flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#EF4444] flex items-center gap-2">
                <ShieldAlert className="w-4 h-4" /> Resource Conflicts
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-[#FEF2F2] text-[#EF4444] text-[10px] font-extrabold">
                3 Critical
              </span>
            </div>

            <div className="space-y-4">
              {/* Conflict item 1 */}
              <div className="p-4 rounded-xl border border-l-4 border-l-[#EF4444] border-[#E5E7EB] bg-[#FEF2F2]/30 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#EF4444]">
                  <AlertCircle className="w-4 h-4" /> Scene 34 Equipment Overlap
                </div>
                <p className="text-xs font-bold text-[#1A1A1A]">
                  "Merchant Cart" is booked concurrently:
                </p>
                <ul className="text-xs text-[#6B7280] list-disc list-inside space-y-1 font-semibold pl-1">
                  <li>Scene 34 (Rajahmundry Market)</li>
                  <li>Scene 41 (Confrontation Hideout)</li>
                </ul>
                <div className="text-[11px] font-bold text-amber-600 bg-amber-50 rounded-lg p-2 border border-amber-200/50 mt-1">
                  Conflict: Both scheduled on Shoot Day 24. Re-allocation required.
                </div>
              </div>

              {/* Conflict item 2 */}
              <div className="p-4 rounded-xl border border-l-4 border-l-amber-500 border-[#E5E7EB] bg-amber-50/20 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-600">
                  <AlertTriangle className="w-4 h-4" /> Hospital Location Permit
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-bold text-[#1A1A1A]">District General Permit Expiring</p>
                    <p className="text-xs text-[#6B7280] font-medium">Expiration: Tomorrow at 18:00</p>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-[#FFF4E8] text-[#FF7A00] text-[9px] font-bold uppercase">
                    Urgent
                  </span>
                </div>
                <p className="text-[11px] text-[#6B7280] font-medium">
                  Renewals team notified. Approval signature required from production head.
                </p>
              </div>

              {/* Conflict item 3 */}
              <div className="p-4 rounded-xl border border-l-4 border-l-[#3B82F6] border-[#E5E7EB] bg-[#EAF3FF]/10 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#3B82F6]">
                  <Users className="w-4 h-4" /> Lead Actor Availability
                </div>
                <p className="text-xs font-bold text-[#1A1A1A]">
                  NTR Jr. unavailable on Shoot Day 27
                </p>
                <p className="text-xs text-[#6B7280] font-medium">
                  Confirmed conflict with external media promotional schedules.
                </p>
                <div className="flex gap-2">
                  <button className="text-[10px] font-bold text-[#3B82F6] hover:underline">Reschedule Shoot Day 27</button>
                  <span className="text-[#E5E7EB] text-xs">|</span>
                  <button className="text-[10px] font-bold text-[#6B7280] hover:underline">View Availability Calendar</button>
                </div>
              </div>
            </div>
          </div>

          {/* Today's Production Timeline */}
          <div className="border border-[#E5E7EB] rounded-[20px] bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.03)] flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#6B7280] flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#FF7A00]" /> Today's Shoot Timeline
              </h2>
              <span className="text-[10px] font-bold text-[#6B7280]">Shoot Day 23</span>
            </div>

            <div className="relative pl-6 border-l border-[#E5E7EB] space-y-6 my-2">
              {[
                { time: "08:00", title: "Technical Crew Setup", desc: "Lighting, Camera rigs placement at Rajahmundry Market", type: "setup" },
                { time: "09:30", title: "Scene 34 Shooting - Take 1", desc: "Merchant Cart movement. Main cast in position", type: "shoot" },
                { time: "11:00", title: "Scene 41 Prep & Shooting", desc: "Interiors hideout dialogue sequence", type: "shoot" },
                { time: "13:00", title: "Lunch Break", desc: "Sri Sai Catering - On set serving", type: "break" },
                { time: "14:00", title: "Scene 67 Chase Sequence", desc: "Action sequence, safety vehicles standby", type: "shoot" },
                { time: "17:00", title: "Daily Wrap & Data Backup", desc: "Continuity cards log, cards shipped to post-prod", type: "wrap" },
              ].map((item, idx) => (
                <div key={idx} className="relative">
                  {/* Timeline dot */}
                  <span className={`absolute -left-[31px] top-1 w-2.5 h-2.5 rounded-full border-2 border-white ring-4 ring-offset-0 ${
                    item.type === 'setup' ? 'bg-amber-400 ring-amber-100' :
                    item.type === 'shoot' ? 'bg-[#FF7A00] ring-[#FFF4E8]' :
                    item.type === 'break' ? 'bg-[#22C55E] ring-green-100' :
                    'bg-[#6B7280] ring-gray-100'
                  }`} />
                  
                  <div className="flex items-start gap-4">
                    <span className="text-xs font-bold text-[#9CA3AF] w-10 shrink-0 pt-0.5">{item.time}</span>
                    <div className="space-y-0.5">
                      <p className="text-xs font-extrabold text-[#1A1A1A]">{item.title}</p>
                      <p className="text-xs text-[#6B7280] font-medium">{item.desc}</p>
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
          <div className="border border-[#E5E7EB] rounded-[20px] bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.03)] flex flex-col">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-4 flex items-center gap-2">
              <Users className="w-4 h-4 text-[#FF7A00]" /> Vendor Status
            </h2>

            <div className="space-y-3">
              {/* Vendor Card 1 */}
              <div className="p-3 border border-[#E5E7EB] rounded-xl bg-white flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E]" />
                  <div>
                    <h4 className="text-xs font-extrabold text-[#1A1A1A]">Sri Sai Catering</h4>
                    <p className="text-[10px] text-[#9CA3AF] font-bold">Lunch Confirmed • Ready</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-[#22C55E] bg-[#ECFDF3] px-2 py-0.5 rounded-md">
                  Active
                </span>
              </div>

              {/* Vendor Card 2 */}
              <div className="p-3 border border-[#E5E7EB] rounded-xl bg-white flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                  <div>
                    <h4 className="text-xs font-extrabold text-[#1A1A1A]">Generators Co.</h4>
                    <p className="text-[10px] text-amber-600 font-bold">Fuel Low • Refuel Required</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-[#F59E0B] bg-[#FFF4E8] px-2 py-0.5 rounded-md">
                  Alert
                </span>
              </div>

              {/* Vendor Card 3 */}
              <div className="p-3 border border-[#E5E7EB] rounded-xl bg-white flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                  <div>
                    <h4 className="text-xs font-extrabold text-[#1A1A1A]">Devi Transport</h4>
                    <p className="text-[10px] text-[#EF4444] font-bold">2 Vehicles Delayed in Transit</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-[#EF4444] bg-[#FEF2F2] px-2 py-0.5 rounded-md">
                  Critical
                </span>
              </div>
            </div>
          </div>

          {/* Weather & Location Risk Widget */}
          <div className="border border-[#E5E7EB] rounded-[20px] bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.03)] flex flex-col">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-4 flex items-center gap-2">
              <CloudRain className="w-4 h-4 text-[#3B82F6]" /> Weather & Location
            </h2>
            <div className="flex justify-between items-center mb-3">
              <div>
                <p className="text-xs font-extrabold text-[#1A1A1A]">Rajahmundry Outdoor Set</p>
                <p className="text-[11px] text-[#6B7280] font-medium">Current temperature</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-extrabold text-[#FF7A00]">31°C</p>
                <p className="text-[10px] text-[#9CA3AF] font-bold uppercase">Scatter Clouds</p>
              </div>
            </div>
            <div className="pt-2 border-t border-[#F3F4F6] space-y-2 text-xs font-semibold text-[#4B5563]">
              <div className="flex justify-between items-center">
                <span>Tomorrow Rain Risk:</span>
                <span className="text-[#FF7A00]">20% Risk</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Location Risk Level:</span>
                <span className="text-[#22C55E]">Low Impact</span>
              </div>
            </div>
          </div>

          {/* Slack-like Live Activity Feed */}
          <div className="border border-[#E5E7EB] rounded-[20px] bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.03)] flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#6B7280] flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#FF7A00]" /> Live Activity Feed
              </h2>
              <span className="w-2 h-2 rounded-full bg-[#22C55E]"></span>
            </div>

            <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
              {[
                { time: "2 min ago", user: "AD Team", initials: "AD", action: "Scene 23 marked ready", bg: "bg-[#FFF4E8] text-[#FF7A00]" },
                { time: "12 min ago", user: "Production", initials: "PR", action: "Generator #2 refueled completely", bg: "bg-[#EAF3FF] text-[#3B82F6]" },
                { time: "28 min ago", user: "Vendor Team", initials: "VT", action: "Sri Sai Catering confirmed hot lunch onsite", bg: "bg-[#ECFDF3] text-[#22C55E]" },
                { time: "1 hr ago", user: "Costumes", initials: "CS", action: "Wardrobe adjustments completed for lead cast", bg: "bg-[#F3F4F6] text-[#6B7280]" },
              ].map((act, idx) => (
                <div key={idx} className="flex gap-3 items-start border-b border-[#F3F4F6] pb-3 last:border-0 last:pb-0">
                  <div className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center font-bold text-xs ${act.bg}`}>
                    {act.initials}
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-extrabold text-[#1A1A1A]">{act.user}</span>
                      <span className="text-[9px] text-[#9CA3AF] font-bold">{act.time}</span>
                    </div>
                    <p className="text-xs text-[#6B7280] font-medium leading-relaxed">
                      {act.action}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
