import { styled } from "./stitches.config";

export const Label = styled("label", {
  fontWeight: 400,
  color: "$textDark",
  userSelect: "none",
  variants: {
    size: {
      tiny: {
        fontSize: "$tiny",
      },
      1: {
        fontSize: "$1",
      },
      2: {
        fontSize: "$2",
      },
      3: {
        fontSize: "$3",
      },
      4: {
        fontSize: "$4",
      },
    },
    textTransform: {
      uppercase: {
        textTransform: "uppercase",
      },
      lowercase: {
        textTransform: "lowercase",
      },
      capitalize: {
        textTransform: "capitalize",
      },
      none: {
        textTransform: "none",
      },
    },
  },
  defaultVariants: {
    size: "1",
  },
});
