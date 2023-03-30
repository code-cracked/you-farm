const express = require("express");

const { addBid, createShow } = require("../controllers/bid");
const router = express.Router();

router.route("/").post(addBid);
router.route("/create").post(createShow);

module.exports = {
  bidRoutes: router,
};
