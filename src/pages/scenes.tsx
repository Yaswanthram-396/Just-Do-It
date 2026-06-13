import { useState } from "react";
import { Link } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Search, LayoutGrid, List, Columns3, AlignLeft, Users, Shirt, 
  Monitor, MapPin, Sun, Moon, Film, CheckCircle2, Calendar, 
  ClipboardList, TrendingUp, AlertCircle, ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";

const SCENES = [
  { id: 12, title: "Palace Interior", ext: "INT", time: "DAY", loc: "Palace", cast: 3, status: "Scheduled", pages: "1½" },
  { id: 23, title: "Flashback Village", ext: "EXT", time: "DAY", loc: "Village", cast: 6, status: "Ready", pages: "2" },
  { id: 34, title: "Rajahmundry Market", ext: "EXT", time: "DAY", loc: "Market", cast: 8, status: "Scheduled", pages: "2⅛", highlight: true },
  { id: 41, title: "Confrontation", ext: "INT", time: "NIGHT", loc: "Hideout", cast: 4, status: "Draft", pages: "3" },
  { id: 55, title: "Wedding Sequence", ext: "EXT", time: "DAY", loc: "Temple", cast: 12, status: "Ready", pages: "4" },
  { id: 67, title: "Chase Scene", ext: "EXT", time: "DAY", loc: "Streets", cast: 6, status: "Ready", pages: "1¾" },
  { id: 71, title: "Hospital", ext: "INT", time: "NIGHT", loc: "Hospital", cast: 3, status: "Completed", pages: "1" },
  { id: 78, title: "Boat Fight", ext: "EXT", time: "DAY", loc: "River", cast: 5, status: "Scheduled", pages: "2½" },
  { id: 89, title: "Final Reveal", ext: "INT", time: "NIGHT", loc: "Palace", cast: 4, status: "Draft", pages: "3" },
  { id: 94, title: "Song Sequence", ext: "EXT", time: "DAY", loc: "Beach", cast: 20, status: "Draft", pages: "1" },
  { id: 103, title: "Climax", ext: "EXT", time: "DAY", loc: "Cliff", cast: 8, status: "Draft", pages: "5" },
  { id: 120, title: "Epilogue", ext: "INT", time: "DAY", loc: "Village", cast: 2, status: "Draft", pages: "1" },
];

export default function Scenes() {
  const [view, setView] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Modern filter chips state (retaining actual business logic filters if needed)
  const [selectedLoc, setSelectedLoc] = useState("All");
  const [selectedTime, setSelectedTime] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  // Get distinct values for filter chips
  const locations = ["All", ...Array.from(new Set(SCENES.map(s => s.loc)))];
  const times = ["All", ...Array.from(new Set(SCENES.map(s => s.time)))];
  const statuses = ["All", "Draft", "Ready", "Scheduled", "Completed"];

  // Filter scenes based on filter states
  const filteredScenes = SCENES.filter(scene => {
    const matchesSearch = scene.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          scene.loc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          scene.id.toString().includes(searchQuery);
    const matchesLoc = selectedLoc === "All" || scene.loc === selectedLoc;
    const matchesTime = selectedTime === "All" || scene.time === selectedTime;
    const matchesStatus = selectedStatus === "All" || scene.status === selectedStatus;
    
    return matchesSearch && matchesLoc && matchesTime && matchesStatus;
  });

  return (
    <div className="p-6 md:p-10 max-w-[1600px] mx-auto h-full flex flex-col space-y-8 bg-[#FAFAFC] min-h-screen text-[#1A1A1A]">
      
      {/* 1. Hero Header Section */}
      <div className="relative overflow-hidden rounded-[20px] border border-[#E5E7EB] bg-white p-8 shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
        {/* Subtle Brand Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFF4E8] to-[#FFFFFF] opacity-80 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF4E8] text-[#FF7A00] text-xs font-semibold">
              <Film className="w-3.5 h-3.5" /> Workspace Overview
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-[#1A1A1A]">Scene Explorer</h1>
            <p className="text-sm text-[#6B7280] font-medium max-w-xl">
              Manage, organize and track production scenes across the entire project timeline.
            </p>
          </div>

          {/* 3. Production Progress Section */}
          <div className="w-full md:w-80 bg-white/60 backdrop-blur-xs border border-[#E5E7EB] rounded-2xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">Production Progress</span>
              <span className="text-sm font-extrabold text-[#FF7A00]">72% Complete</span>
            </div>
            {/* Animated Progress Bar */}
            <div className="h-2.5 w-full bg-[#E5E7EB] rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-[#FF7A00] to-[#FFB15E] rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "72%" }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
            <p className="text-[11px] text-[#9CA3AF] mt-1.5 font-medium">
              89 of 124 scenes completed in shooting schedule
            </p>
          </div>
        </div>
      </div>

      {/* 2. KPI Dashboard Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Scenes", value: "124", icon: Film, color: "text-[#1A1A1A]", bg: "bg-white", trend: "+4 this week" },
          { label: "Ready", value: "45", icon: CheckCircle2, color: "text-[#2563EB]", bg: "bg-[#EAF3FF]/40 border-[#2563EB]/10", trend: "Ready for shoot" },
          { label: "Scheduled", value: "32", icon: Calendar, color: "text-[#FF7A00]", bg: "bg-[#FFF4E8]/60 border-[#FF7A00]/10", trend: "Allocated to days" },
          { label: "Completed", value: "47", icon: ClipboardList, color: "text-[#16A34A]", bg: "bg-[#ECFDF3]/50 border-[#16A34A]/10", trend: "VFX & editing" },
        ].map((kpi, idx) => (
          <div 
            key={idx} 
            className={`border border-[#E5E7EB] rounded-[20px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 ${kpi.bg}`}
          >
            <div className="flex justify-between items-start">
              <span className="text-sm font-bold text-[#6B7280]">{kpi.label}</span>
              <div className={`p-2 rounded-xl bg-white/90 border border-[#E5E7EB] shadow-xs`}>
                <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
              </div>
            </div>
            <div className="mt-4 space-y-1">
              <span className="text-3xl font-display font-extrabold tracking-tight text-[#1A1A1A]">{kpi.value}</span>
              <div className="flex items-center gap-1 text-[10px] font-semibold text-[#9CA3AF]">
                <TrendingUp className="w-3 h-3 text-[#FF7A00]" />
                <span>{kpi.trend}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Control Bar: Search and View Mode */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 pt-2">
        {/* 5. Search Experience */}
        <div className="relative w-full lg:w-96 shadow-[0_4px_20px_rgba(0,0,0,0.03)] rounded-xl">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
          <Input 
            placeholder="Search scene, location, cast..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 h-11 bg-white border-[#E5E7EB] rounded-xl text-sm font-medium transition-all focus:border-[#FF7A00] focus:ring-[4px] focus:ring-[#FF7A00]/10 placeholder-[#9CA3AF] text-[#1A1A1A]"
          />
        </div>
        
        {/* View mode toggle */}
        <div className="flex items-center bg-white border border-[#E5E7EB] rounded-xl p-1 shadow-xs self-stretch lg:self-auto justify-center">
          <button 
            onClick={() => setView("grid")} 
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
              view === "grid" 
                ? "bg-[#FFF4E8] text-[#FF7A00]" 
                : "text-[#6B7280] hover:text-[#1A1A1A]"
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            Grid
          </button>
          <button 
            onClick={() => setView("list")} 
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
              view === "list" 
                ? "bg-[#FFF4E8] text-[#FF7A00]" 
                : "text-[#6B7280] hover:text-[#1A1A1A]"
            }`}
          >
            <List className="w-3.5 h-3.5" />
            List
          </button>
          <button className="px-2 py-2 text-[#9CA3AF] hover:text-[#6B7280]"><Columns3 className="w-3.5 h-3.5" /></button>
          <button className="px-2 py-2 text-[#9CA3AF] hover:text-[#6B7280]"><AlignLeft className="w-3.5 h-3.5" /></button>
        </div>
      </div>

      {/* 6. Filter Chips System */}
      <div className="space-y-3.5">
        <div className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">Filters</div>
        <div className="flex flex-wrap gap-4 items-center">
          {/* Location Filters */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs text-[#9CA3AF] font-semibold mr-1">Location:</span>
            {locations.map(loc => {
              const selected = selectedLoc === loc;
              return (
                <button
                  key={loc}
                  onClick={() => setSelectedLoc(loc)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
                    selected 
                      ? "bg-[#FFF4E8] border-[#FF7A00] text-[#FF7A00] shadow-xs" 
                      : "bg-white border-[#E5E7EB] text-[#6B7280] hover:border-[#FF7A00] hover:text-[#FF7A00]"
                  }`}
                >
                  {loc}
                </button>
              );
            })}
          </div>

          <div className="h-4 w-px bg-[#E5E7EB] hidden lg:block" />

          {/* Time Filters */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs text-[#9CA3AF] font-semibold mr-1">Time:</span>
            {times.map(t => {
              const selected = selectedTime === t;
              return (
                <button
                  key={t}
                  onClick={() => setSelectedTime(t)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
                    selected 
                      ? "bg-[#FFF4E8] border-[#FF7A00] text-[#FF7A00] shadow-xs" 
                      : "bg-white border-[#E5E7EB] text-[#6B7280] hover:border-[#FF7A00] hover:text-[#FF7A00]"
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>

          <div className="h-4 w-px bg-[#E5E7EB] hidden lg:block" />

          {/* Status Filters */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs text-[#9CA3AF] font-semibold mr-1">Status:</span>
            {statuses.map(st => {
              const selected = selectedStatus === st;
              return (
                <button
                  key={st}
                  onClick={() => setSelectedStatus(st)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
                    selected 
                      ? "bg-[#FFF4E8] border-[#FF7A00] text-[#FF7A00] shadow-xs" 
                      : "bg-white border-[#E5E7EB] text-[#6B7280] hover:border-[#FF7A00] hover:text-[#FF7A00]"
                  }`}
                >
                  {st}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grid or List Display */}
      {view === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-16">
          {filteredScenes.map((scene, i) => (
            <motion.div
              key={scene.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: i * 0.03 }}
            >
              <Link href={`/scenes/34`}>
                <div 
                  className={`group bg-white border rounded-[20px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-200 cursor-pointer h-full flex flex-col relative overflow-hidden ${
                    scene.highlight 
                      ? 'border-[#FF7A00]/50 ring-1 ring-[#FF7A00]/20' 
                      : 'border-[#E5E7EB]'
                  }`}
                >
                  {scene.highlight && (
                    <div className="absolute top-0 right-0 bg-[#FF7A00] text-white text-[9px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                      Demo
                    </div>
                  )}

                  <div className="flex justify-between items-center mb-4">
                    {/* 9. Scene Number Styling */}
                    <span className="text-4xl font-display font-bold text-[#FF7A00] tracking-tighter leading-none">
                      {scene.id}
                    </span>
                    <StatusBadge status={scene.status} />
                  </div>
                  
                  {/* 7. Scene Title */}
                  <h3 className="text-base font-bold text-[#1A1A1A] mb-4 leading-tight truncate group-hover:text-[#FF7A00] transition-colors">
                    {scene.title}
                  </h3>
                  
                  {/* Badges Layout */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    <span className="inline-flex items-center gap-1 bg-[#F3F4F6] text-[#6B7280] text-[10px] font-bold px-2 py-1 rounded-lg">
                      <MapPin className="w-2.5 h-2.5 text-[#9CA3AF]" /> {scene.loc}
                    </span>
                    <span className="inline-flex items-center gap-1 bg-[#F3F4F6] text-[#6B7280] text-[10px] font-bold px-2 py-1 rounded-lg">
                      {scene.time === "DAY" ? <Sun className="w-2.5 h-2.5 text-amber-500" /> : <Moon className="w-2.5 h-2.5 text-indigo-400" />} {scene.time}
                    </span>
                    <span className="inline-flex items-center gap-1 bg-[#F3F4F6] text-[#6B7280] text-[10px] font-bold px-2 py-1 rounded-lg">
                      {scene.ext}
                    </span>
                  </div>

                  {/* Resource Stats */}
                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-[#E5E7EB]">
                    <div className="flex items-center gap-3 text-[#6B7280]">
                      <div className="flex items-center gap-1 text-[11px] font-semibold">
                        <Users className="w-3.5 h-3.5 text-[#9CA3AF]" />
                        <span>{scene.cast}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] font-semibold">
                        <Shirt className="w-3.5 h-3.5 text-[#9CA3AF]" />
                        <span>3</span>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] font-semibold">
                        <Monitor className="w-3.5 h-3.5 text-[#9CA3AF]" />
                        <span>2</span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#6B7280] bg-[#FFF4E8] text-[#FF7A00] px-2 py-1 rounded-md">
                      {scene.pages} pgs
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="border border-[#E5E7EB] rounded-[20px] bg-white overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.03)] pb-4">
          <table className="w-full text-sm text-left">
            <thead className="bg-[#F3F4F6] text-[#6B7280] text-xs uppercase font-bold tracking-wider">
              <tr>
                <th className="px-6 py-4 border-b border-[#E5E7EB]">Scene</th>
                <th className="px-6 py-4 border-b border-[#E5E7EB]">Title</th>
                <th className="px-6 py-4 border-b border-[#E5E7EB]">Location</th>
                <th className="px-6 py-4 border-b border-[#E5E7EB]">Type</th>
                <th className="px-6 py-4 border-b border-[#E5E7EB]">Cast</th>
                <th className="px-6 py-4 border-b border-[#E5E7EB]">Pages</th>
                <th className="px-6 py-4 border-b border-[#E5E7EB]">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB] text-[#1A1A1A]">
              {filteredScenes.map((scene) => (
                <tr 
                  key={scene.id} 
                  className="hover:bg-[#FFF4E8]/20 cursor-pointer transition-colors" 
                  onClick={() => window.location.href = "/scenes/34"}
                >
                  <td className="px-6 py-4 font-display font-extrabold text-[#FF7A00] text-lg">{scene.id}</td>
                  <td className="px-6 py-4 font-semibold text-[#1A1A1A]">{scene.title}</td>
                  <td className="px-6 py-4 text-[#6B7280] font-medium">{scene.loc}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1.5">
                      <span className="bg-[#F3F4F6] text-[#6B7280] text-[10px] font-bold px-2 py-0.5 rounded">{scene.ext}</span>
                      <span className="bg-[#F3F4F6] text-[#6B7280] text-[10px] font-bold px-2 py-0.5 rounded">{scene.time}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[#6B7280] font-semibold">{scene.cast}</td>
                  <td className="px-6 py-4 text-[#6B7280] font-semibold">{scene.pages}</td>
                  <td className="px-6 py-4"><StatusBadge status={scene.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// 8. Status badges pill styled
function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    "Draft": "bg-[#F3F4F6] text-[#6B7280]",
    "Ready": "bg-[#EAF3FF] text-[#2563EB]",
    "Scheduled": "bg-[#FFF3E8] text-[#FF7A00]",
    "Completed": "bg-[#ECFDF3] text-[#16A34A]"
  };
  return (
    <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${colors[status] || "bg-[#F3F4F6] text-[#6B7280]"}`}>
      {status}
    </span>
  );
}
