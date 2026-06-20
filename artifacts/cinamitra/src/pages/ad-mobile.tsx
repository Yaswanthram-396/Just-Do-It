import { Mic, AlertCircle, RefreshCw, FileText } from "lucide-react";
import { MobileShell } from "@/components/patterns/MobileShell";
import { StatusBadge } from "@/components/patterns/StatusBadge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const callSheetCrew = [
  { dept: "Cast Call", time: "06:00 AM" },
  { dept: "Crew Call", time: "06:30 AM" },
  { dept: "Camera & Lighting Ready", time: "07:30 AM" },
  { dept: "First Shot", time: "08:30 AM" },
  { dept: "Lunch", time: "01:00 PM" },
  { dept: "Wrap (Est.)", time: "08:00 PM" },
];

const callSheetContacts = [
  { name: "Line Producer — Venkat Rao", phone: "+91 98480 11223" },
  { name: "Unit Manager — Srinivas", phone: "+91 90000 44556" },
  { name: "Location Contact — Palace Set", phone: "+91 99888 77665" },
];

const scenes = [
  { sc: "12", location: "Palace Interior", status: "Now Shooting", active: true, cast: [
    { name: "NTR", state: "On Set", ok: true },
    { name: "Saif", state: "In Makeup (10m)", ok: false },
  ]},
  { sc: "23", location: "Flashback Village", status: "Up Next", active: false, cast: [] },
];

const quickActions = [
  { icon: Mic, label: "Voice Note", tone: "default" as const },
  { icon: AlertCircle, label: "Flag Issue", tone: "destructive" as const },
  { icon: RefreshCw, label: "Update Status", tone: "default" as const },
  { icon: FileText, label: "Call Sheet", tone: "default" as const },
];

const issues = [
  "Generator 2 making noise, sound dept complaining.",
];

export default function ADMobileView() {
  return (
    <MobileShell
      bottomNav={
        <>
          <div className="flex flex-col items-center text-primary">
            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mb-1"><AlertCircle className="w-4 h-4" /></div>
            <span className="text-[11px] font-bold">Today</span>
          </div>
          <div className="flex flex-col items-center text-muted-foreground">
            <div className="w-6 h-6 flex items-center justify-center mb-1"><FileText className="w-4 h-4" /></div>
            <span className="text-[11px] font-medium">Scenes</span>
          </div>
          <div className="flex flex-col items-center text-muted-foreground">
            <div className="w-6 h-6 flex items-center justify-center mb-1"><AlertCircle className="w-4 h-4" /></div>
            <span className="text-[11px] font-medium">Issues</span>
          </div>
        </>
      }
    >
      <header>
        <h1 className="text-2xl font-display font-bold text-primary">Day 23</h1>
        <p className="text-sm text-muted-foreground font-medium">On Set &middot; Palace Interior</p>
      </header>

      <section className="space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Today's Scenes</h2>
        {scenes.map(s => (
          <div
            key={s.sc}
            className={`bg-card border-l-4 rounded-r p-3 shadow-sm ${s.active ? "border-primary" : "border-border opacity-60"}`}
          >
            <div className="flex justify-between items-start mb-1 gap-2">
              <span className="font-display font-bold text-lg">Sc {s.sc}</span>
              <StatusBadge tone={s.active ? "info" : "neutral"}>{s.status}</StatusBadge>
            </div>
            <p className="text-sm font-medium mb-3">{s.location}</p>
            {s.cast.length > 0 && (
              <div className="space-y-1 text-xs">
                {s.cast.map(c => (
                  <div key={c.name} className="flex justify-between text-muted-foreground">
                    <span>{c.name}</span>
                    <span className={`font-bold ${c.ok ? "text-green-500" : "text-amber-500"}`}>
                      {c.ok ? "On Set" : c.state}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </section>

      <section>
        <div className="grid grid-cols-2 gap-2">
          {quickActions.map(a => {
            const actionClass = `min-h-[64px] border p-3 rounded-lg flex flex-col items-center justify-center gap-2 transition-colors active:scale-[0.98] w-full ${
              a.tone === "destructive"
                ? "bg-destructive/10 border-destructive/20 hover:bg-destructive/20"
                : "bg-card border-border hover:bg-muted"
            }`;
            const content = (
              <>
                <a.icon className={`w-5 h-5 ${a.tone === "destructive" ? "text-destructive" : "text-primary"}`} />
                <span className={`text-xs font-semibold ${a.tone === "destructive" ? "text-destructive" : ""}`}>{a.label}</span>
              </>
            );

            if (a.label === "Call Sheet") {
              return (
                <Sheet key={a.label}>
                  <SheetTrigger asChild>
                    <button className={actionClass}>{content}</button>
                  </SheetTrigger>
                  <SheetContent side="bottom" className="max-h-[80vh] overflow-y-auto">
                    <SheetHeader>
                      <SheetTitle>Day 23 Call Sheet</SheetTitle>
                    </SheetHeader>
                    <div className="mt-4 space-y-4">
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Schedule</h3>
                        <div className="space-y-1.5">
                          {callSheetCrew.map(c => (
                            <div key={c.dept} className="flex justify-between text-sm border-b border-border/50 pb-1.5">
                              <span className="text-muted-foreground">{c.dept}</span>
                              <span className="font-medium font-display">{c.time}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Location</h3>
                        <p className="text-sm font-medium">Palace Interior, Annapurna Studios, Hyderabad</p>
                      </div>
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Key Contacts</h3>
                        <div className="space-y-1.5">
                          {callSheetContacts.map(c => (
                            <div key={c.name} className="flex justify-between text-sm">
                              <span>{c.name}</span>
                              <span className="text-muted-foreground">{c.phone}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              );
            }

            return (
              <button key={a.label} className={actionClass}>
                {content}
              </button>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Open Issues ({issues.length})</h2>
        <div className="space-y-2">
          {issues.map((issue, i) => (
            <div key={i} className="bg-destructive/10 border border-destructive/20 p-2.5 rounded text-xs flex gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-destructive mt-1 shrink-0" />
              <span className="text-destructive font-medium">{issue}</span>
            </div>
          ))}
        </div>
      </section>
    </MobileShell>
  );
}
