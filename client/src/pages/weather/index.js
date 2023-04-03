import Head from "next/head";
import { useState, useEffect } from "react";
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const card = (
  <React.Fragment>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Word of the Day
      </Typography>
      <Typography variant="h5" component="div">
        be{bull}nev{bull}o{bull}lent
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        adjective
      </Typography>
      <Typography variant="body2">
        well meaning and kindly.
        <br />
        {'"a benevolent smile"'}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Learn More</Button>
    </CardActions>
  </React.Fragment>
);




export default function Home() {
  const [data, setData] = useState(null);
  const city = "madurai";
  const openWeatherKey = process.env.NEXT_PUBLIC_API_KEY;
  const weatherUrl = "https://api.openweathermap.org/data/2.5/forecast";
  const urlToFetch = `${weatherUrl}?&q=${city}&APPID=${openWeatherKey}&units=metric`;

  // async function getLocationWeather(location) {
  //   const result = await fetch(urlToFetch);
  //   console.log(result)
  //   return result.json();
  // }
  // getLocationWeather("London");

  // const { data: output } = await Axios.get(
  //   "http://localhost:5000/user/7395879437"
  // ).then();

  // console.log(output);
  // const keys = Object.keys(output);
  // const lat = output[keys][0].location.lat;
  // const lon = output[keys][0].location.long;
  // fetch(
  //   `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=52e635d515f603126f9f17a31554fc92`
  // )
  //   .then((res) => res.json())
  //   .then((result) => {
  //     console.log(result);
  //     const { temp, humidity } = result.main;
  //     let tempn = parseInt(temp);
  //     let humidn = parseInt(humidity);
  //   });
  const getData = async () => {
    await fetch(urlToFetch)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setData(result);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {data !== null && data.list !== undefined ? (
        <div>
          {data.list.map((obj,ind) => {
            if(ind<7){
            return <div>{JSON.stringify(obj.main)}</div>;
             <Box sx={{ minWidth: 275 }}>
             <Card variant="outlined">{card}</Card>
             </Box>
          }
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
