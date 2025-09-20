import "./global.css";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, useLocation, Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from 'react-helmet-async';
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense, useEffect, useMemo, StrictMode } from 'react';
import { Loading } from "@/components/ui/loading";

const Toaster = lazy(() => import("@/components/ui/toaster").then(mod => ({ default: mod.Toaster })));
const Sonner = lazy(() => import("@/components/ui/sonner").then(mod => ({ default: mod.Toaster })));
const PageTransition = lazy(() => import("@/components/site/PageTransition").then(mod => ({ default: mod.PageTransition })));
const StarsBackground = lazy(() => import("./components/ui/stars-background").then(mod => ({ default: mod.StarsBackground })));
const ShootingStars = lazy(() => import("./components/ui/shooting-stars").then(mod => ({ default: mod.ShootingStars })));

const HomeHero = lazy(() => import("@/pages/HomeHero").then(mod => ({ default: mod.HomeHero })));
const IconExplorer = lazy(() => import("@/pages/IconExplorer").then(mod => ({ default: mod.IconExplorer })));
const Docs = lazy(() => import("@/pages/Docs"));
const ContactPage = lazy(() => import("@/pages/Contact"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      retry: 1,
      refetchOnWindowFocus: false,
      gcTime: 5 * 60 * 1000 // 5 minutes
    }
  }
});

function AppLayout() {
  const location = useLocation();

  useEffect(() => {
    // Use smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const showBackground = useMemo(() => {
    return location.pathname !== "/" && location.pathname !== "/contact";
  }, [location]);

  return (
    <>
      {showBackground && (
        <div className="pointer-events-none fixed inset-0 z-50 select-none">
          <Suspense fallback={null}>
            <ShootingStars />
            <StarsBackground />
          </Suspense>
        </div>
      )}
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Suspense fallback={<Loading />}><PageTransition><HomeHero /></PageTransition></Suspense>,
      },
      {
        path: "icons",
        element: <Suspense fallback={<Loading />}><PageTransition><IconExplorer /></PageTransition></Suspense>,
      },
      {
        path: "docs",
        element: <Suspense fallback={<Loading />}><PageTransition><Docs /></PageTransition></Suspense>,
      },
      {
        path: "contact",
        element: <Suspense fallback={<Loading />}><PageTransition><ContactPage /></PageTransition></Suspense>,
      },
      {
        path: "*",
        element: <Suspense fallback={<Loading />}><PageTransition><NotFound /></PageTransition></Suspense>,
      },
    ],
  },
], {
  future: {
    v7_normalizeFormMethod: true,
  },
});

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Suspense fallback={null}>
          <Toaster />
          <Sonner />
        </Suspense>
        <RouterProvider router={router} />
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

// Modified development/production rendering
createRoot(document.getElementById("root")!).render(
  process.env.NODE_ENV === 'development' ? (
    <StrictMode>
      <App />
    </StrictMode>
  ) : (
    <App />
  )
);
