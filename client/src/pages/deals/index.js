import Navbar from "@/components/Navbar";
import { getAllDeals } from "@/utils/deals";
import { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from "@mui/material/Container";
import Head from "next/head";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AddIcon from '@mui/icons-material/Add';
import Typography from "@mui/material/Typography";

const DealsIndex = () => {
  const [data, setData] = useState([
    {
      name: "Loading...",
      phno: "Loading...",
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllDeals();
      console.log("Uhuhuhu", res);
      setData(res);
    };
    fetchData();
  }, []);
  const theme = createTheme();
  // return (
  
  //     <ThemeProvider theme={theme}>
  //         <Head>
  //       <title>Create a deal</title>
  //       <meta name="description" content="Register/ Signup for an account" />
  //       <meta name="viewport" content="width=device-width, initial-scale=1" />
  //       <link rel="icon" href="/favicon.ico" />
  //     </Head>
  //     <Navbar />
  //     <Container style={{marginTop:"50"}}>
  //       <Box component="span" bgcolor={"red"} minWidth={"xl"} paddingTop={"10px"} sx={{ p: 2, border: '1px dashed grey' }}>
  //         <Button>Create a Deal</Button>
  //       </Box>
  //     <Link href="/deals/create">Create a deal</Link>
  //     <ul>
  //       {data.map((deal) => {
  //         console.log(deal);
  //         return (
  //           <li key={deal.toString()}>
  //             <Link href={`/deals/${deal.id}`}>{deal.name}</Link>
  //           </li>
  //         );
  //       })}
  //     </ul>
      
  //     </Container>
        
  //     </ThemeProvider>
  // );
return (<ThemeProvider theme={theme}>
  <Head>
    <title>Deals</title>
    <meta name="description" content="Deals for produce is shown here" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="/favicon.ico" />
  </Head>
  <Navbar />
  <Typography component="h1" variant="h3" paddingLeft={5} paddingTop={1} fontWeight={theme.typography.fontWeightBold}>
    Deals
  </Typography>
  <Container component="main" maxWidth="xs">
    <CssBaseline />
    <Box
      sx={{
        marginTop: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Button variant="contained" href="/deals/create" sx={{ p: 2 }}>
        <AddIcon fontSize="large" />
        Create a deal
      </Button>
    </Box>
  </Container>
</ThemeProvider>
)
};

export default DealsIndex;
