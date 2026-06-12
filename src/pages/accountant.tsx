import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, XCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const invoices = [
  { vendor: "Roja Art Supplies", amount: "₹3,20,000", category: "Art", due: "Oct 20", status: "Pending" },
  { vendor: "SunTech Equipment", amount: "₹8,75,000", category: "Equipment", due: "Oct 18", status: "Overdue" },
  { vendor: "Krishna Catering", amount: "₹1,40,000", category: "Catering", due: "Oct 22", status: "Pending" },
  { vendor: "AP Location Services", amount: "₹5,00,000", category: "Location", due: "Oct 19", status: "Overdue" },
  { vendor: "Costume House HYD", amount: "₹2,30,000", category: "Costume", due: "Oct 25", status: "Pending" },
  { vendor: "VFX Studio Mumbai", amount: "₹12,00,000", category: "VFX", due: "Oct 28", status: "Pending" },
  { vendor: "Galaxy Transport", amount: "₹95,000", category: "Transport", due: "Oct 21", status: "Approved" },
  { vendor: "Star Food Services", amount: "₹88,000", category: "Catering", due: "Oct 23", status: "Approved" },
];

const departments = [
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

export default function AccountantView() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 max-w-[1400px] mx-auto space-y-8"
    >
      <header className="py-6 border-b border-border/50 relative">
        <Link href="/" className="absolute -top-4 text-xs text-muted-foreground flex items-center gap-1 hover:text-primary transition-colors">
          <ArrowLeft className="w-3 h-3" /> Back to Role Switcher
        </Link>
        <h1 className="text-4xl font-display font-bold tracking-tight">Financial Operations</h1>
        <p className="text-xl text-muted-foreground mt-2">Devara: Part 2</p>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: "Invoice Queue", value: "14", sub: "pending review", urgent: true },
          { label: "Reimbursements", value: "₹8.4L", sub: "awaiting approval", urgent: false },
          { label: "TDS Due", value: "₹2.1L", sub: "by June 15", urgent: true },
          { label: "GST Filings", value: "3", sub: "overdue", urgent: true },
          { label: "Petty Cash", value: "₹45K", sub: "available balance", urgent: false },
        ].map((k, i) => (
          <Card key={i} className={`border ${k.urgent ? "bg-destructive/5 border-destructive/30" : "bg-card border-border"} hover:border-primary/50 transition-colors`}>
            <CardContent className="p-5">
              <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${k.urgent ? "text-destructive" : "text-muted-foreground"}`}>{k.label}</p>
              <p className={`text-3xl font-display font-bold ${k.urgent ? "text-destructive" : ""}`}>{k.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{k.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="space-y-3">
          <h2 className="text-xl font-display font-bold">Invoice Queue</h2>
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 border-b border-border text-left">
                <tr>
                  <th className="p-3 text-muted-foreground font-medium">Vendor</th>
                  <th className="p-3 text-muted-foreground font-medium">Amount</th>
                  <th className="p-3 text-muted-foreground font-medium">Status</th>
                  <th className="p-3 text-muted-foreground font-medium"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {invoices.map((inv, i) => (
                  <tr key={i} className="hover:bg-muted/30 transition-colors">
                    <td className="p-3">
                      <p className="font-medium truncate max-w-[130px]">{inv.vendor}</p>
                      <p className="text-xs text-muted-foreground">{inv.category} · Due {inv.due}</p>
                    </td>
                    <td className="p-3 font-bold font-display">{inv.amount}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                        inv.status === "Overdue" ? "bg-destructive/10 text-destructive" :
                        inv.status === "Approved" ? "bg-green-500/10 text-green-600" :
                        "bg-primary/10 text-primary"
                      }`}>{inv.status}</span>
                    </td>
                    <td className="p-3">
                      {inv.status === "Pending" && (
                        <div className="flex gap-1">
                          <button className="text-green-600 hover:text-green-700"><CheckCircle className="w-4 h-4" /></button>
                          <button className="text-destructive hover:text-destructive/80"><XCircle className="w-4 h-4" /></button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-display font-bold">Budget vs Actual</h2>
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 border-b border-border text-left">
                <tr>
                  <th className="p-3 text-muted-foreground font-medium">Dept</th>
                  <th className="p-3 text-muted-foreground font-medium">Budget</th>
                  <th className="p-3 text-muted-foreground font-medium">Actual</th>
                  <th className="p-3 text-muted-foreground font-medium">Variance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {departments.map((d, i) => (
                  <tr key={i} className="hover:bg-muted/30 transition-colors">
                    <td className="p-3 font-medium">{d.dept}</td>
                    <td className="p-3 text-muted-foreground">{d.budgeted}</td>
                    <td className="p-3 font-medium">{d.actual}</td>
                    <td className={`p-3 font-bold text-xs ${d.over ? "text-destructive" : "text-green-600"}`}>{d.variance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-display font-bold">Upcoming Obligations</h2>
          <div className="space-y-3">
            {obligations.map((o, i) => (
              <Card key={i} className={`border ${o.urgent ? "border-destructive/30 bg-destructive/5" : "border-border bg-card"}`}>
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">{o.label}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className={`w-3 h-3 ${o.urgent ? "text-destructive" : "text-muted-foreground"}`} />
                      <span className={`text-xs ${o.urgent ? "text-destructive font-semibold" : "text-muted-foreground"}`}>{o.date}</span>
                    </div>
                  </div>
                  <span className="font-display font-bold text-lg">{o.amount}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
