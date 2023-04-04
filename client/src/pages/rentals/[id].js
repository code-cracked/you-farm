import Navbar from "@/components/Navbar";
import BidsDialog from "@/components/BidsDialog";
import { PermIdentityOutlined } from "@mui/icons-material";
import { Container, Stack, Typography, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getDealById, postRent } from "@/utils/rents";
import { Toaster, toast } from "react-hot-toast";

const columns = [
  { field: "id", headerName: "S.No.", flex: 0.1 },
  { field: "name", headerName: "Name", flex: 0.3 },
  { field: "phone", headerName: "Phone", flex: 0.2 },
  { field: "createdon", headerName: "Date", flex: 0.4 },
];

const Deals = () => {
  const router = useRouter();
  const { id } = router.query;
  const [bids, setBids] = useState([]);
  const [open, setOpen] = useState(false);
  const [hasBid, setHasBid] = useState(false);
  const [bidAmount, setBidAmount] = useState(0);
  const [product, setProduct] = useState({
    name: "Loading...",
    createdby: "Loading...",
    closetime: "Loading...",
    quantity: "Loading...",
  });
  const handleClickOpen = () => {
    if (hasBid)
      toast(`You have already placed a bid of $${bidAmount} for this product`, {
        icon: "🤔",
      });
    handleClose(1);
  };

  const handleClose = async (value) => {
    setOpen(false);
    const userData = JSON.parse(window.localStorage.getItem("userdata"));
    const bid = {
      amount: value,
      phone: userData["phone"],
      id,
      name: userData["name"],
    };
    await postRent(bid)
      .then((res) => {
        console.log(res);
        if (res.ok) {
          setBidAmount(value);
          toast.success(`You have placed a request!`);
          setHasBid(true);
        } else {
          toast.error(`Error: ${res.message}`);
        }
      })
      .catch((err) => {
        toast.error(`Error: ${err}`);
        console.log("Error here");
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDealById(id);
      console.log(data);
      data.createdon = new Date(
        data.createdon.seconds * 1000 + data.createdon.nanoseconds / 1000000
      ).toUTCString();
      data.closetime = new Date(
        data.closetime.seconds * 1000 + data.closetime.nanoseconds / 1000000
      ).toUTCString();
      setProduct(data);
      const { rents: res } = data;
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
      <Toaster position="bottom-right" />
      <Container>
        <Stack
          minHeight={"20vh"}
          flexDirection={"column"}
          justifyContent={"space-between"}
          paddingY={"2rem"}
        >
          <Stack>
            <Typography variant="h3">{product.name}</Typography>
            <Typography>By {product.createdby}</Typography>
          </Stack>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography variant="h5">{product.quantity} units</Typography>
            <Typography variant="body1">
              Closes at {product.closetime}
            </Typography>
            <div>
              <Button variant="contained" onClick={handleClickOpen}>
                Bid
              </Button>
              <BidsDialog hasBid={hasBid} open={open} onClose={handleClose} />
            </div>
          </Stack>
        </Stack>
        <Stack minHeight={"60vh"}>
          <DataGrid columns={columns} rows={bids} hasBid={hasBid} />
        </Stack>
      </Container>
    </>
  );
};

export default Deals;
