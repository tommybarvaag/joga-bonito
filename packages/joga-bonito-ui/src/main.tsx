import { styled } from "./stitches.config";

export const Main = styled("main", {
  // Reset
  boxSizing: "border-box",
  flexShrink: 0,
  backgroundColor: "$background",
  px: "$3",
  width: "100%",
  maxWidth: "$lgContainer",
  margin: "0 auto",
});
