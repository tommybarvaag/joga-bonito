import * as DialogPrimitive from "@radix-ui/react-dialog";
import React from "react";
import { modalHide, modalShow } from "./keyframes";
import { overlayStyles } from "./overlay";
import { panelStyles } from "./panel";
import { CSS, styled } from "./stitches.config";

type DialogProps = React.ComponentProps<typeof DialogPrimitive.Root> & {
  children: React.ReactNode;
};

const StyledOverlay = styled(DialogPrimitive.Overlay, overlayStyles, {
  position: "fixed",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: "$modalOverlay",
  opacity: 0,
  transition: "opacity .2s cubic-bezier(.05,.86,.47,1.02)",
  '&[data-state="open"]': {
    opacity: 1,
  },
  '&[data-state="closed"]': {
    opacity: 0,
  },
  length: undefined,
});

export const Dialog = ({ children, ...props }: DialogProps) => {
  return (
    <DialogPrimitive.Root {...props}>
      <StyledOverlay />
      {children}
    </DialogPrimitive.Root>
  );
};

const StyledContent = styled(DialogPrimitive.Content, panelStyles, {
  position: "fixed",
  bottom: 0,
  right: 0,
  left: 0,
  maxHeight: "85vh",
  padding: "$5",
  marginTop: "-5vh",
  transform: "translate3d(0,100%,0)",
  willChange: "transform,opacity",
  border: "1px sold white",
  zIndex: "$modal",
  transition: "transform .2s cubic-bezier(.05,.86,.47,1.02),opacity .2s ease,height .2s ease",
  "&:focus": {
    outline: "none",
  },
  '&[data-state="open"]': {
    transform: "translate3d(0px, 0px, 0)",
    animation: `${modalShow} .2s cubic-bezier(.05,.86,.47,1.02)`,
  },
  '&[data-state="closed"]': {
    transform: "translate3d(0,100%,0)",
    animation: `${modalHide} .2s cubic-bezier(.05,.86,.47,1.02)`,
  },
  length: undefined,
});

const StyledCloseButton = styled(DialogPrimitive.Close, {
  position: "absolute",
  top: "$5",
  right: "$5",
  length: undefined,
});

const StyledDialogTitle = styled(DialogPrimitive.Title, {
  fontSize: "$5",
  marginBottom: "$3",
  "@bp1": {
    fontSize: "$6",
  },
  length: undefined,
});

const StyledDialogDescription = styled(DialogPrimitive.Description, {
  fontSize: "$3",
  marginBottom: "$3",
  length: undefined,
});

type DialogContentPrimitiveProps = React.ComponentProps<typeof DialogPrimitive.Content>;
type DialogContentProps = DialogContentPrimitiveProps & { css?: CSS };

export const DialogContent = React.forwardRef<React.ElementRef<typeof StyledContent>, DialogContentProps>(({ children, ...props }, forwardedRef) => (
  <StyledContent {...props} ref={forwardedRef}>
    {children}
    {/* <StyledCloseButton asChild>
      <IconButton>
        <Svg color="white" as={Cross2Icon} />
      </IconButton>
    </StyledCloseButton> */}
  </StyledContent>
));

DialogContent.displayName = "DialogContent";

export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;
export const DialogTitle = StyledDialogTitle;
export const DialogDescription = StyledDialogDescription;
