import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Docs() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <SiteHeader />
      
      <main className="mx-auto max-w-4xl px-6 pt-32 pb-20">
        {/* Hero */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <h1 className="text-5xl font-light tracking-tight text-black dark:text-white mb-4">
            Documentation
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Install, use, and extend a clean SVG icon system for React + TypeScript
          </p>
        </motion.section>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Tabs defaultValue="quickstart" className="w-full">
            <TabsList className="grid w-full grid-cols-3 rounded-none border-b bg-transparent p-0">
              {["quickstart", "usage", "api"].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="rounded-none border-b-2 border-transparent capitalize font-medium px-6 py-3 data-[state=active]:border-black dark:data-[state=active]:border-white data-[state=active]:bg-transparent"
                >
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="quickstart" className="mt-8">
              <div className="space-y-6">
                <StepCard title="Install">
                  <CodeBlock>npm install jupiter-icons</CodeBlock>
                </StepCard>
                
                <StepCard title="Import and use">
                  <CodeBlock>{`import { Photoshop, VSCode } from "jupiter-icons";

export default function App() {
  return (
    <div>
      <Photoshop size={24} />
      <VSCode size={48} className="ml-2" />
    </div>
  );
}`}</CodeBlock>
                </StepCard>
              </div>
            </TabsContent>

            <TabsContent value="usage" className="mt-8">
              <div className="space-y-6">
                <Card title="Sizing and accessibility">
                  <CodeBlock>{`<Photoshop size={32} aria-label="Adobe Photoshop" />`}</CodeBlock>
                </Card>
                
                <Card title="Click handlers">
                  <CodeBlock>{`<VSCode onClick={() => alert('clicked')} />`}</CodeBlock>
                </Card>
                
                <Card title="Custom styling">
                  <CodeBlock>{`<Figma className="opacity-50 hover:opacity-100" />`}</CodeBlock>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="api" className="mt-8">
              <Card title="createIcon(name, svgContent)">
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Returns a React component that renders SVG safely with dangerouslySetInnerHTML.
                </p>
                <div className="space-y-2 text-sm text-gray-500 dark:text-gray-500">
                  <div>Props: size?, className?, style?, aria-label?, onClick?</div>
                  <div>Keyboard: Enter/Space triggers onClick</div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Footer */}
        <motion.div 
          className="mt-16 flex items-center justify-center gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <a 
            href="/" 
            className="text-gray-500 hover:text-black dark:hover:text-white transition-colors"
          >
            ← Back to Home
          </a>
          <Button 
            variant="outline"
            className="border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900"
          >
            Open Playground
          </Button>
        </motion.div>
      </main>
      
      <SiteFooter />
    </div>
  );
}

function StepCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="border border-gray-100 dark:border-gray-900 rounded-lg p-6 hover:border-gray-200 dark:hover:border-gray-800 transition-colors"
    >
      <h3 className="font-medium text-black dark:text-white mb-4">{title}</h3>
      {children}
    </motion.div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-gray-100 dark:border-gray-900 rounded-lg p-6"
    >
      <h3 className="font-medium text-black dark:text-white mb-3">{title}</h3>
      {children}
    </motion.div>
  );
}

function CodeBlock({ children }: { children: React.ReactNode }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(children as string);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="group relative">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 text-xs px-2 py-1 bg-gray-800 text-gray-300 rounded opacity-0 group-hover:opacity-100 transition-opacity"
      >
        {copied ? "Copied" : "Copy"}
      </button>
      <pre className="bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-md p-4 text-sm overflow-auto">
        <code>{children}</code>
      </pre>
    </div>
  );
}