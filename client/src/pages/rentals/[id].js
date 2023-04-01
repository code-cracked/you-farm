import Navbar from "@/components/Navbar";
import { PermIdentityOutlined } from "@mui/icons-material";
import { Container, Stack, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getDealById } from "@/utils/rents";
const product = {
  title: "Sickle",
  quantity: "2",
  close_time: "2 days",
  owner: "Daniel",
  rate: "$2 / week",
};

// const rows = [
//   // Generate random data
//   { id: 1, name: "John", distance: "2 km", phno: "1234567890" },
//   { id: 2, name: "Doe", distance: "5 km", phno: "2238792387" },
//   { id: 3, name: "Tyson", distance: "6 km", phno: "2238792323" },
//   { id: 4, name: "Mike", distance: "7 km", phno: "2238792396" },
// ];

const columns = [
  { field: "id", headerName: "SI.NO", flex: 0.1 },
  { field: "name", headerName: "Name", flex: 0.3 },
  { field: "bid", headerName: "Bid", flex: 0.2 },
  { field: "phone", headerName: "Phone", flex: 0.3 },
  { field: "createdon", headerName: "Date", flex: 0.3 },
];

const Deals = () => {
  const router = useRouter();
  const { id } = router.query;
  const [bids, setBids] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      let { rents: res } = await getDealById(id);
      let x = [];
      res.map((item, index) => {
        let dic = {};
        item.createdon = new Date(
          item.createdon.seconds * 1000 + item.createdon.nanoseconds / 1000000
        ).toUTCString();
        // item.id = index + 1;
        // item.amount = `$ ${item.amount}`;
        dic.id = index + 1;
        dic.name = item.name;
        dic.bid = `$ ${item.amount}`;
        dic.phone = item.phone;
        dic.createdon = item.createdon;
        x = [...x, dic];
      });
      if (res.length > 0) {
        setBids(x);
      }
    };
    if (id !== undefined) fetchData();
  }, [id]);

  return (
    <>
      <Navbar />
      <Container>
        <Stack
          minHeight={"20vh"}
          flexDirection={"column"}
          justifyContent={"space-between"}
          paddingY={"2rem"}
        >
          <Stack>
            <Typography variant="subtitle2" color={"GrayText"}>
              # {id}
            </Typography>
            <Typography variant="h3">{product.title}</Typography>
            <Typography>By {product.owner}</Typography>
          </Stack>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography variant="h5">{product.quantity} units</Typography>
            <Typography variant="h6">Closes in {product.close_time}</Typography>
          </Stack>
        </Stack>
        <Stack minHeight={"60vh"}>
          <DataGrid columns={columns} rows={bids} />
        </Stack>
      </Container>
    </>
  );
};

export default Deals;
