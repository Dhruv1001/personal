"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ScreenShell from "../shared/ScreenShell";
import { burstGold } from "@/lib/confetti";
import { feedback } from "@/lib/sound";

type GiftRevealScreenProps = {
  onContinue: () => void;
};

type Phase = "idle" | "shaking" | "opening" | "opened";

export default function GiftRevealScreen({ onContinue }: GiftRevealScreenProps) {
  const [phase, setPhase] = useState<Phase>("idle");

  function openGift() {
    if (phase !== "idle") return;
    feedback(15);
    setPhase("shaking");
  }

  useEffect(() => {
    if (phase === "shaking") {
      const t = setTimeout(() => setPhase("opening"), 500);
      return () => clearTimeout(t);
    }
    if (phase === "opening") {
      const t = setTimeout(() => {
        setPhase("opened");
        burstGold();
      }, 900);
      return () => clearTimeout(t);
    }
    if (phase === "opened") {
      const t = setTimeout(onContinue, 1400);
      return () => clearTimeout(t);
    }
  }, [phase, onContinue]);

  return (
    <ScreenShell>
      <motion.div
        className="flex flex-col items-center"
        animate={phase === "opened" ? { scale: 1.08 } : { scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="font-quote mb-8 max-w-md text-lg italic text-white sm:text-xl">
          Someone has a surprise waiting for you...
        </p>

        <motion.button
          onClick={openGift}
          aria-label="Open your gift"
          className={`relative flex flex-col items-center ${
            phase === "shaking" ? "gift-shake" : ""
          }`}
          whileHover={phase === "idle" ? { scale: 1.05 } : undefined}
          whileTap={phase === "idle" ? { scale: 0.95 } : undefined}
          style={{
            filter:
              phase === "idle"
                ? "drop-shadow(0 0 22px rgba(255,216,107,0.55))"
                : undefined,
          }}
        >
          <AnimatePresence>
            {phase !== "opened" && (
              <motion.div
                className="absolute -top-3 h-3 w-32 rounded-full bg-[#CDB4DB] sm:w-40"
                animate={
                  phase === "opening"
                    ? { rotate: 35, x: 40, opacity: 0 }
                    : { rotate: 0, x: 0, opacity: 1 }
                }
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeIn" }}
              />
            )}
          </AnimatePresence>

          <div className="relative h-32 w-32 sm:h-40 sm:w-40">
            <motion.div
              className="absolute inset-x-0 top-0 h-1/2 rounded-t-lg bg-gradient-to-br from-[#F8D7E6] to-[#E9C46A]"
              animate={
                phase === "opening" || phase === "opened"
                  ? { y: -26, opacity: 0 }
                  : { y: 0, opacity: 1 }
              }
              transition={{ duration: 0.7, ease: "easeOut" }}
            />
            <div className="absolute inset-x-0 bottom-0 h-1/2 rounded-b-lg bg-gradient-to-br from-[#E9C46A] to-[#F8D7E6]" />
            <div className="absolute inset-y-0 left-1/2 w-3 -translate-x-1/2 bg-[#FFF8F0]" />
            <div className="absolute inset-x-0 top-1/2 h-3 -translate-y-1/2 bg-[#FFF8F0]" />
          </div>

          <p className="mt-6 text-sm text-white/80 sm:text-base">
            {phase === "idle" ? "Click the glowing gift to begin." : "✨"}
          </p>
        </motion.button>
      </motion.div>
    </ScreenShell>
  );
}
