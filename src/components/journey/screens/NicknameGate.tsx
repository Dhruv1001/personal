"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import GlassCard from "../shared/GlassCard";

type NicknameGateProps = {
  onSubmit: (nickname: string) => void;
};

export default function NicknameGate({ onSubmit }: NicknameGateProps) {
  const [value, setValue] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit(value.trim() || "friend");
  }

  return (
    <motion.section
      className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center px-4 text-center sm:px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <GlassCard className="flex w-full max-w-sm flex-col items-center px-6 py-10 sm:px-10 sm:py-12">
        <p className="font-quote text-lg italic text-white sm:text-xl">
          Before we begin...
        </p>
        <h1 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
          What should I call you? ✨
        </h1>

        <form onSubmit={handleSubmit} className="mt-6 flex w-full flex-col gap-4">
          <input
            autoFocus
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Your nickname"
            className="w-full rounded-full border border-white/30 bg-white/10 px-5 py-3 text-center text-white placeholder-white/50 outline-none backdrop-blur-md focus:border-white/60"
          />
          <button
            type="submit"
            className="ripple rounded-full bg-white/90 px-6 py-2.5 text-base font-semibold text-[#7c3f8f] shadow-lg transition hover:scale-105 active:scale-95"
          >
            Enter ✨
          </button>
        </form>
      </GlassCard>
    </motion.section>
  );
}
