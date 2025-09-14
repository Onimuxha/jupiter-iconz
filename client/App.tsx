import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import "./global.css";

import { createRoot } from "react-dom/client";
import { PageTransition } from "@/components/site/PageTransition";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Playground from "./pages/Playground";
import Docs from "./pages/Docs";
import { StarsBackground } from "./components/ui/stars-background.tsx";
import { ShootingStars } from "./components/ui/shooting-stars.tsx";


const queryClient = new QueryClient();

// Create router with future flags enabled
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <PageTransition><Index /></PageTransition>,
    },
    {
      path: "/playground",
      element: <PageTransition><Playground /></PageTransition>,
    },
    {
      path: "/docs",
      element: <PageTransition><Docs /></PageTransition>,
    },
    {
      path: "*",
      element: <PageTransition><NotFound /></PageTransition>,
    },
  ],
  {
    future: {
      v7_normalizeFormMethod: true
    }
  }
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <RouterProvider router={router} />
    </TooltipProvider>
    <div className="pointer-events-none fixed inset-0 z-50 select-none">
      <ShootingStars />
      <StarsBackground />
    </div>

  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
