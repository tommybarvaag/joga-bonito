import merge from "lodash.merge";
import * as React from "react";
import { CSS, VariantProps } from "./stitches.config";
import { Text } from "./text";

const DEFAULT_TAG = "p";

type TextSizeVariants = Pick<VariantProps<typeof Text>, "size">;
type ParagraphSizeVariants = "1" | "2";
type ParagraphVariants = { size?: ParagraphSizeVariants } & Omit<VariantProps<typeof Text>, "size">;
type ParagraphProps = React.ComponentProps<typeof DEFAULT_TAG> & ParagraphVariants & { css?: CSS; as?: any; noMargin?: boolean };

export const Paragraph = React.forwardRef<React.ElementRef<typeof DEFAULT_TAG>, ParagraphProps>((props, forwardedRef) => {
  // '2' here is the default Paragraph size variant
  const { size = "1", mb = "3", noMargin = false, ...textProps } = props;

  // This is the mapping of Paragraph Variants to Text variants
  const textSize: Record<ParagraphSizeVariants, TextSizeVariants["size"]> = {
    1: { "@initial": "2", "@bp2": "3" },
    2: { "@initial": "3", "@bp2": "4" },
  };

  // This is the mapping of Paragraph Variants to Text css
  const textCss: Record<ParagraphSizeVariants, CSS> = {
    1: { lineHeight: "125%", "@bp2": { lineHeight: "135%" } },
    2: { lineHeight: "135%", "@bp2": { lineHeight: "145%" } },
  };
  return (
    <Text
      as={DEFAULT_TAG}
      {...textProps}
      ref={forwardedRef}
      size={textSize[size]}
      mb={mb}
      css={{
        ...merge(
          textCss[size],
          noMargin
            ? {
                marginBottom: "0",
              }
            : {},
          props.css
        ),
      }}
    />
  );
});

Paragraph.displayName = "Paragraph";
