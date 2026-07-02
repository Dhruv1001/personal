"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ScreenShell from "../shared/ScreenShell";
import FloatingHearts from "../shared/FloatingHearts";
import { burstCenter, burstCannons } from "@/lib/confetti";

type GiftRevealScreenProps = {
  nickname: string;
  onContinue: () => void;
};

export default function GiftRevealScreen({ nickname, onContinue }: GiftRevealScreenProps) {
  const [untied, setUntied] = useState(false);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setUntied(true), 1400);
    return () => clearTimeout(t);
  }, []);

  function openGift() {
    if (opened) return;
    setOpened(true);
    burstCenter();
    setTimeout(burstCannons, 300);
  }

  return (
    <ScreenShell onContinue={opened ? onContinue : undefined} continueLabel="Continue →">
      {opened && <FloatingHearts />}

      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.button
            key="gift"
            onClick={openGift}
            aria-label="Open your gift"
            className="relative flex flex-col items-center"
            exit={{ opacity: 0, scale: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute -top-3 h-3 w-32 rounded-full bg-[#FF69B4] sm:w-40"
              animate={untied ? { rotate: 35, x: 40, opacity: 0 } : { rotate: 0, x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeIn" }}
            />
            <div className="relative h-32 w-32 rounded-lg bg-gradient-to-br from-[#FFC6D9] to-[#FF69B4] shadow-2xl sm:h-40 sm:w-40">
              <div className="absolute inset-y-0 left-1/2 w-3 -translate-x-1/2 bg-[#F3E8FF]" />
              <div className="absolute inset-x-0 top-1/2 h-3 -translate-y-1/2 bg-[#F3E8FF]" />
            </div>
            <p className="mt-6 text-sm text-white/80 sm:text-base">Tap to open 🎁</p>
          </motion.button>
        ) : (
          <motion.div
            key="reveal"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, type: "spring" }}
          >
            <p className="text-glow gold-glow font-script text-4xl text-white sm:text-6xl">
              🎉 Happy Birthday {nickname} 🎉
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </ScreenShell>
  );
}
