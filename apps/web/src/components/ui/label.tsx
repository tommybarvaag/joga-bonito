import { CSS, Label as LabelRoot } from "@joga-bonito/ui";
import * as LabelPrimitive from "@radix-ui/react-label";
import * as React from "react";

type LabelPrimitiveProps = React.ComponentProps<typeof LabelPrimitive.Root>;
type LabelProps = LabelPrimitiveProps & { css?: CSS };

const Label = React.forwardRef<React.ElementRef<typeof LabelRoot>, LabelProps>(({ children, ...props }, forwardedRef) => (
  <LabelRoot as={LabelPrimitive.Root} {...props} ref={forwardedRef}>
    {children}
  </LabelRoot>
));

Label.displayName = "Label";

export default Label;
