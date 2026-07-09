"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (isCoarsePointer || prefersReducedMotion || !glowRef.current) return;

    const el = glowRef.current;
    const moveX = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3" });
    const moveY = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3" });

    function handleMove(e: MouseEvent) {
      moveX(e.clientX);
      moveY(e.clientY);
    }

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-30 hidden h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 mix-blend-screen sm:block"
      style={{
        background:
          "radial-gradient(circle, rgba(248,215,230,0.35), rgba(233,196,106,0.18) 40%, transparent 70%)",
      }}
    />
  );
}
