import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

export default function Docs() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/40">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-10 md:py-16">
        <section className="mb-10 rounded-2xl border border-white/20 bg-white/10 p-8 text-center backdrop-blur-md dark:bg-white/5">
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">Jupiter Icons Documentation</h1>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Install, use, and extend a colorful, accessible SVG icon system for React + TypeScript. Class-based dark mode, safe SVG rendering, and keyboard-friendly interactions.
          </p>
        </section>

        <Tabs defaultValue="quickstart" className="w-full">
          <TabsList className="rounded-full border border-white/20 bg-white/10 p-1 backdrop-blur-md dark:bg-white/5">
            <TabsTrigger value="quickstart" className="rounded-full data-[state=active]:bg-white/20">Quickstart</TabsTrigger>
            <TabsTrigger value="usage" className="rounded-full data-[state=active]:bg-white/20">Usage</TabsTrigger>
            <TabsTrigger value="api" className="rounded-full data-[state=active]:bg-white/20">API</TabsTrigger>
          </TabsList>

          <TabsContent value="quickstart" className="mt-6">
            <Step title="Install">
              <Code>npm i jupiter-icons</Code>
            </Step>
            <Step title="Import and render">
              <Code>{`import { Photoshop, VSCode } from "jupiter-icons";

export default function Example(){
  return (
    <div>
      <Photoshop size={24} />
      <VSCode size={48} className="align-middle" />
    </div>
  );
}`}</Code>
            </Step>
          </TabsContent>

          <TabsContent value="usage" className="mt-6">
            <Card title="Sizing and a11y">
              <Code>{`<Photoshop size={32} aria-label="Adobe Photoshop" />`}</Code>
            </Card>
            <Card title="Click handlers">
              <Code>{`<VSCode onClick={() => alert('clicked')} />`}</Code>
            </Card>
            <Card title="Styling with className">
              <Code>{`<Figma className="opacity-80 hover:opacity-100 transition" />`}</Code>
            </Card>
          </TabsContent>

          <TabsContent value="api" className="mt-6">
            <Card title="createIcon(name, svgContent)">
              <p className="mb-3 text-sm text-muted-foreground">Returns a React component that renders colorful SVG safely with dangerouslySetInnerHTML.</p>
              <ul className="list-inside list-disc text-sm text-muted-foreground">
                <li>Props: size?: number, className?: string, style?: React.CSSProperties, aria-label?: string, onClick?: (e) =&gt; void</li>
                <li>Keyboard: Enter/Space triggers onClick</li>
              </ul>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-10 flex items-center justify-center gap-3">
          <a href="/" className="text-sm text-muted-foreground underline-offset-4 hover:underline">Back to Home</a>
          <Button variant="glass">Open Playground</Button>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function Step({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6 rounded-xl border border-white/20 bg-white/10 p-5 backdrop-blur-md dark:bg-white/5">
      <h3 className="mb-3 text-lg font-semibold">{title}</h3>
      {children}
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6 rounded-xl border border-white/20 bg-white/10 p-5 backdrop-blur-md dark:bg-white/5">
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      {children}
    </div>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <pre className="no-scrollbar overflow-auto rounded-md border border-white/20 bg-black/50 p-4 text-sm text-white">
      {children}
    </pre>
  );
}
