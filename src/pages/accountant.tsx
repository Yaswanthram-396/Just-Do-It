import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, XCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const INITIAL_INVOICES = [
  { id: 1, vendor: "Roja Art Supplies", amount: "₹3,20,000", category: "Art", due: "Oct 20", status: "Pending" },
  { id: 2, vendor: "SunTech Equipment", amount: "₹8,75,000", category: "Equipment", due: "Oct 18", status: "Overdue" },
  { id: 3, vendor: "Krishna Catering", amount: "₹1,40,000", category: "Catering", due: "Oct 22", status: "Pending" },
  { id: 4, vendor: "AP Location Services", amount: "₹5,00,000", category: "Location", due: "Oct 19", status: "Overdue" },
  { id: 5, vendor: "Costume House HYD", amount: "₹2,30,000", category: "Costume", due: "Oct 25", status: "Pending" },
  { id: 6, vendor: "VFX Studio Mumbai", amount: "₹12,00,000", category: "VFX", due: "Oct 28", status: "Pending" },
  { id: 7, vendor: "Galaxy Transport", amount: "₹95,000", category: "Transport", due: "Oct 21", status: "Approved" },
  { id: 8, vendor: "Star Food Services", amount: "₹88,000", category: "Catering", due: "Oct 23", status: "Approved" },
];

const INITIAL_DEPARTMENTS = [
  { dept: "Art", budgeted: "₹18Cr", actual: "₹20.1Cr", variance: "+₹2.1Cr", over: true },
  { dept: "Costume", budgeted: "₹8Cr", actual: "₹7.6Cr", variance: "-₹0.4Cr", over: false },
  { dept: "Equipment", budgeted: "₹22Cr", actual: "₹21.8Cr", variance: "-₹0.2Cr", over: false },
  { dept: "Travel", budgeted: "₹6Cr", actual: "₹6.9Cr", variance: "+₹0.9Cr", over: true },
  { dept: "Catering", budgeted: "₹4Cr", actual: "₹3.8Cr", variance: "-₹0.2Cr", over: false },
  { dept: "Locations", budgeted: "₹12Cr", actual: "₹11.4Cr", variance: "-₹0.6Cr", over: false },
  { dept: "Talent", budgeted: "₹60Cr", actual: "₹60Cr", variance: "₹0", over: false },
  { dept: "VFX", budgeted: "₹35Cr", actual: "₹36.2Cr", variance: "+₹1.2Cr", over: true },
];

const INITIAL_OBLIGATIONS = [
  { label: "TDS deposit due", date: "June 15", amount: "₹2.1L", urgent: true },
  { label: "GST filing due", date: "June 20", amount: "₹1.4L", urgent: true },
  { label: "Vendor payment: Art supplies", date: "June 18", amount: "₹3.2L", urgent: false },
  { label: "Payroll cycle Day 30", date: "June 30", amount: "₹18L", urgent: false },
  { label: "Equipment rental renewal", date: "July 1", amount: "₹8.75L", urgent: false },
];

export default function AccountantView() {
  const [invoices, setInvoices] = useState<typeof INITIAL_INVOICES>(() => {
    const saved = localStorage.getItem("cinamitra-accountant-invoices");
    return saved ? JSON.parse(saved) : INITIAL_INVOICES;
  });
  const [departments, setDepartments] = useState(INITIAL_DEPARTMENTS);
  const [obligations, setObligations] = useState(INITIAL_OBLIGATIONS);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("cinamitra-accountant-invoices", JSON.stringify(invoices));
  }, [invoices]);

  const handleInvoiceAction = (id: number, newStatus: "Approved" | "Rejected") => {
    setInvoices((prev: typeof INITIAL_INVOICES) => prev.map((inv) => {
      if (inv.id === id) {
        return { ...inv, status: newStatus };
      }
      return inv;
    }));
  };

  // Calculations
  const pendingCount = invoices.filter(inv => inv.status === "Pending" || inv.status === "Overdue").length;

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
        <h1 className="text-4xl font-display font-bold tracking-tight">Financial Operations</h1>
        <p className="text-xl text-muted-foreground mt-2">Devara: Part 2 — Accountant View</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Invoice Queue", value: pendingCount.toString(), sub: "pending review" },
          { label: "Reimbursements", value: "₹8.4L", sub: "awaiting approval" },
          { label: "TDS & GST Due", value: "₹3.5L", sub: "by June 15/20" },
        ].map((k, i) => (
          <Card key={i} className="bg-card border-border hover:border-primary/50 transition-colors">
            <CardContent className="p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">{k.label}</p>
              <p className="text-4xl font-display font-bold">{k.value}</p>
              <p className="text-xs text-muted-foreground mt-2">{k.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          
          <div className="space-y-3">
            <h2 className="text-xl font-display font-bold">Invoice Queue</h2>
            <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-muted/50 border-b border-border text-muted-foreground font-medium">
                    <tr>
                      <th className="p-3">Vendor</th>
                      <th className="p-3">Amount</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {invoices.map((inv, i) => (
                      <tr key={i} className="hover:bg-muted/30 transition-colors">
                        <td className="p-3">
                          <p className="font-medium text-foreground">{inv.vendor}</p>
                          <p className="text-xs text-muted-foreground">{inv.category} · Due {inv.due}</p>
                        </td>
                        <td className="p-3 font-bold font-display text-foreground">{inv.amount}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                            inv.status === "Overdue" ? "bg-destructive/10 text-destructive border border-destructive/20" :
                            inv.status === "Approved" ? "bg-green-500/10 text-green-500 border border-green-500/20" :
                            inv.status === "Rejected" ? "bg-gray-500/10 text-gray-400 border border-gray-500/20" :
                            "bg-primary/10 text-primary border border-primary/20"
                          }`}>{inv.status}</span>
                        </td>
                        <td className="p-3 text-right">
                          {inv.status === "Pending" || inv.status === "Overdue" ? (
                            <div className="flex gap-2 justify-end">
                              <button 
                                onClick={() => handleInvoiceAction(inv.id, "Approved")}
                                className="text-green-500 hover:text-green-400 font-bold text-xs flex items-center gap-1 cursor-pointer"
                              >
                                <CheckCircle className="w-4 h-4" /> Approve
                              </button>
                              <button 
                                onClick={() => handleInvoiceAction(inv.id, "Rejected")}
                                className="text-destructive hover:text-destructive/80 font-bold text-xs flex items-center gap-1 cursor-pointer"
                              >
                                <XCircle className="w-4 h-4" /> Reject
                              </button>
                            </div>
                          ) : (
                            <span className="text-xs text-muted-foreground font-semibold uppercase">Processed</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-display font-bold">Budget vs Actual</h2>
            <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-muted/50 border-b border-border text-muted-foreground font-medium">
                    <tr>
                      <th className="p-3">Department</th>
                      <th className="p-3">Budget</th>
                      <th className="p-3">Actual Spend</th>
                      <th className="p-3 text-right">Variance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {departments.map((d, i) => (
                      <tr key={i} className="hover:bg-muted/30 transition-colors">
                        <td className="p-3 font-medium text-foreground">{d.dept}</td>
                        <td className="p-3 text-muted-foreground">{d.budgeted}</td>
                        <td className="p-3 font-medium text-foreground">{d.actual}</td>
                        <td className={`p-3 font-bold text-sm text-right ${d.over ? "text-destructive" : "text-green-500"}`}>{d.variance}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <h2 className="text-xl font-display font-bold">Upcoming Obligations</h2>
            <div className="space-y-3">
              {obligations.map((o, i) => (
                <Card key={i} className={`border ${o.urgent ? "border-destructive/30 bg-destructive/5" : "border-border bg-card"}`}>
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm text-foreground">{o.label}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className={`w-3.5 h-3.5 ${o.urgent ? "text-destructive animate-pulse" : "text-muted-foreground"}`} />
                        <span className={`text-xs ${o.urgent ? "text-destructive font-semibold" : "text-muted-foreground"}`}>{o.date}</span>
                      </div>
                    </div>
                    <span className="font-display font-bold text-lg text-foreground">{o.amount}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
