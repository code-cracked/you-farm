import Navbar from "@/components/Navbar";
import { getAllDeals } from "@/utils/rents";
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
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Grid } from "@mui/material";

const { default: Link } = require("next/link");

const RentalsIndex = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllDeals();
      setData(res);
    };
    fetchData();
  }, []);

  const theme = createTheme();

  return (
    <>
      <Head>
      <title>Deals</title>
      <meta name="description" content="Deals for produce is shown here" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Typography component="h1" variant="h3" paddingLeft={5} paddingY={1} fontWeight={theme.typography.fontWeightBold}>
        Rentals
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
          <Button variant="contained" href="/rentals/create" sx={{ paddingY: 2, paddingX: 5 }}>
            <AddIcon fontSize="large" />
            Create a rental
          </Button>
        </Box>
      </Container>
      <ul>
        {data.map((deal) => {
          console.log(deal);
          return (
            <li key={deal.toString()}>
              <Link href={`/rentals/${deal.id}`}>{deal.name}</Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default RentalsIndex;
