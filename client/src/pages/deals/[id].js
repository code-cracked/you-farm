import { Container, Stack, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useRouter } from "next/router";

const { default: Link } = require("next/link");

const product = {
  title: "Carrots",
  quantity: "2 kg",
  close_time: "2 days",
  owner: "Daniel",
};

const rows = [
  { id: 1, name: "Hello", bid: "$ 200", distance: "2 km", phno: 98974592739 },
  {
    id: 2,
    name: "Hello WOrld I am a pro max ultra",
    bid: "$ 100",
    distance: "2 km",
    phno: 98974592739,
  },
  { id: 3, name: "Hello", bid: "$ 120", distance: "2 km", phno: 98974592739 },
  { id: 4, name: "Hello", bid: "$ 250", distance: "2 km", phno: 98974592739 },
];

const columns = [
  { field: "name", headerName: "Name", flex: 0.25 },
  { field: "bid", headerName: "Bid amount", flex: 0.2 },
  { field: "distance", headerName: "Distance", flex: 0.2 },
  { field: "phno", headerName: "Phonenumber", flex: 0.25 },
];

const Deals = () => {
  const router = useRouter();
  const { id } = router.query;

  console.log("GET DEAL DATA", id);

  return (
    <Container>
      <Stack
        minHeight={"20vh"}
        flexDirection={"column"}
        justifyContent={"space-between"}
        borderBottom={"1px solid"}
        paddingY={"2rem"}
      >
        <Stack>
          <Typography variant="h3">{product.title}</Typography>
          <Typography>By {product.owner}</Typography>
        </Stack>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography variant="h5">{product.quantity}</Typography>
          <Typography variant="h6">Closes in {product.close_time}</Typography>
        </Stack>
      </Stack>
      <Stack minHeight={"70vh"}>
        <DataGrid columns={columns} rows={rows} />
      </Stack>
    </Container>
  );
};
export default Deals;
