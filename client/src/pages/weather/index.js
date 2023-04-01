import Head from "next/head";
import { useState, useEffect } from "react";
import Axios from "axios";

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
