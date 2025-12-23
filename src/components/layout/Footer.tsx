"use client";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 py-8 mt-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 text-sm text-zinc-500 flex items-center justify-between">
        <p>© {new Date().getFullYear()} Valerio Mannucci. All rights reserved.</p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="hover:underline underline-offset-4 cursor-pointer"
        >
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}


