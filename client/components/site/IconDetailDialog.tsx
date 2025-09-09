import { useMemo, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Copy, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";
import { copyText } from "@/lib/copy";

export interface IconDetailProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  name: string;
  Component: React.ComponentType<{ size?: number; className?: string; "aria-label"?: string }>;
  svgContent: string;
  category: string;
  keywords: string[];
  weights: string[];
}

export function IconDetailDialog(props: IconDetailProps) {
  const { open, onOpenChange, name, Component, svgContent, category, keywords, weights } = props;
  const [mode, setMode] = useState<"jsx" | "svg">("jsx");
  const [size, setSize] = useState(64);

  const importLine = `import { ${name} } from "jupiter-icons"`;
  const usage = `<${name} size={24} />`;
  const jsxSnippet = `${importLine}\n\n${usage}`;

  const svgMin = useMemo(() => svgContent.trim(), [svgContent]);

  const toCopy = mode === "jsx" ? jsxSnippet : svgMin;

  const copy = async () => {
    const ok = await copyText(toCopy);
    ok ? toast.success("Copied to clipboard") : toast.error("Copy failed");
  };

  const downloadSvg = () => {
    try {
      const blob = new Blob([svgMin], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${name}.svg`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      toast.success("SVG downloaded");
    } catch (e) {
      toast.error("Download failed");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl border border-white/20 bg-white/10 backdrop-blur-md dark:bg-zinc-900/60">
        <AnimatePresence mode="wait">
          {open && (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <DialogHeader>
                <DialogTitle className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center sm:gap-6">
                  <span className="text-lg sm:text-xl font-semibold tracking-tight">{name}</span>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-[13px] text-muted-foreground">
                    <span className="ml-[-2px] rounded-full border px-2 py-0.5">{category}</span>
                    <span className="mx-auto rounded-full border px-2 py-0.5">{weights.join(", ")}</span>
                  </div>
                </DialogTitle>
                <DialogDescription className="text-xs sm:text-sm">{keywords.join(" • ")}</DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
                <div className="flex flex-col items-center gap-3 rounded-lg border border-white/20 bg-white/10 p-4 sm:p-6 backdrop-blur-md dark:bg-white/5">
                  <div className="flex w-full flex-wrap items-center gap-3 sm:gap-4">
                    <label htmlFor="preview-size" className="text-xs sm:text-sm text-muted-foreground">
                      Size
                    </label>
                    <input
                      id="preview-size"
                      type="range"
                      min={16}
                      max={160}
                      value={size}
                      onChange={(e) => setSize(parseInt(e.target.value))}
                    />
                    <span className="text-xs sm:text-sm tabular-nums text-muted-foreground">{size}px</span>
                  </div>
                  <div className="flex h-28 w-28 items-center justify-center rounded-md bg-white/40 shadow-inner backdrop-blur-md dark:bg-white/10">
                    <Component size={size} aria-label={`${name} preview`} />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <ToggleGroup type="single" value={mode} onValueChange={(v) => v && setMode(v as any)}>
                      <ToggleGroupItem value="jsx" aria-label="Show JSX">JSX</ToggleGroupItem>
                      <ToggleGroupItem value="svg" aria-label="Show SVG">SVG</ToggleGroupItem>
                    </ToggleGroup>
                  </div>
                  <div className="relative rounded-lg">
                    <pre className={cn("max-h-[45vh] sm:max-h-60 overflow-auto no-scrollbar rounded-md border border-white/20 bg-white/10 p-3 pr-16 text-[12px] sm:text-sm backdrop-blur-md dark:bg-white/5 font-mono whitespace-pre-wrap break-words select-text")} aria-label={mode === "jsx" ? "JSX snippet" : "SVG snippet"}>
{toCopy}
                    </pre>
                    <Button
                      variant="glass"
                      size="icon"
                      onClick={copy}
                      aria-label="Copy code"
                      className="absolute right-2 top-2 sm:right-2 sm:top-2"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="mt-2 flex justify-end">
                    <Button variant="glass" size="sm" onClick={downloadSvg} aria-label="Download SVG" className="gap-2">
                      <Download className="h-4 w-4" /> Download SVG
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
