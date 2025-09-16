import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CodeBlock } from "@/components/ui/code-block";
import { Button } from "@/components/ui/button";
import { icons } from "../../../packages/jupiter-icons/src/index.ts";
import { FlipWords } from "../ui/flip-words.tsx";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { IconArrowRight, IconInvoice, IconBolt, IconShield, IconPalette } from "@tabler/icons-react";

const heroList = ["React", "GrokFill", "C", "NestJs", "CodeIgniter", "Figma", "Slack", "Chrome", "AtlassianBitbucket", "Telegram", "AdobeInDesign", "VK"] as const;
const words = ["Beautiful.", "Categorized.", "Code.", "Modern."];

export function HomeHero() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/40">
      <SiteHeader />

      <main>
        {/* Hero Section */}
        <section className="border-b border-border/60 bg-[radial-gradient(60%_80%_at_50%_0%,hsl(var(--accent)_/_24%),transparent)] pt-28">
          <div className="mx-auto max-w-6xl px-4 py-12 md:py-20">
            <div className="grid items-center gap-10 md:grid-cols-2">
              <div>
                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-balance text-4xl font-medium md:text-7xl"
                >
                  Every icon you need.
                  <FlipWords words={words} />
                </motion.h1>
                <p className="mt-4 max-w-prose text-muted-foreground mb-8">
                  A modern, accessible icon set with original brand colors, full TypeScript support, and delightful animations. Built for React, Vite, and Tailwind with class-based dark mode.
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
                    <Button asChild size="lg" className="group">
                      <Link to="/icons">
                        Browse All Icons
                        <IconArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>

                    <Button variant="outline" size="lg" className="group">
                      <Link to="/docs" className="flex items-center">
                        <IconInvoice className="mr-2 h-4 w-4" />
                        View Documentation
                      </Link>
                    </Button>
                  </motion.div>
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
                    <div key={name} className="flex items-center justify-center rounded-xl border border-white/20 bg-white/10 p-6 shadow-[inset_0_1px_0_0_hsla(0,0%,100%,0.2)] backdrop-blur-md dark:bg-white/5 hover:bg-white/20 dark:hover:bg-white/10 transition-colors">
                      <Comp size={48} aria-label={name} />
                    </div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-white/50 dark:bg-gray-950/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Why Choose Jupiter Icons?
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Built by developers, for developers. Every icon is crafted with attention to detail and optimized for modern web applications.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center p-8 rounded-2xl bg-white dark:bg-gray-900/50 shadow-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="w-12 h-12 mx-auto mb-6 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <IconBolt className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Lightning Fast</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Optimized SVG icons that load instantly. Tree-shakable imports mean you only bundle what you use.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-center p-8 rounded-2xl bg-white dark:bg-gray-900/50 shadow-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="w-12 h-12 mx-auto mb-6 rounded-xl bg-green-500/10 flex items-center justify-center">
                  <IconShield className="w-6 h-6 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Type Safe</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Full TypeScript support with intelligent autocomplete. Catch errors at compile time, not runtime.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center p-8 rounded-2xl bg-white dark:bg-gray-900/50 shadow-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="w-12 h-12 mx-auto mb-6 rounded-xl bg-purple-500/10 flex items-center justify-center">
                  <IconPalette className="w-6 h-6 text-purple-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Brand Perfect</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Authentic brand colors and consistent visual identity. Dark mode support built right in.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">200+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Premium Icons</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">7</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Categories</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">100%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Vector Based</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">MIT</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Open Source</div>
              </div>
            </div>
          </div>
        </section>

        {/* Getting Started Section */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Get Started in Minutes
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Install Jupiter Icons and start building beautiful interfaces right away.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-500 font-semibold text-sm">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Install the Package</h3>
                    <p className="text-gray-600 dark:text-gray-400">Add Jupiter Icons to your project with a single command.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-500 font-semibold text-sm">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Import & Use</h3>
                    <p className="text-gray-600 dark:text-gray-400">Import icons individually for optimal bundle size.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-500 font-semibold text-sm">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Customize</h3>
                    <p className="text-gray-600 dark:text-gray-400">Adjust size, colors, and styling to match your design.</p>
                  </div>
                </div>

                <div className="pt-6">
                  <Button asChild size="lg" className="group">
                    <Link to="/icons">
                      Explore All Icons
                      <IconArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
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
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}