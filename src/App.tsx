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
import ApprovalsCenter from "@/pages/approvals";
import LineProducerView from "@/pages/line-producer";
import ADMobileView from "@/pages/ad-mobile";
import DirectorView from "@/pages/director";
import AccountantView from "@/pages/accountant";
import ContinuityView from "@/pages/continuity";
import CashierView from "@/pages/cashier";
import ProductionManagerView from "@/pages/production-manager";
import CinematographerView from "@/pages/cinematographer";
import ProductionDesignerView from "@/pages/production-designer";
import CostumeDesignerView from "@/pages/costume-designer";
import BreakdownScript from "@/pages/breakdown-script";
import DiscussionsView from "@/pages/discussions";
import VendorsView from "@/pages/vendors";
import ReportsView from "@/pages/reports";
import TeamView from "@/pages/team";

const queryClient = new QueryClient();

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
      <Route path="/breakdown/script">
        <Layout><BreakdownScript /></Layout>
      </Route>
      <Route path="/scheduling">
        <Layout><Scheduling /></Layout>
      </Route>
      <Route path="/budget">
        <Layout><Budget /></Layout>
      </Route>
      <Route path="/approvals">
        <Layout><ApprovalsCenter /></Layout>
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
      <Route path="/director">
        <Layout><DirectorView /></Layout>
      </Route>
      <Route path="/accountant">
        <Layout><AccountantView /></Layout>
      </Route>
      <Route path="/continuity">
        <Layout><ContinuityView /></Layout>
      </Route>
      <Route path="/cashier">
        <Layout><CashierView /></Layout>
      </Route>
      <Route path="/production-manager">
        <Layout><ProductionManagerView /></Layout>
      </Route>
      <Route path="/cinematographer">
        <Layout><CinematographerView /></Layout>
      </Route>
      <Route path="/production-designer">
        <Layout><ProductionDesignerView /></Layout>
      </Route>
      <Route path="/costume-designer">
        <Layout><CostumeDesignerView /></Layout>
      </Route>


      <Route path="/discussions"><Layout><DiscussionsView /></Layout></Route>
      <Route path="/vendors"><Layout><VendorsView /></Layout></Route>
      <Route path="/reports"><Layout><ReportsView /></Layout></Route>
      <Route path="/team"><Layout><TeamView /></Layout></Route>

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
