"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import ScreenShell from "../shared/ScreenShell";
import Petals from "../shared/Petals";
import { LETTER_LINES, NAME } from "@/lib/journeyConfig";
import { feedback } from "@/lib/sound";

type LetterScreenProps = {
  onContinue: () => void;
};

type Stage = "closed" | "opening" | "unfolded";

export default function LetterScreen({ onContinue }: LetterScreenProps) {
  const [stage, setStage] = useState<Stage>("closed");
  const [done, setDone] = useState(false);
  const letterText = `Dear ${NAME},\n\n${LETTER_LINES.join("\n\n")}\n\n❤️\nLove,\nYour Best Friend`;

  function openEnvelope() {
    if (stage !== "closed") return;
    feedback(10);
    setStage("opening");
    setTimeout(() => setStage("unfolded"), 700);
  }

  return (
    <ScreenShell onContinue={done ? onContinue : undefined} continueLabel="Continue →">
      <Petals />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(circle at 50% 40%, rgba(255,216,107,0.12), transparent 60%)",
        }}
      />

      {stage !== "unfolded" ? (
        <button
          onClick={openEnvelope}
          aria-label="Open the letter"
          className="relative z-10 flex flex-col items-center"
          style={{ perspective: 800 }}
        >
          <div className="relative h-32 w-44 sm:h-40 sm:w-56">
            <div
              className="absolute inset-0 rounded-md bg-gradient-to-br from-[#FFF8F0] to-[#F8D7E6]"
              style={{ boxShadow: "0 0 26px 8px rgba(233,196,106,0.35)" }}
            />
            <div
              className={`absolute inset-x-0 top-0 h-1/2 rounded-t-md bg-gradient-to-br from-[#F8D7E6] to-[#CDB4DB] ${
                stage === "opening" ? "envelope-flap" : ""
              }`}
              style={{ transformStyle: "preserve-3d" }}
            />
            <span className="absolute inset-0 flex items-center justify-center text-3xl">
              💌
            </span>
          </div>
          <p className="mt-6 text-sm text-white/80 sm:text-base">
            {stage === "closed" ? "Tap the envelope to open it" : "✨"}
          </p>
        </button>
      ) : (
        <motion.div
          className="glass-card relative z-10 w-full max-w-lg origin-top px-6 py-10 sm:px-12 sm:py-14"
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <TypeAnimation
            sequence={[letterText, 600, () => setDone(true)]}
            wrapper="p"
            cursor={!done}
            repeat={0}
            speed={70}
            className="font-quote whitespace-pre-line text-left text-base italic leading-relaxed text-white sm:text-lg"
          />
        </motion.div>
      )}
    </ScreenShell>
  );
}
