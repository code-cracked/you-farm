import Navbar from "@/components/Navbar";
import { Box, Button, Container, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

export default function MyApp() {
  const [userData, setUserData] = React.useState({});

  React.useEffect(() => {
    const fetchUserData = async () => {
      if (!localStorage.getItem("userdata")) {
        window.location.href = "/signin";
      }
      const userPhone = JSON.parse(localStorage.getItem("userdata"))["phone"];
      const response = await fetch(
        `http://localhost:5000/user/${userPhone}/getDetails`
      );
      const data = await response.json();
      setUserData(data);
    };
    fetchUserData();
  }, []);

  const timeLeft = (date) => {
    /*
    data {
      seconds: 0,
      nanoseconds: 0
    }
    */
    const now = new Date();
    const closeTime = new Date(date.seconds * 1000);
    const diff = closeTime - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    if (days < 0 || hours < 0) return "Deal has been closed.";
    return `${days}d ${hours}h left`;
  };

  <>
    <Navbar />
    <Container
      maxWidth="lg"
      sx={{
        marginTop: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 6,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Your Deals
        </Typography>
        <Link href="/deals/create" style={{ textDecoration: "none" }}>
          <Button variant="contained">Create a deal</Button>
        </Link>
      </Box>
      <Box>
        {userData["deal"] && userData["deal"].length > 0 ? (
          userData["deal"].map((deal) => (
            <Link
              href={`/deals/${deal.id}`}
              style={{
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              <Box
                sx={{
                  minWidth: 300,
                  minHeight: 100,
                  color: "text.primary",
                  display: "flex",
                  flexDirection: "column",
                  padding: 2,
                  border: "1px solid #e0e0e0",
                  ":hover": {
                    boxShadow: 1,
                  },
                  borderRadius: 1,
                  marginBottom: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h5" component="h2" gutterBottom>
                    {deal["name"]}
                  </Typography>
                  <Typography
                    variant="h4"
                    component="p"
                    gutterBottom
                    sx={{
                      justifySelf: "flex-end",
                      alignSelf: "flex-end",
                    }}
                  >
                    {"$" + deal["highbid"]}
                  </Typography>
                </Box>
                <Typography variant="h6" component="p" gutterBottom>
                  {deal["quantity"] + " " + "kg"}
                </Typography>

                <Typography variant="body1" component="p" gutterBottom>
                  {timeLeft(deal["closetime"])}
                </Typography>
              </Box>
            </Link>
          ))
        ) : (
          <Typography variant="body1" component="p" gutterBottom>
            No deals yet
          </Typography>
        )}
      </Box>
    </Container>
  </>;
}
