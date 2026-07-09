"use client";

import { useEffect, useRef, useState } from "react";
import ScreenShell from "../shared/ScreenShell";
import { STAR_TEXT } from "@/lib/journeyConfig";

type StarTextScreenProps = {
  onContinue: () => void;
};

type Particle = {
  x: number;
  y: number;
  sx: number;
  sy: number;
  tx: number;
  ty: number;
  ex: number;
  ey: number;
  size: number;
  twinkle: number;
};

const GATHER_MS = 2400;
const HOLD_MS = 2000;
const DISSOLVE_MS = 2000;

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function easeInCubic(t: number) {
  return t * t * t;
}

function fitFontSize(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  fontWeight: string,
  fontFamily: string,
  maxFontSize: number
) {
  let fontSize = maxFontSize;
  ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
  while (fontSize > 12 && ctx.measureText(text).width > maxWidth) {
    fontSize -= 1;
    ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
  }
  return fontSize;
}

export default function StarTextScreen({ onContinue }: StarTextScreenProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const width = container.clientWidth;
    const height = container.clientHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const maybeCtx = canvas.getContext("2d");
    if (!maybeCtx) return;
    const ctx: CanvasRenderingContext2D = maybeCtx;
    ctx.scale(dpr, dpr);

    if (prefersReducedMotion) {
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      fitFontSize(ctx, STAR_TEXT, width * 0.9, "600", "var(--font-quote), serif", 40);
      ctx.fillStyle = "#fff8f0";
      ctx.shadowColor = "rgba(255,216,107,0.8)";
      ctx.shadowBlur = 18;
      ctx.fillText(STAR_TEXT, width / 2, height / 2);
      const t = setTimeout(() => setDone(true), 800);
      return () => clearTimeout(t);
    }

    const offscreen = document.createElement("canvas");
    offscreen.width = width;
    offscreen.height = height;
    const octx = offscreen.getContext("2d");
    if (!octx) return;
    octx.textAlign = "center";
    octx.textBaseline = "middle";
    fitFontSize(octx, STAR_TEXT, width * 0.9, "700", "Arial, sans-serif", 40);
    octx.fillStyle = "#fff";
    octx.fillText(STAR_TEXT, width / 2, height / 2);

    const data = octx.getImageData(0, 0, width, height).data;
    const points: { x: number; y: number }[] = [];
    const step = 3;
    for (let y = 0; y < height; y += step) {
      for (let x = 0; x < width; x += step) {
        const alpha = data[(y * width + x) * 4 + 3];
        if (alpha > 120) points.push({ x, y });
      }
    }

    const targetCount = Math.min(260, points.length);
    const shuffled = points.sort(() => Math.random() - 0.5).slice(0, targetCount);

    const particles: Particle[] = shuffled.map((p) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      sx: Math.random() * width,
      sy: Math.random() * height,
      tx: p.x,
      ty: p.y,
      ex: Math.random() * width,
      ey: Math.random() * height,
      size: Math.random() * 1.6 + 1,
      twinkle: Math.random() * Math.PI * 2,
    }));
    particles.forEach((particle) => {
      particle.sx = particle.x;
      particle.sy = particle.y;
    });

    let raf = 0;
    const start = performance.now();
    const total = GATHER_MS + HOLD_MS + DISSOLVE_MS;

    function frame(now: number) {
      const elapsed = now - start;
      ctx.clearRect(0, 0, width, height);

      for (const particle of particles) {
        let px: number;
        let py: number;

        if (elapsed < GATHER_MS) {
          const t = easeOutCubic(Math.min(1, elapsed / GATHER_MS));
          px = particle.sx + (particle.tx - particle.sx) * t;
          py = particle.sy + (particle.ty - particle.sy) * t;
        } else if (elapsed < GATHER_MS + HOLD_MS) {
          px = particle.tx;
          py = particle.ty;
        } else {
          const t = easeInCubic(
            Math.min(1, (elapsed - GATHER_MS - HOLD_MS) / DISSOLVE_MS)
          );
          px = particle.tx + (particle.ex - particle.tx) * t;
          py = particle.ty + (particle.ey - particle.ty) * t;
        }

        const twinkle = 0.55 + 0.45 * Math.sin(particle.twinkle + elapsed / 260);
        let opacity = twinkle;
        if (elapsed > GATHER_MS + HOLD_MS) {
          const t = Math.min(
            1,
            (elapsed - GATHER_MS - HOLD_MS) / DISSOLVE_MS
          );
          opacity *= 1 - t;
        } else if (elapsed < GATHER_MS) {
          opacity *= Math.min(1, elapsed / (GATHER_MS * 0.4));
        }

        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 246, 214, ${Math.max(0, opacity)})`;
        ctx.shadowColor = "rgba(255,216,107,0.9)";
        ctx.shadowBlur = 4;
        ctx.arc(px, py, particle.size, 0, Math.PI * 2);
        ctx.fill();
      }

      if (elapsed < total) {
        raf = requestAnimationFrame(frame);
      } else {
        setDone(true);
      }
    }

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <ScreenShell onContinue={done ? onContinue : undefined} continueLabel="Continue →">
      <h2 className="text-glow mb-2 text-2xl font-bold text-white sm:text-4xl">
        ✨ Wishes From the Stars ✨
      </h2>
      <p className="mb-6 text-sm text-white/70 sm:text-base">
        Watch closely...
      </p>

      <div
        ref={containerRef}
        className="relative h-40 w-full max-w-xl sm:h-56"
      >
        <canvas ref={canvasRef} className="absolute inset-0" />
      </div>
    </ScreenShell>
  );
}
