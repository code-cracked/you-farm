const express = require("express");

const {
  createShow,
  addRent,
  getAllShows,
  getDealById,
} = require("../controllers/rent");
const router = express.Router();

router.route("/create").post(createShow);
router.route("/").post(addRent).get(getAllShows);
router.route("/:id").get(getDealById);

module.exports = {
  rentRoutes: router,
};
