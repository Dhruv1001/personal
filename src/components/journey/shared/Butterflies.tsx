const BUTTERFLIES = [
  { top: "20%", left: "14%", size: 20, delay: "0s", duration: "9s", flutter: "0.3s" },
  { top: "34%", left: "70%", size: 16, delay: "1.5s", duration: "11s", flutter: "0.4s" },
  { top: "58%", left: "30%", size: 18, delay: "3s", duration: "10s", flutter: "0.35s" },
  { top: "44%", left: "85%", size: 15, delay: "2s", duration: "12s", flutter: "0.45s" },
];

type ButterfliesProps = {
  opacity?: number;
};

export default function Butterflies({ opacity = 1 }: ButterfliesProps) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden transition-opacity duration-[1500ms]"
      style={{ opacity }}
    >
      {BUTTERFLIES.map((b, i) => (
        <span
          key={i}
          className="butterfly-flight absolute"
          style={{
            top: b.top,
            left: b.left,
            fontSize: b.size,
            animationDelay: b.delay,
            animationDuration: b.duration,
          }}
        >
          <span className="wing-flutter" style={{ animationDuration: b.flutter }}>
            🦋
          </span>
        </span>
      ))}
    </div>
  );
}
