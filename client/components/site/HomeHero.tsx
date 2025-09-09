import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { copyText } from "@/lib/copy";
import { icons } from "../../../packages/jupiter-icons/src/index.ts";

const heroList = ["React", "TypeScript", "VSCode", "Photoshop", "GitHub", "Figma", "Slack", "Chrome", "NodeJS"] as const;

export function HomeHero() {
  return (
    <section className="border-b border-border/60 bg-[radial-gradient(60%_80%_at_50%_0%,hsl(var(--accent)_/_24%),transparent)]">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-20">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-balance text-4xl font-extrabold tracking-tight md:text-6xl"
            >
              Developer-friendly colorful SVG icon library
            </motion.h1>
            <p className="mt-4 max-w-prose text-muted-foreground">
              A modern, accessible icon set with original brand colors, full TypeScript support, and delightful animations. Built for React, Vite, and Tailwind with class-based dark mode.
            </p>
            <div id="install" className="mt-6 flex flex-wrap items-center gap-3">
              <Button
                variant="glass"
                onClick={async () => {
                  const ok = await copyText("npm i jupiter-icons");
                  ok ? toast.success("Install command copied") : toast.error("Copy failed");
                }}
                className="gap-2"
              >
                <Download className="h-4 w-4" /> Copy install command
              </Button>
              <code className="rounded-md border border-input bg-muted px-3 py-2 text-sm">npm i jupiter-icons</code>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-3 gap-4"
            aria-label="Icon preview mosaic"
          >
            {heroList.map((name) => {
              const Comp = icons[name];
              return (
                <div key={name} className="flex items-center justify-center rounded-xl border border-white/20 bg-white/10 p-6 shadow-[inset_0_1px_0_0_hsla(0,0%,100%,0.2)] backdrop-blur-md dark:bg-white/5">
                  <Comp size={48} aria-label={name} />
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
