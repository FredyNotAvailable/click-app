import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: "dark", // o "light"
    useSystemColorMode: false,
  },
  colors: {
    brand: {
      50: "#e3f9f9",
      100: "#c5eaea",
      200: "#a2dbdb",
      300: "#7fcccc",
      400: "#5cbdbd",
      500: "#42a3a3", // color principal (teal oscuro)
      600: "#327f7f",
      700: "#245b5b",
      800: "#153737",
      900: "#051414",
    },
  },
  fonts: {
    heading: `'Poppins', sans-serif`,
    body: `'Inter', sans-serif`,
  },
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === "dark" ? "gray.900" : "gray.50",
        color: props.colorMode === "dark" ? "gray.100" : "gray.800",
      },
    }),
  },
});

export default theme;
