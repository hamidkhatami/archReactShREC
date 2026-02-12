import React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "@/theme";
import App from "@/App";

const AppWrapper: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> 
      <App />
    </ThemeProvider>
  );
};

export default AppWrapper;
