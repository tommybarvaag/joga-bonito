import { keyframes } from "stitches.config";

export const slideUpAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateY(20px)" },
  "100%": { opacity: 1, transform: "translateY(0)" }
});

export const slideRightAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateX(-20px)" },
  "100%": { opacity: 1, transform: "translateX(0)" }
});

export const slideDownAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateY(-20px)" },
  "100%": { opacity: 1, transform: "translateY(0)" }
});

export const slideLeftAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateX(20px)" },
  "100%": { opacity: 1, transform: "translateX(0)" }
});

export const fadeIn = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 }
});

export const fadeOut = keyframes({
  "100%": { opacity: 0 }
});

export const pulse = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 }
});

export const spin = keyframes({
  from: { transform: "rotate(0deg)" },
  to: { transform: "rotate(360deg)" }
});
