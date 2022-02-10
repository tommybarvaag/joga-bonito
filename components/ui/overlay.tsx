import { css, styled } from "stitches.config";

export const overlayStyles = css({
  backgroundColor: "$overlay",
});

const Overlay = styled("div", overlayStyles);

export default Overlay;
