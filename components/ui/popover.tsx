import * as PopoverPrimitive from "@radix-ui/react-popover";
import { styled } from "stitches.config";
import { slideDownAndFade, slideLeftAndFade, slideRightAndFade, slideUpAndFade } from "./keyframes";

const StyledArrow = styled(PopoverPrimitive.Arrow, {
  fill: "$gray11",
});

const StyledContent = styled(PopoverPrimitive.Content, {
  borderRadius: "$2",
  padding: "$4",
  maxWidth: 300,
  backgroundColor: "$gray11",
  boxShadow: "0 0 0 1px $colors$gray",
  "@media (prefers-reduced-motion: no-preference)": {
    animationDuration: "400ms",
    animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
    willChange: "transform, opacity",
    '&[data-state="open"]': {
      '&[data-side="top"]': { animationName: slideDownAndFade },
      '&[data-side="right"]': { animationName: slideLeftAndFade },
      '&[data-side="bottom"]': { animationName: slideUpAndFade },
      '&[data-side="left"]': { animationName: slideRightAndFade },
    },
  },
  variants: {
    size: {
      1: {
        maxWidth: "200px",
      },
      2: {
        maxWidth: "280px",
      },
      3: {
        maxWidth: "360px",
      },
    },
  },
});

const StyledClose = styled(PopoverPrimitive.Close, {
  all: "unset",
  position: "absolute",
  top: 5,
  right: 5,
});

// Exports
const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;
export const PopoverContent = StyledContent;
export const PopoverArrow = StyledArrow;
export const PopoverClose = StyledClose;

export default Popover;
