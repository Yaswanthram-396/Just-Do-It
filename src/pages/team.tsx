import { motion } from "framer-motion";
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const members = [
  { name: "Koratala Siva", role: "Director", dept: "Direction", status: "On Set", scenes: 89, initials: "KS" },
  { name: "Karan Johar", role: "Producer", dept: "Production", status: "Remote", scenes: 0, initials: "KJ" },
  { name: "Priya Menon", role: "Line Producer", dept: "Production", status: "On Set", scenes: 312, initials: "PM" },
  { name: "Ravi Shankar", role: "Assistant Director", dept: "Direction", status: "On Set", scenes: 34, initials: "RS" },
  { name: "Anita Bose", role: "Script Supervisor", dept: "Continuity", status: "On Set", scenes: 89, initials: "AB" },
  { name: "Arjun Finance", role: "Accountant", dept: "Finance", status: "Remote", scenes: 0, initials: "AF" },
  { name: "Meena Das", role: "Cashier", dept: "Finance", status: "On Set", scenes: 0, initials: "MD" },
  { name: "Suresh Kumar", role: "Production Manager", dept: "Logistics", status: "On Set", scenes: 0, initials: "SK" },
  { name: "Ramesh Babu", role: "Cinematographer (DOP)", dept: "Camera", status: "On Set", scenes: 89, initials: "RB" },
  { name: "Vandana Reddy", role: "Production Designer", dept: "Art", status: "On Set", scenes: 47, initials: "VR" },
  { name: "Deepa Nair", role: "Costume Designer", dept: "Costume", status: "On Set", scenes: 89, initials: "DN" },
  { name: "Kartik Sood", role: "Editor", dept: "Post Production", status: "Remote", scenes: 23, initials: "KT" },
  { name: "Vijay Stunt", role: "Stunt Coordinator", dept: "Action", status: "On Set", scenes: 12, initials: "VS" },
  { name: "Nalini Sound", role: "Sound Recordist", dept: "Sound", status: "On Set", scenes: 89, initials: "NS" },
  { name: "Prakash Camera", role: "Camera Operator B", dept: "Camera", status: "On Set", scenes: 67, initials: "PC" },
];

const depts = ["All", "Direction", "Production", "Finance", "Camera", "Art", "Costume", "Logistics", "Post Production"];

const statusColor: Record<string, string> = {
  "On Set": "bg-green-500/10 text-green-600",
  "Remote": "bg-blue-500/10 text-blue-600",
  "Off Today": "bg-muted text-muted-foreground",
};

const recentActivity = [
  { action: "Updated Scene 34 discussion", time: "2h ago" },
  { action: "Approved costume for NTR Jr.", time: "4h ago" },
  { action: "Submitted Day 22 report", time: "6h ago" },
  { action: "Added 3 props to breakdown", time: "1d ago" },
];

export default function TeamView() {
  const [search, setSearch] = useState("");
  const [activeDept, setActiveDept] = useState("All");
  const [selected, setSelected] = useState(members[0]);

  const filtered = members.filter(m => {
    const matchesDept = activeDept === "All" || m.dept === activeDept;
    const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.role.toLowerCase().includes(search.toLowerCase());
    return matchesDept && matchesSearch;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex h-[calc(100vh-3.5rem)]"
    >
      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-display font-bold">Production Team</h1>
            <p className="text-muted-foreground text-sm">52 members · 14 departments</p>
          </div>
          <button
            data-testid="button-add-member"
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            + Add Member
          </button>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div className="relative max-w-xs">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              data-testid="input-team-search"
              placeholder="Search team..."
              className="pl-9 h-9"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {depts.map(d => (
              <button
                key={d}
                onClick={() => setActiveDept(d)}
                className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors ${activeDept === d ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg overflow-hidden flex-1">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 border-b border-border text-left">
              <tr>
                <th className="p-3 text-muted-foreground font-medium">Member</th>
                <th className="p-3 text-muted-foreground font-medium">Role</th>
                <th className="p-3 text-muted-foreground font-medium">Department</th>
                <th className="p-3 text-muted-foreground font-medium">Status</th>
                <th className="p-3 text-muted-foreground font-medium text-center">Scenes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((m, i) => (
                <tr
                  key={i}
                  onClick={() => setSelected(m)}
                  className={`hover:bg-muted/30 transition-colors cursor-pointer ${selected.name === m.name ? "bg-primary/5" : ""}`}
                >
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8 border border-border">
                        <AvatarFallback className="text-xs bg-muted font-bold">{m.initials}</AvatarFallback>
                      </Avatar>
                      <span className="font-semibold">{m.name}</span>
                    </div>
                  </td>
                  <td className="p-3 text-muted-foreground">{m.role}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 bg-muted text-muted-foreground rounded text-xs font-medium">{m.dept}</span>
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${statusColor[m.status] || "bg-muted text-muted-foreground"}`}>
                      {m.status}
                    </span>
                  </td>
                  <td className="p-3 text-center font-bold font-display">{m.scenes || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail panel */}
      <div className="w-72 shrink-0 border-l border-border p-5 overflow-y-auto">
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="h-12 w-12 border-2 border-primary/20">
            <AvatarFallback className="text-sm font-bold bg-primary/10 text-primary">{selected.initials}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-display font-bold">{selected.name}</p>
            <p className="text-xs text-muted-foreground">{selected.role}</p>
          </div>
        </div>

        <div className="space-y-3 text-sm mb-6">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Department</span>
            <span className="font-medium">{selected.dept}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Status</span>
            <span className={`px-2 py-0.5 rounded text-xs font-bold ${statusColor[selected.status] || "bg-muted text-muted-foreground"}`}>
              {selected.status}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Scenes Assigned</span>
            <span className="font-display font-bold">{selected.scenes || "—"}</span>
          </div>
        </div>

        <div>
          <h4 className="font-display font-bold text-sm mb-3">Recent Activity</h4>
          <div className="space-y-2">
            {recentActivity.map((a, i) => (
              <div key={i} className="flex items-start gap-2 text-xs">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                <div>
                  <p className="text-foreground">{a.action}</p>
                  <p className="text-muted-foreground">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
