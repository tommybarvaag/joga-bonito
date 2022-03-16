import { IconButton, Svg } from "@/components/ui";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import * as React from "react";
import { CSS } from "stitches.config";

const ThemeSelect = ({ ...other }: { css?: CSS }) => {
  const { theme, setTheme } = useTheme();

  return (
    <IconButton onClick={() => setTheme(theme === "dark" ? "light" : "dark")} {...other}>
      {theme === "light" ? <Svg as={MoonIcon} size="3" variant="gray"></Svg> : <Svg as={SunIcon} size="3" variant="gray"></Svg>}
    </IconButton>
  );
};

export default ThemeSelect;
