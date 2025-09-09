export function SiteFooter() {
  return (
    <footer className="mt-10 border-t border-border/60 py-8 text-center text-sm text-muted-foreground">
      © {new Date().getFullYear()} Jupiter Icons • Built with React, Vite, Tailwind, Framer Motion
    </footer>
  );
}
