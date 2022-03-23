import { styled } from "./stitches.config";

export const Card = styled("div", {
  appearance: "none",
  boxShadow: "$card",
  boxSizing: "border-box",
  font: "inherit",
  lineHeight: "1",
  userSelect: "none",
  outline: "none",
  padding: 0,
  WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
  backgroundColor: "$gray3",
  display: "block",
  textDecoration: "none",
  color: "inherit",
  flexShrink: 0,
  position: "relative",

  variants: {
    padding: {
      small: {
        padding: "$3",
      },
      medium: {
        padding: "$4",
      },
      large: {
        padding: "$6",
      },
      xl: {
        padding: "$8",
      },
    },
  },
  defaultVariants: {
    padding: "small",
  },
});
