"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ScreenShell from "../shared/ScreenShell";
import { NAME } from "@/lib/journeyConfig";

type FinalSurpriseScreenProps = {
  onContinue: () => void;
};

const FLOATERS = [
  { top: "6%", left: "8%", rotate: -10, delay: 0, emoji: "🌸" },
  { top: "12%", left: "80%", rotate: 8, delay: 0.5, emoji: "🌷" },
  { top: "72%", left: "10%", rotate: 6, delay: 1, emoji: "🌼" },
  { top: "74%", left: "78%", rotate: -8, delay: 1.5, emoji: "🌺" },
];

export default function FinalSurpriseScreen({ onContinue }: FinalSurpriseScreenProps) {
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setLineIndex(1), 1600);
    const t2 = setTimeout(() => setLineIndex(2), 3400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <ScreenShell onContinue={lineIndex >= 2 ? onContinue : undefined} continueLabel="Continue →">
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {FLOATERS.map((f, i) => (
          <motion.span
            key={i}
            className="gentle-float absolute text-5xl sm:text-6xl"
            style={{ top: f.top, left: f.left, animationDelay: `${f.delay}s` }}
            initial={{ opacity: 0, scale: 0.6, rotate: f.rotate }}
            animate={{ opacity: 0.9, scale: 1, rotate: f.rotate }}
            transition={{ delay: f.delay, duration: 0.8 }}
          >
            {f.emoji}
          </motion.span>
        ))}
      </div>

      <motion.span
        className="heartbeat relative z-10 text-8xl sm:text-9xl"
        style={{ filter: "drop-shadow(0 0 24px rgba(233,196,106,0.6))" }}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, type: "spring" }}
      >
        ❤️
      </motion.span>

      <div className="relative z-10 mt-8 flex min-h-24 max-w-md flex-col items-center gap-3 px-4">
        {lineIndex >= 1 && (
          <motion.p
            className="text-glow font-quote text-lg italic text-white sm:text-xl"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            You make the world brighter just by being in it.
          </motion.p>
        )}
        {lineIndex >= 2 && (
          <motion.p
            className="gold-glow font-quote text-base italic text-white sm:text-lg"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Thank you for being the wonderful person you are, {NAME}.
          </motion.p>
        )}
      </div>
    </ScreenShell>
  );
}
