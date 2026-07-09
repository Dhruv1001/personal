import confetti from "canvas-confetti";

const PALETTE = ["#F8D7E6", "#CDB4DB", "#A8C686", "#D8F3DC", "#E9C46A"];
const GOLD_PALETTE = ["#E9C46A", "#FFF8F0", "#F8D7E6", "#D8F3DC"];

export function burstGold() {
  confetti({
    particleCount: 60,
    spread: 80,
    startVelocity: 28,
    origin: { y: 0.55 },
    colors: GOLD_PALETTE,
    scalar: 0.7,
    gravity: 0.6,
  });
}

export function burstCenter() {
  confetti({
    particleCount: 80,
    spread: 90,
    startVelocity: 30,
    origin: { y: 0.6 },
    colors: PALETTE,
    scalar: 0.75,
    gravity: 0.6,
  });
}

export function burstUp(originY = 0.85) {
  confetti({
    particleCount: 55,
    spread: 65,
    startVelocity: 32,
    origin: { y: originY },
    colors: PALETTE,
    scalar: 0.7,
    gravity: 0.6,
  });
}

export function burstCannons() {
  const end = Date.now() + 900;

  (function frame() {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 55,
      startVelocity: 32,
      origin: { x: 0, y: 0.7 },
      colors: PALETTE,
      scalar: 0.7,
      gravity: 0.6,
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 55,
      startVelocity: 32,
      origin: { x: 1, y: 0.7 },
      colors: PALETTE,
      scalar: 0.7,
      gravity: 0.6,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}
