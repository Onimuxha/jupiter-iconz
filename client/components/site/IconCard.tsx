import { motion } from "framer-motion";
import { useState } from "react";
import { Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface IconCardProps {
  name: string;
  component: React.ComponentType<{ size?: number; className?: string; "aria-label"?: string }>;
  size: number;
  onClick?: () => void;
}

export function IconCard({ name, component: Icon, size, onClick }: IconCardProps) {
  const [copied, setCopied] = useState(false);

  const handle = async () => {
    const text = name;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
      onClick?.();
    } catch {
      // ignore
    }
  };

  return (
    <motion.button
      layout
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.98 }}
      onClick={handle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handle();
        }
      }}
      aria-label={`Copy icon name ${name}`}
      className={cn(
        "group relative flex flex-col items-center justify-center rounded-xl border border-input bg-card p-4 text-card-foreground shadow-sm outline-none transition-colors hover:bg-accent",
        "focus-visible:ring-2 focus-visible:ring-ring",
      )}
    >
      <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-lg bg-muted shadow-inner">
        <Icon size={size} aria-label={name} />
      </div>
      <div className="flex items-center gap-2 text-sm font-medium">
        <span>{name}</span>
        <Copy className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100" />
      </div>
      {copied && (
        <span className="absolute bottom-2 rounded bg-black/70 px-2 py-0.5 text-[10px] text-white dark:bg-white/20">
          Copied
        </span>
      )}
    </motion.button>
  );
}
