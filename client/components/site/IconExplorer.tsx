import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, Grid, List } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Categories, allIconsData, icons } from "../../../packages/jupiter-icons/src/index.ts";
import { IconPortal } from "./IconPortal";

export function IconExplorer() {
  const [query, setQuery] = useState("");
  const [size, setSize] = useState(48);
  const [tab, setTab] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const allData = useMemo(
    () => [
      ...Categories.Programming,
      ...Categories.Websites,
      ...Categories.Apps,
      ...Categories.DesignTools,
    ],
    [],
  );

  const categories = ["All", "Programming", "Websites", "Apps", "DesignTools"] as const;

  const filtered = useMemo(() => {
    return allData.filter((i) => {
      const inCat = tab === "All" || i.category === tab;
      const q = query.trim().toLowerCase();
      const text = `${i.name} ${i.category} ${i.keywords.join(" ")}`.toLowerCase();
      return inCat && (q.length === 0 || text.includes(q));
    });
  }, [allData, query, tab]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header Controls */}
      <div className="mb-6 space-y-4">
        {/* Search and View Toggle */}
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              aria-label="Search icons"
              placeholder="Search icons..."
              className="pl-10 bg-white/50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-3">
            {/* View Mode Toggle */}
            <div className="flex rounded-lg border border-gray-200 dark:border-gray-700 p-1 bg-gray-50 dark:bg-gray-800">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="h-8 px-3"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="h-8 px-3"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Size Control and Categories */}
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
          {/* Size Control */}
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
              Size
            </span>
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <input
                id="size"
                type="range"
                min={16}
                max={96}
                value={size}
                onChange={(e) => setSize(parseInt(e.target.value))}
                className="flex-1 min-w-0 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
              <span className="text-sm font-mono text-gray-500 dark:text-gray-400 whitespace-nowrap min-w-[40px]">
                {size}px
              </span>
            </div>
          </div>

          {/* Category Tabs */}
          <Tabs value={tab} onValueChange={(v) => setTab(v)} className="w-full lg:w-auto">
            <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:flex bg-gray-100 dark:bg-gray-800">
              {categories.map((c) => (
                <TabsTrigger 
                  key={c} 
                  value={c} 
                  className="text-xs sm:text-sm px-2 sm:px-4 py-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
                >
                  {c === "DesignTools" ? "Design" : c}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {filtered.length} icon{filtered.length !== 1 ? 's' : ''} 
          {query && ` matching "${query}"`}
          {tab !== "All" && ` in ${tab}`}
        </p>
      </div>

      {/* Icon Grid/List */}
      <Tabs value={tab} onValueChange={(v) => setTab(v)}>
        {categories.map((c) => (
          <TabsContent key={c} value={c} className="mt-0">
            <IconGrid 
              category={c} 
              size={size} 
              query={query} 
              data={filtered} 
              viewMode={viewMode}
            />
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}

function IconGrid({
  category,
  size,
  query,
  data,
  viewMode,
}: {
  category: string;
  size: number;
  query: string;
  data: { name: string; category: string; keywords: string[] }[];
  viewMode: "grid" | "list";
}) {
  const visible = data.filter((i) => (category === "All" ? true : i.category === category));

  if (!visible.length) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 p-8 sm:p-12 text-center"
      >
        <Search className="h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
          No icons found
        </h3>
        <p className="text-gray-600 dark:text-gray-400 max-w-md">
          {query ? `No icons match "${query}"` : "No icons in this category"}. 
          Try adjusting your search or selecting a different category.
        </p>
      </motion.div>
    );
  }

  const gridClasses = viewMode === "grid" 
    ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-3 sm:gap-4"
    : "flex flex-col gap-2";

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={category + query + viewMode}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        className={gridClasses}
      >
        {visible.map((i) => {
          const Comp = icons[i.name as keyof typeof icons] as any;
          if (!Comp) return null;
          return (
            <motion.div
              key={i.name}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <IconItem 
                name={i.name} 
                Comp={Comp} 
                size={size} 
                viewMode={viewMode}
                category={i.category}
                keywords={i.keywords}
              />
            </motion.div>
          );
        })}
      </motion.div>
    </AnimatePresence>
  );
}

function IconItem({
  name,
  Comp,
  size,
  viewMode,
  category,
  keywords,
}: {
  name: string;
  Comp: React.ComponentType<{ size?: number; "aria-label"?: string }>;
  size: number;
  viewMode: "grid" | "list";
  category: string;
  keywords: string[];
}) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  if (viewMode === "list") {
    return (
      <>
        <motion.button
          whileHover={{ x: 2 }}
          whileTap={{ scale: 0.98 }}
          className="flex w-full items-center gap-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-left"
          onClick={handleOpen}
        >
          <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg">
            <Comp size={Math.min(size, 32)} aria-label={name} />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-medium text-gray-900 dark:text-gray-100 truncate">
              {name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
              {category} • {keywords.slice(0, 3).join(", ")}
            </p>
          </div>
        </motion.button>
        <IconPortal name={name} open={open} onOpenChange={setOpen} />
      </>
    );
  }

  return (
    <>
      <motion.button
        whileHover={{ y: -2, scale: 1.02 }}
        whileTap={{ scale: 0.95 }}
        className="flex w-full flex-col items-center gap-3 p-3 sm:p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200 shadow-sm hover:shadow-md"
        onClick={handleOpen}
      >
        <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <Comp size={Math.min(size, 48)} aria-label={name} />
        </div>
        <span className="text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-100 text-center leading-tight">
          {name}
        </span>
      </motion.button>
      <IconPortal name={name} open={open} onOpenChange={setOpen} />
    </>
  );
}