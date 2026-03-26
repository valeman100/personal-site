"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, animate } from "framer-motion";
import { Reveal } from "@/components/motion/scroll";

function AnimatedNumber({
  value,
  suffix = "+",
  duration = 1.2,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const motionValue = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(motionValue, value, { duration, ease: "easeOut" });
    const unsubscribe = motionValue.on("change", (latest) => {
      setDisplayValue(Math.floor(latest));
    });
    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [isInView, motionValue, value, duration]);

  return (
    <span ref={ref} className="inline-flex items-baseline">
      {displayValue}
      {suffix && <span className="ml-0.5">{suffix}</span>}
    </span>
  );
}

const stats = [
  { value: 4, suffix: "+", label: "Years building AI" },
  { value: 20, suffix: "+", label: "Projects delivered" },
  { value: 2, suffix: "", label: "Products launched" },
];

export function SocialProof() {
  return (
    <section className="py-12 sm:py-16" style={{ background: "var(--gradient-strip)" }}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-4xl sm:text-5xl font-bold" style={{ color: "var(--accent)" }}>
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
