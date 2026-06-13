import { useState } from "react";
import { useRole } from "@/components/layout/RoleContext";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  UserCircle, Clapperboard, LayoutDashboard, Radio, Calculator,
  ScrollText, Banknote, Truck, Camera, Layers, Shirt, Scissors, ArrowRight, ChevronDown
} from "lucide-react";

// ─── Featured roles (4 primary) ─────────────────────────────────────────────

const FEATURED = [
  {
    id: "Producer", path: "/producer", icon: UserCircle, color: "#D4A843", tag: "Executive",
    desc: "Strategic oversight of the entire production — budget health, approvals, and executive reporting.",
    responsibilities: ["Budget variance approvals", "Investor reporting", "Production health overview"],
    kpis: [
      { label: "Budget Used",  value: "86%",    sub: "₹142Cr of ₹165Cr" },
      { label: "Schedule",     value: "Day 23",  sub: "of 52 days"        },
      { label: "Pending",      value: "4",       sub: "approvals"         },
    ],
    preview: <ProducerPreview />,
  },
  {
    id: "Director", path: "/director", icon: Clapperboard, color: "#A855F7", tag: "Creative",
    desc: "Creative command — scene status, shot progression, references, and continuity oversight.",
    responsibilities: ["Scene creative approvals", "Shot reference review", "Continuity sign-off"],
    kpis: [
      { label: "Scenes Shot",   value: "89",  sub: "of 312 total"   },
      { label: "Open Notes",    value: "12",  sub: "awaiting reply"  },
      { label: "Continuity",    value: "3",   sub: "flags open"      },
    ],
    preview: <DirectorPreview />,
  },
  {
    id: "Line Producer", path: "/line-producer", icon: LayoutDashboard, color: "#14B8A6", tag: "Operations",
    desc: "Full operational command — breakdown, scheduling, vendors, resources, and risk management.",
    responsibilities: ["Breakdown management", "Schedule control", "Vendor oversight"],
    kpis: [
      { label: "Today's Scenes", value: "3",   sub: "Day 23 schedule"  },
      { label: "Risk Items",     value: "8",   sub: "requiring action"  },
      { label: "Active Vendors", value: "23",  sub: "on record"         },
    ],
    preview: <LineProdPreview />,
  },
  {
    id: "AD", path: "/ad", icon: Radio, color: "#3B82F6", tag: "On-Set",
    desc: "Set management — call sheet, cast arrivals, real-time issue tracking from the floor.",
    responsibilities: ["Call sheet management", "Set coordination", "Issue escalation"],
    kpis: [
      { label: "Gen Call",    value: "05:30",  sub: "today"          },
      { label: "Cast Today",  value: "8",      sub: "principals + BG" },
      { label: "Open Issues", value: "2",      sub: "escalated"      },
    ],
    preview: <ADPreview />,
  },
];

// ─── Other 8 roles (compact) ─────────────────────────────────────────────────

const OTHER_ROLES = [
  { id: "Accountant",          path: "/accountant",          icon: Calculator, color: "#EF4444", desc: "Invoices, TDS, GST, budget vs actual" },
  { id: "Continuity",          path: "/continuity",          icon: ScrollText, color: "#F97316", desc: "Scene continuity, inconsistency flags" },
  { id: "Cashier",             path: "/cashier",             icon: Banknote,   color: "#22C55E", desc: "Cash management, daily reconciliation" },
  { id: "Production Manager",  path: "/production-manager",  icon: Truck,      color: "#06B6D4", desc: "Logistics, vehicles, accommodation" },
  { id: "Cinematographer",     path: "/cinematographer",     icon: Camera,     color: "#8B5CF6", desc: "Camera, lighting, equipment schedule" },
  { id: "Production Designer", path: "/production-designer", icon: Layers,     color: "#EC4899", desc: "Props, sets, art department" },
  { id: "Costume Designer",    path: "/costume-designer",    icon: Shirt,      color: "#F59E0B", desc: "Wardrobes, fittings, continuity" },
  { id: "Editor",              path: "/editor",              icon: Scissors,   color: "#6366F1", desc: "Takes log, VFX flags, continuity notes" },
];

// ─── Mini preview components ──────────────────────────────────────────────────

function ProducerPreview() {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-[10px] text-white/30 mb-1">
        <span>Budget Burn</span><span>₹142Cr / ₹165Cr</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
        <div className="h-full rounded-full bg-gradient-to-r from-[#D4A843] to-[#f0c060]" style={{ width: "86%" }} />
      </div>
      <div className="grid grid-cols-3 gap-1.5 mt-2">
        {[["Approved","12","text-green-400"],["Pending","4","text-amber-400"],["Flagged","2","text-red-400"]].map(([l,v,c]) => (
          <div key={l} className="bg-white/5 rounded-lg p-2 text-center">
            <p className={`text-base font-display font-bold ${c}`}>{v}</p>
            <p className="text-[9px] text-white/25 mt-0.5">{l}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function DirectorPreview() {
  const scenes = [
    {n:"34",s:"Scheduled",c:"#f59e0b"},{n:"41",s:"Scheduled",c:"#f59e0b"},
    {n:"55",s:"Locked",c:"#22c55e"},{n:"67",s:"Shot",c:"#14B8A6"},
    {n:"78",s:"Scheduled",c:"#f59e0b"},{n:"89",s:"Pending",c:"#ef4444"},
  ];
  return (
    <div className="space-y-1.5">
      <p className="text-[10px] text-white/30 mb-2">Active Scenes</p>
      <div className="grid grid-cols-3 gap-1.5">
        {scenes.map(s => (
          <div key={s.n} className="bg-white/5 rounded-lg p-2">
            <p className="text-sm font-display font-bold text-white">Sc {s.n}</p>
            <div className="flex items-center gap-1 mt-1">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: s.c }} />
              <p className="text-[9px] text-white/30">{s.s}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LineProdPreview() {
  const items = [
    {scene:"34",title:"Market Chase",status:"Ready",risk:"Low"},
    {scene:"41",title:"Palace Night",status:"At Risk",risk:"High"},
    {scene:"55",title:"Wedding Seq.",status:"Locked",risk:"Low"},
  ];
  return (
    <div className="space-y-1.5">
      <p className="text-[10px] text-white/30 mb-2">Today's Schedule</p>
      {items.map(i => (
        <div key={i.scene} className="flex items-center justify-between bg-white/5 rounded-lg px-3 py-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-display font-bold text-[#14B8A6]">Sc {i.scene}</span>
            <span className="text-[10px] text-white/40 truncate">{i.title}</span>
          </div>
          <span className={`text-[9px] font-bold ${i.risk === "High" ? "text-red-400" : "text-green-400"}`}>{i.status}</span>
        </div>
      ))}
    </div>
  );
}

function ADPreview() {
  const cast = [
    {name:"NTR Jr.",time:"07:00",status:"Confirmed"},
    {name:"Saif Ali Khan",time:"08:00 ⚠",status:"Delayed"},
    {name:"6 Extras",time:"05:45",status:"Confirmed"},
  ];
  return (
    <div className="space-y-1.5">
      <p className="text-[10px] text-white/30 mb-2">Call Sheet · Day 23</p>
      {cast.map(c => (
        <div key={c.name} className="flex items-center justify-between bg-white/5 rounded-lg px-3 py-2">
          <span className="text-[10px] text-white/60 font-medium">{c.name}</span>
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-display font-bold text-white/40">{c.time}</span>
            <div className={`w-1.5 h-1.5 rounded-full ${c.status === "Delayed" ? "bg-amber-400" : "bg-green-400"}`} />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function RoleSwitcher() {
  const { setRole } = useRole();
  const [, setLocation] = useLocation();
  const [showAll, setShowAll] = useState(false);

  const handleSelect = (id: string, path: string) => {
    setRole(id as Parameters<typeof setRole>[0]);
    setLocation(path);
  };

  return (
    <div
      className="min-h-[100dvh] flex flex-col relative overflow-hidden"
      style={{ background: "linear-gradient(145deg, #07070a 0%, #0c0a12 50%, #07090f 100%)" }}
    >
      {/* Ambient light orbs */}
      <div className="absolute top-[-20%] left-[5%] w-[600px] h-[600px] rounded-full blur-[160px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(212,168,67,0.18) 0%, transparent 70%)" }} />
      <div className="absolute bottom-[-15%] right-[10%] w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)" }} />
      <div className="absolute top-[40%] right-[30%] w-[300px] h-[300px] rounded-full blur-[100px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)" }} />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-8 py-5 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center font-display font-bold text-lg text-black"
            style={{ background: "linear-gradient(135deg, #D4A843 0%, #c49030 100%)" }}>
            C
          </div>
          <div>
            <p className="text-white font-display font-bold text-[15px] tracking-tight leading-tight">Cinamitra</p>
            <p className="text-white/25 text-[9px] uppercase tracking-[0.2em]">Production OS</p>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-6">
            {[
              { label: "Production", value: "Devara: Part 2" },
              { label: "Day", value: "23 of 52" },
              { label: "Scenes", value: "312" },
              { label: "Budget", value: "₹165 Cr" },
            ].map(s => (
              <div key={s.label} className="text-[11px]">
                <span className="text-white/25">{s.label}: </span>
                <span className="text-white/55 font-medium">{s.value}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => { setRole("Line Producer"); setLocation("/dashboard"); }}
            className="flex items-center gap-2 text-xs font-semibold text-white/40 border border-white/10 hover:border-white/20 hover:text-white/60 px-4 py-2 rounded-lg transition-all duration-200"
          >
            Full Production <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </header>

      <div className="relative z-10 flex-1 flex flex-col items-center px-6 py-14">

        {/* Hero text */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-white/35 text-[11px] font-medium mb-7 backdrop-blur-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Roja Entertainment · Hyderabad · Day 23 active
          </div>
          <h2 className="text-5xl md:text-[64px] font-display font-bold text-white leading-none mb-4 tracking-tight">
            Choose your lens.
          </h2>
          <p className="text-white/35 text-lg max-w-lg mx-auto leading-relaxed">
            Every role sees the same production through a different operational window.
          </p>
        </motion.div>

        {/* Featured 4 roles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-5xl mb-6">
          {FEATURED.map((role, i) => {
            const Icon = role.icon;
            return (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <div
                  data-testid={`card-role-${role.id.toLowerCase().replace(/\s+/g, "-")}`}
                  onClick={() => handleSelect(role.id, role.path)}
                  className="relative cursor-pointer rounded-2xl p-6 transition-all duration-300 group overflow-hidden"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.055)";
                    (e.currentTarget as HTMLDivElement).style.borderColor = `${role.color}50`;
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 40px ${role.color}12, 0 20px 40px rgba(0,0,0,0.4)`;
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.03)";
                    (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.07)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                  }}
                >
                  {/* Subtle corner glow */}
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[60px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `radial-gradient(circle, ${role.color}25 0%, transparent 70%)`, transform: "translate(30%, -30%)" }} />

                  {/* Tag */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border"
                      style={{ color: role.color, borderColor: `${role.color}30`, backgroundColor: `${role.color}12` }}>
                      {role.tag}
                    </span>
                    <Icon className="w-5 h-5 opacity-20 group-hover:opacity-60 transition-opacity" style={{ color: role.color }} />
                  </div>

                  {/* Role name + desc */}
                  <h3 className="text-2xl font-display font-bold text-white mb-1.5 tracking-tight">{role.id}</h3>
                  <p className="text-[13px] text-white/35 leading-relaxed mb-5">{role.desc}</p>

                  {/* Responsibilities */}
                  <div className="space-y-1.5 mb-5">
                    {role.responsibilities.map(r => (
                      <div key={r} className="flex items-center gap-2 text-[12px] text-white/30">
                        <div className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: role.color }} />
                        {r}
                      </div>
                    ))}
                  </div>

                  {/* Preview */}
                  <div className="mb-5 p-3 rounded-xl" style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.05)" }}>
                    {role.preview}
                  </div>

                  {/* KPIs */}
                  <div className="grid grid-cols-3 gap-2 mb-5">
                    {role.kpis.map(kpi => (
                      <div key={kpi.label} className="p-2.5 rounded-xl text-center" style={{ background: "rgba(255,255,255,0.04)" }}>
                        <p className="text-[15px] font-display font-bold text-white leading-tight">{kpi.value}</p>
                        <p className="text-[9px] text-white/25 mt-0.5 leading-tight">{kpi.sub}</p>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="overflow-hidden">
                    <div className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-[13px] font-semibold translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
                      style={{ backgroundColor: role.color, color: "#000" }}>
                      Enter as {role.id} <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Toggle for other 8 roles */}
        <div className="w-full max-w-5xl">
          <button
            onClick={() => setShowAll(v => !v)}
            className="flex items-center gap-2 text-white/25 hover:text-white/50 text-sm font-medium transition-colors mx-auto mb-4"
          >
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showAll ? "rotate-180" : ""}`} />
            {showAll ? "Show less" : "8 more roles — Accountant, Continuity, Cashier + more"}
          </button>

          <AnimatePresence>
            {showAll && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {OTHER_ROLES.map((role, i) => {
                    const Icon = role.icon;
                    return (
                      <motion.div
                        key={role.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.04 }}
                      >
                        <div
                          data-testid={`card-role-${role.id.toLowerCase().replace(/\s+/g, "-")}`}
                          onClick={() => handleSelect(role.id, role.path)}
                          className="cursor-pointer rounded-xl p-4 transition-all duration-200 group"
                          style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)" }}
                          onMouseEnter={e => {
                            (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.05)";
                            (e.currentTarget as HTMLDivElement).style.borderColor = `${role.color}40`;
                          }}
                          onMouseLeave={e => {
                            (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.025)";
                            (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.06)";
                          }}
                        >
                          <Icon className="w-5 h-5 mb-3 transition-colors" style={{ color: role.color, opacity: 0.7 }} />
                          <p className="text-sm font-semibold text-white/70 mb-1">{role.id}</p>
                          <p className="text-[11px] text-white/25 leading-relaxed">{role.desc}</p>
                          <div className="flex items-center gap-1 mt-3 text-[11px] font-medium opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: role.color }}>
                            Enter <ArrowRight className="w-3 h-3" />
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom status bar */}
      <div className="relative z-10 border-t border-white/[0.05] px-8 py-3 flex items-center justify-between">
        <p className="text-[11px] text-white/15">Cinamitra v1.2 · Devara: Part 2 · Roja Entertainment</p>
        <div className="flex items-center gap-4 text-[11px] text-white/15">
          <span>312 Scenes · 52 Shoot Days</span>
          <span>·</span>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400/60" />
            <span>System operational</span>
          </div>
        </div>
      </div>
    </div>
  );
}
