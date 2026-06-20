import React, { useState, useEffect } from "react";
import { useRole } from "@/components/layout/RoleContext";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Phone, ArrowRight, Lock, KeyRound, AlertCircle, ChevronDown, Check } from "lucide-react";

const ROLE_MAP = [
  { phone: "9000000001", role: "Producer", label: "Producer", path: "/producer" },
  { phone: "9000000002", role: "Director", label: "Director", path: "/director" },
  { phone: "9000000003", role: "Line Producer", label: "Line Producer", path: "/line-producer" },
  { phone: "9000000004", role: "AD", label: "Assistant Director", path: "/ad" },
  { phone: "9000000005", role: "Accountant", label: "Accountant", path: "/accountant" },
  { phone: "9000000006", role: "Continuity", label: "Continuity", path: "/continuity" },
  { phone: "9000000007", role: "Cashier", label: "Cashier", path: "/cashier" },
  { phone: "9000000008", role: "Production Manager", label: "Production Manager", path: "/production-manager" },
  { phone: "9000000009", role: "Cinematographer", label: "Cinematographer", path: "/cinematographer" },
  { phone: "9000000010", role: "Production Designer", label: "Production Designer", path: "/production-designer" },
  { phone: "9000000011", role: "Costume Designer", label: "Costume Designer", path: "/costume-designer" },
  { phone: "9000000012", role: "Editor", label: "Editor", path: "/editor" },
];

export default function RoleSwitcher() {
  const { role, setRole } = useRole();
  const [, setLocation] = useLocation();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpValue, setOtpValue] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [error, setError] = useState<string | null>(null);
  const [matchedRole, setMatchedRole] = useState<typeof ROLE_MAP[0] | null>(null);
  const [showDemoAccounts, setShowDemoAccounts] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Auto-redirect if already logged in
  useEffect(() => {
    if (role) {
      const matched = ROLE_MAP.find(r => r.role === role);
      if (matched) {
        setLocation(matched.path);
      } else {
        setLocation("/dashboard");
      }
    }
  }, [role, setLocation]);

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Normalize phone number (strip whitespace, dashes, parenthesises)
    const normalized = phoneNumber.replace(/\D/g, "");
    
    const matched = ROLE_MAP.find(r => r.phone === normalized);
    if (!matched) {
      setError("This phone number is not registered. Click 'View Demo Numbers' below to copy a test number.");
      return;
    }

    setMatchedRole(matched);
    setIsLoading(true);
    
    // Simulate brief API network delay for premium feel
    setTimeout(() => {
      setIsLoading(false);
      setStep("otp");
    }, 600);
  };

  const handleOtpSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError(null);

    if (otpValue.length < 4) {
      setError("Please enter the 4-digit code.");
      return;
    }

    if (otpValue !== "1234") {
      setError("Incorrect verification code. Please try again (Hint: 1234).");
      return;
    }

    if (!matchedRole) return;

    setIsLoading(true);
    setTimeout(() => {
      setRole(matchedRole.role as any);
      setLocation(matchedRole.path);
    }, 800);
  };

  // Auto submit OTP when all 4 digits are typed
  useEffect(() => {
    if (otpValue.length === 4) {
      handleOtpSubmit();
    }
  }, [otpValue]);

  const selectDemoNumber = (phone: string) => {
    setPhoneNumber(phone);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between font-sans selection:bg-muted relative overflow-hidden">
      {/* Subtle top border accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />

      {/* Main Container */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-[400px] space-y-8">
          
          {/* Header/Logo */}
          <div className="space-y-3 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl border border-primary/20 bg-primary text-primary-foreground font-serif font-black text-2xl shadow-sm">
              C
            </div>
            <div className="space-y-1">
              <h1 className="text-2xl font-semibold tracking-tight font-sans text-foreground">Cinamitra</h1>
              <p className="text-sm text-muted-foreground font-medium">
                The Operating System for Film Production
              </p>
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-card text-card-foreground border border-border rounded-2xl p-8 shadow-sm transition-all duration-300">
            <AnimatePresence mode="wait">
              {step === "phone" ? (
                <motion.div
                  key="phone-step"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <h2 className="text-lg font-semibold tracking-tight text-foreground">Sign in</h2>
                    <p className="text-xs text-muted-foreground">
                      Enter the phone number associated with your production role.
                    </p>
                  </div>

                  <form onSubmit={handlePhoneSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Phone Number
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
                          +91
                        </span>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="90000 00000"
                          value={phoneNumber}
                          onChange={(e) => {
                            setPhoneNumber(e.target.value);
                            if (error) setError(null);
                          }}
                          className="pl-12 h-11 border-border focus:border-primary focus-visible:ring-0 focus-visible:ring-offset-0 text-sm font-medium rounded-lg bg-background/50 text-foreground"
                          autoComplete="off"
                          autoFocus
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    {error && (
                      <div className="flex items-start gap-2 text-xs text-destructive bg-destructive/10 border border-destructive/20 rounded-lg p-3">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                        <span>{error}</span>
                      </div>
                    )}

                    <Button
                      type="submit"
                      disabled={isLoading || !phoneNumber}
                      className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary/95 transition-colors font-medium rounded-lg text-sm gap-2"
                    >
                      {isLoading ? (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                      ) : (
                        <>
                          Continue <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="otp-step"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <h2 className="text-lg font-semibold tracking-tight text-foreground">Verify identity</h2>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      We sent a verification code to <span className="font-semibold text-foreground">+91 {phoneNumber}</span> ({matchedRole?.label}).
                    </p>
                  </div>

                  <form onSubmit={handleOtpSubmit} className="space-y-5">
                    <div className="space-y-3 flex flex-col items-center justify-center">
                      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground self-start">
                        Verification Code
                      </label>
                      <div className="py-2">
                        <InputOTP
                          maxLength={4}
                          value={otpValue}
                          onChange={(val) => {
                            setOtpValue(val);
                            if (error) setError(null);
                          }}
                          disabled={isLoading}
                        >
                          <InputOTPGroup className="gap-2">
                            <InputOTPSlot index={0} className="w-12 h-12 border-border text-lg font-semibold rounded-lg bg-background text-foreground" />
                            <InputOTPSlot index={1} className="w-12 h-12 border-border text-lg font-semibold rounded-lg bg-background text-foreground" />
                            <InputOTPSlot index={2} className="w-12 h-12 border-border text-lg font-semibold rounded-lg bg-background text-foreground" />
                            <InputOTPSlot index={3} className="w-12 h-12 border-border text-lg font-semibold rounded-lg bg-background text-foreground" />
                          </InputOTPGroup>
                        </InputOTP>
                      </div>
                    </div>

                    {error && (
                      <div className="flex items-start gap-2 text-xs text-destructive bg-destructive/10 border border-destructive/20 rounded-lg p-3">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                        <span>{error}</span>
                      </div>
                    )}

                    <div className="flex flex-col gap-2">
                      <Button
                        type="submit"
                        disabled={isLoading || otpValue.length < 4}
                        className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary/95 transition-colors font-medium rounded-lg text-sm gap-2"
                      >
                        {isLoading ? (
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                        ) : (
                          <>
                            Enter Workspace <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </Button>

                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => {
                          setStep("phone");
                          setOtpValue("");
                          setError(null);
                        }}
                        className="w-full h-10 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors font-medium"
                      >
                        Back to phone number
                      </Button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Demo Accounts Panel */}
          <div className="border border-border rounded-xl overflow-hidden shadow-sm bg-card text-card-foreground">
            <button
              onClick={() => setShowDemoAccounts(!showDemoAccounts)}
              className="w-full px-5 py-3.5 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:bg-muted/50 transition-colors border-b border-border"
            >
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-muted-foreground" />
                View Demo Numbers
              </span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showDemoAccounts ? "rotate-180" : ""}`} />
            </button>
            
            <AnimatePresence>
              {showDemoAccounts && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="p-3 bg-background/50 max-h-[220px] overflow-y-auto divide-y divide-border/60">
                    {ROLE_MAP.map((item) => {
                      const isSelected = phoneNumber === item.phone;
                      return (
                        <button
                          key={item.role}
                          onClick={() => selectDemoNumber(item.phone)}
                          className={`w-full px-3 py-2 flex items-center justify-between text-left rounded-lg transition-colors group ${
                            isSelected ? "bg-primary text-primary-foreground font-semibold" : "hover:bg-muted/80 text-foreground"
                          }`}
                        >
                          <div>
                            <p className="text-xs font-semibold">{item.label}</p>
                            <p className={`text-[10px] ${isSelected ? "text-primary-foreground/80" : "text-muted-foreground group-hover:text-foreground"}`}>
                              +91 {item.phone}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`text-[9px] uppercase tracking-wider font-semibold border px-1.5 py-0.5 rounded ${
                              isSelected ? "border-primary-foreground/30 bg-primary/20" : "border-border text-muted-foreground"
                            }`}>
                              OTP: 1234
                            </span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-primary-foreground" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* Footer */}
      <footer className="py-6 border-t border-border px-6 text-center text-xs text-muted-foreground font-medium">
        Cinamitra Production Suite &copy; {new Date().getFullYear()} &middot; Prototype Sandbox
      </footer>
    </div>
  );
}
