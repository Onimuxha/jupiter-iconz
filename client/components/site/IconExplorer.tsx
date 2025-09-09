import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Categories, allIconsData, icons } from "../../../packages/jupiter-icons/src/index.ts";
import { IconPortal } from "./IconPortal";

export function IconExplorer() {
  const [query, setQuery] = useState("");
  const [size, setSize] = useState(48);
  const [tab, setTab] = useState("All");

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
    <section className="mx-auto max-w-6xl px-4 py-10 md:py-16">
      <div className="mb-4 flex flex-col justify-between gap-4 md:mb-6 md:flex-row md:items-center">
        <div className="flex items-center gap-3">
          <div className="relative w-72 rounded-full border border-white/20 bg-white/10 shadow-sm backdrop-blur-md dark:bg-white/5">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-70" />
            <Input
              aria-label="Search icons"
              placeholder="Search icons..."
              className="h-10 w-full rounded-full border-0 bg-transparent pl-9 pr-3 focus-visible:ring-0 placeholder:text-foreground/60"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="size" className="text-sm text-muted-foreground">
              Size
            </label>
            <input
              id="size"
              type="range"
              min={16}
              max={128}
              value={size}
              onChange={(e) => setSize(parseInt(e.target.value))}
            />
            <span className="tabular-nums text-sm text-muted-foreground">{size}px</span>
          </div>
        </div>
        <Tabs value={tab} onValueChange={(v) => setTab(v)}>
          <TabsList className="rounded-full border border-white/20 bg-white/10 p-1 backdrop-blur-md dark:bg-white/5">
            {categories.map((c) => (
              <TabsTrigger key={c} value={c} aria-label={`Filter ${c}`} className="rounded-full data-[state=active]:bg-white/20">
                {c}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <Tabs value={tab} onValueChange={(v) => setTab(v)}>
        {categories.map((c) => (
          <TabsContent key={c} value={c} className="mt-0">
            <IconGrid category={c} size={size} query={query} data={filtered} />
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
}: {
  category: string;
  size: number;
  query: string;
  data: { name: string; category: string; keywords: string[] }[];
}) {
  const visible = data.filter((i) => (category === "All" ? true : i.category === category));

  if (!visible.length) {
    return (
      <div className="rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground">
        No icons found for “{query}”.
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={category + query}
        layout
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.12 }}
        className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
      >
        {visible.map((i) => {
          const Comp = icons[i.name as keyof typeof icons] as any;
          if (!Comp) return null;
          return (
            <div key={i.name} className="focus-within:ring-2 focus-within:ring-ring">
              <IconItem name={i.name} Comp={Comp} size={size} />
            </div>
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
}: {
  name: string;
  Comp: React.ComponentType<{ size?: number; "aria-label"?: string }>;
  size: number;
}) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  return (
    <>
      <motion.button
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="flex w-full flex-col items-center gap-2 rounded-xl border border-white/20 bg-white/10 p-4 text-center shadow-sm backdrop-blur-md transition hover:bg-white/20 dark:bg-white/5 dark:hover:bg-white/10"
        aria-label={`Open details for ${name}`}
        onClick={handleOpen}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleOpen();
          }
        }}
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-white/40 shadow-inner backdrop-blur-md dark:bg-white/10">
          <Comp size={size} aria-label={name} />
        </div>
        <span className="text-sm font-medium">{name}</span>
      </motion.button>
      <IconPortal name={name} open={open} onOpenChange={setOpen} />
    </>
  );
}
