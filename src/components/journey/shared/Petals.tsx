const PETALS = [
  { left: "6%", size: 14, color: "#F8D7E6", delay: "0s", duration: "9s" },
  { left: "18%", size: 10, color: "#CDB4DB", delay: "2s", duration: "11s" },
  { left: "30%", size: 16, color: "#FFF8F0", delay: "4s", duration: "10s" },
  { left: "44%", size: 11, color: "#F8D7E6", delay: "1s", duration: "12s" },
  { left: "58%", size: 13, color: "#D8F3DC", delay: "5.5s", duration: "9.5s" },
  { left: "70%", size: 10, color: "#CDB4DB", delay: "3s", duration: "11.5s" },
  { left: "82%", size: 15, color: "#F8D7E6", delay: "6s", duration: "10.5s" },
  { left: "92%", size: 12, color: "#D8F3DC", delay: "2.6s", duration: "9.8s" },
];

export default function Petals() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {PETALS.map((p, i) => (
        <div
          key={i}
          className="petal"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            background: p.color,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
    </div>
  );
}
