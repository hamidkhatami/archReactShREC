import React from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useLocation } from "react-router-dom";
import { menuItems } from "@/consts/menu";
import CloseIcon from "@mui/icons-material/Close";

interface HeaderProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ open, setOpen }) => {
  const location = useLocation();

  const currentItem = menuItems.find((item) => location.pathname.startsWith(item.path));
  const title = currentItem?.title || "صفحه";
  debugger
  const isLogin = location.pathname.startsWith("/login");

  if (!isLogin) {
    return (

      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setOpen(!open)}
            sx={{ mr: 2 }}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
          <Typography variant="headerTitle"  >
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
    );


  };


  return (

    <></>
  );
}



export default Header;
