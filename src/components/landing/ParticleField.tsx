"use client";

import { useEffect, useRef, useCallback } from "react";

type Particle = {
  x: number;
  y: number; // world-space Y (spans full document height)
  homeX: number;
  homeY: number;
  vx: number;
  vy: number;
  radius: number;
  color: string; // RGB triplet e.g. "56,189,248"
  alpha: number;
  isCeladon: boolean;
};

// Physics constants
const ATTRACTION_RADIUS = 250;
const REPULSION_RADIUS = 40;
const CONNECTION_RADIUS = 200;
const ATTRACTION_STRENGTH = 0.015;
const REPULSION_STRENGTH = 0.8;
const SPRING_K = 0.003;
const DAMPING = 0.95;
const CONNECTION_LINE_WIDTH = 1.5;
const CONNECTION_MAX_ALPHA = 0.45;
const MOUSE_LERP = 0.12;

// Scroll-based connection constants
const SCROLL_CONNECTION_RADIUS = 160;
const SCROLL_CONNECTION_MAX_ALPHA = 0.25;
const SCROLL_CONNECTION_LINE_WIDTH = 1;

// How far above/below viewport to still process particles
const VIEWPORT_MARGIN = 200;

// Particle density
const PX_PER_PARTICLE = 14000;
const MAX_PARTICLES = 300;

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const smoothMouseRef = useRef({ x: -1000, y: -1000 });
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);
  const hasHoverRef = useRef(false);
  const resizeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollYRef = useRef(0);
  // Pre-allocated arrays to avoid GC pressure every frame
  const visibleRef = useRef<number[]>([]);
  const attractedRef = useRef<number[]>([]);

  const initParticles = useCallback((w: number, docH: number) => {
    const count = Math.min(MAX_PARTICLES, Math.floor((w * docH) / PX_PER_PARTICLE));
    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const isCeladon = Math.random() < 0.15;
      const x = Math.random() * w;
      const y = Math.random() * docH;
      particles.push({
        x, y, homeX: x, homeY: y,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 3 + 3,
        color: isCeladon ? "172,247,193" : "56,189,248",
        alpha: isCeladon ? 0.7 : 0.5,
        isCeladon,
      });
    }
    particlesRef.current = particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const mql = window.matchMedia("(hover: hover)");
    hasHoverRef.current = mql.matches;

    let currentDpr = window.devicePixelRatio || 1;
    let logicalW = 0;
    let logicalH = 0;

    const resize = () => {
      currentDpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      logicalW = rect.width;
      logicalH = rect.height;
      canvas.width = rect.width * currentDpr;
      canvas.height = rect.height * currentDpr;
      ctx.setTransform(currentDpr, 0, 0, currentDpr, 0, 0);

      const docH = Math.max(document.documentElement.scrollHeight, logicalH);
      initParticles(logicalW, docH);
    };

    const debouncedResize = () => {
      if (resizeTimerRef.current) clearTimeout(resizeTimerRef.current);
      resizeTimerRef.current = setTimeout(resize, 300);
    };

    resize();
    window.addEventListener("resize", debouncedResize);

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        mouseRef.current = { x, y };
      } else {
        mouseRef.current = { x: -1000, y: -1000 };
      }
    };
    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };

    window.addEventListener("mousemove", handleMouse);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    let time = 0;

    const draw = () => {
      time += 0.02;
      ctx.clearRect(0, 0, logicalW, logicalH);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;
      const smooth = smoothMouseRef.current;
      const scrollY = scrollYRef.current;

      smooth.x += (mouse.x - smooth.x) * MOUSE_LERP;
      smooth.y += (mouse.y - smooth.y) * MOUSE_LERP;

      const mouseActive = mouse.x > -500;

      // Reuse arrays — reset length instead of allocating new ones
      const visibleIndices = visibleRef.current;
      const attractedIndices = attractedRef.current;
      let visibleCount = 0;
      let attractedCount = 0;

      const vpTop = scrollY - VIEWPORT_MARGIN;
      const vpBottom = scrollY + logicalH + VIEWPORT_MARGIN;
      const revealWorldY = scrollY + logicalH + 100;

      // --- Physics + visibility ---
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const screenY = p.y - scrollY;

        if (mouseActive) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - screenY;
          const distSq = dx * dx + dy * dy;

          if (distSq < ATTRACTION_RADIUS * ATTRACTION_RADIUS && distSq > 0) {
            const dist = Math.sqrt(distSq);
            attractedIndices[attractedCount++] = i;
            const norm = 1 - dist / ATTRACTION_RADIUS;

            if (dist < REPULSION_RADIUS) {
              const repulse = (REPULSION_RADIUS - dist) / REPULSION_RADIUS;
              p.vx -= (dx / dist) * repulse * REPULSION_STRENGTH;
              p.vy -= (dy / dist) * repulse * REPULSION_STRENGTH;
            } else {
              p.vx += (dx / dist) * norm * ATTRACTION_STRENGTH;
              p.vy += (dy / dist) * norm * ATTRACTION_STRENGTH;
            }
          }
        }

        p.vx += (p.homeX - p.x) * SPRING_K;
        p.vy += (p.homeY - p.y) * SPRING_K;
        p.vx *= DAMPING;
        p.vy *= DAMPING;
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -20) p.x = -20;
        if (p.x > logicalW + 20) p.x = logicalW + 20;

        if (p.y >= vpTop && p.y <= vpBottom) {
          visibleIndices[visibleCount++] = i;
        }
      }

      // --- Cursor ring ---
      if (mouseActive && hasHoverRef.current) {
        const pulse = 1 + Math.sin(time * 2) * 0.06;
        const ringRadius = 60 * pulse;
        const gradient = ctx.createRadialGradient(
          smooth.x, smooth.y, ringRadius * 0.5,
          smooth.x, smooth.y, ringRadius
        );
        gradient.addColorStop(0, "rgba(56,189,248,0)");
        gradient.addColorStop(0.6, "rgba(56,189,248,0.03)");
        gradient.addColorStop(1, "rgba(56,189,248,0)");
        ctx.beginPath();
        ctx.arc(smooth.x, smooth.y, ringRadius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      // --- Scroll-based ambient connections (batched into single path per alpha bucket) ---
      if (visibleCount > 1) {
        ctx.lineWidth = SCROLL_CONNECTION_LINE_WIDTH;
        const currentRadiusSq = SCROLL_CONNECTION_RADIUS * SCROLL_CONNECTION_RADIUS;
        const invRadius = 1 / SCROLL_CONNECTION_RADIUS;
        const invReveal = 1 / (logicalH * 0.5);

        // Batch lines by rounded alpha to minimize state changes
        ctx.beginPath();
        let lastAlpha = -1;

        for (let vi = 0; vi < visibleCount; vi++) {
          const a = particles[visibleIndices[vi]];
          const aScreenY = a.y - scrollY;
          const aActivation = Math.max(0, Math.min(1, (revealWorldY - a.y) * invReveal));
          if (aActivation <= 0) continue;

          for (let vj = vi + 1; vj < visibleCount; vj++) {
            const b = particles[visibleIndices[vj]];
            const dx = a.x - b.x;
            const bScreenY = b.y - scrollY;
            const dy = aScreenY - bScreenY;
            const distSq = dx * dx + dy * dy;

            if (distSq < currentRadiusSq) {
              const bActivation = Math.max(0, Math.min(1, (revealWorldY - b.y) * invReveal));
              if (bActivation <= 0) continue;

              const dist = Math.sqrt(distSq);
              const alpha = (1 - dist * invRadius) * SCROLL_CONNECTION_MAX_ALPHA * aActivation * bActivation;

              if (alpha > 0.01) {
                // Flush current path if alpha changed significantly
                const roundedAlpha = (alpha * 10 + 0.5) | 0;
                if (roundedAlpha !== lastAlpha) {
                  if (lastAlpha >= 0) ctx.stroke();
                  ctx.beginPath();
                  ctx.strokeStyle = `rgba(56,189,248,${roundedAlpha * 0.1})`;
                  lastAlpha = roundedAlpha;
                }
                ctx.moveTo(a.x, aScreenY);
                ctx.lineTo(b.x, bScreenY);
              }
            }
          }
        }
        if (lastAlpha >= 0) ctx.stroke();
      }

      // --- Mouse-attracted connection lines (batched) ---
      if (attractedCount > 1) {
        ctx.lineWidth = CONNECTION_LINE_WIDTH;
        let lastAlpha = -1;
        ctx.beginPath();

        for (let i = 0; i < attractedCount; i++) {
          const a = particles[attractedIndices[i]];
          const aScreenY = a.y - scrollY;
          for (let j = i + 1; j < attractedCount; j++) {
            const b = particles[attractedIndices[j]];
            const bScreenY = b.y - scrollY;
            const dx = a.x - b.x;
            const dy = aScreenY - bScreenY;
            const distSq = dx * dx + dy * dy;

            if (distSq < CONNECTION_RADIUS * CONNECTION_RADIUS) {
              const dist = Math.sqrt(distSq);
              const alpha = (1 - dist / CONNECTION_RADIUS) * CONNECTION_MAX_ALPHA;
              const roundedAlpha = (alpha * 10 + 0.5) | 0;
              if (roundedAlpha !== lastAlpha) {
                if (lastAlpha >= 0) ctx.stroke();
                ctx.beginPath();
                ctx.strokeStyle = `rgba(56,189,248,${roundedAlpha * 0.1})`;
                lastAlpha = roundedAlpha;
              }
              ctx.moveTo(a.x, aScreenY);
              ctx.lineTo(b.x, bScreenY);
            }
          }
        }
        if (lastAlpha >= 0) ctx.stroke();
      }

      // --- Particle halos (simple filled circles instead of radial gradients) ---
      ctx.globalCompositeOperation = "lighter";
      for (let vi = 0; vi < visibleCount; vi++) {
        const p = particles[visibleIndices[vi]];
        const screenY = p.y - scrollY;
        const activation = Math.max(0, Math.min(1, (revealWorldY - p.y) / (logicalH * 0.5)));
        const haloAlpha = 0.08 * activation;

        ctx.beginPath();
        ctx.arc(p.x, screenY, p.radius * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${haloAlpha})`;
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";

      // --- Particle cores ---
      for (let vi = 0; vi < visibleCount; vi++) {
        const p = particles[visibleIndices[vi]];
        const screenY = p.y - scrollY;
        const activation = Math.max(0, Math.min(1, (revealWorldY - p.y) / (logicalH * 0.5)));

        ctx.beginPath();
        ctx.arc(p.x, screenY, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${p.alpha * activation})`;
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(draw);
    };

    animFrameRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      if (resizeTimerRef.current) clearTimeout(resizeTimerRef.current);
      window.removeEventListener("resize", debouncedResize);
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "none" }}
    />
  );
}
