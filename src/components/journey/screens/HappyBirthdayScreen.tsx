"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import ScreenShell from "../shared/ScreenShell";
import Butterflies from "../shared/Butterflies";
import PollenDust from "../shared/PollenDust";
import { burstGold } from "@/lib/confetti";
import { NAME } from "@/lib/journeyConfig";

const FLOWERS = [
  { top: "12%", left: "10%", emoji: "🌸", size: 34, delay: 0.1 },
  { top: "18%", left: "84%", emoji: "🌷", size: 30, delay: 0.3 },
  { top: "72%", left: "8%", emoji: "🌼", size: 32, delay: 0.5 },
  { top: "78%", left: "88%", emoji: "🌺", size: 30, delay: 0.7 },
  { top: "8%", left: "48%", emoji: "🌷", size: 26, delay: 0.9 },
  { top: "84%", left: "46%", emoji: "🌸", size: 28, delay: 1.1 },
];

type HappyBirthdayScreenProps = {
  onContinue: () => void;
};

export default function HappyBirthdayScreen({ onContinue }: HappyBirthdayScreenProps) {
  useEffect(() => {
    const t = setTimeout(burstGold, 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <ScreenShell onContinue={onContinue} continueLabel="Continue →">
      <Butterflies />
      <PollenDust />

      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {FLOWERS.map((f, i) => (
          <span
            key={i}
            className="flower-bloom absolute"
            style={{
              top: f.top,
              left: f.left,
              fontSize: f.size,
              animationDelay: `${f.delay}s`,
            }}
          >
            {f.emoji}
          </span>
        ))}
      </div>

      <motion.p
        className="text-glow gold-glow font-script relative z-10 text-4xl text-white sm:text-6xl"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, type: "spring" }}
      >
        🌸 Happy Birthday {NAME} 🌸
      </motion.p>
    </ScreenShell>
  );
}
