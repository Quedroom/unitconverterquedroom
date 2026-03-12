import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Index = lazy(() => import("./pages/Index"));
const EngineeringUnitConverter = lazy(() => import("./pages/EngineeringUnitConverter"));
const DataConverter = lazy(() => import("./pages/DataConverter"));
const MediaConverter = lazy(() => import("./pages/MediaConverter"));
const ScientificCalculator = lazy(() => import("./pages/ScientificCalculator"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<div className="min-h-screen" />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/unit" element={<EngineeringUnitConverter />} />
            <Route path="/engineering" element={<EngineeringUnitConverter />} />
            <Route path="/calculator" element={<ScientificCalculator />} />
            <Route path="/data" element={<DataConverter />} />
            <Route path="/media" element={<MediaConverter />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
