import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils.ts";
import { Search, ChevronDown, PenTool, LayoutGrid, Code2, Globe2, Blocks, ListTodo, Bot, DraftingCompass, VectorSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Categories, icons } from "../../../packages/jupiter-icons/src/index.ts";
import { IconPortal } from "./IconPortal";
import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSearchParams } from "react-router-dom";

export function IconExplorer() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [size, setSize] = useState(48);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Initialize tab from URL or localStorage, fallback to "All"
  const [tab, setTab] = useState(() => {
    const urlTab = searchParams.get("category");
    const savedTab = localStorage.getItem("selectedCategory");
    return urlTab || savedTab || "All";
  });

  // Persist tab changes to URL and localStorage
  useEffect(() => {
    localStorage.setItem("selectedCategory", tab);
    setSearchParams({ category: tab }, { replace: true });
  }, [tab, setSearchParams]);

  const allData = useMemo(
    () => [
      ...Categories.Programming,
      ...Categories.Websites,
      ...Categories.Apps,
      ...Categories.DesignTools,
      ...Categories.AI,
      ...Categories.Tools,
      ...Categories.Frameworks,
    ],
    [],
  );

  const categories = ["All", "Programming", "Websites", "Apps", "DesignTools", "AI", "Tools", "Frameworks"] as const;
  const iconsMap: Record<string, React.ReactNode> = {
    All: <LayoutGrid className="w-4 h-4 mr-2" />,
    Programming: <Code2 className="w-4 h-4 mr-2" />,
    Websites: <Globe2 className="w-4 h-4 mr-2" />,
    Apps: <Blocks className="w-4 h-4 mr-2" />,
    DesignTools: <PenTool className="w-4 h-4 mr-2" />,
    AI: <Bot className="w-4 h-4 mr-2" />,
    Tools: <DraftingCompass className="w-4 h-4 mr-2" />,
    Frameworks: <VectorSquare className="w-4 h-4 mr-2" />,
  }

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
            <Search className="absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              aria-label="Search icons"
              placeholder="Search icons..."
              className="pl-12 bg-white/50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center">
            <div className="flex rounded-lg border border-gray-200 dark:border-gray-700 p-1 gap-2 bg-gray-50 dark:bg-gray-800">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                onClick={() => setViewMode("grid")}
                className="h-8 px-4"
              >
                <LayoutGrid size={23} className="text-white" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                onClick={() => setViewMode("list")}
                className="h-8 px-4"
              >
                <ListTodo size={23} className="text-white" />
              </Button>
            </div>
          </div>
        </div>

        {/* Size Control and Categories */}
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
          {/* Size Control */}
          <div className="flex items-center gap-4 min-w-0 justify-center">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
              Size
            </span>
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <Box sx={{
                width: 300,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Slider
                  defaultValue={50}
                  aria-label="Default"
                  id="size"
                  min={16}
                  max={100}
                  value={size}
                  onChange={(_, value) => setSize(typeof value === "number" ? value : value[0])}
                  valueLabelDisplay="auto"
                  sx={{
                    '& .MuiSlider-thumb': {
                      marginTop: 0,
                    },
                    '& .MuiSlider-track': {
                      marginTop: 0,
                    }
                  }}
                />
              </Box>
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                {size}px
              </span>
            </div>
          </div>

          {/* Category Dropdown (ShadCN) */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "min-w-[140px] justify-between rounded-full bg-gradient-to-r from-gray-100 via-white to-gray-100 dark:from-gray-800 dark:to-gray-900 px-4 py-2 text-sm",
                  "focus-visible:ring-0 focus-visible:ring-offset-0 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-current"
                )}
              >
                {tab === "DesignTools" ? "Design" : tab}
                <ChevronDown className="w-4 h-4 ml-2 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="w-48 border-none backdrop-blur-md bg-gradient-to-r from-gray-100 via-white to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-xl p-1"
            >
              {categories.map((category) => (
                <DropdownMenuItem
                  key={category}
                  onSelect={() => setTab(category)}
                  className={cn(
                    "rounded-full px-3 py-2 text-sm transition-colors hover:bg-gray-200 dark:hover:bg-gray-700 focus-visible:outline-none flex items-center",
                    tab === category ? "font-medium text-purple-600" : "text-foreground"
                  )}
                >
                  {iconsMap[category]}
                  {category === "DesignTools" ? "Design" : category}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>

          </DropdownMenu>
        </div>
      </div>

      <div className="mb-4 max-w-full">
        <p className="text-sm text-gray-600 dark:text-gray-400 truncate max-w-xs">
          {filtered.length} icon{filtered.length !== 1 ? "s" : ""}
          {query && ` matching "${query}"`}
          {tab !== "All" && ` in ${tab}`}
        </p>
      </div>

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
        <img
          src="client/assets/nodata.svg"
          alt="No icons found"
          className="h-24 w-24 mb-4 opacity-70"
        />
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
          No icons found
        </h3>
        <p className="text-gray-600 dark:text-gray-400 truncate max-w-xs">
          {query ? `No icons match "${query}"` : "No icons in this category"}.
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
        whileHover={{ y: -4, scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleOpen}
        className="group w-full flex flex-col items-center gap-3 p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-800/60 hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 shadow-sm hover:shadow-md"
      >
        
        <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gray-100 dark:bg-gray-700 rounded-lg transition-colors duration-300">
          <Comp size={Math.min(size, 48)} aria-label={name} />
        </div>
        <div className="flex flex-col items-center gap-1 leading-tight text-center">
          <span className="text-sm sm:text-base font-light text-gray-900 dark:text-gray-100">
            {name}
          </span>
          <span className="px-2 text-xs font-light py-1 bg-gray-200 dark:bg-gray-700 rounded">
            {category}
          </span>
        </div>
      </motion.button>

      <IconPortal name={name} open={open} onOpenChange={setOpen} />
    </>
  );
}