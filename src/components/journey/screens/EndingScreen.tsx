"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { burstCannons } from "@/lib/confetti";

const ReactConfetti = dynamic(() => import("react-confetti"), { ssr: false });

const LANTERNS = [
  { left: "8%", delay: "0s", duration: "14s" },
  { left: "22%", delay: "2s", duration: "16s" },
  { left: "40%", delay: "4s", duration: "13s" },
  { left: "58%", delay: "1s", duration: "17s" },
  { left: "74%", delay: "3.5s", duration: "15s" },
  { left: "88%", delay: "5s", duration: "14.5s" },
];

type EndingScreenProps = {
  nickname: string;
  onRestart: () => void;
};

export default function EndingScreen({ nickname, onRestart }: EndingScreenProps) {
  const [dimensions, setDimensions] = useState(() =>
    typeof window === "undefined"
      ? { width: 0, height: 0 }
      : { width: window.innerWidth, height: window.innerHeight }
  );

  useEffect(() => {
    function handleResize() {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    }
    window.addEventListener("resize", handleResize);

    burstCannons();
    const t = setInterval(burstCannons, 3000);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(t);
    };
  }, []);

  return (
    <section className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center px-4 py-16 text-center sm:px-6">
      {dimensions.width > 0 && (
        <ReactConfetti
          width={dimensions.width}
          height={dimensions.height}
          numberOfPieces={70}
          recycle
          gravity={0.08}
          className="pointer-events-none fixed inset-0 z-20"
        />
      )}

      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {LANTERNS.map((l, i) => (
          <div
            key={i}
            className="balloon"
            style={{
              left: l.left,
              width: 34,
              height: 44,
              borderRadius: "6px",
              background: "radial-gradient(circle at 40% 30%, #FFE9A8, #FF9E5E)",
              boxShadow: "0 0 18px 6px rgba(255,180,90,0.5)",
              animationDelay: l.delay,
              animationDuration: l.duration,
            }}
          />
        ))}
      </div>

      <motion.p
        className="text-glow font-quote mb-4 max-w-md text-lg italic text-white sm:text-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Thank you for taking this journey.
      </motion.p>

      <motion.h1
        className="text-glow gold-glow font-script text-5xl text-white sm:text-7xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
      >
        Happy Birthday, {nickname} ❤️
      </motion.h1>

      <motion.p
        className="mt-8 text-sm text-white/70 sm:text-base"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        Made with lots of love.
      </motion.p>

      <motion.button
        onClick={onRestart}
        className="mt-10 flex items-center gap-2 rounded-full border border-white/40 px-5 py-2 text-sm text-white/80 backdrop-blur transition hover:bg-white/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <RotateCcw size={14} /> Replay the journey
      </motion.button>
    </section>
  );
}
