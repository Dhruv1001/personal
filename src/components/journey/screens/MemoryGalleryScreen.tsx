"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ScreenShell from "../shared/ScreenShell";
import { MEMORIES } from "@/lib/journeyConfig";

type MemoryGalleryScreenProps = {
  onContinue: () => void;
};

export default function MemoryGalleryScreen({ onContinue }: MemoryGalleryScreenProps) {
  const [index, setIndex] = useState(0);
  const memory = MEMORIES[index];

  function next() {
    setIndex((i) => (i + 1) % MEMORIES.length);
  }

  function prev() {
    setIndex((i) => (i - 1 + MEMORIES.length) % MEMORIES.length);
  }

  function handleDragEnd(_: unknown, info: PanInfo) {
    if (info.offset.x < -80) next();
    else if (info.offset.x > 80) prev();
  }

  return (
    <ScreenShell onContinue={onContinue} continueLabel="Continue →">
      <h2 className="text-glow mb-6 text-2xl font-bold text-white sm:text-4xl">
        Memory Gallery
      </h2>

      <div className="relative flex items-center gap-2 sm:gap-4 md:gap-6">
        <button
          onClick={prev}
          aria-label="Previous memory"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white/25 sm:h-9 sm:w-9 md:h-11 md:w-11"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="relative h-44 w-44 overflow-hidden rounded-2xl shadow-2xl sm:h-64 sm:w-64 md:h-80 md:w-80">
          <AnimatePresence mode="wait">
            <motion.div
              key={memory.src}
              className="absolute inset-0"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.5}
              onDragEnd={handleDragEnd}
              initial={{ opacity: 0, scale: 1.15 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6 }}
            >
              <Image
                src={memory.src}
                alt={memory.caption}
                fill
                sizes="(max-width: 640px) 176px, (max-width: 768px) 256px, 320px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          onClick={next}
          aria-label="Next memory"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white/25 sm:h-9 sm:w-9 md:h-11 md:w-11"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={memory.caption}
          className="font-quote mt-5 max-w-xs text-base italic text-white/90 sm:max-w-md sm:text-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {memory.caption}
        </motion.p>
      </AnimatePresence>

      <div className="mt-4 flex gap-1.5">
        {MEMORIES.map((m, i) => (
          <span
            key={m.src}
            className={`h-1.5 w-1.5 rounded-full transition ${
              i === index ? "bg-white" : "bg-white/30"
            }`}
          />
        ))}
      </div>
    </ScreenShell>
  );
}
