import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { HomeHero } from "@/components/site/HomeHero";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/40">
      <SiteHeader />
      <main>
        <HomeHero />
      </main>
      <SiteFooter />
    </div>
  );
}