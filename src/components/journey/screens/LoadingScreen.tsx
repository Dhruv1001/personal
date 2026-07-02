"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type LoadingScreenProps = {
  nickname: string;
  onContinue: () => void;
};

export default function LoadingScreen({ nickname, onContinue }: LoadingScreenProps) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 2600);
    const t2 = setTimeout(() => setPhase(2), 5200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <section className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center px-6 text-center">
      <div className="flex h-24 items-center justify-center sm:h-28">
        <AnimatePresence mode="wait">
          {phase === 0 && (
            <motion.p
              key="line1"
              className="font-quote max-w-md text-xl italic text-white sm:text-2xl"
              initial={{ opacity: 0, filter: "blur(6px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(6px)" }}
              transition={{ duration: 1 }}
            >
              Every friendship has a beautiful story...
            </motion.p>
          )}
          {phase >= 1 && (
            <motion.p
              key="line2"
              className="text-glow font-script text-4xl text-white sm:text-5xl"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              This one is for {nickname} ❤️
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {phase === 2 && (
          <motion.button
            onClick={onContinue}
            className="ripple mt-12 rounded-full bg-white/90 px-8 py-3 text-lg font-semibold text-[#7c3f8f] shadow-lg transition hover:scale-105 active:scale-95"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
          >
            Begin the Journey ✨
          </motion.button>
        )}
      </AnimatePresence>
    </section>
  );
}
