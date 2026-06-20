import type { Role } from "@/components/layout/RoleContext";

export interface Notification {
  id: string;
  title: string;
  body: string;
  time: string;
  tone: "info" | "warning" | "destructive" | "success";
  unread?: boolean;
}

const DEFAULT_NOTIFICATIONS: Notification[] = [
  { id: "d1", title: "Scene 34 breakdown locked", body: "Confidence 94% — ready for scheduling.", time: "10m ago", tone: "success", unread: true },
  { id: "d2", title: "New discussion thread", body: "Costume sign-off requested on Scene 34.", time: "1h ago", tone: "info", unread: true },
  { id: "d3", title: "Budget variance flagged", body: "Art department is 12% over estimate.", time: "3h ago", tone: "warning" },
];

const ROLE_NOTIFICATIONS: Record<Exclude<Role, null>, Notification[]> = {
  Producer: [
    { id: "p1", title: "Greenlight risk escalated", body: "Star cast date clash flagged for Days 40-45.", time: "20m ago", tone: "destructive", unread: true },
    { id: "p2", title: "Budget health update", body: "₹142Cr spent of ₹165Cr — 86% utilized.", time: "1h ago", tone: "info", unread: true },
    { id: "p3", title: "Distribution deal update", body: "APAC overseas deal moved to negotiation.", time: "5h ago", tone: "warning" },
    { id: "p4", title: "Insurance renewal confirmed", body: "VFX-heavy shoot block now covered.", time: "1d ago", tone: "success" },
  ],
  Director: [
    { id: "dir1", title: "Continuity alert", body: "Scene 67 scar visibility flagged across shots.", time: "15m ago", tone: "destructive", unread: true },
    { id: "dir2", title: "Costume sign-off needed", body: "Extras' muted-tone sketches awaiting approval.", time: "45m ago", tone: "warning", unread: true },
    { id: "dir3", title: "Scene 41 locked", body: "Confrontation scene marked ready for shoot.", time: "2h ago", tone: "success" },
    { id: "dir4", title: "Revision request closed", body: "Scene 12 palace blocking note resolved.", time: "1d ago", tone: "info" },
  ],
  "Line Producer": [
    { id: "lp1", title: "Vendor payment overdue", body: "Apex Generators — ₹1.8L overdue.", time: "30m ago", tone: "destructive", unread: true },
    { id: "lp2", title: "Resource conflict resolved", body: "Crane availability confirmed for Day 26.", time: "2h ago", tone: "success", unread: true },
    { id: "lp3", title: "Budget variance", body: "Overall burn -2% under plan this week.", time: "4h ago", tone: "info" },
  ],
  AD: [
    { id: "ad1", title: "Cast delay flagged", body: "Saif Ali Khan — flight delay +1hr today.", time: "10m ago", tone: "warning", unread: true },
    { id: "ad2", title: "Issue raised", body: "Generator 2 noise — sound dept complaining.", time: "25m ago", tone: "destructive", unread: true },
    { id: "ad3", title: "Call sheet updated", body: "Day 23 call sheet republished with new times.", time: "1h ago", tone: "info" },
  ],
  Accountant: [
    { id: "ac1", title: "Invoice pending approval", body: "6 invoices awaiting sign-off this week.", time: "20m ago", tone: "warning", unread: true },
    { id: "ac2", title: "Expense variance", body: "Overall spend is +₹4.2Cr over estimate.", time: "3h ago", tone: "destructive", unread: true },
    { id: "ac3", title: "Reconciliation complete", body: "Day 22 books closed and balanced.", time: "1d ago", tone: "success" },
  ],
  Continuity: [
    { id: "co1", title: "New continuity alert", body: "Sc 41 dialogue revision — disregard takes 1-6.", time: "5m ago", tone: "destructive", unread: true },
    { id: "co2", title: "Alert resolved", body: "Sc 55 magic-hour material confirmed for cut.", time: "1h ago", tone: "success", unread: true },
    { id: "co3", title: "Character timeline updated", body: "NTR kurta sleeve continuity logged for Sc 34.", time: "4h ago", tone: "info" },
  ],
  Cashier: [
    { id: "ca1", title: "Receipt pending", body: "4 receipts still need to be filed today.", time: "15m ago", tone: "warning", unread: true },
    { id: "ca2", title: "Cash float balanced", body: "Today's float variance settled at ₹0.", time: "2h ago", tone: "success", unread: true },
    { id: "ca3", title: "Expense logged", body: "₹42,000 in expenses recorded for Day 23.", time: "3h ago", tone: "info" },
  ],
  "Production Manager": [
    { id: "pm1", title: "Permit pending", body: "1 of 6 location permits still awaiting confirmation.", time: "30m ago", tone: "warning", unread: true },
    { id: "pm2", title: "Vehicle fleet update", body: "8 of 10 vehicles active on site today.", time: "1h ago", tone: "info", unread: true },
    { id: "pm3", title: "Equipment utilization high", body: "Camera dept at 94% utilization this week.", time: "5h ago", tone: "success" },
  ],
  Cinematographer: [
    { id: "ci1", title: "Equipment confirmed", body: "Crane 50ft booked for Day 31 — Scene 103.", time: "40m ago", tone: "success", unread: true },
    { id: "ci2", title: "Lighting plan pending", body: "22 scenes still need lighting plans locked.", time: "2h ago", tone: "warning", unread: true },
    { id: "ci3", title: "Gear reserved", body: "Water housing reserved for Scene 78 boat fight.", time: "6h ago", tone: "info" },
  ],
  "Production Designer": [
    { id: "pd1", title: "Sourcing item missing", body: "Helicopter VFX prop still flagged as missing.", time: "25m ago", tone: "destructive", unread: true },
    { id: "pd2", title: "Set construction update", body: "Climax Cliff Facade now at 35% complete.", time: "3h ago", tone: "warning", unread: true },
    { id: "pd3", title: "Location dressed", body: "Rajahmundry Fish Market dressing complete.", time: "1d ago", tone: "success" },
  ],
  "Costume Designer": [
    { id: "cd1", title: "Continuity alert", body: "Saif costume revision — collar detail changed.", time: "10m ago", tone: "destructive", unread: true },
    { id: "cd2", title: "Fitting confirmed", body: "Antagonist 2 fitting confirmed for Oct 21.", time: "2h ago", tone: "success", unread: true },
    { id: "cd3", title: "Sketches awaiting sign-off", body: "Market extras costume sketches need approval.", time: "5h ago", tone: "warning" },
  ],
  Editor: [
    { id: "ed1", title: "New scene material received", body: "Scene 50 — Safehouse takes delivered.", time: "1h ago", tone: "info", unread: true },
    { id: "ed2", title: "VFX brief sent", body: "Background plate composite briefed to Red Chillies.", time: "3h ago", tone: "success", unread: true },
    { id: "ed3", title: "Cut review pending", body: "Director's Cut v2 awaiting review.", time: "1d ago", tone: "warning" },
  ],
};

export function getNotificationsForRole(role: Role): Notification[] {
  return role ? ROLE_NOTIFICATIONS[role] : DEFAULT_NOTIFICATIONS;
}
