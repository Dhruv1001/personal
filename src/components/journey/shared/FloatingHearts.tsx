const HEARTS = [
  { left: "10%", size: 16, delay: "0s", duration: "5s" },
  { left: "24%", size: 12, delay: "1.2s", duration: "6s" },
  { left: "38%", size: 18, delay: "0.4s", duration: "5.5s" },
  { left: "52%", size: 14, delay: "2s", duration: "6.5s" },
  { left: "66%", size: 16, delay: "0.8s", duration: "5.2s" },
  { left: "80%", size: 12, delay: "1.6s", duration: "6.2s" },
];

export default function FloatingHearts() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      {HEARTS.map((h, i) => (
        <span
          key={i}
          className="floating-heart"
          style={{
            left: h.left,
            fontSize: h.size,
            animationDelay: h.delay,
            animationDuration: h.duration,
          }}
        >
          💖
        </span>
      ))}
    </div>
  );
}
