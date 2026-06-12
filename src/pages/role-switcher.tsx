import { useRole } from "@/components/layout/RoleContext";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  UserCircle, Clapperboard, LayoutDashboard, Radio, Calculator,
  ScrollText, Banknote, Truck, Camera, Layers, Shirt, Scissors, ArrowRight
} from "lucide-react";

const roles = [
  {
    id: "Producer",
    title: "Producer",
    description: "Executive overview. Budget health, schedule status, and high-level approvals.",
    icon: UserCircle,
    path: "/producer"
  },
  {
    id: "Director",
    title: "Director",
    description: "Creative control. Scene status, revision requests, mood references, and continuity alerts.",
    icon: Clapperboard,
    path: "/director"
  },
  {
    id: "Line Producer",
    title: "Line Producer",
    description: "Operational command. Breakdown, scheduling, budget, vendors, and resource allocation.",
    icon: LayoutDashboard,
    path: "/line-producer"
  },
  {
    id: "AD",
    title: "Assistant Director",
    description: "Set management. Today's call times, actor arrivals, and on-set issue tracking.",
    icon: Radio,
    path: "/ad"
  },
  {
    id: "Accountant",
    title: "Accountant",
    description: "Financial operations. Invoice queue, TDS, GST, and budget vs actual tracking.",
    icon: Calculator,
    path: "/accountant"
  },
  {
    id: "Continuity",
    title: "Continuity",
    description: "Scene continuity tracking, character timelines, and flagged inconsistencies.",
    icon: ScrollText,
    path: "/continuity"
  },
  {
    id: "Cashier",
    title: "Cashier",
    description: "Cash management, daily expenses, receipt uploads, and end-of-day reconciliation.",
    icon: Banknote,
    path: "/cashier"
  },
  {
    id: "Production Manager",
    title: "Production Manager",
    description: "Vehicles, drivers, logistics, accommodation, equipment, and daily crew deployment.",
    icon: Truck,
    path: "/production-manager"
  },
  {
    id: "Cinematographer",
    title: "Cinematographer",
    description: "Camera assignments, lighting plans, equipment schedule, and director visual notes.",
    icon: Camera,
    path: "/cinematographer"
  },
  {
    id: "Production Designer",
    title: "Production Designer",
    description: "Props master list, location set status, and art department construction progress.",
    icon: Layers,
    path: "/production-designer"
  },
  {
    id: "Costume Designer",
    title: "Costume Designer",
    description: "Character wardrobes, fitting schedules, costume inventory, and continuity alerts.",
    icon: Shirt,
    path: "/costume-designer"
  },
  {
    id: "Editor",
    title: "Editor",
    description: "Scene material log, VFX flags, takes, and continuity notes from set.",
    icon: Scissors,
    path: "/editor"
  },
];

export default function RoleSwitcher() {
  const { setRole } = useRole();
  const [, setLocation] = useLocation();

  const handleSelectRole = (id: string, path: string) => {
    setRole(id as Parameters<typeof setRole>[0]);
    setLocation(path);
  };

  return (
    <div className="min-h-[100dvh] bg-background flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <div className="container max-w-7xl mx-auto px-6 py-12 flex flex-col flex-1 relative z-10">
        <header className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-primary flex items-center justify-center font-display font-bold text-primary-foreground text-xl">
              C
            </div>
            <div>
              <h1 className="text-xl font-display font-bold tracking-tight">Cinamitra</h1>
              <p className="text-xs text-muted-foreground uppercase tracking-widest">Workspace</p>
            </div>
          </div>
          <Button
            variant="outline"
            className="border-primary/30 hover:border-primary/60 hover:bg-primary/5 transition-colors gap-2"
            onClick={() => {
              setRole("Line Producer");
              setLocation("/dashboard");
            }}
          >
            View Full Production <ArrowRight className="w-4 h-4" />
          </Button>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 tracking-tight">Choose your lens.</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Welcome to Devara: Part 2. Every role sees the same production through a different lens.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {roles.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Card
                data-testid={`card-role-${r.id.toLowerCase().replace(/\s+/g, "-")}`}
                className="bg-card/60 backdrop-blur border-border/60 hover:border-primary/50 hover:bg-card transition-all cursor-pointer group h-full flex flex-col hover-elevate"
                onClick={() => handleSelectRole(r.id, r.path)}
              >
                <CardHeader className="pb-2 pt-5 px-5">
                  <r.icon className="w-7 h-7 text-primary mb-3 group-hover:scale-110 transition-transform duration-300" />
                  <CardTitle className="font-display text-base">{r.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-between px-5 pb-5">
                  <CardDescription className="text-xs leading-relaxed mb-4">
                    {r.description}
                  </CardDescription>
                  <div className="flex items-center text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-all translate-y-1 group-hover:translate-y-0 duration-300">
                    Enter Workspace <ArrowRight className="w-3 h-3 ml-1.5" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
