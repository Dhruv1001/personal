"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Starfield from "./shared/Starfield";
import CursorGlow from "./shared/CursorGlow";
import NicknameGate from "./screens/NicknameGate";
import LoadingScreen from "./screens/LoadingScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import GiftRevealScreen from "./screens/GiftRevealScreen";
import MemoryGalleryScreen from "./screens/MemoryGalleryScreen";
import AdmireScreen from "./screens/AdmireScreen";
import TimelineScreen from "./screens/TimelineScreen";
import ReasonsScreen from "./screens/ReasonsScreen";
import CakeScreen from "./screens/CakeScreen";
import LetterScreen from "./screens/LetterScreen";
import WishesScreen from "./screens/WishesScreen";
import EndingScreen from "./screens/EndingScreen";

const TOTAL_STEPS = 11;

export default function JourneyExperience() {
  const [step, setStep] = useState(0);
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    if (nickname) document.title = `Happy Birthday, ${nickname}! 🎉`;
  }, [nickname]);

  function goNext() {
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  }

  function handleNickname(enteredNickname: string) {
    setNickname(enteredNickname);
    setStep(1);
  }

  function restart() {
    setStep(1);
  }

  return (
    <div className="night-sky relative min-h-screen overflow-x-hidden">
      <Starfield />
      <CursorGlow />

      <AnimatePresence mode="wait">
        {step === 0 && <NicknameGate key="nickname" onSubmit={handleNickname} />}
        {step === 1 && (
          <LoadingScreen key="loading" nickname={nickname} onContinue={goNext} />
        )}
        {step === 2 && (
          <WelcomeScreen key="welcome" nickname={nickname} onContinue={goNext} />
        )}
        {step === 3 && (
          <GiftRevealScreen key="gift" nickname={nickname} onContinue={goNext} />
        )}
        {step === 4 && <MemoryGalleryScreen key="gallery" onContinue={goNext} />}
        {step === 5 && <AdmireScreen key="admire" onContinue={goNext} />}
        {step === 6 && <TimelineScreen key="timeline" onContinue={goNext} />}
        {step === 7 && <ReasonsScreen key="reasons" onContinue={goNext} />}
        {step === 8 && <CakeScreen key="cake" onContinue={goNext} />}
        {step === 9 && (
          <LetterScreen key="letter" nickname={nickname} onContinue={goNext} />
        )}
        {step === 10 && <WishesScreen key="wishes" onContinue={goNext} />}
        {step === 11 && (
          <EndingScreen key="ending" nickname={nickname} onRestart={restart} />
        )}
      </AnimatePresence>
    </div>
  );
}
