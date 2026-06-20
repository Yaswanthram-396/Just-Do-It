import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, Box, MapPin, Shirt, Car, Zap, Swords, ArrowLeft,
  ChevronDown, ChevronRight, ChevronUp, Search, X, Lock,
  Download, RotateCcw, Activity, ListTree, Sparkles
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

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

const CAT_CFG: Record<Category, { color: string; icon: React.ElementType; label: string }> = {
  Characters: { color: "#D4A843", icon: Users,   label: "Characters" },
  Props:      { color: "#14B8A6", icon: Box,     label: "Props"      },
  Locations:  { color: "#F97316", icon: MapPin,  label: "Locations"  },
  Costumes:   { color: "#A855F7", icon: Shirt,   label: "Costumes"   },
  Vehicles:   { color: "#EC4899", icon: Car,     label: "Vehicles"   },
  VFX:        { color: "#3B82F6", icon: Zap,     label: "VFX"        },
  Stunts:     { color: "#EF4444", icon: Swords,  label: "Stunts"     },
};

const CAT_ORDER: Category[] = ["Characters", "Props", "Locations", "Costumes", "Vehicles", "VFX", "Stunts"];

// ─── Screenplay Data ──────────────────────────────────────────────────────────

const SCRIPT_BLOCKS: ScriptBlock[] = [
  { id:"b1",  type:"scene-heading",   text:"EXT. VILLAGE ROAD — NIGHT",                                                                                                              sceneNum:"33", elements:["loc-road"]           },
  { id:"b2",  type:"action",          text:"A lone torch flickers on the dusty road. KARNA walks alone, cloak drawn tight, eyes scanning the dark horizon ahead.",                              elements:["char-ntr","cos-cloak"]  },
  { id:"b3",  type:"character",       text:"KARNA",                                                                                                                                              elements:["char-ntr"]              },
  { id:"b4",  type:"dialogue",        text:"The merchant knows more than he lets on.",                                                                                                            elements:["char-ntr"]              },
  { id:"b5",  type:"transition",      text:"CUT TO:",                                                                                                                                            elements:[]                        },

  { id:"b6",  type:"scene-heading",   text:"EXT. RAJAHMUNDRY FISH MARKET — DAY",                                                                                                     sceneNum:"34", elements:["loc-market"]         },
  { id:"b7",  type:"action",          text:"The market bursts with life. Fishermen haul their catch. A MERCHANT CART loaded with silver fish blocks the central lane.",                          elements:["prop-cart","loc-market"]},
  { id:"b8",  type:"action",          text:"KARNA moves through the crowd. He wears a crisp WHITE KURTA with fine GOLD TRIM — he stands apart from the merchants.",                              elements:["char-ntr","cos-kurta"]  },
  { id:"b9",  type:"action",          text:"VIKRAM SHETTY watches from the shadows near WOODEN CRATES stacked against the wall. His VILLAIN'S COAT is dark against the bright stalls.",         elements:["char-saif","prop-crates","cos-coat","loc-market"]},
  { id:"b10", type:"action",          text:"KARNA approaches the MERCHANT CART. Reaches beneath — pulls out a ROLLED ROPE hidden under FISH BOXES.",                                            elements:["char-ntr","prop-cart","prop-rope","prop-fishboxes"]},
  { id:"b11", type:"character",       text:"KARNA",                                                                                                                                              elements:["char-ntr"]              },
  { id:"b12", type:"dialogue",        text:"Delivered on time. Good.",                                                                                                                           elements:["char-ntr"]              },
  { id:"b13", type:"action",          text:"The crowd surges. MERCHANTS freeze. VIKRAM SHETTY steps forward — casual, dangerous. Between them only the MERCHANT CART.",                          elements:["char-saif","prop-cart","loc-market"]},
  { id:"b14", type:"character",       text:"VIKRAM SHETTY",                                                                                                                                      elements:["char-saif"]             },
  { id:"b15", type:"dialogue",        text:"You shouldn't have come here, Karna. Not in daylight.",                                                                                               elements:["char-saif"]             },
  { id:"b16", type:"action",          text:"KARNA grips the BOAT ROPE. The MERCHANT CART between them becomes the only barrier.",                                                                elements:["char-ntr","prop-rope","prop-cart"]},
  { id:"b17", type:"character",       text:"KARNA",                                                                                                                                              elements:["char-ntr"]              },
  { id:"b18", type:"dialogue",        text:"Then you shouldn't have made deals with my enemy.",                                                                                                   elements:["char-ntr"]              },
  { id:"b19", type:"action",          text:"VFX: AERIAL DRONE SHOT — the market seen from above, the crowd circling around the two men.",                                                        elements:["vfx-drone","loc-market"]},
  { id:"b20", type:"action",          text:"VIKRAM lunges. KARNA vaults over the MERCHANT CART. FISH BOXES scatter — wet, chaotic. STUNT sequence begins.",                                     elements:["char-saif","char-ntr","prop-cart","prop-fishboxes","stunt-vault"]},
  { id:"b21", type:"action",          text:"VFX: CROWD EXTENSION — the market fills with hundreds of fleeing figures as the brawl spills outward.",                                              elements:["vfx-crowd","loc-market"]},
  { id:"b22", type:"action",          text:"KARNA sprints through the stalls. His WHITE KURTA catches the light — a flash of white in the chaos.",                                               elements:["char-ntr","cos-kurta"]  },
  { id:"b23", type:"character",       text:"VIKRAM SHETTY",                                                                                                                                      elements:["char-saif"]             },
  { id:"b24", type:"dialogue",        text:"Stop him! Do not let him reach the river!",                                                                                                          elements:["char-saif"]             },
  { id:"b25", type:"action",          text:"GUARDS pour from the alleys. STUNT: Guard pursuit sequence — narrow lanes, overturned WOODEN CRATES, FISH BOXES underfoot.",                        elements:["prop-crates","prop-fishboxes","stunt-chase"]},
  { id:"b26", type:"action",          text:"KARNA uses the BOAT ROPE to swing across a gap between rooftops. An impossible, graceful arc.",                                                     elements:["char-ntr","prop-rope","stunt-ropeswing"]},
  { id:"b27", type:"character",       text:"KARNA",                                                                                                                                              elements:["char-ntr"]              },
  { id:"b28", type:"parenthetical",   text:"(under breath)",                                                                                                                                     elements:[]                        },
  { id:"b29", type:"dialogue",        text:"See you at the palace, Vikram.",                                                                                                                     elements:["char-ntr"]              },
  { id:"b30", type:"transition",      text:"SMASH CUT TO:",                                                                                                                                      elements:[]                        },

  { id:"b31", type:"scene-heading",   text:"EXT. RAJAHMUNDRY FISH MARKET — MOMENTS LATER",                                                                                           sceneNum:"35", elements:["loc-market"]         },
  { id:"b32", type:"action",          text:"The aftermath. Overturned MERCHANT CART. FISH BOXES everywhere. VIKRAM SHETTY stands in the center of chaos, still.",                               elements:["prop-cart","prop-fishboxes","char-saif","loc-market"]},
  { id:"b33", type:"action",          text:"VIKRAM picks up a frayed BOAT ROPE — examines it. Understands. His VILLAIN'S COAT is splashed with market water.",                                  elements:["char-saif","prop-rope","cos-coat"]},
  { id:"b34", type:"character",       text:"VIKRAM SHETTY",                                                                                                                                      elements:["char-saif"]             },
  { id:"b35", type:"dialogue",        text:"He knew the rope was there. This was a message.",                                                                                                    elements:["char-saif"]             },
  { id:"b36", type:"transition",      text:"CUT TO:",                                                                                                                                            elements:[]                        },

  { id:"b37", type:"scene-heading",   text:"INT. PALACE INTERIOR — NIGHT",                                                                                                           sceneNum:"41", elements:["loc-palace"]         },
  { id:"b38", type:"action",          text:"A CHANDELIER casts dramatic shadows across the throne room. KARNA stands before the massive PALACE THRONE in a fresh WHITE KURTA, the GOLD TRIM glinting.", elements:["char-ntr","cos-kurta","loc-palace","prop-throne"]},
  { id:"b39", type:"action",          text:"VIKRAM SHETTY enters. His VILLAIN'S COAT now repaired. Six GUARDS flank him across the stone floor.",                                                elements:["char-saif","cos-coat","loc-palace"]},
  { id:"b40", type:"character",       text:"VIKRAM SHETTY",                                                                                                                                      elements:["char-saif"]             },
  { id:"b41", type:"dialogue",        text:"Bold of you. Walking into my house.",                                                                                                                elements:["char-saif"]             },
  { id:"b42", type:"character",       text:"KARNA",                                                                                                                                              elements:["char-ntr"]              },
  { id:"b43", type:"dialogue",        text:"Your house? This palace was never yours, Vikram. Not since that night.",                                                                              elements:["char-ntr"]              },
  { id:"b44", type:"action",          text:"KARNA draws his HERO SWORD with a slow, deliberate arc. The ancient blade catches the chandelier light.",                                            elements:["char-ntr","prop-sword","stunt-sworddraw","loc-palace"]},
  { id:"b45", type:"action",          text:"VFX: SLOW MOTION — sword-drawn freeze frame. Ancient inscriptions glow faintly along the blade.",                                                   elements:["vfx-slowmo","prop-sword"]},
  { id:"b46", type:"action",          text:"VIKRAM steps back. He recognizes the HERO SWORD. His VILLAIN'S COAT shifts as the realization crosses his face.",                                    elements:["char-saif","prop-sword","cos-coat"]},
  { id:"b47", type:"character",       text:"VIKRAM SHETTY",                                                                                                                                      elements:["char-saif"]             },
  { id:"b48", type:"dialogue",        text:"That sword... it cannot be. The palace was burned.",                                                                                                  elements:["char-saif"]             },
  { id:"b49", type:"character",       text:"KARNA",                                                                                                                                              elements:["char-ntr"]              },
  { id:"b50", type:"dialogue",        text:"The sword survives. As I survived. Let's finish this.",                                                                                               elements:["char-ntr","prop-sword"]  },
  { id:"b51", type:"action",          text:"STUNT SEQUENCE: KARNA vs. SIX GUARDS — high-intensity palace combat. KARNA's WHITE KURTA tears at the sleeve.",                                     elements:["char-ntr","cos-kurta","stunt-combat","loc-palace"]},
  { id:"b52", type:"action",          text:"VIKRAM SHETTY retreats toward the rear PALACE archway. The VILLAIN'S COAT catches the torchlight dramatically.",                                     elements:["char-saif","cos-coat","loc-palace"]},
  { id:"b53", type:"transition",      text:"FADE TO BLACK.",                                                                                                                                     elements:[]                        },
];

// ─── Breakdown Element Definitions ──────────────────────────────────────────

const ELEMENT_DEFS: ElementDef[] = [
  { id:"char-ntr",      name:"Karna (NTR Jr.)",           category:"Characters", status:"Ready",       department:"Casting",   searchTerms:["KARNA"],            detail:{ "Actor":"N.T. Rama Rao Jr.", "Shoot Days":"38", "Scenes":"23", "Costumes":"3 variations" } },
  { id:"char-saif",     name:"Vikram Shetty (Saif)",      category:"Characters", status:"Ready",       department:"Casting",   searchTerms:["VIKRAM SHETTY","VIKRAM"], detail:{ "Actor":"Saif Ali Khan", "Shoot Days":"14", "Scenes":"9",  "Costumes":"1 primary" } },
  { id:"prop-cart",     name:"Merchant Cart",             category:"Props",      status:"Ready",       department:"Art Dept",  searchTerms:["MERCHANT CART"],    detail:{ "Vendor":"Roja Art Works", "Scenes":"34, 35", "Cost":"₹40,000", "Status":"Delivered" } },
  { id:"prop-fishboxes",name:"Fish Boxes (×12)",          category:"Props",      status:"Ready",       department:"Art Dept",  searchTerms:["FISH BOXES","FISH BOX"], detail:{ "Vendor":"Local Market HYD", "Scenes":"34, 35", "Cost":"₹8,000", "Status":"Confirmed" } },
  { id:"prop-rope",     name:"Boat Rope (Hemp, 30m)",     category:"Props",      status:"Sourcing",    department:"Art Dept",  searchTerms:["BOAT ROPE","ROLLED ROPE"], detail:{ "Vendor":"Marine Supplies Vizag", "Scenes":"34, 35, 78", "Cost":"₹12,000", "Status":"Sourcing" } },
  { id:"prop-crates",   name:"Wooden Crates (×6)",        category:"Props",      status:"Pending",     department:"Art Dept",  searchTerms:["WOODEN CRATES","WOODEN CRATE"], detail:{ "Vendor":"Roja Art Works", "Scenes":"34", "Cost":"₹15,000", "Status":"Pending" } },
  { id:"prop-throne",   name:"Palace Throne",             category:"Props",      status:"Built",       department:"Art Dept",  searchTerms:["PALACE THRONE","THRONE"], detail:{ "Vendor":"Custom Carpentry", "Scenes":"41", "Cost":"₹1,80,000", "Status":"Delivered" } },
  { id:"prop-sword",    name:"Hero Sword (Ancient)",      category:"Props",      status:"Ready",       department:"Art Dept",  searchTerms:["HERO SWORD","THE SWORD","SWORD"], detail:{ "Vendor":"Props Unlimited", "Scenes":"41, 78, 103", "Cost":"₹55,000", "Status":"Ready" } },
  { id:"loc-market",    name:"Rajahmundry Fish Market",   category:"Locations",  status:"Ready",       department:"Locations", searchTerms:["FISH MARKET","MARKET"], detail:{ "Address":"Rajahmundry, AP", "Permit":"Confirmed", "Shoot Days":"Day 31–32", "Day/Night":"Day only" } },
  { id:"loc-palace",    name:"Palace Interior",           category:"Locations",  status:"Ready",       department:"Locations", searchTerms:["PALACE INTERIOR","PALACE"], detail:{ "Address":"Studio Set — Stage 4", "Permit":"N/A", "Shoot Days":"Day 23, 25, 41", "Day/Night":"Night (artificial)" } },
  { id:"loc-road",      name:"Village Road",              category:"Locations",  status:"Scouted",     department:"Locations", searchTerms:["VILLAGE ROAD"],       detail:{ "Address":"Undi, AP", "Permit":"Pending", "Shoot Days":"Day 20", "Day/Night":"Night" } },
  { id:"cos-kurta",     name:"NTR White Kurta + Gold Trim",category:"Costumes",  status:"Ready",       department:"Costume",   searchTerms:["WHITE KURTA","GOLD TRIM","KURTA"], detail:{ "Designer":"Priya Menon", "Scenes":"34, 35, 41, 55", "Fittings":"3 done", "Sets":"4 identical" } },
  { id:"cos-coat",      name:"Saif Villain Coat",         category:"Costumes",   status:"In Progress", department:"Costume",   searchTerms:["VILLAIN'S COAT","VILLAIN COAT"], detail:{ "Designer":"Priya Menon", "Scenes":"34, 35, 41", "Fittings":"2 done", "Sets":"2 (hero + damaged)" } },
  { id:"cos-cloak",     name:"Karna Cloak",               category:"Costumes",   status:"Ready",       department:"Costume",   searchTerms:["CLOAK"],             detail:{ "Designer":"Priya Menon", "Scenes":"33", "Fittings":"1 done", "Sets":"1" } },
  { id:"vfx-drone",     name:"Aerial Drone Shot",         category:"VFX",        status:"Scheduled",   department:"VFX",       searchTerms:["AERIAL DRONE"],      detail:{ "Vendor":"DQ Entertainment", "Scenes":"34", "Complexity":"Medium", "Delivery":"Day 60" } },
  { id:"vfx-crowd",     name:"Market Crowd Extension",    category:"VFX",        status:"In Progress", department:"VFX",       searchTerms:["CROWD EXTENSION"],   detail:{ "Vendor":"Pixion Studios", "Scenes":"34", "Complexity":"High", "Delivery":"Day 65" } },
  { id:"vfx-slowmo",    name:"Sword Draw Slow-Motion",    category:"VFX",        status:"Planned",     department:"VFX",       searchTerms:["SLOW MOTION"],       detail:{ "Vendor":"Red Chillies VFX", "Scenes":"41", "Complexity":"Low", "Delivery":"Day 55" } },
  { id:"stunt-vault",   name:"Cart Vault Over",           category:"Stunts",     status:"Rehearsed",   department:"Action",    searchTerms:["VAULTS"],            detail:{ "Coordinator":"Vijay S.", "Scenes":"34", "Risk":"Medium", "Rehearsals":"4 done" } },
  { id:"stunt-chase",   name:"Market Pursuit Sequence",   category:"Stunts",     status:"Rehearsed",   department:"Action",    searchTerms:["PURSUIT SEQUENCE","PURSUIT"], detail:{ "Coordinator":"Vijay S.", "Scenes":"34", "Risk":"High", "Rehearsals":"6 done" } },
  { id:"stunt-ropeswing",name:"Rooftop Rope Swing",       category:"Stunts",     status:"In Progress", department:"Action",    searchTerms:["ROPE TO SWING","SWING ACROSS"], detail:{ "Coordinator":"Vijay S.", "Scenes":"34", "Risk":"High", "Rehearsals":"2 done" } },
  { id:"stunt-sworddraw",name:"Sword Draw Reveal",        category:"Stunts",     status:"Locked",      department:"Action",    searchTerms:["DRAWS HIS HERO"],    detail:{ "Coordinator":"Vijay S.", "Scenes":"41", "Risk":"Low", "Rehearsals":"Done" } },
  { id:"stunt-combat",  name:"Palace Combat (1 vs 6)",    category:"Stunts",     status:"In Rehearsal",department:"Action",    searchTerms:["PALACE COMBAT","KARNA VS."], detail:{ "Coordinator":"Vijay S.", "Scenes":"41", "Risk":"High", "Rehearsals":"3 done" } },
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

  return parts.map((part, i) => {
    if (i % 2 === 0) return part;
    const pair = termPairs.find(p => p.term.toLowerCase() === part.toLowerCase());
    if (!pair) return part;
    const el = allElements.find(e => e.id === pair.elId)!;
    const cfg = CAT_CFG[el.category];
    const isSelected = el.id === selectedId;
    return (
      <span
        key={i}
        onClick={e => { e.stopPropagation(); onTermClick(pair.elId, blockId); }}
        className="cursor-pointer rounded-sm px-0.5 transition-all"
        style={{
          backgroundColor: isSelected ? `${cfg.color}28` : `${cfg.color}14`,
          color: cfg.color,
          textDecoration: "underline",
          textDecorationStyle: "dotted",
          textDecorationColor: `${cfg.color}80`,
          fontWeight: isSelected ? 600 : undefined,
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
  const [expandedCats, setExpandedCats] = useState<Set<string>>(
    new Set(["Characters", "Props", "Locations"])
  );
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
      setExpandedCats(prev => new Set([...prev, el.category]));
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

  const statusColor = (s: string) => {
    if (s === "Ready" || s === "Built" || s === "Locked" || s === "Rehearsed") return "#22c55e";
    if (s === "In Progress" || s === "Scheduled" || s === "Sourced" || s === "Scouted" || s === "In Rehearsal") return "#f59e0b";
    if (s === "Pending" || s === "Sourcing" || s === "Planned") return "#ef4444";
    return "#6b7280";
  };

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] bg-background">

      {/* ── Header ──────────────────────────────────────────────────── */}
      <header className="h-11 border-b border-border flex items-center justify-between px-2 sm:px-4 shrink-0 bg-background/95 backdrop-blur z-20 gap-2 overflow-x-auto">
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <Link href="/breakdown" className="text-muted-foreground hover:text-foreground transition-colors shrink-0">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider whitespace-nowrap">Devara: Part 2</span>
          <span className="text-muted-foreground/40 hidden sm:inline">·</span>
          <span className="text-xs font-medium hidden sm:inline whitespace-nowrap">Script v1.2</span>
          <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded uppercase tracking-wider hidden md:inline whitespace-nowrap">Breakdown Active</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className="relative hidden md:block">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input className="h-7 pl-8 text-xs w-48 bg-muted/50 border-border" placeholder="Search script..." />
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="lg:hidden h-7 px-2.5 gap-1.5 text-xs">
                <ListTree className="w-3.5 h-3.5" /> Elements
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[260px] p-0 flex flex-col">
              <SheetHeader className="px-3 pt-3"><SheetTitle className="sr-only">Elements</SheetTitle></SheetHeader>
              <ElementSidebar
                search={search} setSearch={setSearch} groupedElements={groupedElements}
                expandedCats={expandedCats} setExpandedCats={setExpandedCats}
                selectedId={selectedId} selectElement={selectElement} occurrenceIdx={occurrenceIdx}
                sidebarItemRefs={sidebarItemRefs} sidebarScrollRef={sidebarScrollRef}
              />
            </SheetContent>
          </Sheet>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="xl:hidden h-7 px-2.5 gap-1.5 text-xs">
                <Sparkles className="w-3.5 h-3.5" /> Intelligence
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[268px] p-0 flex flex-col">
              <SheetHeader className="px-4 pt-4"><SheetTitle className="sr-only">Scene Intelligence</SheetTitle></SheetHeader>
              <IntelligencePanel
                selectedElement={selectedElement} occurrenceIdx={occurrenceIdx} setOccurrenceIdx={setOccurrenceIdx}
                scrollToBlock={scrollToBlock} selectElement={selectElement} statusColor={statusColor}
              />
            </SheetContent>
          </Sheet>
          <button className="h-7 px-2.5 rounded border border-border text-xs font-medium text-muted-foreground hover:text-foreground hover:border-border/80 transition-colors flex items-center gap-1.5 shrink-0">
            <RotateCcw className="w-3 h-3" /> <span className="hidden sm:inline">Regenerate</span>
          </button>
          <button className="h-7 px-2.5 rounded border border-border text-xs font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5 shrink-0">
            <Download className="w-3 h-3" /> <span className="hidden sm:inline">Export</span>
          </button>
          <button className="h-7 px-2.5 rounded bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-opacity flex items-center gap-1.5 shrink-0">
            <Lock className="w-3 h-3" /> <span className="hidden sm:inline">Lock Breakdown</span>
          </button>
        </div>
      </header>

      <div className="flex flex-1 min-h-0">

        {/* ── LEFT SIDEBAR ─────────────────────────────────────────── */}
        <div className="w-[260px] shrink-0 border-r border-border flex-col bg-card/40 hidden lg:flex">
          <ElementSidebar
            search={search} setSearch={setSearch} groupedElements={groupedElements}
            expandedCats={expandedCats} setExpandedCats={setExpandedCats}
            selectedId={selectedId} selectElement={selectElement} occurrenceIdx={occurrenceIdx}
            sidebarItemRefs={sidebarItemRefs} sidebarScrollRef={sidebarScrollRef}
          />
        </div>

        {/* ── CENTER: SCRIPT VIEWER ─────────────────────────────────── */}
        <div className="flex-1 flex flex-col min-w-0 relative">

          {/* Occurrence nav bar */}
          <AnimatePresence>
            {selectedElement && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="shrink-0 border-b border-border bg-background/95 overflow-hidden z-10"
              >
                <div className="flex items-center justify-between px-4 py-2">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: CAT_CFG[selectedElement.category].color }} />
                    <span className="text-sm font-semibold" style={{ color: CAT_CFG[selectedElement.category].color }}>
                      {selectedElement.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      occurrence {occurrenceIdx + 1} of {selectedElement.occurrences.length}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => navigateOccurrence(-1)}
                      disabled={occurrenceIdx === 0}
                      className="h-6 w-6 rounded flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => navigateOccurrence(1)}
                      disabled={occurrenceIdx >= selectedElement.occurrences.length - 1}
                      className="h-6 w-6 rounded flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => { setSelectedId(null); setOccurrenceIdx(0); }}
                      className="h-6 w-6 rounded flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors ml-1"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Script + Minimap */}
          <div className="flex-1 flex min-h-0 relative">
            <div ref={scriptScrollRef} className="flex-1 overflow-y-auto">
              <div className="max-w-[680px] mx-auto py-10 px-8 font-mono text-sm leading-relaxed">
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
                      className={`relative mb-1 rounded transition-all duration-200 ${
                        hasAnyElement ? "cursor-pointer" : ""
                      } ${
                        isActive ? "ring-1" : ""
                      } ${
                        containsSelected && !isActive ? "bg-current/4" : ""
                      }`}
                      style={isActive ? { boxShadow: `inset 0 0 0 1px ${CAT_CFG[selectedElement!.category].color}`, backgroundColor: `${CAT_CFG[selectedElement!.category].color}12` } : {}}
                    >
                      {/* Flash overlay */}
                      <AnimatePresence>
                        {flashBlockId === block.id && (
                          <motion.div
                            key="flash"
                            className="absolute inset-0 rounded pointer-events-none"
                            initial={{ backgroundColor: "rgba(212,168,67,0.45)" }}
                            animate={{ backgroundColor: "rgba(212,168,67,0)" }}
                            exit={{ backgroundColor: "rgba(212,168,67,0)" }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                          />
                        )}
                      </AnimatePresence>

                      {/* Block content */}
                      <div className={`px-2 py-1 ${getBlockClass(block.type)}`}>
                        {block.type === "scene-heading" ? (
                          <div className="font-bold uppercase tracking-wide text-foreground border-b border-border/50 pb-1 mb-1">
                            <span className="text-muted-foreground text-xs mr-2">{block.sceneNum}</span>
                            {block.text}
                          </div>
                        ) : block.type === "character" ? (
                          <div className="text-center font-bold uppercase text-foreground">
                            {renderHighlightedText(block.text, block.id, BREAKDOWN_ELEMENTS, selectedId, selectElement)}
                          </div>
                        ) : block.type === "dialogue" ? (
                          <div className="mx-auto" style={{ maxWidth: "360px" }}>
                            {renderHighlightedText(block.text, block.id, BREAKDOWN_ELEMENTS, selectedId, selectElement)}
                          </div>
                        ) : block.type === "parenthetical" ? (
                          <div className="text-center text-muted-foreground italic mx-auto" style={{ maxWidth: "280px" }}>
                            {block.text}
                          </div>
                        ) : block.type === "transition" ? (
                          <div className="text-right font-bold text-muted-foreground uppercase text-xs tracking-widest">
                            {block.text}
                          </div>
                        ) : (
                          <div className="text-foreground/90">
                            {renderHighlightedText(block.text, block.id, BREAKDOWN_ELEMENTS, selectedId, selectElement)}
                          </div>
                        )}
                      </div>

                      {/* Element indicators on hover */}
                      {hasAnyElement && !containsSelected && (
                        <div className="absolute right-1 top-1/2 -translate-y-1/2 flex gap-0.5 opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
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

            {/* Minimap */}
            <div className="w-5 shrink-0 relative border-l border-border/50 bg-muted/20">
              {minimapMarkers.map((m, i) => (
                <button
                  key={i}
                  title={`${m.name}`}
                  onClick={() => selectElement(m.elementId, m.blockId)}
                  className="absolute left-1 w-3 h-0.5 rounded-full hover:scale-125 transition-transform"
                  style={{ top: `${m.y}%`, backgroundColor: m.color, opacity: selectedId === m.elementId ? 1 : 0.45 }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT: INTELLIGENCE PANEL ─────────────────────────────── */}
        <div className="w-[268px] shrink-0 border-l border-border bg-card/40 flex-col hidden xl:flex">
          <IntelligencePanel
            selectedElement={selectedElement} occurrenceIdx={occurrenceIdx} setOccurrenceIdx={setOccurrenceIdx}
            scrollToBlock={scrollToBlock} selectElement={selectElement} statusColor={statusColor}
          />
        </div>

        {/* ── CENTER/RIGHT moved below — placeholder removed ─────────── */}
      </div>
    </div>
  );
}

interface IntelligencePanelProps {
  selectedElement: BreakdownElement | null;
  occurrenceIdx: number;
  setOccurrenceIdx: (i: number) => void;
  scrollToBlock: (blockId: string) => void;
  selectElement: (elementId: string, blockId?: string) => void;
  statusColor: (s: string) => string;
}

function IntelligencePanel({ selectedElement, occurrenceIdx, setOccurrenceIdx, scrollToBlock, selectElement, statusColor }: IntelligencePanelProps) {
  return (
    <>
          <div className="px-4 pt-4 pb-3 border-b border-border shrink-0">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Scene Intelligence</span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {selectedElement ? (
              <motion.div
                key={selectedElement.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {(() => { const I = CAT_CFG[selectedElement.category].icon; return <I className="w-4 h-4" style={{ color: CAT_CFG[selectedElement.category].color }} />; })()}
                    <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: CAT_CFG[selectedElement.category].color }}>
                      {selectedElement.category}
                    </span>
                  </div>
                  <h3 className="text-base font-display font-bold text-foreground leading-tight">{selectedElement.name}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: statusColor(selectedElement.status) }} />
                    <span className="text-xs font-semibold" style={{ color: statusColor(selectedElement.status) }}>{selectedElement.status}</span>
                    <span className="text-xs text-muted-foreground">{selectedElement.department}</span>
                  </div>
                </div>

                <div className="bg-background border border-border rounded-lg p-3">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Occurrences</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-display font-bold" style={{ color: CAT_CFG[selectedElement.category].color }}>
                      {selectedElement.occurrences.length}
                    </span>
                    <span className="text-xs text-muted-foreground">in script</span>
                  </div>
                  <div className="flex gap-1 mt-2 flex-wrap">
                    {selectedElement.occurrences.map((blockId, i) => {
                      const block = SCRIPT_BLOCKS.find(b => b.id === blockId);
                      const sceneBlock = SCRIPT_BLOCKS.slice(0, SCRIPT_BLOCKS.findIndex(b => b.id === blockId) + 1).reverse().find(b => b.type === "scene-heading");
                      return (
                        <button
                          key={i}
                          onClick={() => { setOccurrenceIdx(i); scrollToBlock(blockId); }}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                            i === occurrenceIdx
                              ? "text-primary-foreground"
                              : "bg-muted text-muted-foreground hover:bg-muted/80"
                          }`}
                          style={i === occurrenceIdx ? { backgroundColor: CAT_CFG[selectedElement.category].color } : {}}
                        >
                          {sceneBlock ? `Sc ${sceneBlock.sceneNum}` : `#${i + 1}`}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {selectedElement.detail && (
                  <div className="space-y-2">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Details</p>
                    {Object.entries(selectedElement.detail).map(([k, v]) => (
                      <div key={k} className="flex justify-between items-baseline text-xs">
                        <span className="text-muted-foreground">{k}</span>
                        <span className="font-medium text-right ml-2">{v}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="pt-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Related Elements</p>
                  <div className="space-y-1">
                    {BREAKDOWN_ELEMENTS
                      .filter(e => e.id !== selectedElement.id && e.occurrences.some(oId => selectedElement.occurrences.includes(oId)))
                      .slice(0, 5)
                      .map(rel => (
                        <button
                          key={rel.id}
                          onClick={() => selectElement(rel.id)}
                          className="w-full flex items-center gap-2 px-2 py-1.5 rounded hover:bg-muted/50 transition-colors text-left"
                        >
                          <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: CAT_CFG[rel.category].color }} />
                          <span className="text-xs text-muted-foreground truncate">{rel.name}</span>
                        </button>
                      ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center mb-3">
                  <Activity className="w-5 h-5 text-muted-foreground/50" />
                </div>
                <p className="text-sm font-medium text-muted-foreground">Select an element</p>
                <p className="text-xs text-muted-foreground/60 mt-1 max-w-[160px]">
                  Click a sidebar item or highlighted term in the script
                </p>
              </div>
            )}
          </div>
    </>
  );
}

interface ElementSidebarProps {
  search: string;
  setSearch: (s: string) => void;
  groupedElements: Map<Category, BreakdownElement[]>;
  expandedCats: Set<string>;
  setExpandedCats: React.Dispatch<React.SetStateAction<Set<string>>>;
  selectedId: string | null;
  selectElement: (elementId: string, blockId?: string) => void;
  occurrenceIdx: number;
  sidebarItemRefs: React.MutableRefObject<Map<string, HTMLElement>>;
  sidebarScrollRef: React.RefObject<HTMLDivElement | null>;
}

function ElementSidebar({
  search, setSearch, groupedElements, expandedCats, setExpandedCats,
  selectedId, selectElement, occurrenceIdx, sidebarItemRefs, sidebarScrollRef,
}: ElementSidebarProps) {
  return (
    <>
          <div className="p-3 border-b border-border">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="h-7 pl-8 text-xs bg-background border-border"
                placeholder="Filter elements…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div ref={sidebarScrollRef} className="flex-1 overflow-y-auto py-1">
            {CAT_ORDER.map(cat => {
              const items = groupedElements.get(cat) ?? [];
              if (items.length === 0) return null;
              const cfg = CAT_CFG[cat];
              const isExpanded = expandedCats.has(cat);
              const Icon = cfg.icon;

              return (
                <div key={cat}>
                  <button
                    className="w-full flex items-center justify-between px-3 py-2 hover:bg-muted/40 transition-colors group"
                    onClick={() =>
                      setExpandedCats(prev => {
                        const next = new Set(prev);
                        next.has(cat) ? next.delete(cat) : next.add(cat);
                        return next;
                      })
                    }
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="w-3.5 h-3.5" style={{ color: cfg.color }} />
                      <span className="text-xs font-bold uppercase tracking-wider" style={{ color: cfg.color }}>{cat}</span>
                      <span className="text-[10px] font-bold text-muted-foreground">{items.length}</span>
                    </div>
                    {isExpanded ? <ChevronDown className="w-3 h-3 text-muted-foreground" /> : <ChevronRight className="w-3 h-3 text-muted-foreground" />}
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        {items.map(el => {
                          const isSelected = el.id === selectedId;
                          return (
                            <div
                              key={el.id}
                              ref={node => { if (node) sidebarItemRefs.current.set(el.id, node); }}
                              onClick={() => selectElement(el.id)}
                              className={`flex items-center justify-between px-3 py-2 cursor-pointer transition-all border-l-2 ${
                                isSelected
                                  ? "border-l-current bg-current/5"
                                  : "border-l-transparent hover:bg-muted/40 hover:border-l-current/30"
                              }`}
                              style={{ ["--tw-border-opacity" as string]: 1, borderLeftColor: isSelected ? cfg.color : undefined } as React.CSSProperties}
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: cfg.color, opacity: isSelected ? 1 : 0.5 }} />
                                <span className={`text-xs truncate ${isSelected ? "font-semibold text-foreground" : "text-muted-foreground"}`} style={isSelected ? { color: cfg.color } : {}}>
                                  {el.name}
                                </span>
                              </div>
                              <div className="flex items-center gap-1.5 shrink-0 ml-2">
                                {isSelected && (
                                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded" style={{ backgroundColor: `${cfg.color}20`, color: cfg.color }}>
                                    {occurrenceIdx + 1}/{el.occurrences.length}
                                  </span>
                                )}
                                <span className="text-[10px] font-bold text-muted-foreground">{el.occurrences.length}</span>
                              </div>
                            </div>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
    </>
  );
}

function getBlockClass(type: BlockType): string {
  switch (type) {
    case "scene-heading":  return "py-2";
    case "character":      return "pt-3 pb-0";
    case "dialogue":       return "pb-2";
    case "parenthetical":  return "py-0.5 text-muted-foreground text-xs";
    case "action":         return "py-1.5";
    case "transition":     return "py-2";
    default:               return "";
  }
}
