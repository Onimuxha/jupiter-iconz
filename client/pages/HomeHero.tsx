import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CodeBlock } from "@/components/ui/code-block";
import { icons } from "../../packages/jupiter-icons/src/index.ts";
import { FlipWords } from "../components/ui/flip-words.tsx";
import { SiteHeader } from "../components/site/SiteHeader.tsx";
import { SiteFooter } from "../components/site/SiteFooter.tsx";
import { HeroBackground } from "../components/ui/shap-loading-hero.tsx";
import {
  IconArrowRight,
  IconBook,
  IconBolt,
  IconPalette,
  IconTextResize,
  IconTargetArrow,
  IconLayersIntersect,
  IconCarambola,
} from "@tabler/icons-react";
import { categories } from "../components/site/IconExplorer/iconUtils.tsx";
import {
  Terminal,
  TypingAnimation,
  AnimatedSpan,
} from "../components/ui/terminal.tsx";
import { NumberTicker } from "../components/ui/number-ticker.tsx";
import pkg from "../../packages/jupiter-icons/package.json";

const heroList = [
  "BehanceFill",
  "Miro",
  "C",
  "NestJs",
  "CodeIgniter",
  "Brainly",
  "Slack",
  "Chrome",
  "AtlassianBitbucket",
  "Telegram",
  "AdobeInDesign",
  "VK",
] as const;

const words = ["Beautiful.", "Code.", "Modern.", "Scalable.", "Accessible."];

const features = [
  {
    icon: IconBolt,
    title: "Lightning Fast",
    description:
      "Optimized SVG icons that load instantly. Tree-shakable imports mean you only bundle what you use.",
  },
  {
    icon: IconTextResize,
    title: "Customizable",
    description:
      "Easily adjust size, color, and stroke width. Perfect for any design system or theme.",
  },
  {
    icon: IconPalette,
    title: "Brand Perfect",
    description:
      "Authentic brand colors and consistent visual identity. Dark mode support built right in.",
  },
  {
    icon: IconTargetArrow,
    title: "Consistent Icons",
    description:
      "Uniform design language across all icons. Perfectly balanced for any UI or UX project.",
  },
  {
    icon: IconLayersIntersect,
    title: "Easy Integration",
    description:
      "Simple installation and usage. Works seamlessly with React, Vue, Angular, and plain HTML.",
  },
  {
    icon: IconCarambola,
    title: "Open Source",
    description:
      "Community-driven and open for contributions. Regular updates with new icons and features.",
  },
];

interface Stat {
  value: number;
  suffix?: string;
  label: string;
}

const stats: Stat[] = [
  { value: Object.keys(icons).length, label: "Premium Icons" },
  { value: categories.length, label: "Categories" },
  { value: 100, suffix: "%", label: "Fully Scalable" },
  { value: 100, suffix: "%", label: "Open Source" },
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
        {/* Hero Section  */}
        <section className="min-h-screen relative pt-28 overflow-hidden">
          <HeroBackground className="absolute inset-0 w-full h-full z-0 pointer-events-none" />
          <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 md:py-20 grid items-center gap-10 md:grid-cols-2">
            <div>
              <p className="mt-2 inline-block rounded-full bg-lime-500/10 px-3 py-1 text-sm font-medium text-lime-600 dark:text-lime-400">
                v{pkg.version}
              </p>
              <h1 className="text-5xl md:text-7xl font-semibold text-balance">
                Every icon you need.
                <FlipWords
                  words={words}
                  className="font-normal text-lime-500 dark:text-lime-500"
                />
              </h1>

              <p className="mt-4 text-xl max-w-prose text-muted-foreground mb-8">
                A modern, accessible icon set with original brand colors, full
                TypeScript support, and delightful animations.
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
                  <Link to="/icons">
                    <button className="group relative inline-flex h-12 overflow-hidden rounded-full p-0.5">
                      <div className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#94c748_0%,#393BB2_50%,#94c748_100%)]" />
                      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-100 dark:bg-slate-950 px-3 py-1 text-sm font-medium text-black dark:text-white backdrop-blur-3xl">
                        <IconArrowRight
                          size={20}
                          className="mr-2 transform transition-transform duration-300 group-hover:translate-x-28"
                        />
                        <span className="transform transition-transform duration-300 group-hover:-translate-x-6">
                          Explore All Icons
                        </span>
                      </span>
                    </button>
                  </Link>

                  <Link to="/docs">
                    <button className="group relative inline-flex h-12 overflow-hidden rounded-full px-4 border border-zinc-500 bg-white/5 hover:bg-white/10 transition-colors">
                      <span className="absolute inset-0 overflow-hidden rounded-full">
                        <span className="absolute inset-0 rounded-full bg-[radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      </span>
                      <div className="relative z-10 text-black dark:text-white flex items-center gap-2 transition-all duration-300">
                        <IconBook
                          size={20}
                          className="transition-transform duration-300 group-hover:-translate-x-9"
                        />
                        <span className="transition-transform duration-300 group-hover:-translate-x-4">
                          View Documentation
                        </span>
                        <IconArrowRight
                          size={20}
                          className="transition-transform duration-300 translate-x-9 group-hover:translate-x-0"
                        />
                      </div>
                      <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-lime-500/0 via-lime-500 to-lime-500/0 opacity-0 transition-opacity duration-500 group-hover:opacity-40" />
                    </button>
                  </Link>
                </motion.div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {heroList.map((name, index) => {
                const Comp = icons[name];
                return (
                  <motion.div
                    key={name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="flex items-center justify-center rounded-3xl border border-black/10 dark:border-white/20 bg-white/10 p-6 backdrop-blur-sm dark:bg-white/5 hover:bg-white/20 dark:hover:bg-white/10 transition-colors"
                  >
                    <Comp size={48} aria-label={name} />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-white/50 dark:bg-gray-950/50">
          <div className="max-w-7xl mx-auto px-4 text-center mb-16">
            <h2 className="text-3xl sm:text-6xl font-medium text-gray-900 dark:text-white">
              Why Choose Jupiter Icons?
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Built by developers, for developers. Every icon is crafted with
              attention to detail and optimized for modern web applications.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 mb-20">
            {features.map(({ icon: Icon, title, description }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center p-8 rounded-2xl bg-white dark:bg-gray-900/50 shadow-lg border border-gray-200 dark:border-gray-700"
              >
                <div
                  className={`w-12 h-12 mx-auto mb-6 rounded-2xl bg-black/5 dark:bg-lime-500/10 flex items-center justify-center`}
                >
                  <Icon className={`w-6 h-6 text-lime-500`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map(({ value, label, suffix }) => (
              <div key={label}>
                <NumberTicker
                  value={value}
                  suffix={suffix}
                  className="whitespace-pre-wrap text-8xl font-medium tracking-tighter text-lime-500 dark:text-lime-500"
                />
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Getting Started Section */}
        <section className="py-24">
          {/* Heading with motion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto px-4 text-center mb-16"
          >
            <h2 className="text-3xl sm:text-6xl font-medium text-gray-900 dark:text-white">
              Get Started in Minutes
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Install Jupiter Icons and start building beautiful interfaces
              right away.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto px-4">
            {/* Left: Steps with animation */}
            <div className="space-y-6">
              {steps.map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center mt-1">
                    <span className="text-blue-500 font-semibold text-sm">
                      {i + 1}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* CTA button with delayed animation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.5, delay: steps.length * 0.1 }}
                className="pt-6"
              >
                <Link to="/icons">
                  <button className="group relative inline-flex h-12 overflow-hidden rounded-full p-0.5">
                    <div className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#94c748_0%,#393BB2_50%,#94c748_100%)]" />
                    <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-100 dark:bg-slate-950 px-3 py-1 text-sm font-medium text-black dark:text-white backdrop-blur-3xl">
                      <IconArrowRight
                        size={20}
                        className="mr-2 transform transition-transform duration-300 group-hover:translate-x-28"
                      />
                      <span className="transform transition-transform duration-300 group-hover:-translate-x-6">
                        Get Started Now
                      </span>
                    </span>
                  </button>
                </Link>
              </motion.div>
            </div>

            {/* Right: Terminal with delayed slide up */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Terminal>
                <TypingAnimation delay={0}>
                  $ npm install jupiter-iconz
                </TypingAnimation>
                <AnimatedSpan className="text-lime-500">
                  ✔ Installed successfully!
                </AnimatedSpan>
                <AnimatedSpan className="text-blue-500">
                  ℹ Updated 1 file:
                </AnimatedSpan>
                <AnimatedSpan className="text-blue-500 pl-2">
                  - package.json
                </AnimatedSpan>
                <TypingAnimation className="text-muted-foreground">
                  Success! Project initialization completed.
                </TypingAnimation>
                <TypingAnimation className="text-muted-foreground">
                  You may now add components.
                </TypingAnimation>
              </Terminal>
            </motion.div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
