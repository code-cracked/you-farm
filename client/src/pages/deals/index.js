import Navbar from "@/components/Navbar";
import { getAllDeals } from "@/utils/deals";
import { useEffect, useState } from "react";

const { default: Link } = require("next/link");

const DealsIndex = () => {
  const [data, setData] = useState([
    {
      name: "Loading...",
      phno: "Loading...",
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllDeals();
      console.log("Uhuhuhu", res);
      setData(res);
    };
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <Link href="/deals/create">Create a deal</Link>
      <ul>
        {data.map((deal) => {
          console.log(deal);
          return (
            <li key={deal.toString()}>
              <Link href={`/deals/${deal.createdby}`}>{deal.name}</Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default DealsIndex;
