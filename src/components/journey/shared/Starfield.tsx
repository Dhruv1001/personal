const STARS = [
  { top: "6%", left: "12%", size: 3, delay: "0s", duration: "2.4s" },
  { top: "10%", left: "78%", size: 2, delay: "0.5s", duration: "2.9s" },
  { top: "18%", left: "40%", size: 4, delay: "1.1s", duration: "3.2s" },
  { top: "24%", left: "62%", size: 2, delay: "0.2s", duration: "2.1s" },
  { top: "30%", left: "88%", size: 3, delay: "1.6s", duration: "3.4s" },
  { top: "34%", left: "18%", size: 2, delay: "0.8s", duration: "2.6s" },
  { top: "42%", left: "50%", size: 3, delay: "2s", duration: "2.8s" },
  { top: "48%", left: "8%", size: 2, delay: "0.3s", duration: "2.3s" },
  { top: "54%", left: "72%", size: 4, delay: "1.4s", duration: "3.1s" },
  { top: "60%", left: "30%", size: 2, delay: "1.9s", duration: "2.5s" },
  { top: "66%", left: "92%", size: 3, delay: "0.6s", duration: "3s" },
  { top: "72%", left: "45%", size: 2, delay: "1.2s", duration: "2.7s" },
  { top: "78%", left: "15%", size: 3, delay: "2.2s", duration: "3.3s" },
  { top: "84%", left: "66%", size: 2, delay: "0.4s", duration: "2.4s" },
  { top: "90%", left: "35%", size: 3, delay: "1.7s", duration: "2.9s" },
  { top: "14%", left: "55%", size: 2, delay: "1s", duration: "2.6s" },
];

const SHOOTING_STARS = [
  { top: "12%", left: "70%", delay: "1.5s", duration: "6s" },
  { top: "28%", left: "85%", delay: "5s", duration: "7.5s" },
  { top: "8%", left: "45%", delay: "9s", duration: "6.8s" },
];

export default function Starfield() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div
        className="moon-glow absolute right-[8%] top-[6%] h-16 w-16 sm:h-24 sm:w-24"
        style={{ animationDelay: "0s" }}
      />

      {STARS.map((s, i) => (
        <div
          key={i}
          className="star"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            animationDelay: s.delay,
            animationDuration: s.duration,
          }}
        />
      ))}

      {SHOOTING_STARS.map((s, i) => (
        <div
          key={i}
          className="shooting-star"
          style={{
            top: s.top,
            left: s.left,
            animationDelay: s.delay,
            animationDuration: s.duration,
          }}
        />
      ))}
    </div>
  );
}
