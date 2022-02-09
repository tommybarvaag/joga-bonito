import { styled } from "stitches.config";

const Svg = styled("svg", {
  variants: {
    size: {
      1: {
        height: "$2",
        width: "$2",
      },
      2: {
        height: "$3",
        width: "$3",
      },
      3: {
        height: "$4",
        width: "$4",
      },
      4: {
        height: "$5",
        width: "$5",
      },
      5: {
        height: "$6",
        width: "$6",
      },
      6: {
        height: "$7",
        width: "$7",
      },
      7: {
        height: "$8",
        width: "$8",
      },
      8: {
        height: "$9",
        width: "$9",
      },
      9: {
        height: "$10",
        width: "$10",
      },
      10: {
        height: "$12",
        width: "$12",
      },
    },
    variant: {
      gray: {
        color: "$gray1",
      },
      text: {
        color: "$gray12",
      },
    },
  },
  defaultVariants: {
    size: 2,
    variant: "gray",
  },
});

export default Svg;
