// import {
//   Box,
//   Drawer,
//   List,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Collapse,
// } from "@mui/material";
// import { ExpandLess, ExpandMore } from "@mui/icons-material";
// import { useState } from "react";
// import { SidebarProps } from "@/types/inteface";
// import { menuItems } from "@/consts/menu";
// import { MenuItem } from "@/types/menuItems";

// const drawerWidth = 150;
// const miniWidth = 72;

// export default function AppSidebar({ open, setOpen }: SidebarProps) {
//   const [openMap, setOpenMap] = useState<Record<string, boolean>>({});

//   const toggleSubMenu = (key: string) => {
//     setOpenMap(prev => ({ ...prev, [key]: !prev[key] }));
//   };

//   const renderMenu = (items: MenuItem[], level = 0) =>
//     items.map((item) => {
//       const hasChildren = !!item.children?.length;

//       return (
//         <Box key={item.text}>
//           <ListItemButton
//             onClick={() => hasChildren && toggleSubMenu(item.text)}
//             sx={{
//               justifyContent: open ? "flex-start" : "center",
//               pr: 2 + level * 2,
//             }}
//           >
//             {item.icon && (
//               <ListItemIcon
//                 sx={{
//                   minWidth: 0,
//                   ml: open ? 2 : 0,
//                   justifyContent: "center",
//                 }}
//               >
//                 {item.icon}
//               </ListItemIcon>
//             )}

//             {open && <ListItemText primary={item.text} />}

//             {hasChildren && open && (
//               openMap[item.text] ? <ExpandLess /> : <ExpandMore />
//             )}
//           </ListItemButton>

//           {hasChildren && (
//             <Collapse in={openMap[item.text]} timeout="auto" unmountOnExit>
//               <List disablePadding>
//                 {renderMenu(item.children!, level + 1)}
//               </List>
//             </Collapse>
//           )}
//         </Box>
//       );
//     });

//   return (
//     <Drawer
//       variant="permanent"
//       anchor="left"
//       sx={{
//         width: open ? drawerWidth : miniWidth,
//         flexShrink: 0,
//         transition: "width 0.3s",
//         "& .MuiDrawer-paper": {
//           width: open ? drawerWidth : miniWidth,
//           boxSizing: "border-box",
//           textAlign: "right",
//           overflowX: "hidden",
//           transition: "width 0.3s",
//           top: "65px",
//         },
//       }}
//     >
//       <List>
//         {renderMenu(menuItems)}
//       </List>
//     </Drawer>
//   );
// }

import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useState } from "react";
import { SidebarProps } from "@/types/inteface";
import { menuItems } from "@/consts/menu";
import { MenuItem } from "@/types/menuItems";

const drawerWidth = 150;
const miniWidth = 72;

export default function AppSidebar({ open }: SidebarProps) {
  const [openMap, setOpenMap] = useState<Record<string, boolean>>({});

  const toggleSubMenu = (key: string) => {
    setOpenMap(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const renderMenu = (items: MenuItem[], level = 0) =>
    items.map((item) => {
      const hasChildren = !!item.children?.length;
      const paddingRight = 2 + level * 2;

      return (
        <Box key={item.text}>
          <ListItemButton
            onClick={() => hasChildren && toggleSubMenu(item.text)}
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

            {open && <ListItemText primary={item.text} />}

            {hasChildren && open && (
              openMap[item.text] ? <ExpandLess /> : <ExpandMore />
            )}
          </ListItemButton>

          {hasChildren && (
            <Collapse in={openMap[item.text]} timeout="auto" unmountOnExit>
              <List disablePadding>
                {renderMenu(item.children!, level + 1)}
              </List>
            </Collapse>
          )}
        </Box>
      );
    });

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
