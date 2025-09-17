import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { IconSearch, IconChevronDown, IconLayoutGrid, IconListDetails, IconFileTypeTsx, IconBolt, IconMoon, IconPalette, IconRestore } from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import Box from "@mui/material/Box";
import { cn } from "@/lib/utils";
import Slider from "@mui/material/Slider";
import { CodeBlock } from "@/components/ui/code-block";
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

const features = [
  {
    iconColor: "text-blue-500",
    title: "Lightning Fast",
    desc: "Optimized SVG icons that load instantly and scale perfectly at any size",
    icon: IconBolt,
  },
  {
    iconColor: "text-green-500",
    title: "TypeScript Ready",
    desc: "Full TypeScript support with intelligent autocomplete and type safety",
    icon: IconFileTypeTsx,
  },
  {
    iconColor: "text-purple-500",
    title: "Dark Mode",
    desc: "Built-in dark mode support with automatic color adaptation",
    icon: IconMoon,
  },
  {
    iconColor: "text-orange-500",
    title: "Brand Colors",
    desc: "Authentic brand colors and consistent visual identity across all icons",
    icon: IconPalette,
  },
];

const stats = [
  { value: "200+", label: "Premium Icons" },
  { value: "7", label: "Categories" },
  { value: "100%", label: "Vector Based" },
  { value: "MIT", label: "License" },
];

const FeatureCard = ({
  iconColor,
  title,
  desc,
  icon: Icon,
}: {
  iconColor: string;
  title: string;
  desc: string;
  icon: React.ElementType;
}) => (
  <div className="text-center p-6 rounded-2xl bg-white/70 dark:bg-white/5 backdrop-blur-sm border border-black/10 dark:border-white/10">
    <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-black/5 dark:bg-white/10 flex items-center justify-center">
      <Icon className={`w-6 h-6 ${iconColor}`} />
    </div>
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
    <p className="text-sm text-gray-600 dark:text-gray-400">{desc}</p>
  </div>

);


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
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-balance text-4xl font-medium md:text-7xl">Jupiter Icons</h1>
            {/* <p className="mt-4 max-w-prose text-muted-foreground mb-8"></p> */}
            <p className="mt-6 text-xl  max-w-prose text-muted-foreground text-gray-600 dark:text-gray-300 mx-auto">
              Premium icon collection designed for modern applications. Over 200+ carefully crafted icons with consistent styling, original brand colors, and seamless integration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {features.map((f, i) => <FeatureCard key={i} {...f} />)}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-t border-b border-white/10">
            {stats.map((s, i) => <StatCard key={i} {...s} />)}
          </div>

          {/* Quick Start */}
          <div className="mt-12 bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
            <h3 className="text-4xl font-medium text-center text-gray-900 dark:text-white mb-10">Quick Start</h3>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>✅ Tree-shakable imports</li>
                <li>✅ Customizable size & colors</li>
                <li>✅ Accessibility built-in</li>
              </ul>
              <CodeBlock
                language="jsx"
                filename="App.tsx"
                code={`# // Install
npm install jupiter-iconz

// Import & Use
import
{ React } from 'jupiter-iconz'
<React size={24} />`}
                highlightLines={[2, 5]}
              />
            </div>
          </div>
        </div>

        {/* Icon Explorer */}
        <section className="mx-auto max-w-7xl px-4 py-12">
          <div className="text-center mb-8">
            <h3 className="text-4xl font-medium text-center text-gray-900 dark:text-white mb-4">Browse Icons</h3>
            <p className="text-lg text-gray-600 dark:text-gray-300">Use filters to find exactly what you need.</p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-between items-center">
            <div className="relative flex-1 max-w-md">
              <IconSearch className="absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search icons..."
                className="pl-12 bg-white/50 dark:bg-gray-900/50 capitalize"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              {[{ mode: "grid", icon: IconLayoutGrid }, { mode: "list", icon: IconListDetails }].map(({ mode, icon: Icon }) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode as "grid" | "list")}
                  className={cn("p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700", viewMode === mode ? "bg-gray-300 dark:bg-gray-700" : "bg-transparent")}
                  title={`Switch to ${mode} view`}
                >
                  <Icon className="w-5 h-5" />
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between mb-4">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium whitespace-nowrap">Size</span>
              <Box sx={{ width: 300 }} className="flex-1">
                <Slider
                  min={16}
                  max={55}
                  value={size}
                  onChange={(_, v) => setSize(typeof v === "number" ? v : v[0])}
                  valueLabelDisplay="auto"
                />
              </Box>
              <span className="text-sm text-gray-500 dark:text-gray-400 text-right tabular-nums">
                {size}px
              </span>
              <button
                type="button"
                onClick={() => setSize(40)}
                title="Reset size"
                className="group p-2 rounded-md text-gray-500 hover:text-black dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
              >
                <IconRestore
                  size={20}
                  className="rotate-180 transition-all duration-300 group-hover:rotate-0"
                />
              </button>

            </div>
            {/* Dropdown */}
            <DropdownMenu open={dropdownOpen} onOpenChange={(open) => setDropdownOpen(open)}>
              <DropdownMenuTrigger asChild>
                <button
                  className={cn(
                    "group inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-all duration-300",
                    "bg-zinc-900/10 dark:bg-zinc-800/40 backdrop-blur border border-white/30 dark:border-zinc-700",
                  )}
                >
                  {tab === "DesignTools" ? "Design" : tab}
                  <IconChevronDown
                    className={cn(
                      "ml-2 h-4 w-4 transition-transform duration-300",
                      dropdownOpen ? "rotate-180" : "rotate-0"
                    )}
                  />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 p-1 mt-2 rounded-xl border border-white/10 dark:border-zinc-800 bg-zinc-500/10 dark:bg-zinc-900/50 backdrop-blur shadow-xl">
                {categories.map((category) => (
                  <DropdownMenuItem
                    key={category}
                    onSelect={() => {
                      setTab(category);
                      setDropdownOpen(false);
                    }}
                    className="flex items-center gap-2 rounded-md px-3 py-2 cursor-pointer text-sm text-zinc-800 dark:text-zinc-200 hover:text-white hover:bg-zinc-900/50 dark:hover:bg-zinc-50/10 transition-colors"
                  >
                    {iconsMap[category]}
                    <span>{category === "DesignTools" ? "Design" : category}</span>
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
