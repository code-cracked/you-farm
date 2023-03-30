const express = require("express");

const {
  addBid,
  createShow,
  getBids,
  getAllBids,
} = require("../controllers/bid");
const router = express.Router();

router.route("/").post(addBid).get(getAllBids);
router.get("/:id", getBids);
router.route("/create").post(createShow);

module.exports = {
  bidRoutes: router,
};
