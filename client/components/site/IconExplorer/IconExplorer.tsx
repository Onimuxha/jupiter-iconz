import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, ChevronDown, LayoutGrid, ListTodo } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import Box from "@mui/material/Box";
import { cn } from "@/lib/utils";
import Slider from "@mui/material/Slider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Categories } from "../../../../packages/jupiter-icons/src";
import { IconGrid } from "./IconGrid";
import { categories, iconsMap } from "./iconUtils";
import { SiteHeader } from "../SiteHeader";
import { SiteFooter } from "../SiteFooter";

export function IconExplorer() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [size, setSize] = useState(40);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const [tab, setTab] = useState(() => {
    const urlTab = searchParams.get("category");
    const savedTab = localStorage.getItem("selectedCategory");
    return urlTab || savedTab || "All";
  });

  useEffect(() => {
    localStorage.setItem("selectedCategory", tab);
    setSearchParams({ category: tab }, { replace: true });
  }, [tab, setSearchParams]);

  const allData = useMemo(
    () => [
      ...Categories.Programming,
      ...Categories.Apps,
      ...Categories.DesignTools,
      ...Categories.AI,
      ...Categories.Tools,
      ...Categories.Frameworks,
      ...Categories.Other,
    ],
    []
  );

  const filtered = useMemo(() => {
    return allData.filter((i) => {
      const inCat = tab === "All" || i.category === tab;
      const q = query.trim().toLowerCase();
      const text = `${i.name} ${i.category} ${i.keywords.join(" ")}`.toLowerCase();
      return inCat && (q.length === 0 || text.includes(q));
    });
  }, [allData, query, tab]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/40">
      <SiteHeader />
      
      <main className="pt-16">
        {/* Hero Section */}
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl lg:text-7xl">
              Jupiter Icons
            </h1>
            <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Premium icon collection designed for modern applications. Over 200+ carefully crafted icons with consistent styling, original brand colors, and seamless integration.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="text-center p-6 rounded-2xl bg-white/5 dark:bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Lightning Fast</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Optimized SVG icons that load instantly and scale perfectly at any size</p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-white/5 dark:bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-green-500/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">TypeScript Ready</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Full TypeScript support with intelligent autocomplete and type safety</p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-white/5 dark:bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Dark Mode</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Built-in dark mode support with automatic color adaptation</p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-white/5 dark:bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-orange-500/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Brand Colors</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Authentic brand colors and consistent visual identity across all icons</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-t border-b border-white/10">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">200+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Premium Icons</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">7</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">100%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Vector Based</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">MIT</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">License</div>
            </div>
          </div>

          {/* Usage Example */}
          <div className="mt-12 bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">Quick Start</h3>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Install Jupiter Icons and start using beautiful, consistent icons in your React projects immediately.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">Tree-shakable imports</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">Customizable size & colors</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">Accessibility built-in</span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-900 dark:bg-gray-800 rounded-xl p-4 font-mono text-sm">
                <div className="text-gray-400 mb-2">// Install</div>
                <div className="text-green-400 mb-4">npm install jupiter-iconz</div>
                <div className="text-gray-400 mb-2">// Import & Use</div>
                <div className="text-blue-400">import</div> <div className="text-yellow-400 inline">{"{ React }"}</div> <div className="text-blue-400 inline">from</div> <div className="text-green-300 inline">'jupiter-iconz'</div>
                <br />
                <div className="text-gray-300 mt-2">{"<React size={24} />"}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Icon Explorer Content */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Browse Icons</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Search through our carefully curated collection. Use filters to find exactly what you need for your project.
            </p>
          </div>
          {/* Search + View Mode */}
          <div className="mb-6 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search icons..."
                  className="pl-12 bg-white/50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>

              <div className="flex items-center">
                <div className="flex rounded-lg border p-1 gap-2 bg-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-700">
                  <Button
                    variant="ghost"
                    onClick={() => setViewMode("grid")}
                    className={cn(
                      "h-8 px-4 flex items-center justify-center rounded-md transition-colors",
                      viewMode === "grid"
                        ? "bg-gray-300 dark:bg-gray-700 text-black dark:text-white"
                        : "hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
                    )}
                  >
                    <LayoutGrid size={20} />
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => setViewMode("list")}
                    className={cn(
                      "h-8 px-4 flex items-center justify-center rounded-md transition-colors",
                      viewMode === "list"
                        ? "bg-gray-300 dark:bg-gray-700 text-black dark:text-white"
                        : "hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
                    )}
                  >
                    <ListTodo size={20} />
                  </Button>
                </div>
              </div>
            </div>

            {/* Size + Category */}
            <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
              <div className="flex items-center gap-4 justify-center">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Size</span>
                <Box sx={{ width: 300, display: "flex", alignItems: "center" }}>
                  <Slider
                    defaultValue={50}
                    min={16}
                    max={55}
                    value={size}
                    onChange={(_, v) => setSize(typeof v === "number" ? v : v[0])}
                    valueLabelDisplay="auto"
                  />
                </Box>
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">{size}px</span>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="glass" className="min-w-[140px] justify-between rounded-full px-4 py-2 text-sm">
                    {tab === "DesignTools" ? "Design" : tab}
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48 p-1 rounded-xl">
                  {categories.map((category) => (
                    <DropdownMenuItem key={category} onSelect={() => setTab(category)} className="flex items-center hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                      {iconsMap[category]}
                      {category === "DesignTools" ? "Design" : category}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Result count */}
          <div className="mb-4 max-w-full">
            <p className="text-sm text-gray-600 dark:text-gray-400 truncate max-w-xs">
              {filtered.length} icon{filtered.length !== 1 ? "s" : ""}
              {query && ` matching "${query}"`}
              {tab !== "All" && ` in ${tab}`}
            </p>
          </div>

          {/* Icon Grid */}
          <Tabs value={tab} onValueChange={(v) => setTab(v)}>
            {categories.map((c) => (
              <TabsContent key={c} value={c} className="mt-0">
                <IconGrid category={c} size={size} query={query} data={filtered} viewMode={viewMode} />
              </TabsContent>
            ))}
          </Tabs>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}