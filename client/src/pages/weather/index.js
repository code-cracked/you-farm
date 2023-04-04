import Head from "next/head";
import Navbar from "@/components/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import * as React from 'react';
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from '@mui/material/CardHeader';
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";

// import bgImg from "./images/bg-img.jpg";



export default function Home() {

  const [data,setData]=useState([])  
  const lat=1,lon=1
  const urlToFetch = `http://localhost:5000/weather?lat=${lat}&long=${lon}`;

  useEffect(() => {

    // const lon = window.localStorage.getItem('location.latitude');
    // const lan = window.localStorage.getItem('location.longitude');

    const getData =  async() => {
     await axios.get(urlToFetch).then((res) => {
        // console.log(res.data)
        setData(res.data);
        console.log(res.data)
        
      })
   };
    getData();
  }, []);

  
  return (
<div sx={{
    root: {
      marginTop: 50,
      display: "flex",
      width: 550,
      height: 250,
    },
    cardcss: {
      // backgroundImage: "url(" + bgImg + ")",
      backgroundPosition: "center",
    },
  }}>
    <Navbar />
      <CardHeader
         title={'Weather forecast'}
         style={{textAlign:'center',paddingBottom:'10%'}}
      />
     
      <Grid
          container
          spacing={3}
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
            >
                {data.map(elem => (
                  console.log(elem.date),
                    <Grid item xs={5} sm={5} md={5} key={data.indexOf(elem)} maxWidth={200}>
                        <Card>
                            <CardHeader
                                title={`Day : ${new Date(elem.date).toLocaleString()}`}
                                subheader={`lat : ${lat} lon: ${lon}`}
                            />
                            <CardContent>
                            <Box display="flex" flexDirection="row-reverse">
          <Box>
            <Typography variant="h4" color="textPrimary">
              Temp Max: {elem.temp_max}
              <span>&#176;</span>
              {"C"}
            </Typography>
            <Typography variant="h4" color="textPrimary">
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
              pressure: {elem.pressure} pa
            </Typography>
          </Box>
          <Box p={1}>
            <Typography variant="h6" color="textPrimary">
              wind: {elem.speed} km/h
            </Typography>
          </Box>
        </Box>
      </CardContent>
      </Card>
      </Grid>
     ))}
   </Grid>
  </div>
);
  
}
{/* <div className={classes.root}> <Grid item xs={12} sm={6} md={3}>
    <div>
      <CardHeader
       title="Weather for this week"
       style= {{ textAlign: 'center' }}
       titleStyle={{textAlign: 'center'}}
      >
      </CardHeader>
    </div>
    { data.length==0?"":   data.map((elem) => {
      return(
    <div  style={{paddingLeft: '20%'}}>
   
      <Card >
      <CardContent>
        <Box 
        display="flex" flexDirection="column">
          <Box p={1}>
            <Typography variant="caption" color="textSecondary">
              {lon}, {lat}
            </Typography>
          </Box>
        </Box>
      </CardContent>
      <CardContent>
        <Box display="flex" flexDirection="row-reverse">
          <Box p={0}>
            <Typography variant="h4" color="textPrimary">
              Temp Max: {elem.temp_max}
              <span>&#176;</span>
              {"C"}
            </Typography>
            <Typography variant="h4" color="textPrimary">
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
              pressure: {elem.pressure} pa
            </Typography>
          </Box>
          <Box p={1}>
            <Typography variant="h6" color="textPrimary">
              wind: {elem.speed} km/h
            </Typography>
          </Box>
        </Box>
      </CardContent></Card>
      </div> )} )
}</Grid></div> */}