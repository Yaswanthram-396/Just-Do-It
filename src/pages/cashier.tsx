import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Plus, Home, Receipt, Wallet, FileText, X } from "lucide-react";
import { useState, useEffect } from "react";

const INITIAL_EXPENSES = [
  { cat: "Catering", desc: "Lunch for 45 crew", amount: 18500, time: "12:30 PM", color: "bg-amber-500" },
  { cat: "Transport", desc: "Cab fares — 6 pickups", amount: 4200, time: "09:15 AM", color: "bg-blue-500" },
  { cat: "Props", desc: "Emergency foam board", amount: 650, time: "10:45 AM", color: "bg-purple-500" },
  { cat: "Petrol", desc: "Generator refuel", amount: 3800, time: "08:00 AM", color: "bg-green-500" },
  { cat: "Misc", desc: "Stationery", amount: 420, time: "11:20 AM", color: "bg-gray-400" },
];

export default function CashierView() {
  const [activeTab, setActiveTab] = useState("home");
  const [expenses, setExpenses] = useState<typeof INITIAL_EXPENSES>(() => {
    const saved = localStorage.getItem("cinamitra-cashier-expenses");
    return saved ? JSON.parse(saved) : INITIAL_EXPENSES;
  });
  const [showAddForm, setShowAddForm] = useState(false);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("cinamitra-cashier-expenses", JSON.stringify(expenses));
  }, [expenses]);

  // Form states
  const [desc, setDesc] = useState("");
  const [cat, setCat] = useState("Catering");
  const [amountVal, setAmountVal] = useState("");

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    const numericAmount = parseInt(amountVal.replace(/\D/g, ""), 10);
    if (desc.trim() && !isNaN(numericAmount) && numericAmount > 0) {
      const now = new Date();
      let timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      const colorsMap: Record<string, string> = {
        Catering: "bg-amber-500",
        Transport: "bg-blue-500",
        Props: "bg-purple-500",
        Petrol: "bg-green-500",
        Misc: "bg-gray-400"
      };

      setExpenses((prev: typeof INITIAL_EXPENSES) => [
        { 
          cat, 
          desc: desc.trim(), 
          amount: numericAmount, 
          time: timeStr, 
          color: colorsMap[cat] || "bg-gray-400" 
        },
        ...prev
      ]);

      setDesc("");
      setAmountVal("");
      setShowAddForm(false);
    }
  };

  // Calculations
  const todaySpent = expenses.reduce((sum, e) => sum + e.amount, 0);
  const initialAvailableCash = 152070; // Set a mock total starting petty cash pool
  const availableCash = Math.max(0, initialAvailableCash - todaySpent);

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
        <h1 className="text-4xl font-display font-bold tracking-tight">Cash Operations</h1>
        <p className="text-xl text-muted-foreground mt-2">Devara: Part 2 — Cashier View</p>
      </header>

      {/* Metrics Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Available Cash Balance", value: `₹${availableCash.toLocaleString()}`, sub: "petty cash in bag" },
          { label: "Today Spent", value: `₹${todaySpent.toLocaleString()}`, sub: `across ${expenses.length} categories` },
          { label: "Pending Claims", value: "8 Claims", sub: "awaiting voucher upload" },
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
        
        {/* Left Column - Today's Expenses */}
        <div className="md:col-span-2 space-y-3">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-display font-bold">Today's Expenses</h2>
            <span className="text-xs text-muted-foreground">June 20</span>
          </div>
          <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-muted/50 border-b border-border text-muted-foreground font-medium">
                  <tr>
                    <th className="p-3">Description</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Time</th>
                    <th className="p-3 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {expenses.map((exp, i) => (
                    <tr key={i} className="hover:bg-muted/30 transition-colors">
                      <td className="p-3 font-medium text-foreground">{exp.desc}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-white text-xs font-medium ${exp.color}`}>
                          {exp.cat}
                        </span>
                      </td>
                      <td className="p-3 text-xs text-muted-foreground">{exp.time}</td>
                      <td className="p-3 text-sm font-semibold text-right text-foreground">
                        ₹{exp.amount.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column - Actions & Uploads */}
        <div className="space-y-6">
          
          {/* Quick Nav */}
          <div className="space-y-3">
            <h2 className="text-xl font-display font-bold">Quick Navigation</h2>
            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: Home, label: "Home", id: "home", href: "/cashier" },
                { icon: Wallet, label: "Expenses", id: "expenses", href: "/budget" },
                { icon: Receipt, label: "Receipts", id: "receipts", href: "/reports" },
              ].map((tab) => (
                <Link key={tab.id} href={tab.href}>
                  <button
                    data-testid={`button-nav-${tab.id}`}
                    onClick={() => setActiveTab(tab.id)}
                    className="w-full py-2 px-1 rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground hover:border-primary/50 flex flex-col items-center gap-1 text-[10px] font-semibold transition-colors cursor-pointer"
                  >
                    <tab.icon className="w-4.5 h-4.5 text-primary" />
                    <span>{tab.label}</span>
                  </button>
                </Link>
              ))}
            </div>
          </div>

          {/* Add Expense Form / Receipt Upload */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-display font-bold">Receipt Upload Zone</h2>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="p-1.5 rounded bg-primary text-primary-foreground hover:bg-primary/95 transition-colors text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                {showAddForm ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />} Add Expense
              </button>
            </div>

            <AnimatePresence>
              {showAddForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <Card className="bg-muted/15 border-border p-4">
                    <form onSubmit={handleAddExpense} className="space-y-3">
                      <div>
                        <label className="text-[10px] uppercase font-bold text-muted-foreground block mb-1">Expense Description</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Lunch boxes for stunts crew" 
                          value={desc} 
                          onChange={(e) => setDesc(e.target.value)}
                          className="w-full bg-background border border-border p-2 rounded text-xs text-foreground focus:outline-none focus:border-primary"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] uppercase font-bold text-muted-foreground block mb-1">Category</label>
                          <select 
                            value={cat} 
                            onChange={(e) => setCat(e.target.value)}
                            className="w-full bg-background border border-border p-2 rounded text-xs text-foreground focus:outline-none focus:border-primary"
                          >
                            <option value="Catering">Catering</option>
                            <option value="Transport">Transport</option>
                            <option value="Props">Props</option>
                            <option value="Petrol">Petrol</option>
                            <option value="Misc">Misc</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[10px] uppercase font-bold text-muted-foreground block mb-1">Amount (₹)</label>
                          <input 
                            type="text" 
                            placeholder="e.g. 5000" 
                            value={amountVal} 
                            onChange={(e) => setAmountVal(e.target.value)}
                            className="w-full bg-background border border-border p-2 rounded text-xs text-foreground focus:outline-none focus:border-primary"
                            required
                          />
                        </div>
                      </div>
                      <button type="submit" className="w-full bg-primary text-primary-foreground text-xs font-bold py-2 rounded hover:bg-primary/90 transition-colors cursor-pointer">
                        Disburse Cash & Record
                      </button>
                    </form>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            <Card className="bg-card border-border border-dashed border-2 hover:border-primary/50 transition-colors cursor-pointer">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-2">
                <FileText className="w-8 h-8 text-muted-foreground" />
                <p className="text-sm font-medium text-foreground">Upload Expense Receipt</p>
                <p className="text-xs text-muted-foreground">Drag & drop or click to select image/PDF</p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-display font-bold">Cashier Guidelines</h2>
            <Card className="bg-card border-border">
              <CardContent className="p-4 space-y-2">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong>Daily Limit:</strong> Single transaction limit is ₹20,000. Any larger request must be processed by the Accountant.
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong>Receipts:</strong> All cash disbursements must have matching digital receipts uploaded within 24 hours of payment.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
