import { vibrate } from "./haptics";

let enabled = true;
let ctx: AudioContext | null = null;

export function isSoundEnabled() {
  return enabled;
}

export function setSoundEnabled(value: boolean) {
  enabled = value;
}

function getContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioCtx) return null;
  if (!ctx) ctx = new AudioCtx();
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

function tone(freq: number, duration: number, gainPeak: number, delay = 0) {
  if (!enabled) return;
  const audioCtx = getContext();
  if (!audioCtx) return;

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = "sine";
  osc.frequency.value = freq;

  const start = audioCtx.currentTime + delay;
  gain.gain.setValueAtTime(0, start);
  gain.gain.linearRampToValueAtTime(gainPeak, start + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start(start);
  osc.stop(start + duration + 0.02);
}

export function playClick() {
  tone(720, 0.12, 0.08);
}

export function playChime() {
  tone(660, 0.3, 0.06);
  tone(880, 0.4, 0.05, 0.08);
  tone(1320, 0.5, 0.04, 0.16);
}

export function feedback(ms = 10) {
  playClick();
  vibrate(ms);
}
