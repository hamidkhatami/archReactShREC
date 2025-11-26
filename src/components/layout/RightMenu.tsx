import { Drawer, List, ListItemButton, ListItemText } from "@mui/material";
import { useMenuStore } from "../../store/menu";


interface SidebarProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}
export default function RightMenu({ open, setOpen }: SidebarProps) {
  

  return (
    <Drawer anchor="right" open={open} onClose={close}>
      <List sx={{ width: 250 }}>
        <ListItemButton onClick={close}>
          <ListItemText primary="صفحه اصلی" sx={{ textAlign: "right" }} />
        </ListItemButton>
        <ListItemButton onClick={close}>
          <ListItemText primary="درباره ما" sx={{ textAlign: "right" }} />
        </ListItemButton>
        <ListItemButton onClick={close}>
          <ListItemText primary="تماس با ما" sx={{ textAlign: "right" }} />
        </ListItemButton>
      </List>
    </Drawer>
  );
}
