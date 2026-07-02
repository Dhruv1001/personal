"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ScreenShell from "../shared/ScreenShell";
import { ADMIRE_CARDS } from "@/lib/journeyConfig";

type AdmireScreenProps = {
  onContinue: () => void;
};

export default function AdmireScreen({ onContinue }: AdmireScreenProps) {
  const [flipped, setFlipped] = useState<boolean[]>(() =>
    Array(ADMIRE_CARDS.length).fill(false)
  );

  function toggle(i: number) {
    setFlipped((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
  }

  return (
    <ScreenShell onContinue={onContinue} continueLabel="Continue →">
      <h2 className="text-glow mb-2 text-2xl font-bold text-white sm:text-4xl">
        Things I Admire About You
      </h2>
      <p className="mb-8 text-sm text-white/75 sm:text-base">Tap a card to flip it</p>

      <div className="grid w-full max-w-2xl grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5">
        {ADMIRE_CARDS.map((card, i) => (
          <motion.div
            key={card.title}
            className="gentle-float mx-auto aspect-square w-full max-w-32 sm:max-w-36"
            style={{ animationDelay: `${i * 0.3}s` }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
          >
            <button
              onClick={() => toggle(i)}
              aria-label={card.title}
              className="glass-card relative h-full w-full overflow-hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                {!flipped[i] ? (
                  <motion.div
                    key="front"
                    className="absolute inset-0 flex flex-col items-center justify-center gap-2"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    exit={{ scaleX: 0 }}
                    transition={{ duration: 0.35 }}
                  >
                    <span className="text-3xl">{card.emoji}</span>
                    <span className="text-xs text-white/70">tap</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="back"
                    className="absolute inset-0 flex flex-col items-center justify-center gap-1 px-2 text-center"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    exit={{ scaleX: 0 }}
                    transition={{ duration: 0.35 }}
                  >
                    <p className="text-sm font-semibold text-white">{card.title}</p>
                    <p className="text-[11px] text-white/85">{card.desc}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </motion.div>
        ))}
      </div>
    </ScreenShell>
  );
}
