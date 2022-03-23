import { slideDownAndFade, slideLeftAndFade, slideRightAndFade, slideUpAndFade, styled } from "@joga-bonito/ui";
import * as PopoverPrimitive from "@radix-ui/react-popover";

const StyledArrow = styled(PopoverPrimitive.Arrow, {
  fill: "$popover",
  stroke: "$popoverBorder",
  strokeWidth: "2px",
  strokeDasharray: "0 28.5 26",
  length: undefined,
});

const StyledContent = styled(PopoverPrimitive.Content, {
  borderRadius: "$2",
  padding: "$4",
  maxWidth: 300,
  backgroundColor: "$popover",
  boxShadow: "$popover",
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
  length: undefined,
});

const StyledClose = styled(PopoverPrimitive.Close, {
  all: "unset",
  position: "absolute",
  top: 5,
  right: 5,
  length: undefined,
});

// Exports
const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;
export const PopoverContent = StyledContent;
export const PopoverArrow = StyledArrow;
export const PopoverClose = StyledClose;

export default Popover;
