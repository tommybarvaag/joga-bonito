import { ThemeSelect } from "@/components/theme";
import { useUser } from "@/components/user";
import { Button, CSS, Dialog, DialogContent, DialogTitle, DialogTrigger, Flex, IconButton, Nav, Svg } from "@joga-bonito/ui";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useDrag } from "@use-gesture/react";
import { signIn, signOut } from "next-auth/react";
import * as React from "react";

const MobileMenu = ({ ...other }: { css?: CSS }) => {
  const { user } = useUser();

  const [open, setOpen] = React.useState(false);
  const bind = useDrag(({ last, velocity: [, vy], direction: [, dy], movement: [, my], cancel, canceled }) => {
    // if the user drags up passed a threshold, then we cancel
    // the drag so that the sheet resets to its open position
    if (my < -70) {
      cancel();
    }
    if (last && vy > 0.5 && dy > 0) {
      setOpen(false);
    }
  });

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)} {...other}>
      <DialogTrigger asChild>
        <IconButton
          css={{
            position: "absolute",
            right: "$4",
            "@bp1": {
              display: "none",
            },
          }}
        >
          <Svg as={HamburgerMenuIcon} />
        </IconButton>
      </DialogTrigger>
      {/* https://github.com/pmndrs/use-gesture/issues/362#issuecomment-1008204013 */}
      {/* @ts-ignore */}
      <DialogContent {...bind()}>
        <Nav>
          <DialogTitle>Hei {user?.name}</DialogTitle>
          <Flex justifyContent="between">
            <Button onClick={() => (user ? signOut() : () => signIn())}>{user ? "Logg ut" : "Logg inn"}</Button>
            <ThemeSelect />
          </Flex>
        </Nav>
      </DialogContent>
    </Dialog>
  );
};

export default MobileMenu;
