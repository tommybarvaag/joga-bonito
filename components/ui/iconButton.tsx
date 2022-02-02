import { styled } from "stitches.config";
import Svg from "./svg";
import Text from "./text";

const IconButton = styled("button", {
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

  "@hover": {
    "&:hover": {
      borderColor: "$grayLight",
    },
  },
  "&:active": {
    backgroundColor: "$grayLight",
  },
  "&:focus": {
    borderColor: "$grayLight",
    boxShadow: "0 0 0 1px $colors$grayLight",
  },
  "&:disabled": {
    pointerEvents: "none",
    backgroundColor: "transparent",
    color: "$grayLight",
  },

  variants: {
    variant: {
      green: {
        backgroundColor: "$green",
        border: "2px solid $colors$green",
        color: "$black",
        [`${Text}`]: {
          color: "$black",
        },
        [`${Svg}`]: {
          color: "$black",
        },
        "@hover": {
          "&:hover": {
            backgroundColor: "$greenDark",
            border: "2px solid $colors$greenDark",
          },
        },
        "&:active": {
          backgroundColor: "$green",
          border: "2px solid $colors$greenDark",
        },
        "&:focus": {
          backgroundColor: "$green",
          border: "2px solid $colors$greenDark",
        },
        '&[data-radix-popover-trigger][data-state="open"], &[data-radix-dropdown-menu-trigger][data-state="open"]': {
          backgroundColor: "$grayLight",
          boxShadow: "inset 0 0 0 1px $grayLight",
        },
      },
      red: {
        backgroundColor: "$red",
        border: "2px solid $colors$red",
        color: "$black",
        [`${Text}`]: {
          color: "$black",
        },
        [`${Svg}`]: {
          color: "$black",
        },
        "@hover": {
          "&:hover": {
            backgroundColor: "$redDark",
            border: "2px solid $colors$redDark",
          },
        },
        "&:active": {
          backgroundColor: "$red",
          border: "2px solid $colors$redDark",
        },
        "&:focus": {
          backgroundColor: "$red",
          border: "2px solid $colors$redDark",
        },
        '&[data-radix-popover-trigger][data-state="open"], &[data-radix-dropdown-menu-trigger][data-state="open"]': {
          backgroundColor: "$grayLight",
          boxShadow: "inset 0 0 0 1px $grayLight",
        },
      },
      white: {
        backgroundColor: "$white",
        border: "2px solid $colors$white",
        color: "$black",
        [`${Text}`]: {
          color: "$black",
        },
        [`${Svg}`]: {
          color: "$black",
        },
        "@hover": {
          "&:hover": {
            backgroundColor: "$white",
            border: "2px solid $colors$gray",
          },
        },
        "&:active": {
          backgroundColor: "$white",
          border: "2px solid $colors$grayDark",
        },
        "&:focus": {
          backgroundColor: "$white",
          border: "2px solid $colors$grayDark",
        },
        '&[data-radix-popover-trigger][data-state="open"], &[data-radix-dropdown-menu-trigger][data-state="open"]': {
          backgroundColor: "$grayLight",
          boxShadow: "inset 0 0 0 1px $grayLight",
        },
      },
      black: {
        backgroundColor: "$black",
        border: "2px solid $colors$black",
        color: "$white",
        [`${Text}`]: {
          color: "$white",
        },
        [`${Svg}`]: {
          color: "$white",
        },
        "@hover": {
          "&:hover": {
            backgroundColor: "$black",
            border: "2px solid $colors$grayDark",
          },
        },
        "&:active": {
          backgroundColor: "$black",
          border: "2px solid $colors$white",
        },
        "&:focus": {
          backgroundColor: "$black",
          border: "2px solid $colors$white",
        },
        '&[data-radix-popover-trigger][data-state="open"], &[data-radix-dropdown-menu-trigger][data-state="open"]': {
          backgroundColor: "$grayLight",
          boxShadow: "inset 0 0 0 1px $grayLight",
        },
      },
      text: {
        backgroundColor: "transparent",
        border: "2px solid transparent",
        color: "$text",
        [`${Text}`]: {
          color: "$text",
        },
        [`${Svg}`]: {
          color: "$text",
        },
        "@hover": {
          "&:hover": {
            backgroundColor: "transparent",
            border: "2px solid $colors$textDark",
          },
        },
        "&:active": {
          backgroundColor: "transparent",
          border: "2px solid $colors$text",
        },
        "&:focus": {
          backgroundColor: "transparent",
          border: "2px solid $colors$text",
        },
        '&[data-radix-popover-trigger][data-state="open"], &[data-radix-dropdown-menu-trigger][data-state="open"]': {
          backgroundColor: "$grayLight",
          boxShadow: "inset 0 0 0 1px $grayLight",
        },
      },
      textDark: {
        backgroundColor: "transparent",
        border: "2px solid transparent",
        color: "$textDark",
        [`${Text}`]: {
          color: "$textDark",
        },
        [`${Svg}`]: {
          color: "$textDark",
        },
        "@hover": {
          "&:hover": {
            backgroundColor: "transparent",
            border: "2px solid $colors$textDark",
          },
        },
        "&:active": {
          backgroundColor: "transparent",
          border: "2px solid $colors$textDark",
        },
        "&:focus": {
          backgroundColor: "transparent",
          border: "2px solid $colors$textDark",
        },
        '&[data-radix-popover-trigger][data-state="open"], &[data-radix-dropdown-menu-trigger][data-state="open"]': {
          backgroundColor: "$grayLight",
          boxShadow: "inset 0 0 0 1px $grayLight",
        },
      },
      ghost: {
        backgroundColor: "transparent",
        border: "none",
        "@hover": {
          "&:hover": {
            backgroundColor: "transparent",
            border: "none",
          },
        },
        "&:active": {
          backgroundColor: "transparent",
          border: "none",
        },
        "&:focus": {
          backgroundColor: "transparent",
          border: "none",
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
      4: {
        borderRadius: "$3",
        height: "$8",
        width: "$8",
      },
    },
    round: {
      true: {
        borderRadius: "$pill",
      },
    },
  },
  defaultVariants: {
    size: "1",
  },
});

export default IconButton;
