const express = require("express");

const { createShow } = require("../controllers/rent");
const router = express.Router();

router.route("/").get(createShow);

module.exports = {
  userRoutes: router,
};
