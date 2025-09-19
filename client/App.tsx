import "./global.css";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from 'react-helmet-async';
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { PageTransition } from "@/components/site/PageTransition";
import { HomeHero } from "@/pages/HomeHero.tsx";
import { StarsBackground } from "./components/ui/stars-background.tsx";
import { ShootingStars } from "./components/ui/shooting-stars.tsx";
import { IconExplorer } from "./pages/IconExplorer.tsx";
import { useMemo, useEffect } from "react";
import { Outlet } from "react-router-dom";

import NotFound from "./pages/NotFound";
import Docs from "./pages/Docs";
import ContactPage from "./pages/Contact.tsx";

const queryClient = new QueryClient();

function AppLayout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const showBackground = useMemo(() => {
    return location.pathname !== "/" && location.pathname !== "/contact";
  }, [location]);


  return (
    <>
      {showBackground && (
        <div className="pointer-events-none fixed inset-0 z-50 select-none">
          <ShootingStars />
          <StarsBackground />
        </div>
      )}
      <Outlet />
    </>
  );
}

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: <PageTransition><HomeHero /></PageTransition>,
        },
        {
          path: "icons",
          element: <PageTransition><IconExplorer /></PageTransition>,
        },
        {
          path: "docs",
          element: <PageTransition><Docs /></PageTransition>,
        },
        {
          path: "contact",
          element: <PageTransition><ContactPage /></PageTransition>,
        },
        {
          path: "*",
          element: <PageTransition><NotFound /></PageTransition>,
        },
      ],
    },
  ],
  {
    future: {
      v7_normalizeFormMethod: true,
    },
  }
);

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <RouterProvider router={router} />
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
