"use client";

import { motion } from "framer-motion";
import ScreenShell from "../shared/ScreenShell";
import GlassCard from "../shared/GlassCard";

type WelcomeScreenProps = {
  nickname: string;
  onContinue: () => void;
};

const BLOOMS = [
  { top: "8%", left: "10%", size: 32, delay: 0 },
  { top: "14%", left: "85%", size: 26, delay: 0.15 },
  { top: "82%", left: "8%", size: 28, delay: 0.3 },
  { top: "86%", left: "88%", size: 30, delay: 0.45 },
];

export default function WelcomeScreen({ nickname, onContinue }: WelcomeScreenProps) {
  return (
    <ScreenShell onContinue={onContinue} continueLabel="Continue →">
      {BLOOMS.map((b, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="pointer-events-none absolute"
          style={{ top: b.top, left: b.left, fontSize: b.size }}
          initial={{ scale: 0, opacity: 0, rotate: -30 }}
          animate={{ scale: 1, opacity: 0.9, rotate: 0 }}
          transition={{ delay: b.delay, duration: 0.8, type: "spring" }}
        >
          🌸
        </motion.span>
      ))}

      <GlassCard className="flex w-full max-w-lg flex-col gap-4 px-6 py-10 sm:px-12 sm:py-14">
        <p className="font-script text-glow text-3xl text-white sm:text-4xl">
          Dear {nickname},
        </p>
        <p className="font-quote text-base italic text-white/90 sm:text-lg">
          Today isn&apos;t just another day.
        </p>
        <p className="text-base text-white/90 sm:text-lg">
          It&apos;s the day someone incredibly special came into this world.
        </p>
        <p className="text-base text-white/90 sm:text-lg">
          And I wanted to celebrate it differently...
        </p>
      </GlassCard>
    </ScreenShell>
  );
}
