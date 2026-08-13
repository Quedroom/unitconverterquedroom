import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const Index = lazy(() => import("./pages/Index"));
const EngineeringUnitConverter = lazy(() => import("./pages/EngineeringUnitConverter"));
const DataConverter = lazy(() => import("./pages/DataConverter"));
const MediaConverter = lazy(() => import("./pages/MediaConverter"));
const ScientificCalculator = lazy(() => import("./pages/ScientificCalculator"));
const LengthConverter = lazy(() => import("./pages/LengthConverter"));
const WeightConverter = lazy(() => import("./pages/WeightConverter"));
const TemperatureConverter = lazy(() => import("./pages/TemperatureConverter"));
const PercentageCalculator = lazy(() => import("./pages/PercentageCalculator"));
const EmiCalculator = lazy(() => import("./pages/EmiCalculator"));
const WordCounter = lazy(() => import("./pages/WordCounter"));
const ImageCompressor = lazy(() => import("./pages/ImageCompressor"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Terms = lazy(() => import("./pages/Terms"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
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
            <Route path="/length-converter" element={<LengthConverter />} />
            <Route path="/weight-converter" element={<WeightConverter />} />
            <Route path="/temperature-converter" element={<TemperatureConverter />} />
            <Route path="/percentage-calculator" element={<PercentageCalculator />} />
            <Route path="/emi-calculator" element={<EmiCalculator />} />
            <Route path="/word-counter" element={<WordCounter />} />
            <Route path="/image-compressor" element={<ImageCompressor />} />
            <Route path="/scientific-calculator" element={<ScientificCalculator />} />
            <Route path="/data-converter" element={<DataConverter />} />
            <Route path="/unit" element={<EngineeringUnitConverter />} />
            <Route path="/engineering" element={<EngineeringUnitConverter />} />
            <Route path="/media" element={<MediaConverter />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
            {/* Legacy routes */}
            <Route path="/calculator" element={<Navigate to="/scientific-calculator" replace />} />
            <Route path="/data" element={<Navigate to="/data-converter" replace />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
