"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ScreenShell from "../shared/ScreenShell";
import { WISHES } from "@/lib/journeyConfig";

type WishesScreenProps = {
  onContinue: () => void;
};

const POSITIONS = [4, 16, 28, 40, 52, 64, 76];

export default function WishesScreen({ onContinue }: WishesScreenProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 3500);
    return () => clearTimeout(t);
  }, []);

  return (
    <ScreenShell onContinue={ready ? onContinue : undefined} continueLabel="Continue →">
      <h2 className="text-glow mb-4 text-2xl font-bold text-white sm:text-4xl">
        🌸 Wishes on the Breeze
      </h2>
      <p className="mb-6 text-sm text-white/70 sm:text-base">
        Drag a petal to hold onto a wish 🌸
      </p>

      <div className="relative h-[52vh] w-full max-w-2xl overflow-hidden sm:h-[58vh]">
        {WISHES.map((wish, i) => {
          const left = POSITIONS[i % POSITIONS.length];
          return (
            <motion.div
              key={wish}
              drag
              dragMomentum={false}
              dragElastic={0.15}
              className="glass-card absolute bottom-0 flex cursor-grab items-start gap-2 px-3 py-2 active:cursor-grabbing sm:px-4"
              style={{ left: `${left}%`, maxWidth: `${100 - left - 4}%` }}
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: [0, "-70vh"], opacity: [0, 1, 1, 0] }}
              transition={{
                duration: 11 + i * 1.6,
                repeat: Infinity,
                delay: i * 1.1,
                ease: "easeInOut",
              }}
            >
              <span className="sparkle gold-glow shrink-0 text-lg">🌸</span>
              <p className="font-quote gold-glow text-sm italic text-white sm:text-base">
                {wish}
              </p>
            </motion.div>
          );
        })}
      </div>
    </ScreenShell>
  );
}
