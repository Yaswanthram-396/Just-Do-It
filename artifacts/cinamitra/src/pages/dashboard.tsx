import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, AlertTriangle, Clock, Activity, Film, Calendar, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  return (
    <div className="p-6 md:p-8 max-w-[1600px] mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold">Production Command Center</h1>
          <p className="text-muted-foreground mt-1 text-sm font-medium">Principal Photography &mdash; Day 23 of 52</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="border-primary/20">Download Call Sheet</Button>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">View Live Camera</Button>
        </div>
      </div>

      {/* Top Metric Strip */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <MetricCard title="Health Score" value="87/100" sub="On Track" icon={Activity} />
        <MetricCard title="Budget" value="₹142Cr" sub="of ₹165Cr (86%)" icon={Wallet} />
        <MetricCard title="Schedule" value="On Track" sub="+2 days buffer" icon={Calendar} />
        <MetricCard title="Days Remaining" value="29" sub="of 52 Total" icon={Clock} />
        <MetricCard title="Approvals" value="7" sub="Pending Action" icon={CheckCircle2} />
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <KpiCard label="Total Scenes" value="312" />
        <KpiCard label="Scheduled" value="247" sub="79%" />
        <KpiCard label="Completed" value="89" sub="28%" />
        <KpiCard label="Discussions" value="34" />
        <KpiCard label="Open Risks" value="8" />
        <KpiCard label="Budget Used" value="86%" />
      </div>

      {/* Middle Section */}
      <div className="grid lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 bg-card border-border">
          <CardHeader>
            <CardTitle className="font-display">Production Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto -mx-2 px-2">
              <div className="relative pt-8 pb-4 min-w-[480px]">
                <div className="absolute top-10 left-0 w-full h-1 bg-muted rounded-full"></div>
                <div className="absolute top-10 left-0 w-[44%] h-1 bg-primary rounded-full"></div>

                <div className="relative flex justify-between">
                  <TimelineNode label="Development" date="Complete" active={true} />
                  <TimelineNode label="Pre-Production" date="Complete" active={true} />
                  <TimelineNode label="Photography" date="Active (44%)" active={true} isCurrent={true} />
                  <TimelineNode label="Post-Production" date="Upcoming" active={false} />
                  <TimelineNode label="Release" date="TBD" active={false} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-destructive/5 border-destructive/20">
          <CardHeader>
            <CardTitle className="font-display text-destructive flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Attention Required
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <AttentionItem text="3 Budget approvals > ₹5L pending" type="finance" />
            <AttentionItem text="Scene 67 costume continuity conflict" type="costume" />
            <AttentionItem text="Location permit renewal: Rajahmundry — 3 days" type="production" />
            <AttentionItem text="Actor N.T.R availability gap — Day 31-33" type="ad" />
            <AttentionItem text="Art department overspend: 12% over estimate" type="art" />
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="font-display">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { dept: "Art", time: "10m ago", text: "Approved merchant cart design for Scene 34", color: "text-teal-400 bg-teal-400/10" },
              { dept: "Director", time: "45m ago", text: "Added note: 'Need more extras in background' to Scene 41", color: "text-primary bg-primary/10" },
              { dept: "Costume", time: "1h ago", text: "Uploaded fitting photos for Saif's villain outfit", color: "text-purple-400 bg-purple-400/10" },
              { dept: "Production", time: "2h ago", text: "Secured generator truck for night shoot", color: "text-orange-400 bg-orange-400/10" }
            ].map((act, i) => (
              <div key={i} className="flex items-start gap-3 sm:gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors flex-wrap">
                <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded w-20 text-center shrink-0 ${act.color}`}>
                  {act.dept}
                </span>
                <p className="flex-1 min-w-[140px] text-sm">{act.text}</p>
                <span className="text-xs text-muted-foreground shrink-0">{act.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function MetricCard({ title, value, sub, icon: Icon }: any) {
  return (
    <Card className="bg-card border-border overflow-hidden relative group">
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      <CardContent className="p-4 flex flex-col justify-between h-full relative z-10">
        <div className="flex justify-between items-start mb-2">
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{title}</p>
          <Icon className="w-4 h-4 text-primary" />
        </div>
        <div>
          <h3 className="text-2xl font-display font-bold">{value}</h3>
          <p className="text-xs text-muted-foreground">{sub}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function KpiCard({ label, value, sub }: any) {
  return (
    <div className="border border-border/50 bg-card/50 rounded-lg p-3 flex flex-col justify-center">
      <span className="text-[10px] text-muted-foreground uppercase tracking-widest">{label}</span>
      <div className="flex items-baseline gap-2 mt-1">
        <span className="text-xl font-display font-bold">{value}</span>
        {sub && <span className="text-xs text-muted-foreground">{sub}</span>}
      </div>
    </div>
  );
}

function TimelineNode({ label, date, active, isCurrent }: any) {
  return (
    <div className="flex flex-col items-center z-10 w-24 -ml-12 first:ml-0 last:mr-0">
      <div className={`w-3 h-3 rounded-full mb-3 ${isCurrent ? 'bg-background border-2 border-primary ring-4 ring-primary/20' : active ? 'bg-primary' : 'bg-muted'} transition-all`} />
      <span className={`text-xs font-semibold text-center ${active ? 'text-foreground' : 'text-muted-foreground'}`}>{label}</span>
      <span className="text-[10px] text-muted-foreground text-center mt-1">{date}</span>
    </div>
  );
}

function AttentionItem({ text, type }: any) {
  return (
    <div className="flex items-start gap-3 text-sm p-2 rounded-md hover:bg-destructive/10 transition-colors cursor-pointer">
      <div className="w-1.5 h-1.5 rounded-full bg-destructive mt-1.5 shrink-0" />
      <p className="text-muted-foreground hover:text-foreground transition-colors leading-snug">{text}</p>
    </div>
  );
}
