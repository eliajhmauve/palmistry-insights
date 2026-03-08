import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PhotoAnalysis from "./pages/PhotoAnalysis";
import PalmReview from "./pages/PalmReview";
import AnalysisReport from "./pages/AnalysisReport";
import RecordLibrary from "./pages/RecordLibrary";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/photo-analysis" element={<PhotoAnalysis />} />
          <Route path="/palm-review" element={<PalmReview />} />
          <Route path="/report/:id" element={<AnalysisReport />} />
          <Route path="/records" element={<RecordLibrary />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
