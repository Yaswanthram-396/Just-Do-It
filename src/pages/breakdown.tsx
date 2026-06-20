import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Sparkles, Filter, ChevronDown, FileText, Search, Plus, AlertTriangle, CheckCircle2, Layers } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Breakdown() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

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
    switch (cat) {
      case "Props": return "bg-teal-500/10 text-teal-300 border-teal-500/20";
      case "Costume": return "bg-purple-500/10 text-purple-300 border-purple-500/20";
      case "VFX": return "bg-blue-500/10 text-blue-300 border-blue-500/20";
      case "Location": return "bg-orange-500/10 text-orange-300 border-orange-500/20";
      case "Vehicles": return "bg-pink-500/10 text-pink-300 border-pink-500/20";
      case "Special FX": return "bg-red-500/10 text-red-300 border-red-500/20";
      default: return "bg-muted text-muted-foreground border-transparent";
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low": return "text-green-400";
      case "Medium": return "text-yellow-400";
      case "High": return "text-red-400 font-bold";
      default: return "";
    }
  };

  // Filtered items
  const filteredItems = items.filter(item => {
    const matchesCategory = selectedCategory === "All" || item.cat.toLowerCase() === selectedCategory.toLowerCase() || (selectedCategory === "Locations" && item.cat === "Location") || (selectedCategory === "Costumes" && item.cat === "Costume");
    const matchesSearch = item.el.toLowerCase().includes(searchQuery.toLowerCase()) || item.dept.toLowerCase().includes(searchQuery.toLowerCase()) || item.owner.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // KPI Calculations
  const totalCount = items.length;
  const highRiskCount = items.filter(i => i.risk === "High").length;
  const propsCount = items.filter(i => i.cat === "Props").length;
  const readyCount = items.filter(i => i.status === "Ready" || i.status === "Sourced" || i.status === "Built").length;

  return (
    <div className="p-4 md:p-8 h-full flex flex-col bg-background text-foreground min-h-screen">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-display font-bold mb-2 tracking-tight text-white">Breakdown Studio</h1>
          <p className="text-muted-foreground text-sm">Review, filter, and organize tagged script elements and assets.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Link href="/breakdown/script" className="flex-1 sm:flex-initial">
            <Button variant="outline" className="w-full border-primary/30 text-primary hover:bg-primary/10 gap-2 bg-card">
              <FileText className="w-4 h-4" /> Open Script Workspace
            </Button>
          </Link>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold gap-1.5 shadow-lg shadow-primary/20">
            <Plus className="w-4 h-4" /> Add Element
          </Button>
        </div>
      </div>

      {/* AI Smart Banner */}
      <div className="bg-gradient-to-r from-primary/15 via-primary/5 to-transparent border border-primary/20 rounded-xl p-4 mb-6 flex items-start gap-3">
        <div className="bg-primary/20 p-2 rounded-lg shrink-0">
          <Sparkles className="w-5 h-5 text-primary animate-pulse" />
        </div>
        <div>
          <p className="text-sm font-bold text-primary mb-0.5">AI Breakdown Workspace Live</p>
          <p className="text-sm text-foreground/80 leading-relaxed">
            Successfully scanned script. Found <span className="text-white font-bold">{totalCount} total elements</span> across 7 departments. Open the Script Workspace to tag scene blocks or link items directly to screenplay lines.
          </p>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Assets Identified", value: totalCount, icon: Layers, color: "text-blue-400" },
          { label: "High Risk Flags", value: highRiskCount, icon: AlertTriangle, color: "text-red-400" },
          { label: "Props Tracked", value: propsCount, icon: Sparkles, color: "text-teal-400" },
          { label: "Ready / Sourced", value: `${readyCount}/${totalCount}`, icon: CheckCircle2, color: "text-green-400" },
        ].map((card, idx) => (
          <div key={idx} className="bg-card border border-border rounded-xl p-4 flex items-center justify-between shadow-sm">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{card.label}</p>
              <p className="text-2xl font-display font-bold mt-1 text-white">{card.value}</p>
            </div>
            <div className={`p-2 rounded-lg bg-background border border-border`}>
              <card.icon className={`w-5 h-5 ${card.color}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-card border border-border rounded-xl p-4 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
          {["All", "Cast", "Props", "Locations", "Costumes", "Vehicles", "VFX"].map(t => {
            const isSelected = selectedCategory.toLowerCase() === t.toLowerCase() || 
                             (t === "Cast" && selectedCategory === "Characters") ||
                             (t === "Costumes" && selectedCategory === "Costume") ||
                             (t === "Locations" && selectedCategory === "Location");
            return (
              <Badge 
                key={t} 
                onClick={() => setSelectedCategory(t === "Cast" ? "Characters" : t)}
                className={`cursor-pointer px-3 py-1 text-xs transition-colors ${
                  isSelected 
                    ? "bg-primary text-primary-foreground font-semibold" 
                    : "bg-background/50 text-muted-foreground border-border hover:border-primary hover:text-white"
                }`}
                variant="outline"
              >
                {t}
              </Badge>
            );
          })}
        </div>
        
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input 
            type="text" 
            placeholder="Search by element, owner, dept..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-background border-border text-sm rounded-lg focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:ring-1"
          />
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">
        
        {/* Main Content Area */}
        <div className="flex-1 bg-card border border-border rounded-xl overflow-hidden flex flex-col shadow-sm">
          {/* Desktop Table View */}
          <div className="hidden sm:block overflow-auto flex-1">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-[#0B1728] text-muted-foreground text-xs uppercase font-semibold border-b border-border sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-3 w-8"><input type="checkbox" className="rounded border-border bg-background" /></th>
                  <th className="px-4 py-3">Element</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Scene(s)</th>
                  <th className="px-4 py-3">Dept</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Assigned</th>
                  <th className="px-4 py-3">Risk</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-foreground bg-card">
                {filteredItems.length > 0 ? (
                  filteredItems.map((item, i) => (
                    <tr key={i} className="hover:bg-muted/20 transition-colors group">
                      <td className="px-4 py-3"><input type="checkbox" className="rounded border-border bg-background" /></td>
                      <td className="px-4 py-3 font-medium text-white group-hover:text-primary transition-colors">{item.el}</td>
                      <td className="px-4 py-3">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${getCatColor(item.cat)}`}>
                          {item.cat}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-display font-medium text-muted-foreground">{item.scenes}</td>
                      <td className="px-4 py-3 text-muted-foreground">{item.dept}</td>
                      <td className="px-4 py-3 text-muted-foreground">{item.status}</td>
                      <td className="px-4 py-3 text-muted-foreground">{item.owner}</td>
                      <td className={`px-4 py-3 ${getRiskColor(item.risk)}`}>{item.risk}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="text-center py-10 text-muted-foreground">
                      No matching elements found. Try resetting filters or changing search query.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Stacked Card Layout */}
          <div className="block sm:hidden overflow-y-auto flex-1 divide-y divide-border bg-card">
            {filteredItems.length > 0 ? (
              filteredItems.map((item, i) => (
                <div key={i} className="p-4 space-y-2 text-xs hover:bg-muted/10 transition-colors">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-sm text-white">{item.el}</span>
                    <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${getCatColor(item.cat)}`}>
                      {item.cat}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-muted-foreground">
                    <p><strong>Scenes:</strong> {item.scenes}</p>
                    <p><strong>Dept:</strong> {item.dept}</p>
                    <p><strong>Status:</strong> {item.status}</p>
                    <p><strong>Owner:</strong> {item.owner}</p>
                  </div>
                  <div className="flex justify-between items-center pt-1 border-t border-border/30 mt-1">
                    <span className="text-[10px] text-muted-foreground">Risk Factor</span>
                    <span className={`font-bold ${getRiskColor(item.risk)}`}>{item.risk}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-muted-foreground">
                No matching elements found.
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Stats */}
        <div className="w-full lg:w-72 shrink-0 flex flex-col gap-6">
          <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
            <h3 className="font-display font-bold mb-4 text-xs uppercase tracking-wider text-muted-foreground">Department Density</h3>
            <div className="space-y-4">
              {[
                { name: "Art Dept (Props)", val: "32%", color: "bg-primary" },
                { name: "Costume Dept", val: "28%", color: "bg-primary/80" },
                { name: "Locations", val: "22%", color: "bg-primary/60" },
                { name: "VFX / Stunts", val: "18%", color: "bg-primary/40" }
              ].map(d => (
                <div key={d.name}>
                  <div className="flex justify-between text-xs mb-1 text-foreground">
                    <span className="text-foreground/90 font-medium">{d.name}</span>
                    <span className="font-semibold text-muted-foreground">{d.val}</span>
                  </div>
                  <div className="h-1.5 w-full bg-background border border-border/50 rounded-full overflow-hidden">
                    <div className={`h-full ${d.color}`} style={{ width: d.val }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
            <h3 className="font-display font-bold mb-4 text-xs uppercase tracking-wider text-muted-foreground">Risk Profile Alerts</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center bg-red-500/10 text-red-400 p-3 rounded-lg border border-red-500/20">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                  <span className="text-xs font-bold">High Risk Items</span>
                </div>
                <span className="text-lg font-display font-bold">{highRiskCount}</span>
              </div>
              <div className="flex justify-between items-center bg-yellow-500/10 text-yellow-400 p-3 rounded-lg border border-yellow-500/20">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-400 shrink-0" />
                  <span className="text-xs font-bold">Medium Risk Items</span>
                </div>
                <span className="text-lg font-display font-bold">3</span>
              </div>
              <div className="flex justify-between items-center bg-green-500/10 text-green-400 p-3 rounded-lg border border-green-500/20">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                  <span className="text-xs font-bold">Low Risk Items</span>
                </div>
                <span className="text-lg font-display font-bold">7</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
