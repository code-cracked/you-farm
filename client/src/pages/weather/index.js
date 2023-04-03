import Head from "next/head";
import { useState, useEffect } from "react";
import axios from "axios";
import * as React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Avatar,
  CardHeader,
  IconButton,
} from "@material-ui/core";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Grid from '@mui/material/Grid';



export default function Home() {
  const [data, setData] = useState(null);
  const city = "madurai";

  const urlToFetch = `http://localhost:5000/weather?lat=1&long=1`;

  useEffect(() => {
    const lon = window.localStorage.getItem('location.latitude');
    const lan = window.localStorage.getItem('location.longitude');

    const getData =  async() => {
      axios.get(urlToFetch).then((res) => setData(res.data))
   };
    getData();
  }, []);


  return (
    data==null?"":  data.map((obj) => {
      return(
    //         <div>
    //           <Card lg={{ maxWidth: 345 }}>
    //               <CardActionArea>
    //                   <CardContent>
    //                     <Typography variant="body2" color="text.secondary"> 
    //                       {JSON.stringify(obj.main)}
    //                     </Typography>
    //                   </CardContent> 
    //                 </CardActionArea>
    //               </Card>
    //         </div>
    //     )})  
    <Grid container spacing={2}>
    <Card style={{ width: '18rem' }}>
      <Card.Header></Card.Header>
      {/* <Card.Img variant="top" src={""} /> */}
      <Card.Body>
        <Card.Title>Monday</Card.Title>
        <Card.Text>
        {JSON.stringify(obj.main)}
        </Card.Text>
        <Button variant="primary">Add to cart</Button>
        <Button>Add to favs</Button>
      </Card.Body>
    </Card>
    </Grid>
    )})
  );
}
