"use client";

import { ReactNode } from "react";
import { motion, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";

export const screenVariants: Variants = {
  initial: { opacity: 0, y: 40, scale: 0.96, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
  exit: { opacity: 0, y: -40, scale: 0.96, filter: "blur(8px)" },
};

type ScreenShellProps = {
  children: ReactNode;
  onContinue?: () => void;
  continueLabel?: string;
  className?: string;
};

export default function ScreenShell({
  children,
  onContinue,
  continueLabel = "Continue",
  className = "",
}: ScreenShellProps) {
  return (
    <motion.section
      variants={screenVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`relative z-10 flex min-h-screen w-full flex-col items-center justify-center px-4 py-16 text-center sm:px-6 ${className}`}
    >
      {children}

      {onContinue && (
        <motion.button
          onClick={onContinue}
          className="ripple mt-10 flex items-center gap-2 rounded-full bg-white/90 px-6 py-2.5 text-base font-semibold text-[#7c3f8f] shadow-lg transition hover:scale-105 hover:shadow-xl active:scale-95 sm:px-8 sm:py-3 sm:text-lg"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
        >
          {continueLabel} <ArrowRight size={18} />
        </motion.button>
      )}
    </motion.section>
  );
}
