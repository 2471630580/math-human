import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import VocabularyPage from "./pages/listen/ListenPage";
import SpeakPage from "./pages/speak/SpeakPage";
import ListeningPage from "./pages/listening/ListeningPage";
import WritingPage from "./pages/writing/WritingPage";
import ReadingPage from "./pages/reading/ReadingPage";
import GamePage from "./pages/game/GamePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/vocabulary" element={<VocabularyPage />} />
          <Route path="/speak" element={<SpeakPage />} />
          <Route path="/listening" element={<ListeningPage />} />
          <Route path="/writing" element={<WritingPage />} />
          <Route path="/reading" element={<ReadingPage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
