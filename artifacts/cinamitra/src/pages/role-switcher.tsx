import { useRole } from "@/components/layout/RoleContext";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { UserCircle, Clapperboard, LayoutDashboard, Radio, Calculator, ArrowRight } from "lucide-react";

export default function RoleSwitcher() {
  const { setRole } = useRole();
  const [, setLocation] = useLocation();

  const handleSelectRole = (role: any, path: string) => {
    setRole(role);
    setLocation(path);
  };

  const roles = [
    {
      id: "Producer",
      title: "Producer",
      description: "Executive overview. Budget health, overall schedule, and high-level approvals.",
      icon: UserCircle,
      path: "/producer"
    },
    {
      id: "Director",
      title: "Director",
      description: "Creative control. Scene details, storyboard reviews, and cast coordination.",
      icon: Clapperboard,
      path: "/dashboard" // fallback for now
    },
    {
      id: "Line Producer",
      title: "Line Producer",
      description: "On-the-ground ops. Resource allocation, daily schedules, and conflict resolution.",
      icon: LayoutDashboard,
      path: "/line-producer"
    },
    {
      id: "AD",
      title: "Assistant Director",
      description: "Set management. Call sheets, minute-by-minute updates, and cast arrivals.",
      icon: Radio,
      path: "/ad"
    },
    {
      id: "Accountant",
      title: "Accountant",
      description: "Financial tracking. Expense logging, vendor payments, and budget burndown.",
      icon: Calculator,
      path: "/budget" // fallback for now
    }
  ];

  return (
    <div className="min-h-[100dvh] bg-background flex flex-col relative overflow-hidden">
      {/* Cinematic background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <div className="container max-w-6xl mx-auto px-4 py-12 flex flex-col flex-1 relative z-10">
        <header className="flex justify-between items-center mb-16">
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

        <div className="flex-1 flex flex-col justify-center max-w-4xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 tracking-tight">Choose your lens.</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Welcome to Devara: Part 2. Select your role to enter the production command center.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roles.map((r, i) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card 
                  className="bg-card/40 backdrop-blur border-border/50 hover:border-primary/50 hover:bg-card/60 transition-all cursor-pointer group h-full flex flex-col hover-elevate"
                  onClick={() => handleSelectRole(r.id, r.path)}
                >
                  <CardHeader>
                    <r.icon className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform duration-300" />
                    <CardTitle className="font-display text-xl">{r.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col justify-between">
                    <CardDescription className="text-sm leading-relaxed mb-6">
                      {r.description}
                    </CardDescription>
                    <div className="flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                      Enter Workspace <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
