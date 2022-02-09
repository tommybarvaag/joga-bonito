import { Button, Dialog, DialogContent, DialogTitle, DialogTrigger, Flex, Heading, IconButton, Main, Nav, Svg } from "@/components/ui";
import { UserVotes, useUser } from "@/components/user";
import { CageballEventWithVotesAndUser, getCageballEvents } from "@/lib/cageball";
import { getUser } from "@/lib/user";
import { HamburgerMenuIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useDrag } from "@use-gesture/react";
import { getISOWeek } from "date-fns";
import type { GetServerSideProps } from "next";
import { getSession, signIn, signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import * as React from "react";
import { styled } from "stitches.config";

const Path = styled("path", {});

const Logo = ({ ...other }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="474.2pt"
    height="121.4pt"
    viewBox="0 0 474.2 121.4"
    version="1.1"
    {...other}
  >
    <defs>
      <clipPath id="clip1">
        <path d="M 2 0 L 474.199219 0 L 474.199219 117 L 2 117 Z M 2 0 " />
      </clipPath>
    </defs>
    <g id="surface1">
      <g clipPath="url(#clip1)" clipRule="nonzero">
        <Path
          css={{
            stroke: "none",
            fillRule: "evenodd",
            fill: "currentColor",
            fillOpacity: 1,
          }}
          d="M 65.644531 -0.0664063 C 43.703125 23.363281 39.074219 55.601563 55.339844 98.472656 C 17.464844 102.242188 0.0390625 90.257813 3.054688 62.523438 C 11.089844 71.59375 19.636719 78.980469 31.710938 74.589844 C 24.503906 35.460938 37.996094 12.25 65.644531 -0.0664063 Z M 63.132813 15.519531 C 79.050781 33.929688 90 56.707031 87.515625 84.394531 C 86.613281 94.421875 78.800781 98.859375 70.921875 98.972656 C 60.40625 99.125 56.171875 90.382813 55.339844 79.617188 C 53.316406 53.542969 57.496094 32.933594 63.132813 15.519531 Z M 67.90625 48.949219 C 70.253906 57.789063 72.34375 67.789063 70.671875 79.871094 C 69.882813 85.570313 64.921875 85.617188 64.640625 79.871094 C 64.089844 68.625 65.953125 57.671875 67.90625 48.949219 Z M 119.691406 15.265625 C 122.453125 27.667969 124.796875 38.464844 127.5625 50.863281 C 126.808594 51.066406 126.476563 51.632813 125.722656 51.214844 C 121.867188 46.058594 117.882813 45.585938 112.96875 48.375 C 106.390625 52.109375 105.152344 60.796875 108.769531 70.066406 C 110.71875 75.066406 116.496094 76.921875 119.941406 72.621094 C 123.628906 68.015625 119.789063 64.769531 118.433594 61.769531 C 122.496094 62.773438 127.699219 66.796875 131.503906 78.863281 C 133.558594 85.378906 132.425781 91.726563 129.492188 96.460938 C 126.996094 107.226563 123.050781 111.453125 119.1875 116.066406 C 116.757813 111.875 114.328125 107.6875 111.898438 103.5 C 116.339844 95.539063 117.277344 90.570313 114.160156 88.199219 C 111.328125 86.039063 106.785156 87.828125 105.613281 95.453125 C 99.414063 95.285156 93.910156 90.285156 93.042969 79.871094 C 91.457031 60.757813 92.417969 41.808594 88.769531 32.109375 C 103.097656 30.851563 113.40625 25.238281 119.691406 15.265625 Z M 129.996094 109.027344 C 140.847656 69.3125 141.011719 36.464844 130.5 21.550781 C 162.386719 30.09375 182.914063 76.261719 155.382813 99.476563 C 155.363281 97.988281 155.472656 96.371094 155.636719 94.699219 C 156.984375 93.628906 157.402344 91.597656 157.632813 88.855469 C 158.234375 81.65625 156.488281 78.542969 153.96875 76.828125 C 150.246094 74.304688 148.742188 75.121094 148.9375 79.09375 C 149.007813 80.519531 149.652344 81.398438 153.875 82.632813 C 145.914063 93.890625 137.957031 101.472656 129.996094 109.027344 Z M 146.09375 42.414063 C 148.875 45.589844 151.335938 49.726563 149.960938 58.683594 C 149.445313 62.046875 146.414063 61.082031 146.472656 59.511719 C 146.710938 53.207031 146.984375 47.652344 146.09375 42.414063 Z M 208.035156 15.609375 C 218.359375 18.378906 227.308594 22.179688 228.152344 33.066406 C 229.117188 45.542969 219.800781 55.710938 199.6875 63.617188 C 205.824219 64.089844 212.554688 64.351563 218.09375 68.742188 C 223.496094 73.023438 223.273438 80.355469 217.714844 86.960938 C 208.988281 97.320313 198.1875 102.425781 187.351563 105.175781 C 175.164063 67.054688 182.273438 36.90625 208.035156 14.472656 Z M 195.703125 51.855469 C 200.792969 41.351563 206.675781 33.699219 214.300781 32.308594 C 213.214844 43.9375 205.398438 48.839844 195.703125 51.855469 Z M 195.511719 88.289063 C 196.300781 79.683594 200.921875 76.648438 207.277344 76.144531 C 207.058594 85.886719 202.3125 88.667969 195.511719 88.289063 Z M 251.492188 15.417969 C 257.667969 26.964844 262.921875 45.027344 260.601563 67.605469 C 258.722656 85.867188 247.191406 96.195313 227.203125 98.726563 C 219.625 66.132813 226.179688 37.890625 251.492188 15.417969 Z M 246.75 39.519531 C 239.378906 41.539063 236.53125 54.699219 235.742188 72.917969 C 244.351563 68.164063 250.300781 59.976563 246.75 39.519531 Z M 260.03125 21.492188 C 274.960938 50.304688 273.378906 74.53125 251.871094 93.222656 C 261.550781 102.457031 274.769531 98.789063 291.53125 82.214844 C 284.363281 83.179688 283.152344 78.261719 284.320313 72.726563 C 286.53125 62.246094 289.75 54.628906 293.050781 50.144531 C 295.597656 46.683594 297.851563 47.347656 297.984375 51.285156 C 298.707031 73.035156 295.042969 89.617188 289.445313 103.277344 C 310.597656 93.832031 320.164063 53.648438 296.085938 18.457031 C 293.492188 31.265625 288.8125 43.027344 283.183594 54.320313 C 283.847656 36.257813 282.769531 23.101563 277.867188 20.734375 C 271.257813 16.335938 265.121094 15.261719 260.03125 21.492188 Z M 315.820313 41.417969 L 306.523438 11.8125 L 327.585938 31.929688 Z M 316.582031 48.816406 L 331.761719 39.519531 C 335.480469 75.902344 328.996094 99.539063 302.347656 97.964844 C 315.515625 90.566406 318.597656 72.410156 316.582031 48.816406 Z M 360.128906 10.632813 C 364.484375 15.941406 368.839844 21.25 373.195313 26.558594 C 357.4375 33.46875 353.625 40.820313 367.273438 48.816406 C 363.734375 51.132813 360.738281 55.625 358.289063 62.292969 C 354.679688 58.191406 352.050781 55.867188 349.917969 64.746094 C 345.8125 81.808594 346.699219 98.503906 348.488281 115.386719 C 339.265625 100.167969 333.234375 81.101563 342.566406 43.507813 C 340.660156 40.582031 338.753906 37.65625 336.847656 34.726563 C 341.191406 31.191406 343.402344 24.246094 345.015625 16.351563 C 353.371094 32.824219 358.851563 33.367188 360.128906 10.632813 Z M 398.71875 21.660156 C 363.050781 47.320313 349.304688 74.546875 374.625 104.5625 C 401.417969 83.480469 406.234375 54.722656 398.71875 21.660156 Z M 390.144531 52.289063 C 378.710938 60.933594 374.898438 71.753906 378.710938 84.757813 C 389.183594 71.628906 393.828125 60.515625 390.144531 52.289063 Z M 408.929688 81.285156 C 405.160156 91.921875 403.792969 102.3125 417.300781 98.4375 L 474.273438 82.101563 L 414.648438 110.28125 C 391.214844 121.355469 394.210938 92.066406 408.929688 81.285156 Z M 408.929688 81.285156 "
        />
      </g>
    </g>
  </svg>
);

const ThemeSelect = () => {
  const { theme, setTheme } = useTheme();

  return (
    <IconButton onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      {theme === "light" ? <Svg as={MoonIcon} size="3" variant="gray"></Svg> : <Svg as={SunIcon} size="3" variant="gray"></Svg>}
    </IconButton>
  );
};

const Home = ({ cageballEvents }: { cageballEvents: CageballEventWithVotesAndUser[] }) => {
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

  console.log(bind);

  return (
    <>
      <Nav
        css={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderBottom: "1px solid $cardBorder",
          marginBottom: "$3",
          "@bp1": {
            justifyContent: "space-between",
          },
        }}
      >
        <Svg
          as={Logo}
          variant="text"
          css={{
            width: "195px",
            height: "48px",
          }}
        />
        <Flex
          gap="3"
          css={{
            display: "none",
            "@bp1": {
              display: "flex",
            },
          }}
        >
          <Button onClick={() => (user ? signOut() : () => signIn())}>{user ? "Logg ut" : "Logg inn"}</Button>
          <ThemeSelect />
        </Flex>
        <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
          <DialogTrigger asChild>
            <IconButton
              css={{
                position: "absolute",
                right: "$4",
              }}
            >
              <Svg as={HamburgerMenuIcon} />
            </IconButton>
          </DialogTrigger>
          {/* https://github.com/pmndrs/use-gesture/issues/362#issuecomment-1008204013 */}
          {/* @ts-ignore */}
          <DialogContent {...bind()}>
            <DialogTitle>Hei {user?.name}</DialogTitle>
            <Flex>
              <Button onClick={() => (user ? signOut() : () => signIn())}>{user ? "Logg ut" : "Logg inn"}</Button>
              <ThemeSelect />
            </Flex>
          </DialogContent>
        </Dialog>
      </Nav>
      <Main>
        <Heading size="3">{`Stem for uke ${getISOWeek(new Date()) + 1}`}</Heading>
        <UserVotes cageballEvents={cageballEvents} />
      </Main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session?.user) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }

  const { emailVerified, ...user } = await getUser(session?.user["id"]);

  return {
    props: {
      session: {
        ...session,
        user: {
          ...session.user,
          ...user,
          votes: user?.votes?.map(({ dateVoted, userId, id }) => ({ id, userId, dateVoted })),
        },
      },
      cageballEvents: (await getCageballEvents()).map(({ from, to, votes, ...other }) => ({
        ...other,
        from: from.toISOString(),
        to: to.toISOString(),
        votes: (votes ?? []).map((vote) => ({
          ...vote,
          createdAt: vote.createdAt.toISOString(),
          updatedAt: vote.updatedAt.toISOString(),
        })),
      })),
    },
  };
};

export default Home;
