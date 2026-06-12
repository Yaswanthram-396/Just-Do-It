import { Link } from "wouter";
import { motion } from "framer-motion";
import { useState } from "react";
import { Send, Pin } from "lucide-react";

const sceneDiscussions = [
  { num: "34", title: "Rajahmundry Market", dept: "Art", lastMsg: "Cart confirmed — vendor delivering by 6AM Day 31", time: "2h ago", unread: 3 },
  { num: "41", title: "Confrontation", dept: "Costume", lastMsg: "Saif collar detail revised per director note Oct 15", time: "4h ago", unread: 1 },
  { num: "55", title: "Wedding Sequence", dept: "Director", lastMsg: "Locked: shoot only during magic hour window", time: "6h ago", unread: 0 },
  { num: "67", title: "Chase Scene", dept: "AD", lastMsg: "Stunt coordinator confirmed for Day 28", time: "8h ago", unread: 2 },
  { num: "78", title: "Boat Fight", dept: "Production", lastMsg: "Boat permit from Godavari Authority received", time: "10h ago", unread: 0 },
  { num: "12", title: "Palace Interior", dept: "Art", lastMsg: "Chandelier rigging complete — safety check done", time: "1d ago", unread: 0 },
  { num: "89", title: "Final Reveal", dept: "Director", lastMsg: "VFX pre-viz reviewed. Green light.", time: "1d ago", unread: 1 },
  { num: "103", title: "Climax", dept: "Production", lastMsg: "Location permit Rajahmundry Cliff — pending renewal", time: "2d ago", unread: 4 },
  { num: "71", title: "Hospital", dept: "AD", lastMsg: "Scene completed and locked. No further action.", time: "3d ago", unread: 0 },
  { num: "23", title: "Flashback Village", dept: "Costume", lastMsg: "All period costumes approved by Director", time: "4d ago", unread: 0 },
];

const deptColors: Record<string, string> = {
  Art: "bg-teal-500/10 text-teal-600 border-teal-500/20",
  Costume: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  Director: "bg-primary/10 text-primary border-primary/20",
  AD: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  Production: "bg-orange-500/10 text-orange-600 border-orange-500/20",
  Finance: "bg-red-500/10 text-red-600 border-red-500/20",
};

const deptDot: Record<string, string> = {
  Art: "bg-teal-500",
  Costume: "bg-purple-500",
  Director: "bg-yellow-500",
  AD: "bg-blue-500",
  Production: "bg-orange-500",
  Finance: "bg-red-500",
};

const thread = [
  { name: "Koratala Siva", role: "Director", dept: "Director", time: "Oct 14, 9:12 AM", pinned: true, msg: "APPROVED: NTR's costume — white kurta with gold trim. This is the look for all market scenes. No further changes without my clearance." },
  { name: "Vandana Reddy", role: "Art Director", dept: "Art", time: "Oct 14, 10:45 AM", msg: "Cart and crates confirmed with Roja Art Works. Delivering to base camp Oct 20. 12 fish boxes included." },
  { name: "Ravi Shankar", role: "AD", dept: "AD", time: "Oct 14, 11:30 AM", msg: "Crowd coordination: 30 extras confirmed for Day 31. Call time 6AM for costume and makeup. Base camp briefing at 7:30AM." },
  { name: "Priya Menon", role: "Costume Designer", dept: "Costume", time: "Oct 14, 2:15 PM", msg: "Saif's villain coat is ready. Will bring to set Day 31. Continuity photos sent to Script Supervisor." },
  { name: "Arjun Finance", role: "Production Finance", dept: "Finance", time: "Oct 15, 9:00 AM", msg: "Location payment for Rajahmundry Market — ₹5L cleared to AP Location Services. Receipt attached." },
  { name: "Koratala Siva", role: "Director", dept: "Director", time: "Oct 15, 10:30 AM", msg: "Drone plate needed for the opening aerial shot. Confirm with DOP whether we have clearance from DGCA for Day 31." },
];

const filters = ["All", "Art", "Costume", "Director", "Finance", "AD", "Production"];

export default function DiscussionsView() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [reply, setReply] = useState("");

  const filtered = sceneDiscussions.filter(s => activeFilter === "All" || s.dept === activeFilter);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex h-[calc(100vh-3.5rem)]"
    >
      {/* Left: Scene Index */}
      <div className="w-80 shrink-0 border-r border-border flex flex-col">
        <div className="p-4 border-b border-border">
          <div className="flex items-baseline justify-between mb-3">
            <h2 className="text-lg font-display font-bold">Discussions</h2>
            <span className="text-xs text-muted-foreground">34 active</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-2 py-0.5 rounded text-xs font-semibold transition-colors ${activeFilter === f ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {filtered.map((s, i) => (
            <div
              key={i}
              className={`p-4 border-b border-border cursor-pointer hover:bg-muted/30 transition-colors ${s.num === "34" ? "bg-primary/5 border-l-2 border-l-primary" : ""}`}
            >
              <div className="flex items-start justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold font-display text-primary text-sm">Sc {s.num}</span>
                  <span className={`px-1.5 py-0.5 rounded border text-[10px] font-semibold ${deptColors[s.dept] || "bg-muted text-muted-foreground border-border"}`}>
                    {s.dept}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {s.unread > 0 && (
                    <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                      {s.unread}
                    </span>
                  )}
                  <span className="text-xs text-muted-foreground">{s.time}</span>
                </div>
              </div>
              <p className="text-xs font-medium mb-0.5">{s.title}</p>
              <p className="text-xs text-muted-foreground leading-tight line-clamp-2">{s.lastMsg}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Thread */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Thread header */}
        <div className="px-6 py-4 border-b border-border bg-background">
          <div className="flex items-center gap-3">
            <Link href="/scenes/34" className="font-display font-bold text-xl text-primary hover:underline">Scene 34</Link>
            <span className="text-muted-foreground">—</span>
            <span className="font-medium">Rajahmundry Market Chase</span>
            <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-semibold rounded">Scheduled · Day 31</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">All departments · 18 messages · Last activity 2 hours ago</p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {thread.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.pinned ? "bg-primary/5 border border-primary/20 rounded-xl p-4 -mx-2" : ""}`}>
              <div className="w-8 h-8 rounded-full bg-muted shrink-0 flex items-center justify-center text-xs font-bold text-foreground border border-border">
                {msg.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-sm">{msg.name}</span>
                  <span className={`px-1.5 py-0.5 rounded border text-[10px] font-semibold ${deptColors[msg.dept] || "bg-muted text-muted-foreground border-border"}`}>
                    {msg.role}
                  </span>
                  {msg.pinned && (
                    <span className="flex items-center gap-1 text-[10px] font-semibold text-primary">
                      <Pin className="w-3 h-3" /> Pinned
                    </span>
                  )}
                  <span className="text-xs text-muted-foreground ml-auto">{msg.time}</span>
                </div>
                <p className={`text-sm leading-relaxed ${msg.pinned ? "font-medium" : "text-muted-foreground"}`}>{msg.msg}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Reply box */}
        <div className="p-4 border-t border-border bg-background">
          <div className="flex gap-3 items-end">
            <div className="flex-1 bg-muted/50 border border-border rounded-xl px-4 py-2.5">
              <input
                data-testid="input-reply"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                placeholder="Reply to Scene 34 discussion..."
                value={reply}
                onChange={e => setReply(e.target.value)}
              />
            </div>
            <button
              data-testid="button-send-reply"
              className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-opacity shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
