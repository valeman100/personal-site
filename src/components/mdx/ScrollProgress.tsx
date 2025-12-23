"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function ScrollProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
            const currentScroll = window.pageYOffset;
            if (totalScroll > 0) {
                setProgress(currentScroll / totalScroll);
            }
        };

        window.addEventListener("scroll", handleScroll);
        // Initial check
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const pathname = usePathname();

    if (pathname === "/blog" || pathname === "/") {
        return null;
    }

    // Also maybe hide on other pages? User said "presente solo quando si visualizza la pagina di un articolo".
    // So if pathname starts with /blog/ and is not /blog.
    if (!pathname.startsWith("/blog/") || pathname === "/blog") {
        return null;
    }

    return (
        <div
            className="fixed top-14 left-0 right-0 h-[3px] bg-sky-400 origin-left z-50 shadow-[0_0_15px_rgba(56,189,248,0.8)] transition-transform duration-75"
            style={{ transform: `scaleX(${progress})` }}
        />
    );
}
