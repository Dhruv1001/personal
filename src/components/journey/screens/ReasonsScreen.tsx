"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ScreenShell from "../shared/ScreenShell";
import { REASON_CARDS } from "@/lib/journeyConfig";
import { feedback } from "@/lib/sound";

type ReasonsScreenProps = {
  onContinue: () => void;
};

export default function ReasonsScreen({ onContinue }: ReasonsScreenProps) {
  const [index, setIndex] = useState(0);
  const isLast = index >= REASON_CARDS.length - 1;
  const card = REASON_CARDS[index];

  function draw() {
    if (isLast) return;
    feedback(10);
    setIndex((i) => Math.min(i + 1, REASON_CARDS.length - 1));
  }

  return (
    <ScreenShell onContinue={isLast ? onContinue : undefined} continueLabel="Continue →">
      <h2 className="text-glow mb-2 text-2xl font-bold text-white sm:text-4xl">
        Reasons You&apos;re Amazing
      </h2>
      <p className="mb-8 text-sm text-white/75 sm:text-base">
        {isLast ? "That's all of them — but really, there are endless more" : "Tap the card to draw another"}
      </p>

      <div className="relative h-56 w-56 sm:h-64 sm:w-64" style={{ perspective: 1200 }}>
        <AnimatePresence mode="wait">
          <motion.button
            key={index}
            onClick={draw}
            aria-label="Reveal another reason"
            className="glass-card absolute inset-0 flex flex-col items-center justify-center gap-4 px-6"
            initial={{ opacity: 0, rotateY: 90, scale: 0.85 }}
            animate={{ opacity: 1, rotateY: 0, scale: 1 }}
            exit={{ opacity: 0, rotateY: -90, scale: 0.85 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-5xl">{card.emoji}</span>
            <p className="font-quote text-center text-lg italic text-white sm:text-xl">
              {card.text}
            </p>
          </motion.button>
        </AnimatePresence>
      </div>

      <p className="mt-6 text-xs uppercase tracking-widest text-white/50">
        {index + 1} / {REASON_CARDS.length}
      </p>
    </ScreenShell>
  );
}
