import React, { createContext, useContext, useState, useEffect } from "react";

type Role = 
  | "Producer" | "Director" | "Line Producer" | "AD" | "Accountant"
  | "Continuity" | "Cashier" | "Production Manager" | "Cinematographer"
  | "Production Designer" | "Costume Designer" | "Editor" | null;

interface RoleContextType {
  role: Role;
  setRole: (role: Role) => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<Role>(() => {
    const saved = localStorage.getItem("cinamitra-role");
    return (saved as Role) || null;
  });

  useEffect(() => {
    if (role) {
      localStorage.setItem("cinamitra-role", role);
    } else {
      localStorage.removeItem("cinamitra-role");
    }
  }, [role]);

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context;
}
