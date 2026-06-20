import { useState, useEffect, useRef } from "react";
import { Link, useRoute } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRole } from "@/components/layout/RoleContext";
import {
  FileText, Users, Shirt, Monitor, Car, Box, Paperclip, Send,
  Clock, CheckCircle2, ChevronDown, ChevronRight, AlertTriangle,
  MapPin, Upload, Image, FileImage, Mic, Video, ArrowRight,
  CalendarDays, AlertCircle, MessageSquare, Shield, Zap, Activity,
  ExternalLink, MoreHorizontal
} from "lucide-react";


// ─── Types ───────────────────────────────────────────────────────────────────

type Status = "ready" | "pending" | "progress" | "scheduled";
type FileCategory = "all" | "reference" | "costumes" | "location" | "callsheet" | "permits" | "notes" | "video";

interface Message {
  name: string;
  dept: string;
  color: string;
  time: string;
  text: string;
  hasFile?: boolean;
}

const roleNameMap: Record<string, { name: string; dept: string; color: string }> = {
  "Producer": { name: "Yaswanthram", dept: "Producer", color: "red" },
  "Director": { name: "Koratala Siva", dept: "Director", color: "yellow" },
  "Line Producer": { name: "Line Producer", dept: "Production", color: "orange" },
  "AD": { name: "King Solomon", dept: "AD", color: "blue" },
  "Accountant": { name: "Accountant", dept: "Finance", color: "teal" },
  "Continuity": { name: "Continuity", dept: "Script", color: "purple" },
  "Cashier": { name: "Cashier", dept: "Finance", color: "teal" },
  "Production Manager": { name: "Production Manager", dept: "Logistics", color: "orange" },
  "Cinematographer": { name: "Rathnavelu", dept: "Camera", color: "blue" },
  "Production Designer": { name: "Sabu Cyril", dept: "Art", color: "teal" },
  "Costume Designer": { name: "Rama Rajamouli", dept: "Costume", color: "purple" },
};


// ─── Data ────────────────────────────────────────────────────────────────────

const ELEMENT_SECTIONS = [
  {
    id: "Cast", icon: Users, color: "#D4A843",
    items: [
      { name: "Karna (NTR Jr.)", status: "ready" as Status, note: "On call 07:00" },
      { name: "Vikram Shetty (Saif)", status: "progress" as Status, note: "Flight delay +1hr" },
      { name: "6 Crowd Extras", status: "pending" as Status, note: "Casting not finalised" },
      { name: "4 Market Guards", status: "ready" as Status, note: "Local cast confirmed" },
    ],
  },
  {
    id: "Props", icon: Box, color: "#14B8A6",
    items: [
      { name: "Merchant Cart", status: "ready" as Status, note: "On set, dressed" },
      { name: "Fish Boxes (×12)", status: "ready" as Status, note: "Delivered yesterday" },
      { name: "Boat Rope (30m)", status: "ready" as Status, note: "Rigged for stunt" },
      { name: "Wooden Crates (×6)", status: "pending" as Status, note: "Sourcing local" },
    ],
  },
  {
    id: "Costumes", icon: Shirt, color: "#A855F7",
    items: [
      { name: "NTR White Kurta + Gold", status: "ready" as Status, note: "Approved by Director" },
      { name: "Saif Villain Coat", status: "progress" as Status, note: "Final fitting pending" },
      { name: "Extras — Muted Tones", status: "pending" as Status, note: "Stitching in progress" },
    ],
  },
  {
    id: "VFX", icon: Monitor, color: "#3B82F6",
    items: [
      { name: "Market Crowd Extension", status: "scheduled" as Status, note: "Pixion — Day 65" },
      { name: "Aerial Drone Shot", status: "scheduled" as Status, note: "Shooting Day 31" },
    ],
  },
  {
    id: "Vehicles", icon: Car, color: "#EC4899",
    items: [
      { name: "2 Rickshaws", status: "ready" as Status, note: "Parked on-site" },
      { name: "1 Tempo (background)", status: "pending" as Status, note: "Sourcing vendor" },
    ],
  },
];

const SCHEDULE_CAST = [
  { name: "NTR Jr.", call: "07:00", scenes: "34", note: "" },
  { name: "Saif Ali Khan", call: "08:00 ⚠", scenes: "34", note: "Delayed +1hr" },
  { name: "6 Crowd Extras", call: "05:45", scenes: "34", note: "" },
  { name: "4 Market Guards", call: "06:30", scenes: "34", note: "" },
];

const FILES: Array<{ name: string; ext: string; size: string; cat: FileCategory; time: string; version: string }> = [
  { name: "market_reference_board", ext: "jpg", size: "4.2 MB", cat: "reference", time: "3 days ago", version: "v1" },
  { name: "rajahmundry_area_map",   ext: "pdf", size: "1.1 MB", cat: "reference", time: "5 days ago", version: "v1" },
  { name: "ntr_kurta_final",        ext: "pdf", size: "820 KB", cat: "costumes",  time: "Yesterday", version: "v2" },
  { name: "saif_coat_design",       ext: "pdf", size: "640 KB", cat: "costumes",  time: "2 days ago",version: "v1" },
  { name: "extras_costume_sketch",  ext: "pdf", size: "410 KB", cat: "costumes",  time: "Yesterday", version: "v1" },
  { name: "market_location_photos", ext: "zip", size: "38 MB",  cat: "location",  time: "4 days ago", version: "v1" },
  { name: "permits_rajahmundry",    ext: "pdf", size: "230 KB", cat: "permits",   time: "2 days ago", version: "v1" },
  { name: "callsheet_day31",        ext: "pdf", size: "190 KB", cat: "callsheet", time: "Today",      version: "v3" },
  { name: "director_notes_sc34",    ext: "m4a", size: "8.3 MB", cat: "notes",     time: "Today",      version: "v1" },
  { name: "stunt_previs_sc34",      ext: "mp4", size: "92 MB",  cat: "video",     time: "3 days ago", version: "v1" },
];

const ACTIVITY = [
  { type: "approval", icon: CheckCircle2,  color: "#22c55e", text: "NTR costume approved by Director Koratala Siva",      dept: "Director",    time: "Today 9:00 AM"       },
  { type: "upload",   icon: Upload,        color: "#3B82F6", text: "costume_sketches_v2.pdf uploaded by Rama Rajamouli",  dept: "Costume",     time: "Yesterday 2:15 PM"   },
  { type: "schedule", icon: CalendarDays,  color: "#f59e0b", text: "Scene rescheduled: Day 29 → Day 31 (flight delay)",   dept: "Production",  time: "2 days ago"          },
  { type: "risk",     icon: AlertTriangle, color: "#ef4444", text: "Risk flagged: Wooden crates still sourcing",           dept: "Art Dept",    time: "3 days ago"          },
  { type: "approval", icon: Shield,        color: "#22c55e", text: "River-side extension permits confirmed by Rathnavelu", dept: "Locations",   time: "3 days ago"          },
  { type: "upload",   icon: Zap,           color: "#3B82F6", text: "VFX scope expanded: Aerial drone shot added",          dept: "VFX",         time: "4 days ago"          },
  { type: "comment",  icon: MessageSquare, color: "#6b7280", text: "Stunt coordinator Vijay S. assigned to Scene 34",      dept: "Action",      time: "5 days ago"          },
  { type: "schedule", icon: Activity,      color: "#f59e0b", text: "Breakdown locked for Scene 34 — 94% confidence",       dept: "Production",  time: "6 days ago"          },
];

const FILE_CATS: Array<{ id: FileCategory; label: string; icon: React.ElementType }> = [
  { id: "all",       label: "All",      icon: FileText    },
  { id: "reference", label: "Ref",      icon: Image       },
  { id: "costumes",  label: "Costume",  icon: Shirt       },
  { id: "location",  label: "Location", icon: MapPin      },
  { id: "callsheet", label: "Sheets",   icon: FileImage   },
  { id: "permits",   label: "Permits",  icon: Shield      },
  { id: "notes",     label: "Notes",    icon: Mic         },
  { id: "video",     label: "Video",    icon: Video       },
];

function fileIcon(ext: string) {
  if (["jpg","jpeg","png","webp","gif"].includes(ext)) return Image;
  if (ext === "mp4") return Video;
  if (ext === "m4a") return Mic;
  return FileText;
}

function fileIconColor(ext: string) {
  if (["jpg","jpeg","png","webp"].includes(ext)) return "#f97316";
  if (ext === "mp4") return "#3B82F6";
  if (ext === "m4a") return "#A855F7";
  if (ext === "zip") return "#14B8A6";
  return "#D4A843";
}

const statusConfig = {
  ready:     { dot: "bg-green-500",  label: "Ready",      text: "text-green-600" },
  pending:   { dot: "bg-red-500",    label: "Pending",    text: "text-red-500"   },
  progress:  { dot: "bg-amber-500",  label: "In Progress",text: "text-amber-600" },
  scheduled: { dot: "bg-blue-500",   label: "Scheduled",  text: "text-blue-500"  },
};

// ─── Scrollbar class ─────────────────────────────────────────────────────────

const SCROLL_CLS = "overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border/40 hover:[&::-webkit-scrollbar-thumb]:bg-border/70 [&::-webkit-scrollbar-track]:bg-transparent";

// ─── Main Component ──────────────────────────────────────────────────────────

export default function SceneWorkspace() {
  const [match, params] = useRoute("/scenes/:id");
  const sceneId = params?.id || "34";
  const { role } = useRole();

  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(["Cast", "Props"]));
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [fileCategory, setFileCategory] = useState<FileCategory>("all");
  const [isDragging, setIsDragging] = useState(false);

  const [messageText, setMessageText] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const defaultMessages = [
    { name: "Sabu Cyril", dept: "Art", color: "teal", time: "Yesterday 10:45 AM", text: "Market set is 80% complete. The wooden crates have arrived but we need 6 more fish boxes. Sourcing them locally today." },
    { name: "Rathnavelu", dept: "Production", color: "orange", time: "Yesterday 11:20 AM", text: "Permits for the river side extension are clear. We have access from 6 AM to 6 PM on Day 31." },
    { name: "Rama Rajamouli", dept: "Costume", color: "purple", time: "Yesterday 2:15 PM", text: "Attached the final sketches for the merchant extras. Need director's sign off before we start stitching.", hasFile: true },
    { name: "Koratala Siva", dept: "Director", color: "yellow", time: "Today 9:00 AM", text: "Sketches look good. Make sure the colors are muted so NTR stands out in the white kurta." },
    { name: "King Solomon", dept: "AD", color: "blue", time: "Today 9:30 AM", text: "Noted sir. Updating the call sheet. Saif sir's arrival is pushed by 1 hour due to flight delay, but we'll shoot the wide crowd shots first." },
  ];

  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem(`cinamitra-messages-scene-${sceneId}`);
    return saved ? JSON.parse(saved) : defaultMessages;
  });

  useEffect(() => {
    localStorage.setItem(`cinamitra-messages-scene-${sceneId}`, JSON.stringify(messages));
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, sceneId]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, []);

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!messageText.trim()) return;

    const defaultUser = { name: "Crew Member", dept: "Production", color: "orange" };
    const userRoleInfo = role ? (roleNameMap[role] || { name: role, dept: role, color: "orange" }) : defaultUser;

    // Get current time formatted beautifully
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newMessage: Message = {
      name: userRoleInfo.name,
      dept: userRoleInfo.dept,
      color: userRoleInfo.color,
      time: `Today ${timeStr}`,
      text: messageText.trim()
    };

    setMessages(prev => [...prev, newMessage]);
    setMessageText("");
  };

  const toggleSection = (id: string) =>
    setExpandedSections(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const visibleFiles = fileCategory === "all" ? FILES : FILES.filter(f => f.cat === fileCategory);


  return (
    <div className="flex h-[calc(100vh-3.5rem)] overflow-hidden">

      {/* ── LEFT PANEL: Metadata ────────────────────────────────── */}
      <div className={`w-[280px] shrink-0 border-r border-border bg-card/30 flex flex-col hidden md:flex ${SCROLL_CLS}`}>
        <div className="p-6">
          <div className="text-5xl font-display font-bold text-primary mb-2">34</div>
          <h2 className="text-xl font-bold leading-tight mb-4">Rajahmundry Market Chase</h2>

          <div className="flex gap-2 text-xs font-semibold mb-6">
            <span className="bg-muted px-2 py-1 rounded">EXT</span>
            <span className="bg-muted px-2 py-1 rounded">DAY</span>
          </div>

          <div className="space-y-4 text-sm">
            <div>
              <p className="text-muted-foreground text-xs uppercase tracking-wider font-semibold mb-1">Location</p>
              <p className="font-medium">Rajahmundry Fish Market, AP</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs uppercase tracking-wider font-semibold mb-1">Pages</p>
              <p className="font-medium">2⅛ pages</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs uppercase tracking-wider font-semibold mb-1">Status</p>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-2 py-1 rounded text-xs font-bold uppercase tracking-wider">
                <Clock className="w-3 h-3" /> Scheduled: Day 31
              </div>
            </div>
          </div>

          <div className="my-6 h-px bg-border" />

          <div>
            <p className="text-muted-foreground text-xs uppercase tracking-wider font-semibold mb-2">Synopsis</p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              NTR confronts the merchant lord in the crowded market. Chaos erupts. A chase through narrow lanes leads to a dramatic standoff near the river.
            </p>
          </div>

          <div className="my-6 h-px bg-border" />

          <div className="space-y-4">
            <p className="text-muted-foreground text-xs uppercase tracking-wider font-semibold">Quick Stats</p>
            {[
              { icon: Users, label: "Cast", value: "8" },
              { icon: Box,   label: "Props", value: "14" },
              { icon: Shirt, label: "Costumes", value: "3" },
              { icon: Monitor, label: "VFX", value: "2" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2"><Icon className="w-4 h-4 text-muted-foreground" />{label}</div>
                <span className="font-bold">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CENTER PANEL: Discussion ─────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#07111F] relative">
        {/* Mobile Horizontal Tab Chips */}
        <div className="lg:hidden shrink-0 border-b border-border bg-card p-3 flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:h-0">
          <span className="text-xs font-bold text-primary mr-2 self-center shrink-0">Sc {sceneId} Workspace:</span>
          {[
            { label: "Overview", link: `/scenes/${sceneId}` },
            { label: "Breakdown", link: "/breakdown" },
            { label: "Discussion", link: `/scenes/${sceneId}` },
            { label: "Schedule", link: "/scheduling" },
            { label: "Budget", link: "/budget" },
            { label: "Files", link: "/reports" },
            { label: "Continuity", link: "/continuity" }
          ].map((t) => (
            <Link key={t.label} href={t.link}>
              <button className="shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full border border-border bg-card text-muted-foreground hover:text-foreground">
                {t.label}
              </button>
            </Link>
          ))}
        </div>

        <div ref={chatContainerRef} className={`flex-1 p-4 md:p-6 space-y-4 ${SCROLL_CLS}`}>

          <div className="bg-card border border-border/60 rounded-xl p-3 flex gap-3 text-sm mb-4 shadow-sm">
            <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-foreground">PINNED APPROVAL</p>
              <p className="text-muted-foreground text-xs">NTR's costume — white kurta with gold trim approved by Director Koratala Siva</p>
            </div>
          </div>

          <div className="space-y-2 flex flex-col">
            {messages.map((msg, idx) => {
              const defaultUser = { name: "Crew Member", dept: "Production", color: "orange" };
              const currentUserInfo = role ? (roleNameMap[role] || { name: role, dept: role, color: "orange" }) : defaultUser;
              const isSelf = msg.name === currentUserInfo.name;
              return (
                <ChatMessage
                  key={idx}
                  name={msg.name}
                  dept={msg.dept}
                  color={msg.color}
                  time={msg.time}
                  text={msg.text}
                  hasFile={msg.hasFile}
                  isSelf={isSelf}
                />
              );
            })}
          </div>
        </div>


        <div className="p-4 border-t border-border bg-card/50 shrink-0">
          <form onSubmit={handleSendMessage} className="relative flex items-center">
            <Button type="button" variant="ghost" size="icon" className="absolute left-1 text-muted-foreground hover:text-foreground z-10">
              <Paperclip className="w-4 h-4" />
            </Button>
            <Input 
              placeholder={`Message Scene ${sceneId} thread…`}
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              className="pl-10 pr-12 bg-background border-border h-10 text-sm focus-visible:ring-1 focus-visible:ring-primary text-foreground placeholder:text-muted-foreground/60" 
            />
            <Button 
              type="submit"
              size="sm" 
              className="absolute right-1.5 bg-black text-white hover:bg-neutral-800 h-7 w-7 p-0 z-10 rounded-md transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
            </Button>
          </form>
        </div>
      </div>


      {/* ── RIGHT PANEL: Contextual Workspace ───────────────────── */}
      <div className="w-[320px] shrink-0 border-l border-border bg-card/30 flex flex-col hidden lg:flex">
        <Tabs defaultValue="elements" className="w-full h-full flex flex-col min-h-0">

          {/* Tab strip */}
          <div className="shrink-0 border-b border-border px-2 pt-2">
            <TabsList className="w-full grid grid-cols-4 bg-transparent h-8 gap-0 p-0">
              {[
                { value: "elements", label: "Elements" },
                { value: "schedule", label: "Schedule" },
                { value: "files",    label: "Files"    },
                { value: "activity", label: "Activity" },
              ].map(t => (
                <TabsTrigger
                  key={t.value}
                  value={t.value}
                  className="text-[11px] font-semibold h-8 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent bg-transparent text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* ── ELEMENTS TAB ──────────────────────────────────────── */}
          <TabsContent value="elements" className={`flex-1 min-h-0 m-0 outline-none ${SCROLL_CLS}`}>
            <div className="py-2">
              {ELEMENT_SECTIONS.map(section => {
                const isExpanded = expandedSections.has(section.id);
                const Icon = section.icon;
                const readyCount = section.items.filter(i => i.status === "ready").length;
                return (
                  <div key={section.id}>
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-muted/30 transition-colors group"
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="w-3.5 h-3.5" style={{ color: section.color }} />
                        <span className="text-xs font-bold uppercase tracking-wider" style={{ color: section.color }}>
                          {section.id}
                        </span>
                        <span className="text-[10px] text-muted-foreground font-semibold">
                          {readyCount}/{section.items.length}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-0.5">
                          {section.items.map((item, i) => (
                            <div key={i} className={`w-1.5 h-1.5 rounded-full ${statusConfig[item.status].dot}`} />
                          ))}
                        </div>
                        {isExpanded
                          ? <ChevronDown className="w-3 h-3 text-muted-foreground" />
                          : <ChevronRight className="w-3 h-3 text-muted-foreground" />}
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.18 }}
                          className="overflow-hidden"
                        >
                          {section.items.map(item => {
                            const key = `${section.id}-${item.name}`;
                            const isSelected = selectedItem === key;
                            const sc = statusConfig[item.status];
                            return (
                              <div key={key}>
                                <button
                                  onClick={() => setSelectedItem(isSelected ? null : key)}
                                  className={`w-full flex items-center gap-2.5 px-5 py-2 text-left transition-all hover:bg-muted/30 ${isSelected ? "bg-muted/40" : ""}`}
                                >
                                  <div className={`w-2 h-2 rounded-full shrink-0 ${sc.dot}`} />
                                  <span className="text-xs flex-1 text-foreground/80 leading-tight">{item.name}</span>
                                  <ExternalLink className="w-3 h-3 text-muted-foreground/40 shrink-0 opacity-0 group-hover:opacity-100" />
                                </button>

                                <AnimatePresence>
                                  {isSelected && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: "auto", opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.15 }}
                                      className="overflow-hidden"
                                    >
                                      <div className="mx-5 mb-2 p-2.5 bg-background border border-border/60 rounded-lg text-xs space-y-2">
                                        <div className="flex items-center justify-between">
                                          <span className={`font-semibold ${sc.text}`}>{sc.label}</span>
                                          <span className="text-muted-foreground">{item.note}</span>
                                        </div>
                                        <Link href="/breakdown/script" className="flex items-center gap-1.5 text-primary hover:opacity-80 font-medium transition-opacity">
                                          <ArrowRight className="w-3 h-3" /> View in Script
                                        </Link>
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <div className="mx-4 h-px bg-border/40" />
                  </div>
                );
              })}
            </div>
          </TabsContent>

          {/* ── SCHEDULE TAB ──────────────────────────────────────── */}
          <TabsContent value="schedule" className={`flex-1 min-h-0 m-0 outline-none ${SCROLL_CLS}`}>
            <div className="p-4 space-y-4">

              {/* Day card */}
              <div className="bg-primary/8 border border-primary/20 rounded-xl p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Shoot Day</p>
                    <p className="text-2xl font-display font-bold text-primary">Day 31</p>
                    <p className="text-xs text-muted-foreground">Monday, June 15, 2026</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Progress</p>
                    <p className="text-lg font-display font-bold">0%</p>
                    <p className="text-[10px] text-muted-foreground">Not yet shot</p>
                  </div>
                </div>
                <div className="h-1.5 bg-border rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: "0%" }} />
                </div>
                <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                  <span>Gen Call 05:30</span>
                  <span>Wrap 18:00</span>
                </div>
              </div>

              {/* Call Times */}
              <Section title="Call Times" icon={Clock}>
                <div className="space-y-1">
                  {[
                    { label: "General Call",  time: "05:30 AM", note: "",              flag: false },
                    { label: "Crew Call",     time: "06:00 AM", note: "",              flag: false },
                    { label: "NTR Jr.",       time: "07:00 AM", note: "",              flag: false },
                    { label: "Saif Ali Khan", time: "08:00 AM", note: "Delayed +1hr",  flag: true  },
                    { label: "Est. Wrap",     time: "18:00 PM", note: "",              flag: false },
                  ].map(row => (
                    <div key={row.label} className="flex items-center justify-between py-1.5 border-b border-border/30 last:border-0">
                      <span className="text-xs text-muted-foreground">{row.label}</span>
                      <div className="flex items-center gap-2">
                        {row.flag && <AlertTriangle className="w-3 h-3 text-amber-500" />}
                        <span className="text-xs font-semibold font-display">{row.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Section>

              {/* Cast requirements */}
              <Section title="Cast Requirements" icon={Users}>
                <div className="space-y-1.5">
                  {SCHEDULE_CAST.map(c => (
                    <div key={c.name} className="flex items-center gap-2 py-1">
                      <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-[9px] font-bold">
                        {c.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium truncate">{c.name}</p>
                        {c.note && <p className="text-[10px] text-amber-500">{c.note}</p>}
                      </div>
                      <span className="text-[10px] font-display font-bold text-muted-foreground shrink-0">{c.call}</span>
                    </div>
                  ))}
                </div>
              </Section>

              {/* Logistics */}
              <Section title="Location & Logistics" icon={MapPin}>
                <div className="space-y-2 text-xs">
                  {[
                    { label: "Address", value: "Rajahmundry Fish Market, AP" },
                    { label: "Drive from Hotel", value: "45 min" },
                    { label: "Permit Window", value: "06:00 – 18:00 only" },
                    { label: "Parking", value: "Confirmed (Lot B)" },
                    { label: "Crew Size", value: "87 crew + 10 cast" },
                  ].map(r => (
                    <div key={r.label} className="flex justify-between gap-2">
                      <span className="text-muted-foreground shrink-0">{r.label}</span>
                      <span className="font-medium text-right">{r.value}</span>
                    </div>
                  ))}
                </div>
              </Section>

              {/* Risks */}
              <Section title="Risk Flags" icon={AlertCircle}>
                <div className="space-y-2">
                  {[
                    { level: "HIGH",   color: "text-red-500",   bg: "bg-red-500/8 border-red-500/20",   text: "Permit window closes at 18:00 sharp" },
                    { level: "MED",    color: "text-amber-500", bg: "bg-amber-500/8 border-amber-500/20",text: "Saif arrival buffer: tight" },
                    { level: "LOW",    color: "text-blue-500",  bg: "bg-blue-500/8 border-blue-500/20",  text: "Fish boxes sourcing in progress" },
                  ].map(r => (
                    <div key={r.level} className={`flex gap-2 p-2 rounded-lg border text-xs ${r.bg}`}>
                      <span className={`font-bold shrink-0 ${r.color}`}>{r.level}</span>
                      <span className="text-foreground/80">{r.text}</span>
                    </div>
                  ))}
                </div>
              </Section>
            </div>
          </TabsContent>

          {/* ── FILES TAB ─────────────────────────────────────────── */}
          <TabsContent value="files" className="flex-1 min-h-0 m-0 outline-none flex flex-col">

            {/* Category strip */}
            <div className={`shrink-0 px-3 pt-3 pb-2 border-b border-border flex gap-1 overflow-x-auto [&::-webkit-scrollbar]:h-0`}>
              {FILE_CATS.map(cat => {
                const CatIcon = cat.icon;
                const active = fileCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setFileCategory(cat.id)}
                    className={`shrink-0 flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-semibold transition-all ${
                      active
                        ? "bg-primary/10 text-primary border border-primary/20"
                        : "bg-muted/40 text-muted-foreground hover:bg-muted/60"
                    }`}
                  >
                    <CatIcon className="w-2.5 h-2.5" />
                    {cat.label}
                  </button>
                );
              })}
            </div>

            <div className={`flex-1 min-h-0 ${SCROLL_CLS} p-3 space-y-1.5`}>
              {visibleFiles.map((file, i) => {
                const FIcon = fileIcon(file.ext);
                const iconColor = fileIconColor(file.ext);
                return (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-2.5 rounded-lg border border-transparent hover:border-border hover:bg-muted/30 cursor-pointer transition-all group"
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${iconColor}15` }}>
                      <FIcon className="w-4 h-4" style={{ color: iconColor }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate">{file.name}.{file.ext}</p>
                      <p className="text-[10px] text-muted-foreground">{file.size} · {file.time} · {file.version}</p>
                    </div>
                    <MoreHorizontal className="w-3.5 h-3.5 text-muted-foreground/0 group-hover:text-muted-foreground transition-colors shrink-0" />
                  </div>
                );
              })}
            </div>

            {/* Drop zone */}
            <div
              className={`shrink-0 m-3 mt-0 border-2 border-dashed rounded-xl p-4 text-center transition-all cursor-pointer ${
                isDragging
                  ? "border-primary bg-primary/5"
                  : "border-border/50 hover:border-border hover:bg-muted/20"
              }`}
              onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
              onDragEnter={() => setIsDragging(true)}
              onDragLeave={() => setIsDragging(false)}
              onDrop={e => { e.preventDefault(); setIsDragging(false); }}
            >
              <Upload className={`w-4 h-4 mx-auto mb-1.5 transition-colors ${isDragging ? "text-primary" : "text-muted-foreground"}`} />
              <p className="text-[11px] font-medium text-muted-foreground">
                {isDragging ? "Drop to upload" : "Drag files here or click to upload"}
              </p>
            </div>
          </TabsContent>

          {/* ── ACTIVITY TAB ──────────────────────────────────────── */}
          <TabsContent value="activity" className={`flex-1 min-h-0 m-0 outline-none ${SCROLL_CLS}`}>
            <div className="p-4">
              <div className="relative">
                {/* Vertical timeline line */}
                <div className="absolute left-[15px] top-2 bottom-2 w-px bg-border/50" />

                <div className="space-y-0">
                  {ACTIVITY.map((entry, i) => {
                    const Icon = entry.icon;
                    return (
                      <div key={i} className="flex gap-3 pb-5 relative">
                        {/* Icon dot */}
                        <div
                          className="w-[30px] h-[30px] rounded-full flex items-center justify-center shrink-0 z-10 border-2 border-background"
                          style={{ backgroundColor: `${entry.color}20` }}
                        >
                          <Icon className="w-3.5 h-3.5" style={{ color: entry.color }} />
                        </div>

                        <div className="flex-1 min-w-0 pt-0.5">
                          <p className="text-xs text-foreground/85 leading-relaxed">{entry.text}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span
                              className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded"
                              style={{ backgroundColor: `${entry.color}15`, color: entry.color }}
                            >
                              {entry.dept}
                            </span>
                            <span className="text-[10px] text-muted-foreground">{entry.time}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </TabsContent>

        </Tabs>
      </div>

    </div>
  );
}

// ─── Helper Components ───────────────────────────────────────────────────────

function Section({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <div className="bg-background border border-border/60 rounded-xl p-3.5">
      <div className="flex items-center gap-2 mb-3">
        <Icon className="w-3.5 h-3.5 text-muted-foreground" />
        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{title}</span>
      </div>
      {children}
    </div>
  );
}

function ChatMessage({ name, dept, color, time, text, hasFile, isSelf }: {
  name: string; dept: string; color: string; time: string; text: string; hasFile?: boolean; isSelf?: boolean;
}) {
  const colorMap: Record<string, string> = {
    teal:   "text-[#14B8A6]",
    orange: "text-[#D4A64A]",
    purple: "text-[#A855F7]",
    yellow: "text-[#F3C977]",
    blue:   "text-[#3B82F6]",
    red:    "text-[#EF4444]",
  };

  return (
    <div className={`flex w-full ${isSelf ? "justify-end" : "justify-start"} mb-1`}>
      <div 
        className={`max-w-[80%] md:max-w-[70%] rounded-xl px-3 py-2 shadow-sm relative flex flex-col ${
          isSelf 
            ? "bg-primary/20 text-foreground rounded-tr-none border border-primary/30" 
            : "bg-card text-foreground rounded-tl-none border border-border"
        }`}
      >
        {/* Sender name for other users */}
        {!isSelf && (
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className={`text-[10px] font-bold ${colorMap[color] || "text-primary"}`}>
              {name}
            </span>
            <span className="text-[8px] font-bold text-muted-foreground bg-[#07111F]/50 px-1 py-0.2 rounded uppercase tracking-wide">
              {dept}
            </span>
          </div>
        )}

        {/* Message Text */}
        <div className="text-xs leading-relaxed break-words pb-3 pr-12 text-foreground/95">
          {text}
        </div>

        {hasFile && (
          <div className="mb-1 mt-1 inline-flex items-center gap-2 bg-neutral-50/90 hover:bg-neutral-100 border border-neutral-200/60 px-2 py-1 rounded-md text-[9px] font-semibold text-neutral-800 cursor-pointer transition-colors shadow-xs w-fit">
            <FileText className="w-3 h-3 text-neutral-500" />
            costume_sketches_v2.pdf
          </div>
        )}

        {/* Timestamp nested inside bottom-right */}
        <span className="absolute bottom-0.5 right-1.5 text-[8px] text-neutral-400 font-medium select-none">
          {time.replace(/^(Today|Yesterday)\s+/, "")}
        </span>
      </div>
    </div>
  );
}


