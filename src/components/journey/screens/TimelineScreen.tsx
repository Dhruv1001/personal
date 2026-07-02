"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScreenShell from "../shared/ScreenShell";
import { TIMELINE } from "@/lib/journeyConfig";

type TimelineScreenProps = {
  onContinue: () => void;
};

export default function TimelineScreen({ onContinue }: TimelineScreenProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    gsap.registerPlugin(ScrollTrigger);

    const triggers = itemRefs.current.map((el) =>
      gsap.fromTo(
        el,
        { opacity: 0.25, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      )
    );

    ScrollTrigger.refresh();

    return () => {
      triggers.forEach((t) => t.scrollTrigger?.kill());
    };
  }, []);

  return (
    <ScreenShell onContinue={onContinue} continueLabel="Continue →">
      <h2 className="text-glow mb-6 text-2xl font-bold text-white sm:text-4xl">
        Our Friendship Timeline
      </h2>

      <div
        ref={scrollerRef}
        className="relative max-h-[55vh] w-full max-w-md overflow-y-auto overscroll-contain px-4 py-6"
        style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-y" }}
      >
        <div className="absolute bottom-6 left-9 top-6 w-px bg-gradient-to-b from-[#FFC6D9] via-[#FF69B4] to-[#F3E8FF] shadow-[0_0_12px_2px_rgba(255,105,180,0.6)] sm:left-11" />

        <div className="flex flex-col gap-10">
          {TIMELINE.map((item, i) => (
            <div
              key={item.title}
              ref={(el) => {
                if (el) itemRefs.current[i] = el;
              }}
              className="relative flex gap-5 pl-2 text-left sm:gap-6"
            >
              <span className="relative z-10 mt-1 h-4 w-4 shrink-0 rounded-full bg-white shadow-[0_0_10px_3px_rgba(255,255,255,0.6)] sm:h-5 sm:w-5" />
              <div>
                <p className="font-script text-glow text-xl text-white sm:text-2xl">
                  {item.title}
                </p>
                <p className="mt-1 text-sm text-white/85 sm:text-base">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ScreenShell>
  );
}
