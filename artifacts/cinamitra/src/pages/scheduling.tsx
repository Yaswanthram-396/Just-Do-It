import { Card, CardContent } from "@/components/ui/card";
import { CloudRain, Sun, Cloud, AlertTriangle, GripVertical } from "lucide-react";

export default function Scheduling() {
  const days: { day: number; date: string; loc: string; weather: string; scenes: { id: number; t: string; conflict?: boolean }[] }[] = [
    { day: 23, date: "Oct 12", loc: "Palace", weather: "sun", scenes: [{ id: 12, t: "Palace Interior" }] },
    { day: 24, date: "Oct 13", loc: "Village", weather: "cloud", scenes: [{ id: 23, t: "Flashback Village" }] },
    { day: 25, date: "Oct 14", loc: "Hideout", weather: "sun", scenes: [{ id: 41, t: "Confrontation" }] },
    { day: 26, date: "Oct 15", loc: "Hideout", weather: "sun", scenes: [{ id: 89, t: "Final Reveal" }] },
    { day: 27, date: "Oct 16", loc: "Temple", weather: "cloud", scenes: [{ id: 55, t: "Wedding Seq." }] },
    { day: 28, date: "Oct 18", loc: "Streets", weather: "sun", scenes: [{ id: 67, t: "Chase Scene" }] },
    { day: 29, date: "Oct 19", loc: "Hospital", weather: "rain", scenes: [{ id: 71, t: "Hospital" }] },
    { day: 30, date: "Oct 20", loc: "River", weather: "sun", scenes: [{ id: 78, t: "Boat Fight" }] },
    { day: 31, date: "Oct 21", loc: "Market", weather: "sun", scenes: [{ id: 34, t: "Market Chase", conflict: true }, { id: 35, t: "Market Aftermath", conflict: true }] },
    { day: 32, date: "Oct 22", loc: "Market", weather: "sun", scenes: [{ id: 36, t: "Market Escape" }] },
    { day: 33, date: "Oct 23", loc: "Cliff", weather: "rain", scenes: [{ id: 103, t: "Climax Pt 1", conflict: true }] },
    { day: 34, date: "Oct 24", loc: "Cliff", weather: "cloud", scenes: [{ id: 104, t: "Climax Pt 2" }] },
  ];

  return (
    <div className="p-6 md:p-8 h-full flex flex-col">
      <div className="mb-6">
        <h1 className="text-3xl font-display font-bold mb-2">Scheduling Command Center</h1>
        <p className="text-muted-foreground">Strip board & resource allocation.</p>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">

        {/* Strip Board */}
        <div className="flex-1 bg-card border border-border rounded-lg flex flex-col overflow-hidden min-h-[300px]">
          <div className="flex-1 overflow-auto p-4">
            <div className="inline-flex flex-col gap-2 min-w-max">
              {days.map((d, i) => (
                <div key={i} className="flex gap-4 items-stretch group">
                  <div className="w-8 flex items-center justify-center text-muted-foreground/30 group-hover:text-muted-foreground cursor-grab">
                    <GripVertical className="w-4 h-4" />
                  </div>
                  
                  <div className="w-32 shrink-0 bg-muted/30 border border-border rounded-md p-2 flex flex-col justify-center relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/20"></div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-display font-bold text-lg leading-none">Day {d.day}</span>
                      {d.weather === 'sun' && <Sun className="w-3.5 h-3.5 text-yellow-500" />}
                      {d.weather === 'cloud' && <Cloud className="w-3.5 h-3.5 text-gray-400" />}
                      {d.weather === 'rain' && <CloudRain className="w-3.5 h-3.5 text-blue-400" />}
                    </div>
                    <span className="text-xs text-muted-foreground font-medium">{d.date}</span>
                    <span className="text-[10px] uppercase tracking-wider mt-1 truncate">{d.loc}</span>
                  </div>

                  <div className="flex gap-2 flex-1 items-center">
                    {d.scenes.map((s, j) => (
                      <div key={j} className={`w-48 shrink-0 bg-background border ${s.conflict ? 'border-destructive/50 shadow-[0_0_10px_rgba(255,0,0,0.1)]' : 'border-border'} rounded-md p-3 relative hover:border-primary cursor-pointer transition-colors`}>
                        {s.conflict && <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-destructive animate-pulse" />}
                        <div className="font-display font-bold text-primary mb-1">{s.id}</div>
                        <div className="text-sm font-medium truncate">{s.t}</div>
                      </div>
                    ))}
                    
                    <div className="w-48 shrink-0 border border-dashed border-border/50 rounded-md p-3 flex items-center justify-center text-muted-foreground/50 hover:text-muted-foreground hover:border-border cursor-pointer transition-colors">
                      <span className="text-xs font-semibold">+ Drop Scene</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Conflict Panel */}
        <div className="w-full lg:w-80 shrink-0 flex flex-col gap-4">
          <Card className="bg-destructive/5 border-destructive/20">
            <CardContent className="p-4">
              <h3 className="font-display font-bold text-destructive flex items-center gap-2 mb-4">
                <AlertTriangle className="w-4 h-4" /> Schedule Conflicts
              </h3>
              
              <div className="space-y-4">
                <div className="bg-background border border-border p-3 rounded text-sm">
                  <p className="font-bold mb-1">Location Conflict</p>
                  <p className="text-muted-foreground text-xs">Scenes 34 & 35 both scheduled for Rajahmundry Market on Day 31. Permit only covers Scene 34 area.</p>
                </div>
                
                <div className="bg-background border border-border p-3 rounded text-sm">
                  <p className="font-bold mb-1">Actor Availability</p>
                  <p className="text-muted-foreground text-xs">NTR unavailable Day 31 morning. Need to push Scene 34 to post-lunch.</p>
                </div>

                <div className="bg-background border border-border p-3 rounded text-sm">
                  <p className="font-bold mb-1">Weather Risk</p>
                  <p className="text-muted-foreground text-xs">40% rain probability on Day 33 (Cliff sequence). Need cover set.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
