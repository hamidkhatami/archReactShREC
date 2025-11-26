import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import { SidebarProps } from "@/types/inteface";

const drawerWidth = 150;
const miniWidth = 72;




export default function AppSidebar({ open , setOpen}: SidebarProps) {
  const menuItems = [
    { text: "داشبورد", icon: <DashboardIcon /> },
    { text: "کاربران", icon: <PeopleIcon /> },
    { text: "گزارشات", icon: <BarChartIcon /> },
  ];

  return (
    <>
      {/* Toggle Button */}
      

      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: open ? drawerWidth : miniWidth,
          flexShrink: 0,
          transition: "width 0.30s",
          "& .MuiDrawer-paper": {
            width: open ? drawerWidth : miniWidth,
            boxSizing: "border-box",
            textAlign: "right",
            overflowX: "hidden",
            transition: "width 0.3s",
            top:"65px"
          },
        }}
      >
           <List>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.text}
              sx={{ justifyContent: open ? "initial" : "center" }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  ml: open ? 2 : 0,
                  justifyContent: "center",
                  top: 10
                }}
              >
                {item.icon}
              </ListItemIcon>
              {open && <ListItemText primary={item.text} />}
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </>
  );
}



// import React from "react";
// import { Drawer, List, ListItem, ListItemText, Box, Button } from "@mui/material";

// interface SidebarProps {
//   open: boolean;
//   setOpen: (value: boolean) => void;
// }

// const Sidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {
//   return (
//     <Drawer
//       anchor="right" // سمت راست برای RTL
//       open={open}
//       onClose={() => setOpen(false)}
//       variant="temporary"
//     >
//       <Box sx={{ width: 250 }} role="presentation">
//         <List>
//           {["خانه", "پروفایل", "تنظیمات"].map((text) => (
//             <ListItem button key={text}>
//               <ListItemText primary={text} />
//             </ListItem>
//           ))}
//         </List>
//         <Box sx={{ p: 2 }}>
//           <Button
//             variant="contained"
//             color="primary"
//             fullWidth
//             onClick={() => alert("اکشن داخل سایدبار")}
//           >
//             اکشن اصلی
//           </Button>
//         </Box>
//       </Box>
//     </Drawer>
//   );
// };

// export default Sidebar;
