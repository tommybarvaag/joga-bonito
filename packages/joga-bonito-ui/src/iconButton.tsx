import { styled } from "./stitches.config";
import { Svg } from "./svg";
import { Text } from "./text";

export const IconButton = styled("button", {
  // Reset
  alignItems: "center",
  appearance: "none",
  borderWidth: "0",
  boxSizing: "border-box",
  display: "inline-flex",
  flexShrink: 0,
  fontFamily: "inherit",
  fontSize: "14px",
  justifyContent: "center",
  lineHeight: "1",
  outline: "none",
  padding: "0",
  textDecoration: "none",
  userSelect: "none",
  WebkitTapHighlightColor: "transparent",
  cursor: "pointer",
  color: "$black",
  "&::before": {
    boxSizing: "border-box",
  },
  "&::after": {
    boxSizing: "border-box",
  },
  backgroundColor: "$transparent",
  border: "1px solid $transparent",

  variants: {
    variant: {
      primary: {
        backgroundColor: "$gray1",
        border: "1px solid transparent",
        color: "$gray12",
        [`${Text}`]: {
          color: "$gray12",
        },
        [`${Svg}`]: {
          color: "$gray12",
        },
        "&:hover": {
          border: "1px solid $colors$gray8",
        },
        "&:active": {
          border: "1px solid $colors$gray8",
        },
        "&:focus": {
          border: "1px solid $colors$gray8",
        },
      },
    },
    size: {
      1: {
        borderRadius: "$2",
        height: "$5",
        width: "$5",
      },
      2: {
        borderRadius: "$2",
        height: "$6",
        width: "$6",
      },
      3: {
        borderRadius: "$2",
        height: "$7",
        width: "$7",
      },
    },
    round: {
      true: {
        borderRadius: "$pill",
      },
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "2",
  },
});
