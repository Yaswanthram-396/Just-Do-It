import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Sparkles, Filter, ChevronDown, FileText } from "lucide-react";

export default function Breakdown() {
  const items = [
    { el: "Merchant cart", cat: "Props", scenes: "34", dept: "Art", status: "Ready", owner: "Sabu", risk: "Low" },
    { el: "NTR white kurta", cat: "Costume", scenes: "34, 35, 41", dept: "Costume", status: "Ready", owner: "Rama", risk: "Low" },
    { el: "Saif villain outfit", cat: "Costume", scenes: "34, 67", dept: "Costume", status: "In Progress", owner: "Rama", risk: "Medium" },
    { el: "Market crowd ext.", cat: "VFX", scenes: "34", dept: "VFX", status: "Scheduled", owner: "Kamal", risk: "High" },
    { el: "Wooden crates (x6)", cat: "Props", scenes: "34", dept: "Art", status: "Pending", owner: "Sabu", risk: "Low" },
    { el: "Palace Throne", cat: "Props", scenes: "12", dept: "Art", status: "Ready", owner: "Sabu", risk: "Low" },
    { el: "Blood packets", cat: "Special FX", scenes: "41, 103", dept: "SFX", status: "Ready", owner: "Venkat", risk: "Medium" },
    { el: "Vintage Jeep", cat: "Vehicles", scenes: "67", dept: "Transport", status: "Sourced", owner: "Raju", risk: "High" },
    { el: "Hero Sword", cat: "Props", scenes: "41, 78, 103", dept: "Art", status: "Ready", owner: "Sabu", risk: "Low" },
    { el: "Wedding Garland", cat: "Props", scenes: "55", dept: "Art", status: "Ready", owner: "Sabu", risk: "Low" },
    { el: "Village Huts", cat: "Location", scenes: "23", dept: "Locations", status: "Built", owner: "Rathna", risk: "Low" },
    { el: "CGI River water", cat: "VFX", scenes: "78", dept: "VFX", status: "Draft", owner: "Kamal", risk: "Medium" },
  ];

  const getCatColor = (cat: string) => {
    switch(cat) {
      case "Props": return "bg-teal-500/10 text-teal-400 border-teal-500/20";
      case "Costume": return "bg-purple-500/10 text-purple-400 border-purple-500/20";
      case "VFX": return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "Location": return "bg-orange-500/10 text-orange-400 border-orange-500/20";
      case "Vehicles": return "bg-pink-500/10 text-pink-400 border-pink-500/20";
      case "Special FX": return "bg-red-500/10 text-red-400 border-red-500/20";
      default: return "bg-muted text-muted-foreground border-transparent";
    }
  };

  const getRiskColor = (risk: string) => {
    switch(risk) {
      case "Low": return "text-green-400";
      case "Medium": return "text-yellow-400";
      case "High": return "text-red-400 font-bold";
      default: return "";
    }
  }

  return (
    <div className="p-6 md:p-8 h-full flex flex-col">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-3xl font-display font-bold mb-2">Breakdown Studio</h1>
          <p className="text-muted-foreground">Manage all elements across the script.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/breakdown/script">
            <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/5 gap-2">
              <FileText className="w-4 h-4" /> Open Script
            </Button>
          </Link>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            Add Element
          </Button>
        </div>
      </div>

      <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6 flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-primary shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-bold text-primary mb-1">AI Breakdown Summary (Scene 34)</p>
          <p className="text-sm text-primary/80">Scene 34 analysis: 14 props identified, 3 costume sets, 2 VFX shots, location scouting complete. Confidence: 94%</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {["All", "Cast", "Props", "Locations", "Costumes", "Vehicles", "VFX"].map(t => (
          <Badge key={t} variant={t === "All" ? "default" : "outline"} className={`cursor-pointer ${t === "All" ? "bg-primary text-primary-foreground" : "border-border hover:border-primary"}`}>
            {t}
          </Badge>
        ))}
        <Button variant="ghost" size="sm" className="ml-auto text-muted-foreground h-6 text-xs gap-1">
          <Filter className="w-3 h-3" /> Filter <ChevronDown className="w-3 h-3" />
        </Button>
      </div>

      <div className="flex-1 flex gap-6 min-h-0">
        
        {/* Main Table */}
        <div className="flex-1 bg-card border border-border rounded-lg overflow-hidden flex flex-col">
          <div className="overflow-auto flex-1">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/50 text-muted-foreground text-xs uppercase font-semibold sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-3 border-b border-border w-8"><input type="checkbox" className="rounded border-border bg-background" /></th>
                  <th className="px-4 py-3 border-b border-border">Element</th>
                  <th className="px-4 py-3 border-b border-border">Category</th>
                  <th className="px-4 py-3 border-b border-border">Scene(s)</th>
                  <th className="px-4 py-3 border-b border-border">Dept</th>
                  <th className="px-4 py-3 border-b border-border">Status</th>
                  <th className="px-4 py-3 border-b border-border">Assigned</th>
                  <th className="px-4 py-3 border-b border-border">Risk</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {items.map((item, i) => (
                  <tr key={i} className="hover:bg-muted/30 transition-colors group">
                    <td className="px-4 py-3"><input type="checkbox" className="rounded border-border bg-background" /></td>
                    <td className="px-4 py-3 font-medium">{item.el}</td>
                    <td className="px-4 py-3">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${getCatColor(item.cat)}`}>
                        {item.cat}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-display font-medium text-muted-foreground">{item.scenes}</td>
                    <td className="px-4 py-3 text-muted-foreground">{item.dept}</td>
                    <td className="px-4 py-3 text-muted-foreground">{item.status}</td>
                    <td className="px-4 py-3 text-muted-foreground">{item.owner}</td>
                    <td className={`px-4 py-3 ${getRiskColor(item.risk)}`}>{item.risk}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sidebar Stats */}
        <div className="w-64 shrink-0 flex flex-col gap-6 hidden xl:flex">
          <div className="bg-card border border-border rounded-lg p-5">
            <h3 className="font-display font-bold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Dept Breakdown</h3>
            <div className="space-y-3">
              {[
                { name: "Art", val: "32%", color: "bg-teal-500" },
                { name: "Costume", val: "28%", color: "bg-purple-500" },
                { name: "Production", val: "22%", color: "bg-orange-500" },
                { name: "VFX", val: "18%", color: "bg-blue-500" }
              ].map(d => (
                <div key={d.name}>
                  <div className="flex justify-between text-xs mb-1">
                    <span>{d.name}</span>
                    <span className="font-medium text-muted-foreground">{d.val}</span>
                  </div>
                  <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                    <div className={`h-full ${d.color}`} style={{ width: d.val }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-5">
            <h3 className="font-display font-bold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Risk Alerts</h3>
            <div className="flex justify-between items-center bg-red-500/10 text-red-400 p-2 rounded border border-red-500/20 mb-2">
              <span className="text-sm font-bold">High Risk</span>
              <span className="text-lg font-display">3</span>
            </div>
            <div className="flex justify-between items-center bg-yellow-500/10 text-yellow-400 p-2 rounded border border-yellow-500/20 mb-2">
              <span className="text-sm font-bold">Medium Risk</span>
              <span className="text-lg font-display">5</span>
            </div>
            <div className="flex justify-between items-center bg-green-500/10 text-green-400 p-2 rounded border border-green-500/20">
              <span className="text-sm font-bold">Low Risk</span>
              <span className="text-lg font-display">12</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
