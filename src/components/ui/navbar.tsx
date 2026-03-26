"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Github, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/resume", label: "Resume" },
  { href: "/blog", label: "Blog" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b neon-border backdrop-blur-md bg-background/60">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 h-14 flex items-center justify-between gap-3">
        <Link href="/" className="font-semibold tracking-tight">
          Vale.dev
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-3 py-2 text-sm rounded-md transition-colors",
                pathname === item.href
                  ? "bg-zinc-100/10 text-[--accent]"
                  : "hover:bg-zinc-100/5"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild variant="outline" className="hidden sm:inline-flex">
            <a href="https://github.com/valeman100" target="_blank" rel="noreferrer">
              <Github className="h-4 w-4 mr-2" /> GitHub
            </a>
          </Button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-zinc-100/5"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-[var(--border-color)] bg-background/95 backdrop-blur-md">
          <div className="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "px-3 py-2.5 text-sm rounded-md transition-colors",
                  pathname === item.href
                    ? "bg-zinc-100/10 text-[--accent]"
                    : "hover:bg-zinc-100/5"
                )}
              >
                {item.label}
              </Link>
            ))}
            <a
              href="https://github.com/valeman100"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-2.5 text-sm rounded-md hover:bg-zinc-100/5 flex items-center gap-2"
            >
              <Github className="h-4 w-4" /> GitHub
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
