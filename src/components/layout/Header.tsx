import React from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

interface HeaderProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ open, setOpen }) => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          onClick={() => setOpen(!open)}
          sx={{ mr: 1 }}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
       </Toolbar>
    </AppBar>
  );
};

export default Header;
