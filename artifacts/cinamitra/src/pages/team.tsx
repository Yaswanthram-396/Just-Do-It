import { motion } from "framer-motion";
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/patterns/StatusBadge";
import { ResponsiveTable, type ResponsiveTableColumn } from "@/components/patterns/ResponsiveTable";

interface Member {
  name: string;
  role: string;
  dept: string;
  status: "On Set" | "Remote" | "Off Today";
  scenes: number;
  initials: string;
}

const members: Member[] = [
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

const statusTone = { "On Set": "success", Remote: "info", "Off Today": "neutral" } as const;

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

  const columns: ResponsiveTableColumn<Member>[] = [
    {
      key: "name", header: "Member", primary: true,
      render: m => (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8 border border-border">
            <AvatarFallback className="text-xs bg-muted font-bold">{m.initials}</AvatarFallback>
          </Avatar>
          <span className="font-semibold">{m.name}</span>
        </div>
      ),
    },
    { key: "role", header: "Role", render: m => <span className="text-muted-foreground">{m.role}</span> },
    { key: "dept", header: "Department", render: m => <span className="px-2 py-0.5 bg-muted text-muted-foreground rounded text-xs font-medium">{m.dept}</span> },
    { key: "status", header: "Status", render: m => <StatusBadge tone={statusTone[m.status]}>{m.status}</StatusBadge> },
    { key: "scenes", header: "Scenes", render: m => <span className="font-bold font-display">{m.scenes || "—"}</span> },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col lg:flex-row lg:h-[calc(100vh-3.5rem)]"
    >
      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold">Production Team</h1>
            <p className="text-muted-foreground text-sm">52 members · 14 departments</p>
          </div>
          <button
            data-testid="button-add-member"
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity self-start sm:self-auto"
          >
            + Add Member
          </button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
          <div className="relative w-full sm:max-w-xs">
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

        <ResponsiveTable columns={columns} rows={filtered} rowKey={m => m.name} onRowClick={setSelected} isRowSelected={m => m.name === selected.name} />
      </div>

      {/* Detail panel */}
      <div className="w-full lg:w-72 shrink-0 border-t lg:border-t-0 lg:border-l border-border p-5 lg:overflow-y-auto">
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
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Status</span>
            <StatusBadge tone={statusTone[selected.status]}>{selected.status}</StatusBadge>
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
