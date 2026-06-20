import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, Mic, AlertCircle, RefreshCw, FileText, CheckCircle, 
  Clock, CloudSun, MapPin, Calendar, Plus, X, Users, User, Volume2
} from "lucide-react";

export default function ADMobileView() {
  const [activeTab, setActiveTab] = useState<"schedule" | "cast" | "crew">("schedule");
  
  // Interactive Scene Queue State
  const [scenes, setScenes] = useState([
    { id: "Scene 12", desc: "Palace Corridor - Climax Fight", dn: "Night", castIds: "1, 2, 8, Stunts", pages: "2 1/8", time: "18:00 - 21:30", status: "Shooting" },
    { id: "Scene 23", desc: "Village Square - Intro Chase", dn: "Day", castIds: "1, 5, Stunts", pages: "3 4/8", time: "08:00 - 13:00", status: "Next" },
    { id: "Scene 34", desc: "Forest Hideout - Conversation", dn: "Night", castIds: "2, 10", pages: "1 2/8", time: "21:30 - 23:30", status: "Pending" },
    { id: "Scene 41", desc: "Palace Balcony - Vara & Thangam", dn: "Day", castIds: "1, 3", pages: "2 0/8", time: "14:30 - 17:30", status: "Completed" }
  ]);

  // Interactive Cast Call Sheet State
  const [cast, setCast] = useState([
    { id: "1", character: "Devara / Vara", actor: "NTR Jr.", pickup: "05:00 AM", hmu: "05:30 AM", onset: "07:45 AM", status: "On Set" },
    { id: "2", character: "Bhaira", actor: "Saif Ali Khan", pickup: "05:30 AM", hmu: "06:00 AM", onset: "08:15 AM", status: "In Makeup" },
    { id: "3", character: "Thangam", actor: "Janhvi Kapoor", pickup: "08:00 AM", hmu: "08:30 AM", onset: "10:00 AM", status: "Ready" },
    { id: "5", character: "Village Elder", actor: "Nassar", pickup: "06:00 AM", hmu: "06:30 AM", onset: "08:00 AM", status: "Ready" },
    { id: "8", character: "Bhaira's Henchman", actor: "Prakash Raj", pickup: "07:00 AM", hmu: "07:30 AM", onset: "09:00 AM", status: "Wrapped" }
  ]);

  // Crew Call Sheet (Grouped by departments)
  const crew = [
    { dept: "Direction", role: "1st AD", name: "Srikant", call: "05:00 AM" },
    { dept: "Direction", role: "2nd AD", name: "Anil Kumar", call: "05:30 AM" },
    { dept: "Camera", role: "DoP / Cinematographer", name: "R. Rathnavelu", call: "06:00 AM" },
    { dept: "Art Dept", role: "Art Director", name: "Sabu Cyril", call: "05:00 AM" },
    { dept: "Sound", role: "Sound Designer", name: "Resul Pookutty", call: "06:00 AM" },
    { dept: "Stunts", role: "Action Director", name: "Peter Hein", call: "07:00 AM" },
    { dept: "Logistics", role: "Production Manager", name: "Prasad", call: "05:30 AM" }
  ];

  // Active set issues list state
  const [issues, setIssues] = useState([
    "Generator 2 making noise, sound dept complaining.",
    "Vehicle transport for extras delayed 15 minutes in town.",
    "Misty forecast at Rajahmundry ghat may affect Scene 23 light balance."
  ]);

  // Form inputs & simulators
  const [newIssue, setNewIssue] = useState("");
  const [showIssueForm, setShowIssueForm] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [syncStatus, setSyncStatus] = useState<"idle" | "syncing" | "success">("idle");

  // Cycle Cast Status on Click
  const cycleCastStatus = (id: string) => {
    const statuses = ["Ready", "In Makeup", "On Set", "Wrapped"];
    setCast(prev => prev.map(c => {
      if (c.id === id) {
        const nextIndex = (statuses.indexOf(c.status) + 1) % statuses.length;
        return { ...c, status: statuses[nextIndex] };
      }
      return c;
    }));
  };

  // Cycle Scene Status on Click
  const cycleSceneStatus = (id: string) => {
    const statuses = ["Pending", "Next", "Shooting", "Completed"];
    setScenes(prev => prev.map(s => {
      if (s.id === id) {
        const nextIndex = (statuses.indexOf(s.status) + 1) % statuses.length;
        return { ...s, status: statuses[nextIndex] };
      }
      return s;
    }));
  };

  // Resolve an Issue
  const resolveIssue = (index: number) => {
    setIssues(prev => prev.filter((_, i) => i !== index));
  };

  // Add a new Issue
  const addIssue = (e: React.FormEvent) => {
    e.preventDefault();
    if (newIssue.trim()) {
      setIssues(prev => [newIssue.trim(), ...prev]);
      setNewIssue("");
      setShowIssueForm(false);
    }
  };

  // Simulating Voice Recording Timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRecording) {
      timer = setInterval(() => {
        setRecordingSeconds(sec => {
          if (sec >= 4) {
            setIsRecording(false);
            setIssues(prev => ["Simulated Voice Announcement: 'Sound Dept ready for Scene 12.'", ...prev]);
            return 0;
          }
          return sec + 1;
        });
      }, 1000);
    } else {
      setRecordingSeconds(0);
    }
    return () => clearInterval(timer);
  }, [isRecording]);

  // Simulating Syncing to Cloud
  const handleSync = () => {
    setSyncStatus("syncing");
    setTimeout(() => {
      setSyncStatus("success");
      setTimeout(() => setSyncStatus("idle"), 2000);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 md:p-8 max-w-[1400px] mx-auto space-y-8 bg-background text-foreground min-h-screen"
    >
      <header className="py-6 border-b border-border/50 relative">
        <Link href="/" className="absolute -top-4 text-xs text-muted-foreground flex items-center gap-1 hover:text-primary transition-colors">
          <ArrowLeft className="w-3 h-3" /> Back to Role Switcher
        </Link>
        <h1 className="text-4xl font-display font-bold tracking-tight">Assistant Director Dashboard</h1>
        <p className="text-xl text-muted-foreground mt-2">Devara: Part 2 — Daily Call Sheet & Command</p>
      </header>

      {/* Call Sheet Header Metadata Bar */}
      <Card className="bg-card border-border shadow-sm">
        <CardContent className="p-4 md:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 divide-y sm:divide-y-0 lg:divide-x divide-border/50">
          <div className="flex items-center gap-3 pr-2">
            <Calendar className="w-5 h-5 text-primary shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Date & Shoot Day</p>
              <p className="text-sm font-semibold mt-0.5">Sat, June 20, 2026 — Day 23 of 45</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 pt-3 sm:pt-0 lg:pl-4 lg:pr-2">
            <Clock className="w-5 h-5 text-primary shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">General Crew Call</p>
              <p className="text-sm font-semibold mt-0.5">06:00 AM (Breakfast at 05:15)</p>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-3 sm:pt-0 lg:pl-4 lg:pr-2">
            <CloudSun className="w-5 h-5 text-primary shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Weather Forecast</p>
              <p className="text-sm font-semibold mt-0.5">Sunny (High 34°C / Sunrise 05:45)</p>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-3 sm:pt-0 lg:pl-4">
            <MapPin className="w-5 h-5 text-primary shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Basecamp / Location</p>
              <p className="text-sm font-semibold mt-0.5">Rajahmundry Forest / Stage 3</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Active Scenes", value: `${scenes.filter(s => s.status === "Shooting").length} Shooting`, sub: `${scenes.filter(s => s.status === "Next" || s.status === "Pending").length} pending in queue` },
          { label: "Cast On Set", value: `${cast.filter(c => c.status === "On Set").length} Present`, sub: `${cast.filter(c => c.status === "In Makeup").length} in makeup, ${cast.filter(c => c.status === "Ready").length} ready` },
          { label: "Active Set Issues", value: `${issues.length} Flagged`, sub: `${issues.length > 0 ? "Requires AD coordination" : "Set is running clear"}` },
        ].map((k, i) => (
          <Card key={i} className="bg-card border-border hover:border-primary/50 transition-colors">
            <CardContent className="p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">{k.label}</p>
              <p className="text-3xl font-display font-bold">{k.value}</p>
              <p className="text-xs text-muted-foreground mt-2">{k.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (2/3 width) - Call Sheet Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-card border-border shadow-sm overflow-hidden">
            {/* Call Sheet Navigation Header */}
            <div className="flex border-b border-border bg-muted/20">
              <button 
                onClick={() => setActiveTab("schedule")}
                className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all flex items-center justify-center gap-2 ${
                  activeTab === "schedule" 
                    ? "border-primary text-primary bg-card" 
                    : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/10"
                }`}
              >
                <FileText className="w-4 h-4" /> Shooting Schedule
              </button>
              <button 
                onClick={() => setActiveTab("cast")}
                className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all flex items-center justify-center gap-2 ${
                  activeTab === "cast" 
                    ? "border-primary text-primary bg-card" 
                    : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/10"
                }`}
              >
                <Users className="w-4 h-4" /> Cast Call Times
              </button>
              <button 
                onClick={() => setActiveTab("crew")}
                className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all flex items-center justify-center gap-2 ${
                  activeTab === "crew" 
                    ? "border-primary text-primary bg-card" 
                    : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/10"
                }`}
              >
                <User className="w-4 h-4" /> Crew Department Calls
              </button>
            </div>

            <CardContent className="p-0">
              <AnimatePresence mode="wait">
                
                {/* Shooting Schedule View */}
                {activeTab === "schedule" && (
                  <motion.div
                    key="schedule"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-4 md:p-6 space-y-4"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-base font-bold text-foreground">Today's Shooting Queue</h3>
                      <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Click status to cycle</span>
                    </div>

                    <div className="overflow-x-auto border border-border/80 rounded-lg">
                      <table className="w-full text-xs text-left">
                        <thead className="bg-muted/50 text-muted-foreground font-bold uppercase tracking-wider border-b border-border">
                          <tr>
                            <th className="p-3">Scene</th>
                            <th className="p-3">Description</th>
                            <th className="p-3">D/N</th>
                            <th className="p-3">Pages</th>
                            <th className="p-3">Cast IDs</th>
                            <th className="p-3">Est. Time</th>
                            <th className="p-3 text-right">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border/60">
                          {scenes.map((s, idx) => (
                            <tr key={idx} className="hover:bg-muted/20 transition-colors">
                              <td className="p-3 font-bold text-primary">{s.id}</td>
                              <td className="p-3 font-medium text-foreground">{s.desc}</td>
                              <td className="p-3 text-muted-foreground">{s.dn}</td>
                              <td className="p-3 text-muted-foreground font-mono">{s.pages}</td>
                              <td className="p-3 text-muted-foreground">{s.castIds}</td>
                              <td className="p-3 text-muted-foreground font-mono">{s.time}</td>
                              <td className="p-3 text-right">
                                <button 
                                  onClick={() => cycleSceneStatus(s.id)}
                                  className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                                    s.status === "Shooting" ? "bg-primary/20 text-primary border border-primary/30" :
                                    s.status === "Next" ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" :
                                    s.status === "Completed" ? "bg-green-500/15 text-green-500 border border-green-500/20" :
                                    "bg-muted/50 text-muted-foreground border border-border"
                                  }`}
                                >
                                  {s.status}
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                )}

                {/* Cast Call Times View */}
                {activeTab === "cast" && (
                  <motion.div
                    key="cast"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-4 md:p-6 space-y-4"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-base font-bold text-foreground">Cast & Talent Call Sheet</h3>
                      <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Click status to cycle</span>
                    </div>

                    <div className="overflow-x-auto border border-border/80 rounded-lg">
                      <table className="w-full text-xs text-left">
                        <thead className="bg-muted/50 text-muted-foreground font-bold uppercase tracking-wider border-b border-border">
                          <tr>
                            <th className="p-3">ID</th>
                            <th className="p-3">Character</th>
                            <th className="p-3">Actor</th>
                            <th className="p-3">Pickup</th>
                            <th className="p-3">H/M/U Call</th>
                            <th className="p-3">On Set Call</th>
                            <th className="p-3 text-right">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border/60">
                          {cast.map((c, idx) => (
                            <tr key={idx} className="hover:bg-muted/20 transition-colors">
                              <td className="p-3 font-mono font-bold text-muted-foreground">{c.id}</td>
                              <td className="p-3 font-bold text-foreground">{c.character}</td>
                              <td className="p-3 text-muted-foreground">{c.actor}</td>
                              <td className="p-3 text-muted-foreground font-mono">{c.pickup}</td>
                              <td className="p-3 text-muted-foreground font-mono">{c.hmu}</td>
                              <td className="p-3 text-muted-foreground font-mono">{c.onset}</td>
                              <td className="p-3 text-right">
                                <button 
                                  onClick={() => cycleCastStatus(c.id)}
                                  className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                                    c.status === "On Set" ? "bg-green-500/15 text-green-500 border border-green-500/20" :
                                    c.status === "In Makeup" ? "bg-primary/20 text-primary border border-primary/30" :
                                    c.status === "Wrapped" ? "bg-muted text-muted-foreground border border-border" :
                                    "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                                  }`}
                                >
                                  {c.status}
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                )}

                {/* Crew Calls View */}
                {activeTab === "crew" && (
                  <motion.div
                    key="crew"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-4 md:p-6 space-y-4"
                  >
                    <h3 className="text-base font-bold text-foreground mb-2">Department Call Sheet</h3>
                    
                    <div className="overflow-x-auto border border-border/80 rounded-lg">
                      <table className="w-full text-xs text-left">
                        <thead className="bg-muted/50 text-muted-foreground font-bold uppercase tracking-wider border-b border-border">
                          <tr>
                            <th className="p-3">Department</th>
                            <th className="p-3">Role</th>
                            <th className="p-3">Name</th>
                            <th className="p-3 text-right">Call Time</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border/60">
                          {crew.map((cr, idx) => (
                            <tr key={idx} className="hover:bg-muted/20 transition-colors">
                              <td className="p-3 font-bold text-primary">{cr.dept}</td>
                              <td className="p-3 font-medium text-foreground">{cr.role}</td>
                              <td className="p-3 text-muted-foreground">{cr.name}</td>
                              <td className="p-3 text-right font-mono text-muted-foreground">{cr.call}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </CardContent>
          </Card>
        </div>

        {/* Right Column (1/3 width) - Commands & Feeds */}
        <div className="space-y-6">
          
          {/* Quick Actions Card */}
          <div className="space-y-3">
            <h2 className="text-xl font-display font-bold">Set Controls</h2>
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => setIsRecording(true)}
                disabled={isRecording}
                className={`p-4 rounded-xl flex flex-col items-center justify-center gap-2 border transition-all cursor-pointer ${
                  isRecording 
                    ? "bg-destructive/10 border-destructive/30 text-destructive animate-pulse" 
                    : "bg-card border-border hover:bg-muted/50 hover:border-primary/50 text-foreground"
                }`}
              >
                <Mic className={`w-5 h-5 ${isRecording ? "text-destructive" : "text-primary"}`} />
                <span className="text-xs font-semibold">
                  {isRecording ? `Recording (${4 - recordingSeconds}s)` : "Voice Announcement"}
                </span>
              </button>

              <button 
                onClick={() => setShowIssueForm(!showIssueForm)}
                className="bg-card border border-border p-4 rounded-xl flex flex-col items-center justify-center gap-2 hover:bg-muted/50 hover:border-primary/50 transition-colors text-foreground cursor-pointer"
              >
                <AlertCircle className="w-5 h-5 text-destructive" />
                <span className="text-xs font-semibold text-destructive">Flag Set Issue</span>
              </button>

              <button 
                onClick={handleSync}
                className="bg-card border border-border p-4 rounded-xl flex flex-col items-center justify-center gap-2 hover:bg-muted/50 hover:border-primary/50 transition-colors text-foreground cursor-pointer"
              >
                <RefreshCw className={`w-5 h-5 text-primary ${syncStatus === "syncing" ? "animate-spin" : ""}`} />
                <span className="text-xs font-semibold">
                  {syncStatus === "syncing" ? "Syncing..." : syncStatus === "success" ? "Synced!" : "Sync Call Sheet"}
                </span>
              </button>

              <button 
                onClick={() => setActiveTab("schedule")}
                className="bg-card border border-border p-4 rounded-xl flex flex-col items-center justify-center gap-2 hover:bg-muted/50 hover:border-primary/50 transition-colors text-foreground cursor-pointer"
              >
                <FileText className="w-5 h-5 text-muted-foreground" />
                <span className="text-xs font-semibold">View Queue</span>
              </button>
            </div>
          </div>

          {/* Interactive Flag Issue Form overlay/card */}
          <AnimatePresence>
            {showIssueForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <Card className="bg-destructive/5 border-destructive/20 p-4">
                  <form onSubmit={addIssue} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-destructive flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> Describe Set Issue
                      </span>
                      <button type="button" onClick={() => setShowIssueForm(false)} className="text-muted-foreground hover:text-foreground">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <input 
                      type="text" 
                      placeholder="e.g. Extra lunch boxes delayed..." 
                      value={newIssue}
                      onChange={(e) => setNewIssue(e.target.value)}
                      className="w-full bg-background border border-border p-2 rounded text-xs text-foreground focus:outline-none focus:border-destructive"
                      required
                      autoFocus
                    />
                    <button type="submit" className="w-full bg-destructive text-white text-xs font-bold py-1.5 rounded hover:bg-destructive/90 transition-colors flex items-center justify-center gap-1 cursor-pointer">
                      <Plus className="w-3.5 h-3.5" /> Submit Flagged Issue
                    </button>
                  </form>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Simulated Voice Announcement Banner */}
          <AnimatePresence>
            {isRecording && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-primary/20 border border-primary/30 p-3 rounded-lg flex items-center gap-3 text-xs"
              >
                <Volume2 className="w-4 h-4 text-primary animate-bounce shrink-0" />
                <span className="text-primary font-medium">Recording voice announcement to all crew transceivers...</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Active Set Issues Feed */}
          <div className="space-y-3">
            <h2 className="text-xl font-display font-bold flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-destructive animate-pulse" />
              Live Set Issues Feed
            </h2>
            <div className="space-y-2">
              {issues.length === 0 ? (
                <div className="bg-muted/10 border border-border/50 p-4 rounded-lg text-center text-xs text-muted-foreground">
                  No active issues flagged on set today.
                </div>
              ) : (
                issues.map((issue, idx) => (
                  <div key={idx} className="bg-destructive/10 border border-destructive/20 p-3 rounded-lg text-xs flex justify-between items-start gap-2">
                    <div className="flex gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-destructive mt-1.5 shrink-0" />
                      <span className="text-destructive font-medium leading-relaxed">{issue}</span>
                    </div>
                    <button 
                      onClick={() => resolveIssue(idx)}
                      className="text-xs text-muted-foreground hover:text-green-500 font-bold shrink-0 hover:underline transition-colors"
                    >
                      Resolve
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
          
        </div>

      </div>
    </motion.div>
  );
}
