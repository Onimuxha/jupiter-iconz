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

export function IconExplorer() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [size, setSize] = useState(48);
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
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
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
  );
}
