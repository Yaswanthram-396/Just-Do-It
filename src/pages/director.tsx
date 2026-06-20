import React, { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  Film, Image as ImageIcon, Camera, AlertCircle, CheckCircle2,
  Clock, Sparkles, User, Palette, ArrowLeft,
  ChevronRight, ClipboardList, RefreshCw, Star, Layers, Play, Printer, Sun, Moon, CalendarDays, CloudRain, Shield, Phone
} from "lucide-react";

// Types and constants
interface CallSheetData {
  productionName: string;
  shootDayNum: number;
  date: string;
  weather: string;
  sunrise: string;
  sunset: string;
  location: string;
  unitInfo: string;
  todayScenes: { scene: string; desc: string; cast: string; time: string; pages: string }[];
  castCallTimes: { role: string; actor: string; pickup: string; makeup: string; onSet: string }[];
  crewCallTimes: { dept: string; role: string; name: string; callTime: string }[];
  departmentNotes: string[];
  cameraNotes: string;
  directorNotes: string;
  locationNotes: string;
  emergencyContacts: { role: string; name: string; phone: string }[];
  transportationNotes: string;
  specialInstructions: string;
}

const dummyCallSheet: CallSheetData = {
  productionName: "Devara: Part 2",
  shootDayNum: 23,
  date: "2026-06-20",
  weather: "Overcast with mild coastal wind, 28°C",
  sunrise: "05:42 AM",
  sunset: "06:34 PM",
  location: "Rajahmundry Harbour Block A, Andhra Pradesh",
  unitInfo: "Main Unit - Day Shoot",
  todayScenes: [
    { scene: "Sc 34", desc: "Rajahmundry Market Chase - Climax Confrontation setup", cast: "NTR Jr., Saif Ali Khan, 50 Extras", time: "09:30 AM", pages: "2 1/8" },
    { scene: "Sc 41", desc: "Palace Corridor confrontation", cast: "NTR Jr., Saif Ali Khan", time: "02:00 PM", pages: "1 1/2" },
    { scene: "Sc 12", desc: "Intro Village Arrival sequence", cast: "Janhvi Kapoor, Village crowd", time: "04:30 PM", pages: "1" }
  ],
  castCallTimes: [
    { role: "Devara / Vara", actor: "NTR Jr.", pickup: "06:00 AM", makeup: "06:45 AM", onSet: "08:00 AM" },
    { role: "Bhaira", actor: "Saif Ali Khan", pickup: "06:30 AM", makeup: "07:15 AM", onSet: "08:30 AM" },
    { role: "Thangam", actor: "Janhvi Kapoor", pickup: "08:00 AM", makeup: "09:00 AM", onSet: "10:00 AM" }
  ],
  crewCallTimes: [
    { dept: "Direction", role: "Director", name: "Koratala Siva", callTime: "07:00 AM" },
    { dept: "Camera", role: "DOP", name: "Rathnavelu", callTime: "06:00 AM" },
    { dept: "Art", role: "Production Designer", name: "Sabu Cyril", callTime: "05:30 AM" },
    { dept: "AD Team", role: "1st AD", name: "King Solomon", callTime: "06:00 AM" }
  ],
  departmentNotes: [
    "Art Dept: Ensure fish market props are dressed with fresh ice and fish setups before 07:00 AM.",
    "Costumes: Muted earth tones for crowd extras. Vara kurta should be clean pressed for Sc 34.",
    "Stunts: Harness checks for market roof-jump to start at 08:30 AM."
  ],
  cameraNotes: "Shooting on Arri Alexa 35 with Anamorphic lenses. 50ft Technocrane must be setup by 07:30 AM.",
  directorNotes: "Maintain high-contrast dramatic shadows. The crowd should feel active and chaotic but not distract from the central eye-line.",
  locationNotes: "Coastal location. Wet down market floor before block shots to get correct reflections.",
  emergencyContacts: [
    { role: "Production Manager", name: "Ravi Teja", phone: "+91 90000 00088" },
    { role: "On-set Doctor", name: "Dr. Srinivas", phone: "+91 98480 12345" },
    { role: "Local coordinator", name: "Mohan Lal", phone: "+91 91234 56789" }
  ],
  transportationNotes: "Shuttles running between Novotel Visakhapatnam and set location every 20 minutes from 05:00 AM.",
  specialInstructions: "Respect local harbor rules. No crew members beyond the designated Block A fencing."
};

const weeklyCallSheets: CallSheetData[] = [
  dummyCallSheet,
  { ...dummyCallSheet, shootDayNum: 24, date: "2026-06-21", weather: "Clear sunny day, 31°C", todayScenes: [{ scene: "Sc 35", desc: "Market Chase Stunts", cast: "Stunt Doubles", time: "09:00 AM", pages: "1" }] },
  { ...dummyCallSheet, shootDayNum: 25, date: "2026-06-22", weather: "Partly cloudy, 29°C", todayScenes: [{ scene: "Sc 67", desc: "Forest Ambush Sequence", cast: "Saif Ali Khan, Stunt crew", time: "10:00 AM", pages: "3" }] }
];

export default function DirectorView() {
  const [activeMenu, setActiveMenu] = useState<"Home" | "Scenes" | "Creative" | "Call Sheets" | "References">("Home");
  const [callSheetView, setCallSheetView] = useState<"day" | "week" | "print">("day");

  const scenesData = [
    {
      num: "34",
      title: "Rajahmundry Market Chase",
      status: "Ready",
      mood: "Warm daylight, chaotic, high-contrast action",
      camera: "Handheld anamorphic, 35mm, low-angle tracking shots",
      performance: "High urgency, heavy crowd reactions, lead character breathing heavily.",
      visualRef: "Muted rustic orange & steel blue",
      blocking: "Ready", costumes: "Ready", props: "Ready", cameraGear: "Ready", location: "Ready", talent: "Ready"
    },
    {
      num: "41",
      title: "Palace Corridor Confrontation",
      status: "Revision",
      mood: "Cool moonlight, heavy shadows, tense silence",
      camera: "Steadicam, slow push-in, wide focal length",
      performance: "Understated, whispered dialogue, eye-line match is critical.",
      visualRef: "Emerald & midnight gold",
      blocking: "Ready", costumes: "Ready", props: "Pending", cameraGear: "Ready", location: "Ready", talent: "Ready"
    },
    {
      num: "12",
      title: "Intro Village Arrival",
      status: "Locked",
      mood: "Golden hour haze, warm tones, nostalgic cinematic landscape",
      camera: "Drone overhead landscape, slider crane transition",
      performance: "Welcoming expressions, wide establishing setup.",
      visualRef: "Clay orange & natural greens",
      blocking: "Ready", costumes: "Ready", props: "Ready", cameraGear: "Ready", location: "Ready", talent: "Ready"
    },
    {
      num: "67",
      title: "Forest Ambush Sequence",
      status: "Revision",
      mood: "Overcast misty forest, monochrome shades, silhouettes",
      camera: "Technocrane, rapid whip pans, tracking drone",
      performance: "Stunt heavy, complex reaction coordinates.",
      visualRef: "Deep forest green & mist gray",
      blocking: "Pending", costumes: "Warning", props: "Ready", cameraGear: "Ready", location: "Ready", talent: "Pending"
    }
  ];

  return (
    <div className="p-4 md:p-8 max-w-[1600px] mx-auto min-h-screen bg-background text-foreground flex flex-col gap-6 md:gap-8">

      {/* Cinematic Navigation Subheader */}
      <div className="flex border-b border-border gap-2 overflow-x-auto pb-1 shrink-0 -mx-4 px-4 md:mx-0 md:px-0">
        {(["Home", "Scenes", "Creative", "Call Sheets", "References"] as const).map(menu => (
          <button
            key={menu}
            onClick={() => setActiveMenu(menu)}
            className={`px-4 py-2 text-xs md:text-sm font-bold border-b-2 transition-all shrink-0 ${activeMenu === menu
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
          >
            {menu}
          </button>
        ))}
      </div>

      {activeMenu === "Home" && (
        <>
          {/* Cinematic Vision Header */}
          <header className="relative overflow-hidden rounded-[20px] border border-border bg-card p-6 shadow-md">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-85 pointer-events-none" />
            <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5" /> Creative Command Center
                </div>
                <h1 className="text-2xl md:text-3xl font-display font-extrabold tracking-tight text-foreground">Good morning, Koratala Siva.</h1>
                <p className="text-sm text-muted-foreground font-medium">
                  Overseeing visual narrative and shot readiness for <strong className="text-primary">Devara: Part 2</strong>.
                </p>
              </div>
              <Link href="/" className="px-4 py-2 bg-card rounded-xl border border-border text-xs font-bold text-muted-foreground hover:text-primary hover:border-primary/20 transition-all flex items-center gap-1.5 shadow-xs">
                <ArrowLeft className="w-3.5 h-3.5" /> Role Switcher
              </Link>
            </div>
          </header>

          {/* Story Readiness & Creative KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { label: "Approved Scenes", value: "89 / 312", detail: "Locked & Storyboarded", icon: CheckCircle2, color: "text-success", bg: "bg-success/5 border-success/10" },
              { label: "Pending Revisions", value: "12 Scenes", detail: "Requires Creative Feedback", icon: RefreshCw, color: "text-primary", bg: "bg-primary/5 border-primary/10" },
              { label: "Continuity Status", value: "4 Alerts", detail: "Props & Costume warning", icon: AlertCircle, color: "text-destructive", bg: "bg-destructive/5 border-destructive/10" },
              { label: "Shot Readiness", value: "94%", detail: "Equipment & Location locked", icon: Camera, color: "text-primary", bg: "bg-primary/5 border-primary/10" },
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
                  <p className="text-[10px] font-semibold text-muted-foreground">{kpi.detail}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Main Grid: 2 Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start">

            {/* Left Section: Main Interactive Hub (col-span-8) */}
            <div className="lg:col-span-8 space-y-6 md:space-y-8">

              {/* Director Vision Board */}
              <div className="">

                {/* Storyboard Card */}
                <div className="border border-border rounded-[20px] bg-card p-5 shadow-sm space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-primary" /> Climax Storyboard
                    </h3>
                    <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">Locked</span>
                  </div>
                  {/* Simulated Storyboard Sketch Preview */}
                  <div className="h-44 rounded-xl bg-gradient-to-br from-slate-900 to-slate-850 relative flex items-center justify-center overflow-hidden group border border-border">
                    <div className="absolute inset-0 bg-black/45 group-hover:bg-black/60 transition-colors" />
                    <div className="absolute bottom-3 left-3 text-white text-xs font-bold z-10">
                      <p>Frame #12: Boat Crash Close-up</p>
                      <span className="text-[10px] opacity-75 font-medium text-muted-foreground">Steadicam, Anamorphic lens</span>
                    </div>
                    <Play className="w-10 h-10 text-primary opacity-80 group-hover:scale-110 transition-transform z-10 cursor-pointer" />
                  </div>
                </div>

                {/* Mood References Card */}

              </div>

              {/* Camera inspirations */}
              <div className="border border-border rounded-[20px] bg-card p-6 shadow-sm space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <Camera className="w-4 h-4 text-primary" /> Camera & Composition Goals
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold text-muted-foreground">
                  <div className="p-3 bg-background border border-border rounded-xl">
                    <span className="text-primary block mb-1">Wide Lens Vistas</span>
                    establishing shots should capture massive ocean scales to represent emptiness and danger.
                  </div>
                  <div className="p-3 bg-background border border-border rounded-xl">
                    <span className="text-primary block mb-1">Dynamic Tracking</span>
                    Follow characters tightly during action sequences to heighten performance intensity.
                  </div>
                  <div className="p-3 bg-background border border-border rounded-xl">
                    <span className="text-primary block mb-1">Low-angle Profile</span>
                    Low angles for lead figures to establish heroism and physical presence.
                  </div>
                </div>
              </div>

            </div>

            {/* Right Section: Creative Priorities, Actor Notes, Creative Timeline (col-span-4) */}
            <div className="lg:col-span-4 space-y-6 md:space-y-8">

              {/* Creative Priorities Center */}
              <div className="border border-border rounded-[20px] bg-card p-6 shadow-sm">
                <h2 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-primary" /> Creative Priorities
                </h2>
                <div className="space-y-3.5">
                  {[
                    { desc: "Scene 41 backstory script revision needs director approval signature.", type: "Revisions", badge: "Critical" },
                    { desc: "Scene 67 costume continuity check mismatch regarding leather vest.", type: "Continuity", badge: "Urgent" },
                    { desc: "Climax VFX Pre-viz render approved plates ready for review.", type: "Approvals", badge: "Action Required" },
                  ].map((p, idx) => (
                    <div key={idx} className="p-3 bg-background border border-border rounded-xl flex flex-col gap-1.5">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold uppercase text-primary bg-primary/10 px-2 py-0.5 rounded">
                          {p.type}
                        </span>
                        <span className="text-[10px] font-bold text-destructive">{p.badge}</span>
                      </div>
                      <p className="text-xs text-muted-foreground font-medium leading-relaxed">{p.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actor Performance Notes */}
              <div className="border border-border rounded-[20px] bg-card p-6 shadow-sm">
                <h2 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" /> Actor Performance Notes
                </h2>
                <div className="space-y-3">
                  {[
                    { char: "Devara (NTR Jr.)", note: "Subtle authority, deep gravel voice tone during the council confrontation. Avoid emotional spikes.", priority: "High" },
                    { char: "Bhaira (Saif Ali Khan)", note: "Calculating stare, eyes always scanning the room. Play with slight nervous smile.", priority: "High" },
                    { char: "Thangam (Janhvi Kapoor)", note: "Expressive village eyes, dialogue delivery with local dialect inflections.", priority: "Medium" }
                  ].map((note, idx) => (
                    <div key={idx} className="p-3 border border-border rounded-xl bg-background space-y-1 shadow-xs">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-extrabold text-foreground">{note.char}</span>
                        <span className="text-[9px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded">{note.priority}</span>
                      </div>
                      <p className="text-xs text-muted-foreground font-medium leading-relaxed">{note.note}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </>
      )}

      {activeMenu === "Scenes" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {scenesData.map((scene, idx) => (
            <div key={idx} className="border border-border rounded-[20px] bg-card p-5 shadow-sm flex flex-col justify-between gap-4">

              {/* Top metadata */}
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">Scene {scene.num}</span>
                    <span className="text-xs text-muted-foreground font-bold">•</span>
                    <span className="text-xs text-muted-foreground font-semibold">Vision Card</span>
                  </div>
                  <h4 className="text-sm font-extrabold text-foreground mt-1">{scene.title}</h4>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${scene.status === 'Locked' ? 'bg-success/20 text-success' :
                  scene.status === 'Ready' ? 'bg-primary/20 text-primary' : 'bg-primary/15 text-primary'
                  }`}>
                  {scene.status}
                </span>
              </div>

              {/* Creative aspects details */}
              <div className="space-y-2.5 text-xs border-y border-border py-3">
                <p className="text-muted-foreground"><strong className="text-foreground font-extrabold">Mood & Lighting:</strong> {scene.mood}</p>
                <p className="text-muted-foreground"><strong className="text-foreground font-extrabold">Camera / Lens:</strong> {scene.camera}</p>
                <p className="text-muted-foreground"><strong className="text-foreground font-extrabold">Actor Focus:</strong> {scene.performance}</p>
              </div>

              {/* Shot readiness grid */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-muted-foreground uppercase block">Shot Readiness Factors</span>
                <div className="grid grid-cols-6 gap-1 text-[9px] font-bold text-center">
                  <span className={`py-1 rounded ${scene.blocking === 'Ready' ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive'}`}>Block</span>
                  <span className={`py-1 rounded ${scene.costumes === 'Ready' ? 'bg-success/20 text-success' : 'bg-primary/10 text-primary'}`}>Cost</span>
                  <span className={`py-1 rounded ${scene.props === 'Ready' ? 'bg-success/20 text-success' : 'bg-primary/10 text-primary'}`}>Props</span>
                  <span className={`py-1 rounded bg-success/20 text-success`}>Cam</span>
                  <span className={`py-1 rounded bg-success/20 text-success`}>Loc</span>
                  <span className={`py-1 rounded ${scene.talent === 'Ready' ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive'}`}>Cast</span>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {activeMenu === "Creative" && (
        <div className="border border-border rounded-[20px] bg-card p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <Layers className="w-4 h-4 text-destructive" /> Continuity Warnings
            </h3>
            <span className="text-[10px] font-bold text-destructive bg-destructive/10 px-2 py-0.5 rounded">4 Risks</span>
          </div>

          <div className="space-y-3">
            {[
              { issue: "Scene 67 Forest Ambush - costume mismatch: Lead character vest blood stain doesn't match Scene 66 wrap state.", dept: "Costumes", priority: "Critical" },
              { issue: "Scene 41 Corridor - prop variance: Knife model changed between Take 1 and Take 5 setup.", dept: "Props", priority: "High" },
              { issue: "Scene 34 Market - lighting color balance mismatch on drone shots versus handheld plates.", dept: "Camera / DOP", priority: "Medium" }
            ].map((c, i) => (
              <div key={i} className="p-3 border border-border rounded-xl bg-background flex justify-between items-start gap-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase text-primary">{c.dept}</span>
                  <p className="text-xs font-medium text-muted-foreground">{c.issue}</p>
                </div>
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${c.priority === 'Critical' ? 'bg-destructive/20 text-destructive' : 'bg-primary/20 text-primary'
                  }`}>{c.priority}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeMenu === "Call Sheets" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 bg-card p-1 rounded-xl border border-border">
              <button
                onClick={() => setCallSheetView("day")}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${callSheetView === "day" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                Day View
              </button>
              <button
                onClick={() => setCallSheetView("week")}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${callSheetView === "week" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                Weekly View
              </button>
              <button
                onClick={() => setCallSheetView("print")}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${callSheetView === "print" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                Print View
              </button>
            </div>

            <button
              onClick={() => window.print()}
              className="p-2 bg-card border border-border rounded-lg text-muted-foreground hover:text-foreground hover:border-primary/20 transition-all flex items-center gap-2 text-xs font-bold"
            >
              <Printer className="w-4 h-4" /> Print PDF
            </button>
          </div>

          {callSheetView === "day" && (
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-8 shadow-md">
              {/* Header Box */}
              <div className="border-b border-border pb-6 flex flex-col md:flex-row justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-display font-extrabold tracking-tight text-foreground">{dummyCallSheet.productionName}</h1>
                  <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mt-1">{dummyCallSheet.unitInfo} — Day {dummyCallSheet.shootDayNum}</p>
                </div>
                <div className="text-left md:text-right text-xs space-y-1 text-muted-foreground">
                  <p><strong className="text-foreground">Date:</strong> {dummyCallSheet.date}</p>
                  <p><strong className="text-foreground">Sunrise:</strong> {dummyCallSheet.sunrise} | <strong className="text-foreground">Sunset:</strong> {dummyCallSheet.sunset}</p>
                  <p><strong className="text-foreground">Weather:</strong> {dummyCallSheet.weather}</p>
                </div>
              </div>

              {/* Location Block */}
              <div className="bg-background border border-border rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Main Location</h3>
                  <p className="text-sm font-bold text-foreground mt-0.5">{dummyCallSheet.location}</p>
                </div>
              </div>

              {/* Grid sections */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Side: Scenes list & notes */}
                <div className="lg:col-span-8 space-y-6">
                  {/* Today's Scenes */}
                  <div>
                    <h3 className="text-sm font-bold text-primary uppercase tracking-wider mb-3">Today's Shooting Schedule</h3>
                    <div className="border border-border rounded-xl overflow-hidden bg-background">
                      <table className="w-full text-xs text-left border-collapse">
                        <thead>
                          <tr className="bg-card border-b border-border text-muted-foreground font-bold">
                            <th className="p-3">Scene</th>
                            <th className="p-3">Description</th>
                            <th className="p-3">Cast Requirements</th>
                            <th className="p-3">Est Time</th>
                            <th className="p-3 text-right">Pages</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border text-foreground">
                          {dummyCallSheet.todayScenes.map((s, i) => (
                            <tr key={i} className="hover:bg-card/50">
                              <td className="p-3 font-bold text-primary">{s.scene}</td>
                              <td className="p-3 font-medium">{s.desc}</td>
                              <td className="p-3 text-muted-foreground">{s.cast}</td>
                              <td className="p-3 font-mono">{s.time}</td>
                              <td className="p-3 text-right font-semibold">{s.pages}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Cast Call Times */}
                  <div>
                    <h3 className="text-sm font-bold text-primary uppercase tracking-wider mb-3">Cast Call Times</h3>
                    <div className="border border-border rounded-xl overflow-hidden bg-background">
                      <table className="w-full text-xs text-left border-collapse">
                        <thead>
                          <tr className="bg-card border-b border-border text-muted-foreground font-bold">
                            <th className="p-3">Role</th>
                            <th className="p-3">Actor</th>
                            <th className="p-3">H/M/U Call</th>
                            <th className="p-3">On Set Call</th>
                            <th className="p-3 text-right">Travel Pickup</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border text-foreground">
                          {dummyCallSheet.castCallTimes.map((c, i) => (
                            <tr key={i} className="hover:bg-card/50">
                              <td className="p-3 font-bold">{c.role}</td>
                              <td className="p-3 font-medium">{c.actor}</td>
                              <td className="p-3">{c.makeup}</td>
                              <td className="p-3 font-semibold text-primary">{c.onSet}</td>
                              <td className="p-3 text-right text-muted-foreground">{c.pickup}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Crew Call Times */}
                  <div>
                    <h3 className="text-sm font-bold text-primary uppercase tracking-wider mb-3">Crew Call Times</h3>
                    <div className="border border-border rounded-xl overflow-hidden bg-background">
                      <table className="w-full text-xs text-left border-collapse">
                        <thead>
                          <tr className="bg-card border-b border-border text-muted-foreground font-bold">
                            <th className="p-3">Department</th>
                            <th className="p-3">Role</th>
                            <th className="p-3">Name</th>
                            <th className="p-3 text-right">Call Time</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border text-foreground">
                          {dummyCallSheet.crewCallTimes.map((cr, i) => (
                            <tr key={i} className="hover:bg-card/50">
                              <td className="p-3 font-bold text-muted-foreground">{cr.dept}</td>
                              <td className="p-3 font-medium">{cr.role}</td>
                              <td className="p-3">{cr.name}</td>
                              <td className="p-3 text-right font-semibold text-primary">{cr.callTime}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Right Side: Department Notes & Logistics */}
                <div className="lg:col-span-4 space-y-6">
                  {/* Department Notes */}
                  <div className="bg-background border border-border rounded-xl p-5 space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-primary">Department Notes</h3>
                    <ul className="text-xs space-y-2 text-muted-foreground list-disc list-inside">
                      {dummyCallSheet.departmentNotes.map((note, idx) => (
                        <li key={idx} className="leading-relaxed">{note}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Director & Camera Notes */}
                  <div className="bg-background border border-border rounded-xl p-5 space-y-4 text-xs">
                    <div>
                      <h4 className="font-bold text-primary uppercase tracking-wider mb-1">Director's Notes</h4>
                      <p className="text-muted-foreground leading-relaxed">{dummyCallSheet.directorNotes}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-primary uppercase tracking-wider mb-1">Camera & Lens Notes</h4>
                      <p className="text-muted-foreground leading-relaxed">{dummyCallSheet.cameraNotes}</p>
                    </div>
                  </div>

                  {/* Emergency & Transportation */}
                  <div className="bg-background border border-border rounded-xl p-5 space-y-4 text-xs">
                    <div>
                      <h4 className="font-bold text-primary uppercase tracking-wider mb-2">Emergency Contacts</h4>
                      <div className="space-y-1">
                        {dummyCallSheet.emergencyContacts.map((contact, i) => (
                          <div key={i} className="flex justify-between border-b border-border/50 pb-1.5 mb-1.5 last:border-0 last:pb-0 last:mb-0">
                            <div>
                              <p className="font-bold">{contact.name}</p>
                              <p className="text-[10px] text-muted-foreground">{contact.role}</p>
                            </div>
                            <span className="font-mono font-semibold text-primary">{contact.phone}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-border">
                      <h4 className="font-bold text-primary uppercase tracking-wider mb-1">Transportation Notes</h4>
                      <p className="text-muted-foreground leading-relaxed">{dummyCallSheet.transportationNotes}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {callSheetView === "week" && (
            <div className="space-y-6">
              {weeklyCallSheets.map((cs) => (
                <div key={cs.shootDayNum} className="bg-card border border-border rounded-xl p-5 shadow-sm space-y-3">
                  <div className="flex justify-between items-center">
                    <h3 className="font-display font-extrabold text-foreground">Day {cs.shootDayNum} — {cs.date}</h3>
                    <span className="text-xs text-muted-foreground">{cs.weather}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <p className="font-semibold text-foreground mb-1">Scheduled Scenes:</p>
                    {cs.todayScenes.map((s, idx) => (
                      <p key={idx} className="pl-2 border-l border-primary">{s.scene}: {s.desc} ({s.pages} pgs)</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {callSheetView === "print" && (
            <div className="bg-white text-black p-8 font-serif max-w-[800px] mx-auto border-4 border-double border-black shadow-lg">
              <div className="text-center border-b-4 border-black pb-4 mb-6">
                <h1 className="text-3xl font-extrabold tracking-wider uppercase">{dummyCallSheet.productionName}</h1>
                <p className="text-sm font-bold tracking-widest mt-1">DAILY CALL SHEET — DAY {dummyCallSheet.shootDayNum}</p>
                <p className="text-xs font-semibold mt-1">DATE: {dummyCallSheet.date} | WEATHER: {dummyCallSheet.weather}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs mb-6 border-b-2 border-black pb-4">
                <div>
                  <p><strong>SHOOTING LOCATION:</strong> {dummyCallSheet.location}</p>
                  <p><strong>SUNRISE:</strong> {dummyCallSheet.sunrise} | <strong>SUNSET:</strong> {dummyCallSheet.sunset}</p>
                </div>
                <div>
                  <p><strong>UNIT:</strong> {dummyCallSheet.unitInfo}</p>
                  <p><strong>SPECIAL INSTR:</strong> {dummyCallSheet.specialInstructions}</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-bold border-b border-black pb-1 mb-2 uppercase">Shooting Schedule</h3>
                <table className="w-full text-xs text-left border-collapse border border-black">
                  <thead>
                    <tr className="bg-neutral-200 border-b border-black text-black">
                      <th className="p-2 border-r border-black">Scene</th>
                      <th className="p-2 border-r border-black">Description</th>
                      <th className="p-2 border-r border-black">Cast</th>
                      <th className="p-2">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dummyCallSheet.todayScenes.map((s, i) => (
                      <tr key={i} className="border-b border-black">
                        <td className="p-2 border-r border-black font-bold">{s.scene}</td>
                        <td className="p-2 border-r border-black">{s.desc}</td>
                        <td className="p-2 border-r border-black">{s.cast}</td>
                        <td className="p-2">{s.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div>
                <h3 className="text-sm font-bold border-b border-black pb-1 mb-2 uppercase">Cast Call Times</h3>
                <table className="w-full text-xs text-left border-collapse border border-black">
                  <thead>
                    <tr className="bg-neutral-200 border-b border-black text-black">
                      <th className="p-2 border-r border-black">Role</th>
                      <th className="p-2 border-r border-black">Actor</th>
                      <th className="p-2 border-r border-black">Makeup</th>
                      <th className="p-2">On Set</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dummyCallSheet.castCallTimes.map((c, i) => (
                      <tr key={i} className="border-b border-black">
                        <td className="p-2 border-r border-black font-bold">{c.role}</td>
                        <td className="p-2 border-r border-black">{c.actor}</td>
                        <td className="p-2 border-r border-black">{c.makeup}</td>
                        <td className="p-2 font-bold">{c.onSet}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {activeMenu === "References" && (
        <div className="border border-border rounded-[20px] bg-card p-6 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-foreground">Creative Decision Timeline</h2>
          <div className="relative pl-5 border-l border-border space-y-5 my-2">
            {[
              { event: "Locked blocking for Scene 22 safehouse", why: "To coordinate camera movement with dialog flow.", time: "Oct 18" },
              { event: "Adjusted lighting mood to cooler tones in Scene 89", why: "To match the character isolation theme.", time: "Oct 16" },
              { event: "Approved climax storyboard frames V2", why: "Enhanced dramatic pacing for underwater action.", time: "Oct 14" }
            ].map((evt, idx) => (
              <div key={idx} className="relative text-xs">
                {/* dot */}
                <span className="absolute -left-[30px] top-1 w-2.5 h-2.5 rounded-full border-2 border-background bg-primary ring-4 ring-primary/20" />
                <div className="space-y-0.5">
                  <div className="flex justify-between">
                    <span className="font-extrabold text-foreground">{evt.event}</span>
                    <span className="text-[9px] text-muted-foreground font-bold">{evt.time}</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground font-medium"><strong className="text-foreground">Impact:</strong> {evt.why}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
