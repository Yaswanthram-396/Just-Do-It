import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { CheckCircle, Clock, AlertCircle } from "lucide-react";
import { PageHeader } from "@/components/patterns/PageHeader";
import { KpiGrid } from "@/components/patterns/KpiGrid";
import { StatusBadge } from "@/components/patterns/StatusBadge";
import { ResponsiveTable, type ResponsiveTableColumn } from "@/components/patterns/ResponsiveTable";

interface Vehicle {
  vehicle: string;
  driver: string;
  assignment: string;
  status: "Active" | "Available" | "Maintenance";
}

const vehicles: Vehicle[] = [
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

const vehicleTone = { Active: "success", Available: "neutral", Maintenance: "destructive" } as const;

const vehicleColumns: ResponsiveTableColumn<Vehicle>[] = [
  {
    key: "vehicle", header: "Vehicle", primary: true,
    render: v => (
      <div>
        <p className="font-medium text-xs">{v.vehicle}</p>
        <p className="text-xs text-muted-foreground">{v.driver}</p>
      </div>
    ),
  },
  { key: "assignment", header: "Assignment", render: v => <span className="text-xs text-muted-foreground">{v.assignment}</span> },
  { key: "status", header: "Status", render: v => <StatusBadge tone={vehicleTone[v.status]}>{v.status}</StatusBadge> },
];

export default function ProductionManagerView() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto space-y-6 sm:space-y-8"
    >
      <PageHeader title="Logistics Command" subtitle="Devara: Part 2 — Day 23" />

      <KpiGrid items={[
        { label: "Vehicles Active", value: "14", sub: "on deployment today" },
        { label: "Drivers Available", value: "9 / 14", sub: "5 assigned, 9 free" },
        { label: "Pending Pickups", value: "6", sub: "scheduled this afternoon" },
        { label: "Accommodation", value: "47 / 52", sub: "crew confirmed" },
      ]} />

      <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
        <div className="space-y-3">
          <h2 className="text-lg sm:text-xl font-display font-bold">Vehicle Fleet</h2>
          <ResponsiveTable columns={vehicleColumns} rows={vehicles} rowKey={v => v.vehicle} />
        </div>

        <div className="space-y-3">
          <h2 className="text-lg sm:text-xl font-display font-bold">Today's Logistics</h2>
          <div className="space-y-2">
            {logistics.map((l, i) => (
              <div key={i} className="flex gap-3 bg-card border border-border rounded-lg p-3 items-start">
                <div className="shrink-0 text-right w-14 sm:w-16">
                  <span className="text-xs font-mono text-muted-foreground">{l.time}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{l.desc}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{l.driver}</p>
                </div>
                <div className="shrink-0">
                  {l.status === "Completed" && <CheckCircle className="w-4 h-4 text-green-500" />}
                  {l.status === "Active" && <Clock className="w-4 h-4 text-primary animate-pulse" />}
                  {l.status === "Pending" && <Clock className="w-4 h-4 text-muted-foreground" />}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg sm:text-xl font-display font-bold">Resource Status</h2>
          <div className="space-y-3">
            {resources.map((r, i) => (
              <Card key={i} className={r.ok ? "bg-card border-border" : "bg-destructive/5 border-destructive/30"}>
                <CardContent className="p-4 flex items-center justify-between gap-2 flex-wrap">
                  <div>
                    <p className="font-medium text-sm">{r.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{r.total}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`font-bold font-display ${r.ok ? "text-foreground" : "text-destructive"}`}>{r.value}</span>
                    {r.ok ? <CheckCircle className="w-4 h-4 text-green-500" /> : <AlertCircle className="w-4 h-4 text-destructive" />}
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
