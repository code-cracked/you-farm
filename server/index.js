const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const { userRoutes } = require("./router/user");
const bodyParser = require("body-parser");
const logHandler = require("./middleware/log");
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use(logHandler);

const config = require("./config/index");

app.use("/user", userRoutes);

app.listen(config.port || 5000, () =>
  console.log(`Up & Running on ${config.url}`)
);
