import "./global.css";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, useLocation, Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense, useEffect, useMemo, useState, StrictMode } from "react";
import { Loading } from "@/components/ui/loading";
import { SpeedInsights } from "@vercel/speed-insights/react";

// Lazy imports
const LazyBackground = lazy(() => import("./components/ui/LazyBackground"));
const Toaster = lazy(() => import("@/components/ui/toaster").then(mod => ({ default: mod.Toaster })));
const Sonner = lazy(() => import("@/components/ui/sonner").then(mod => ({ default: mod.Toaster })));
const PageTransition = lazy(() => import("@/components/site/PageTransition").then(mod => ({ default: mod.PageTransition })));

const HomeHero = lazy(() => import("@/pages/HomeHero").then(mod => ({ default: mod.HomeHero })));
const IconExplorer = lazy(() => import("@/pages/IconExplorer").then(mod => ({ default: mod.IconExplorer })));
const Docs = lazy(() => import("@/pages/Docs"));
const ContactPage = lazy(() => import("@/pages/Contact"));
const NotFound = lazy(() => import("@/pages/NotFound"));

// Query client setup
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      retry: 1,
      refetchOnWindowFocus: false,
      gcTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function AppLayout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  const showBackground = useMemo(() => {
    return location.pathname !== "/" && location.pathname !== "/contact";
  }, [location]);

  return (
    <>
      {showBackground && (
        <Suspense fallback={null}>
          <LazyBackground />
        </Suspense>
      )}
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
    </>
  );
}

// Routes
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <AppLayout />,
      children: [
        { index: true, element: <HomeHero /> },
        { path: "icons", element: <IconExplorer /> },
        { path: "docs", element: <Docs /> },
        { path: "contact", element: <ContactPage /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ],
  {
    future: {
      v7_normalizeFormMethod: true,
    },
  }
);

const App = () => {
  const [showToasters, setShowToasters] = useState(false);

  useEffect(() => {
    setShowToasters(true);
  }, []);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          {showToasters && (
            <Suspense fallback={null}>
              <Toaster />
              <Sonner />
            </Suspense>
          )}
          <RouterProvider router={router} />
          <SpeedInsights />
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

// Mount the app
createRoot(document.getElementById("root")!).render(
  process.env.NODE_ENV === "development" ? (
    <StrictMode>
      <App />
    </StrictMode>
  ) : (
    <App />
  )
);
