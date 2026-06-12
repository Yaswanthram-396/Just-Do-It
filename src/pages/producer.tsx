import { Card, CardContent } from "@/components/ui/card";

export default function ProducerView() {
  return (
    <div className="p-8 max-w-[1400px] mx-auto space-y-12">
      <header className="py-6 border-b border-border/50">
        <h1 className="text-4xl font-display font-bold tracking-tight">Good morning, Rana Ji.</h1>
        <p className="text-xl text-muted-foreground mt-2">Here's Devara: Part 2 at a glance.</p>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <Card className="bg-card border-border hover:border-primary/50 transition-colors">
          <CardContent className="p-6">
            <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-2">Schedule Health</p>
            <p className="text-4xl font-display font-bold text-primary">87%</p>
            <p className="text-sm mt-2 font-medium">On Track</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:border-primary/50 transition-colors">
          <CardContent className="p-6">
            <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-2">Budget Health</p>
            <p className="text-4xl font-display font-bold">₹142Cr</p>
            <p className="text-sm mt-2 text-muted-foreground">of ₹165Cr (86%)</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:border-primary/50 transition-colors">
          <CardContent className="p-6">
            <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-2">Days Buffer</p>
            <p className="text-4xl font-display font-bold text-green-400">+2</p>
            <p className="text-sm mt-2 text-muted-foreground">Available</p>
          </CardContent>
        </Card>

        <Card className="bg-destructive/10 border-destructive/30 hover:border-destructive/60 transition-colors">
          <CardContent className="p-6">
            <p className="text-sm font-bold uppercase tracking-widest text-destructive mb-2">Pending Approvals</p>
            <p className="text-4xl font-display font-bold text-destructive">7</p>
            <p className="text-sm mt-2 text-destructive/80 font-medium">Items requiring signature</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-card border border-border p-6 rounded-lg min-h-[300px] flex items-center justify-center">
          <p className="text-muted-foreground font-display">[ Burn Rate vs Plan Chart Placeholder ]</p>
        </div>
        <div className="bg-card border border-border p-6 rounded-lg min-h-[300px] flex items-center justify-center">
          <p className="text-muted-foreground font-display">[ Schedule Progress Gantt Placeholder ]</p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-display font-bold mb-6">Approval Queue</h2>
        <div className="grid gap-4">
          {[
            { item: "Market Set Extension (Art Dept)", req: "Sabu Cyril", amt: "₹12.5L" },
            { item: "Extra Vanity Vans (2) for Day 31-35", req: "Production", amt: "₹3.2L" },
            { item: "VFX Pre-viz Render Farm scaling", req: "Kamal", amt: "₹8.0L" },
          ].map((a, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-card border border-border rounded-lg">
              <div>
                <p className="text-lg font-medium">{a.item}</p>
                <p className="text-sm text-muted-foreground">Requested by {a.req}</p>
              </div>
              <div className="flex items-center gap-6">
                <span className="text-xl font-display font-bold">{a.amt}</span>
                <div className="flex gap-2">
                  <button className="px-6 py-2 bg-primary text-primary-foreground font-bold rounded hover:bg-primary/90 transition-colors">Approve</button>
                  <button className="px-6 py-2 bg-muted text-muted-foreground font-bold rounded hover:bg-destructive hover:text-destructive-foreground transition-colors">Reject</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
