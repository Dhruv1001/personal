"use client";

import { motion } from "framer-motion";

type ProgressIndicatorProps = {
  step: number;
  total: number;
};

const LEAF_POSITIONS = [12, 24, 36, 48, 60, 72, 84, 96];

export default function ProgressIndicator({ step, total }: ProgressIndicatorProps) {
  const pct = Math.min(100, Math.max(0, (step / total) * 100));

  return (
    <div aria-hidden className="fixed inset-x-0 top-0 z-40 h-1.5 bg-white/10">
      <motion.div
        className="relative h-full bg-gradient-to-r from-[#A8C686] via-[#D8F3DC] to-[#E9C46A]"
        style={{ boxShadow: "0 0 8px 1px rgba(233,196,106,0.6)" }}
        initial={false}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />
      {LEAF_POSITIONS.map((pos) => (
        <motion.span
          key={pos}
          className="absolute top-1/2 -translate-y-1/2 text-[10px]"
          style={{ left: `${pos}%` }}
          initial={false}
          animate={{ opacity: pct >= pos ? 1 : 0, scale: pct >= pos ? 1 : 0.4 }}
          transition={{ duration: 0.4 }}
        >
          🌿
        </motion.span>
      ))}
    </div>
  );
}
