"use client";

import { ReactNode } from "react";
import { motion, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import GardenButton from "./GardenButton";

export const screenVariants: Variants = {
  initial: { opacity: 0, y: 40, scale: 0.96 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -40, scale: 0.96 },
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
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-10"
        >
          <GardenButton onClick={onContinue}>
            {continueLabel} <ArrowRight size={16} />
          </GardenButton>
        </motion.div>
      )}
    </motion.section>
  );
}
