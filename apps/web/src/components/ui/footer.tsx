import { styled } from "stitches.config";

const Footer = styled("footer", {
  // Reset
  boxSizing: "border-box",
  flexShrink: 0,
  backgroundColor: "$main",
  padding: "0 0 $12",

  variants: {
    variant: {
      main: {
        borderTop: "1px solid $colors$gray",
      },
    },
  },
});

export default Footer;
