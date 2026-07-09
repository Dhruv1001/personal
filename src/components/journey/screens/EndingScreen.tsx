"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { burstCannons } from "@/lib/confetti";
import { NAME } from "@/lib/journeyConfig";

const BLOOMS = [
  { top: "6%", left: "8%", emoji: "🌸", size: 30, delay: 0 },
  { top: "14%", left: "88%", emoji: "🌷", size: 26, delay: 0.2 },
  { top: "80%", left: "6%", emoji: "🌼", size: 28, delay: 0.4 },
  { top: "86%", left: "90%", emoji: "🌺", size: 26, delay: 0.6 },
  { top: "4%", left: "46%", emoji: "🌷", size: 22, delay: 0.8 },
  { top: "90%", left: "44%", emoji: "🌸", size: 24, delay: 1 },
  { top: "40%", left: "4%", emoji: "🌼", size: 22, delay: 1.2 },
  { top: "46%", left: "94%", emoji: "🌺", size: 24, delay: 1.4 },
];

type EndingScreenProps = {
  onRestart: () => void;
};

export default function EndingScreen({ onRestart }: EndingScreenProps) {
  useEffect(() => {
    burstCannons();
    const t = setInterval(burstCannons, 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center px-4 py-16 text-center sm:px-6">
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {BLOOMS.map((b, i) => (
          <span
            key={i}
            className="flower-bloom absolute"
            style={{
              top: b.top,
              left: b.left,
              fontSize: b.size,
              animationDelay: `${b.delay}s`,
            }}
          >
            {b.emoji}
          </span>
        ))}
      </div>

      <motion.p
        className="text-glow relative z-10 text-4xl text-white sm:text-5xl"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        🌙
      </motion.p>

      <motion.p
        className="text-glow font-quote relative z-10 mt-4 max-w-md text-lg italic text-white sm:text-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        No matter where life takes us...
      </motion.p>

      <motion.p
        className="text-glow font-quote relative z-10 mt-2 max-w-md text-lg italic text-white sm:text-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        I&apos;ll always wish the very best for you.
      </motion.p>

      <motion.h1
        className="text-glow gold-glow font-script relative z-10 mt-6 text-5xl text-white sm:text-7xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 1, type: "spring" }}
      >
        Happy Birthday Once Again, {NAME} ❤️
      </motion.h1>

      <motion.button
        onClick={onRestart}
        className="relative z-10 mt-10 flex items-center gap-2 rounded-full border border-[#E9C46A]/50 px-5 py-2 text-sm text-white/80 backdrop-blur transition hover:bg-white/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <RotateCcw size={14} /> Replay Journey
      </motion.button>
    </section>
  );
}
