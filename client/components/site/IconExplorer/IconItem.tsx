import { motion } from "framer-motion";
import { IconPortal } from "../IconPortal";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function IconItem({ name, Comp, size, viewMode, category, keywords }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  if (viewMode === "list") {
    return (
      <>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleOpen}
          className="flex w-full items-center gap-4 p-4 rounded-lg border bg-white/50 dark:bg-gray-800/50"
        >
          <div className="w-12 h-12 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg">
            <Comp size={Math.min(size, 32)} aria-label={name} />
          </div>
          <div className="flex-1 text-left space-y-1">
            <h3 className="font-medium">{name}</h3>
            <div className="text-xs inline-block bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
              {category}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
              {category} • {keywords.slice(0, 9).join(", ")}
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
        className="group w-full flex flex-col items-center gap-3 p-4 rounded-2xl border dark:border-white/20 bg-gray-800/5 dark:bg-gray-800/60">
        <div className="inline-flex items-center justify-center rounded-xl p-2 backdrop-blur-lg bg-black/5 dark:bg-white/5 border border-white/30 dark:border-white/10 shadow-[inset_0_2px_6px_rgba(0,0,0,0.15)] dark:shadow-[inset_0_2px_6px_rgba(255,255,255,0.08)] relative z-10">
          <Comp size={size} aria-label={name} />
        </div>
        <div className="text-center space-y-1">
          <span className="text-sm font-light block">{name}</span>
          <div className="text-xs inline-block bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
            {category}
          </div>
        </div>
      </motion.button>
      <IconPortal name={name} open={open} onOpenChange={setOpen} />
    </>
  );
}
