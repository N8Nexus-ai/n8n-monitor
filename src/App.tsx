import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { Sidebar } from "@/components/layout/Sidebar";
import Dashboard from "./pages/Dashboard";
import Workflows from "./pages/Workflows";
import Executions from "./pages/Executions";
import Audit from "./pages/Audit";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="flex min-h-screen bg-gradient-to-br from-background via-background to-background/95">
            <Sidebar />
            <main className="ml-64 flex-1 p-8 animate-fade-in">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/workflows" element={<Workflows />} />
                <Route path="/executions" element={<Executions />} />
                <Route path="/audit" element={<Audit />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
