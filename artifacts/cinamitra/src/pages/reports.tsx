import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KpiGrid } from "@/components/patterns/KpiGrid";
import { useRole } from "@/components/layout/RoleContext";
import type { Role } from "@/components/layout/RoleContext";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";

// ─── Shared chart visuals ────────────────────────────────────────────────────

const GRID_STROKE = "hsl(220 13% 90%)";
const TICK = { fontSize: 11 };

interface SeriesLine { key: string; color: string; name: string; dash?: boolean }

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-display">{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

function TrendLineCard({ title, data, xKey, lines, yFormatter }: {
  title: string; data: Record<string, any>[]; xKey: string; lines: SeriesLine[]; yFormatter?: (v: number) => string;
}) {
  return (
    <ChartCard title={title}>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} />
          <XAxis dataKey={xKey} tick={TICK} />
          <YAxis tick={TICK} tickFormatter={yFormatter} />
          <Tooltip formatter={yFormatter ? (v: number) => yFormatter(v) : undefined} />
          <Legend />
          {lines.map(l => (
            <Line key={l.key} type="monotone" dataKey={l.key} stroke={l.color} name={l.name}
              strokeWidth={l.dash ? 2 : 2.5} strokeDasharray={l.dash ? "5 5" : undefined}
              dot={l.dash ? false : { r: 4, fill: l.color }} />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

function HorizontalBarCard({ title, data, xKey, valueKey, color, valueFormatter }: {
  title: string; data: Record<string, any>[]; xKey: string; valueKey: string; color: string | ((row: any) => string); valueFormatter?: (v: number) => string;
}) {
  return (
    <ChartCard title={title}>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} horizontal={false} />
          <XAxis type="number" tick={TICK} tickFormatter={valueFormatter} />
          <YAxis type="category" dataKey={xKey} tick={TICK} width={110} />
          <Tooltip formatter={valueFormatter ? (v: number) => valueFormatter(v) : undefined} />
          <Bar dataKey={valueKey} radius={[0, 4, 4, 0]}>
            {data.map((row, i) => (
              <Cell key={i} fill={typeof color === "function" ? color(row) : color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

function DonutCard({ title, data }: { title: string; data: { name: string; value: number; color: string }[] }) {
  return (
    <ChartCard title={title}>
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="w-full sm:w-1/2">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius={55} outerRadius={85} dataKey="value">
                {data.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip formatter={(v: number) => `${v}%`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex-1 w-full space-y-1.5">
          {data.map((d, i) => (
            <div key={i} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ backgroundColor: d.color }} />
                <span className="text-muted-foreground">{d.name}</span>
              </div>
              <span className="font-bold">{d.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </ChartCard>
  );
}

function StackedAreaCard({ title, data, xKey, areas }: {
  title: string; data: Record<string, any>[]; xKey: string; areas: SeriesLine[];
}) {
  return (
    <ChartCard title={title}>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} />
          <XAxis dataKey={xKey} tick={TICK} />
          <YAxis tick={TICK} />
          <Tooltip />
          <Legend />
          {areas.map(a => (
            <Area key={a.key} type="monotone" dataKey={a.key} stroke={a.color} fill={`${a.color}10`} strokeWidth={2} name={a.name} />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

function ScoreBreakdownCard({ title, overallScore, items }: {
  title: string; overallScore: number; items: { label: string; score: number; weight: string }[];
}) {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-lg font-display">{title} — {overallScore} / 100</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {items.map((h, i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between items-baseline gap-2">
                <p className="text-sm font-medium">{h.label}</p>
                <span className="text-xs text-muted-foreground shrink-0">Weight: {h.weight}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-muted rounded-full h-2">
                  <div className="h-2 rounded-full bg-primary transition-all" style={{ width: `${h.score}%` }} />
                </div>
                <span className="font-display font-bold text-lg w-10 text-right">{h.score}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Colors ──────────────────────────────────────────────────────────────────

const GOLD = "#D4A843", BLUE = "#3B82F6", GREEN = "#10B981", PURPLE = "#8B5CF6",
  PINK = "#EC4899", AMBER = "#F59E0B", GRAY = "#9CA3AF", RED = "#EF4444", TEAL = "#14B8A6";

// ─── Per-role report configs ─────────────────────────────────────────────────

interface RoleReport {
  subtitle: string;
  kpis: { label: string; value: string; sub?: string; tone?: "default" | "destructive" }[];
  charts: React.ReactNode[];
  footer?: React.ReactNode;
}

const burnData = [
  { day: "Day 1", planned: 2.1, actual: 1.8 }, { day: "Day 5", planned: 10.5, actual: 9.2 },
  { day: "Day 10", planned: 21, actual: 20.4 }, { day: "Day 15", planned: 31.5, actual: 32.1 },
  { day: "Day 20", planned: 42, actual: 44.3 }, { day: "Day 23", planned: 48.3, actual: 51.2 },
];

const scheduleData = [
  { name: "Development", completed: 100 }, { name: "Pre-Production", completed: 100 },
  { name: "Photography", completed: 44 }, { name: "Post Production", completed: 0 },
];

const deptBudgetData = [
  { name: "Talent", value: 36, color: GOLD }, { name: "VFX", value: 22, color: BLUE },
  { name: "Art", value: 12, color: GREEN }, { name: "Equipment", value: 13, color: PURPLE },
  { name: "Costume", value: 5, color: PINK }, { name: "Travel", value: 4, color: AMBER },
  { name: "Misc", value: 8, color: GRAY },
];

const activityData = [
  { week: "Wk 1", scenes: 4, approvals: 8, discussions: 22 }, { week: "Wk 2", scenes: 7, approvals: 12, discussions: 35 },
  { week: "Wk 3", scenes: 5, approvals: 6, discussions: 28 }, { week: "Wk 4", scenes: 9, approvals: 14, discussions: 41 },
  { week: "Wk 5", scenes: 6, approvals: 9, discussions: 33 },
];

const ROLE_REPORTS: Record<Exclude<Role, null>, RoleReport> = {
  Producer: {
    subtitle: "Strategic overview — budget, schedule & production health.",
    kpis: [
      { label: "Schedule Health", value: "87%", sub: "On Track" },
      { label: "Budget Health", value: "₹142Cr", sub: "of ₹165Cr (86%)" },
      { label: "Days Buffer", value: "+2", sub: "Available" },
      { label: "Greenlight Risk", value: "Medium", sub: "1 escalated risk flag", tone: "destructive" },
    ],
    charts: [
      <TrendLineCard key="burn" title="Budget Burn Rate" data={burnData} xKey="day"
        yFormatter={v => `₹${v}Cr`} lines={[
          { key: "planned", color: GRAY, name: "Planned", dash: true },
          { key: "actual", color: GOLD, name: "Actual" },
        ]} />,
      <HorizontalBarCard key="sched" title="Schedule Completion by Phase" data={scheduleData}
        xKey="name" valueKey="completed" color={GOLD} valueFormatter={v => `${v}%`} />,
      <DonutCard key="dept" title="Department Budget Allocation" data={deptBudgetData} />,
      <StackedAreaCard key="activity" title="Weekly Production Activity" data={activityData} xKey="week"
        areas={[
          { key: "discussions", color: BLUE, name: "Discussions" },
          { key: "approvals", color: GOLD, name: "Approvals" },
          { key: "scenes", color: GREEN, name: "Scenes Shot" },
        ]} />,
    ],
    footer: (
      <ScoreBreakdownCard title="Production Health Score" overallScore={87} items={[
        { label: "Scene Completion", score: 89, weight: "30%" },
        { label: "Budget Adherence", score: 86, weight: "25%" },
        { label: "Schedule Buffer", score: 92, weight: "25%" },
        { label: "Risk Index", score: 78, weight: "20%" },
      ]} />
    ),
  },

  Director: {
    subtitle: "Creative status — scene locks, continuity & cast consistency.",
    kpis: [
      { label: "Scenes Locked", value: "67 / 89", sub: "75% locked" },
      { label: "Revision Requests", value: "4", sub: "Open" },
      { label: "Continuity Alerts", value: "3", sub: "Active", tone: "destructive" },
      { label: "Cast Consistency", value: "96%", sub: "Across takes" },
    ],
    charts: [
      <HorizontalBarCard key="status" title="Scene Status Breakdown"
        data={[{ name: "Locked", count: 67 }, { name: "In Revision", count: 14 }, { name: "Pending Coverage", count: 8 }]}
        xKey="name" valueKey="count" color={(row: any) => row.name === "Locked" ? GREEN : row.name === "In Revision" ? AMBER : RED} />,
      <StackedAreaCard key="activity" title="Weekly Creative Activity" data={activityData} xKey="week"
        areas={[
          { key: "discussions", color: BLUE, name: "Discussions" },
          { key: "approvals", color: GOLD, name: "Approvals" },
          { key: "scenes", color: GREEN, name: "Scenes Shot" },
        ]} />,
      <TrendLineCard key="continuity" title="Continuity Alerts Raised vs Resolved"
        data={[
          { week: "Wk 1", raised: 2, resolved: 1 }, { week: "Wk 2", raised: 3, resolved: 3 },
          { week: "Wk 3", raised: 1, resolved: 2 }, { week: "Wk 4", raised: 4, resolved: 3 },
          { week: "Wk 5", raised: 2, resolved: 2 },
        ]} xKey="week" lines={[
          { key: "raised", color: RED, name: "Raised" },
          { key: "resolved", color: GREEN, name: "Resolved" },
        ]} />,
    ],
    footer: (
      <ScoreBreakdownCard title="Creative Health Score" overallScore={86} items={[
        { label: "Scene Lock Rate", score: 75, weight: "30%" },
        { label: "Continuity Score", score: 91, weight: "25%" },
        { label: "Cast Consistency", score: 96, weight: "25%" },
        { label: "Coverage Completeness", score: 82, weight: "20%" },
      ]} />
    ),
  },

  "Line Producer": {
    subtitle: "Budget burn, vendor payments & schedule pacing.",
    kpis: [
      { label: "Active Shoot Day", value: "23", sub: "of 65" },
      { label: "Budget Variance", value: "-2%", sub: "Under plan" },
      { label: "Vendor Payments Due", value: "2", sub: "This week", tone: "destructive" },
      { label: "Resource Conflicts", value: "1", sub: "Open" },
    ],
    charts: [
      <TrendLineCard key="burn" title="Budget Burn Rate" data={burnData} xKey="day"
        yFormatter={v => `₹${v}Cr`} lines={[
          { key: "planned", color: GRAY, name: "Planned", dash: true },
          { key: "actual", color: GOLD, name: "Actual" },
        ]} />,
      <DonutCard key="dept" title="Department Budget Allocation" data={deptBudgetData} />,
      <HorizontalBarCard key="vendor" title="Vendor Payment Status"
        data={[{ name: "Paid", count: 5 }, { name: "Due", count: 3 }, { name: "Overdue", count: 1 }]}
        xKey="name" valueKey="count" color={(row: any) => row.name === "Paid" ? GREEN : row.name === "Due" ? AMBER : RED} />,
      <HorizontalBarCard key="sched" title="Schedule Completion by Phase" data={scheduleData}
        xKey="name" valueKey="completed" color={GOLD} valueFormatter={v => `${v}%`} />,
    ],
  },

  AD: {
    subtitle: "On-set pace — scenes shot, call sheet compliance & issues.",
    kpis: [
      { label: "Scenes Today", value: "2", sub: "Day 23" },
      { label: "Cast On Set", value: "3 / 4", sub: "1 delayed" },
      { label: "Open Issues", value: "1", sub: "Flagged", tone: "destructive" },
      { label: "Call Sheet Compliance", value: "92%", sub: "Last 5 days" },
    ],
    charts: [
      <TrendLineCard key="scenes" title="Scenes Planned vs Shot"
        data={[
          { week: "Wk 1", planned: 5, shot: 4 }, { week: "Wk 2", planned: 8, shot: 7 },
          { week: "Wk 3", planned: 6, shot: 5 }, { week: "Wk 4", planned: 10, shot: 9 },
          { week: "Wk 5", planned: 7, shot: 6 },
        ]} xKey="week" lines={[
          { key: "planned", color: GRAY, name: "Planned", dash: true },
          { key: "shot", color: GOLD, name: "Shot" },
        ]} />,
      <HorizontalBarCard key="compliance" title="Call Sheet Compliance by Day"
        data={[
          { day: "Day 19", pct: 100 }, { day: "Day 20", pct: 95 }, { day: "Day 21", pct: 88 },
          { day: "Day 22", pct: 90 }, { day: "Day 23", pct: 92 },
        ]} xKey="day" valueKey="pct" color={GOLD} valueFormatter={v => `${v}%`} />,
      <TrendLineCard key="issues" title="Issues Flagged per Week"
        data={[
          { week: "Wk 1", issues: 1 }, { week: "Wk 2", issues: 3 }, { week: "Wk 3", issues: 2 },
          { week: "Wk 4", issues: 4 }, { week: "Wk 5", issues: 1 },
        ]} xKey="week" lines={[{ key: "issues", color: RED, name: "Issues" }]} />,
    ],
  },

  Accountant: {
    subtitle: "Budget utilization, invoices & expense tracking.",
    kpis: [
      { label: "Pending Invoices", value: "6", sub: "Awaiting approval", tone: "destructive" },
      { label: "Budget Utilized", value: "86%", sub: "₹142Cr of ₹165Cr" },
      { label: "Expense Variance", value: "+₹4.2Cr", sub: "Over estimate" },
      { label: "Reconciliation", value: "On Track", sub: "Last closed Day 22" },
    ],
    charts: [
      <TrendLineCard key="burn" title="Budget Burn Rate" data={burnData} xKey="day"
        yFormatter={v => `₹${v}Cr`} lines={[
          { key: "planned", color: GRAY, name: "Planned", dash: true },
          { key: "actual", color: GOLD, name: "Actual" },
        ]} />,
      <DonutCard key="expense" title="Expense by Category" data={deptBudgetData} />,
      <HorizontalBarCard key="invoices" title="Invoice Status"
        data={[{ name: "Paid", count: 18 }, { name: "Pending", count: 6 }, { name: "Overdue", count: 2 }]}
        xKey="name" valueKey="count" color={(row: any) => row.name === "Paid" ? GREEN : row.name === "Pending" ? AMBER : RED} />,
      <StackedAreaCard key="cash" title="Daily Cash Outflow"
        data={[
          { day: "Day 19", outflow: 8.2 }, { day: "Day 20", outflow: 6.4 }, { day: "Day 21", outflow: 9.1 },
          { day: "Day 22", outflow: 5.8 }, { day: "Day 23", outflow: 7.3 },
        ]} xKey="day" areas={[{ key: "outflow", color: GOLD, name: "Outflow (₹L)" }]} />,
    ],
  },

  Continuity: {
    subtitle: "Continuity alerts, resolution rate & cross-scene consistency.",
    kpis: [
      { label: "Open Alerts", value: "3", sub: "Active", tone: "destructive" },
      { label: "Scenes Tracked", value: "89", sub: "Full script" },
      { label: "Character Timelines", value: "12", sub: "Maintained" },
      { label: "Resolution Rate", value: "94%", sub: "Last 30 days" },
    ],
    charts: [
      <TrendLineCard key="trend" title="Alerts Raised vs Resolved"
        data={[
          { week: "Wk 1", raised: 2, resolved: 1 }, { week: "Wk 2", raised: 3, resolved: 3 },
          { week: "Wk 3", raised: 1, resolved: 2 }, { week: "Wk 4", raised: 4, resolved: 3 },
          { week: "Wk 5", raised: 2, resolved: 2 },
        ]} xKey="week" lines={[
          { key: "raised", color: RED, name: "Raised" },
          { key: "resolved", color: GREEN, name: "Resolved" },
        ]} />,
      <HorizontalBarCard key="bydept" title="Alerts by Department"
        data={[{ name: "Costume", count: 5 }, { name: "Props", count: 3 }, { name: "Makeup", count: 2 }, { name: "Set", count: 1 }]}
        xKey="name" valueKey="count" color={PURPLE} />,
    ],
    footer: (
      <ScoreBreakdownCard title="Continuity Health Score" overallScore={90} items={[
        { label: "Alert Resolution Rate", score: 94, weight: "30%" },
        { label: "Cross-Scene Consistency", score: 89, weight: "30%" },
        { label: "Documentation Completeness", score: 87, weight: "20%" },
        { label: "Flag Response Time", score: 92, weight: "20%" },
      ]} />
    ),
  },

  Cashier: {
    subtitle: "Cash on hand, daily outflow & receipts.",
    kpis: [
      { label: "Cash on Hand", value: "₹1.8L", sub: "As of today" },
      { label: "Today's Expenses", value: "₹42,000", sub: "12 entries" },
      { label: "Receipts Pending", value: "4", sub: "To be filed", tone: "destructive" },
      { label: "Float Variance", value: "₹0", sub: "Balanced" },
    ],
    charts: [
      <StackedAreaCard key="cash" title="Daily Cash Outflow"
        data={[
          { day: "Day 19", outflow: 8.2 }, { day: "Day 20", outflow: 6.4 }, { day: "Day 21", outflow: 9.1 },
          { day: "Day 22", outflow: 5.8 }, { day: "Day 23", outflow: 7.3 },
        ]} xKey="day" areas={[{ key: "outflow", color: GOLD, name: "Outflow (₹K)" }]} />,
      <DonutCard key="expense" title="Expense by Category" data={deptBudgetData} />,
      <TrendLineCard key="balance" title="Petty Cash Balance Trend"
        data={[
          { day: "Day 19", balance: 2.4 }, { day: "Day 20", balance: 2.0 }, { day: "Day 21", balance: 2.6 },
          { day: "Day 22", balance: 2.1 }, { day: "Day 23", balance: 1.8 },
        ]} xKey="day" yFormatter={v => `₹${v}L`} lines={[{ key: "balance", color: TEAL, name: "Balance" }]} />,
    ],
  },

  "Production Manager": {
    subtitle: "Logistics, equipment utilization & crew readiness.",
    kpis: [
      { label: "Vehicles Active", value: "8 / 10", sub: "On site" },
      { label: "Equipment Utilization", value: "91%", sub: "Across departments" },
      { label: "Permits Confirmed", value: "5 / 6", sub: "1 pending", tone: "destructive" },
      { label: "Crew Onsite", value: "87", sub: "Today" },
    ],
    charts: [
      <HorizontalBarCard key="sched" title="Schedule Completion by Phase" data={scheduleData}
        xKey="name" valueKey="completed" color={GOLD} valueFormatter={v => `${v}%`} />,
      <HorizontalBarCard key="equip" title="Equipment Utilization"
        data={[{ name: "Camera", pct: 94 }, { name: "Grip", pct: 88 }, { name: "Generators", pct: 76 }, { name: "Vehicles", pct: 91 }]}
        xKey="name" valueKey="pct" color={TEAL} valueFormatter={v => `${v}%`} />,
      <DonutCard key="logistics" title="Logistics Cost Breakdown" data={[
        { name: "Transport", value: 38, color: BLUE }, { name: "Accommodation", value: 27, color: PURPLE },
        { name: "Catering", value: 22, color: AMBER }, { name: "Equipment Rental", value: 13, color: GOLD },
      ]} />,
      <StackedAreaCard key="activity" title="Weekly Production Activity" data={activityData} xKey="week"
        areas={[
          { key: "discussions", color: BLUE, name: "Discussions" },
          { key: "approvals", color: GOLD, name: "Approvals" },
          { key: "scenes", color: GREEN, name: "Scenes Shot" },
        ]} />,
    ],
  },

  Cinematographer: {
    subtitle: "Equipment readiness, lighting plans & camera mix.",
    kpis: [
      { label: "Upcoming Scenes", value: "8", sub: "This week" },
      { label: "Equipment Confirmed", value: "94%", sub: "Of planned gear" },
      { label: "Lighting Plans Locked", value: "67 / 89", sub: "Shot scenes" },
      { label: "Avg. Lens Changes/Day", value: "3.4", sub: "Last 5 shoot days" },
    ],
    charts: [
      <TrendLineCard key="confirmed" title="Equipment Confirmed Trend"
        data={[
          { week: "Wk 1", pct: 82 }, { week: "Wk 2", pct: 88 }, { week: "Wk 3", pct: 91 },
          { week: "Wk 4", pct: 90 }, { week: "Wk 5", pct: 94 },
        ]} xKey="week" yFormatter={v => `${v}%`} lines={[{ key: "pct", color: GOLD, name: "Confirmed" }]} />,
      <HorizontalBarCard key="lighting" title="Lighting Plans — Locked vs Pending"
        data={[{ name: "Locked", count: 67 }, { name: "Pending", count: 22 }]}
        xKey="name" valueKey="count" color={(row: any) => row.name === "Locked" ? GREEN : AMBER} />,
      <DonutCard key="camera" title="Camera Setup Mix" data={[
        { name: "Arri Alexa 35", value: 45, color: GOLD }, { name: "Sony FX9", value: 25, color: BLUE },
        { name: "Drone", value: 15, color: PURPLE }, { name: "Specialty Rigs", value: 15, color: PINK },
      ]} />,
    ],
  },

  "Production Designer": {
    subtitle: "Props readiness, set construction & sourcing status.",
    kpis: [
      { label: "Active Props", value: "147", sub: "Across all scenes" },
      { label: "Scenes Dressed", value: "34 / 89", sub: "Shot scenes" },
      { label: "Pending Sourcing", value: "23", sub: "Items unconfirmed", tone: "destructive" },
      { label: "Sets Under Construction", value: "3", sub: "Active builds" },
    ],
    charts: [
      <TrendLineCard key="ready" title="Props Readiness Trend"
        data={[
          { week: "Wk 1", pct: 58 }, { week: "Wk 2", pct: 66 }, { week: "Wk 3", pct: 71 },
          { week: "Wk 4", pct: 79 }, { week: "Wk 5", pct: 84 },
        ]} xKey="week" yFormatter={v => `${v}%`} lines={[{ key: "pct", color: TEAL, name: "Ready" }]} />,
      <HorizontalBarCard key="construction" title="Set Construction Progress"
        data={[{ name: "Palace Throne Room", pct: 88 }, { name: "Villain's Hideout", pct: 62 }, { name: "Climax Cliff Facade", pct: 35 }]}
        xKey="name" valueKey="pct" color={GOLD} valueFormatter={v => `${v}%`} />,
      <DonutCard key="sourcing" title="Sourcing Status" data={[
        { name: "Confirmed", value: 54, color: GREEN }, { name: "Sourcing", value: 19, color: AMBER },
        { name: "In Progress", value: 17, color: BLUE }, { name: "Missing", value: 10, color: RED },
      ]} />,
    ],
  },

  "Costume Designer": {
    subtitle: "Fittings, wardrobe status & continuity alerts.",
    kpis: [
      { label: "Characters", value: "12", sub: "With costume sheets" },
      { label: "Costume Sets", value: "47", sub: "Total variations" },
      { label: "Fittings This Week", value: "8", sub: "5 confirmed, 3 pending" },
      { label: "Continuity Alerts", value: "2", sub: "Active", tone: "destructive" },
    ],
    charts: [
      <TrendLineCard key="fittings" title="Fittings Completed vs Scheduled"
        data={[
          { week: "Wk 1", scheduled: 6, completed: 5 }, { week: "Wk 2", scheduled: 9, completed: 8 },
          { week: "Wk 3", scheduled: 7, completed: 6 }, { week: "Wk 4", scheduled: 10, completed: 9 },
          { week: "Wk 5", scheduled: 8, completed: 7 },
        ]} xKey="week" lines={[
          { key: "scheduled", color: GRAY, name: "Scheduled", dash: true },
          { key: "completed", color: PINK, name: "Completed" },
        ]} />,
      <DonutCard key="wardrobe" title="Wardrobe Status" data={[
        { name: "Locked", value: 70, color: GREEN }, { name: "In Review", value: 18, color: AMBER },
        { name: "Alert", value: 12, color: RED },
      ]} />,
      <HorizontalBarCard key="alerts" title="Continuity Alerts by Scene"
        data={[{ name: "Sc 41", count: 1 }, { name: "Sc 55", count: 1 }, { name: "Sc 103", count: 0 }]}
        xKey="name" valueKey="count" color={PINK} />,
    ],
  },

  Editor: {
    subtitle: "Scenes received, VFX flags & cut version progress.",
    kpis: [
      { label: "Scenes Received", value: "23 / 89", sub: "Shot and delivered" },
      { label: "VFX Flags", value: "14", sub: "Scenes requiring VFX" },
      { label: "Takes Logged", value: "312", sub: "Total across all scenes" },
      { label: "Cut Progress", value: "40%", sub: "Director's Cut v2" },
    ],
    charts: [
      <StackedAreaCard key="received" title="Scenes Received vs Takes Logged" data={[
        { week: "Wk 1", scenes: 3, takes: 38 }, { week: "Wk 2", scenes: 5, takes: 64 },
        { week: "Wk 3", scenes: 4, takes: 52 }, { week: "Wk 4", scenes: 6, takes: 81 },
        { week: "Wk 5", scenes: 5, takes: 77 },
      ]} xKey="week" areas={[
        { key: "takes", color: BLUE, name: "Takes Logged" },
        { key: "scenes", color: GOLD, name: "Scenes Received" },
      ]} />,
      <HorizontalBarCard key="vfx" title="VFX Flags Status"
        data={[{ name: "In Progress", count: 6 }, { name: "Briefed", count: 5 }, { name: "Not Started", count: 3 }]}
        xKey="name" valueKey="count" color={(row: any) => row.name === "In Progress" ? BLUE : row.name === "Briefed" ? AMBER : GRAY} />,
    ],
    footer: (
      <ScoreBreakdownCard title="Cut Version Progress" overallScore={65} items={[
        { label: "Assembly Cut", score: 100, weight: "Reels 1–4" },
        { label: "Director's Cut v1", score: 100, weight: "Reels 1–3" },
        { label: "Director's Cut v2", score: 40, weight: "Reels 1–2" },
        { label: "Action Block Re-cut", score: 20, weight: "Reel 4" },
      ]} />
    ),
  },
};

export default function ReportsView() {
  const { role } = useRole();
  const report = ROLE_REPORTS[role ?? "Producer"] ?? ROLE_REPORTS.Producer;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto space-y-6 sm:space-y-8"
    >
      <header className="py-4 sm:py-6 border-b border-border/50">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold tracking-tight">Reports & Analytics</h1>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mt-1 sm:mt-2">
          Devara: Part 2 — Principal Photography Day 23{role ? ` · ${role} View` : ""}
        </p>
        <p className="text-sm text-muted-foreground mt-1">{report.subtitle}</p>
      </header>

      <KpiGrid items={report.kpis} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {report.charts}
      </div>

      {report.footer}
    </motion.div>
  );
}
