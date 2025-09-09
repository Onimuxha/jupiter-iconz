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
    <header className="fixed top-0 z-50 w-full pointer-events-none">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="pointer-events-auto mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-6 py-3 shadow-[0_16px_64px_rgba(0,0,0,0.1)] dark:shadow-[0_16px_90px_rgba(225,225,225,0.2)] backdrop-blur-2xl dark:bg-black/20 dark:border-white/5"
        >
          {/* Logo Section */}
          <motion.a 
            href="/" 
            className="flex items-center gap-3 group" 
            aria-label="Jupiter Icons"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            <div className="relative">
              <img 
                src="/text-black.png" 
                alt="Jupiter Icons" 
                className="relative h-12 w-1h-12 dark:invert" 
              />
            </div>
          </motion.a>

          {/* Navigation Section */}
          <div className="flex items-center gap-6">
            {/* Main Navigation */}
            <nav className="relative flex items-center gap-2 rounded-xl bg-white/10 dark:bg-white/5 p-1 border border-white/10 dark:border-white/5">
              {links.map((link, index) => {
                const active = pathname === link.href;
                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    className="relative rounded-lg px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 transition-all duration-200 hover:text-gray-900 dark:hover:text-white"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    whileHover={{ y: -1 }}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-lg bg-white/80 dark:bg-white/10 shadow-lg"
                        transition={{ 
                          type: "spring", 
                          stiffness: 500, 
                          damping: 35 
                        }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                    {active && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full"
                      />
                    )}
                  </motion.a>
                );
              })}
            </nav>

            {/* Divider */}
            <div className="h-6 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent dark:via-gray-600" />

            {/* Theme Toggle */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <ThemeToggle />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Ambient glow effect */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-24 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 blur-3xl -z-10" />
    </header>
  );
}