import { ReactNode, useState } from "react";
import { Box, CssBaseline } from "@mui/material";
import AppSidebar from "../../components/Sidebar";
import { SidebarProps } from "@/types/inteface";
import Header from "./Header";

interface Props {
    children: ReactNode;
}
 

export default function MainLayout({ children }: Props) {
    
     const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
     const [open,setOpen]=useState(false)

    
    return (
        
        // <Box sx={{ display: "flex", direction: "rtl" }}>
        <>
        <Header  />
        <Box
            // component="main"
            sx={{
                flexGrow: 5,
                p: 3,
                transition: "margin-left 0.3s",
                marginLeft: sidebarOpen ? "0px" : "0",
                direction: "ltr",       // راست‌چین‌سازی کامل
                textAlign: "left",     // راست‌چین کردن متن و محتوا
            }}
        >
            <CssBaseline />

            <AppSidebar open={sidebarOpen} setOpen={setSidebarOpen} />
            {/* <RightMenu open={sidebarOpen} setOpen={setSidebarOpen}/> */}

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    transition: "margin-left 0.3s",
                    marginLeft: sidebarOpen ? "200px" : "20px",
                    merginRight: sidebarOpen ? "200px" : "20px",
                }}
            >
                {children}
            </Box>
        </Box>
        </>
        
    );
}