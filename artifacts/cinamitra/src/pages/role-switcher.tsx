import { useState } from "react";
import { useRole } from "@/components/layout/RoleContext";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ChevronDown, ArrowRight, Clapperboard } from "lucide-react";

const ROLES = [
  { id: "Producer",           label: "Producer",           path: "/producer"           },
  { id: "Director",           label: "Director",           path: "/director"           },
  { id: "Line Producer",      label: "Line Producer",      path: "/line-producer"      },
  { id: "AD",                 label: "Assistant Director", path: "/ad"                 },
  { id: "Accountant",         label: "Accountant",         path: "/accountant"         },
  { id: "Continuity",         label: "Continuity",         path: "/continuity"         },
  { id: "Cashier",            label: "Cashier",            path: "/cashier"            },
  { id: "Production Manager", label: "Production Manager", path: "/production-manager" },
  { id: "Cinematographer",    label: "Cinematographer",    path: "/cinematographer"    },
  { id: "Production Designer",label: "Production Designer",path: "/production-designer"},
  { id: "Costume Designer",   label: "Costume Designer",   path: "/costume-designer"  },
  { id: "Editor",             label: "Editor",             path: "/editor"             },
];

export default function RoleSwitcher() {
  const { setRole } = useRole();
  const [, setLocation] = useLocation();
  const [selected, setSelected] = useState<string>("");
  const [open, setOpen] = useState(false);

  const selectedRole = ROLES.find(r => r.id === selected);

  const handleEnter = () => {
    if (!selectedRole) return;
    setRole(selectedRole.id as Parameters<typeof setRole>[0]);
    setLocation(selectedRole.path);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && selectedRole) handleEnter();
    if (e.key === "Escape") setOpen(false);
  };

  return (
    <div
      className="min-h-[100dvh] bg-white flex flex-col"
      onKeyDown={handleKey}
      onClick={() => open && setOpen(false)}
    >
      {/* Subtle top accent line */}
      <div className="h-[2px] bg-foreground/6 w-full" />

      {/* Main centered content */}
      <div className="flex-1 flex items-center justify-center px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[360px]"
        >
          {/* Logo mark + wordmark */}
          <div className="flex flex-col items-center mb-10">
            <div className="w-11 h-11 rounded-xl bg-foreground flex items-center justify-center mb-5">
              <Clapperboard className="w-5 h-5 text-background" />
            </div>
            <h1 className="text-[26px] font-display font-bold tracking-tight text-foreground mb-1.5">
              Cinamitra
            </h1>
            <p className="text-[13px] text-muted-foreground text-center leading-relaxed">
              The Operating System for Film Production
            </p>
          </div>

          {/* Divider */}
          <div className="h-px bg-border mb-8" />

          {/* Role field */}
          <div className="mb-5">
            <label className="block text-[12px] font-semibold text-foreground/70 mb-2 tracking-wide">
              Role
            </label>

            {/* Custom dropdown */}
            <div className="relative" onClick={e => e.stopPropagation()}>
              <button
                type="button"
                onClick={() => setOpen(v => !v)}
                className={`
                  w-full flex items-center justify-between
                  h-11 px-3.5 rounded-lg text-[14px] transition-all duration-150
                  border bg-white outline-none
                  ${open
                    ? "border-foreground ring-2 ring-foreground/8"
                    : "border-border hover:border-foreground/30"
                  }
                  ${selected ? "text-foreground" : "text-muted-foreground"}
                `}
              >
                <span>{selectedRole?.label ?? "Select your role"}</span>
                <ChevronDown
                  className={`w-4 h-4 text-muted-foreground/60 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                />
              </button>

              {/* Dropdown list */}
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.14, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute z-50 top-[calc(100%+6px)] left-0 right-0 bg-white border border-border rounded-xl shadow-lg shadow-black/8 py-1 overflow-y-scroll"
                  style={{ maxHeight: "28vh" }}
                >
                  {ROLES.map(role => (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => { setSelected(role.id); setOpen(false); }}
                      className={`
                        w-full text-left px-3.5 py-2.5 text-[14px] transition-colors duration-100
                        flex items-center justify-between group
                        ${selected === role.id
                          ? "bg-foreground text-background"
                          : "text-foreground hover:bg-muted/50"
                        }
                      `}
                    >
                      <span>{role.label}</span>
                      {selected === role.id && (
                        <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 16 16" fill="currentColor">
                          <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z" />
                        </svg>
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
          </div>

          {/* Enter button */}
          <button
            type="button"
            onClick={handleEnter}
            disabled={!selected}
            className={`
              w-full h-11 rounded-lg text-[14px] font-semibold
              flex items-center justify-center gap-2
              transition-all duration-200
              ${selected
                ? "bg-foreground text-background hover:bg-foreground/90 cursor-pointer"
                : "bg-foreground/8 text-foreground/30 cursor-not-allowed"
              }
            `}
          >
            Enter Workspace
            {selected && <ArrowRight className="w-4 h-4" />}
          </button>

          {/* Footer note */}
          <p className="text-center text-[12px] text-muted-foreground/50 mt-6">
            Demo prototype · Devara: Part 2 · Roja Entertainment
          </p>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border/60 px-8 py-4 flex items-center justify-between">
        <p className="text-[11px] text-muted-foreground/40">© 2026 Cinamitra</p>
        <p className="text-[11px] text-muted-foreground/40">Film Production OS</p>
      </div>
    </div>
  );
}
