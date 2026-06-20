import { Plus, Home, Receipt, Wallet } from "lucide-react";
import { Link } from "wouter";
import { MobileShell } from "@/components/patterns/MobileShell";

const todayExpenses = [
  { cat: "Catering", desc: "Lunch for 45 crew", amount: "₹18,500", time: "12:30 PM", color: "bg-amber-500" },
  { cat: "Transport", desc: "Cab fares — 6 pickups", amount: "₹4,200", time: "09:15 AM", color: "bg-blue-500" },
  { cat: "Props", desc: "Emergency foam board", amount: "₹650", time: "10:45 AM", color: "bg-purple-500" },
  { cat: "Petrol", desc: "Generator refuel", amount: "₹3,800", time: "08:00 AM", color: "bg-green-500" },
  { cat: "Misc", desc: "Stationery", amount: "₹420", time: "11:20 AM", color: "bg-gray-400" },
];

const navItems = [
  { icon: Home, label: "Home", id: "home", href: "/cashier" },
  { icon: Wallet, label: "Expenses", id: "expenses", href: "/budget" },
  { icon: Receipt, label: "Receipts", id: "receipts", href: "/reports" },
];

export default function CashierView() {
  return (
    <MobileShell
      fab={
        <button
          data-testid="button-add-expense"
          className="absolute bottom-20 right-4 sm:right-5 w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
        >
          <Plus className="w-6 h-6" />
        </button>
      }
      bottomNav={navItems.map(tab => (
        <Link key={tab.id} href={tab.href}>
          <button
            data-testid={`button-nav-${tab.id}`}
            className="flex flex-col items-center gap-1 px-4 py-1 rounded-lg transition-colors text-muted-foreground hover:text-primary"
          >
            <tab.icon className="w-5 h-5" />
            <span className="text-[11px] font-semibold">{tab.label}</span>
          </button>
        </Link>
      ))}
    >
      <div>
        <h1 className="text-2xl font-display font-bold tracking-tight">Cash Operations</h1>
        <p className="text-sm text-muted-foreground">Day 23 — Principal Photography</p>
      </div>

      <div className="rounded-2xl bg-primary p-5 text-primary-foreground">
        <p className="text-xs font-semibold uppercase tracking-widest opacity-80 mb-1">Available Cash Balance</p>
        <p className="text-3xl sm:text-4xl font-display font-bold">₹1,24,500</p>
        <div className="flex justify-between mt-4 pt-3 border-t border-primary-foreground/20">
          <div>
            <p className="text-xs opacity-70">Today Spent</p>
            <p className="font-bold text-sm">₹27,570</p>
          </div>
          <div>
            <p className="text-xs opacity-70">Pending Claims</p>
            <p className="font-bold text-sm">₹8,400</p>
          </div>
          <div>
            <p className="text-xs opacity-70">Approved</p>
            <p className="font-bold text-sm">₹19,170</p>
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-display font-bold">Today's Expenses</h2>
          <span className="text-xs text-muted-foreground">June 11</span>
        </div>
        <div className="space-y-2">
          {todayExpenses.map((exp, i) => (
            <div key={i} className="flex items-center gap-3 bg-card border border-border rounded-xl p-3">
              <div className={`w-2 h-2 rounded-full shrink-0 ${exp.color}`} />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{exp.desc}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs bg-muted px-1.5 py-0.5 rounded text-muted-foreground">{exp.cat}</span>
                  <span className="text-xs text-muted-foreground">{exp.time}</span>
                </div>
              </div>
              <span className="font-display font-bold text-sm shrink-0">{exp.amount}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-muted/50 rounded-xl p-4 text-center">
        <p className="text-xs text-muted-foreground">Total expenses today: <span className="font-bold text-foreground">₹27,570</span></p>
      </div>
    </MobileShell>
  );
}
