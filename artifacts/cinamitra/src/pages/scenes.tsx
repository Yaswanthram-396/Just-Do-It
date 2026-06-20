import { useState } from "react";
import { Link } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, LayoutGrid, List, Columns3, AlignLeft, Users, Shirt, Monitor } from "lucide-react";
import { motion } from "framer-motion";
import { StatusBadge } from "@/components/patterns/StatusBadge";
import { ResponsiveTable, type ResponsiveTableColumn } from "@/components/patterns/ResponsiveTable";

interface Scene {
  id: number;
  title: string;
  ext: string;
  time: string;
  loc: string;
  cast: number;
  status: "Draft" | "Ready" | "Scheduled" | "Completed";
  pages: string;
  highlight?: boolean;
}

const SCENES: Scene[] = [
  { id: 12, title: "Palace Interior", ext: "INT", time: "DAY", loc: "Palace", cast: 3, status: "Scheduled", pages: "1½" },
  { id: 23, title: "Flashback Village", ext: "EXT", time: "DAY", loc: "Village", cast: 6, status: "Ready", pages: "2" },
  { id: 34, title: "Rajahmundry Market", ext: "EXT", time: "DAY", loc: "Market", cast: 8, status: "Scheduled", pages: "2⅛", highlight: true },
  { id: 41, title: "Confrontation", ext: "INT", time: "NIGHT", loc: "Hideout", cast: 4, status: "Draft", pages: "3" },
  { id: 55, title: "Wedding Sequence", ext: "EXT", time: "DAY", loc: "Temple", cast: 12, status: "Ready", pages: "4" },
  { id: 67, title: "Chase Scene", ext: "EXT", time: "DAY", loc: "Streets", cast: 6, status: "Ready", pages: "1¾" },
  { id: 71, title: "Hospital", ext: "INT", time: "NIGHT", loc: "Hospital", cast: 3, status: "Completed", pages: "1" },
  { id: 78, title: "Boat Fight", ext: "EXT", time: "DAY", loc: "River", cast: 5, status: "Scheduled", pages: "2½" },
  { id: 89, title: "Final Reveal", ext: "INT", time: "NIGHT", loc: "Palace", cast: 4, status: "Draft", pages: "3" },
  { id: 94, title: "Song Sequence", ext: "EXT", time: "DAY", loc: "Beach", cast: 20, status: "Draft", pages: "1" },
  { id: 103, title: "Climax", ext: "EXT", time: "DAY", loc: "Cliff", cast: 8, status: "Draft", pages: "5" },
  { id: 120, title: "Epilogue", ext: "INT", time: "DAY", loc: "Village", cast: 2, status: "Draft", pages: "1" },
];

const statusTone = { Draft: "neutral", Ready: "info", Scheduled: "primary", Completed: "success" } as const;

const sceneColumns: ResponsiveTableColumn<Scene>[] = [
  { key: "id", header: "Scene", primary: true, render: s => <Link href="/scenes/34" className="font-display font-bold text-primary hover:underline">{s.id}</Link> },
  { key: "title", header: "Title", render: s => <span className="font-medium">{s.title}</span> },
  { key: "loc", header: "Location", render: s => <span className="text-muted-foreground">{s.loc}</span> },
  {
    key: "type", header: "Type",
    render: s => (
      <div className="flex gap-1">
        <span className="bg-muted text-[10px] px-1 rounded">{s.ext}</span>
        <span className="bg-muted text-[10px] px-1 rounded">{s.time}</span>
      </div>
    ),
  },
  { key: "cast", header: "Cast", render: s => <span className="text-muted-foreground">{s.cast}</span> },
  { key: "pages", header: "Pages", render: s => <span className="text-muted-foreground">{s.pages}</span> },
  { key: "status", header: "Status", render: s => <StatusBadge tone={statusTone[s.status]}>{s.status}</StatusBadge> },
];

export default function Scenes() {
  const [view, setView] = useState("grid");

  return (
    <div className="p-6 md:p-8 max-w-[1600px] mx-auto h-full flex flex-col">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h1 className="text-3xl font-display font-bold">Scene Explorer</h1>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-muted-foreground" />
            <Input placeholder="Search scenes..." className="pl-9 h-9 bg-card border-border" />
          </div>
          
          <div className="flex items-center bg-card border border-border rounded-md p-1">
            <button onClick={() => setView("grid")} className={`p-1.5 rounded ${view === "grid" ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground"}`}><LayoutGrid className="w-4 h-4" /></button>
            <button onClick={() => setView("list")} className={`p-1.5 rounded ${view === "list" ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground"}`}><List className="w-4 h-4" /></button>
            <button className="p-1.5 rounded text-muted-foreground hover:text-foreground"><Columns3 className="w-4 h-4" /></button>
            <button className="p-1.5 rounded text-muted-foreground hover:text-foreground"><AlignLeft className="w-4 h-4" /></button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <Badge variant="outline" className="border-border hover:border-primary cursor-pointer text-xs py-1">Location: All</Badge>
        <Badge variant="outline" className="border-border hover:border-primary cursor-pointer text-xs py-1">Time: All</Badge>
        <Badge variant="outline" className="border-border hover:border-primary cursor-pointer text-xs py-1">Status: All</Badge>
        <Badge variant="outline" className="border-border hover:border-primary cursor-pointer text-xs py-1">Cast: All</Badge>
      </div>

      {view === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-12">
          {SCENES.map((scene, i) => (
            <motion.div
              key={scene.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: i * 0.05 }}
            >
              <Link href={`/scenes/34`}>
                <div className={`group bg-card border ${scene.highlight ? 'border-primary/50 bg-primary/5 shadow-[0_0_15px_rgba(212,168,67,0.1)]' : 'border-border'} rounded-lg p-5 hover:border-primary transition-all cursor-pointer h-full flex flex-col relative overflow-hidden`}>
                  
                  {scene.highlight && (
                    <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[9px] font-bold px-2 py-0.5 rounded-bl-lg uppercase tracking-wider">
                      Demo
                    </div>
                  )}

                  <div className="flex justify-between items-start mb-4">
                    <span className="text-4xl font-display font-bold text-primary/80 group-hover:text-primary transition-colors">{scene.id}</span>
                    <StatusBadge tone={statusTone[scene.status]}>{scene.status}</StatusBadge>
                  </div>
                  
                  <h3 className="text-lg font-bold mb-2 leading-tight">{scene.title}</h3>
                  
                  <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-4">
                    <span className="bg-muted px-1.5 py-0.5 rounded">{scene.ext}</span>
                    <span className="bg-muted px-1.5 py-0.5 rounded">{scene.time}</span>
                    <span>•</span>
                    <span className="truncate">{scene.loc}</span>
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-border/50">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <div className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /><span className="text-xs">{scene.cast}</span></div>
                      <div className="flex items-center gap-1"><Shirt className="w-3.5 h-3.5" /><span className="text-xs">3</span></div>
                      <div className="flex items-center gap-1"><Monitor className="w-3.5 h-3.5" /><span className="text-xs">2</span></div>
                    </div>
                    <span className="text-xs font-medium">{scene.pages} pgs</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      ) : (
        <ResponsiveTable columns={sceneColumns} rows={SCENES} rowKey={s => s.id} />
      )}
    </div>
  );
}
