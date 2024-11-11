import { extendTheme, ThemeOverride } from "@chakra-ui/react";

const themeConfig: ThemeOverride = {
  colors: {
    brand: {
      coklat: "#603C2B",
      background: "#FFFEFE",
      background2: "#F4F5F4",
      background3: "#DAB799",
      product: "#F6E7DB",
      input: "#D6CECD",
    },
  },
  fonts: {
    heading: '"Plus Jakarta Sans", sans-serif',
    body: '"Plus Jakarta Sans", sans-serif',
    mono: '"Plus Jakarta Sans", sans-serif',
  },
  styles: {
    global: {
      body: {
        bg: "brand.background",
        color: "black",
      },
    },
  },
};

export const theme = extendTheme(themeConfig satisfies ThemeOverride);
