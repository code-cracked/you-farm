const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const { userRoutes } = require("./router/user");
const { bidRoutes } = require("./router/bid");
const bodyParser = require("body-parser");
const logHandler = require("./middleware/log");
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use(logHandler);

const config = require("./config/index");
const { createShow, getAllShows } = require("./controllers/bid");

app.use("/user", userRoutes);
app.use("/bid", bidRoutes);
app.route("/deal").get(getAllShows);

app.listen(config.port || 5000, () =>
  console.log(`Up & Running on ${config.url}`)
);
