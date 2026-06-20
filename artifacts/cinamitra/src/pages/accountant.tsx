import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import { PageHeader } from "@/components/patterns/PageHeader";
import { KpiGrid } from "@/components/patterns/KpiGrid";
import { StatusBadge } from "@/components/patterns/StatusBadge";
import { ResponsiveTable, type ResponsiveTableColumn } from "@/components/patterns/ResponsiveTable";

interface Invoice {
  vendor: string;
  amount: string;
  category: string;
  due: string;
  status: "Pending" | "Overdue" | "Approved";
}

interface Department {
  dept: string;
  budgeted: string;
  actual: string;
  variance: string;
  over: boolean;
}

const invoices: Invoice[] = [
  { vendor: "Roja Art Supplies", amount: "₹3,20,000", category: "Art", due: "Oct 20", status: "Pending" },
  { vendor: "SunTech Equipment", amount: "₹8,75,000", category: "Equipment", due: "Oct 18", status: "Overdue" },
  { vendor: "Krishna Catering", amount: "₹1,40,000", category: "Catering", due: "Oct 22", status: "Pending" },
  { vendor: "AP Location Services", amount: "₹5,00,000", category: "Location", due: "Oct 19", status: "Overdue" },
  { vendor: "Costume House HYD", amount: "₹2,30,000", category: "Costume", due: "Oct 25", status: "Pending" },
  { vendor: "VFX Studio Mumbai", amount: "₹12,00,000", category: "VFX", due: "Oct 28", status: "Pending" },
  { vendor: "Galaxy Transport", amount: "₹95,000", category: "Transport", due: "Oct 21", status: "Approved" },
  { vendor: "Star Food Services", amount: "₹88,000", category: "Catering", due: "Oct 23", status: "Approved" },
];

const departments: Department[] = [
  { dept: "Art", budgeted: "₹18Cr", actual: "₹20.1Cr", variance: "+₹2.1Cr", over: true },
  { dept: "Costume", budgeted: "₹8Cr", actual: "₹7.6Cr", variance: "-₹0.4Cr", over: false },
  { dept: "Equipment", budgeted: "₹22Cr", actual: "₹21.8Cr", variance: "-₹0.2Cr", over: false },
  { dept: "Travel", budgeted: "₹6Cr", actual: "₹6.9Cr", variance: "+₹0.9Cr", over: true },
  { dept: "Catering", budgeted: "₹4Cr", actual: "₹3.8Cr", variance: "-₹0.2Cr", over: false },
  { dept: "Locations", budgeted: "₹12Cr", actual: "₹11.4Cr", variance: "-₹0.6Cr", over: false },
  { dept: "Talent", budgeted: "₹60Cr", actual: "₹60Cr", variance: "₹0", over: false },
  { dept: "VFX", budgeted: "₹35Cr", actual: "₹36.2Cr", variance: "+₹1.2Cr", over: true },
];

const obligations = [
  { label: "TDS deposit due", date: "June 15", amount: "₹2.1L", urgent: true },
  { label: "GST filing due", date: "June 20", amount: "₹1.4L", urgent: true },
  { label: "Vendor payment: Art supplies", date: "June 18", amount: "₹3.2L", urgent: false },
  { label: "Payroll cycle Day 30", date: "June 30", amount: "₹18L", urgent: false },
  { label: "Equipment rental renewal", date: "July 1", amount: "₹8.75L", urgent: false },
];

const invoiceTone = { Pending: "primary", Overdue: "destructive", Approved: "success" } as const;

const invoiceColumns: ResponsiveTableColumn<Invoice>[] = [
  {
    key: "vendor", header: "Vendor", primary: true, className: "max-w-[160px]",
    render: inv => (
      <div>
        <p className="font-medium truncate">{inv.vendor}</p>
        <p className="text-xs text-muted-foreground">{inv.category} &middot; Due {inv.due}</p>
      </div>
    ),
  },
  { key: "amount", header: "Amount", render: inv => <span className="font-bold font-display">{inv.amount}</span> },
  { key: "status", header: "Status", render: inv => <StatusBadge tone={invoiceTone[inv.status]}>{inv.status}</StatusBadge> },
  {
    key: "actions", header: "", render: inv => inv.status === "Pending" && (
      <div className="flex gap-1">
        <button className="text-green-600 hover:text-green-700"><CheckCircle className="w-4 h-4" /></button>
        <button className="text-destructive hover:text-destructive/80"><XCircle className="w-4 h-4" /></button>
      </div>
    ),
  },
];

const deptColumns: ResponsiveTableColumn<Department>[] = [
  { key: "dept", header: "Dept", primary: true, render: d => <span className="font-medium">{d.dept}</span> },
  { key: "budgeted", header: "Budget", render: d => <span className="text-muted-foreground">{d.budgeted}</span> },
  { key: "actual", header: "Actual", render: d => <span className="font-medium">{d.actual}</span> },
  { key: "variance", header: "Variance", render: d => <span className={`font-bold text-xs ${d.over ? "text-destructive" : "text-green-600"}`}>{d.variance}</span> },
];

export default function AccountantView() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto space-y-6 sm:space-y-8"
    >
      <PageHeader title="Financial Operations" subtitle="Devara: Part 2" />

      <KpiGrid items={[
        { label: "Invoice Queue", value: "14", sub: "pending review", tone: "destructive" },
        { label: "Reimbursements", value: "₹8.4L", sub: "awaiting approval" },
        { label: "TDS Due", value: "₹2.1L", sub: "by June 15", tone: "destructive" },
        { label: "GST Filings", value: "3", sub: "overdue", tone: "destructive" },
      ]} />

      <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
        <div className="space-y-3">
          <h2 className="text-lg sm:text-xl font-display font-bold">Invoice Queue</h2>
          <ResponsiveTable columns={invoiceColumns} rows={invoices} rowKey={inv => inv.vendor} />
        </div>

        <div className="space-y-3">
          <h2 className="text-lg sm:text-xl font-display font-bold">Budget vs Actual</h2>
          <ResponsiveTable columns={deptColumns} rows={departments} rowKey={d => d.dept} />
        </div>

        <div className="space-y-3">
          <h2 className="text-lg sm:text-xl font-display font-bold">Upcoming Obligations</h2>
          <div className="space-y-3">
            {obligations.map((o, i) => (
              <Card key={i} className={o.urgent ? "border-destructive/30 bg-destructive/5" : "border-border bg-card"}>
                <CardContent className="p-4 flex items-center justify-between gap-3 flex-wrap">
                  <div className="min-w-0">
                    <p className="font-medium text-sm">{o.label}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className={`w-3 h-3 ${o.urgent ? "text-destructive" : "text-muted-foreground"}`} />
                      <span className={`text-xs ${o.urgent ? "text-destructive font-semibold" : "text-muted-foreground"}`}>{o.date}</span>
                    </div>
                  </div>
                  <span className="font-display font-bold text-lg shrink-0">{o.amount}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
