import { motion } from "framer-motion";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";

const burnData = [
  { day: "Day 1", planned: 2.1, actual: 1.8 },
  { day: "Day 5", planned: 10.5, actual: 9.2 },
  { day: "Day 10", planned: 21, actual: 20.4 },
  { day: "Day 15", planned: 31.5, actual: 32.1 },
  { day: "Day 20", planned: 42, actual: 44.3 },
  { day: "Day 23", planned: 48.3, actual: 51.2 },
];

const scheduleData = [
  { name: "Development", completed: 100 },
  { name: "Pre-Production", completed: 100 },
  { name: "Photography", completed: 44 },
  { name: "Post Production", completed: 0 },
];

const deptData = [
  { name: "Talent", value: 36, color: "#D4A843" },
  { name: "VFX", value: 22, color: "#3B82F6" },
  { name: "Art", value: 12, color: "#10B981" },
  { name: "Equipment", value: 13, color: "#8B5CF6" },
  { name: "Costume", value: 5, color: "#EC4899" },
  { name: "Travel", value: 4, color: "#F59E0B" },
  { name: "Misc", value: 8, color: "#6B7280" },
];

const activityData = [
  { week: "Wk 1", scenes: 4, approvals: 8, discussions: 22 },
  { week: "Wk 2", scenes: 7, approvals: 12, discussions: 35 },
  { week: "Wk 3", scenes: 5, approvals: 6, discussions: 28 },
  { week: "Wk 4", scenes: 9, approvals: 14, discussions: 41 },
  { week: "Wk 5", scenes: 6, approvals: 9, discussions: 33 },
];

const tabs = ["Overview", "Financial", "Schedule", "Department", "Export"];

const healthBreakdown = [
  { label: "Scene Completion", score: 89, weight: "30%" },
  { label: "Budget Adherence", score: 86, weight: "25%" },
  { label: "Schedule Buffer", score: 92, weight: "25%" },
  { label: "Risk Index", score: 78, weight: "20%" },
];

export default function ReportsView() {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto space-y-6 sm:space-y-8"
    >
      <header className="py-4 sm:py-6 border-b border-border/50">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold tracking-tight">Reports & Analytics</h1>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mt-1 sm:mt-2">Devara: Part 2 — Principal Photography Day 23</p>
      </header>

      <div className="flex gap-1 border-b border-border overflow-x-auto">
        {tabs.map(t => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`px-3 sm:px-5 py-2.5 text-sm font-semibold transition-colors relative shrink-0 ${
              activeTab === t
                ? "text-foreground border-b-2 border-primary -mb-px"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {activeTab === "Overview" && (
        <div className="space-y-8">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-card border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-display">Budget Burn Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={burnData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 90%)" />
                    <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `₹${v}Cr`} />
                    <Tooltip formatter={(v: number) => `₹${v}Cr`} />
                    <Legend />
                    <Line type="monotone" dataKey="planned" stroke="#9CA3AF" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Planned" />
                    <Line type="monotone" dataKey="actual" stroke="#D4A843" strokeWidth={2.5} dot={{ r: 4, fill: "#D4A843" }} name="Actual" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-display">Schedule Completion by Phase</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={scheduleData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 90%)" horizontal={false} />
                    <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} tickFormatter={v => `${v}%`} />
                    <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={110} />
                    <Tooltip formatter={(v: number) => `${v}%`} />
                    <Bar dataKey="completed" fill="#D4A843" radius={[0, 4, 4, 0]} name="Completed" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-display">Department Budget Allocation</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col sm:flex-row items-center gap-6">
                <div className="w-full sm:w-1/2">
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie data={deptData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} dataKey="value">
                        {deptData.map((entry, i) => (
                          <Cell key={i} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(v: number) => `${v}%`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex-1 w-full space-y-1.5">
                  {deptData.map((d, i) => (
                    <div key={i} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: d.color }} />
                        <span className="text-muted-foreground">{d.name}</span>
                      </div>
                      <span className="font-bold">{d.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-display">Weekly Production Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart data={activityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 90%)" />
                    <XAxis dataKey="week" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="discussions" stroke="#3B82F6" fill="#3B82F610" strokeWidth={2} name="Discussions" />
                    <Area type="monotone" dataKey="approvals" stroke="#D4A843" fill="#D4A84310" strokeWidth={2} name="Approvals" />
                    <Area type="monotone" dataKey="scenes" stroke="#10B981" fill="#10B98110" strokeWidth={2} name="Scenes Shot" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg font-display">Production Health Score — 87 / 100</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6">
                {healthBreakdown.map((h, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between items-baseline">
                      <p className="text-sm font-medium">{h.label}</p>
                      <span className="text-xs text-muted-foreground">Weight: {h.weight}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-muted rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-primary transition-all"
                          style={{ width: `${h.score}%` }}
                        />
                      </div>
                      <span className="font-display font-bold text-lg w-10 text-right">{h.score}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab !== "Overview" && (
        <div className="flex items-center justify-center h-64 text-muted-foreground">
          <div className="text-center">
            <p className="text-lg font-display font-bold mb-2">{activeTab} Reports</p>
            <p className="text-sm">Detailed {activeTab.toLowerCase()} reports available in Phase 1.5.</p>
          </div>
        </div>
      )}
    </motion.div>
  );
}
