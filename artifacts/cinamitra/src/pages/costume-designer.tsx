import { Link } from "wouter";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { PageHeader } from "@/components/patterns/PageHeader";
import { KpiGrid } from "@/components/patterns/KpiGrid";
import { StatusBadge } from "@/components/patterns/StatusBadge";
import { DetailCard } from "@/components/patterns/DetailCard";
import { ResponsiveTable, type ResponsiveTableColumn } from "@/components/patterns/ResponsiveTable";

interface Wardrobe {
  char: string;
  actor: string;
  scenes: string;
  costume: string;
  continuity: "Locked" | "Alert" | "In Review";
  fittings: number;
}

const wardrobes: Wardrobe[] = [
  { char: "NTR Jr.", actor: "N.T. Rama Rao Jr.", scenes: "12, 23, 34, 41, 55, 67, 78, 89, 103", costume: "White kurta + gold trim (hero look)", continuity: "Locked", fittings: 3 },
  { char: "Saif Ali Khan", actor: "Saif Ali Khan", scenes: "23, 41, 50, 55, 67, 103", costume: "Dark wool coat + villain accessories", continuity: "Alert", fittings: 2 },
  { char: "Female Lead", actor: "Janhvi Kapoor", scenes: "12, 55, 89", costume: "Silk saree — 3 variations", continuity: "Locked", fittings: 4 },
  { char: "Antagonist 2", actor: "Prakash Raj", scenes: "41, 67, 103", costume: "Military-style uniform", continuity: "In Review", fittings: 1 },
  { char: "Village Elder", actor: "Nassar", scenes: "23, 45", costume: "Traditional dhoti + angavastram", continuity: "Locked", fittings: 1 },
  { char: "Palace Guard (x6)", actor: "Stunt Team A", scenes: "12, 41", costume: "Period armor — custom fabricated", continuity: "Locked", fittings: 6 },
  { char: "Wedding Priest", actor: "S.A. Chandrasekhar", scenes: "55", costume: "Traditional panchakacham", continuity: "Locked", fittings: 1 },
  { char: "Market Crowd (x30)", actor: "Extras", scenes: "34, 35", costume: "Period casual — 1920s Telugu town", continuity: "In Review", fittings: 0 },
];

const fittings = [
  { char: "NTR Jr.", actor: "N.T. Rama Rao Jr.", date: "Oct 18", time: "10:00 AM", status: "Confirmed" },
  { char: "Saif Ali Khan", actor: "Saif Ali Khan", date: "Oct 19", time: "02:00 PM", status: "Confirmed" },
  { char: "Female Lead", actor: "Janhvi Kapoor", date: "Oct 20", time: "11:00 AM", status: "Pending" },
  { char: "Antagonist 2", actor: "Prakash Raj", date: "Oct 21", time: "09:00 AM", status: "Confirmed" },
  { char: "Market Extras (sample)", actor: "5 selected extras", date: "Oct 22", time: "03:00 PM", status: "Pending" },
];

const alerts = [
  { scene: "41", note: "NTR costume must exactly match Scene 34 — 2-day gap in shooting", urgent: true },
  { scene: "55", note: "Saif costume revision request — collar detail changed by Director Oct 15", urgent: true },
  { scene: "103", note: "NTR torn-shirt state must match Scene 98 exit — verify tears placement", urgent: false },
];

const continuityTone = { Locked: "success", Alert: "destructive", "In Review": "warning" } as const;

const wardrobeColumns: ResponsiveTableColumn<Wardrobe>[] = [
  {
    key: "char", header: "Character", primary: true,
    render: w => (
      <div>
        <p className="font-medium">{w.char}</p>
        <p className="text-xs text-muted-foreground">{w.actor}</p>
      </div>
    ),
  },
  { key: "scenes", header: "Scenes", render: w => <span className="font-display font-bold text-primary text-xs">{w.scenes}</span> },
  { key: "costume", header: "Key Costume", className: "max-w-[160px]", render: w => <span className="text-xs text-muted-foreground">{w.costume}</span> },
  { key: "continuity", header: "Continuity", render: w => <StatusBadge tone={continuityTone[w.continuity]}>{w.continuity}</StatusBadge> },
  { key: "fittings", header: "Fittings", render: w => <span className="text-sm font-medium">{w.fittings}</span> },
];

export default function CostumeDesignerView() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto space-y-6 sm:space-y-8"
    >
      <PageHeader title="Costume Department" subtitle="Devara: Part 2" />

      <KpiGrid items={[
        { label: "Characters", value: "12", sub: "with costume sheets" },
        { label: "Costume Sets", value: "47", sub: "total variations" },
        { label: "Fittings This Week", value: "8", sub: "5 confirmed, 3 pending" },
      ]} />

      <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
        <div className="md:col-span-2 space-y-3">
          <h2 className="text-lg sm:text-xl font-display font-bold">Character Wardrobe</h2>
          <ResponsiveTable columns={wardrobeColumns} rows={wardrobes} rowKey={w => w.char} />
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <h2 className="text-lg sm:text-xl font-display font-bold">Fitting Schedule</h2>
            <div className="space-y-2">
              {fittings.map((f, i) => (
                <DetailCard
                  key={i}
                  title={f.char}
                  subtitle={f.actor}
                  badge={<StatusBadge tone={f.status === "Confirmed" ? "success" : "warning"}>{f.status}</StatusBadge>}
                >
                  <p className="text-xs text-muted-foreground mt-1">{f.date} at {f.time}</p>
                </DetailCard>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg sm:text-xl font-display font-bold flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              Continuity Alerts
            </h2>
            <div className="space-y-2">
              {alerts.map((a, i) => (
                <DetailCard
                  key={i}
                  urgent={a.urgent}
                  title={<Link href="/scenes/34" className="font-bold font-display text-primary text-sm hover:underline">Scene {a.scene}</Link>}
                >
                  <p className="text-xs text-muted-foreground leading-relaxed">{a.note}</p>
                </DetailCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
