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

const RentalsIndex = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllDeals();
      setData(res);
    };
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <Link href="/rentals/create">Create a rental</Link>
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
