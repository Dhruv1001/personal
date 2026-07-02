"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Mic } from "lucide-react";
import ScreenShell from "../shared/ScreenShell";
import { burstUp, burstCannons } from "@/lib/confetti";

type CakeScreenProps = {
  onContinue: () => void;
};

const CANDLE_COUNT = 5;

const SPRINKLES = [
  { left: "18%", top: "-6px", color: "#FF69B4", rotate: "20deg" },
  { left: "32%", top: "-2px", color: "#F3E8FF", rotate: "-15deg" },
  { left: "48%", top: "-8px", color: "#FFC6D9", rotate: "35deg" },
  { left: "63%", top: "-3px", color: "#FFD86B", rotate: "-25deg" },
  { left: "77%", top: "-7px", color: "#FF69B4", rotate: "10deg" },
];

export default function CakeScreen({ onContinue }: CakeScreenProps) {
  const [lit, setLit] = useState<boolean[]>(() => Array(CANDLE_COUNT).fill(true));
  const [micActive, setMicActive] = useState(false);
  const allOut = lit.every((isLit) => !isLit);
  const rafRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  function blowAll() {
    if (allOut) return;
    lit.forEach((_, i) => {
      setTimeout(() => {
        setLit((prev) => {
          const next = [...prev];
          next[i] = false;
          return next;
        });
        if (i === lit.length - 1) {
          burstUp(0.8);
          setTimeout(burstCannons, 250);
        }
      }, i * 120);
    });
  }

  async function tryMicBlow() {
    if (micActive) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      setMicActive(true);

      const audioCtx = new AudioContext();
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 512;
      audioCtx.createMediaStreamSource(stream).connect(analyser);
      const data = new Uint8Array(analyser.frequencyBinCount);

      const check = () => {
        analyser.getByteFrequencyData(data);
        const volume = data.reduce((a, b) => a + b, 0) / data.length;
        if (volume > 45) {
          blowAll();
          stopMic();
          return;
        }
        rafRef.current = requestAnimationFrame(check);
      };
      check();
    } catch {
      setMicActive(false);
    }
  }

  function stopMic() {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setMicActive(false);
  }

  useEffect(() => stopMic, []);

  function relight() {
    setLit(Array(CANDLE_COUNT).fill(true));
  }

  return (
    <ScreenShell onContinue={allOut ? onContinue : undefined} continueLabel="Continue →">
      <h2 className="text-glow mb-6 text-2xl font-bold text-white sm:text-4xl">
        Make a wish 🌟
      </h2>

      <div className="glass-card flex flex-col items-center px-5 py-8 sm:px-10 sm:py-10 md:px-12 md:py-12">
        <div className="flex items-end justify-center gap-1.5 sm:gap-2 md:gap-3">
          {lit.map((isLit, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="flex h-6 w-2 items-end justify-center sm:h-8 sm:w-2.5 md:h-10 md:w-3">
                {isLit && (
                  <div
                    className="flame h-3 w-2 rounded-full bg-gradient-to-t from-orange-500 via-yellow-300 to-yellow-100 sm:h-4 sm:w-2.5 md:h-5 md:w-3"
                    style={{ boxShadow: "0 0 12px 3px rgba(255,200,80,0.8)" }}
                  />
                )}
              </div>
              <div className="h-6 w-1.5 rounded-sm bg-gradient-to-b from-[#FFC6D9] to-[#FF69B4] sm:h-8 sm:w-2 md:h-10 md:w-2.5" />
            </div>
          ))}
        </div>

        <div className="-mt-1 flex flex-col items-center">
          <div
            className="frosting relative h-5 w-36 rounded-t-3xl bg-gradient-to-b from-[#F3E8FF] to-[#FFC6D9] sm:h-6 sm:w-48 md:h-8 md:w-64"
            style={{ color: "#FFC6D9" }}
          >
            {SPRINKLES.map((s, i) => (
              <span
                key={i}
                className="sprinkle h-2 w-1 sm:h-2.5 md:h-3"
                style={{ left: s.left, top: s.top, background: s.color, transform: `rotate(${s.rotate})` }}
              />
            ))}
          </div>
          <div
            className="frosting h-6 w-44 rounded-t-2xl bg-gradient-to-b from-[#FFC6D9] to-[#FF69B4] sm:h-8 sm:w-56 md:h-10 md:w-72"
            style={{ color: "#FF69B4" }}
          />
          <div
            className="frosting h-8 w-52 rounded-t-2xl bg-gradient-to-b from-[#FF69B4] to-[#7c3f8f] sm:h-10 sm:w-64 md:h-12 md:w-80"
            style={{ color: "#7c3f8f" }}
          />
        </div>

        {!allOut ? (
          <div className="mt-8 flex flex-col items-center gap-3 sm:mt-10">
            <motion.button
              onClick={blowAll}
              className="ripple rounded-full bg-white px-6 py-2.5 text-base font-semibold text-[#7c3f8f] shadow-lg transition hover:scale-105 hover:shadow-xl active:scale-95 sm:px-8 sm:py-3 sm:text-lg"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
            >
              Blow out the candles 💨
            </motion.button>
            <button
              onClick={tryMicBlow}
              className="flex items-center gap-1.5 text-xs text-white/70 underline-offset-2 hover:underline"
            >
              <Mic size={13} /> {micActive ? "Listening... blow now!" : "Or try blowing into your mic"}
            </button>
          </div>
        ) : (
          <motion.p
            className="mt-8 text-base font-semibold text-white sm:mt-10 sm:text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            Wish sent to the universe ✨
          </motion.p>
        )}
      </div>

      {allOut && (
        <button
          onClick={relight}
          className="mt-4 rounded-full border border-white/40 px-4 py-1.5 text-sm text-white/80 transition hover:bg-white/10"
        >
          Relight candles
        </button>
      )}
    </ScreenShell>
  );
}
