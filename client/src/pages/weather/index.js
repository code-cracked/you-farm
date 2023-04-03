import Head from "next/head";
import { useState, useEffect } from "react";
import axios from "axios";
import * as React from 'react';
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
// import bgImg from "./images/bg-img.jpg";



export default function Home() {
  // const [data, setData] = useState({
  //    "weathermain" : "",
  //    "weatherdiscription":"",
  //    "temp":"",
  //  "pressure": "",
  //    "humidity": "",
  //    "wind": "",
  //    "country": "",
  //    "city" : ""
  // });

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
        console.log(data)
        
      })
   };
    getData();
  }, []);

 

  const style = makeStyles((theme) => ({
    root: {
      marginTop: 50,
      display: "flex",
      width: 550,
      height: 250,
    },
    cardcss: {
      backgroundImage: "url(" + bgImg + ")",
      backgroundPosition: "center",
    },
  }));


  // var weathermain = data.weather.main;
  // var weatherdiscription = data.weather.description;
  // var temp = data.main.temp;
  // var pressure = data.main.pressure;
  // var humidity = data.main.humidity;
  // var wind = data.wind.speed;
  // var country = data.sys.country;
  // var city = data.name;
  //https://anothertechs.com/programming/react/weather-app-using-react/
  return (<div> 
    { data.length==0?"":   data.map((obj) => {
      return(
    <div>
      <CardContent>
        <Box display="flex" flexDirection="row">
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
              Temp Max: {obj.temp_max}
              <span>&#176;</span>
              {"C"}
            </Typography>
            <Typography variant="h4" color="textPrimary">
              Temp Min: {obj.temp_min}
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
              {obj.weather.description}
            </Typography>
          </Box>
        </Box>
      </CardContent>
      <CardContent>
        <Box display="flex" flexDirection="row">
          <Box p={1}>
            <Typography variant="h6" color="textPrimary">
              Humidity: {obj.humidity} %
            </Typography>
          </Box>
          <Box p={1}>
            <Typography variant="h6" color="textPrimary">
              pressure: {obj.pressure} pa
            </Typography>
          </Box>
          <Box p={1}>
            <Typography variant="h6" color="textPrimary">
              wind: {obj.speed} km/h
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </div> )} )
}</div>
);
  
}
//data==null?"":  data.map((obj) => {
  //return(
    //     <div>
    //       <Card sm={{ maxWidth: 500 }}>
    //           <CardActionArea>
    //               <CardContent>
    //                 <Typography variant="body2" color="text.secondary"> 
    //                   {JSON.stringify(obj.main)}
    //                 </Typography>
    //               </CardContent> 
    //             </CardActionArea>
    //           </Card>
    //     </div>
    // )})  