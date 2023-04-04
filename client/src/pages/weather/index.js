import Navbar from "@/components/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import * as React from 'react';
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import CardHeader from '@mui/material/CardHeader';
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";

const theme = createTheme();

export default function Home() {

  const [data,setData]=useState([])  
  const [userData,setUserData]=useState({
    "location": {"latitude": 1, "longitude": 1}
  })

  useEffect(() => {
    const getData =  async() => {
      const urlToFetch = `http://localhost:5000/weather?lat=${userData["location"]["latitude"]}&long=${userData["location"]["latitude"]}`;
     await axios.get(urlToFetch).then((res) => {
        setData(res.data);
        console.log(res.data)
        
      })
   };
   setUserData(JSON.parse(window.localStorage.getItem("userdata")))
     getData();
  }, []);
  
  return (
    <div>
      <Navbar />
      <Typography
        component="h1"
        variant="h4"
        paddingLeft={5}
        paddingTop={1}
        marginY={2}
        fontWeight={theme.typography.fontWeightBold}
        textAlign={"center"}
      >
        5 Days Weather Forecast
      </Typography>
      <Container
        component="main"
        maxWidth="xl"
        sx={{
          display: "flex",
          flexDirection: "row",
          marginTop: 1,
          flexShrink: 0,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {data.map(elem => (
          <Box
            minWidth={200}
            maxWidth={400}
            margin={2}
            boxShadow={5}
            padding={2}
            borderRadius={4}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
          >
              <CardHeader
                title={`Date : ${new Date(elem.date).toLocaleString()}`}
                subheader={`lat : ${userData["location"]["latitude"]} lon: ${userData["location"]["longitude"]}`}
              />
              <CardContent>
              <Box display="flex" flexDirection="row-reverse">
          <Box>
            <Typography variant="h5" color="textPrimary">
              Temp Max: {elem.temp_max}
              <span>&#176;</span>
              {"C"}
            </Typography>
            <Typography variant="h5" color="textPrimary">
              Temp Min: {elem.temp_min}
              <span>&#176;</span>
              {"C"}
            </Typography>
          </Box>
        </Box>
      </CardContent>
      <CardContent>
        <Box display="flex" flexDirection="row-reverse">
          <Box p={0}>
            <Typography variant="h6" color="textSecondary">
              {elem.weather.description}
            </Typography>
          </Box>
        </Box>
      </CardContent>
      <CardContent>
        <Box display="flex" flexDirection="row">
          <Box p={1}>
            <Typography variant="h6" color="textPrimary">
              Humidity: {elem.humidity} %
            </Typography>
          </Box>
          <Box p={1}>
            <Typography variant="h6" color="textPrimary">
              Pressure: {elem.pressure} pa
            </Typography>
          </Box>
          <Box p={1}>
            <Typography variant="h6" color="textPrimary">
              Wind: {elem.speed} km/h
            </Typography>
          </Box>
        </Box>
      </CardContent>
      </Box>
      ))}
        </Container>
    </div>
  ); 
}
