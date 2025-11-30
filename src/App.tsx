import React, { useState } from "react";
import Header from "../src/components/layout/Header";
import Sidebar from "./components/Sidebar";
import { Box, Container, Grid } from "@mui/material";
import SearchForm from "./components/SearchForm";
import SearchResults from "./components/SearchResults";


const App: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Box sx={{ display: "flex" }}>
      <Header open={open} setOpen={setOpen} />
      <Sidebar open={open} setOpen={setOpen} />

      <Box component="main" sx={{ flexGrow: 1, }}>
             <Container maxWidth="xl" sx={{ mt: "80px" }}>

       {/* <Grid container spacing={2} dir="rtl">        */}
       
         <Grid item xs={12}>
             <SearchForm />
         </Grid>
         <Grid item xs={12}>
           <SearchResults />
         </Grid>
        
      {/* </Grid> */}
     </Container>
      </Box>
    </Box>
  );
};

export default App;
