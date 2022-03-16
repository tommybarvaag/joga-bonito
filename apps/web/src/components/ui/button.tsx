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
      primary: {
        backgroundColor: "$gray1",
        color: "$gray12",
        border: "1px solid",
        borderColor: "$gray9",
        "&:hover": {
          borderColor: "$gray8",
        },
      },
      grass: {
        backgroundColor: "$gray1",
        color: "$grass11",
        border: "1px solid",
        borderColor: "$grass9",
        "&:hover": {
          borderColor: "$grass8",
        },
      },
      tomato: {
        backgroundColor: "$gray1",
        color: "$tomato11",
        border: "1px solid",
        borderColor: "$tomato9",
        "&:hover": {
          borderColor: "$tomato8",
        },
      },
    },
    borderRound: {
      true: {
        padding: "0",
        height: "$5",
        width: "$5",
        borderRadius: "$round",
      },
    },
    fullWidth: {
      true: {
        width: "100%",
      },
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "2",
  },
});

const Button = styled("button", buttonStyles);

export default Button;
