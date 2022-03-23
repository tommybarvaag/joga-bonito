import { css, styled } from "./stitches.config";

export const panelStyles = css({
  backgroundColor: "$panel",
  borderRadius: "$3",
  borderTop: "1px solid $colors$panelBorder",
});

export const Panel = styled("div", panelStyles);
