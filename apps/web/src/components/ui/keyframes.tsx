import { keyframes } from "stitches.config";

export const slideUpAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateY(20px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
});

export const slideRightAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateX(-20px)" },
  "100%": { opacity: 1, transform: "translateX(0)" },
});

export const slideDownAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateY(-20px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
});

export const slideLeftAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateX(20px)" },
  "100%": { opacity: 1, transform: "translateX(0)" },
});

export const fadeIn = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

export const fadeOut = keyframes({
  "0%": { opacity: 1 },
  "100%": { opacity: 0 },
});

export const pulse = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

export const spin = keyframes({
  from: { transform: "rotate(0deg)" },
  to: { transform: "rotate(360deg)" },
});

export const modalShow = keyframes({
  "0%": { opacity: 0, transform: "translate3d(0, 100%, 0)" },
  "100%": { opacity: 1, transform: "translate3d(0, 0, 0)" },
});

export const modalHide = keyframes({
  "0%": { opacity: 1, transform: "translate3d(0, 0, 0)" },
  "100%": { opacity: 0, transform: "translate3d(0, 100%, 0)" },
});
