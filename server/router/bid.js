const express = require("express");

const {
  addBid,
  createShow,
  getBids,
  getAllBids,
  getUserBids,
} = require("../controllers/bid");
const router = express.Router();

router.route("/").post(addBid).get(getAllBids);
router.get("/:id", getBids);
router.route("/create").post(createShow);
router.route("/user/:phone").get(getUserBids);

module.exports = {
  bidRoutes: router,
};
