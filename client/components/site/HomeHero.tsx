import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CodeBlock } from "@/components/ui/code-block";
import { icons } from "../../../packages/jupiter-icons/src/index.ts";
import { FlipWords } from "../ui/flip-words.tsx";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { HeroGeometric } from "../ui/shap-loading-hero.tsx";
import {
  IconArrowRight,
  IconInvoice,
  IconBolt,
  IconShield,
  IconPalette,
} from "@tabler/icons-react";

const heroList = [
  "React", "GrokFill", "C", "NestJs", "CodeIgniter",
  "Figma", "Slack", "Chrome", "AtlassianBitbucket",
  "Telegram", "AdobeInDesign", "VK"
] as const;

const words = ["Beautiful.", "Categorized.", "Code.", "Modern."];

const features = [
  {
    icon: IconBolt,
    color: "blue",
    title: "Lightning Fast",
    description:
      "Optimized SVG icons that load instantly. Tree-shakable imports mean you only bundle what you use.",
  },
  {
    icon: IconShield,
    color: "green",
    title: "Type Safe",
    description:
      "Full TypeScript support with intelligent autocomplete. Catch errors at compile time, not runtime.",
  },
  {
    icon: IconPalette,
    color: "purple",
    title: "Brand Perfect",
    description:
      "Authentic brand colors and consistent visual identity. Dark mode support built right in.",
  },
];

const stats = [
  { value: "200+", label: "Premium Icons" },
  { value: "7", label: "Categories" },
  { value: "100%", label: "Vector Based" },
  { value: "MIT", label: "Open Source" },
];

const steps = [
  {
    title: "Install the Package",
    description: "Add Jupiter Icons to your project with a single command.",
  },
  {
    title: "Import & Use",
    description: "Import icons individually for optimal bundle size.",
  },
  {
    title: "Customize",
    description: "Adjust size, colors, and styling to match your design.",
  },
];

export function HomeHero() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/40">
      <SiteHeader />
      <main>
        {/* Hero Section */}
        <section className="min-h-screen relative border-b border-border/60 bg-[radial-gradient(60%_80%_at_50%_0%,hsl(var(--accent)_/_24%),transparent)] pt-28 overflow-hidden">
          <HeroGeometric className="absolute inset-0 w-full h-full z-0 pointer-events-none" />
          <div className="relative z-10 mx-auto max-w-6xl px-4 py-12 md:py-20 grid items-center gap-10 md:grid-cols-2">
            <div>
              <h1 className="text-4xl md:text-7xl font-medium text-balance">
                Every icon you need.<FlipWords words={words} className="text-[#94c748] dark:text-[#94c748]" />
              </h1>
              <p className="mt-4 text-xl max-w-prose text-muted-foreground mb-8">
                A modern, accessible icon set with original brand colors, full TypeScript support, and delightful animations.
              </p>
              <div className="space-y-6">
                <CodeBlock
                  language="bash"
                  filename="terminal"
                  code={`npm install jupiter-iconz`}
                />
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Link
                    to="/icons"
                  >
                    <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px]">
                      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                        <IconArrowRight className="mr-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                        Browser All Icons
                      </span>
                    </button>
                  </Link>

                  <Link
                    to="/docs"
                    className="group relative inline-flex items-center justify-center rounded-full border border-transparent bg-slate-800 px-4 py-2 text-sm font-medium text-white shadow-2xl shadow-zinc-900 no-underline transition-all"
                  >
                    <span className="absolute inset-0 overflow-hidden rounded-full">
                      <span className="absolute inset-0 rounded-full bg-[radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    </span>
                    <div className="relative z-10 flex items-center gap-2">
                      <IconInvoice className="h-4 w-4" />
                      <span>View Documentation</span>
                    </div>
                    <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-[#94c748]/0 via-[#94c748] to-[#94c748]/0 opacity-0 transition-opacity duration-500 group-hover:opacity-40" />
                  </Link>
                </motion.div>

              </div>
            </div>

            {/* Icon Mosaic */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-3 gap-4"
            >
              {heroList.map((name) => {
                const Comp = icons[name];
                return (
                  <div
                    key={name}
                    className="flex items-center justify-center rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-md dark:bg-white/5 hover:bg-white/20 dark:hover:bg-white/10 transition-colors"
                  >
                    <Comp size={48} aria-label={name} />
                  </div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-white/50 dark:bg-gray-950/50">
          <div className="max-w-7xl mx-auto px-4 text-center mb-16">
            <h2 className="text-3xl sm:text-6xl font-semibold text-gray-900 dark:text-white">
              Why Choose Jupiter Icons?
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Built by developers, for developers. Every icon is crafted with attention to detail and optimized for modern web applications.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 mb-20">
            {features.map(({ icon: Icon, color, title, description }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center p-8 rounded-2xl bg-white dark:bg-gray-900/50 shadow-lg border border-gray-200 dark:border-gray-700"
              >
                <div className={`w-12 h-12 mx-auto mb-6 rounded-xl bg-${color}-500/10 flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 text-${color}-500`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{description}</p>
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map(({ value, label }) => (
              <div key={label}>
                <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{value}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Getting Started Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 text-center mb-16">
            <h2 className="text-3xl sm:text-6xl font-semibold text-gray-900 dark:text-white">
              Get Started in Minutes
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Install Jupiter Icons and start building beautiful interfaces right away.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto px-4">
            <div className="space-y-6">
              {steps.map((step, i) => (
                <div key={step.title} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center mt-1">
                    <span className="text-blue-500 font-semibold text-sm">{i + 1}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
                  </div>
                </div>
              ))}
              <div className="pt-6">
                <Link
                  to="/icons"
                >
                  <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px]">
                    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                    <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                      <IconArrowRight className="mr-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                      Explorer All Icons
                    </span>
                  </button>
                </Link>
              </div>
            </div>
            <CodeBlock
              language="jsx"
              filename="App.tsx"
              code={`# Import and use in your React app
import { React, GitHub, Twitter } from 'jupiter-iconz'

<React size={24} className="text-blue-500" />
<GitHub size={32} />
<Twitter size={20} className="text-sky-500" />`}
              highlightLines={[2, 5]}
            />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
