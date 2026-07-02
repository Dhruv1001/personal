"use client";

import { motion } from "framer-motion";
import ScreenShell from "../shared/ScreenShell";
import { WISHES } from "@/lib/journeyConfig";

type WishesScreenProps = {
  onContinue: () => void;
};

export default function WishesScreen({ onContinue }: WishesScreenProps) {
  return (
    <ScreenShell onContinue={onContinue} continueLabel="Continue →">
      <h2 className="text-glow mb-8 text-2xl font-bold text-white sm:text-4xl">
        Wishes From the Universe
      </h2>

      <div className="flex max-w-md flex-col gap-4">
        {WISHES.map((wish, i) => (
          <motion.div
            key={wish}
            className="flex items-center justify-center gap-3"
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.25 }}
          >
            <span className="sparkle gold-glow text-xl">✨</span>
            <p className="font-quote gold-glow text-xl italic text-white sm:text-2xl">
              {wish}
            </p>
          </motion.div>
        ))}
      </div>
    </ScreenShell>
  );
}
