"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import ScreenShell from "../shared/ScreenShell";
import Petals from "../shared/Petals";
import { LETTER_LINES } from "@/lib/journeyConfig";

type LetterScreenProps = {
  nickname: string;
  onContinue: () => void;
};

export default function LetterScreen({ nickname, onContinue }: LetterScreenProps) {
  const [done, setDone] = useState(false);
  const letterText = `Dear ${nickname},\n\n${LETTER_LINES.join("\n\n")}\n\nHappy Birthday ❤️`;

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
    </ScreenShell>
  );
}
