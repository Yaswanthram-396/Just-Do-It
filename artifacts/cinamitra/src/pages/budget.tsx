import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { ResponsiveTable, type ResponsiveTableColumn } from "@/components/patterns/ResponsiveTable";

interface DeptAllocation {
  d: string;
  s: string;
  v: string;
  over: boolean;
}

const deptAllocations: DeptAllocation[] = [
  { d: "Talent", s: "45.0", v: "+0.5", over: true },
  { d: "Production", s: "35.0", v: "-1.2", over: false },
  { d: "Art", s: "25.0", v: "+3.4", over: true },
  { d: "VFX", s: "18.0", v: "+0.0", over: false },
  { d: "Locations", s: "12.0", v: "-0.5", over: false },
  { d: "Costume", s: "7.0", v: "+2.0", over: true },
];

const deptColumns: ResponsiveTableColumn<DeptAllocation>[] = [
  { key: "d", header: "Dept", primary: true, render: r => <span className="font-medium">{r.d}</span> },
  { key: "s", header: "Spent", render: r => <span>₹{r.s}</span> },
  { key: "v", header: "Var", render: r => <span className={`font-bold ${r.over ? "text-destructive" : "text-green-400"}`}>{r.v}</span> },
];

const data = [
  { day: 'Day 10', actual: 20, plan: 22 },
  { day: 'Day 20', actual: 45, plan: 44 },
  { day: 'Day 30', actual: 75, plan: 66 },
  { day: 'Day 40', actual: 110, plan: 95 },
  { day: 'Day 50', actual: 142, plan: 130 },
];

const deptData = [
  { name: 'Talent', val: 45 },
  { name: 'Production', val: 35 },
  { name: 'Art', val: 25 },
  { name: 'VFX', val: 18 },
  { name: 'Loc', val: 12 },
  { name: 'Costume', val: 7 },
];

export default function Budget() {
  return (
    <div className="p-6 md:p-8 h-full overflow-y-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold mb-2">Budget OS</h1>
        <p className="text-muted-foreground">Financial health & variance tracking.</p>
      </div>

      {/* Health Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1">Total Budget</p>
          <p className="text-2xl font-display font-bold">₹165.0 Cr</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1">Spent</p>
          <p className="text-2xl font-display font-bold text-primary">₹142.0 Cr</p>
          <p className="text-xs text-muted-foreground mt-1">86% utilized</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1">Committed</p>
          <p className="text-2xl font-display font-bold">₹8.0 Cr</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1">Available</p>
          <p className="text-2xl font-display font-bold text-green-400">₹15.0 Cr</p>
        </div>
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
          <p className="text-xs text-destructive uppercase font-bold tracking-wider mb-1">Variance</p>
          <p className="text-2xl font-display font-bold text-destructive">+₹4.2 Cr</p>
          <p className="text-xs text-destructive/80 mt-1">Over estimate</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* LEFT: Dept Table */}
        <div className="lg:col-span-1 space-y-3">
          <h3 className="font-display font-bold">Department Allocation</h3>
          <ResponsiveTable columns={deptColumns} rows={deptAllocations} rowKey={r => r.d} />
        </div>

        {/* CENTER: Charts */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <Card className="bg-card border-border flex-1 min-h-[250px]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-display text-muted-foreground uppercase">Burn Rate vs Plan</CardTitle>
            </CardHeader>
            <CardContent className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                  <XAxis dataKey="day" stroke="#666" tick={{fontSize: 10}} />
                  <YAxis stroke="#666" tick={{fontSize: 10}} />
                  <Tooltip contentStyle={{backgroundColor: '#111', borderColor: '#333'}} />
                  <Line type="monotone" dataKey="actual" stroke="hsl(var(--destructive))" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="plan" stroke="hsl(var(--primary))" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-border flex-1 min-h-[250px]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-display text-muted-foreground uppercase">Spend by Dept</CardTitle>
            </CardHeader>
            <CardContent className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={deptData} layout="vertical" margin={{top: 0, right: 0, left: 0, bottom: 0}}>
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" stroke="#666" tick={{fontSize: 10}} width={60} />
                  <Tooltip cursor={{fill: '#222'}} contentStyle={{backgroundColor: '#111', borderColor: '#333'}} />
                  <Bar dataKey="val" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT: Approvals */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-display">Pending Approvals</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-2">
              {[
                { req: "Sabu Cyril", for: "Market Set Extension", amt: "₹12.5L" },
                { req: "Kamal (VFX)", for: "Pre-viz Render Farm", amt: "₹8.0L" },
                { req: "Raju", for: "Vintage Jeep Rental", amt: "₹4.2L" },
              ].map((a, i) => (
                <div key={i} className="p-3 border border-border rounded bg-muted/10">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-sm font-medium">{a.for}</p>
                      <p className="text-xs text-muted-foreground">Req by: {a.req}</p>
                    </div>
                    <span className="font-display font-bold text-primary">{a.amt}</span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button className="flex-1 bg-primary/20 text-primary text-xs font-bold py-1.5 rounded hover:bg-primary hover:text-primary-foreground transition-colors">Approve</button>
                    <button className="flex-1 bg-muted text-muted-foreground text-xs font-bold py-1.5 rounded hover:bg-destructive hover:text-destructive-foreground transition-colors">Reject</button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
