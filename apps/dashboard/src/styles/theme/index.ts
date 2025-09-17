import {
  createTheme,
  DEFAULT_THEME,
  type MantineColorsTuple,
  virtualColor,
} from "@mantine/core";
import { rubik } from "./fonts/rubik";

export const theme = createTheme({
  fontFamily: rubik.style.fontFamily,
  fontFamilyMonospace: "Monaco, Courier, monospace",
  headings: {
    fontFamily: `${rubik.style.fontFamily}, ${DEFAULT_THEME.fontFamily}`,
  },

  primaryColor: "primary",
  defaultRadius: "md",

  colors: {
    primary: [
      "#ecf4ff",
      "#dce4f5",
      "#b9c7e2",
      "#94a8d0",
      "#748dc0",
      "#5f7cb7",
      "#5474b4",
      "#44639f",
      "#3a5890",
      "#2c4b80",
    ],

    secondary: [
      "#fff2e3",
      "#ffe4cf",
      "#f9c8a1",
      "#f4a261",
      "#f19044",
      "#ef8029",
      "#ef7819",
      "#d5660c",
      "#be5906",
      "#a64b00",
    ],

    grayInDark:
      DEFAULT_THEME.colors.dark.toReversed() as unknown as MantineColorsTuple,

    nature: virtualColor({
      name: "nature",
      light: "gray",
      dark: "grayInDark",
    }),
  },
});
