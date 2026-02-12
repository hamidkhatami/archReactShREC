import React, { useState } from "react";
import { Box, Container } from "@mui/material";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/Sidebar";
import { menuItems } from "@/consts/menu";
import { generateRoutes } from "@/utilities/router";
import "@/services/http";
import "@/assets/fonts/fonts.css";
import Login from "@/pages/Login";

const App: React.FC = () => {
  const [open, setOpen] = useState(false);
  const routes = generateRoutes(menuItems);
  const location = useLocation();
  const isLogin = location.pathname.startsWith("/login");

   const currentItem: any = menuItems.find((item) => location.pathname.toLowerCase().startsWith(item.path.toLowerCase()));
  debugger

  return (
    <Box sx={{ display: "flex" }}>
      {!isLogin ? (<>
        <Header open={open} setOpen={setOpen} />
        <Sidebar open={open} setOpen={setOpen} />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Container maxWidth="xl" sx={{ mt: "80px" }}>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />

              {routes.map((r) => (
                <Route key={r.path} path={r.path} element={<r.component />} />
              ))}

            </Routes>
          </Container>
        </Box>
      </>
      ) : (
        <Box  sx={{flexGrow:1}} >         
           <Routes>
            <Route path="/login" element={<Login/>} />                
            <Route path={currentItem.path} element={currentItem.component} />                

            </Routes>
        </Box>
      )}

    </Box>
  );
};

export default App;
