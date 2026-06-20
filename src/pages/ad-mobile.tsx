import { Mic, AlertCircle, RefreshCw, FileText } from "lucide-react";

export default function ADMobileView() {
  return (
    <div className="h-full flex items-center justify-center bg-background/50 p-4">
      {/* Phone Simulator Frame */}
      <div className="w-[390px] h-[844px] bg-black rounded-[3rem] border-[8px] border-[#222] overflow-hidden relative shadow-2xl flex flex-col ring-1 ring-white/10">
        
        {/* Notch */}
        <div className="absolute top-0 inset-x-0 h-7 flex justify-center z-50">
          <div className="w-32 h-full bg-[#222] rounded-b-3xl"></div>
        </div>

        {/* Status Bar fake */}
        <div className="h-12 bg-card border-b border-border flex items-end justify-between px-6 pb-2 text-[10px] font-bold">
          <span>9:41</span>
          <div className="flex gap-1 items-center text-primary">
            <span>5G</span>
            <span>100%</span>
          </div>
        </div>

        {/* App Content */}
        <div className="flex-1 bg-background overflow-y-auto pb-20">
          <header className="p-4 pb-2">
            <h1 className="text-2xl font-display font-bold text-primary">Day 23</h1>
            <p className="text-sm text-muted-foreground font-medium">On Set • Palace Interior</p>
          </header>

          <div className="px-4 py-2 space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Today's Scenes</h2>
                        <div className="bg-card border-l-4 border-primary rounded-r p-3 shadow-sm">
              <div className="flex justify-between items-start mb-1">
                <span className="font-display font-bold text-lg text-foreground">Sc 12</span>
                <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded font-bold uppercase">Now Shooting</span>
              </div>
              <p className="text-sm font-medium mb-3 text-foreground/80">Palace Interior</p>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-muted-foreground">
                  <span>NTR</span> <span className="text-success font-bold">✓ On Set</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Saif</span> <span className="text-primary font-bold">↻ In Makeup (10m)</span>
                </div>
              </div>
            </div>

            <div className="bg-card border-l-4 border-border rounded-r p-3 opacity-60">
              <div className="flex justify-between items-start mb-1">
                <span className="font-display font-bold text-lg text-foreground">Sc 23</span>
                <span className="text-[10px] bg-muted px-2 py-0.5 rounded font-bold uppercase text-muted-foreground">Up Next</span>
              </div>
              <p className="text-sm font-medium text-foreground/70">Flashback Village</p>
            </div>
          </div>

          <div className="px-4 mt-6">
            <div className="grid grid-cols-2 gap-2">
              <button className="bg-card border border-border p-3 rounded-lg flex flex-col items-center justify-center gap-2 hover:bg-muted active:bg-muted/50 transition-colors text-foreground">
                <Mic className="w-5 h-5 text-primary" />
                <span className="text-xs font-semibold">Voice Note</span>
              </button>
              <button className="bg-destructive/10 border border-destructive/20 p-3 rounded-lg flex flex-col items-center justify-center gap-2 hover:bg-destructive/20 active:bg-destructive/30 transition-colors">
                <AlertCircle className="w-5 h-5 text-destructive" />
                <span className="text-xs font-semibold text-destructive">Flag Issue</span>
              </button>
              <button className="bg-card border border-border p-3 rounded-lg flex flex-col items-center justify-center gap-2 hover:bg-muted active:bg-muted/50 transition-colors text-foreground">
                <RefreshCw className="w-5 h-5 text-primary" />
                <span className="text-xs font-semibold">Update Status</span>
              </button>
              <button className="bg-card border border-border p-3 rounded-lg flex flex-col items-center justify-center gap-2 hover:bg-muted active:bg-muted/50 transition-colors text-foreground">
                <FileText className="w-5 h-5 text-muted-foreground" />
                <span className="text-xs font-semibold">Call Sheet</span>
              </button>
            </div>
          </div>

          <div className="px-4 mt-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Open Issues (3)</h2>
            <div className="space-y-2">
              <div className="bg-destructive/10 border border-destructive/20 p-2 rounded text-xs flex gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-destructive mt-1 shrink-0" />
                <span className="text-destructive font-medium">Generator 2 making noise, sound dept complaining.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Nav */}
        <div className="absolute bottom-0 inset-x-0 h-20 bg-card border-t border-border flex justify-around items-center px-4 pb-4">
          <div className="flex flex-col items-center text-primary">
            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mb-1"><AlertCircle className="w-4 h-4" /></div>
            <span className="text-[10px] font-bold">Today</span>
          </div>
          <div className="flex flex-col items-center text-muted-foreground">
            <div className="w-6 h-6 flex items-center justify-center mb-1"><FileText className="w-4 h-4" /></div>
            <span className="text-[10px] font-medium">Scenes</span>
          </div>
          <div className="flex flex-col items-center text-muted-foreground">
            <div className="w-6 h-6 flex items-center justify-center mb-1"><AlertCircle className="w-4 h-4" /></div>
            <span className="text-[10px] font-medium">Issues</span>
          </div>
        </div>

        {/* Home Indicator */}
        <div className="absolute bottom-1 inset-x-0 h-4 flex justify-center items-center z-50">
          <div className="w-32 h-1 bg-white/20 rounded-full"></div>
        </div>

      </div>
    </div>
  );
}
