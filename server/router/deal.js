const express = require("express");

const { getAllShows, getDealById } = require("../controllers/bid");
const router = express.Router();

router.route("/").get(getAllShows);
router.route("/:id").get(getDealById);

module.exports = {
  dealRoutes: router,
};
