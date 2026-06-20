export interface SearchItem {
  type: "Scene" | "Cast" | "Prop" | "Vendor";
  label: string;
  sublabel: string;
  url: string;
}

export const SEARCH_INDEX: SearchItem[] = [
  // Scenes
  { type: "Scene", label: "Sc 12 — Palace Interior", sublabel: "INT · DAY · Palace", url: "/scenes/12" },
  { type: "Scene", label: "Sc 23 — Flashback Village", sublabel: "EXT · DAY · Village", url: "/scenes/23" },
  { type: "Scene", label: "Sc 34 — Rajahmundry Market", sublabel: "EXT · DAY · Market", url: "/scenes/34" },
  { type: "Scene", label: "Sc 41 — Confrontation", sublabel: "INT · NIGHT · Hideout", url: "/scenes/41" },
  { type: "Scene", label: "Sc 55 — Wedding Sequence", sublabel: "EXT · DAY · Temple", url: "/scenes/55" },
  { type: "Scene", label: "Sc 67 — Chase Scene", sublabel: "EXT · DAY · Streets", url: "/scenes/67" },
  { type: "Scene", label: "Sc 71 — Hospital", sublabel: "INT · NIGHT · Hospital", url: "/scenes/71" },
  { type: "Scene", label: "Sc 78 — Boat Fight", sublabel: "EXT · DAY · River", url: "/scenes/78" },
  { type: "Scene", label: "Sc 89 — Final Reveal", sublabel: "INT · NIGHT · Palace", url: "/scenes/89" },
  { type: "Scene", label: "Sc 103 — Climax", sublabel: "EXT · DAY · Cliff", url: "/scenes/103" },

  // Cast & crew
  { type: "Cast", label: "Koratala Siva", sublabel: "Director · Direction", url: "/team" },
  { type: "Cast", label: "Karan Johar", sublabel: "Producer · Production", url: "/team" },
  { type: "Cast", label: "Priya Menon", sublabel: "Line Producer · Production", url: "/team" },
  { type: "Cast", label: "Ravi Shankar", sublabel: "Assistant Director · Direction", url: "/team" },
  { type: "Cast", label: "Anita Bose", sublabel: "Script Supervisor · Continuity", url: "/team" },
  { type: "Cast", label: "Arjun Finance", sublabel: "Accountant · Finance", url: "/team" },
  { type: "Cast", label: "Meena Das", sublabel: "Cashier · Finance", url: "/team" },
  { type: "Cast", label: "Suresh Kumar", sublabel: "Production Manager · Logistics", url: "/team" },
  { type: "Cast", label: "Ramesh Babu", sublabel: "Cinematographer (DOP) · Camera", url: "/team" },
  { type: "Cast", label: "Vandana Reddy", sublabel: "Production Designer · Art", url: "/team" },
  { type: "Cast", label: "Deepa Nair", sublabel: "Costume Designer · Costume", url: "/team" },
  { type: "Cast", label: "Kartik Sood", sublabel: "Editor · Post Production", url: "/team" },
  { type: "Cast", label: "N.T. Rama Rao Jr.", sublabel: "Karna · Lead Cast", url: "/team" },
  { type: "Cast", label: "Saif Ali Khan", sublabel: "Vikram Shetty · Lead Cast", url: "/team" },

  // Props
  { type: "Prop", label: "Merchant Cart", sublabel: "Art Dept · Scenes 34, 35", url: "/breakdown" },
  { type: "Prop", label: "Fish Boxes (×12)", sublabel: "Art Dept · Scene 34", url: "/breakdown" },
  { type: "Prop", label: "Boat Rope (Hemp, 30m)", sublabel: "Art Dept · Scenes 34, 78", url: "/breakdown" },
  { type: "Prop", label: "Wooden Crates (×6)", sublabel: "Art Dept · Scene 34", url: "/breakdown" },
  { type: "Prop", label: "Palace Throne", sublabel: "Art Dept · Scene 12", url: "/breakdown" },
  { type: "Prop", label: "Hero Sword (Ancient)", sublabel: "Art Dept · Scenes 41, 78, 103", url: "/breakdown" },
  { type: "Prop", label: "NTR White Kurta + Gold Trim", sublabel: "Costume · Scenes 34, 35, 41, 55", url: "/breakdown" },
  { type: "Prop", label: "Saif Villain Coat", sublabel: "Costume · Scenes 34, 35, 41", url: "/breakdown" },

  // Vendors
  { type: "Vendor", label: "Roja Art Works", sublabel: "Art · ₹3,20,000 outstanding", url: "/vendors" },
  { type: "Vendor", label: "SunTech Equipment", sublabel: "Equipment · Flagged", url: "/vendors" },
  { type: "Vendor", label: "Krishna Catering Services", sublabel: "Catering", url: "/vendors" },
  { type: "Vendor", label: "AP Location Services", sublabel: "Location · Flagged", url: "/vendors" },
  { type: "Vendor", label: "Costume House HYD", sublabel: "Costume", url: "/vendors" },
  { type: "Vendor", label: "VFX Studio Mumbai", sublabel: "VFX", url: "/vendors" },
  { type: "Vendor", label: "Galaxy Transport", sublabel: "Transport", url: "/vendors" },
  { type: "Vendor", label: "Pixion Studios", sublabel: "VFX", url: "/vendors" },
];

export function searchIndex(query: string, limit = 8): SearchItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return SEARCH_INDEX.filter(
    item =>
      item.label.toLowerCase().includes(q) ||
      item.sublabel.toLowerCase().includes(q) ||
      item.type.toLowerCase().includes(q)
  ).slice(0, limit);
}
