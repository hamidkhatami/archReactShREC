import { createTheme } from "@mui/material/styles";

export const authTheme = createTheme({
  direction: "rtl",
  palette: {
    mode: "light",
    primary: {
      main: "#667eea",
    },
    background: {
      default: "#f4f6fb",
    },
  },
  typography: {
    fontFamily: "Vazirmatn, sans-serif",
  },
});
