import Navbar from "@/components/Navbar";
import { PermIdentityOutlined } from "@mui/icons-material";
import { Container, Stack, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useRouter } from "next/router";

const product = {
  title: "Sickle",
  quantity: "2",
  close_time: "2 days",
  owner: "Daniel",
  rate: "$2 / week",
};

const rows = [
  // Generate random data
  { id: 1, name: "John", distance: "2 km", phno: "1234567890" },
  { id: 2, name: "Doe", distance: "5 km", phno: "2238792387" },
  { id: 3, name: "Tyson", distance: "6 km", phno: "2238792323" },
  { id: 4, name: "Mike", distance: "7 km", phno: "2238792396" },
];

const columns = [
  { field: "name", headerName: "Name", flex: 0.4 },
  { field: "distance", headerName: "Distance", flex: 0.2 },
  { field: "phno", headerName: "Phonenumber", flex: 0.4 },
];

const Deals = () => {
  const router = useRouter();
  const { id } = router.query;

  console.log("GET RENTAL DATA", id);

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
          <DataGrid columns={columns} rows={rows} />
        </Stack>
      </Container>
    </>
  );
};

export default Deals;
