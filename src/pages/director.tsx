import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { 
  Film, Image, Camera, AlertCircle, CheckCircle2, 
  Clock, Sparkles, User, Palette, Eye, ArrowLeft,
  ChevronRight, ClipboardList, RefreshCw, Star, Layers, Play
} from "lucide-react";

export default function DirectorView() {
  const [activeTab, setActiveTab] = useState<"vision" | "scenes" | "continuity">("vision");

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
    <div className="p-6 md:p-8 max-w-[1600px] mx-auto min-h-screen bg-[#FAFAFC] text-[#1A1A1A] flex flex-col gap-8">
      
      {/* Cinematic Vision Header */}
      <header className="relative overflow-hidden rounded-[20px] border border-[#E5E7EB] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FFF4E8] to-[#FFFFFF] opacity-90 pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF4E8] text-[#FF7A00] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" /> Creative Command Center
            </div>
            <h1 className="text-3xl font-display font-extrabold tracking-tight text-[#1A1A1A]">Good morning, Koratala Siva.</h1>
            <p className="text-sm text-[#6B7280] font-medium">
              Overseeing visual narrative and shot readiness for <strong className="text-[#FF7A00]">Devara: Part 2</strong>.
            </p>
          </div>
          <Link href="/" className="px-4 py-2 bg-white rounded-xl border border-[#E5E7EB] text-xs font-bold text-[#6B7280] hover:text-[#FF7A00] hover:border-[#FF7A00]/20 transition-all flex items-center gap-1.5 shadow-xs">
            <ArrowLeft className="w-3.5 h-3.5" /> Role Switcher
          </Link>
        </div>
      </header>

      {/* Story Readiness & Creative KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Approved Scenes", value: "89 / 312", detail: "Locked & Storyboarded", icon: CheckCircle2, color: "text-[#22C55E]", bg: "bg-[#ECFDF3]/50 border-[#22C55E]/10" },
          { label: "Pending Revisions", value: "12 Scenes", detail: "Requires Creative Feedback", icon: RefreshCw, color: "text-[#FF7A00]", bg: "bg-[#FFF4E8]/60 border-[#FF7A00]/10" },
          { label: "Continuity Status", value: "4 Alerts", detail: "Props & Costume warning", icon: AlertCircle, color: "text-[#EF4444]", bg: "bg-[#FEF2F2] border-[#EF4444]/15" },
          { label: "Shot Readiness", value: "94%", detail: "Equipment & Location locked", icon: Camera, color: "text-[#3B82F6]", bg: "bg-[#EAF3FF]/40 border-[#3B82F6]/10" },
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
              <p className="text-[10px] font-semibold text-[#6B7280]">{kpi.detail}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Section: Main Interactive Hub (col-span-8) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Tab Selection */}
          <div className="flex border-b border-[#E5E7EB] gap-6 text-sm font-semibold">
            {[
              { id: "vision", label: "Director Vision Board", icon: Image },
              { id: "scenes", label: "Scene Creative Cards", icon: Film },
              { id: "continuity", label: "Continuity Center", icon: Layers },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-4 flex items-center gap-2 border-b-2 transition-all ${
                  activeTab === tab.id 
                    ? "border-[#FF7A00] text-[#FF7A00] font-bold" 
                    : "border-transparent text-[#6B7280] hover:text-[#1A1A1A]"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div>
            {activeTab === "vision" && (
              <div className="space-y-6">
                
                {/* Director Vision Board */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* Storyboard Card */}
                  <div className="border border-[#E5E7EB] rounded-[20px] bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.03)] space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[#6B7280] flex items-center gap-2">
                        <Image className="w-4 h-4 text-[#FF7A00]" /> Climax Storyboard
                      </h3>
                      <span className="text-[10px] font-bold text-[#FF7A00] bg-[#FFF4E8] px-2 py-0.5 rounded">Locked</span>
                    </div>
                    {/* Simulated Storyboard Sketch Preview */}
                    <div className="h-44 rounded-xl bg-gradient-to-br from-stone-900 to-neutral-800 relative flex items-center justify-center overflow-hidden group">
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors" />
                      <div className="absolute bottom-3 left-3 text-white text-xs font-bold z-10">
                        <p>Frame #12: Boat Crash Close-up</p>
                        <span className="text-[10px] opacity-75 font-medium">Steadicam, Anamorphic lens</span>
                      </div>
                      <Play className="w-10 h-10 text-white opacity-80 group-hover:scale-110 transition-transform z-10 cursor-pointer" />
                    </div>
                  </div>

                  {/* Mood References Card */}
                  <div className="border border-[#E5E7EB] rounded-[20px] bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.03)] space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[#6B7280] flex items-center gap-2">
                        <Palette className="w-4 h-4 text-[#3B82F6]" /> Color Palette References
                      </h3>
                      <span className="text-[10px] font-bold text-[#3B82F6] bg-[#EAF3FF] px-2 py-0.5 rounded">Tone: Cinematic</span>
                    </div>
                    <div className="h-44 rounded-xl bg-[#FAFAFC] border border-[#E5E7EB] p-3 flex flex-col justify-between">
                      <div className="grid grid-cols-4 gap-2 h-20">
                        <div className="bg-[#1C2D37] rounded-lg relative group cursor-pointer shadow-xs">
                          <span className="absolute inset-0 flex items-center justify-center text-[10px] text-white opacity-0 group-hover:opacity-100 font-mono transition-opacity">#1C2D37</span>
                        </div>
                        <div className="bg-[#3D525C] rounded-lg relative group cursor-pointer shadow-xs">
                          <span className="absolute inset-0 flex items-center justify-center text-[10px] text-white opacity-0 group-hover:opacity-100 font-mono transition-opacity">#3D525C</span>
                        </div>
                        <div className="bg-[#B97A44] rounded-lg relative group cursor-pointer shadow-xs">
                          <span className="absolute inset-0 flex items-center justify-center text-[10px] text-white opacity-0 group-hover:opacity-100 font-mono transition-opacity">#B97A44</span>
                        </div>
                        <div className="bg-[#DEB887] rounded-lg relative group cursor-pointer shadow-xs">
                          <span className="absolute inset-0 flex items-center justify-center text-[10px] text-white opacity-0 group-hover:opacity-100 font-mono transition-opacity">#DEB887</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-extrabold text-[#1A1A1A]">Ocean Conflict Scheme</p>
                        <p className="text-[10px] text-[#6B7280]">Steely blues contrasted with warm rust and sand lighting.</p>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Cinematography inspirations */}
                <div className="border border-[#E5E7EB] rounded-[20px] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)] space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#6B7280] flex items-center gap-2">
                    <Camera className="w-4 h-4 text-[#FF7A00]" /> Camera & Composition Goals
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold text-[#4B5563]">
                    <div className="p-3 bg-[#FAFAFC] border border-[#E5E7EB] rounded-xl">
                      <span className="text-[#FF7A00] block mb-1">Wide Lens Vistas</span>
                      establishing shots should capture massive ocean scales to represent emptiness and danger.
                    </div>
                    <div className="p-3 bg-[#FAFAFC] border border-[#E5E7EB] rounded-xl">
                      <span className="text-[#3B82F6] block mb-1">Dynamic Tracking</span>
                      Follow characters tightly during action sequences to heighten performance intensity.
                    </div>
                    <div className="p-3 bg-[#FAFAFC] border border-[#E5E7EB] rounded-xl">
                      <span className="text-[#22C55E] block mb-1">Low-angle Profile</span>
                      Low angles for lead figures to establish heroism and physical presence.
                    </div>
                  </div>
                </div>

              </div>
            )}

            {activeTab === "scenes" && (
              <div className="space-y-6">
                
                {/* Scene Creative Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {scenesData.map((scene, idx) => (
                    <div key={idx} className="border border-[#E5E7EB] rounded-[20px] bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.03)] flex flex-col justify-between gap-4">
                      
                      {/* Top metadata */}
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-[#FF7A00] bg-[#FFF4E8] px-2 py-0.5 rounded">Scene {scene.num}</span>
                            <span className="text-xs text-[#9CA3AF] font-bold">•</span>
                            <span className="text-xs text-[#6B7280] font-semibold">Vision Card</span>
                          </div>
                          <h4 className="text-sm font-extrabold text-[#1A1A1A] mt-1">{scene.title}</h4>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          scene.status === 'Locked' ? 'bg-[#ECFDF3] text-[#22C55E]' :
                          scene.status === 'Ready' ? 'bg-[#EAF3FF] text-[#3B82F6]' : 'bg-[#FFF4E8] text-[#FF7A00]'
                        }`}>
                          {scene.status}
                        </span>
                      </div>

                      {/* Creative aspects details */}
                      <div className="space-y-2.5 text-xs border-y border-[#F3F4F6] py-3">
                        <p className="text-[#4B5563]"><strong className="text-[#1A1A1A] font-extrabold">Mood & Lighting:</strong> {scene.mood}</p>
                        <p className="text-[#4B5563]"><strong className="text-[#1A1A1A] font-extrabold">Camera / Lens:</strong> {scene.camera}</p>
                        <p className="text-[#4B5563]"><strong className="text-[#1A1A1A] font-extrabold">Actor Focus:</strong> {scene.performance}</p>
                      </div>

                      {/* Shot readiness grid */}
                      <div className="space-y-2">
                        <span className="text-[10px] font-bold text-[#9CA3AF] uppercase block">Shot Readiness Factors</span>
                        <div className="grid grid-cols-6 gap-1 text-[9px] font-bold text-center">
                          <span className={`py-1 rounded ${scene.blocking === 'Ready' ? 'bg-[#ECFDF3] text-[#22C55E]' : 'bg-[#FEF2F2] text-[#EF4444]'}`}>Block</span>
                          <span className={`py-1 rounded ${scene.costumes === 'Ready' ? 'bg-[#ECFDF3] text-[#22C55E]' : 'bg-[#FFF4E8] text-[#FF7A00]'}`}>Cost</span>
                          <span className={`py-1 rounded ${scene.props === 'Ready' ? 'bg-[#ECFDF3] text-[#22C55E]' : 'bg-[#FFF4E8] text-[#FF7A00]'}`}>Props</span>
                          <span className={`py-1 rounded bg-[#ECFDF3] text-[#22C55E]`}>Cam</span>
                          <span className={`py-1 rounded bg-[#ECFDF3] text-[#22C55E]`}>Loc</span>
                          <span className={`py-1 rounded ${scene.talent === 'Ready' ? 'bg-[#ECFDF3] text-[#22C55E]' : 'bg-[#FEF2F2] text-[#EF4444]'}`}>Cast</span>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>

              </div>
            )}

            {activeTab === "continuity" && (
              <div className="space-y-6">
                
                {/* Continuity Center */}
                <div className="border border-[#E5E7EB] rounded-[20px] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)] space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#6B7280] flex items-center gap-2">
                      <Layers className="w-4 h-4 text-[#EF4444]" /> Continuity Warnings
                    </h3>
                    <span className="text-[10px] font-bold text-[#EF4444] bg-[#FEF2F2] px-2 py-0.5 rounded">4 Risks</span>
                  </div>

                  <div className="space-y-3">
                    {[
                      { issue: "Scene 67 Forest Ambush - costume mismatch: Lead character vest blood stain doesn't match Scene 66 wrap state.", dept: "Costumes", priority: "Critical" },
                      { issue: "Scene 41 Corridor - prop variance: Knife model changed between Take 1 and Take 5 setup.", dept: "Props", priority: "High" },
                      { issue: "Scene 34 Market - lighting color balance mismatch on drone shots versus handheld plates.", dept: "Camera / DOP", priority: "Medium" }
                    ].map((c, i) => (
                      <div key={i} className="p-3 border border-[#E5E7EB] rounded-xl bg-[#FAFAFC] flex justify-between items-start gap-3">
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold uppercase text-[#FF7A00]">{c.dept}</span>
                          <p className="text-xs font-medium text-[#4B5563]">{c.issue}</p>
                        </div>
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${
                          c.priority === 'Critical' ? 'bg-[#FEF2F2] text-[#EF4444]' : 'bg-[#FFF4E8] text-[#FF7A00]'
                        }`}>{c.priority}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}
          </div>

          {/* Scene Creative Pipeline */}
          <div className="border border-[#E5E7EB] rounded-[20px] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
            <h2 className="text-base font-bold text-[#1A1A1A] mb-4">Scene Creative Pipeline Stages</h2>
            <div className="grid grid-cols-5 gap-2 text-center text-xs font-bold">
              {[
                { stage: "1. Script Lock", status: "Complete", color: "bg-[#22C55E]" },
                { stage: "2. Storyboard", status: "Complete", color: "bg-[#22C55E]" },
                { stage: "3. Planning / Prep", status: "Active Stage", color: "bg-[#FF7A00]" },
                { stage: "4. Shooting Day", status: "Upcoming", color: "bg-[#9CA3AF]" },
                { stage: "5. Review Cut", status: "Upcoming", color: "bg-[#9CA3AF]" }
              ].map((p, idx) => (
                <div key={idx} className="p-3 bg-[#FAFAFC] border border-[#E5E7EB] rounded-xl flex flex-col justify-between h-20">
                  <span className="text-[10px] text-[#6B7280]">{p.stage}</span>
                  <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded text-white ${p.color}`}>
                    {p.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Section: Creative Priorities, Actor Notes, Creative Timeline (col-span-4) */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Creative Priorities Center */}
          <div className="border border-[#E5E7EB] rounded-[20px] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
            <h2 className="text-base font-bold text-[#1A1A1A] mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-[#FF7A00]" /> Creative Priorities Center
            </h2>
            <div className="space-y-3.5">
              {[
                { desc: "Scene 41 backstory script revision needs director approval signature.", type: "Revisions", badge: "Critical" },
                { desc: "Scene 67 costume continuity check mismatch regarding leather vest.", type: "Continuity", badge: "Urgent" },
                { desc: "Climax VFX Pre-viz render approved plates ready for review.", type: "Approvals", badge: "Action Required" },
              ].map((p, idx) => (
                <div key={idx} className="p-3 bg-[#FAFAFC] border border-[#E5E7EB] rounded-xl flex flex-col gap-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase text-[#FF7A00] bg-[#FFF4E8] px-2 py-0.5 rounded">
                      {p.type}
                    </span>
                    <span className="text-[10px] font-bold text-[#EF4444]">{p.badge}</span>
                  </div>
                  <p className="text-xs text-[#6B7280] font-medium leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Actor Performance Notes */}
          <div className="border border-[#E5E7EB] rounded-[20px] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
            <h2 className="text-base font-bold text-[#1A1A1A] mb-4 flex items-center gap-2">
              <User className="w-4 h-4 text-[#FF7A00]" /> Character & Performance Notes
            </h2>
            <div className="space-y-3">
              {[
                { char: "Devara (NTR Jr.)", note: "Subtle authority, deep gravel voice tone during the council confrontation. Avoid emotional spikes.", priority: "High" },
                { char: "Bhaira (Saif Ali Khan)", note: "Calculating stare, eyes always scanning the room. Play with slight nervous smile.", priority: "High" },
                { char: "Thangam (Janhvi Kapoor)", note: "Expressive village eyes, dialogue delivery with local dialect inflections.", priority: "Medium" }
              ].map((note, idx) => (
                <div key={idx} className="p-3 border border-[#E5E7EB] rounded-xl bg-white space-y-1 shadow-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-extrabold text-[#1A1A1A]">{note.char}</span>
                    <span className="text-[9px] font-bold text-[#FF7A00] bg-[#FFF4E8] px-1.5 py-0.5 rounded">{note.priority}</span>
                  </div>
                  <p className="text-xs text-[#6B7280] font-medium leading-relaxed">{note.note}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Creative Timeline */}
          <div className="border border-[#E5E7EB] rounded-[20px] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
            <h2 className="text-base font-bold text-[#1A1A1A] mb-4">Creative Decision Timeline</h2>
            <div className="relative pl-5 border-l border-[#E5E7EB] space-y-5 my-2">
              {[
                { event: "Locked blocking for Scene 22 safehouse", why: "To coordinate camera movement with dialog flow.", time: "Oct 18" },
                { event: "Adjusted lighting mood to cooler tones in Scene 89", why: "To match the character isolation theme.", time: "Oct 16" },
                { event: "Approved climax storyboard frames V2", why: "Enhanced dramatic pacing for underwater action.", time: "Oct 14" }
              ].map((evt, idx) => (
                <div key={idx} className="relative text-xs">
                  {/* dot */}
                  <span className="absolute -left-[30px] top-1 w-2.5 h-2.5 rounded-full border-2 border-white bg-[#FF7A00] ring-4 ring-[#FFF4E8]" />
                  <div className="space-y-0.5">
                    <div className="flex justify-between">
                      <span className="font-extrabold text-[#1A1A1A]">{evt.event}</span>
                      <span className="text-[9px] text-[#9CA3AF] font-bold">{evt.time}</span>
                    </div>
                    <p className="text-[10px] text-[#6B7280] font-medium"><strong className="text-[#1A1A1A]">Impact:</strong> {evt.why}</p>
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
