import Head from "next/head";
import { useState, useEffect } from "react";
import axios from "axios";

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
    <div>
      {data !== null ? (
        <div>
          {data.map((obj) => {
            return <div>{JSON.stringify(obj)}</div>;
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
