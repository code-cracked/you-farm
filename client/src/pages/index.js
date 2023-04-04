import Navbar from "@/components/Navbar";
import { Box, Container, Typography } from "@mui/material";
import React from "react";

export default function MyApp() {
  return (
    <>
      <Navbar />
      <Container
        maxWidth="lg"
        sx={{
          marginTop: 2,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Your Deals
        </Typography>
        <Box>
          
        </Box>
      </Container>
    </>
  );
}
