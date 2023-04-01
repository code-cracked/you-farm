import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import { toast, Toaster } from "react-hot-toast";
import Axios from "axios";

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

export default function Crop() {
  const [cropRec, setCropRec] = React.useState(null);
  var tempn, humidn;
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const N = parseInt(formData.get("nitro"));
    const P = parseInt(formData.get("phos"));
    const K = parseInt(formData.get("potas"));
    const pH = parseInt(formData.get("ph"));
    const rain = parseInt(formData.get("rain"));
    const { data } = await Axios.get("http://localhost:5000/user/7395879437");
    console.log(data);
    const lat = data[0].location.lat;
    const lon = data[0].location.long;
    await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=52e635d515f603126f9f17a31554fc92`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const { temp, humidity } = data.main;
        tempn = parseInt(temp);
        humidn = parseInt(humidity);
      });

    const myData = {
      N: N,
      P: P,
      K: K,
      temperature: tempn,
      humidity: humidn,
      ph: pH,
      rainfall: rain,
    };
    console.log(myData);
    const { data: crop } = await Axios.post(
      "http://127.0.0.1:4000/predict_api",
      myData
    );
    console.log(crop);
    const finCrop = crop.charAt(0).toUpperCase() + crop.slice(1);
    setCropRec(finCrop);
  };
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>YouFarm | Crop Recommendation</title>
        <meta name="description" content="Register/ Signup for an account" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster />
      <Navbar />
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h3">
            Crop Recommendation
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
              id="nitro"
              label="Nitrogen content in soil"
              name="nitro"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="phos"
              label="Phosphorous content in soil"
              name="phos"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="potas"
              label="Potassium content in soil"
              name="potas"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="ph"
              label="pH value of soil"
              name="ph"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="rain"
              label="Rainfall in mm"
              name="rain"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Recommend crop
            </Button>
            {cropRec && (
              <Typography mt={2} component="h4" variant="h4">
                ✨ {cropRec}
              </Typography>
            )}
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
