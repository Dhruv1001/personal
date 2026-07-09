const POLLEN = [
  { top: "18%", left: "8%", size: 3, delay: "0s", duration: "10s" },
  { top: "34%", left: "22%", size: 2, delay: "1.6s", duration: "12s" },
  { top: "12%", left: "40%", size: 3, delay: "3.2s", duration: "9s" },
  { top: "46%", left: "58%", size: 2, delay: "0.8s", duration: "11s" },
  { top: "26%", left: "72%", size: 3, delay: "2.4s", duration: "10.5s" },
  { top: "54%", left: "86%", size: 2, delay: "4s", duration: "9.5s" },
  { top: "40%", left: "94%", size: 3, delay: "1.2s", duration: "11.5s" },
  { top: "60%", left: "10%", size: 2, delay: "3.6s", duration: "10s" },
  { top: "8%", left: "62%", size: 2, delay: "2s", duration: "9.8s" },
];

export default function PollenDust() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {POLLEN.map((p, i) => (
        <span
          key={i}
          className="pollen"
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
    </div>
  );
}
