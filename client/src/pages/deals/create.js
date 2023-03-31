import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Head from "next/head";

import { NewReleasesOutlined } from "@mui/icons-material";
import { InputAdornment } from "@mui/material";
import Navbar from "@/components/Navbar";

function Copyright(props) {
  return (
    <>
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link color="inherit" href="https://youfarm.vercel.app/">
          YouFarm
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </>
  );
}

const theme = createTheme();

export default function CreateDeal() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const userData = JSON.parse(localStorage.getItem("userdata"));
    fetch("http://localhost:5000/bid/create", {
      method: "POST",
      body: JSON.stringify({
        name: data.get("cropname"),
        quantity: data.get("quantity"),
        phone: data.get("phone"),
        end: data.get("end"),
        phone: userData.phone,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Create a deal</title>
        <meta name="description" content="Register/ Signup for an account" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <NewReleasesOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create a deal
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="cropname"
              label="Crop name"
              name="cropname"
              autoComplete="text"
              type="text"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="quantity"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">kg</InputAdornment>
                ),
              }}
              label="Quantity"
              name="quantity"
              autoComplete="text"
              type="number"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="closetime"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">Close time</InputAdornment>
                ),
              }}
              // label="Close time"
              name="closetime"
              autoComplete="text"
              type="datetime-local"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
