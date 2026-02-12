import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Typography,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useState } from "react";
import { SidebarProps } from "@/types/inteface";
import { menuItems } from "@/consts/menu";
import { MenuItemType } from "@/types/menuItems";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

const drawerWidth = 150;
const miniWidth = 72;

export default function AppSidebar({ open }: SidebarProps) {
  const [openMap, setOpenMap] = useState<Record<string, boolean>>({});
  const location = useLocation();

  const toggleSubMenu = (key: string) => {
    setOpenMap(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const isLogin = location.pathname.startsWith("/login")

  const renderMenu = (items: MenuItemType[], level = 0) =>
    items.map((item) => {
      const hasChildren = !!item.children?.length;
      const paddingRight = 2 + level * 2;
      const isLogins = item.component?.name == "Login"
      if (!isLogins) {
        return (
          <Box key={item.title}>
            <ListItemButton
              component={item.path ? NavLink : "button"}
              to={item.path}
              onClick={() => hasChildren && toggleSubMenu(item.title)}
              sx={{
                justifyContent: open ? "flex-start" : "center",
                pr: paddingRight,
              }}
            >

              {item.icon && (
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    ml: open ? 2 : 0,
                    justifyContent: "center",
                    color: level > 0 ? "primary.main" : "inherit"
                  }}
                >
                  {item.icon}
                </ListItemIcon>
              )}

              {open &&
                <ListItemText primary={
                  <Typography
                    variant="menuItem"
                  >
                    {item.title}
                  </Typography>
                }
                />


              }



              {hasChildren && open && (
                openMap[item.title] ? <ExpandLess /> : <ExpandMore />
              )}
            </ListItemButton>

            {hasChildren && (
              <Collapse in={openMap[item.title]} timeout="auto" unmountOnExit>
                <List disablePadding>
                  {renderMenu(item.children!, level + 1)}
                </List>
              </Collapse>
            )}
          </Box>
        );
      }
    });
  if (!isLogin) {
    return (

      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: open ? drawerWidth : miniWidth,
          flexShrink: 0,
          transition: "width 0.3s",
          "& .MuiDrawer-paper": {
            width: open ? drawerWidth : miniWidth,
            boxSizing: "border-box",
            textAlign: "right",
            overflowX: "hidden",
            transition: "width 0.3s",
            top: "65px",
          },
        }}
      >
        <List>{renderMenu(menuItems)}</List>
      </Drawer>


    );
  }
  else
    return (
      <></>)

}
