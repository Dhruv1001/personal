"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import GardenBackdrop from "./shared/GardenBackdrop";
import CursorGlow from "./shared/CursorGlow";
import ProgressIndicator from "./shared/ProgressIndicator";
import LoadingScreen from "./screens/LoadingScreen";
import GiftRevealScreen from "./screens/GiftRevealScreen";
import HappyBirthdayScreen from "./screens/HappyBirthdayScreen";
import QuestionScreen from "./screens/QuestionScreen";
import ReasonsScreen from "./screens/ReasonsScreen";
import WishesScreen from "./screens/WishesScreen";
import LetterScreen from "./screens/LetterScreen";
import CakeScreen from "./screens/CakeScreen";
import StarTextScreen from "./screens/StarTextScreen";
import FinalSurpriseScreen from "./screens/FinalSurpriseScreen";
import EndingScreen from "./screens/EndingScreen";
import { NAME } from "@/lib/journeyConfig";

const TOTAL_STEPS = 10;

export default function JourneyExperience() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    document.title = `Happy Birthday, ${NAME}! 🎉`;
  }, []);

  function goNext() {
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  }

  function restart() {
    setStep(1);
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <GardenBackdrop progress={step / TOTAL_STEPS} />
      <CursorGlow />
      {step > 0 && step < TOTAL_STEPS && (
        <ProgressIndicator step={step} total={TOTAL_STEPS} />
      )}

      <AnimatePresence mode="wait">
        {step === 0 && <LoadingScreen key="loading" onContinue={goNext} />}
        {step === 1 && <GiftRevealScreen key="gift" onContinue={goNext} />}
        {step === 2 && <HappyBirthdayScreen key="happy" onContinue={goNext} />}
        {step === 3 && <QuestionScreen key="question" onContinue={goNext} />}
        {step === 4 && <ReasonsScreen key="reasons" onContinue={goNext} />}
        {step === 5 && <WishesScreen key="wishes" onContinue={goNext} />}
        {step === 6 && <LetterScreen key="letter" onContinue={goNext} />}
        {step === 7 && <CakeScreen key="cake" onContinue={goNext} />}
        {step === 8 && <StarTextScreen key="startext" onContinue={goNext} />}
        {step === 9 && <FinalSurpriseScreen key="final" onContinue={goNext} />}
        {step === 10 && <EndingScreen key="ending" onRestart={restart} />}
      </AnimatePresence>
    </div>
  );
}
