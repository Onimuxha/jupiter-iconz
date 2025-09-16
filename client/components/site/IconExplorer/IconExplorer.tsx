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

// ✨ Feature data
const features = [
  {
    iconColor: "text-blue-500",
    title: "Lightning Fast",
    desc: "Optimized SVG icons that load instantly and scale perfectly at any size",
    path: "M13 10V3L4 14h7v7l9-11h-7z",
  },
  {
    iconColor: "text-green-500",
    title: "TypeScript Ready",
    desc: "Full TypeScript support with intelligent autocomplete and type safety",
    path: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    iconColor: "text-purple-500",
    title: "Dark Mode",
    desc: "Built-in dark mode support with automatic color adaptation",
    path: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z",
  },
  {
    iconColor: "text-orange-500",
    title: "Brand Colors",
    desc: "Authentic brand colors and consistent visual identity across all icons",
    path: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
  },
];

// ✨ Stats data
const stats = [
  { value: "200+", label: "Premium Icons" },
  { value: "7", label: "Categories" },
  { value: "100%", label: "Vector Based" },
  { value: "MIT", label: "License" },
];

// ✨ Feature card component
const FeatureCard = ({ iconColor, title, desc, path }: any) => (
  <div className="text-center p-6 rounded-2xl bg-white/5 dark:bg-white/5 backdrop-blur-sm border border-white/10">
    <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-white/10 flex items-center justify-center">
      <svg className={`w-6 h-6 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={path} />
      </svg>
    </div>
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
    <p className="text-sm text-gray-600 dark:text-gray-400">{desc}</p>
  </div>
);

// ✨ Stat card
const StatCard = ({ value, label }: any) => (
  <div className="text-center">
    <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{value}</div>
    <div className="text-sm text-gray-600 dark:text-gray-400">{label}</div>
  </div>
);

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
    () => Object.values(Categories).flat(),
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
      <main className="pt-28">
        {/* Hero */}
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-6xl lg:text-7xl">Jupiter Icons</h1>
            <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Premium icon collection designed for modern applications. Over 200+ carefully crafted icons with consistent styling, original brand colors, and seamless integration.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {features.map((f, i) => <FeatureCard key={i} {...f} />)}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-t border-b border-white/10">
            {stats.map((s, i) => <StatCard key={i} {...s} />)}
          </div>

          {/* Quick Start */}
          <div className="mt-12 bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-center text-gray-900 dark:text-white mb-4">Quick Start</h3>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>✅ Tree-shakable imports</li>
                <li>✅ Customizable size & colors</li>
                <li>✅ Accessibility built-in</li>
              </ul>
              {/* // Install
npm install jupiter-iconz
// Import & Use
import
{ React } from 'jupiter-iconz'
<React size={24} /> */}
              <div className="bg-gray-900 dark:bg-gray-800 rounded-xl p-4 font-mono text-sm text-white">
                <p className="text-gray-400 mb-2">// Install</p>
                <p className="text-green-400">npm install jupiter-iconz</p>
                <p className="text-gray-400 mt-4 mb-2">// Usage</p>
                <code className="text-blue-400">{"<React size={24} />"}</code>
              </div>
            </div>
          </div>
        </div>

        {/* Icon Explorer */}
        <section className="mx-auto max-w-7xl px-4 py-12">
          {/* Heading */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Browse Icons</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">Use filters to find exactly what you need.</p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-between items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search icons..."
                className="pl-12 bg-white/50 dark:bg-gray-900/50"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              {[{ mode: "grid", icon: LayoutGrid }, { mode: "list", icon: ListTodo }].map(({ mode, icon: Icon }) => (
                <Button
                  key={mode}
                  variant="ghost"
                  onClick={() => setViewMode(mode as "grid" | "list")}
                  className={cn("h-8 px-4", viewMode === mode ? "bg-gray-300 dark:bg-gray-700" : "")}
                >
                  <Icon size={20} />
                </Button>
              ))}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between mb-4">
            {/* Slider */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Size</span>
              <Box sx={{ width: 300 }}>
                <Slider
                  min={16}
                  max={55}
                  value={size}
                  onChange={(_, v) => setSize(typeof v === "number" ? v : v[0])}
                  valueLabelDisplay="auto"
                />
              </Box>
              <span className="text-sm text-gray-500 dark:text-gray-400">{size}px</span>
            </div>

            {/* Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="glass" className="rounded-full px-4">
                  {tab === "DesignTools" ? "Design" : tab}
                  <ChevronDown className="ml-2 w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 p-1 rounded-xl">
                {categories.map((category) => (
                  <DropdownMenuItem key={category} onSelect={() => setTab(category)}>
                    {iconsMap[category]}
                    {category === "DesignTools" ? "Design" : category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Results */}
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            {filtered.length} icon{filtered.length !== 1 ? "s" : ""}
            {query && ` matching "${query}"`}
            {tab !== "All" && ` in ${tab}`}
          </p>

          <Tabs value={tab} onValueChange={setTab}>
            {categories.map((c) => (
              <TabsContent key={c} value={c}>
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
