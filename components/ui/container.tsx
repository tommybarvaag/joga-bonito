import { styled } from "stitches.config";

const Container = styled("div", {
  // Reset
  boxSizing: "border-box",
  flexShrink: 0,
  width: "100%",

  variants: {
    size: {
      1: {
        maxWidth: "$smContainer",
      },
      2: {
        maxWidth: "$mdContainer",
      },
      3: {
        maxWidth: "$lgContainer",
      },
      4: {
        maxWidth: "$xlContainer",
      },
      full: {
        maxWidth: "none",
      },
    },
    backgroundColor: {
      main: {
        backgroundColor: "$main",
      },
      secondary: {
        backgroundColor: "$secondary",
      },
      grayDark: {
        backgroundColor: "$grayDark",
      },
      gray: {
        backgroundColor: "$gray",
      },
      grayLight: {
        backgroundColor: "$grayLight",
      },
      grayLighter: {
        backgroundColor: "$grayLighter",
      },
      grayLightest: {
        backgroundColor: "$grayLightest",
      },
    },
    center: {
      true: {
        margin: "0 auto",
      },
    },
  },
  defaultVariants: {
    size: "full",
  },
});

export default Container;
