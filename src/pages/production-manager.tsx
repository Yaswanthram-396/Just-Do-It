import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, Clock, AlertCircle } from "lucide-react";

const vehicles = [
  { vehicle: "Toyota Innova — MH02 AB1234", driver: "Ravi Kumar", assignment: "NTR Jr. pickup", status: "Active" },
  { vehicle: "Tempo Traveller — AP09 CD5678", driver: "Suresh P.", assignment: "Crew Transport — Set A", status: "Active" },
  { vehicle: "Ambulance — AP05 EF9012", driver: "Dr. Crew Med", assignment: "On-set standby", status: "Active" },
  { vehicle: "Bolero — AP28 GH3456", driver: "Mahesh D.", assignment: "Props transport", status: "Available" },
  { vehicle: "Container Truck — MH04 IJ7890", driver: "Pending assignment", assignment: "Equipment Day 31", status: "Available" },
  { vehicle: "Toyota Fortuner — AP07 KL2345", driver: "Raju N.", assignment: "Director transport", status: "Active" },
  { vehicle: "Bike — AP34 MN6789", driver: "Vijay S.", assignment: "Location recon", status: "Active" },
  { vehicle: "Van — TS09 OP1234", driver: "Maintenance", assignment: "In service — brake check", status: "Maintenance" },
];

const logistics = [
  { time: "06:00 AM", desc: "Saif Ali Khan — Airport to Hotel Novotel", driver: "Ravi Kumar", status: "Completed" },
  { time: "07:30 AM", desc: "Equipment van — Hotel to Location (Market)", driver: "Suresh P.", status: "Completed" },
  { time: "08:30 AM", desc: "NTR Jr. — Hotel to Set", driver: "Raju N.", status: "Completed" },
  { time: "09:00 AM", desc: "Costume team — Hotel to Base Camp", driver: "Vijay S.", status: "Completed" },
  { time: "12:00 PM", desc: "Catering truck — Kitchen to Set", driver: "Mahesh D.", status: "Active" },
  { time: "02:30 PM", desc: "Art dept supplies — Vendor to Set", driver: "Pending", status: "Pending" },
  { time: "05:00 PM", desc: "NTR Jr. wrap — Set to Hotel", driver: "Raju N.", status: "Pending" },
  { time: "07:00 PM", desc: "Equipment breakdown — Set to Warehouse", driver: "Suresh P.", status: "Pending" },
];

const resources = [
  { label: "Equipment Confirmed", value: "92%", total: "47 / 51 items", ok: true },
  { label: "Accommodation", value: "90%", total: "47 / 52 crew booked", ok: true },
  { label: "Catering", value: "Confirmed", total: "45 crew, 2 meals/day", ok: true },
  { label: "Location Permits", value: "2 Pending", total: "Rajahmundry Market + River Ghat", ok: false },
];

export default function ProductionManagerView() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 md:p-8 max-w-[1400px] mx-auto space-y-8 bg-background text-foreground min-h-screen"
    >
      <header className="py-6 border-b border-border/50 relative">
        <Link href="/" className="absolute -top-4 text-xs text-muted-foreground flex items-center gap-1 hover:text-primary transition-colors">
          <ArrowLeft className="w-3 h-3" /> Back to Role Switcher
        </Link>
        <h1 className="text-4xl font-display font-bold tracking-tight">Logistics Command</h1>
        <p className="text-xl text-muted-foreground mt-2">Devara: Part 2 — Day 23</p>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Vehicles Active", value: "14", sub: "on deployment today" },
          { label: "Drivers Available", value: "9 / 14", sub: "5 assigned, 9 free" },
          { label: "Pending Pickups", value: "6", sub: "scheduled this afternoon" },
          { label: "Accommodation", value: "47 / 52", sub: "crew confirmed" },
        ].map((k, i) => (
          <Card key={i} className="bg-card border-border hover:border-primary/50 transition-colors">
            <CardContent className="p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">{k.label}</p>
              <p className="text-3xl font-display font-bold text-foreground">{k.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{k.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Vehicles */}
        <div className="space-y-3">
          <h2 className="text-xl font-display font-bold">Vehicle Fleet</h2>
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            {/* Desktop Table View */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-background border-b border-border text-left">
                  <tr>
                    <th className="p-3 text-muted-foreground font-medium">Vehicle</th>
                    <th className="p-3 text-muted-foreground font-medium">Assignment</th>
                    <th className="p-3 text-muted-foreground font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-foreground">
                  {vehicles.map((v, i) => (
                    <tr key={i} className="hover:bg-muted/30 transition-colors">
                      <td className="p-3">
                        <p className="font-medium text-xs">{v.vehicle}</p>
                        <p className="text-xs text-muted-foreground">{v.driver}</p>
                      </td>
                      <td className="p-3 text-xs text-muted-foreground">{v.assignment}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                          v.status === "Active" ? "bg-success/20 text-success" :
                          v.status === "Maintenance" ? "bg-destructive/20 text-destructive" :
                          "bg-muted text-muted-foreground"
                        }`}>{v.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Stacked Card View */}
            <div className="block sm:hidden divide-y divide-border">
              {vehicles.map((v, i) => (
                <div key={i} className="p-4 space-y-2 bg-card text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-foreground">{v.vehicle}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      v.status === "Active" ? "bg-success/20 text-success" :
                      v.status === "Maintenance" ? "bg-destructive/20 text-destructive" :
                      "bg-muted text-muted-foreground"
                    }`}>{v.status}</span>
                  </div>
                  <p className="text-muted-foreground">Driver: {v.driver}</p>
                  <p className="text-muted-foreground">Assignment: {v.assignment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Logistics */}
        <div className="space-y-3">
          <h2 className="text-xl font-display font-bold">Today's Logistics</h2>
          <div className="space-y-2">
            {logistics.map((l, i) => (
              <div key={i} className="flex gap-3 bg-card border border-border rounded-lg p-3 items-start">
                <div className="shrink-0 text-right w-16">
                  <span className="text-xs font-mono text-muted-foreground">{l.time}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{l.desc}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{l.driver}</p>
                </div>
                <div className="shrink-0">
                  {l.status === "Completed" && <CheckCircle className="w-4 h-4 text-success" />}
                  {l.status === "Active" && <Clock className="w-4 h-4 text-primary animate-pulse" />}
                  {l.status === "Pending" && <Clock className="w-4 h-4 text-muted-foreground" />}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resource Status */}
        <div className="space-y-3">
          <h2 className="text-xl font-display font-bold">Resource Status</h2>
          <div className="space-y-3">
            {resources.map((r, i) => (
              <Card key={i} className={`border ${r.ok ? "bg-card border-border" : "bg-destructive/10 border-destructive/20"}`}>
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm text-foreground">{r.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{r.total}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`font-bold font-display ${r.ok ? "text-foreground" : "text-destructive"}`}>{r.value}</span>
                    {r.ok ? <CheckCircle className="w-4 h-4 text-success" /> : <AlertCircle className="w-4 h-4 text-destructive" />}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  );
}
