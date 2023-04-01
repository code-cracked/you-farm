const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const { userRoutes } = require("./router/user");
const { bidRoutes } = require("./router/bid");
const { rentRoutes } = require("./router/rent");
const { dealRoutes } = require("./router/deal");
const bodyParser = require("body-parser");
const logHandler = require("./middleware/log");
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use(logHandler);

const config = require("./config/index");

app.use("/user", userRoutes);
app.use("/bid", bidRoutes);
app.use("/rent", rentRoutes);
app.use("/deal", dealRoutes);

app.listen(config.port || 5000, () =>
  console.log(`Up & Running on ${config.url}`)
);
