import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { RoleProvider } from "@/components/layout/RoleContext";
import { Layout } from "@/components/layout/Layout";

// Pages
import NotFound from "@/pages/not-found";
import RoleSwitcher from "@/pages/role-switcher";
import Dashboard from "@/pages/dashboard";
import Scenes from "@/pages/scenes";
import SceneWorkspace from "@/pages/scene-workspace";
import Breakdown from "@/pages/breakdown";
import Scheduling from "@/pages/scheduling";
import Budget from "@/pages/budget";
import ProducerView from "@/pages/producer";
import LineProducerView from "@/pages/line-producer";
import ADMobileView from "@/pages/ad-mobile";

const queryClient = new QueryClient();

// Placeholder for unbuilt pages
function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="flex-1 p-8 flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)]">
      <h2 className="text-2xl font-display text-muted-foreground mb-4">{title}</h2>
      <p className="text-muted-foreground">Module under construction.</p>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={RoleSwitcher} />
      
      <Route path="/dashboard">
        <Layout><Dashboard /></Layout>
      </Route>
      <Route path="/scenes">
        <Layout><Scenes /></Layout>
      </Route>
      <Route path="/scenes/:id">
        <Layout><SceneWorkspace /></Layout>
      </Route>
      <Route path="/breakdown">
        <Layout><Breakdown /></Layout>
      </Route>
      <Route path="/scheduling">
        <Layout><Scheduling /></Layout>
      </Route>
      <Route path="/budget">
        <Layout><Budget /></Layout>
      </Route>
      
      {/* Role specific views */}
      <Route path="/producer">
        <Layout><ProducerView /></Layout>
      </Route>
      <Route path="/line-producer">
        <Layout><LineProducerView /></Layout>
      </Route>
      <Route path="/ad">
        <Layout><ADMobileView /></Layout>
      </Route>

      {/* Placeholders */}
      <Route path="/discussions"><Layout><PlaceholderPage title="Discussions" /></Layout></Route>
      <Route path="/vendors"><Layout><PlaceholderPage title="Vendors" /></Layout></Route>
      <Route path="/reports"><Layout><PlaceholderPage title="Reports" /></Layout></Route>
      <Route path="/team"><Layout><PlaceholderPage title="Team" /></Layout></Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RoleProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </RoleProvider>
    </QueryClientProvider>
  );
}

export default App;
