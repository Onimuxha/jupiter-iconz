import { ThemeToggle } from "./ThemeToggle";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export function SiteHeader() {
  const { pathname } = useLocation();
  const links = [
    { href: "/", label: "Home" },
    { href: "/docs", label: "Docs" },
  ];
  return (
    <header className="sticky top-0 z-50 pointer-events-none">
      <div className="mx-auto max-w-6xl px-4">
        <div className="pointer-events-auto mt-2 flex items-center justify-between rounded-full border border-white/15 bg-white/10/80 px-2 py-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.12)] backdrop-blur-lg dark:bg-white/5">
          <a href="/" className="flex items-center gap-2" aria-label="Jupiter Icons">
            <img src="/logo.svg" alt="Jupiter Icons" className="h-7 w-7" />
            <span className="sr-only">Jupiter Icons</span>
          </a>
          <nav className="relative flex items-center gap-1 rounded-full bg-white/5 p-0.5">
            {links.map((l) => {
              const active = pathname === l.href;
              return (
                <a key={l.href} href={l.href} className="relative rounded-full px-3.5 py-2 text-sm text-foreground/80 transition hover:text-foreground">
                  {active && (
                    <motion.span layoutId="nav-active" className="absolute inset-0 -z-10 rounded-full bg-white/15" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
                  )}
                  {l.label}
                </a>
              );
            })}
            <span className="mx-1 h-5 w-px bg-white/20" aria-hidden />
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
