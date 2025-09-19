"use client";

import { IconMoonStars, IconSun } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
    className?: string;
};

export const AnimatedThemeToggler = ({ className }: Props) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

        const isDark = storedTheme === "dark" || (!storedTheme && prefersDark);

        document.documentElement.classList.toggle("dark", isDark);
        setIsDarkMode(isDark);
    }, []);

    const changeTheme = async () => {
        if (!buttonRef.current) return;

        await document.startViewTransition(() => {
            flushSync(() => {
                const isNowDark = !document.documentElement.classList.contains("dark");
                document.documentElement.classList.toggle("dark", isNowDark);
                localStorage.setItem("theme", isNowDark ? "dark" : "light");
                setIsDarkMode(isNowDark);
            });
        }).ready;

        const { top, left, width, height } =
            buttonRef.current.getBoundingClientRect();
        const y = top + height / 2;
        const x = left + width / 2;

        const right = window.innerWidth - left;
        const bottom = window.innerHeight - top;
        const maxRad = Math.hypot(Math.max(left, right), Math.max(top, bottom));

        document.documentElement.animate(
            {
                clipPath: [
                    `circle(0px at ${x}px ${y}px)`,
                    `circle(${maxRad}px at ${x}px ${y}px)`,
                ],
            },
            {
                duration: 700,
                easing: "ease-in-out",
                pseudoElement: "::view-transition-new(root)",
            },
        );
    };

    return (
        <button
            ref={buttonRef}
            onClick={changeTheme}
            className={cn("relative w-8 h-8", className)}
        >
            <AnimatePresence mode="wait" initial={false}>
                <motion.span
                    key={isDarkMode ? "sun" : "moon"}
                    initial={{ rotate: -180 }}
                    animate={{ rotate: 0 }}
                    exit={{ rotate: 180 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    {isDarkMode ? <IconSun size={25} className="text-amber-400" /> : <IconMoonStars size={25} className="text-indigo-800" />}
                </motion.span>
            </AnimatePresence>
        </button>
    );
};
