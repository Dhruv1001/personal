"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ScreenShell from "../shared/ScreenShell";
import { REASONS } from "@/lib/journeyConfig";

type ReasonsScreenProps = {
  onContinue: () => void;
};

export default function ReasonsScreen({ onContinue }: ReasonsScreenProps) {
  const [index, setIndex] = useState(-1);

  function revealNext() {
    setIndex((i) => Math.min(i + 1, REASONS.length - 1));
  }

  return (
    <ScreenShell onContinue={index >= 0 ? onContinue : undefined} continueLabel="Continue →">
      <h2 className="text-glow mb-2 text-2xl font-bold text-white sm:text-4xl">
        Reasons You&apos;re Special
      </h2>
      <p className="mb-8 text-sm text-white/75 sm:text-base">
        {index < REASONS.length - 1
          ? "Tap the heart for another reason"
          : "That's all of them — but really, there are endless more"}
      </p>

      <motion.button
        onClick={revealNext}
        aria-label="Reveal a reason"
        className="heartbeat text-7xl sm:text-8xl"
        whileTap={{ scale: 0.85 }}
        disabled={index >= REASONS.length - 1}
      >
        💗
      </motion.button>

      <div className="mt-8 flex h-20 max-w-md items-center justify-center px-4">
        <AnimatePresence mode="wait">
          {index >= 0 && (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-xs uppercase tracking-widest text-white/60">
                Reason #{index + 1}
              </p>
              <p className="font-quote mt-1 text-lg italic text-white sm:text-xl">
                {REASONS[index]}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ScreenShell>
  );
}
