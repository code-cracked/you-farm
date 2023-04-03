import Head from "next/head";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
//   const bull = (
//   <Box
//     component="span"
//     sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
//   >
//     •
//   </Box>
// );

// const card = ( 
//   <React.Fragment>
//     <CardContent>
//       <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
//         Word of the Day
//       </Typography>
//       <Typography variant="h5" component="div">
//         be{bull}nev{bull}o{bull}lent
//       </Typography>
//       <Typography sx={{ mb: 1.5 }} color="text.secondary">
//         adjective
//       </Typography>
//       <Typography variant="body2">
//         well meaning and kindly.
//         <br />
//         {'"a benevolent smile"'}
//       </Typography>
//     </CardContent>
//     <CardActions>
//       <Button size="small">Learn More</Button>
//     </CardActions>
//   </React.Fragment>
// );
  // const openWeatherKey = process.env.NEXT_PUBLIC_API_KEY;
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
      {data !== null && data.list !== undefined ? (
        <div>
          {data.list.map((obj) => {
            return <div>{JSON.stringify(obj.main)}</div>;
          })}
        </div>
      ) : (
        ""
      )}
    </div>
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