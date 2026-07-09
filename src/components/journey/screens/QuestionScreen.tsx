"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ScreenShell from "../shared/ScreenShell";
import GlassCard from "../shared/GlassCard";
import GardenButton from "../shared/GardenButton";
import { burstCenter } from "@/lib/confetti";
import { feedback } from "@/lib/sound";
import { QUESTION } from "@/lib/journeyConfig";

type QuestionScreenProps = {
  onContinue: () => void;
};

export default function QuestionScreen({ onContinue }: QuestionScreenProps) {
  const [wrong, setWrong] = useState(false);
  const [correct, setCorrect] = useState(false);

  function choose(index: number) {
    if (correct) return;
    feedback(10);
    if (index === QUESTION.correctIndex) {
      setWrong(false);
      setCorrect(true);
      burstCenter();
    } else {
      setWrong(true);
      setTimeout(() => setWrong(false), 900);
    }
  }

  return (
    <ScreenShell onContinue={correct ? onContinue : undefined} continueLabel="Continue →">
      <GlassCard className="flex w-full max-w-md flex-col items-center gap-6 px-6 py-10 sm:px-10 sm:py-12">
        <p className="font-quote text-base italic text-white/85 sm:text-lg">
          Before we continue...
        </p>
        <h2 className="text-glow text-2xl font-bold text-white sm:text-3xl">
          {QUESTION.prompt}
        </h2>

        <motion.div
          className="flex w-full flex-col gap-3"
          animate={wrong ? { x: [0, -10, 10, -8, 8, 0] } : { x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {QUESTION.options.map((option, i) => (
            <GardenButton
              key={option}
              onClick={() => choose(i)}
              disabled={correct && i !== QUESTION.correctIndex}
              className="w-full justify-center"
            >
              {option}
            </GardenButton>
          ))}
        </motion.div>

        <div className="h-8">
          <AnimatePresence mode="wait">
            {wrong && (
              <motion.p
                key="wrong"
                className="font-quote text-lg italic text-white"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                Nope 😄 — try again.
              </motion.p>
            )}
            {correct && (
              <motion.p
                key="correct"
                className="gold-glow font-quote text-lg italic text-white"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Yes!! 🎉 Exactly right.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </GlassCard>
    </ScreenShell>
  );
}
