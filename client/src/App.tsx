import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Calculators from "@/pages/calculators";
import VerticalJumpCalculator from "@/pages/vertical-jump-calculator";
import StandingReachCalculator from "@/pages/standing-reach-calculator";
import ApproachVsStandingJumpCalculator from "@/pages/approach-vs-standing-jump-calculator";
import JumpFatigueCalculator from "@/pages/jump-fatigue-calculator";
import MaxPotentialJumpCalculator from "@/pages/max-potential-jump-calculator";
import IdealBodyWeightJumpCalculator from "@/pages/ideal-body-weight-jump-calculator";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/calculators" component={Calculators} />
      <Route path="/calculators/vertical-jump-calculator" component={VerticalJumpCalculator} />
      <Route path="/calculators/standing-reach-calculator" component={StandingReachCalculator} />
      <Route path="/calculators/approach-vs-standing-jump-calculator" component={ApproachVsStandingJumpCalculator} />
      <Route path="/calculators/jump-fatigue-calculator" component={JumpFatigueCalculator} />
      <Route path="/calculators/max-potential-jump-calculator" component={MaxPotentialJumpCalculator} />
      <Route path="/calculators/ideal-body-weight-jump-calculator" component={IdealBodyWeightJumpCalculator} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
