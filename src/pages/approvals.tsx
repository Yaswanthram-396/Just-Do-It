import { useState } from "react";
import { 
  FileText, ShieldAlert, ShieldCheck, DollarSign, Clock, 
  Search, Check, X, Info, Filter, ArrowRight, Download, 
  UserPlus, CheckSquare, Square, RefreshCw, FileSpreadsheet,
  AlertCircle, AlertTriangle, HelpCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ApprovalItem {
  id: number;
  title: string;
  type: "Budget Increase" | "Location Change" | "Vendor Contract" | "Talent Booking" | "Equipment Rental" | "Travel Requests" | "Schedule Changes" | "VFX Change Orders" | "Emergency Expenses" | "Insurance Requests" | "Permit Renewals";
  dept: string;
  requester: string;
  requestedTime: string;
  amount: string;
  scheduleImpact: string;
  risk: "High" | "Medium" | "Low";
  status: "Pending" | "Approved" | "Rejected" | "Changes Requested";
  reason: string;
  attachments: string[];
  priority: "Critical" | "High" | "Standard";
  budgetChange: string;
  resourceImpact: string;
  riskReduction: string;
  recommendation: string;
}

const INITIAL_APPROVALS: ApprovalItem[] = [
  {
    id: 1,
    title: "Market Set Extension",
    type: "Budget Increase",
    dept: "Art Department",
    requester: "Sabu Cyril",
    requestedTime: "2 hrs ago",
    amount: "₹12.5L",
    scheduleImpact: "Prevents 2-day delay",
    risk: "High",
    status: "Pending",
    reason: "Additional set extension required for Scene 34 reshoot to align with updated climax sequence.",
    attachments: ["Blueprint_Market_V3.pdf", "BudgetBreakdown_Art_Ext.xlsx"],
    priority: "Critical",
    budgetChange: "+₹12.5L",
    resourceImpact: "No Issues",
    riskReduction: "Medium",
    recommendation: "Approve"
  },
  {
    id: 2,
    title: "District Hospital Location Permit",
    type: "Permit Renewals",
    dept: "Locations Desk",
    requester: "Ravi Teja (Location Mgr)",
    requestedTime: "5 hrs ago",
    amount: "₹1.5L",
    scheduleImpact: "Critical lock for Shoot Day 25",
    risk: "High",
    status: "Pending",
    reason: "Municipal permit renewal required for night shoot sequences in District General Hospital block.",
    attachments: ["Hospital_Permit_Signed.pdf"],
    priority: "Critical",
    budgetChange: "+₹1.5L",
    resourceImpact: "Night Shift Allocation",
    riskReduction: "High",
    recommendation: "Approve Immediately"
  },
  {
    id: 3,
    title: "Primary Combat VFX Plate Change Order",
    type: "VFX Change Orders",
    dept: "Post Production / VFX",
    requester: "Kamal (VFX Sup)",
    requestedTime: "Yesterday",
    amount: "₹28.0L",
    scheduleImpact: "Saves 5 days in editing pipeline",
    risk: "Medium",
    status: "Pending",
    reason: "Required adjustments to CGI water simulator plates for the boat fight sequence.",
    attachments: ["VFX_Revision_Notes.pdf", "Cost_Justification.xlsx"],
    priority: "High",
    budgetChange: "+₹28.0L",
    resourceImpact: "VFX Vendor Overtime",
    riskReduction: "Medium",
    recommendation: "Approve"
  },
  {
    id: 4,
    title: "Extra Vanity Vans (2) for Day 31-35",
    type: "Equipment Rental",
    dept: "Logistics Desk",
    requester: "Prasad (Prod Mgr)",
    requestedTime: "Yesterday",
    amount: "₹3.2L",
    scheduleImpact: "No schedule impact",
    risk: "Low",
    status: "Pending",
    reason: "Additional vanity vans required for secondary female cast during the upcoming beach song sequence.",
    attachments: ["Vanity_Rental_Quote.pdf"],
    priority: "Standard",
    budgetChange: "+₹3.2L",
    resourceImpact: "Driver Standby Required",
    riskReduction: "Low",
    recommendation: "Reject / Optimize"
  },
  {
    id: 5,
    title: "Second Unit Action Director Agreement",
    type: "Talent Booking",
    dept: "Direction / Cast Desk",
    requester: "Koratala Siva (Director)",
    requestedTime: "2 days ago",
    amount: "₹15.0L",
    scheduleImpact: "Accelerates chase sequences",
    risk: "Medium",
    status: "Pending",
    reason: "Contracting Action choreographer for auxiliary road chase unit to match timelines.",
    attachments: ["Action_Dir_Contract_Draft.pdf"],
    priority: "High",
    budgetChange: "+₹15.0L",
    resourceImpact: "Crew scheduling conflict",
    riskReduction: "High",
    recommendation: "Approve"
  },
  {
    id: 6,
    title: "Emergency Generator Fuel Dispatch",
    type: "Emergency Expenses",
    dept: "Logistics Desk",
    requester: "Srinivas (Line Prod)",
    requestedTime: "3 hrs ago",
    amount: "₹1.8L",
    scheduleImpact: "Prevents immediate set shutdown",
    risk: "High",
    status: "Pending",
    reason: "Fuel depletion emergency at the main forest set due to grid failure.",
    attachments: ["Fuel_Invoice_Urgent.pdf"],
    priority: "Critical",
    budgetChange: "+₹1.8L",
    resourceImpact: "Vendor priority dispatch",
    riskReduction: "High",
    recommendation: "Approve Immediately"
  }
];

export default function ApprovalsCenter() {
  const [approvals, setApprovals] = useState<ApprovalItem[]>(INITIAL_APPROVALS);
  const [selectedId, setSelectedId] = useState<number>(1);
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  // Filtering
  const filteredApprovals = approvals.filter(app => {
    const matchesSearch = app.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          app.requester.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          app.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          app.dept.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;

    if (selectedFilter === "All") return true;
    if (selectedFilter === "Critical") return app.priority === "Critical" && app.status === "Pending";
    if (selectedFilter === "Budget") return app.type === "Budget Increase" || app.type === "Emergency Expenses";
    if (selectedFilter === "Schedule") return app.type === "Schedule Changes";
    if (selectedFilter === "Vendors") return app.type === "Vendor Contract";
    if (selectedFilter === "Locations") return app.type === "Location Change" || app.type === "Permit Renewals";
    if (selectedFilter === "Talent") return app.type === "Talent Booking";
    if (selectedFilter === "VFX") return app.type === "VFX Change Orders";
    if (selectedFilter === "Pending") return app.status === "Pending";
    if (selectedFilter === "Approved") return app.status === "Approved";
    if (selectedFilter === "Rejected") return app.status === "Rejected";

    return true;
  });

  const selectedApproval = approvals.find(a => a.id === selectedId) || filteredApprovals[0] || null;

  // Single Actions
  const handleAction = (id: number, status: "Approved" | "Rejected" | "Changes Requested") => {
    setApprovals(prev => prev.map(a => a.id === id ? { ...a, status } : a));
    setSelectedIds(prev => prev.filter(x => x !== id));
  };

  // Bulk Actions
  const handleBulkAction = (status: "Approved" | "Rejected") => {
    if (selectedIds.length === 0) return;
    setApprovals(prev => prev.map(a => selectedIds.includes(a.id) ? { ...a, status } : a));
    setSelectedIds([]);
  };

  const toggleSelect = (id: number) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const toggleSelectAll = () => {
    const pendingIds = filteredApprovals.filter(a => a.status === "Pending").map(a => a.id);
    if (selectedIds.length === pendingIds.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(pendingIds);
    }
  };

  // Metrics
  const pendingCount = approvals.filter(a => a.status === "Pending").length;
  const criticalCount = approvals.filter(a => a.priority === "Critical" && a.status === "Pending").length;
  const budgetImpactCr = approvals
    .filter(a => a.status === "Pending")
    .reduce((sum, a) => {
      const val = parseFloat(a.amount.replace("₹", "").replace("L", ""));
      return sum + (isNaN(val) ? 0 : val);
    }, 0) / 100; // convert Lakhs to Crores

  return (
    <div className="p-6 md:p-8 max-w-[1600px] mx-auto min-h-screen bg-[#FAFAFC] text-[#1A1A1A] flex flex-col gap-8">
      
      {/* Header and Metrics */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
        <div>
          <h1 className="text-3xl font-display font-extrabold tracking-tight text-[#1A1A1A]">Approvals Center</h1>
          <p className="text-sm text-[#6B7280] font-medium mt-1">
            Review and approve production decisions requiring executive authorization.
          </p>
        </div>

        {/* Header Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full xl:w-auto">
          {[
            { label: "Pending Approvals", value: pendingCount, sub: "Action Required", color: "text-[#FF7A00]" },
            { label: "Critical Requests", value: criticalCount, sub: "Immediate Review", color: "text-[#EF4444]" },
            { label: "Budget Impact", value: `₹${budgetImpactCr.toFixed(2)}Cr`, sub: "Total Exposure", color: "text-[#22C55E]" },
            { label: "Awaiting Review", value: "2 Overdue", sub: "Since yesterday", color: "text-amber-500" }
          ].map((m, i) => (
            <div key={i} className="bg-white border border-[#E5E7EB] rounded-2xl p-4 shadow-[0_8px_30px_rgba(0,0,0,0.03)] flex flex-col justify-between min-w-[140px]">
              <span className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider">{m.label}</span>
              <span className={`text-xl font-display font-extrabold mt-2 ${m.color}`}>{m.value}</span>
              <span className="text-[9px] text-[#6B7280] font-semibold mt-1">{m.sub}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Control Bar: Filters, Search, and Bulk Actions */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-white border border-[#E5E7EB] rounded-2xl p-4 shadow-sm">
        
        {/* Search */}
        <div className="relative w-full lg:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
          <input 
            type="text" 
            placeholder="Search approvals..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 h-10 bg-[#FAFAFC] border border-[#E5E7EB] rounded-xl text-xs font-semibold focus:outline-none focus:border-[#FF7A00] transition-colors"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-1.5 w-full lg:w-auto">
          {["All", "Critical", "Budget", "Locations", "Talent", "VFX", "Pending", "Approved", "Rejected"].map(filter => {
            const isSelected = selectedFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-3 py-1.5 rounded-full text-[10px] font-bold border transition-all ${
                  isSelected 
                    ? "bg-[#FFF4E8] border-[#FF7A00] text-[#FF7A00]" 
                    : "bg-white border-[#E5E7EB] text-[#6B7280] hover:border-[#FF7A00]/50"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* Bulk Actions */}
        {selectedIds.length > 0 && (
          <div className="flex items-center gap-2 border-t lg:border-t-0 pt-3 lg:pt-0 w-full lg:w-auto">
            <span className="text-xs font-bold text-[#FF7A00] mr-2">{selectedIds.length} Selected</span>
            <button 
              onClick={() => handleBulkAction("Approved")}
              className="px-3.5 py-1.5 bg-[#22C55E] text-white text-xs font-bold rounded-lg hover:bg-green-600 transition-colors flex items-center gap-1"
            >
              <Check className="w-3.5 h-3.5" /> Bulk Approve
            </button>
            <button 
              onClick={() => handleBulkAction("Rejected")}
              className="px-3.5 py-1.5 bg-[#EF4444] text-white text-xs font-bold rounded-lg hover:bg-red-600 transition-colors flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" /> Bulk Reject
            </button>
          </div>
        )}
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Section: Approvals Queue List (col-span-8) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Priority categorizations */}
          {filteredApprovals.length === 0 ? (
            <div className="bg-white border border-[#E5E7EB] rounded-[20px] p-12 text-center shadow-[0_8px_30px_rgba(0,0,0,0.03)] space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#ECFDF3] text-[#22C55E] flex items-center justify-center mx-auto text-xl font-bold">✓</div>
              <h3 className="text-lg font-bold text-[#1A1A1A]">All approvals cleared</h3>
              <p className="text-xs text-[#6B7280] max-w-sm mx-auto">No pending executive decisions match this filter. Everything is on schedule.</p>
              <div className="text-[10px] font-bold text-[#9CA3AF] uppercase">Next scheduled review: Tomorrow 9:00 AM</div>
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* Critical / High Queue header with toggle all select */}
              <div className="flex justify-between items-center px-2">
                <span className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">Executive Decision Queue</span>
                {filteredApprovals.filter(a => a.status === 'Pending').length > 0 && (
                  <button 
                    onClick={toggleSelectAll} 
                    className="text-xs font-bold text-[#FF7A00] hover:underline flex items-center gap-1.5"
                  >
                    {selectedIds.length === filteredApprovals.filter(a => a.status === 'Pending').length ? (
                      <>Deselect All</>
                    ) : (
                      <>Select All Pending</>
                    )}
                  </button>
                )}
              </div>

              {/* Cards list */}
              <div className="space-y-4">
                {filteredApprovals.map((app) => {
                  const isSelected = selectedId === app.id;
                  const isChecked = selectedIds.includes(app.id);
                  const isPending = app.status === "Pending";
                  
                  return (
                    <div 
                      key={app.id}
                      onClick={() => setSelectedId(app.id)}
                      className={`group border rounded-[20px] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_35px_rgba(0,0,0,0.06)] hover:border-[#FF7A00]/25 transition-all duration-200 cursor-pointer overflow-hidden relative ${
                        isSelected ? "border-[#FF7A00]/60 ring-1 ring-[#FF7A00]/15" : "border-[#E5E7EB]"
                      }`}
                    >
                      {/* Priority left indicator bar */}
                      <span className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                        app.priority === 'Critical' ? 'bg-[#EF4444]' :
                        app.priority === 'High' ? 'bg-[#F59E0B]' : 'bg-[#3B82F6]'
                      }`} />

                      <div className="p-5 pl-7 flex flex-col gap-4">
                        
                        {/* Top row */}
                        <div className="flex justify-between items-start">
                          <div className="flex items-start gap-3">
                            {/* Checkbox for bulk select */}
                            {isPending && (
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleSelect(app.id);
                                }}
                                className="mt-0.5 text-neutral-400 hover:text-[#FF7A00] shrink-0"
                              >
                                {isChecked ? <CheckSquare className="w-4 h-4 text-[#FF7A00]" /> : <Square className="w-4 h-4" />}
                              </button>
                            )}
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF7A00] bg-[#FFF4E8] px-2 py-0.5 rounded">
                                  {app.type}
                                </span>
                                <span className="text-xs text-[#9CA3AF] font-bold">•</span>
                                <span className="text-xs text-[#6B7280] font-semibold">{app.dept}</span>
                              </div>
                              <h3 className="text-base font-extrabold text-[#1A1A1A] mt-1 group-hover:text-[#FF7A00] transition-colors">
                                {app.title}
                              </h3>
                            </div>
                          </div>

                          <div className="text-right">
                            <span className="text-lg font-extrabold text-[#1A1A1A]">{app.amount}</span>
                            <p className="text-[10px] text-[#9CA3AF] font-bold">{app.requestedTime}</p>
                          </div>
                        </div>

                        {/* Mid Row: Meta Specifications */}
                        <div className="grid grid-cols-3 gap-4 border-y border-[#F3F4F6] py-3 text-xs font-semibold text-[#6B7280]">
                          <div>
                            <span className="text-[10px] text-[#9CA3AF] font-bold block uppercase mb-0.5">Requester</span>
                            <span className="text-[#1A1A1A]">{app.requester}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-[#9CA3AF] font-bold block uppercase mb-0.5">Schedule Impact</span>
                            <span className="text-[#3B82F6]">{app.scheduleImpact}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-[#9CA3AF] font-bold block uppercase mb-0.5">Risk Level</span>
                            <span className={`font-bold ${
                              app.risk === 'High' ? 'text-[#EF4444]' :
                              app.risk === 'Medium' ? 'text-amber-500' : 'text-[#22C55E]'
                            }`}>{app.risk} Risk</span>
                          </div>
                        </div>

                        {/* Reason / Explanation */}
                        <p className="text-xs text-[#4B5563] leading-relaxed font-medium bg-[#FAFAFC] p-3 rounded-xl border border-[#E5E7EB]/40">
                          <span className="font-extrabold text-[#1A1A1A]">Reason:</span> {app.reason}
                        </p>

                        {/* Attachments & Buttons */}
                        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 pt-1">
                          
                          {/* Attachments */}
                          <div className="flex flex-wrap gap-2">
                            {app.attachments.map((file, idx) => (
                              <div key={idx} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#FAFAFC] border border-[#E5E7EB] text-[10px] font-bold text-[#6B7280]">
                                <FileText className="w-3 h-3 text-[#FF7A00]" /> {file}
                              </div>
                            ))}
                          </div>

                          {/* Quick Actions */}
                          <div className="flex gap-2 justify-end">
                            {app.status === "Pending" ? (
                              <>
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleAction(app.id, "Rejected");
                                  }}
                                  className="px-3.5 py-1.5 bg-white border border-[#E5E7EB] text-xs font-bold rounded-lg text-neutral-600 hover:bg-[#FEF2F2] hover:text-[#EF4444] transition-colors"
                                >
                                  Reject
                                </button>
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleAction(app.id, "Changes Requested");
                                  }}
                                  className="px-3.5 py-1.5 bg-white border border-[#E5E7EB] text-xs font-bold rounded-lg text-neutral-600 hover:bg-[#FFF4E8] hover:text-[#F59E0B] transition-colors"
                                >
                                  Request Changes
                                </button>
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleAction(app.id, "Approved");
                                  }}
                                  className="px-4 py-1.5 bg-[#FF7A00] text-white text-xs font-bold rounded-lg hover:bg-[#FF922B] transition-colors"
                                >
                                  Approve
                                </button>
                              </>
                            ) : (
                              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                                app.status === 'Approved' ? 'bg-[#ECFDF3] text-[#22C55E]' :
                                app.status === 'Rejected' ? 'bg-[#FEF2F2] text-[#EF4444]' :
                                'bg-[#FFF4E8] text-[#F59E0B]'
                              }`}>
                                {app.status === 'Approved' && <ShieldCheck className="w-3.5 h-3.5" />}
                                {app.status === 'Rejected' && <ShieldAlert className="w-3.5 h-3.5" />}
                                {app.status}
                              </span>
                            )}
                          </div>

                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          )}

          {/* Executive Risk Overview Dashboard Section */}
          <div className="border border-[#E5E7EB] rounded-[20px] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
            <h2 className="text-base font-bold text-[#1A1A1A] mb-4 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-[#FF7A00]" /> Executive Risk Overview
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { title: "Budget Risks", status: "Moderate", trend: "+5.2% art raw materials cost spike", color: "text-[#F59E0B] bg-[#FFF4E8]/50 border-amber-200/50" },
                { title: "Vendor Risks", status: "Critical", trend: "Devi logistics delay (Chennai corridor)", color: "text-[#EF4444] bg-[#FEF2F2] border-[#EF4444]/15" },
                { title: "Schedule Risks", status: "Moderate", trend: "Day 27 lead actor promotional conflict", color: "text-[#F59E0B] bg-[#FFF4E8]/50 border-amber-200/50" },
                { title: "Permit Risks", status: "Critical", trend: "Hospital municipal renewal clearance pending", color: "text-[#EF4444] bg-[#FEF2F2] border-[#EF4444]/15" },
                { title: "Talent Risks", status: "Stable", trend: "All principal cast agreements locked", color: "text-[#22C55E] bg-[#ECFDF3]/60 border-[#22C55E]/10" },
              ].map((risk, idx) => (
                <div key={idx} className={`p-4 border rounded-xl flex flex-col justify-between hover:translate-y-[-1px] transition-transform ${risk.color}`}>
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">{risk.title}</h4>
                    <p className="text-base font-extrabold mt-1">{risk.status}</p>
                  </div>
                  <p className="text-[9px] font-semibold text-[#6B7280] mt-3 leading-relaxed">{risk.trend}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Section: Impact Analysis, Executive Insights, Decisions Timeline (col-span-4) */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Selected Approval Impact Panel */}
          {selectedApproval && (
            <div className="border border-[#E5E7EB] rounded-[20px] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.05)] space-y-5 relative">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#FF7A00] flex items-center gap-2">
                <Info className="w-4 h-4" /> Approval Impact Analysis
              </h3>
              
              <div className="p-4 rounded-xl bg-[#FAFAFC] border border-[#E5E7EB]/70 space-y-4">
                <h4 className="text-xs font-bold text-[#1A1A1A] leading-tight border-b border-[#E5E7EB] pb-2">
                  {selectedApproval.title}
                </h4>
                
                <div className="space-y-3.5 text-xs font-semibold">
                  <div className="flex justify-between items-center">
                    <span className="text-[#6B7280]">Budget Change:</span>
                    <span className="text-[#1A1A1A] font-extrabold">{selectedApproval.budgetChange}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#6B7280]">Schedule Impact:</span>
                    <span className="text-[#3B82F6] font-extrabold">{selectedApproval.scheduleImpact}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#6B7280]">Resource Impact:</span>
                    <span className="text-[#1A1A1A] font-extrabold">{selectedApproval.resourceImpact}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#6B7280]">Risk Reduction:</span>
                    <span className="text-[#22C55E] font-extrabold">{selectedApproval.riskReduction}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2.5 border-t border-[#E5E7EB]">
                    <span className="text-[#6B7280]">Recommendation:</span>
                    <span className="text-[#FF7A00] font-extrabold uppercase tracking-wide bg-[#FFF4E8] px-2 py-0.5 rounded text-[10px]">
                      {selectedApproval.recommendation}
                    </span>
                  </div>
                </div>
              </div>

              {/* Approval Workflow Visualization */}
              <div className="space-y-3 pt-2">
                <span className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider block">Approval Progress Workflow</span>
                
                <div className="relative pl-6 border-l border-[#E5E7EB] space-y-4">
                  {[
                    { stage: "Requested", status: "Completed", desc: `Initiated by ${selectedApproval.requester}` },
                    { stage: "Department Review", status: "Completed", desc: "Verified against department balance sheets" },
                    { stage: "Producer Review", status: selectedApproval.status === 'Pending' ? "Active" : "Completed", desc: "Awaiting Rana Ji decision signature" },
                    { stage: "Approved / Executed", status: selectedApproval.status === 'Pending' ? "Upcoming" : "Completed", desc: "Automated ERP disbursement release" }
                  ].map((wf, i) => (
                    <div key={i} className="relative text-xs">
                      {/* Workflow dot */}
                      <span className={`absolute -left-[30px] top-1 w-2.5 h-2.5 rounded-full border-2 border-white ring-4 ring-offset-0 ${
                        wf.status === 'Completed' ? 'bg-[#22C55E] ring-green-100' :
                        wf.status === 'Active' ? 'bg-[#FF7A00] ring-[#FFF4E8] animate-pulse' :
                        'bg-[#9CA3AF] ring-gray-100'
                      }`} />
                      
                      <div className="space-y-0.5">
                        <span className={`font-bold ${
                          wf.status === 'Completed' ? 'text-[#1A1A1A]' :
                          wf.status === 'Active' ? 'text-[#FF7A00]' : 'text-[#9CA3AF]'
                        }`}>{wf.stage}</span>
                        <p className="text-[10px] text-[#6B7280] font-medium">{wf.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Right Sidebar: Executive Insights */}
          <div className="border border-[#E5E7EB] rounded-[20px] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-4">Executive Insights</h3>
            
            <div className="space-y-4 text-xs font-semibold">
              <div className="flex justify-between items-center py-2 border-b border-[#F3F4F6]">
                <span className="text-[#6B7280]">Pending Requests:</span>
                <span className="text-[#1A1A1A] font-extrabold">{pendingCount}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-[#F3F4F6]">
                <span className="text-[#6B7280]">Budget Exposure:</span>
                <span className="text-[#FF7A00] font-extrabold">₹{budgetImpactCr.toFixed(2)}Cr</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-[#F3F4F6]">
                <span className="text-[#6B7280]">Critical Requests:</span>
                <span className="text-[#EF4444] font-extrabold">{criticalCount}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-[#F3F4F6]">
                <span className="text-[#6B7280]">Avg Decision Time:</span>
                <span className="text-[#1A1A1A] font-extrabold">4.2 Hours</span>
              </div>
              <div className="flex justify-between items-start py-2">
                <span className="text-[#6B7280]">Largest Pending Request:</span>
                <span className="text-[#1A1A1A] font-extrabold text-right">₹28.0L (VFX Plates)</span>
              </div>
            </div>
          </div>

          {/* Approval Decisions Timeline Log */}
          <div className="border border-[#E5E7EB] rounded-[20px] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-4">Decisions Timeline Log</h3>
            
            <div className="space-y-4">
              <div className="space-y-2.5">
                <p className="text-[10px] font-bold text-[#9CA3AF] uppercase">Today</p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-[#1A1A1A]">Hospital Permit Renewal</span>
                    <span className="text-[#22C55E] bg-[#ECFDF3] px-2 py-0.5 rounded text-[10px] font-bold">Approved</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-neutral-600">Extra Vanity Vans</span>
                    <span className="text-[#EF4444] bg-[#FEF2F2] px-2 py-0.5 rounded text-[10px] font-bold">Rejected</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2.5 pt-2 border-t border-[#F3F4F6]">
                <p className="text-[10px] font-bold text-[#9CA3AF] uppercase">Yesterday</p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-[#1A1A1A]">Market Set Extension</span>
                    <span className="text-[#22C55E] bg-[#ECFDF3] px-2 py-0.5 rounded text-[10px] font-bold">Approved</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-[#1A1A1A]">Generator Vendor Contract</span>
                    <span className="text-[#22C55E] bg-[#ECFDF3] px-2 py-0.5 rounded text-[10px] font-bold">Approved</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
