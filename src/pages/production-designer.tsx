import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Search, Filter, Layers, Box, Calendar, ChevronRight, X, Sparkles, Folder } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { Input } from "@/components/ui/input";

const propsData = [
  { item: "Merchant Cart (wooden)", scenes: "34, 35", status: "Approved", vendor: "Roja Art Works", cat: "Furniture", priority: "High", dept: "Art" },
  { item: "Fish boxes (x12)", scenes: "34", status: "Approved", vendor: "Local Market HYD", cat: "Set Decoration", priority: "Medium", dept: "Art" },
  { item: "Boat rope (hemp, 30m)", scenes: "34, 78", status: "Procurement Required", vendor: "Marine Supplies Vizag", cat: "Weapons", priority: "High", dept: "Art" },
  { item: "Wooden crates (x6)", scenes: "34, 35", status: "Ready", vendor: "Roja Art Works", cat: "Set Decoration", priority: "Low", dept: "Art" },
  { item: "Palace chandelier (replica)", scenes: "12", status: "Approved", vendor: "Set Design Studio", cat: "Set Decoration", priority: "High", dept: "Art" },
  { item: "Period weapons (replica, x8)", scenes: "41, 67", status: "Pending", vendor: "Props Unlimited", cat: "Weapons", priority: "High", dept: "Art" },
  { item: "Wedding mandap setup", scenes: "55", status: "Ready", vendor: "Event Décor HYD", cat: "Set Decoration", priority: "Medium", dept: "Art" },
  { item: "Hospital equipment (x14)", scenes: "71", status: "Approved", vendor: "Med Props India", cat: "Electronics", priority: "Medium", dept: "Art" },
  { item: "Villain throne (custom)", scenes: "41, 89", status: "Pending", vendor: "Custom Carpentry", cat: "Furniture", priority: "High", dept: "Art" },
  { item: "Helicopter (toy replica, VFX)", scenes: "103", status: "Procurement Required", vendor: "VFX Studio Mumbai", cat: "Electronics", priority: "High", dept: "VFX" },
  { item: "River boat (practical)", scenes: "78", status: "Approved", vendor: "Godavari Boats", cat: "Vehicles", priority: "High", dept: "Transport" },
  { item: "Street food stalls (x4)", scenes: "34", status: "Ready", vendor: "Local Build Team", cat: "Set Decoration", priority: "Medium", dept: "Art" },
];

const locations = [
  { name: "Rajahmundry Fish Market", dressing: "Complete", shoot: "Day 31", scene: "34" },
  { name: "Palace Interior (Studio Set)", dressing: "In Progress", shoot: "Day 23", scene: "12" },
  { name: "Wedding Temple (Exterior)", dressing: "Complete", shoot: "Day 27", scene: "55" },
  { name: "Hospital Ward (Set Build)", dressing: "In Progress", shoot: "Day 29", scene: "71" },
  { name: "River Ghat (Practical)", dressing: "Pending", shoot: "Day 30", scene: "78" },
];

const construction = [
  { set: "Palace Throne Room", progress: 88, deadline: "Oct 14" },
  { set: "Villain's Hideout Interior", progress: 62, deadline: "Oct 18" },
  { set: "Climax Cliff Facade", progress: 35, deadline: "Oct 22" },
];

const categories = [
  "Weapons",
  "Furniture",
  "Electronics",
  "Vehicles",
  "Documents",
  "Medical",
  "Food",
  "Set Decoration",
  "Wardrobe Accessories"
];

export default function ProductionDesignerView() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const getPropsByCategory = (catName: string) => {
    return propsData.filter(p => p.cat === catName);
  };

  const filteredProps = propsData.filter(p => {
    const matchesSearch = p.item.toLowerCase().includes(searchQuery.toLowerCase()) || p.vendor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || p.status === statusFilter;
    const matchesCategory = !selectedCategory || p.cat === selectedCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 md:p-8 max-w-[1400px] mx-auto space-y-8 bg-background text-foreground"
    >
      <header className="py-6 border-b border-border/50 relative">
        <Link href="/" className="absolute -top-4 text-xs text-muted-foreground flex items-center gap-1 hover:text-primary transition-colors">
          <ArrowLeft className="w-3 h-3" /> Back to Role Switcher
        </Link>
        <h1 className="text-4xl font-display font-bold tracking-tight">Art Department</h1>
        <p className="text-xl text-muted-foreground mt-2">Devara: Part 2 — Production Design</p>
      </header>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Active Props", value: "147", sub: "across all scenes" },
          { label: "Scenes Dressed", value: "34 / 89", sub: "shot scenes" },
          { label: "Construction Sets Active", value: "3 Sets", sub: "tracking build progress" },
        ].map((k, i) => (
          <Card key={i} className="bg-card border-border hover:border-primary/50 transition-colors">
            <CardContent className="p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">{k.label}</p>
              <p className="text-4xl font-display font-bold text-foreground">{k.value}</p>
              <p className="text-xs text-muted-foreground mt-2">{k.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Grid split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Props Management Section (col-span-8) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-2xl font-display font-bold">Props Master Center</h2>
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-muted-foreground absolute ml-3" />
              <Input 
                placeholder="Search props..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9 w-full sm:w-60 bg-card border-border text-xs"
              />
            </div>
          </div>

          {/* Prop Category Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map((cat) => {
              const catProps = getPropsByCategory(cat);
              const readyCount = catProps.filter(p => p.status === "Ready" || p.status === "Approved").length;
              return (
                <div 
                  key={cat}
                  onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                  className={`p-4 rounded-xl border cursor-pointer hover:border-primary/50 transition-all bg-card space-y-3 ${
                    selectedCategory === cat ? "border-primary ring-1 ring-primary/20" : "border-border"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <Folder className="w-5 h-5 text-primary" />
                    <span className="text-[10px] font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{catProps.length} Items</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">{cat}</h4>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{readyCount} of {catProps.length} Ready/Approved</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Expanded Drawer or Panel view */}
          <div className="bg-card border border-border rounded-xl p-5 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-border">
              <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                <Box className="w-4 h-4 text-primary" /> Props List {selectedCategory ? `— ${selectedCategory}` : ""}
              </h3>
              {selectedCategory && (
                <button 
                  onClick={() => setSelectedCategory(null)}
                  className="text-xs text-primary font-bold hover:underline flex items-center gap-1"
                >
                  Clear Category Filter <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredProps.map((p, idx) => (
                <div key={idx} className="p-4 bg-background border border-border rounded-xl space-y-3 hover:border-primary/30 transition-all flex flex-col justify-between">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h4 className="font-bold text-sm text-foreground">{p.item}</h4>
                      <p className="text-[10px] text-muted-foreground mt-0.5">Assigned to: {p.dept} Dept</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      p.status === "Ready" || p.status === "Approved" ? "bg-success/20 text-success" :
                      p.status === "Procurement Required" ? "bg-destructive/20 text-destructive" :
                      "bg-primary/20 text-primary"
                    }`}>{p.status}</span>
                  </div>

                  <div className="flex justify-between items-center text-[10px] border-t border-border pt-2.5 mt-2">
                    <span className="text-muted-foreground font-medium">Scene Count: <strong className="text-foreground">{p.scenes}</strong></span>
                    <span className={`font-bold ${p.priority === "High" ? "text-destructive" : "text-muted-foreground"}`}>{p.priority} Priority</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Locations and Sets (col-span-4) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="space-y-3">
            <h2 className="text-xl font-display font-bold">Location Set Dressing</h2>
            <div className="space-y-2">
              {locations.map((l, i) => (
                <div key={i} className="bg-card border border-border rounded-lg p-3">
                  <div className="flex justify-between items-start mb-1">
                    <p className="font-medium text-sm text-foreground">{l.name}</p>
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                      l.dressing === "Complete" ? "bg-success/20 text-success" :
                      "bg-primary/20 text-primary"
                    }`}>{l.dressing}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Shoot Day {l.shoot} — Scene {l.scene}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-display font-bold">Construction Status</h2>
            <div className="space-y-3">
              {construction.map((c, i) => (
                <div key={i} className="bg-card border border-border rounded-lg p-4">
                  <div className="flex justify-between items-baseline mb-2">
                    <p className="font-medium text-sm text-foreground">{c.set}</p>
                    <span className="text-xs text-muted-foreground">Due {c.deadline}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Progress value={c.progress} className="flex-1 h-2 bg-muted-foreground/20" />
                    <span className="text-sm font-bold font-display text-foreground">{c.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
