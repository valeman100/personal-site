"use client";

import { products } from "@/lib/products";
import { AppCard } from "./AppCard";
import { Reveal } from "@/components/motion/scroll";

export function FeaturedApps() {
  return (
    <section id="projects" className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <h2 className="text-3xl font-bold tracking-tight mb-10">
            Projects
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-8">
          {products.map((product, idx) => (
            <Reveal key={product.slug} delay={idx * 0.1}>
              <AppCard product={product} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
