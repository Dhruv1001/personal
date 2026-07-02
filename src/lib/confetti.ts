import confetti from "canvas-confetti";

const PALETTE = ["#ff6b6b", "#feca57", "#48dbfb", "#1dd1a1", "#a66bff", "#ff6bcb"];

export function burstCenter() {
  confetti({
    particleCount: 130,
    spread: 100,
    startVelocity: 45,
    origin: { y: 0.6 },
    colors: PALETTE,
  });
}

export function burstUp(originY = 0.85) {
  confetti({
    particleCount: 90,
    spread: 70,
    startVelocity: 50,
    origin: { y: originY },
    colors: PALETTE,
  });
}

export function burstCannons() {
  const end = Date.now() + 900;

  (function frame() {
    confetti({
      particleCount: 6,
      angle: 60,
      spread: 55,
      startVelocity: 55,
      origin: { x: 0, y: 0.7 },
      colors: PALETTE,
    });
    confetti({
      particleCount: 6,
      angle: 120,
      spread: 55,
      startVelocity: 55,
      origin: { x: 1, y: 0.7 },
      colors: PALETTE,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}
