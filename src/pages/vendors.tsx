import { motion } from "framer-motion";
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const vendors = [
  { name: "Roja Art Works", cat: "Art", contact: "Suresh K. — 9876543210", outstanding: "₹3,20,000", invoices: 2, status: "Active" },
  { name: "SunTech Equipment", cat: "Equipment", contact: "Rao M. — 9765432109", outstanding: "₹8,75,000", invoices: 1, status: "Flagged" },
  { name: "Krishna Catering Services", cat: "Catering", contact: "Krishna P. — 9654321098", outstanding: "₹1,40,000", invoices: 2, status: "Active" },
  { name: "AP Location Services", cat: "Location", contact: "Venkat S. — 9543210987", outstanding: "₹5,00,000", invoices: 3, status: "Flagged" },
  { name: "Costume House HYD", cat: "Costume", contact: "Rani L. — 9432109876", outstanding: "₹2,30,000", invoices: 1, status: "Active" },
  { name: "VFX Studio Mumbai", cat: "VFX", contact: "Arjun D. — 9321098765", outstanding: "₹12,00,000", invoices: 4, status: "Active" },
  { name: "Galaxy Transport", cat: "Transport", contact: "Raju N. — 9210987654", outstanding: "₹95,000", invoices: 1, status: "Active" },
  { name: "Star Food Services", cat: "Catering", contact: "Meena V. — 9109876543", outstanding: "₹88,000", invoices: 1, status: "Active" },
  { name: "Godavari Boats", cat: "Transport", contact: "Ramesh G. — 8998765432", outstanding: "₹1,50,000", invoices: 2, status: "Active" },
  { name: "Med Props India", cat: "Equipment", contact: "Dr. Priya R. — 8887654321", outstanding: "₹0", invoices: 0, status: "Active" },
  { name: "Pixion Studios", cat: "VFX", contact: "Arun T. — 8776543210", outstanding: "₹18,00,000", invoices: 5, status: "Active" },
  { name: "Red Chillies VFX", cat: "VFX", contact: "Shah R. — 8665432109", outstanding: "₹8,50,000", invoices: 2, status: "Active" },
];

const categories = ["All", "Art", "Equipment", "Catering", "Location", "Costume", "VFX", "Transport"];

const paymentHistory = [
  { date: "Oct 15", amount: "₹5,00,000", invoice: "INV-2024-0041", status: "Paid" },
  { date: "Oct 10", amount: "₹3,20,000", invoice: "INV-2024-0038", status: "Paid" },
  { date: "Oct 5", amount: "₹1,80,000", invoice: "INV-2024-0031", status: "Paid" },
  { date: "Sep 28", amount: "₹4,50,000", invoice: "INV-2024-0022", status: "Paid" },
  { date: "Sep 20", amount: "₹2,10,000", invoice: "INV-2024-0015", status: "Paid" },
];

export default function VendorsView() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedVendor, setSelectedVendor] = useState(vendors[0]);

  const filtered = vendors.filter(v => {
    const matchesCat = activeFilter === "All" || v.cat === activeFilter;
    const matchesSearch = v.name.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex h-[calc(100vh-3.5rem)]"
    >
      {/* Main table */}
      <div className="flex-1 flex flex-col min-w-0 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-display font-bold">Vendors</h1>
            <p className="text-muted-foreground text-sm">28 active vendor relationships</p>
          </div>
          <button
            data-testid="button-add-vendor"
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            + Add Vendor
          </button>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-1 max-w-xs">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              data-testid="input-vendor-search"
              placeholder="Search vendors..."
              className="pl-9 h-9"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-1.5">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setActiveFilter(c)}
                className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors ${activeFilter === c ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg overflow-hidden flex-1">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 border-b border-border text-left">
              <tr>
                <th className="p-3 text-muted-foreground font-medium">Vendor</th>
                <th className="p-3 text-muted-foreground font-medium">Category</th>
                <th className="p-3 text-muted-foreground font-medium">Contact</th>
                <th className="p-3 text-muted-foreground font-medium">Outstanding</th>
                <th className="p-3 text-muted-foreground font-medium">Invoices</th>
                <th className="p-3 text-muted-foreground font-medium">Status</th>
                <th className="p-3 text-muted-foreground font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((v, i) => (
                <tr
                  key={i}
                  onClick={() => setSelectedVendor(v)}
                  className={`hover:bg-muted/30 transition-colors cursor-pointer ${selectedVendor.name === v.name ? "bg-primary/5" : ""}`}
                >
                  <td className="p-3 font-semibold">{v.name}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 bg-muted text-muted-foreground rounded text-xs font-medium">{v.cat}</span>
                  </td>
                  <td className="p-3 text-xs text-muted-foreground">{v.contact}</td>
                  <td className="p-3 font-bold font-display">{v.outstanding}</td>
                  <td className="p-3 text-center font-medium">{v.invoices}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                      v.status === "Active" ? "bg-green-500/10 text-green-600" :
                      v.status === "Flagged" ? "bg-destructive/10 text-destructive" :
                      "bg-muted text-muted-foreground"
                    }`}>{v.status}</span>
                  </td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button className="text-xs font-semibold text-primary hover:underline">View</button>
                      <button className="text-xs font-semibold text-muted-foreground hover:text-foreground hover:underline">Pay</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sidebar detail */}
      <div className="w-72 shrink-0 border-l border-border p-5 overflow-y-auto">
        <h3 className="font-display font-bold text-lg mb-1">{selectedVendor.name}</h3>
        <span className={`px-2 py-0.5 rounded text-xs font-bold ${
          selectedVendor.status === "Active" ? "bg-green-500/10 text-green-600" : "bg-destructive/10 text-destructive"
        }`}>{selectedVendor.status}</span>

        <div className="mt-4 space-y-2 text-sm">
          <div>
            <p className="text-xs text-muted-foreground">Category</p>
            <p className="font-medium">{selectedVendor.cat}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Contact</p>
            <p className="font-medium">{selectedVendor.contact}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Outstanding Amount</p>
            <p className="font-display font-bold text-xl">{selectedVendor.outstanding}</p>
          </div>
        </div>

        <div className="mt-6">
          <h4 className="font-display font-bold text-sm mb-3">Payment History</h4>
          <div className="space-y-2">
            {paymentHistory.map((p, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <div>
                  <p className="font-medium">{p.invoice}</p>
                  <p className="text-muted-foreground">{p.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">{p.amount}</p>
                  <span className="text-green-600 font-semibold">{p.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          data-testid="button-pay-vendor"
          className="w-full mt-6 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          Process Payment
        </button>
      </div>
    </motion.div>
  );
}
