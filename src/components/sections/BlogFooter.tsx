"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/scroll";

export function BlogFooter() {
    return (
        <section className="py-12 border-t border-zinc-200 dark:border-zinc-800 mt-12">
            <div className="mx-auto max-w-2xl px-4 text-center">
                <Reveal>
                    <h3 className="text-2xl font-bold mb-4">Do you have a question or a project in mind?</h3>
                    <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                        If you&apos;d like to discuss this article or how I can help you with your projects<br></br>
                        please contact me!
                    </p>
                    <Button asChild className="neon-shadow hover:scale-105 transition-transform">
                        <Link href="/#contact">Contact me</Link>
                    </Button>
                </Reveal>
            </div>
        </section>
    );
}
