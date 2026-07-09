const RAYS = [
  { rotate: -18, delay: "0s" },
  { rotate: 0, delay: "1.5s" },
  { rotate: 18, delay: "3s" },
];

type SunRaysProps = {
  opacity?: number;
};

export default function SunRays({ opacity = 1 }: SunRaysProps) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute right-[6%] top-[4%] z-0 h-64 w-64 overflow-hidden transition-opacity duration-[1500ms] sm:h-80 sm:w-80"
      style={{ opacity }}
    >
      {RAYS.map((r, i) => (
        <div
          key={i}
          className="sun-ray absolute left-1/2 top-1/2 h-[140%] w-10 -translate-x-1/2"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,243,208,0.35), transparent 70%)",
            transform: `rotate(${r.rotate}deg)`,
            animationDelay: r.delay,
          }}
        />
      ))}
    </div>
  );
}
