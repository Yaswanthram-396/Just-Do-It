export default function LineProducerView() {
  return (
    <div className="p-4 h-full flex flex-col gap-4 bg-background">
      <header className="bg-card border border-border p-3 rounded flex justify-between items-center text-sm">
        <div className="flex gap-6">
          <span className="font-bold text-primary font-display tracking-wider">L/P TERMINAL</span>
          <span className="text-muted-foreground">Active Shoot Day: <strong className="text-foreground">23</strong></span>
          <span className="text-muted-foreground">Next Loc Move: <strong className="text-foreground">Day 29 (Hospital)</strong></span>
        </div>
        <div className="flex gap-4 font-mono text-xs">
          <span className="text-green-400">BGT: -2%</span>
          <span className="text-yellow-400">SCH: ON</span>
        </div>
      </header>

      <div className="flex-1 grid grid-cols-12 gap-4 min-h-0">
        <div className="col-span-3 bg-card border border-border rounded overflow-hidden flex flex-col">
          <div className="bg-muted/50 p-2 border-b border-border text-xs font-bold uppercase">Breakdown Completeness</div>
          <div className="p-2 space-y-2 overflow-y-auto">
            {[34, 41, 67, 71, 78].map(s => (
              <div key={s} className="border border-border/50 p-2 rounded bg-background">
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span>Sc {s}</span>
                  <span className="text-muted-foreground">85%</span>
                </div>
                <div className="grid grid-cols-4 gap-1 h-1.5 w-full">
                  <div className="bg-green-500 rounded-full" />
                  <div className="bg-green-500 rounded-full" />
                  <div className="bg-yellow-500 rounded-full" />
                  <div className="bg-muted rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-6 bg-card border border-border rounded overflow-hidden flex flex-col">
          <div className="bg-muted/50 p-2 border-b border-border text-xs font-bold uppercase text-yellow-500">Resource Conflicts</div>
          <div className="p-4 flex-1 flex items-center justify-center">
            <p className="text-muted-foreground font-mono text-sm">[ Complex Resource Allocation Matrix ]</p>
          </div>
        </div>

        <div className="col-span-3 flex flex-col gap-4">
          <div className="flex-1 bg-card border border-border rounded overflow-hidden flex flex-col">
            <div className="bg-muted/50 p-2 border-b border-border text-xs font-bold uppercase">Vendor Status</div>
            <div className="p-2 space-y-2 text-xs">
              <div className="flex justify-between items-center p-2 bg-background border border-border rounded">
                <span>Catering (Sri Sai)</span>
                <span className="text-green-400">Active</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-background border border-border rounded">
                <span>Generators</span>
                <span className="text-yellow-400">Pending Refuel</span>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-card border border-border rounded overflow-hidden flex flex-col">
            <div className="bg-muted/50 p-2 border-b border-border text-xs font-bold uppercase">Live Activity</div>
            <div className="p-2 space-y-2 overflow-y-auto">
              {/* Feed items */}
              <div className="text-[10px] border-b border-border pb-1">
                <span className="text-blue-400">AD:</span> Set ready for Sc 23. Waiting on cast.
              </div>
              <div className="text-[10px] border-b border-border pb-1">
                <span className="text-orange-400">PROD:</span> Generator 2 refueled.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
