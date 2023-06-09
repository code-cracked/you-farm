import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import Box from "@mui/material/Box";
import { createDeal } from "@/utils/rents";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Head from "next/head";

import {
  MonetizationOnOutlined,
  NewReleasesOutlined,
} from "@mui/icons-material";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

function Copyright(props) {
  return (
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
  );
}

const theme = createTheme();

export default function CreateRental() {
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { phone } = JSON.parse(localStorage.getItem("userdata"));
    const data = new FormData(event.currentTarget);
    const res = await createDeal({
      phone,
      name: data.get("itemname"),
      quantity: data.get("units"),
      end: data.get("duration"),
    });
    console.log(res);
    if (res.id) {
      toast.success("Deal created successfully");
      setTimeout(() => {
        router.push("/rentals");
      }, 1000);
    } else {
      toast.error("Error creating deal");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Create a rental</title>
        <meta name="description" content="Register/ Signup for an account" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
            <MonetizationOnOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create a rentals
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
              id="itemname"
              label="Item name"
              name="itemname"
              autoComplete="text"
              type="text"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="units"
              label="Units"
              name="units"
              autoComplete="text"
              type="number"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="duration"
              label="Duration (in days)"
              name="duration"
              autoComplete="number"
              type="number"
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
