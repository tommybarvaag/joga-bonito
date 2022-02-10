import { styled } from "stitches.config";

const Nav = styled("nav", {
  padding: "$2 $4",
  width: "100%",
  minHeight: "75px",

  variants: {
    variant: {
      header: {
        boxShadow: "inset 0 -1px $colors$gray",
      },
    },
  },
});

export default Nav;
