import { styled } from "stitches.config";

const Nav = styled("nav", {
  padding: "$4",
  width: "100%",
  minHeight: "100px",

  variants: {
    variant: {
      header: {
        boxShadow: "inset 0 -1px $colors$gray"
      }
    }
  }
});

export default Nav;
