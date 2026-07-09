export function vibrate(ms = 10) {
  if (typeof navigator === "undefined" || !navigator.vibrate) return;
  navigator.vibrate(ms);
}
