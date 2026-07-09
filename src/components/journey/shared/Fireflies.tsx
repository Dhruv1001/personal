const FIREFLIES = [
  { top: "70%", left: "12%", size: 5, delay: "0s", duration: "7s" },
  { top: "80%", left: "26%", size: 3, delay: "1.4s", duration: "8.5s" },
  { top: "62%", left: "38%", size: 4, delay: "2.8s", duration: "6.5s" },
  { top: "88%", left: "52%", size: 3, delay: "0.6s", duration: "9s" },
  { top: "74%", left: "64%", size: 5, delay: "3.6s", duration: "7.5s" },
  { top: "84%", left: "76%", size: 3, delay: "1.9s", duration: "8s" },
  { top: "66%", left: "88%", size: 4, delay: "4.4s", duration: "6.8s" },
  { top: "92%", left: "18%", size: 3, delay: "2.2s", duration: "7.8s" },
];

type FirefliesProps = {
  opacity?: number;
};

export default function Fireflies({ opacity = 1 }: FirefliesProps) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden transition-opacity duration-[1500ms]"
      style={{ opacity }}
    >
      {FIREFLIES.map((f, i) => (
        <span
          key={i}
          className="firefly"
          style={{
            top: f.top,
            left: f.left,
            width: f.size,
            height: f.size,
            animationDelay: f.delay,
            animationDuration: f.duration,
          }}
        />
      ))}
    </div>
  );
}
