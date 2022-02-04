import { styled } from "stitches.config";

const Text = styled("span", {
  // Reset
  lineHeight: "125%",
  margin: "0",
  fontWeight: 400,
  //   fontVariantNumeric: "tabular-nums",
  display: "block",

  variants: {
    color: {
      text: {
        color: "$text",
      },
      textDark: {
        color: "$textDark",
      },
      black: {
        color: "$black",
      },
      gray: {
        color: "$gray",
      },
      grayLight: {
        color: "$grayLight",
      },
      grayLighter: {
        color: "$grayLighter",
      },
      grayLightest: {
        color: "$grayLightest",
      },
      green: {
        color: "$green",
      },
      red: {
        color: "$red",
      },
      white: {
        color: "$white",
      },
    },
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
      5: {
        fontSize: "$5",
      },
      6: {
        fontSize: "$6",
      },
      7: {
        fontSize: "$7",
      },
      8: {
        fontSize: "$8",
      },
      9: {
        fontSize: "$9",
      },
    },
    fontStyle: {
      italic: {
        fontStyle: "italic",
      },
    },
    textAlign: {
      left: {
        textAlign: "left",
      },
      right: {
        textAlign: "right",
      },
      center: {
        textAlign: "center",
      },
      start: {
        textAlign: "start",
      },
      end: {
        textAlign: "end",
      },
      justify: {
        textAlign: "justify",
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
    textDecoration: {
      underline: {
        textDecoration: "underline",
      },
      lineThrough: {
        textDecoration: "line-through",
      },
      none: {
        textDecoration: "none",
      },
    },
    fontWeight: {
      lighter: {
        fontWeight: "lighter",
      },
      normal: {
        fontWeight: "normal",
      },
      bold: {
        fontWeight: "bold",
      },
      bolder: {
        fontWeight: "bolder",
      },
      100: {
        fontWeight: "100",
      },
      200: {
        fontWeight: "200",
      },
      300: {
        fontWeight: "300",
      },

      400: {
        fontWeight: "400",
      },

      500: {
        fontWeight: "500",
      },

      600: {
        fontWeight: "600",
      },

      700: {
        fontWeight: "700",
      },
      800: {
        fontWeight: "800",
      },
      900: {
        fontWeight: "900",
      },
    },
    mb: {
      1: {
        marginBottom: "$1",
      },
      2: {
        marginBottom: "$2",
      },
      3: {
        marginBottom: "$3",
      },
      4: {
        marginBottom: "$4",
      },
      5: {
        marginBottom: "$5",
      },
      6: {
        marginBottom: "$6",
      },
      7: {
        marginBottom: "$7",
      },
      8: {
        marginBottom: "$8",
      },
    },
    inline: {
      true: {
        display: "inline",
      },
    },
  },
  defaultVariants: {
    size: "3",
    color: "text",
  },
});

export default Text;
