import { motion } from "framer-motion";
import { CodeBlock } from "@/components/ui/code-block";
import { icons } from "../../../packages/jupiter-icons/src/index.ts";

const heroList = ["React", "GrokFill", "C", "NestJs", "CodeIgniter", "Figma", "Slack", "Chrome", "AtlassianBitbucket", "Telegram", "AdobeInDesign", "VK"] as const;

export function HomeHero() {
  return (
    <section className="border-b border-border/60 bg-[radial-gradient(60%_80%_at_50%_0%,hsl(var(--accent)_/_24%),transparent)] pt-28">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-20">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-balance text-4xl font-semibold md:text-7xl"
            >
              Every icon you need. Beautiful. Categorized. SVG.
            </motion.h1>
            <p className="mt-4 max-w-prose text-muted-foreground mb-8">
              A modern, accessible icon set with original brand colors, full TypeScript support, and delightful animations. Built for React, Vite, and Tailwind with class-based dark mode.
            </p>
            <CodeBlock
              language="bash"
              filename="terminal"
              code={`npm install jupiter-iconz`}
            />
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
