import { ThemeProvider, CssBaseline } from "@mui/material";
import { authTheme } from "@/theme/authTheme";
import { Outlet } from "react-router-dom";

const AuthLayout = () => (
  <ThemeProvider theme={authTheme}>
    <CssBaseline />
    <Outlet />
  </ThemeProvider>
);

export default AuthLayout;
