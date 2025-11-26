// import { Container, Grid} from '@mui/material';
// import SearchForm from './components/SearchForm';
// import SearchResults from './components/SearchResults';
// import MainLayout from "./components/layout/MainLayout";


// function App() {
//   return (
//     <MainLayout>
//     <Container maxWidth="xl" sx={{ mt: 1 }}>

//       <Grid container spacing={2} dir="rtl">
        
//         {/* بخش فرم جستجو (بالای صفحه) */}
//         <Grid item xs={12}>
//             <SearchForm />
//         </Grid>

//         {/* بخش نتایج (پایین صفحه) */}
//         <Grid item xs={12}>
//           <SearchResults />
//         </Grid>
        
//       </Grid>
//     </Container>
  
//   </MainLayout>
//   );
// }

// export default App;


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
