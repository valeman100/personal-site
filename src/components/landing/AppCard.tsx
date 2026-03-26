"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Tilt } from "@/components/motion/tilt";
import { ExternalLink } from "lucide-react";
import type { Product } from "@/lib/products";

export function AppCard({ product }: { product: Product }) {
  const isLive = product.status === "launched";

  return (
    <Tilt maxTiltDeg={4}>
      <div className="group rounded-2xl border neon-border bg-[--surface] overflow-hidden transition-shadow hover:neon-shadow">
        <div className="grid sm:grid-cols-2 gap-0">
          {/* Image */}
          <div className="relative aspect-[4/3] sm:aspect-auto bg-[--surface-muted]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 25vw, 50vw"
            />
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge
                  className={
                    isLive
                      ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                      : "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30"
                  }
                  variant="outline"
                >
                  {isLive ? "Live" : "Coming Soon"}
                </Badge>
                <span className="text-xs text-zinc-500">{product.brand}</span>
              </div>

              <h3 className="text-xl font-bold mb-1">{product.name}</h3>
              <p className="text-sm text-zinc-500 mb-3">{product.tagline}</p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="mt-4 flex flex-wrap gap-2 items-center">
              {product.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {product.url && (
                <a
                  href={product.url}
                  target="_blank"
                  rel="noreferrer"
                  className="ml-auto inline-flex items-center gap-1 text-sm text-[--accent] hover:underline"
                >
                  Visit <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </Tilt>
  );
}
