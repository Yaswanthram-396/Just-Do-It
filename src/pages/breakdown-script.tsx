import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, Box, MapPin, Shirt, Car, Zap, Swords, ArrowLeft,
  ChevronDown, ChevronRight, ChevronUp, Search, X, Lock,
  Download, RotateCcw, Activity, Sparkles, CheckCircle2, Calendar, HelpCircle
} from "lucide-react";
import { Input } from "@/components/ui/input";

// ─── Types ──────────────────────────────────────────────────────────────────

type Category = "Characters" | "Props" | "Locations" | "Costumes" | "Vehicles" | "VFX" | "Stunts";
type BlockType = "scene-heading" | "action" | "character" | "dialogue" | "parenthetical" | "transition";

interface ScriptBlock {
  id: string;
  type: BlockType;
  text: string;
  sceneNum?: string;
  elements: string[];
}

interface ElementDef {
  id: string;
  name: string;
  category: Category;
  status: string;
  department: string;
  searchTerms: string[];
  detail?: Record<string, string>;
}

interface BreakdownElement extends ElementDef {
  occurrences: string[];
}

// ─── Category Config ─────────────────────────────────────────────────────────

const CAT_CFG: Record<Category, { color: string; bg: string; icon: React.ElementType; label: string }> = {
  Characters: { color: "#FBBF24", bg: "rgba(245,158,11,0.15)", icon: Users, label: "Characters" },
  Props: { color: "#2DD4BF", bg: "rgba(20,184,166,0.15)", icon: Box, label: "Props" },
  Locations: { color: "#FB923C", bg: "rgba(249,115,22,0.15)", icon: MapPin, label: "Locations" },
  Costumes: { color: "#A78BFA", bg: "rgba(139,92,246,0.15)", icon: Shirt, label: "Costumes" },
  Vehicles: { color: "#F472B6", bg: "rgba(236,72,153,0.15)", icon: Car, label: "Vehicles" },
  VFX: { color: "#60A5FA", bg: "rgba(59,130,246,0.15)", icon: Zap, label: "VFX" },
  Stunts: { color: "#F87171", bg: "rgba(239,68,68,0.15)", icon: Swords, label: "Stunts" },
};

const CAT_ORDER: Category[] = ["Characters", "Props", "Locations", "Costumes", "Vehicles", "VFX", "Stunts"];

// ─── Screenplay Data ──────────────────────────────────────────────────────────

const SCRIPT_BLOCKS: ScriptBlock[] = [
  { id: "b1", type: "scene-heading", text: "EXT. VILLAGE ROAD — NIGHT", sceneNum: "33", elements: ["loc-road"] },
  { id: "b2", type: "action", text: "A lone torch flickers on the dusty road. KARNA walks alone, cloak drawn tight, eyes scanning the dark horizon ahead.", elements: ["char-ntr", "cos-cloak"] },
  { id: "b3", type: "character", text: "KARNA", elements: ["char-ntr"] },
  { id: "b4", type: "dialogue", text: "The merchant knows more than he lets on.", elements: ["char-ntr"] },
  { id: "b5", type: "transition", text: "CUT TO:", elements: [] },

  { id: "b6", type: "scene-heading", text: "EXT. RAJAHMUNDRY FISH MARKET — DAY", sceneNum: "34", elements: ["loc-market"] },
  { id: "b7", type: "action", text: "The market bursts with life. Fishermen haul their catch. A MERCHANT CART loaded with silver fish blocks the central lane.", elements: ["prop-cart", "loc-market"] },
  { id: "b8", type: "action", text: "KARNA moves through the crowd. He wears a crisp WHITE KURTA with fine GOLD TRIM — he stands apart from the merchants.", elements: ["char-ntr", "cos-kurta"] },
  { id: "b9", type: "action", text: "VIKRAM SHETTY watches from the shadows near WOODEN CRATES stacked against the wall. His VILLAIN'S COAT is dark against the bright stalls.", elements: ["char-saif", "prop-crates", "cos-coat", "loc-market"] },
  { id: "b10", type: "action", text: "KARNA approaches the MERCHANT CART. Reaches beneath — pulls out a ROLLED ROPE hidden under FISH BOXES.", elements: ["char-ntr", "prop-cart", "prop-rope", "prop-fishboxes"] },
  { id: "b11", type: "character", text: "KARNA", elements: ["char-ntr"] },
  { id: "b12", type: "dialogue", text: "Delivered on time. Good.", elements: ["char-ntr"] },
  { id: "b13", type: "action", text: "The crowd surges. MERCHANTS freeze. VIKRAM SHETTY steps forward — casual, dangerous. Between them only the MERCHANT CART.", elements: ["char-saif", "prop-cart", "loc-market"] },
  { id: "b14", type: "character", text: "VIKRAM SHETTY", elements: ["char-saif"] },
  { id: "b15", type: "dialogue", text: "You shouldn't have come here, Karna. Not in daylight.", elements: ["char-saif"] },
  { id: "b16", type: "action", text: "KARNA grips the BOAT ROPE. The MERCHANT CART between them becomes the only barrier.", elements: ["char-ntr", "prop-rope", "prop-cart"] },
  { id: "b17", type: "character", text: "KARNA", elements: ["char-ntr"] },
  { id: "b18", type: "dialogue", text: "Then you shouldn't have made deals with my enemy.", elements: ["char-ntr"] },
  { id: "b19", type: "action", text: "VFX: AERIAL DRONE SHOT — the market seen from above, the crowd circling around the two men.", elements: ["vfx-drone", "loc-market"] },
  { id: "b20", type: "action", text: "VIKRAM lunges. KARNA vaults over the MERCHANT CART. FISH BOXES scatter — wet, chaotic. STUNT sequence begins.", elements: ["char-saif", "char-ntr", "prop-cart", "prop-fishboxes", "stunt-vault"] },
  { id: "b21", type: "action", text: "VFX: CROWD EXTENSION — the market fills with hundreds of fleeing figures as the brawl spills outward.", elements: ["vfx-crowd", "loc-market"] },
  { id: "b22", type: "action", text: "KARNA sprints through the stalls. His WHITE KURTA catches the light — a flash of white in the chaos.", elements: ["char-ntr", "cos-kurta"] },
  { id: "b23", type: "character", text: "VIKRAM SHETTY", elements: ["char-saif"] },
  { id: "b24", type: "dialogue", text: "Stop him! Do not let him reach the river!", elements: ["char-saif"] },
  { id: "b25", type: "action", text: "GUARDS pour from the alleys. STUNT: Guard pursuit sequence — narrow lanes, overturned WOODEN CRATES, FISH BOXES underfoot.", elements: ["prop-crates", "prop-fishboxes", "stunt-chase"] },
  { id: "b26", type: "action", text: "KARNA uses the BOAT ROPE to swing across a gap between rooftops. An impossible, graceful arc.", elements: ["char-ntr", "prop-rope", "stunt-ropeswing"] },
  { id: "b27", type: "character", text: "KARNA", elements: ["char-ntr"] },
  { id: "b28", type: "parenthetical", text: "(under breath)", elements: [] },
  { id: "b29", type: "dialogue", text: "See you at the palace, Vikram.", elements: ["char-ntr"] },
  { id: "b30", type: "transition", text: "SMASH CUT TO:", elements: [] },

  { id: "b31", type: "scene-heading", text: "EXT. RAJAHMUNDRY FISH MARKET — MOMENTS LATER", sceneNum: "35", elements: ["loc-market"] },
  { id: "b32", type: "action", text: "The aftermath. Overturned MERCHANT CART. FISH BOXES everywhere. VIKRAM SHETTY stands in the center of chaos, still.", elements: ["prop-cart", "prop-fishboxes", "char-saif", "loc-market"] },
  { id: "b33", type: "action", text: "VIKRAM picks up a frayed BOAT ROPE — examines it. Understands. His VILLAIN'S COAT is splashed with market water.", elements: ["char-saif", "prop-rope", "cos-coat"] },
  { id: "b34", type: "character", text: "VIKRAM SHETTY", elements: ["char-saif"] },
  { id: "b35", type: "dialogue", text: "He knew the rope was there. This was a message.", elements: ["char-saif"] },
  { id: "b36", type: "transition", text: "CUT TO:", elements: [] },

  { id: "b37", type: "scene-heading", text: "INT. PALACE INTERIOR — NIGHT", sceneNum: "41", elements: ["loc-palace"] },
  { id: "b38", type: "action", text: "A CHANDELIER casts dramatic shadows across the throne room. KARNA stands before the massive PALACE THRONE in a fresh WHITE KURTA, the GOLD TRIM glinting.", elements: ["char-ntr", "cos-kurta", "loc-palace", "prop-throne"] },
  { id: "b39", type: "action", text: "VIKRAM SHETTY enters. His VILLAIN'S COAT now repaired. Six GUARDS flank him across the stone floor.", elements: ["char-saif", "cos-coat", "loc-palace"] },
  { id: "b40", type: "character", text: "VIKRAM SHETTY", elements: ["char-saif"] },
  { id: "b41", type: "dialogue", text: "Bold of you. Walking into my house.", elements: ["char-saif"] },
  { id: "b42", type: "character", text: "KARNA", elements: ["char-ntr"] },
  { id: "b43", type: "dialogue", text: "Your house? This palace was never yours, Vikram. Not since that night.", elements: ["char-ntr"] },
  { id: "b44", type: "action", text: "KARNA draws his HERO SWORD with a slow, deliberate arc. The ancient blade catches the chandelier light.", elements: ["char-ntr", "prop-sword", "stunt-sworddraw", "loc-palace"] },
  { id: "b45", type: "action", text: "VFX: SLOW MOTION — sword-drawn freeze frame. Ancient inscriptions glow faintly along the blade.", elements: ["vfx-slowmo", "prop-sword"] },
  { id: "b46", type: "action", text: "VIKRAM steps back. He recognizes the HERO SWORD. His VILLAIN'S COAT shifts as the realization crosses his face.", elements: ["char-saif", "prop-sword", "cos-coat"] },
  { id: "b47", type: "character", text: "VIKRAM SHETTY", elements: ["char-saif"] },
  { id: "b48", type: "dialogue", text: "That sword... it cannot be. The palace was burned.", elements: ["char-saif"] },
  { id: "b49", type: "character", text: "KARNA", elements: ["char-ntr"] },
  { id: "b50", text: "The sword survives. As I survived. Let's finish this.", type: "dialogue", elements: ["char-ntr", "prop-sword"] },
  { id: "b51", type: "action", text: "STUNT SEQUENCE: KARNA vs. SIX GUARDS — high-intensity palace combat. KARNA's WHITE KURTA tears at the sleeve.", elements: ["char-ntr", "cos-kurta", "stunt-combat", "loc-palace"] },
  { id: "b52", type: "action", text: "VIKRAM SHETTY retreats toward the rear PALACE archway. The VILLAIN'S COAT catches the torchlight dramatically.", elements: ["char-saif", "cos-coat", "loc-palace"] },
  { id: "b53", type: "transition", text: "FADE TO BLACK.", elements: [] },
];

// ─── Breakdown Element Definitions ──────────────────────────────────────────

const ELEMENT_DEFS: ElementDef[] = [
  { id: "char-ntr", name: "Karna (NTR Jr.)", category: "Characters", status: "Ready", department: "Casting", searchTerms: ["KARNA"], detail: { "Actor": "N.T. Rama Rao Jr.", "Shoot Days": "38", "Scenes": "23", "Costumes": "3 variations" } },
  { id: "char-saif", name: "Vikram Shetty (Saif)", category: "Characters", status: "Ready", department: "Casting", searchTerms: ["VIKRAM SHETTY", "VIKRAM"], detail: { "Actor": "Saif Ali Khan", "Shoot Days": "14", "Scenes": "9", "Costumes": "1 primary" } },
  { id: "prop-cart", name: "Merchant Cart", category: "Props", status: "Ready", department: "Art Dept", searchTerms: ["MERCHANT CART"], detail: { "Vendor": "Roja Art Works", "Scenes": "34, 35", "Cost": "₹40,000", "Status": "Delivered" } },
  { id: "prop-fishboxes", name: "Fish Boxes (×12)", category: "Props", status: "Ready", department: "Art Dept", searchTerms: ["FISH BOXES", "FISH BOX"], detail: { "Vendor": "Local Market HYD", "Scenes": "34, 35", "Cost": "₹8,000", "Status": "Confirmed" } },
  { id: "prop-rope", name: "Boat Rope (Hemp, 30m)", category: "Props", status: "Sourcing", department: "Art Dept", searchTerms: ["BOAT ROPE", "ROLLED ROPE"], detail: { "Vendor": "Marine Supplies Vizag", "Scenes": "34, 35, 78", "Cost": "₹12,000", "Status": "Sourcing" } },
  { id: "prop-crates", name: "Wooden Crates (×6)", category: "Props", status: "Pending", department: "Art Dept", searchTerms: ["WOODEN CRATES", "WOODEN CRATE"], detail: { "Vendor": "Roja Art Works", "Scenes": "34", "Cost": "₹15,000", "Status": "Pending" } },
  { id: "prop-throne", name: "Palace Throne", category: "Props", status: "Built", department: "Art Dept", searchTerms: ["PALACE THRONE", "THRONE"], detail: { "Vendor": "Custom Carpentry", "Scenes": "41", "Cost": "₹1,80,000", "Status": "Delivered" } },
  { id: "prop-sword", name: "Hero Sword (Ancient)", category: "Props", status: "Ready", department: "Art Dept", searchTerms: ["HERO SWORD", "THE SWORD", "SWORD"], detail: { "Vendor": "Props Unlimited", "Scenes": "41, 78, 103", "Cost": "₹55,000", "Status": "Ready" } },
  { id: "loc-market", name: "Rajahmundry Fish Market", category: "Locations", status: "Ready", department: "Locations", searchTerms: ["FISH MARKET", "MARKET"], detail: { "Address": "Rajahmundry, AP", "Permit": "Confirmed", "Shoot Days": "Day 31–32", "Day/Night": "Day only" } },
  { id: "loc-palace", name: "Palace Interior", category: "Locations", status: "Ready", department: "Locations", searchTerms: ["PALACE INTERIOR", "PALACE"], detail: { "Address": "Studio Set — Stage 4", "Permit": "N/A", "Shoot Days": "Day 23, 25, 41", "Day/Night": "Night (artificial)" } },
  { id: "loc-road", name: "Village Road", category: "Locations", status: "Scouted", department: "Locations", searchTerms: ["VILLAGE ROAD"], detail: { "Address": "Undi, AP", "Permit": "Pending", "Shoot Days": "Day 20", "Day/Night": "Night" } },
  { id: "cos-kurta", name: "NTR White Kurta + Gold Trim", category: "Costumes", status: "Ready", department: "Costume", searchTerms: ["WHITE KURTA", "GOLD TRIM", "KURTA"], detail: { "Designer": "Priya Menon", "Scenes": "34, 35, 41, 55", "Fittings": "3 done", "Sets": "4 identical" } },
  { id: "cos-coat", name: "Saif Villain Coat", category: "Costumes", status: "In Progress", department: "Costume", searchTerms: ["VILLAIN'S COAT", "VILLAIN COAT"], detail: { "Designer": "Priya Menon", "Scenes": "34, 35, 41", "Fittings": "2 done", "Sets": "2 (hero + damaged)" } },
  { id: "cos-cloak", name: "Karna Cloak", category: "Costumes", status: "Ready", department: "Costume", searchTerms: ["CLOAK"], detail: { "Designer": "Priya Menon", "Scenes": "33", "Fittings": "1 done", "Sets": "1" } },
  { id: "vfx-drone", name: "Aerial Drone Shot", category: "VFX", status: "Scheduled", department: "VFX", searchTerms: ["AERIAL DRONE"], detail: { "Vendor": "DQ Entertainment", "Scenes": "34", "Complexity": "Medium", "Delivery": "Day 60" } },
  { id: "vfx-crowd", name: "Market Crowd Extension", category: "VFX", status: "In Progress", department: "VFX", searchTerms: ["CROWD EXTENSION"], detail: { "Vendor": "Pixion Studios", "Scenes": "34", "Complexity": "High", "Delivery": "Day 65" } },
  { id: "vfx-slowmo", name: "Sword Draw Slow-Motion", category: "VFX", status: "Planned", department: "VFX", searchTerms: ["SLOW MOTION"], detail: { "Vendor": "Red Chillies VFX", "Scenes": "41", "Complexity": "Low", "Delivery": "Day 55" } },
  { id: "stunt-vault", name: "Cart Vault Over", category: "Stunts", status: "Rehearsed", department: "Action", searchTerms: ["VAULTS"], detail: { "Coordinator": "Vijay S.", "Scenes": "34", "Risk": "Medium", "Rehearsals": "4 done" } },
  { id: "stunt-chase", name: "Market Pursuit Sequence", category: "Stunts", status: "Rehearsed", department: "Action", searchTerms: ["PURSUIT SEQUENCE", "PURSUIT"], detail: { "Coordinator": "Vijay S.", "Scenes": "34", "Risk": "High", "Rehearsals": "6 done" } },
  { id: "stunt-ropeswing", name: "Rooftop Rope Swing", category: "Stunts", status: "In Progress", department: "Action", searchTerms: ["ROPE TO SWING", "SWING ACROSS"], detail: { "Coordinator": "Vijay S.", "Scenes": "34", "Risk": "High", "Rehearsals": "2 done" } },
  { id: "stunt-sworddraw", name: "Sword Draw Reveal", category: "Stunts", status: "Locked", department: "Action", searchTerms: ["DRAWS HIS HERO"], detail: { "Coordinator": "Vijay S.", "Scenes": "41", "Risk": "Low", "Rehearsals": "Done" } },
  { id: "stunt-combat", name: "Palace Combat (1 vs 6)", category: "Stunts", status: "In Rehearsal", department: "Action", searchTerms: ["PALACE COMBAT", "KARNA VS."], detail: { "Coordinator": "Vijay S.", "Scenes": "41", "Risk": "High", "Rehearsals": "3 done" } },
];

// ─── Derive occurrences from blocks ──────────────────────────────────────────

const BREAKDOWN_ELEMENTS: BreakdownElement[] = ELEMENT_DEFS.map(def => ({
  ...def,
  occurrences: SCRIPT_BLOCKS.filter(b => b.elements.includes(def.id)).map(b => b.id),
}));

// ─── Text highlight helper ───────────────────────────────────────────────────

function renderHighlightedText(
  text: string,
  blockId: string,
  allElements: BreakdownElement[],
  selectedId: string | null,
  onTermClick: (elementId: string, blockId: string) => void
): React.ReactNode {
  const blockEls = allElements.filter(e => e.occurrences.includes(blockId));
  if (blockEls.length === 0) return text;

  const termPairs: Array<{ term: string; elId: string }> = [];
  for (const el of blockEls) {
    for (const t of el.searchTerms) termPairs.push({ term: t, elId: el.id });
  }
  termPairs.sort((a, b) => b.term.length - a.term.length);

  const escaped = termPairs.map(p => p.term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  if (!escaped.length) return text;
  const regex = new RegExp(`(${escaped.join("|")})`, "gi");
  const parts = text.split(regex);

  const highlights: Record<Category, { text: string; bg: string }> = {
    Characters: { text: "#FBBF24", bg: "rgba(245,158,11,0.18)" },
    Props: { text: "#2DD4BF", bg: "rgba(20,184,166,0.18)" },
    Locations: { text: "#FB923C", bg: "rgba(249,115,22,0.18)" },
    Costumes: { text: "#A78BFA", bg: "rgba(139,92,246,0.18)" },
    Vehicles: { text: "#F472B6", bg: "rgba(236,72,153,0.18)" },
    VFX: { text: "#60A5FA", bg: "rgba(59,130,246,0.18)" },
    Stunts: { text: "#F87171", bg: "rgba(239,68,68,0.18)" },
  };

  return parts.map((part, i) => {
    if (i % 2 === 0) return part;
    const pair = termPairs.find(p => p.term.toLowerCase() === part.toLowerCase());
    if (!pair) return part;
    const el = allElements.find(e => e.id === pair.elId)!;
    const cfg = highlights[el.category];
    const isSelected = el.id === selectedId;
    return (
      <span
        key={i}
        onClick={e => { e.stopPropagation(); onTermClick(pair.elId, blockId); }}
        className="cursor-pointer px-1 py-0.5 rounded transition-all duration-150 font-medium inline-block"
        style={{
          backgroundColor: cfg.bg,
          color: cfg.text,
          border: isSelected ? `1px solid ${cfg.text}` : `1px solid transparent`,
          boxShadow: isSelected ? `0 0 0 2px ${cfg.bg}` : undefined
        }}
        title={`${el.name} — click to select`}
      >
        {part}
      </span>
    );
  });
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function BreakdownScript() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [occurrenceIdx, setOccurrenceIdx] = useState(0);

  // Accordions: Only one active category expanded at a time.
  const [activeCat, setActiveCat] = useState<Category | null>("Characters");
  const [flashBlockId, setFlashBlockId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const blockRefs = useRef<Map<string, HTMLElement>>(new Map());
  const sidebarItemRefs = useRef<Map<string, HTMLElement>>(new Map());
  const scriptScrollRef = useRef<HTMLDivElement>(null);
  const sidebarScrollRef = useRef<HTMLDivElement>(null);

  const selectedElement = useMemo(
    () => BREAKDOWN_ELEMENTS.find(e => e.id === selectedId) ?? null,
    [selectedId]
  );
  const currentBlockId = selectedElement?.occurrences[occurrenceIdx] ?? null;

  // Scroll screenplay to a block and flash it
  const scrollToBlock = useCallback((blockId: string) => {
    const el = blockRefs.current.get(blockId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      setFlashBlockId(blockId);
      setTimeout(() => setFlashBlockId(null), 1600);
    }
  }, []);

  // Scroll sidebar to the selected element
  const scrollSidebarToElement = useCallback((elementId: string) => {
    const el = sidebarItemRefs.current.get(elementId);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, []);

  // Select an element and optionally jump to a specific occurrence block
  const selectElement = useCallback(
    (elementId: string, blockId?: string) => {
      const el = BREAKDOWN_ELEMENTS.find(e => e.id === elementId);
      if (!el) return;
      const idx = blockId ? Math.max(0, el.occurrences.indexOf(blockId)) : 0;
      setSelectedId(elementId);
      setOccurrenceIdx(idx);
      setActiveCat(el.category);
      setTimeout(() => scrollToBlock(el.occurrences[idx]), 50);
      setTimeout(() => scrollSidebarToElement(elementId), 80);
    },
    [scrollToBlock, scrollSidebarToElement]
  );

  const navigateOccurrence = useCallback(
    (dir: 1 | -1) => {
      if (!selectedElement) return;
      const next = Math.max(0, Math.min(selectedElement.occurrences.length - 1, occurrenceIdx + dir));
      setOccurrenceIdx(next);
      scrollToBlock(selectedElement.occurrences[next]);
    },
    [selectedElement, occurrenceIdx, scrollToBlock]
  );

  // When occurrence changes after sidebar click, scroll to it
  useEffect(() => {
    if (currentBlockId) scrollToBlock(currentBlockId);
  }, [currentBlockId]); // eslint-disable-line react-hooks/exhaustive-deps

  // Minimap markers
  const minimapMarkers = useMemo(
    () =>
      BREAKDOWN_ELEMENTS.flatMap(el =>
          el.occurrences.map((blockId, oIdx) => ({
            elementId: el.id,
            blockId,
            oIdx,
            y: (SCRIPT_BLOCKS.findIndex(b => b.id === blockId) / (SCRIPT_BLOCKS.length - 1)) * 100,
            color: CAT_CFG[el.category].color,
            name: el.name,
          }))
      ),
    []
  );

  const filteredElements = useMemo(() => {
    if (!search) return BREAKDOWN_ELEMENTS;
    const q = search.toLowerCase();
    return BREAKDOWN_ELEMENTS.filter(e => e.name.toLowerCase().includes(q) || e.category.toLowerCase().includes(q));
  }, [search]);

  const groupedElements = useMemo(() => {
    const map = new Map<Category, BreakdownElement[]>();
    for (const cat of CAT_ORDER) map.set(cat, []);
    for (const el of filteredElements) map.get(el.category)?.push(el);
    return map;
  }, [filteredElements]);

  const statusBadgeBg = (s: string) => {
    if (s === "Ready" || s === "Built" || s === "Locked" || s === "Rehearsed") return "bg-green-500/10 text-green-400 border border-green-500/20";
    if (s === "In Progress" || s === "Scheduled" || s === "Sourced" || s === "Scouted" || s === "In Rehearsal") return "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20";
    if (s === "Pending" || s === "Sourcing" || s === "Planned") return "bg-red-500/10 text-red-400 border border-red-500/20";
    return "bg-muted text-muted-foreground border border-transparent";
  };

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] bg-background text-foreground font-sans">

      {/* ── Header ──────────────────────────────────────────────────── */}
      <header className="h-16 border-b border-border flex items-center justify-between px-6 shrink-0 bg-card/95 backdrop-blur z-20 shadow-lg">
        <div className="flex items-center gap-4">
          <Link href="/breakdown" className="text-muted-foreground hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-primary uppercase tracking-wider">DEVARA PART 2</span>
            <span className="text-[10px] text-muted-foreground font-medium leading-none">Script v1.2</span>
          </div>
          <span className="text-border">|</span>
          <span className="px-2.5 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded-full uppercase tracking-wider border border-primary/20">
            Breakdown Studio Active
          </span>

          {/* Header KPI Chips */}
          <div className="hidden lg:flex items-center gap-2.5 ml-6">
            <div className="flex items-center gap-1.5 bg-background border border-border px-2.5 py-1 rounded-lg text-xs font-semibold text-muted-foreground">
              <Users className="w-3.5 h-3.5 text-amber-400" />
              <span>Characters: {BREAKDOWN_ELEMENTS.filter(e => e.category === "Characters").length}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-background border border-border px-2.5 py-1 rounded-lg text-xs font-semibold text-muted-foreground">
              <Box className="w-3.5 h-3.5 text-teal-400" />
              <span>Props: {BREAKDOWN_ELEMENTS.filter(e => e.category === "Props").length}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-background border border-border px-2.5 py-1 rounded-lg text-xs font-semibold text-muted-foreground">
              <MapPin className="w-3.5 h-3.5 text-orange-400" />
              <span>Locations: {BREAKDOWN_ELEMENTS.filter(e => e.category === "Locations").length}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative hidden md:block">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input className="h-9 pl-9 text-xs w-48 bg-background border-border focus-visible:ring-1 focus-visible:ring-primary rounded-xl font-medium" placeholder="Search script..." />
          </div>

          <div className="flex items-center gap-2">
            <button className="h-9 px-3.5 rounded-xl border border-border bg-card text-xs font-semibold text-muted-foreground hover:text-white hover:bg-neutral-800 transition-all flex items-center gap-1.5">
              <Download className="w-3.5 h-3.5 text-muted-foreground" /> Export
            </button>
            <button className="h-9 px-3.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/95 transition-all flex items-center gap-1.5 shadow-sm">
              <Lock className="w-3.5 h-3.5" /> Lock Breakdown
            </button>
          </div>
        </div>
      </header>

      {/* Helper Guide Banner */}
      <div className="shrink-0 bg-[#0B1728] border-b border-border py-2 px-6 flex items-center gap-2 text-xs text-muted-foreground select-none">
        <HelpCircle className="w-4 h-4 text-primary shrink-0" />
        <span>
          <strong className="text-white">Interactive Studio Guide:</strong> Click any highlighted word inside the screenplay to inspect element metadata, navigate its occurrences, or modify assignments.
        </span>
      </div>

      {/* 16% Left Panel | 64% Screenplay Canvas | 20% Right Intelligence */}
      <div className="flex flex-1 min-h-0">

        {/* ── LEFT SIDEBAR (16% Width) ─────────────────────────────── */}
        <div className="w-[18%] min-w-[220px] shrink-0 border-r border-border flex flex-col bg-card">
          <div className="p-4 border-b border-border">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="h-9 pl-9 text-xs bg-background border-border rounded-xl focus-visible:ring-1 focus-visible:ring-primary font-medium"
                placeholder="Filter elements…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div ref={sidebarScrollRef} className="flex-1 overflow-y-auto py-2 px-2 space-y-1 select-none">
            {CAT_ORDER.map(cat => {
              const items = groupedElements.get(cat) ?? [];
              if (items.length === 0) return null;
              const cfg = CAT_CFG[cat];
              const isExpanded = activeCat === cat;
              const Icon = cfg.icon;

              return (
                <div key={cat} className="border border-transparent rounded-xl overflow-hidden transition-all duration-200">
                  <button
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 group ${isExpanded
                        ? "bg-primary/10 text-primary border border-primary/20"
                        : "hover:bg-background/40 text-muted-foreground hover:text-white"
                      }`}
                    onClick={() => setActiveCat(isExpanded ? null : cat)}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 shrink-0" style={{ color: isExpanded ? "#D4A64A" : cfg.color }} />
                      <span className="text-xs font-bold tracking-wide">{cfg.label}</span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${isExpanded ? "bg-primary/20 text-primary" : "bg-background text-muted-foreground border border-border"}`}>
                        {items.length}
                      </span>
                    </div>
                    {isExpanded ? <ChevronDown className="w-3.5 h-3.5 shrink-0" /> : <ChevronRight className="w-3.5 h-3.5 shrink-0" />}
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="overflow-hidden bg-background/20"
                      >
                        <div className="py-1.5 pl-2 pr-1 space-y-0.5">
                          {items.map(el => {
                            const isSelected = el.id === selectedId;
                            return (
                              <div
                                key={el.id}
                                ref={node => { if (node) sidebarItemRefs.current.set(el.id, node); }}
                                onClick={() => selectElement(el.id)}
                                className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-all duration-150 ${isSelected
                                    ? "bg-primary/20 text-primary font-semibold border border-primary/30"
                                    : "hover:bg-background/50 text-muted-foreground hover:text-white"
                                  }`}
                              >
                                <div className="flex items-center gap-2 min-w-0">
                                  <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: cfg.color }} />
                                  <span className="text-xs truncate">{el.name}</span>
                                </div>
                                <div className="flex items-center gap-1.5 shrink-0 ml-2">
                                  {isSelected && (
                                    <span className="text-[9px] font-extrabold px-1.5 rounded bg-primary/30 text-primary">
                                      {occurrenceIdx + 1}/{el.occurrences.length}
                                    </span>
                                  )}
                                  <span className="text-[9px] font-bold text-muted-foreground">{el.occurrences.length}</span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── CENTER: SCREENPLAY CANVAS (64% Width) ────────────────── */}
        <div className="w-[62%] flex-1 flex flex-col min-w-0 bg-background/50 relative overflow-hidden">

          {/* Active occurrence navigation slider */}
          <AnimatePresence>
            {selectedElement && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="shrink-0 border-b border-border bg-card overflow-hidden z-10 shadow-sm"
              >
                <div className="flex items-center justify-between px-6 py-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: CAT_CFG[selectedElement.category].color }} />
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Selected Element:</span>
                    <span className="text-xs font-extrabold" style={{ color: CAT_CFG[selectedElement.category].color }}>
                      {selectedElement.name}
                    </span>
                    <span className="text-[10px] text-primary font-semibold bg-primary/10 border border-primary/20 px-2.5 py-0.5 rounded-full">
                      Occurrence {occurrenceIdx + 1} of {selectedElement.occurrences.length}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => navigateOccurrence(-1)}
                      disabled={occurrenceIdx === 0}
                      className="h-7 w-7 rounded-lg flex items-center justify-center border border-border text-muted-foreground hover:text-white hover:bg-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => navigateOccurrence(1)}
                      disabled={occurrenceIdx >= selectedElement.occurrences.length - 1}
                      className="h-7 w-7 rounded-lg flex items-center justify-center border border-border text-muted-foreground hover:text-white hover:bg-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => { setSelectedId(null); setOccurrenceIdx(0); }}
                      className="h-7 w-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-white hover:bg-neutral-800 transition-colors ml-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Elegant script sheet scroll area */}
          <div className="flex-1 flex min-h-0 relative">
            <div ref={scriptScrollRef} className="flex-1 overflow-y-auto px-6 py-10 scroll-smooth">

              {/* Screenplay Desk Sheet Container */}
              <div className="max-w-[800px] mx-auto bg-[#132238]/90 border border-border rounded-[24px] shadow-2xl p-12 select-text">
                {SCRIPT_BLOCKS.map(block => {
                  const isActive = block.id === currentBlockId;
                  const hasAnyElement = block.elements.length > 0;
                  const containsSelected = selectedId ? block.elements.includes(selectedId) : false;

                  return (
                    <div
                      key={block.id}
                      ref={node => { if (node) blockRefs.current.set(block.id, node as HTMLElement); }}
                      onClick={() => {
                        if (block.elements.length > 0) {
                          selectElement(block.elements[0], block.id);
                        }
                      }}
                      className={`relative transition-all duration-200 group ${hasAnyElement ? "cursor-pointer" : ""} ${
                        isActive ? "bg-primary/5 border-l-4 border-l-primary pl-4 -ml-4 rounded-r" : ""
                      }`}
                    >
                      {/* Flash overlay */}
                      <AnimatePresence>
                        {flashBlockId === block.id && (
                          <motion.div
                            key="flash"
                            className="absolute inset-0 pointer-events-none rounded"
                            initial={{ backgroundColor: "rgba(212,166,74,0.2)" }}
                            animate={{ backgroundColor: "rgba(212,166,74,0)" }}
                            exit={{ backgroundColor: "rgba(212,166,74,0)" }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                          />
                        )}
                      </AnimatePresence>

                      {/* Screenplay Formatting */}
                      {block.type === "scene-heading" ? (
                        <div className="my-8 py-3.5 px-5 rounded-lg bg-gradient-to-r from-primary/10 to-transparent border-l-4 border-primary select-none">
                          <div className="text-[10px] font-bold text-primary tracking-widest uppercase mb-1 font-mono">SCENE {block.sceneNum}</div>
                          <div className="font-mono font-bold text-sm tracking-widest text-white uppercase">{block.text}</div>
                        </div>
                      ) : block.type === "character" ? (
                        <div className="text-center font-bold uppercase tracking-wider text-primary mt-7 mb-1 text-[13px] select-none font-mono">
                          {renderHighlightedText(block.text, block.id, BREAKDOWN_ELEMENTS, selectedId, selectElement)}
                        </div>
                      ) : block.type === "dialogue" ? (
                        <div className="mx-auto text-center text-[15px] text-white max-w-[420px] leading-relaxed mb-5 font-mono">
                          {renderHighlightedText(block.text, block.id, BREAKDOWN_ELEMENTS, selectedId, selectElement)}
                        </div>
                      ) : block.type === "parenthetical" ? (
                        <div className="text-center text-muted-foreground italic text-[12px] max-w-[260px] mx-auto mb-1 select-none font-mono">
                          {block.text}
                        </div>
                      ) : block.type === "transition" ? (
                        <div className="text-right font-mono font-bold text-muted-foreground uppercase tracking-widest text-[10px] my-6 select-none">
                          {block.text}
                        </div>
                      ) : (
                        <div className="text-[15px] text-foreground/90 leading-[1.9] max-w-[700px] mx-auto text-justify my-4.5 font-mono">
                          {renderHighlightedText(block.text, block.id, BREAKDOWN_ELEMENTS, selectedId, selectElement)}
                        </div>
                      )}

                      {/* Gutter Indicators for highlighted assets */}
                      {hasAnyElement && !containsSelected && (
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                          {[...new Set(block.elements.map(id => {
                            const el = BREAKDOWN_ELEMENTS.find(e => e.id === id);
                            return el?.category;
                          }))].filter(Boolean).map(cat => (
                            <div key={cat} className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: CAT_CFG[cat as Category].color }} />
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Screenplay Minimap Column */}
            <div className="w-6 shrink-0 relative border-l border-border bg-card select-none">
              {minimapMarkers.map((m, i) => (
                <button
                  key={i}
                  title={`${m.name}`}
                  onClick={() => selectElement(m.elementId, m.blockId)}
                  className="absolute left-[7px] w-2.5 h-1 rounded-full hover:scale-150 transition-transform duration-100"
                  style={{ top: `${m.y}%`, backgroundColor: m.color, opacity: selectedId === m.elementId ? 1 : 0.3 }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL: INTELLIGENCE PANEL (20% Width) ──────────── */}
        <div className="w-[20%] min-w-[250px] shrink-0 border-l border-border flex flex-col bg-card">
          <div className="px-5 py-4 border-b border-border shrink-0 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Intelligence</span>
            </div>
            <span className="text-[9px] font-bold text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full">Pro Mode</span>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {selectedElement ? (
              <motion.div
                key={selectedElement.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                {/* CARD 1 - Selected Element */}
                <div className="border border-border rounded-[16px] p-4 bg-background shadow-sm space-y-3">
                  <div className="flex items-center gap-1.5">
                    {(() => { const I = CAT_CFG[selectedElement.category].icon; return <I className="w-3.5 h-3.5" style={{ color: CAT_CFG[selectedElement.category].color }} />; })()}
                    <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: CAT_CFG[selectedElement.category].color }}>
                      {selectedElement.category}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-white leading-tight">{selectedElement.name}</h3>
                    <p className="text-[10px] text-muted-foreground font-semibold mt-0.5">{selectedElement.department}</p>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-border/40">
                    <span className="text-xs font-bold text-muted-foreground">Status</span>
                    <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${statusBadgeBg(selectedElement.status)}`}>
                      {selectedElement.status}
                    </span>
                  </div>
                </div>

                {/* CARD 2 - AI Insights */}
                <div className="border border-border rounded-[16px] p-4 bg-background shadow-sm space-y-3">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">AI Insights</p>
                  <div className="space-y-2 text-[11px] font-medium text-foreground/80">
                    <div className="flex items-center gap-2">
                      <span className="text-green-400">✓</span>
                      <span>Appears in {selectedElement.occurrences.length} script lines</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-400">✓</span>
                      <span>Present in {selectedElement.detail?.["Scenes"] ? selectedElement.detail["Scenes"].split(",").length : 3} scenes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-400">✓</span>
                      <span>Shoot status: Confirmed</span>
                    </div>
                  </div>
                </div>

                {/* CARD 3 - Occurrences */}
                <div className="border border-border rounded-[16px] p-4 bg-background shadow-sm space-y-3">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Occurrences</p>
                  <div className="flex gap-1.5 flex-wrap">
                    {selectedElement.occurrences.map((blockId, i) => {
                      const block = SCRIPT_BLOCKS.find(b => b.id === blockId);
                      const sceneBlock = SCRIPT_BLOCKS.slice(0, SCRIPT_BLOCKS.findIndex(b => b.id === blockId) + 1).reverse().find(b => b.type === "scene-heading");
                      const active = i === occurrenceIdx;
                      return (
                        <button
                          key={i}
                          onClick={() => { setOccurrenceIdx(i); scrollToBlock(blockId); }}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all duration-150 border ${active
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-card border-border text-muted-foreground hover:bg-neutral-800"
                            }`}
                        >
                          {sceneBlock ? `Sc ${sceneBlock.sceneNum}` : `#${i + 1}`}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* CARD 4 - Production Details */}
                {selectedElement.detail && (
                  <div className="border border-border rounded-[16px] p-4 bg-background shadow-sm space-y-3">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Production Details</p>
                    <div className="space-y-2.5">
                      {Object.entries(selectedElement.detail).map(([k, v]) => (
                        <div key={k} className="flex justify-between items-center text-xs">
                          <span className="text-muted-foreground font-semibold">{k}</span>
                          <span className="font-semibold text-white text-right truncate ml-2 max-w-[120px]">{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* CARD 5 - Related Elements */}
                <div className="border border-border rounded-[16px] p-4 bg-background shadow-sm space-y-3">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Related Elements</p>
                  <div className="flex flex-wrap gap-1.5">
                    {BREAKDOWN_ELEMENTS
                      .filter(e => e.id !== selectedElement.id && e.occurrences.some(oId => selectedElement.occurrences.includes(oId)))
                      .slice(0, 5)
                      .map(rel => (
                        <button
                          key={rel.id}
                          onClick={() => selectElement(rel.id)}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-border bg-card text-[10px] font-semibold text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                        >
                          <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: CAT_CFG[rel.category].color }} />
                          <span>{rel.name}</span>
                        </button>
                      ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center py-20">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 shadow-sm">
                  <Sparkles className="w-6 h-6 text-primary animate-pulse" />
                </div>
                <p className="text-xs font-bold text-white">Breakdown Intelligence</p>
                <p className="text-[10px] text-muted-foreground mt-1.5 max-w-[160px] leading-relaxed">
                  Select a highlighted element in the script to load production insights, scenes, and occurrences.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
