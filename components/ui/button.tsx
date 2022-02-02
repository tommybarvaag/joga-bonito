import { css, styled } from "stitches.config";

export const buttonStyles = css({
  // Reset
  all: "unset",
  alignItems: "center",
  boxSizing: "border-box",
  userSelect: "none",
  "&::before": {
    boxSizing: "border-box",
  },
  "&::after": {
    boxSizing: "border-box",
  },

  // Custom reset?
  display: "inline-flex",
  flexShrink: 0,
  justifyContent: "center",
  lineHeight: "1",
  letterSpacing: "normal",
  WebkitTapHighlightColor: "rgba(0,0,0,0)",
  fontWeight: 400,
  // Custom
  cursor: "pointer",
  height: "$5",
  px: "$2",
  fontSize: "$3",
  transition: "all 0.2s ease-in-out",

  //   fontVariantNumeric: "tabular-nums",

  "&:disabled": {
    opacity: "0.6",
    cursor: "not-allowed",
    pointerEvents: "none",
  },

  variants: {
    size: {
      1: {
        borderRadius: "$2",
        height: "$5",
        px: "$2",
        fontSize: "$1",
        lineHeight: "$sizes$5",
      },
      2: {
        borderRadius: "$2",
        height: "$6",
        px: "$4",
        fontSize: "$3",
        lineHeight: "$sizes$6",
      },
      3: {
        borderRadius: "$2",
        height: "$7",
        px: "$4",
        fontSize: "$4",
        lineHeight: "$sizes$7",
      },
    },
    variant: {
      crimson: {
        backgroundColor: "$crimson11",
        color: "$gray12",
      },
    },
    border: {
      true: {
        fontWeight: "bold",
        padding: "0",
        height: "$5",
        width: "$5",
        border: "2px solid",
        borderRadius: "$round",
      },
    },
  },
  compoundVariants: [
    {
      variant: "crimson",
      border: true,
      css: {
        color: "$crimson11",
        backgroundColor: "$gray12",
        borderColor: "$crimson11",
      },
    },
  ],
  defaultVariants: {
    variant: "crimson",
    size: "2",
  },
});

const Button = styled("button", buttonStyles);

export default Button;