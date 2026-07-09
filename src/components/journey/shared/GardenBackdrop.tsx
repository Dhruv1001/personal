import Starfield from "./Starfield";
import Fireflies from "./Fireflies";
import Butterflies from "./Butterflies";
import SunRays from "./SunRays";
import PollenDust from "./PollenDust";

const DAY_STOPS = ["#4a2f22", "#7a4a35", "#b5744a", "#c98a72", "#a3906b"];
const NIGHT_STOPS = ["#1b1035", "#2d1b4e", "#4a2c6d", "#7c3f8f", "#c17bb8"];
const STOP_POSITIONS = [0, 30, 55, 75, 100];

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function lerpColor(a: string, b: string, t: number) {
  const [ar, ag, ab] = hexToRgb(a);
  const [br, bg, bb] = hexToRgb(b);
  const r = Math.round(ar + (br - ar) * t);
  const g = Math.round(ag + (bg - ag) * t);
  const bl = Math.round(ab + (bb - ab) * t);
  return `rgb(${r}, ${g}, ${bl})`;
}

function fadeIn(progress: number, start: number, end: number) {
  return clamp01((progress - start) / (end - start));
}

function fadeOut(progress: number, start: number, end: number) {
  return 1 - fadeIn(progress, start, end);
}

type GardenBackdropProps = {
  progress: number;
};

export default function GardenBackdrop({ progress }: GardenBackdropProps) {
  const t = clamp01(progress);
  const gradient = `linear-gradient(160deg, ${DAY_STOPS.map(
    (day, i) => `${lerpColor(day, NIGHT_STOPS[i], t)} ${STOP_POSITIONS[i]}%`
  ).join(", ")})`;

  const starOpacity = fadeIn(t, 0.5, 0.75);
  const fireflyOpacity = fadeIn(t, 0.3, 0.6);
  const sunRayOpacity = fadeOut(t, 0.25, 0.55) * 0.7;
  const butterflyOpacity = fadeOut(t, 0.35, 0.65);

  return (
    <div aria-hidden className="fixed inset-0 z-0 overflow-hidden" style={{ background: gradient }}>
      <div
        className="moon-glow absolute right-[8%] top-[6%] h-16 w-16 sm:h-24 sm:w-24"
        style={{ animationDelay: "0s" }}
      />

      <SunRays opacity={sunRayOpacity} />

      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-1/3 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 70% 100% at 20% 100%, #A8C686 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-1/4 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 60% 100% at 80% 100%, #D8F3DC 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-1/5 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse 90% 100% at 50% 100%, #6b7a4a 0%, transparent 75%)",
        }}
      />

      <Butterflies opacity={butterflyOpacity} />
      <Fireflies opacity={fireflyOpacity} />
      <PollenDust />
      <div className="absolute inset-0" style={{ opacity: starOpacity, transition: "opacity 1.5s" }}>
        <Starfield />
      </div>
    </div>
  );
}
