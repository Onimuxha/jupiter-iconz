import { useMemo, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Download, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { copyText } from "@/lib/copy";
import { CodeBlock } from "@/components/ui/code-block";
import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { cn } from "@/lib/utils";

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
  const [size, setSize] = useState(48);
  const [copied, setCopied] = useState(false);

  const jsxCode = `<${name} size={24} />`; // Remove the import statement
  const svgMin = useMemo(() => svgContent.trim(), [svgContent]);

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

  const handleCopy = async () => {
    const code = mode === "jsx" ? jsxCode : svgMin;
    try {
      await copyText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success("Component usage copied to clipboard");
    } catch (e) {
      toast.error("Copy failed");
    }
  };

  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="rounded-2xl max-w-4xl w-[95vw] px-5 py-10 max-h-[90vh] overflow-hidden bg-white/40 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 shadow-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          {/* Header */}
          <DialogHeader className="pb-4 border-b">
            <DialogTitle className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <Component size={30} />
                </div>
                <div className="flex text-left flex-col">
                  <span className="text-xl font-light">{name}</span>
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    {keywords.slice(0, 3).join(", ")}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 text-sm font-medium">
                <span className="px-2 py-1 bg-gray-100/60 dark:bg-gray-800 rounded">
                  {category}
                </span>
              </div>
            </DialogTitle>
          </DialogHeader>

          {/* Content */}
          <div className="grid lg:grid-cols-5 gap-6 py-6">
            {/* Preview */}
            <div className="lg:col-span-2 space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Size</span>
                  <span className="text-sm text-gray-500">{size}px</span>
                </div>
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
              </div>

              <div className="flex items-center justify-center h-40 bg-gray-50 dark:bg-gray-900 rounded-lg border relative overflow-hidden">
                <div
                  className={cn(
                    "absolute inset-0",
                    "[background-size:20px_20px]",
                    "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
                    "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]"
                  )}
                />
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-gray-50/80 dark:bg-gray-900/80 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
                <div className="backdrop-blur-lg bg-gray-500/30 dark:bg-white/10 rounded-xl px-6 py-4 shadow-inner border border-white/20 dark:border-white/10 relative z-10">
                  <Component size={size} />
                </div>
              </div>


              <div className="flex gap-2">
                <Button
                  onClick={handleCopy}
                  variant="ghost"
                  size="sm"
                  className="flex-1 rounded-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                  Copy
                </Button>
                <Button
                  onClick={downloadSvg}
                  variant="ghost"
                  size="sm"
                  className="flex-1 rounded-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>

            </div>

            {/* Code */}
            <div className="lg:col-span-3 min-w-0">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium">Code</span>
                <ToggleGroup
                  type="single"
                  value={mode}
                  onValueChange={(v) => v && setMode(v as any)}
                  className="flex gap-2 bg-transparent"
                >
                  <ToggleGroupItem
                    value="jsx"
                    size="sm"
                    className="rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 data-[state=on]:bg-zinc-100 dark:data-[state=on]:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                  >
                    JSX
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="svg"
                    size="sm"
                    className="rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 data-[state=on]:bg-zinc-100 dark:data-[state=on]:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                  >
                    SVG
                  </ToggleGroupItem>
                </ToggleGroup>

              </div>

              <CodeBlock
                language={mode === "jsx" ? "tsx" : "xml"}
                filename={`${name}.${mode}`}
                code={mode === "jsx" ?
                  `import { ${name} } from "jupiter-iconz";\n\n${jsxCode}` :
                  svgMin
                }
                highlightLines={mode === "jsx" ? [3] : undefined}
              />
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}