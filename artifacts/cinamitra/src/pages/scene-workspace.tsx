import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Users, Shirt, Monitor, Car, Box, Paperclip, Send, Clock, CheckCircle2 } from "lucide-react";

export default function SceneWorkspace() {
  return (
    <div className="flex h-[calc(100vh-3.5rem)] overflow-hidden">
      
      {/* LEFT PANEL: Metadata */}
      <div className="w-[280px] shrink-0 border-r border-border bg-card/30 flex flex-col overflow-y-auto hidden md:flex">
        <div className="p-6">
          <div className="text-5xl font-display font-bold text-primary mb-2">34</div>
          <h2 className="text-xl font-bold leading-tight mb-4">Rajahmundry Market Chase</h2>
          
          <div className="flex gap-2 text-xs font-semibold mb-6">
            <span className="bg-muted px-2 py-1 rounded">EXT</span>
            <span className="bg-muted px-2 py-1 rounded">DAY</span>
          </div>

          <div className="space-y-4 text-sm">
            <div>
              <p className="text-muted-foreground text-xs uppercase tracking-wider font-semibold mb-1">Location</p>
              <p className="font-medium">Rajahmundry Fish Market, AP</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs uppercase tracking-wider font-semibold mb-1">Pages</p>
              <p className="font-medium">2⅛ pages</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs uppercase tracking-wider font-semibold mb-1">Status</p>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-2 py-1 rounded text-xs font-bold uppercase tracking-wider">
                <Clock className="w-3 h-3" /> Scheduled: Day 31
              </div>
            </div>
          </div>

          <div className="my-6 h-px bg-border" />

          <div>
            <p className="text-muted-foreground text-xs uppercase tracking-wider font-semibold mb-2">Synopsis</p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              NTR confronts the merchant lord in the crowded market. Chaos erupts. A chase through narrow lanes leads to a dramatic standoff near the river.
            </p>
          </div>

          <div className="my-6 h-px bg-border" />

          <div className="space-y-4">
            <p className="text-muted-foreground text-xs uppercase tracking-wider font-semibold">Quick Stats</p>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2"><Users className="w-4 h-4 text-muted-foreground" /> Cast</div>
              <span className="font-bold">8</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2"><Box className="w-4 h-4 text-muted-foreground" /> Props</div>
              <span className="font-bold">14</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2"><Shirt className="w-4 h-4 text-muted-foreground" /> Costumes</div>
              <span className="font-bold">3</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2"><Monitor className="w-4 h-4 text-muted-foreground" /> VFX</div>
              <span className="font-bold">2</span>
            </div>
          </div>
        </div>
      </div>

      {/* CENTER PANEL: Discussion */}
      <div className="flex-1 flex flex-col min-w-0 bg-background relative">
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
          
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 flex gap-3 text-sm">
            <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-foreground">PINNED APPROVAL</p>
              <p className="text-muted-foreground">NTR's costume — white kurta with gold trim approved by Director Koratala Siva</p>
            </div>
          </div>

          <ChatMessage 
            name="Sabu Cyril" dept="Art" color="teal" time="Yesterday 10:45 AM"
            text="Market set is 80% complete. The wooden crates have arrived but we need 6 more fish boxes. Sourcing them locally today."
          />
          
          <ChatMessage 
            name="Rathnavelu" dept="Production" color="orange" time="Yesterday 11:20 AM"
            text="Permits for the river side extension are clear. We have access from 6 AM to 6 PM on Day 31."
          />

          <ChatMessage 
            name="Rama Rajamouli" dept="Costume" color="purple" time="Yesterday 2:15 PM"
            text="Attached the final sketches for the merchant extras. Need director's sign off before we start stitching."
            hasFile={true}
          />

          <ChatMessage 
            name="Koratala Siva" dept="Director" color="yellow" time="Today 9:00 AM"
            text="Sketches look good. Make sure the colors are muted so NTR stands out in the white kurta."
          />

          <ChatMessage 
            name="King Solomon" dept="AD" color="blue" time="Today 9:30 AM"
            text="Noted sir. Updating the call sheet. Saif sir's arrival is pushed by 1 hour due to flight delay, but we'll shoot the wide crowd shots first."
          />

        </div>

        <div className="p-4 border-t border-border bg-card/50">
          <div className="relative flex items-center">
            <Button variant="ghost" size="icon" className="absolute left-1 text-muted-foreground hover:text-foreground z-10">
              <Paperclip className="w-4 h-4" />
            </Button>
            <Input 
              placeholder="Message Scene 34 thread..." 
              className="pl-10 pr-12 bg-background border-border"
            />
            <Button size="sm" className="absolute right-1 bg-primary text-primary-foreground hover:bg-primary/90 h-7 w-7 p-0 z-10">
              <Send className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL: Dependencies */}
      <div className="w-[320px] shrink-0 border-l border-border bg-card/30 flex flex-col hidden lg:flex">
        <Tabs defaultValue="breakdown" className="w-full h-full flex flex-col">
          <div className="px-4 pt-4 border-b border-border">
            <TabsList className="w-full bg-background border border-border h-9">
              <TabsTrigger value="breakdown" className="text-xs flex-1">Elements</TabsTrigger>
              <TabsTrigger value="schedule" className="text-xs flex-1">Schedule</TabsTrigger>
              <TabsTrigger value="files" className="text-xs flex-1">Files</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="breakdown" className="flex-1 overflow-y-auto p-0 m-0 outline-none">
            <div className="p-4 space-y-6">
              
              <BreakdownSection title="Cast" icon={Users}>
                <BreakdownItem name="NTR Jr." status="ready" />
                <BreakdownItem name="Saif Ali Khan" status="ready" />
                <BreakdownItem name="6 Crowd Extras" status="pending" />
              </BreakdownSection>

              <BreakdownSection title="Props" icon={Box}>
                <BreakdownItem name="Merchant cart" status="ready" />
                <BreakdownItem name="Fish boxes (x12)" status="ready" />
                <BreakdownItem name="Boat rope" status="ready" />
                <BreakdownItem name="Wooden crates (x6)" status="pending" />
              </BreakdownSection>

              <BreakdownSection title="Costumes" icon={Shirt}>
                <BreakdownItem name="NTR white kurta+gold" status="ready" />
                <BreakdownItem name="Saif villain outfit" status="progress" />
                <BreakdownItem name="Extras costume" status="pending" />
              </BreakdownSection>

              <BreakdownSection title="VFX" icon={Monitor}>
                <BreakdownItem name="Market crowd extension" status="ready" />
                <BreakdownItem name="Aerial drone shot" status="scheduled" />
              </BreakdownSection>

              <BreakdownSection title="Vehicles" icon={Car}>
                <BreakdownItem name="2 Rickshaws" status="ready" />
                <BreakdownItem name="1 Tempo" status="pending" />
              </BreakdownSection>

            </div>
          </TabsContent>
        </Tabs>
      </div>

    </div>
  );
}

function ChatMessage({ name, dept, color, time, text, hasFile }: any) {
  const colorMap: Record<string, string> = {
    teal: "text-teal-400 bg-teal-400/10",
    orange: "text-orange-400 bg-orange-400/10",
    purple: "text-purple-400 bg-purple-400/10",
    yellow: "text-primary bg-primary/10",
    blue: "text-blue-400 bg-blue-400/10",
    red: "text-red-400 bg-red-400/10"
  };

  return (
    <div className="flex gap-4">
      <Avatar className="w-8 h-8 border border-border mt-1">
        <AvatarFallback className="bg-muted text-xs">{name.substring(0,2).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-1.5">
        <div className="flex items-center gap-2">
          <span className="font-bold text-sm">{name}</span>
          <span className={`text-[9px] uppercase font-bold px-1.5 py-0.5 rounded ${colorMap[color]}`}>
            {dept}
          </span>
          <span className="text-xs text-muted-foreground ml-auto">{time}</span>
        </div>
        <p className="text-sm text-foreground/90 leading-relaxed bg-card border border-border/50 p-3 rounded-lg rounded-tl-none">
          {text}
        </p>
        {hasFile && (
          <div className="inline-flex items-center gap-2 bg-muted/50 border border-border p-2 rounded-md mt-2 text-xs font-medium cursor-pointer hover:bg-muted transition-colors">
            <FileText className="w-4 h-4 text-primary" />
            costume_sketches_v2.pdf
          </div>
        )}
      </div>
    </div>
  );
}

function BreakdownSection({ title, icon: Icon, children }: any) {
  return (
    <div>
      <div className="flex items-center gap-2 text-muted-foreground mb-3 border-b border-border/50 pb-1">
        <Icon className="w-4 h-4" />
        <span className="text-xs uppercase tracking-wider font-bold">{title}</span>
      </div>
      <div className="space-y-2 pl-1">
        {children}
      </div>
    </div>
  );
}

function BreakdownItem({ name, status }: { name: string, status: "ready" | "pending" | "progress" | "scheduled" }) {
  const statusColors = {
    ready: "bg-green-500",
    pending: "bg-red-500",
    progress: "bg-yellow-500",
    scheduled: "bg-blue-500"
  };

  return (
    <div className="flex items-center justify-between text-sm group">
      <span className="text-muted-foreground group-hover:text-foreground transition-colors">{name}</span>
      <div className={`w-2 h-2 rounded-full ${statusColors[status]}`} />
    </div>
  );
}
