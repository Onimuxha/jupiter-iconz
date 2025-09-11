import { useMemo, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Download, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { copyText } from "@/lib/copy";
import { CodeBlock } from "@/components/ui/code-block";

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
      <DialogContent className="max-w-4xl w-[95vw] max-h-[90vh] overflow-hidden">
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
                <span className="text-xl font-semibold">{name}</span>
              </div>
              <div className="flex gap-2 text-sm">
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">
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
                <input
                  type="range"
                  min={16}
                  max={128}
                  value={size}
                  onChange={(e) => setSize(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              <div className="flex items-center justify-center h-40 bg-gray-50 dark:bg-gray-900 rounded-lg border">
                <Component size={size} />
              </div>

              <div className="flex gap-2">
                <Button onClick={handleCopy} variant="outline" size="sm" className="flex-1">
                  {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                  Copy
                </Button>
                <Button onClick={downloadSvg} variant="outline" size="sm" className="flex-1">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>

            {/* Code */}
            <div className="lg:col-span-3 min-w-0">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium">Code</span>
                <ToggleGroup type="single" value={mode} onValueChange={(v) => v && setMode(v as any)}>
                  <ToggleGroupItem value="jsx" size="sm">JSX</ToggleGroupItem>
                  <ToggleGroupItem value="svg" size="sm">SVG</ToggleGroupItem>
                </ToggleGroup>
              </div>

              <CodeBlock
                language={mode === "jsx" ? "jsx" : "xml"}
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